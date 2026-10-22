-- Core learner state only. Practice and exam remain local in the core release.
-- This migration requires Supabase Auth (auth.users, auth.uid()) and the
-- authenticated/anon database roles. Do not use client timestamps for conflict
-- resolution. RLS below enforces ownership, not compare-and-swap (CAS).

create table public.quiz_progress (
    user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
    subject_id text not null check (btrim(subject_id) <> ''),
    chapter_id text not null check (btrim(chapter_id) <> ''),
    format_version smallint not null default 1 check (format_version = 1),
    current_question_id text check (current_question_id is null or btrim(current_question_id) <> ''),
    -- Map keyed by question ID. App/import validates question and option IDs.
    answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
    -- Non-null reset_at is a tombstone; trigger replaces supplied time with
    -- server time on transition to reset. A later attempt sets it to null.
    reset_at timestamptz,
    revision bigint not null default 1 check (revision > 0),
    last_operation_id uuid not null default gen_random_uuid(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (user_id, subject_id, chapter_id),
    check (reset_at is null or (current_question_id is null and answers = '{}'::jsonb))
);

create table public.bookmarks (
    user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
    subject_id text not null check (btrim(subject_id) <> ''),
    chapter_id text not null check (btrim(chapter_id) <> ''),
    question_id text not null check (btrim(question_id) <> ''),
    is_present boolean not null default true,
    revision bigint not null default 1 check (revision > 0),
    last_operation_id uuid not null default gen_random_uuid(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (user_id, subject_id, chapter_id, question_id)
);

create table public.mistakes (
    user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
    subject_id text not null check (btrim(subject_id) <> ''),
    chapter_id text not null check (btrim(chapter_id) <> ''),
    question_id text not null check (btrim(question_id) <> ''),
    is_present boolean not null default true,
    revision bigint not null default 1 check (revision > 0),
    last_operation_id uuid not null default gen_random_uuid(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    primary key (user_id, subject_id, chapter_id, question_id)
);

create table public.review_rounds (
    user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
    -- Review v2 accepts any nonempty string; do not coerce local round IDs to UUID.
    round_id text not null check (round_id <> ''),
    -- Cloud format version is independent of localStorage Review version 2.
    format_version smallint not null default 1 check (format_version = 1),
    scope_subject_id text check (scope_subject_id is null or btrim(scope_subject_id) <> ''),
    scope_chapter_id text check (scope_chapter_id is null or btrim(scope_chapter_id) <> ''),
    -- Ordered refs. App/import validates uniqueness, scope and progress keys.
    items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array'),
    progress jsonb not null default '{"version":1,"currentQuestionId":null,"answers":{}}'::jsonb
        check (jsonb_typeof(progress) = 'object'
            and coalesce(progress->'version' = '1'::jsonb, false)
            and coalesce(jsonb_typeof(progress->'answers') = 'object', false)
            and progress ? 'currentQuestionId'
            and coalesce(progress->'currentQuestionId' = 'null'::jsonb
                or jsonb_typeof(progress->'currentQuestionId') = 'string', false)),
    -- Non-null cleared_at is a tombstone; trigger supplies server time.
    cleared_at timestamptz,
    revision bigint not null default 1 check (revision > 0),
    last_operation_id uuid not null default gen_random_uuid(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (scope_chapter_id is null or scope_subject_id is not null),
    check (
        (cleared_at is null and jsonb_array_length(items) > 0)
        or (cleared_at is not null and items = '[]'::jsonb
            and progress = '{"version":1,"currentQuestionId":null,"answers":{}}'::jsonb)
    )
);

-- This trigger owns audit timestamps and revision. It does not receive or
-- enforce expected_revision: direct owner UPDATE can still overwrite a newer
-- snapshot. Stage 3 will test a CAS RPC and the direct-UPDATE bypass.
create function public.studyhub_touch_sync_row()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    if tg_op = 'INSERT' then
        new.revision := 1;
        new.created_at := statement_timestamp();
        if tg_table_name = 'quiz_progress' then
            if new.reset_at is not null then
                new.reset_at := new.created_at;
            end if;
        elsif tg_table_name = 'review_rounds' then
            if new.cleared_at is not null then
                new.cleared_at := new.created_at;
            end if;
        end if;
    else
        if new.last_operation_id is not distinct from old.last_operation_id then
            raise exception 'new last_operation_id required for update' using errcode = '23514';
        end if;
        new.revision := old.revision + 1;
        new.created_at := old.created_at;
        if tg_table_name = 'quiz_progress' then
            if new.reset_at is not null then
                if old.reset_at is null then
                    new.reset_at := statement_timestamp();
                else
                    new.reset_at := old.reset_at;
                end if;
            end if;
        elsif tg_table_name = 'review_rounds' then
            if old.cleared_at is not null and new.cleared_at is null
                and new.round_id = old.round_id then
                raise exception 'new round_id required after clear' using errcode = '23514';
            end if;
            if new.cleared_at is not null then
                if old.cleared_at is null then
                    new.cleared_at := statement_timestamp();
                else
                    new.cleared_at := old.cleared_at;
                end if;
            end if;
        end if;
    end if;
    new.updated_at := statement_timestamp();
    return new;
end;
$$;

create trigger quiz_progress_touch before insert or update on public.quiz_progress
    for each row execute function public.studyhub_touch_sync_row();
create trigger bookmarks_touch before insert or update on public.bookmarks
    for each row execute function public.studyhub_touch_sync_row();
create trigger mistakes_touch before insert or update on public.mistakes
    for each row execute function public.studyhub_touch_sync_row();
create trigger review_rounds_touch before insert or update on public.review_rounds
    for each row execute function public.studyhub_touch_sync_row();

-- The trigger function is not a browser RPC. Its trigger invocation does not
-- require an API EXECUTE grant; verify this on the local stack in Stage 2C.
revoke all on function public.studyhub_touch_sync_row() from public, anon, authenticated;

alter table public.quiz_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.mistakes enable row level security;
alter table public.review_rounds enable row level security;

-- Remove default API grants before granting only what the core needs. No
-- ordinary client DELETE: reset/remove/clear must retain a tombstone.
revoke all on table public.quiz_progress, public.bookmarks, public.mistakes,
    public.review_rounds from public, anon, authenticated;
grant select, insert on table public.quiz_progress, public.bookmarks,
    public.mistakes, public.review_rounds to authenticated;
-- Column-level UPDATE also prevents an ordinary client moving a primary key
-- to a different ref/chapter or supplying revision/server audit timestamps.
grant update (current_question_id, answers, reset_at, last_operation_id)
    on public.quiz_progress to authenticated;
grant update (is_present, last_operation_id)
    on public.bookmarks, public.mistakes to authenticated;
grant update (round_id, scope_subject_id, scope_chapter_id, items, progress,
    cleared_at, last_operation_id) on public.review_rounds to authenticated;

create policy quiz_progress_select_own on public.quiz_progress
    for select to authenticated using (user_id = (select auth.uid()));
create policy quiz_progress_insert_own on public.quiz_progress
    for insert to authenticated with check (user_id = (select auth.uid()));
create policy quiz_progress_update_own on public.quiz_progress
    for update to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

create policy bookmarks_select_own on public.bookmarks
    for select to authenticated using (user_id = (select auth.uid()));
create policy bookmarks_insert_own on public.bookmarks
    for insert to authenticated with check (user_id = (select auth.uid()));
create policy bookmarks_update_own on public.bookmarks
    for update to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

create policy mistakes_select_own on public.mistakes
    for select to authenticated using (user_id = (select auth.uid()));
create policy mistakes_insert_own on public.mistakes
    for insert to authenticated with check (user_id = (select auth.uid()));
create policy mistakes_update_own on public.mistakes
    for update to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

create policy review_rounds_select_own on public.review_rounds
    for select to authenticated using (user_id = (select auth.uid()));
create policy review_rounds_insert_own on public.review_rounds
    for insert to authenticated with check (user_id = (select auth.uid()));
create policy review_rounds_update_own on public.review_rounds
    for update to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

-- Composite primary keys start with user_id and provide initial per-user
-- indexes. Add narrower indexes only after Stage 2C measures real queries.
