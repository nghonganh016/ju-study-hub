# Thiết kế RPC CAS mẫu cho quiz progress

Trạng thái: **thiết kế Stage 3A đã được Ju duyệt; Stage 3B chưa triển khai thành công** (22/10/2026). Tài liệu này đối chiếu [D6/D8](decisions.md), [data model](data-model.md), [kế hoạch Stage 3](implementation-plan.md), [SQL draft](schema-draft.sql), [kết quả Stage 2C](core-migration-validation.md) và migration `20261022100804_create_core_schema.sql`. Migration core đã chạy trên Supabase local; RPC chưa được tạo hoặc thử thành công. `schema-draft.sql` là bản nháp cũ, nên cột, trigger và grants **trong migration core** là baseline kỹ thuật. Application hiện chưa dùng Auth hoặc cloud sync.

## Mục tiêu và phạm vi

Một mutation mẫu cho **một row `quiz_progress`** có khóa `(user_id, subject_id, chapter_id)`. Database chỉ chấp nhận snapshot khi revision khớp và luôn giữ reset tombstone. RPC không đọc catalog, sửa nội dung câu hỏi, kiểm tra đáp án đúng/sai hoặc chấm lại `answers`; validation câu/option/content revision vẫn thuộc luồng import và ứng dụng ở stage sau. Không mở rộng RPC sang ba bảng core còn lại trong Stage 3A. Khi chúng còn direct write, không gọi chúng là database-enforced CAS.

## Interface và kết quả đề xuất

`public.cas_quiz_progress(p_subject_id text, p_chapter_id text, p_expected_revision bigint, p_operation_id uuid, p_action text, p_current_question_id text, p_answers jsonb)`.

- Không nhận `user_id`. Trong function lấy `v_user_id := auth.uid()` và từ chối nếu null; mọi câu lệnh lọc bằng `v_user_id` và cặp chapter ID. `p_subject_id`/`p_chapter_id` phải là chuỗi không rỗng sau `btrim`, không âm thầm trim hoặc đổi ID. Catalog membership chỉ được app/import xác minh, vì database chưa có catalog.
- `p_expected_revision` bắt buộc: `0` chỉ dành cho create-if-absent; `>= 1` dành cho row đã tồn tại. Null, âm hoặc lớn hơn miền `bigint` là input không hợp lệ. Revision tăng tới giới hạn `bigint` phải báo lỗi, không wrap.
- `p_operation_id` là UUID do outbox tạo một lần cho một **ý định** và giữ nguyên qua retry. Null, UUID sai cú pháp hoặc UUID nil `00000000-0000-0000-0000-000000000000` bị từ chối. UUID không tự chứng minh uniqueness toàn cục.
- `p_action` là `save` hoặc `reset`. `save` nhận snapshot đủ gồm cursor nullable và `answers` JSON object, đặt `reset_at = null`. `reset` chỉ chấp nhận cursor null và `answers = {}`, đặt tombstone bằng server time qua trigger. Không nhận `reset_at`, `revision`, `created_at` hoặc `updated_at` từ client. `format_version` giữ 1 theo schema hiện hành.
- Kết quả có `status = applied | already_applied | conflict`, `revision` và snapshot server (`current_question_id`, `answers`, `reset_at`, `last_operation_id`, `created_at`, `updated_at`) khi có row. `conflict` gồm row hiện tại để ứng dụng giữ cả bản pending lẫn cloud; nếu row chưa tồn tại thì trả `current = null`. Không trả row khác owner. Input sai/operation ID bị tái dùng với payload khác là lỗi riêng, không phải `conflict`. Không dùng `updated_at` để chọn bản thắng.

Trong một RPC call, PostgreSQL thực thi function trong transaction của request. `applied`/`already_applied` là ACK cho đúng operation đang xét; `conflict` không tự gộp hoặc tự retry với revision mới.

## Quy tắc create, update và reset

| Trạng thái row | Điều kiện | Hành động |
| --- | --- | --- |
| Chưa có row | `expected_revision = 0` | `INSERT ... ON CONFLICT DO NOTHING` với owner từ `auth.uid()`, snapshot hợp lệ và operation ID; trigger đặt revision 1 và timestamps. Nếu insert thua cuộc đua, đọc row vừa xuất hiện và xử lý replay/conflict. |
| Chưa có row | `expected_revision >= 1` | `conflict` với `current = null`; không tự tạo row. |
| Đã có row | `expected_revision = 0` | Chỉ trả `already_applied` nếu operation cuối và snapshot khớp với chính create ở revision 1; còn lại `conflict`. Tombstone cũng là row đã tồn tại, không phải chỗ trống để import lại. |
| Đã có row | `expected_revision = current.revision` và operation ID mới | Một `UPDATE` nguyên tử của cursor, answers, reset marker và operation ID. Trigger tăng revision đúng một lần. |
| Đã có row | Revision khác | Kiểm tra khả năng retry gần nhất như dưới đây; nếu không khớp, `conflict`, không ghi. |

`reset` ghi `current_question_id = null`, `answers = {}` và `reset_at` non-null, giữ row. `save` sau reset chỉ được phép với revision của tombstone mới nhất và operation ID mới; trong cùng UPDATE xóa `reset_at` và ghi snapshot của lượt mới. Thiết bị còn revision trước reset nhận conflict, không được tự lấy revision mới để phát lại answer cũ. `save` có snapshot rỗng khác `reset`: nó để `reset_at = null` và không có nghĩa xóa tiến độ.

Pseudocode minh họa, **không phải SQL chạy được hoặc migration**:

```text
reject unauthenticated or invalid arguments; owner := auth.uid()
if expected_revision = 0:
    INSERT owner, subject, chapter, snapshot/action, operation_id
      ON CONFLICT (user_id, subject_id, chapter_id) DO NOTHING
      RETURNING row
    if inserted: return applied(row)

SELECT row WHERE key = (owner, subject, chapter) FOR UPDATE
if no row: return conflict(null)

if row.last_operation_id = operation_id:
    if row.revision = expected_revision + 1
       and stored snapshot matches requested action and payload:
        return already_applied(row)
    if stored snapshot differs: raise operation_id_reused
    return conflict(row)  -- cùng ID nhưng không chứng minh được ACK này

if row.revision <> expected_revision: return conflict(row)
UPDATE public.quiz_progress
   SET current_question_id = requested_cursor,
       answers = requested_answers,
       reset_at = requested_reset_marker,
       last_operation_id = operation_id
 WHERE key = (owner, subject, chapter)
   AND revision = expected_revision
 RETURNING row
if no row: return conflict(current row)
return applied(row)
```

Đối với create race, unique PK là trọng tài; `ON CONFLICT DO NOTHING` không sửa row thắng. Sau khi nhánh insert không trả row, một **statement mới** đọc row và khóa `FOR UPDATE`, rồi áp quy tắc replay/conflict. Với row sẵn có, khóa giữ từ lúc đọc revision đến mutation; predicate `revision = expected_revision` ở UPDATE là lớp kiểm tra bổ sung. Stage 3B cần kiểm tra hành vi thực tế ở isolation mặc định `READ COMMITTED`, cả lỗi serialization/timeout nếu cấu hình khác. Không dùng cách `SELECT` rồi `INSERT` trần vì hai client có thể cùng thấy row vắng.

## Concurrency và idempotency

`last_operation_id` lưu **duy nhất operation cuối của row**. So `last_operation_id`, revision liền sau `expected_revision` và snapshot đã chuẩn hóa có thể nhận retry *ngay sau* một write thành công. Với reset, so cursor null, answers rỗng và `reset_at IS NOT NULL`, không so timestamp client. JSONB so theo giá trị JSON, không theo thứ tự key. Client phải gửi lại đúng action, expected revision và payload cũ. Response mất sau commit thì refetch row; chỉ ACK nếu đủ ba điều kiện trên. Nếu một operation khác đã ghi tiếp, trả conflict/unknown outcome, giữ pending để người dùng xử lý. Không tuyên bố exactly-once cho mọi retry.

| Tình huống | Kết quả dự kiến |
| --- | --- |
| Hai client cùng owner, cùng expected revision, hai operation ID khác nhau | Một call `applied`; call còn lại chờ khóa rồi `conflict`, không ghi đè. |
| Expected revision cũ | `conflict` kèm row hiện tại, không sửa dữ liệu. |
| Thiếu expected revision | Lỗi input trước mọi write; không lấy revision hiện tại làm mặc định. |
| Retry hai lần cùng operation ID, cùng expected revision/payload | Nếu operation vẫn là cuối: `already_applied`, không chạy UPDATE/trigger lần nữa. Nếu đã có write khác: conflict/unknown outcome. |
| Response mất sau commit | Refetch và so operation ID + revision kế tiếp + snapshot; ACK khi đủ điều kiện, ngược lại giữ pending. |
| Reset rồi thiết bị cũ gửi save | Revision cũ conflict; tombstone giữ nguyên. Chỉ ý định mới dựa trên revision tombstone được save. |
| Operation ID cuối bị dùng lại với payload/action khác | Lỗi `operation_id_reused`, không sửa row. ID cũ hơn operation cuối **không thể nhận ra chắc chắn** với schema hiện tại. |
| Revision/operation ID không hợp lệ | Lỗi input, không write; UUID sai cú pháp có thể bị PostgreSQL từ chối trước khi vào function. |

Giới hạn quan trọng: sau một write khác, row mất dấu operation trước. Cùng UUID cũ với `expected_revision` **mới** và payload mới có thể bị coi là ý định mới vì không có bảng lịch sử/unique constraint theo operation ID. Outbox phải bảo đảm ID ổn định và không tái sử dụng, nhưng đó không là ràng buộc database toàn cục. Nếu Ju cần phát hiện mọi lần dùng lại ID hoặc ACK mọi lost response bất kể có write xen vào, cần **idempotency ledger** có unique key theo owner và operation ID, payload digest và retention policy; đây là quyết định/schema riêng, ngoài PoC này.

## Quyền truy cập và đường bypass

**Đề xuất `SECURITY DEFINER`** vì sau khi thu hồi direct `INSERT`/`UPDATE`, `SECURITY INVOKER` chạy với quyền `authenticated` sẽ không còn ghi bảng. Giữ invoker chỉ khả thi nếu để quyền direct write và như vậy chưa đạt mục tiêu cưỡng chế CAS. Function nên thuộc một role DB riêng `NOLOGIN`, `NOBYPASSRLS`, **không** là owner bảng và không được grant cho `anon`/`authenticated` như role membership. Role này chỉ có `USAGE` schema cần thiết, `SELECT`, `INSERT`, `UPDATE` các cột cần thiết trên `public.quiz_progress`, cùng RLS policies dành riêng cho role đó với `user_id = auth.uid()`. Tạo/grant/owner role là việc Stage 3B cần thử với Supabase local. Nếu buộc function thuộc `postgres`/table owner, function có thể bypass RLS: mọi nhánh phải lọc/ghi `user_id = auth.uid()` một cách tường minh, từ chối uid null, review kỹ mọi thay đổi function, và test chéo A/B/anon. Ưu tiên role riêng để có thêm RLS như lớp phòng vệ.

Đặt `SET search_path = ''`; schema-qualify bảng, `auth.uid()` và các object/function không thuộc `pg_catalog`. Dùng SQL tĩnh với tham số typed, không nối tên bảng/cột/SQL từ client, tránh SQL injection. Function không nhận user ID, không trả toàn bảng, không có dynamic SQL. Thu hồi `EXECUTE` trên **đúng signature** từ `PUBLIC`, `anon` và các grant mặc định/hiện hữu; chỉ cấp `EXECUTE` cho `authenticated`. Bảo đảm `anon` không gọi được và `auth.uid()` null vẫn bị chặn, kể cả khi cấu hình grant thay đổi. Kiểm tra quyền `USAGE` schema và quyền đọc của definer role; trigger `studyhub_touch_sync_row()` chạy khi function ghi và không phải browser RPC.

Migration hiện cấp `SELECT, INSERT` và column-level `UPDATE (current_question_id, answers, reset_at, last_operation_id)` cho `authenticated`; RLS owner cho SELECT/INSERT/UPDATE. Stage 3B phải **thu hồi INSERT và toàn bộ table-level lẫn column-level UPDATE** của `authenticated` trên riêng `quiz_progress`, kiểm tra grant kế thừa từ `PUBLIC`/`anon` và các role mà client thực sự dùng. Giữ `SELECT` để client refetch conflict/tombstone nếu được duyệt. Không cấp DELETE, TRUNCATE hay quyền sửa trigger/revision. RLS UPDATE policy vẫn cần cho definer role nếu dùng role không bypass RLS; có thể giữ policy cũ của `authenticated` dù không còn quyền UPDATE, nhưng phải test rằng nó không mở bypass. Direct `INSERT`, `PATCH` không predicate, upsert, REST và GraphQL (nếu bật), function khác có quyền ghi, view writable và đường server/service role đều phải được kiểm kê. Privileged service role/DB admin là ranh giới tin cậy, không phải client thường; không để credential đó trong browser. Không thể tuyên bố database-enforced CAS nếu một đường ghi thường vẫn bypass RPC.

Việc thu hồi direct write là thay đổi API: client tương lai, import tool và outbox phải gọi RPC cho mọi create/save/reset quiz; code đang dùng direct `INSERT`/`UPDATE` sẽ lỗi quyền. Cần phối hợp rollout và test, không âm thầm thu hồi trên production. Ba bảng core khác chưa đổi quyền trong PoC.

## Trigger và transaction

`studyhub_touch_sync_row()` hiện đặt revision 1 khi INSERT; khi UPDATE đòi `last_operation_id` khác `OLD`, đặt `NEW.revision = OLD.revision + 1`, giữ `created_at`, cấp `updated_at = statement_timestamp()` và quản lý `reset_at` khi chuyển sang reset. RPC **không tự tăng revision** và không tự đặt timestamps. Nó chỉ gửi operation ID mới ở nhánh mutation thực sự. Nhánh replay/conflict không UPDATE nên trigger không chạy; retry không đổi `updated_at`. `reset` đang reset tiếp một tombstone với operation mới sẽ tăng revision nhưng giữ `reset_at` cũ theo trigger; app cần phân biệt đó là ý định reset mới, không phải retry mù. Khi `save` xóa marker và sau đó reset lại, trigger cấp thời điểm reset mới. Kiểm tra revision và write nằm trong cùng transaction/row lock; lỗi từ trigger hoặc constraint rollback cả call.

## Test cases cho Stage 3B và 3C

Stage 3B: tạo RPC và quyền trên môi trường thử theo migration **mới sau khi Ju duyệt**. Stage 3C: chạy kiểm thử hai session, REST/RPC và kiểm kê bypass. Giữ 4 Auth users/11 rows Stage 2C trong lượt thiết kế này; khi sang thực nghiệm phải dùng fixture mới/cách ly hoặc thống nhất cách bảo toàn dữ liệu.

| ID | Case | Kỳ vọng cần chứng minh |
| --- | --- | --- |
| B01 | A create-if-absent, expected 0; A/B khác owner cùng chapter | A revision 1, timestamp server; B chỉ thấy và ghi row của B. |
| B02 | Hai call A cùng chapter chưa có row, expected 0, ID khác | Một insert; call còn lại conflict, không update row thắng. |
| B03 | A update row revision N, hai client A cùng N/ID khác | Một applied revision N+1; một conflict; snapshot thắng giữ nguyên. |
| B04 | Expected cũ, thiếu/null, âm, overflow; operation UUID null/nil/malformed; ID chapter rỗng | Lỗi hoặc conflict đúng loại, zero writes. |
| B05 | Retry cùng ID/payload; response mất sau commit và refetch | already_applied hoặc ACK theo so khớp; revision/timestamps không đổi. |
| B06 | Cùng ID cuối nhưng payload/action khác; cùng ID cũ sau write xen vào | Trường hợp cuối bị từ chối; trường hợp ID cũ chứng minh giới hạn ledger, không nhận vơ exactly-once. |
| B07 | Reset, stale save, save mới từ tombstone, reset lặp với ID mới | Tombstone giữ; stale conflict; save mới revision kế tiếp, xóa marker; reset mới theo trigger. |
| B08 | INSERT/UPDATE trigger và `created_at`/`updated_at`; constraint answers/cursor | Revision tăng đúng 1, `created_at` giữ, timestamp server, invalid snapshot rollback. |
| C01 | A/B/anon gọi RPC, A thử chapter của B | Chỉ A/B đã đăng nhập được EXECUTE; không đọc/sửa row khác owner. |
| C02 | Direct REST INSERT/PATCH/upsert và đường API khác dưới authenticated sau revoke | Bị từ chối; SELECT own vẫn hoạt động; không còn direct write thường bypass RPC. |
| C03 | Role/function ACL, owner/BYPASSRLS, `search_path`, schema `USAGE`, trigger quyền | Catalog và runtime đúng với security model đã duyệt; không có EXECUTE công khai. |
| C04 | Concurrent calls qua hai connection thật, lost response, rollback khi lỗi trigger | Chỉ một commit theo revision; không side effect từ retry/conflict/error. |

## Quyết định cần Ju duyệt trước Stage 3B

1. Chấp nhận contract `expected_revision = 0` cho create, `save/reset` chung một RPC, và snapshot conflict trả về row hiện tại của owner.
2. Chấp nhận mức idempotency **chỉ với operation cuối** cho PoC, hay bổ sung ledger để bảo đảm retry sau write xen vào và cấm tái dùng ID toàn cục. Nếu chọn ledger, cần thiết kế/schema/task riêng trước khi tuyên bố bảo đảm mạnh hơn.
3. Chọn definer role riêng với RLS policy bổ sung; nếu môi trường không cho cấu hình role đó, review phương án function owner có bypass RLS và bằng chứng bảo vệ owner trước khi chạy.
4. Cho phép Stage 3B tạo migration mới thu hồi direct `INSERT` và `UPDATE` của `quiz_progress`, cùng RPC/quyền liên quan. Việc này sẽ làm hỏng client direct write trong tương lai cho đến khi chuyển sang RPC.

Không chạy migration, SQL, Auth hoặc kiểm thử database trong Stage 3A. Kết quả ở đây là hợp đồng để review; mọi hành vi concurrency/quyền nêu trên là **kỳ vọng cần kiểm chứng**, chưa phải PASS.

## Tài liệu PostgreSQL và Supabase tham chiếu

- [PostgreSQL 17: row lock](https://www.postgresql.org/docs/17/explicit-locking.html) và [transaction isolation](https://www.postgresql.org/docs/17/transaction-iso.html): cơ sở cho `FOR UPDATE` và kiểm chứng create race ở `READ COMMITTED`.
- [PostgreSQL 17: row security](https://www.postgresql.org/docs/17/ddl-rowsecurity.html), [trigger transaction](https://www.postgresql.org/docs/17/trigger-definition.html) và [quyền truy cập](https://www.postgresql.org/docs/17/sql-grant.html): owner/bypass RLS, rollback trigger và phân biệt table-level với column-level grants.
- [Supabase: database functions](https://supabase.com/docs/guides/database/functions): `SECURITY DEFINER`, `search_path`, owner và `EXECUTE` mặc định.

## Trạng thái thử triển khai Stage 3B

Ngày 22/10/2026, preflight local xác nhận migration core `20261022100804`, 4 Auth users và 11 core rows. Tạo bản SQL `supabase/migrations/20261022175648_quiz_progress_cas_rpc.sql.stage3b-blocked` theo contract trên. Lần `supabase migration up --local` **thất bại** tại `ALTER FUNCTION ... OWNER TO studyhub_quiz_rpc`: PostgreSQL báo `must be able to SET ROLE "studyhub_quiz_rpc"` (SQLSTATE `42501`). Role thực thi migration không thể chuyển ownership cho role vừa tạo. Do file có transaction `BEGIN`/`COMMIT`, phép kiểm tra read-only sau lỗi cho thấy rollback: migration history vẫn chỉ có core version, role/function/policies mới không tồn tại, grants direct write cũ vẫn còn, số row vẫn `4|2|3|3|3`. Đây chưa phải kiểm chứng RPC hoặc database-enforced CAS.

Để tránh lần `supabase start` sau tự chạy lại migration lỗi, bản SQL được giữ với đuôi `.stage3b-blocked`, không còn là migration được CLI nhận diện. **Không áp lại tự động.** Một phương án cần Ju review là cấp tạm quyền `SET ROLE` từ role chạy migration sang role function mới trong cùng transaction, chuyển owner, rồi thu hồi membership trước commit; phải xác minh cú pháp/khả năng trên Supabase local và kiểm tra quyền cuối cùng. Không chuyển sang owner `postgres` hoặc role có `BYPASSRLS` nếu chưa được duyệt. Các test create/save/reset/retry, grants và bypass của Stage 3B đều chưa chạy vì function chưa tồn tại.
