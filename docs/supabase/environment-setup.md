# Chuẩn bị môi trường Supabase thử nghiệm trước Stage 2

Trạng thái: **hướng dẫn chuẩn bị, chưa tạo project, cài công cụ, tạo migration hay chạy SQL**. Đối chiếu checkout và tài liệu Supabase chính thức ngày 21/10/2026. [decisions.md](decisions.md) là nguồn D1–D10; [data-model.md](data-model.md) và [implementation-plan.md](implementation-plan.md) xác định phạm vi Stage 2. File [schema-draft.sql](schema-draft.sql) mở đầu bằng cảnh báo không áp dụng: `review_rounds.round_id uuid` còn trái D7 yêu cầu `text`, và direct `UPDATE` chưa cưỡng chế CAS tại database.

## 1. Git checkpoint hiện tại

`master` đang bằng `origin/master` tại `1ce5246`. Không có file mới chưa được Git theo dõi hoặc file đã stage. Sáu file modified trước task chuẩn bị này thuộc **Stage 1B.3**: `lib/import-staging-capture.ts`, `lib/import-staging-idb.ts`, hai test tương ứng, `docs/supabase/import-staging-design.md` và `docs/progress.md`. Không có dữ liệu thử nghiệm trong Git diff; `.next/`, `.env*` và `*.tsbuildinfo` được ignore. Browser probe tạm đã gỡ khỏi source; bản ghi thử trong IndexedDB trên máy vẫn tồn tại, không nằm trong Git và không được tự xóa theo chính sách Stage 1.

Các nhóm Ju muốn checkpoint đã chồng lấn trong commit cũ:

| Nhóm logic | Tình trạng trong Git | Nếu lịch sử chưa commit, thông điệp commit riêng nên là |
| --- | --- | --- |
| Quiz test fixture Session 1 | Đã ở `804631f`, cùng sửa mistakes. Commit `ce625eb` trước đó đổi prompt/revision trong ngân hàng câu hỏi, không phải commit sửa fixture. | `test: align Session 1 fixture with approved revision` |
| Orphan mistakes/Review | Đã ở `804631f`, cùng audit và fixture. | `fix: preserve orphan mistakes when opening Review` |
| Review state v2 | Đã ở `a528d60`, cùng docs và tests liên quan. | `feat: persist Review round and progress in v2 record` |
| Thiết kế Supabase | Đã ở `1ce5246`, cùng capture/gate. | `docs: record Supabase decisions and import staging design` |
| Raw capture và IndexedDB | Đã ở `1ce5246`; fix recovery Stage 1B.3 còn modified. | `feat: capture raw local data in IndexedDB staging` |
| Bootstrap gate và recovery | Gate đã ở `1ce5246`; fix và tests recovery Stage 1B.3 còn modified. | `fix: diagnose orphan snapshots and protect bootstrap recovery` |

**Đề xuất checkpoint cho trạng thái hiện tại:** không viết lại ba commit đã chia lẫn phạm vi. Sau khi Ju review, có thể tạo **một** commit cho toàn bộ diff còn lại, gồm Stage 1B.3 và tài liệu chuẩn bị này, ví dụ `chore: checkpoint Stage 1 recovery and Stage 2 environment plan`. Nếu Ju muốn hai commit mới, phải stage từng hunk của `docs/progress.md` và kiểm tra lại diff; lợi ích nhỏ so với rủi ro nhầm phạm vi. Không đưa `.env.local`, mật khẩu database, access token, `supabase/.temp`, `.next`, ảnh chụp hoặc bản ghi thử IndexedDB vào commit. Task này không stage/commit gì.

## 2. Môi trường Ju tạo trên Dashboard

1. Trong [Supabase Dashboard](https://supabase.com/dashboard), Ju tạo **project riêng cho development/testing**, khác mọi project dùng dữ liệu thật. Chọn organization, tên dễ nhận biết, region phù hợp và lưu database password trong password manager. Region ảnh hưởng độ trễ và vị trí dữ liệu; chưa cần chốt một region cụ thể cho tài liệu này. [Nguồn: Supabase Platform](https://supabase.com/docs/guides/platform), [Regions](https://supabase.com/docs/guides/platform/regions).
2. Giữ project mới chưa có bảng Study Hub; **không chạy `schema-draft.sql` trong SQL Editor**. Khi Stage 2B có migration đã review, chọn một đường triển khai qua CLI để lịch sử migration tái tạo được. Không tạo bảng thủ công trên Dashboard rồi áp migration cùng bảng lần nữa. [Nguồn: Supabase local workflow](https://supabase.com/docs/guides/local-development/cli-workflows).
3. Tại project **Connect** hoặc **Settings → API Keys**, lấy Project URL và **publishable key**. Chỉ giữ hai giá trị này cho Next.js client sau khi Stage Auth được duyệt; hiện tại chưa tạo `.env.local`. Không lấy secret key/service-role key cho browser. Publishable key sẽ chạy dưới role `anon` khi không có phiên và `authenticated` khi có JWT; secret/service-role bỏ qua RLS. [Nguồn: API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Next.js quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs).
4. Ghi riêng project ref từ Dashboard URL cho bước `supabase link`; không đưa database password, CLI access token hoặc connection string vào Git, issue, ảnh chụp hoặc tài liệu. Nếu cấu hình OAuth ở Stage 4, Ju sẽ tạo Google OAuth client, nhập client ID/secret trên Dashboard và cấu hình Site URL cùng redirect URL đúng origin/port. Chưa cần làm OAuth cho Stage 2B RLS. [Nguồn: Google sign-in](https://supabase.com/docs/guides/auth/social-login/auth-google), [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls).

## 3. Biến môi trường và bảo vệ credentials

Khi Stage 4 bắt đầu tích hợp Next.js, `.env.local` trên máy dev cần:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

Hai biến `NEXT_PUBLIC_` được đóng vào bundle client, nên publishable key **không phải secret**; bảo vệ dữ liệu bằng JWT, grants và RLS. Tuy vậy dùng project URL/key riêng cho từng môi trường để tránh app dev trỏ nhầm production. Không đặt `sb_secret_...`, legacy `service_role`, database password, `SUPABASE_ACCESS_TOKEN` hay Google client secret trong biến `NEXT_PUBLIC_`. Các secret phục vụ CLI/server chỉ nằm ở môi trường tin cậy và được nhập qua prompt hoặc secret manager. `.gitignore` hiện ignore toàn bộ `.env*`, kể cả `.env.example`; nếu cần commit template không chứa giá trị, sửa ignore rule ở task triển khai riêng. [Nguồn: API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Next.js quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs).

## 4. Công cụ và quy trình migration dự kiến cho Stage 2B

**Chưa chạy các lệnh dưới đây trong task này.** Trên Windows, local stack cần Supabase CLI cùng Docker Desktop hoặc container runtime tương thích. Cách npm do Supabase hướng dẫn là cài CLI làm dev dependency, yêu cầu Node.js 20+ và chạy qua `npx`; việc cài đó cần task riêng vì hiện bị giới hạn không thêm dependency. Nếu Ju muốn tránh dependency trong repo, dùng CLI cài riêng theo hướng dẫn Windows của Supabase và ghi lại version dùng khi tạo migration. [Nguồn: Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started?platform=npm&queryGroups=platform), [Local development](https://supabase.com/docs/guides/local-development).

Sau khi Ju duyệt Stage 2B và công cụ:

```text
supabase init
supabase start
supabase migration new create_core_schema
supabase db reset
supabase test db
supabase login
supabase link --project-ref <dev-project-ref>
supabase migration list
supabase db push --dry-run
supabase db push
```

Nếu CLI được cài bằng npm trong repo, dùng `npx supabase` thay `supabase`. `supabase/migrations/<timestamp>_create_core_schema.sql` sẽ được viết từ **bản thiết kế đã cập nhật và review**, không copy trực tiếp SQL draft. Stage 2B cần sửa `round_id` sang `text`, kiểm tra PK/FK/CHECK/trigger/grants/RLS, giữ bốn bảng core và thử trên local rỗng trước khi push dev. Commit migration và `supabase/config.toml` sau review; không commit `supabase/.temp`, `.branches`, token hoặc secret. `seed.sql` chỉ chứa dữ liệu giả nếu có và chỉ dùng trong local/dev. [Nguồn: local workflow](https://supabase.com/docs/guides/local-development/cli-workflows), [database migrations](https://supabase.com/docs/guides/local-development/database-migrations).

**Rollback thử nghiệm:** trước khi áp remote, dùng `supabase db reset` để xây lại **local database** từ migration và sửa migration chưa phát hành nếu lỗi. Sau khi migration đã push lên project thử, ưu tiên một migration sửa tiếp có review và test; không sửa âm thầm file đã áp rồi gọi đó là rollback. Nếu cần quay về trạng thái rỗng trên **project thử có thể bỏ**, Ju phải xác nhận đúng project và việc mất toàn bộ dữ liệu thử trước khi dùng `supabase db reset --linked`; lệnh này phá dữ liệu của project đã link. `supabase migration repair` chỉ sửa lịch sử migration khi lệch, không đảo ngược SQL. Không dùng reset linked trên project production hoặc có dữ liệu cần giữ. [Nguồn: local workflow](https://supabase.com/docs/guides/local-development/cli-workflows), [rollback guidance](https://supabase.com/docs/guides/local-development/declarative-database-schemas).

## 5. Kế hoạch kiểm thử RLS Stage 2B

Sau khi có migration, tạo **hai user thử riêng A/B** trong Supabase Auth của project thử và một client chỉ có publishable key, không session. Dùng ba phiên/client độc lập qua cùng API mà app sau này sử dụng, không dùng SQL Editor/service-role để kết luận RLS. Với mỗi bảng core, kiểm tra A đọc/ghi row của A, B không thấy/không sửa được row A, A không thể insert row gắn `user_id` B, và client `anon` không đọc/ghi được. Xác nhận browser/client không có `DELETE` grant; thao tác bỏ/reset phải dùng tombstone. Kiểm tra cả quyền `GRANT` lẫn policy vì lỗi grant khác với policy lọc row. Supabase Auth **anonymous sign-in** không đồng nghĩa Postgres role `anon`: user đăng nhập ẩn danh vẫn dùng role `authenticated`; draft hiện giả định tính năng này tắt, cần xác nhận cấu hình. [Nguồn: RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [API keys](https://supabase.com/docs/guides/getting-started/api-keys).

Lưu test SQL/pgTAP tại `supabase/tests/database/` và chạy `supabase test db` trên local; browser/API test bằng hai JWT thực là cổng bổ sung cho hành vi end-to-end. Test hai client **cùng user** ghi revision cũ thuộc Stage 3 CAS, không được coi là RLS test. SQL draft hiện cho direct `UPDATE`; dù owner policy đạt, Stage 3 vẫn phải kiểm chứng và quyết định thu hồi đường ghi vượt RPC theo D8. [Nguồn: Supabase database testing](https://supabase.com/docs/guides/database/testing), [pgTAP](https://supabase.com/docs/guides/database/extensions/pgtap).

## 6. Điểm Ju cần duyệt trước Stage 2B

1. Xác nhận project thử riêng và organization/region Ju chọn; không dùng project đang có dữ liệu thật.
2. Chọn cách cài Supabase CLI: dev dependency có version pin trong repo, hoặc CLI riêng trên máy. Local stack cần container runtime phù hợp nếu chọn test local bằng `supabase start`.
3. Duyệt bản SQL core mới trước khi tạo migration: `round_id text`, constraints, RLS/grants và giới hạn direct `UPDATE` phải được ghi rõ. `schema-draft.sql` hiện chỉ là tài liệu tham khảo.
4. Chốt phương án tạo hai user thử, dữ liệu giả và cách reset **project thử**; giữ secret ngoài repo. OAuth/Next.js SDK thuộc stage sau, chưa phải điều kiện để kiểm tra RLS ở Stage 2B.

Stage 2B chỉ bắt đầu theo task riêng sau khi Ju review checkpoint và những quyết định trên.
