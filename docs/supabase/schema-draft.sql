-- Review draft only. Do not apply to a project or copy into supabase/migrations yet.
-- Assumes Supabase Auth provides auth.users(id), auth.uid(), and the authenticated role.
-- Anonymous Auth sign-in is assumed disabled; such users also receive authenticated.
-- Client mutations must use conditional revision updates; RLS alone does not prevent
-- an owner from overwriting their own newer data with an old snapshot.

create table public.quiz_progress (
    user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
    subject_id text not null check (btrim(subject_id) <> ''),
    chapter_id text not null check (btrim(chapter_id) <> ''),
    format_version smallint not null default 1 check (format_version = 1),
    current_question_id text check (current_question_id is null or btrim(current_question_id) <> ''),
    -- Cloud answer values: {"optionId": string, "isSubmitted": boolean,
    --                       "contentRevision": integer | null}. Validate IDs in app code.
    answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
    -- Reset tombstone requires an empty snapshot. A later CAS update starts a
    -- new attempt by setting reset_at = null with its new cursor/answers.
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
    round_id uuid not null default gen_random_uuid(),
    format_version smallint not null default 1 check (format_version = 1),
    scope_subject_id text check (scope_subject_id is null or btrim(scope_subject_id) <> ''),
    scope_chapter_id text check (scope_chapter_id is null or btrim(scope_chapter_id) <> ''),
    -- Ordered [{"subjectId": string, "chapterId": string, "questionId": string}].
    -- App validates unique, nonempty refs and membership of progress keys.
    items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array'),
    -- {"version":1,"currentQuestionId": string|null,"answers": {...}}.
    progress jsonb not null default '{"version":1,"currentQuestionId":null,"answers":{}}'::jsonb
        check (jsonb_typeof(progress) = 'object'
            and coalesce(progress->'version' = '1'::jsonb, false)
            and coalesce(jsonb_typeof(progress->'answers') = 'object', false)
            and progress ? 'currentQuestionId'
            and coalesce(progress->'currentQuestionId' = 'null'::jsonb
                or jsonb_typeof(progress->'currentQuestionId') = 'string', false)),
    -- Cleared rows retain a tombstone with empty items and progress. A new
    -- active round uses a fresh round_id and clears this marker in one CAS.
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

-- One trigger keeps server timestamps and monotonically increasing row revision.
-- A new logical update must use a new operation UUID; retry the same UUID only
-- after refetching and checking last_operation_id.
-- This trigger does NOT enforce expected_revision. Direct client UPDATE is
-- allowed by the grants below, so an owner can omit a revision filter and
-- overwrite their own newer row. MVP CAS is enforced by application behavior;
-- database-enforced CAS would require a separately reviewed RPC plus removal
-- of direct browser UPDATE permission.
create function public.studyhub_touch_sync_row()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    if tg_op = 'INSERT' then
        new.revision := 1;
        new.created_at := now();
    else
        if new.last_operation_id is not distinct from old.last_operation_id then
            raise exception 'new last_operation_id required for update' using errcode = '23514';
        end if;
        new.revision := old.revision + 1;
        new.created_at := old.created_at;
    end if;
    new.updated_at := now();
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

revoke all on function public.studyhub_touch_sync_row() from public, anon, authenticated;

alter table public.quiz_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.mistakes enable row level security;
alter table public.review_rounds enable row level security;

revoke all on table public.quiz_progress, public.bookmarks, public.mistakes,
    public.review_rounds from anon, authenticated;
grant select, insert, update on table public.quiz_progress, public.bookmarks,
    public.mistakes, public.review_rounds to authenticated;
-- Deliberately no browser DELETE grant/policy: reset/removal leaves a tombstone.

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

-- Each composite primary key starts with user_id, so it is also the initial
-- B-tree index for RLS's ownership predicate and the expected per-user reads.
-- Add narrower indexes only after measuring real queries.
