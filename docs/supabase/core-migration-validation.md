# Kiểm chứng migration core trên Supabase local

Ngày kiểm tra: 22/10/2026. Phạm vi: `supabase/migrations/20261022100804_create_core_schema.sql` trên PostgreSQL của Supabase CLI local. **Không áp dụng trên cloud.** PASS là phép kiểm tra đã chạy và đạt; FAIL là kết quả không đạt; NOT TESTED là chưa có bằng chứng thực nghiệm. Dữ liệu và tài khoản thử được giữ lại, không reset hoặc xóa database.

## Trước khi áp dụng

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| Đúng database local | PASS | Docker container `supabase_db_ju-study-hub` chạy PostgreSQL `17.11.0.004`, cổng host `54322`; CLI dùng `migration up --local`, không dùng `--linked`. |
| Dịch vụ tối giản | PASS | `supabase/config.toml` tắt Storage, Realtime, Analytics; không có container của ba dịch vụ này. PostgreSQL và Studio healthy. |
| Schema và dữ liệu cần bảo toàn | PASS | Trước migration, schema `public` không có bảng core, `auth.users` có 0 rows và chưa có `supabase_migrations.schema_migrations`. Không phát hiện dữ liệu người học trong các vị trí kiểm tra này. |
| Giữ thay đổi Git sẵn có | PASS | Trước thao tác đã có sửa `docs/progress.md`, `supabase/config.toml` và migration chưa tracked. Không ghi đè các file đó. |

`supabase start` tự áp dụng migration đang chờ. Để kiểm tra database **trước** khi áp dụng, tạm giữ file migration dưới đuôi `.stage2c-hold` trong cùng thư mục khi chạy `supabase start`, rồi khôi phục ngay sau đó. SHA-256 của migration trước và sau giống nhau: `EA0236CAFCFF6C1E6917FBE4802981BEF8F77D278E212C85A1BBC94613994791`. Không có seed file, không chạy `db reset`.

## Migration và cấu trúc

Chạy **một lần** `npx --no-install supabase migration up --local`: **PASS**, CLI báo áp dụng `20261022100804_create_core_schema.sql`, exit code 0. `supabase_migrations.schema_migrations` có đúng version `20261022100804`.

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| Bốn bảng core | PASS | `public.quiz_progress`, `bookmarks`, `mistakes`, `review_rounds`; không có bảng practice/exam do migration này tạo. |
| PK và FK | PASS | Catalog có PK trên `(user_id, subject_id, chapter_id)` cho quiz, PK theo ref cho bookmark/mistake, PK `(user_id)` cho Review; cả bốn FK tới `auth.users(id)` với `ON DELETE CASCADE`. Chưa thử xóa Auth user. |
| CHECK constraints | PASS | Catalog xác nhận version, revision, ID không rỗng, JSONB type, quiz reset shape, Review active/cleared shape và scope. Các request JSONB sai có phép thử riêng bên dưới. |
| RLS và policies | PASS | Cả bốn bảng `relrowsecurity=true`; mỗi bảng có SELECT, INSERT, UPDATE policy với `user_id = auth.uid()`, không có DELETE policy. |
| Grants | PASS | Role `authenticated` có SELECT/INSERT và UPDATE theo cột; không có DELETE. Role database `anon` không có SELECT. `authenticated` không có quyền EXECUTE trực tiếp `studyhub_touch_sync_row()`. |
| Trigger | PASS | Cả bốn bảng có trigger `BEFORE INSERT OR UPDATE` gọi `studyhub_touch_sync_row()`. Các INSERT/UPDATE thực tế bên dưới thành công dù client không có quyền EXECUTE trực tiếp function. |
| Tái lập từ database rỗng lần thứ hai | NOT TESTED | Không tạo database khác hoặc dùng `db reset` trong task này. |

## RLS và thao tác client

Kiểm thử qua REST `127.0.0.1:54321` với **hai Supabase Auth session hợp lệ A/B** tạo trên local, dùng anon API key làm `apikey`. Request chưa đăng nhập dùng role database `anon`, **khác** Supabase Anonymous Auth user. Không dùng service role để giả lập client. Pilot signup và các phép thử tạo tổng cộng 4 Auth users local. Chỉ ghi mã HTTP, không lưu email, password, JWT hoặc API key vào tài liệu.

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| A/B đọc và ghi dữ liệu của mình | PASS | A/B INSERT và SELECT mỗi bên đúng một row ở cả bốn bảng; HTTP 201/200. |
| A/B không đọc dữ liệu của nhau | PASS | Với dữ liệu thử ở từng bảng, A và B mỗi bên chỉ nhận row của mình. |
| Không sửa row khác owner | PASS | A PATCH row B ở cả bốn bảng nhận HTTP 200 nhưng 0 rows; B PATCH row A ở quiz nhận 0 rows. A INSERT với `user_id` của B bị HTTP 403. |
| Chưa đăng nhập không đọc/ghi | PASS | GET dữ liệu riêng ở cả bốn bảng trả HTTP 401; POST quiz trả HTTP 401. Grants/policies của `anon` áp dụng cùng quy tắc cho bốn bảng. Các phương thức ghi `anon` ở ba bảng còn lại chưa gọi riêng. |
| Client không DELETE | PASS | DELETE có filter hợp lệ trả HTTP 403 ở cả bốn bảng. Phép thử ban đầu cho ba bảng trả 400 do thiếu filter REST nên **không được dùng làm bằng chứng quyền**; đã chạy lại với filter. |
| Không tự UPDATE cột do server quản lý | PASS | PATCH `revision`, `created_at`, `updated_at` ở quiz đều HTTP 403 do column grants. Catalog cho thấy không cấp UPDATE các cột này, `user_id` hoặc PK ở cả bốn bảng. Chưa thử request riêng cho từng cột ở ba bảng còn lại. |

## Constraints, trigger và tombstone

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| Quiz revision/audit | PASS | UPDATE đáp án tăng revision từ 1 lên 2, giữ `created_at`, `updated_at` do server cấp; tiếp tục UPDATE tăng revision. |
| Operation ID mới | PASS | UPDATE với cùng `last_operation_id` bị HTTP 400; UUID mới được chấp nhận. |
| Quiz reset | PASS | PATCH `answers={}`, `current_question_id=null`, `reset_at=2000-01-01` vẫn giữ row, server thay reset time thành thời điểm hiện tại, giữ `created_at`. |
| Bookmark/mistake remove | PASS | PATCH `is_present=false` giữ row, tăng revision và giữ `created_at`. |
| Review clear | PASS | PATCH `items=[]`, progress rỗng, `cleared_at=2000-01-01` giữ row; server cấp `cleared_at`, tăng revision. Khôi phục cùng `round_id` sau clear bị HTTP 400. |
| Review active với items rỗng | PASS | INSERT bị HTTP 400. |
| Review round ID dạng text | PASS | INSERT round ID dạng `text-<UUID>` thành công, không ép về UUID. |
| JSONB sai dạng | PASS | Quiz `answers=[]` và Review `progress.answers=[]` bị HTTP 400. |
| FK vi phạm, mọi nhánh CHECK và timestamp ở mọi bảng | NOT TESTED | Xác nhận bằng catalog và các case đại diện, chưa lập ma trận toàn bộ tổ hợp. |

## CAS và giới hạn

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| Direct UPDATE chống lost update | **FAIL theo mục tiêu D6, đã dự kiến ở Stage 2B** | Hai PATCH hợp lệ của cùng owner, giả lập client thứ hai có snapshot cũ, không truyền `expected_revision`: cả hai thành công; bản cũ ghi đè đáp án mới hơn và revision tăng tiếp. RLS chỉ kiểm tra owner, trigger chỉ tăng revision. |
| RPC CAS | NOT TESTED | Chưa có RPC CAS trong migration này; proof of concept thuộc Stage 3. |

Không sửa migration đã áp dụng. Trước Stage 3, cần thiết kế và review RPC mẫu kiểm tra `expected_revision` cùng `last_operation_id`, sau đó đánh giá thu hồi direct UPDATE trên bảng được bảo vệ. Chừng nào direct owner UPDATE còn mở, không được tuyên bố database cưỡng chế CAS. Không có FAIL ngoài giới hạn CAS đã ghi rõ trong thiết kế Stage 2B.

## Trạng thái sau kiểm tra

Database thử local hiện còn **4 Auth users, 2 quiz rows, 3 bookmark rows, 3 mistake rows và 3 Review rows** do phép thử tạo. Chúng không phải dữ liệu production. Không chạy cleanup/reset vì task cấm xóa dữ liệu. Không sửa SQL, application source, Auth UI hay cloud sync. Stage 2C dừng tại đây để Ju review trước Stage 3.
