# Thiết kế dữ liệu Supabase sau Review v2

Trạng thái: **thiết kế dữ liệu dựa trên các quyết định đã duyệt, chưa triển khai**. Đối chiếu source ngày 20/10/2026. [decisions.md](decisions.md) là nguồn chính thức của D1–D10; tài liệu này mô tả mapping dữ liệu, schema cần thiết và migration. `schema-draft.sql` vẫn là bản nháp **bốn bảng cũ**, chưa được sửa hoặc chạy. `docs/pre-supabase-audit.md` là ảnh chụp ngày 18/10: các phát hiện về fixture Session 1, orphan mistakes và hai key Review không nguyên tử đã được xử lý ở Task 1–3. `docs/review-round-consistency-proposal.md` ghi lý do chuyển Review sang v2.

## 1. Kiểm kê dữ liệu local hiện tại

Mọi key thuộc **browser origin**, không có `user_id`, thời điểm sửa đáng tin cậy hoặc lịch sử thao tác. `lib/storage.ts` chỉ là adapter đồng bộ; từng module tự parse và xử lý lỗi. Chưa có Auth, cloud cache hoặc outbox trong ứng dụng.

| Key | Nguồn và dữ liệu đang lưu | Ghi chú nhập/sync |
| --- | --- | --- |
| `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` | `lib/quiz-progress.ts`, `hooks/useQuizProgress.ts`: version 1, cursor và map đáp án nháp/đã chấm. Một key mỗi chapter; reset xóa key. | `quiz_progress` theo user/chapter. Chụp raw trước khi hook có thể chuẩn hóa dữ liệu; reset cloud cần tombstone. |
| `ju-study-hub:bookmarks:v1` | `lib/bookmarks.ts`: version 1, danh sách ref `{subjectId,chapterId,questionId}`. | `bookmarks` theo ref. Parse loại item sai/trùng; giữ raw và ref không còn trong catalog. Vắng mặt trong local không phải lệnh xóa cloud. |
| `ju-study-hub:mistakes:v1` | `lib/mistakes.ts`: cùng kiểu ref; sai ở quiz hoặc exam thêm, đúng trong Review xóa. | `mistakes` theo ref. `ReviewMistakes` chỉ lọc để hiển thị, không còn xóa orphan khi mở trang. |
| **`ju-study-hub:review-state:v2`** | `lib/review-state.ts`, `components/ReviewMistakes.tsx`: `{version:2,roundId,scope,items,progress:{version:1,currentQuestionId,answers}}`. Một write chứa cả lượt và tiến độ; items có thứ tự, answer key là JSON tuple của ref. | **Nguồn Review chính**. `review_rounds` lưu lượt hiện hành, scope, items, progress và round ID trong một row; không nhập thêm v1 nếu v2 tồn tại. Ghi tiến độ lỗi chỉ giữ RAM và báo chưa lưu. |
| `ju-study-hub:review-round:v1` và `ju-study-hub:review-progress:v1` | `lib/mistakes.ts`, `lib/review-state.ts`: hai record riêng; chỉ đọc khi v2 **không tồn tại** để migration. Không ghi/xóa tiếp. | Chỉ là legacy. Tiến độ v1 có answer hoặc cursor đang làm cần người dùng chọn; raw hỏng/không khớp được giữ và báo. |
| `ju-study-hub:bookmark-practice:v1` | `lib/bookmark-practice.ts`: một record roundId, scope, ordered ref snapshot, cursor, answers. Tạo lượt sau ghi đè lượt trước; không có history. Khi restore, ref/answer không còn hợp lệ bị lọc để chạy UI. | Chưa có bảng cloud. Chụp **raw** trước `resolvePractice`, giữ phần bị lọc; không lấy bookmarks hiện tại để dựng lại lượt dở. |
| `ju-study-hub:exam-attempt:v1` | `lib/exam.ts`: một attemptId, config, snapshot **nội dung câu hỏi/đáp án đúng/nguồn**, answers, cursor, startedAt, deadlineAt, status, submit reason/result và mistakesApplied. Đề mới ghi đè attempt cũ. | Chưa có bảng cloud hoặc local exam history. Chỉ attempt còn trong key có thể import. Không coi `mistakesApplied` local là xác nhận cloud. |

`useQuizProgress` dùng chuỗi nội bộ `review-state`/`bookmark-practice` làm danh tính hook; chúng **không phải key localStorage**. Exam snapshot có đáp án đúng ở client nên điểm hiện tại phục vụ tự luyện, không chứng minh chống gian lận. Storage bị chặn/hết quota có thể làm thay đổi chỉ còn trong RAM và mất khi reload/OAuth redirect. Round ID/attempt ID chặn callback cũ trong một số luồng, nhưng localStorage không có compare-and-swap giữa hai tab.

## 2. Đối chiếu với bốn bảng SQL hiện có

| Bảng draft | Ánh xạ hiện tại | Điều còn thiếu hoặc cần sửa trước migration |
| --- | --- | --- |
| `quiz_progress` | Một snapshot mỗi `(user_id,subject_id,chapter_id)`; `answers jsonb`, revision, reset_at tombstone. | Local v1 không có content revision/timestamp. Không suy ra local mới hơn cloud; không xóa answer cũ vì catalog thay đổi. |
| `bookmarks` | Một row mỗi ref, `is_present=false` là tombstone. | Import local chỉ chứa ref hiện diện: phải đọc cả tombstone cloud và không hồi sinh ref đã bỏ. |
| `mistakes` | Một row mỗi ref, tombstone khi Review trả lời đúng. | Exam submit và ghi mistakes là hai thao tác local độc lập; cloud cần quy tắc idempotent, có thứ tự. |
| `review_rounds` | Một row hiện hành mỗi user, `items` và `progress` cùng row; `cleared_at` tombstone. | Nhập **v2** vào cùng row. Theo **D7 Approved**, đổi `round_id uuid` của SQL draft thành `text` trước migration; giữ nguyên ID local hợp lệ. Draft `format_version=1` là định dạng **cloud**, không phải local v2. |

Bốn bảng **không chứa** bookmark practice hoặc exam. Không nhét practice vào `review_rounds`: nguồn ref và vòng đời khác. Không nhét exam vào `quiz_progress`: exam cần nhiều attempts, snapshot câu hỏi, deadline và kết quả. RLS trong draft chỉ giới hạn chủ row, **không ép** client gửi expected revision. Direct `UPDATE` vẫn có thể ghi đè dữ liệu mới của cùng user. `last_operation_id` giúp nhận ra response mất khi nó còn là operation cuối, không phải nhật ký idempotency lâu dài. SQL chưa chạy; mọi nhận định RLS/CAS cần test trên project thử.

Hợp đồng core từ bản thiết kế trước vẫn áp dụng, trừ chỗ Review v1 đã thay bằng v2:

- Mỗi PK bắt đầu bằng `user_id` trỏ tới `auth.users.id`; RLS cho owner, không có browser `DELETE`. Quiz reset giữ row với `reset_at`; bookmark/mistake bỏ ref giữ `is_present=false`; Review clear giữ `cleared_at`. Bắt đầu mới cần revision mới và xóa marker tombstone trong cùng update có điều kiện.
- Cloud `answers` format 1 thêm `contentRevision:number|null` cho từng answer; import local v1 và Review v2 gắn `null` vì record local không ghi revision theo answer. Khi viết lại local, adapter bỏ field cloud bổ sung. `format_version` cloud không phải `version` local hoặc `Chapter.revision`. App kiểm tra ref, option, progress membership và catalog; SQL CHECK chỉ bảo vệ shape cơ bản.
- Review cloud active phải giữ ordered refs, cùng scope, cursor/answers thuộc lượt; thay lượt ghi scope, items, progress rỗng và round ID mới trong **một row update**. Tiến độ từ round cũ cần expected round ID cùng expected revision. Dữ liệu orphan trong v2 vẫn giữ nguyên để xem xét, dù UI chỉ hiển thị câu còn trong catalog.
- Server đặt `updated_at` và tăng revision bằng trigger; client dùng operation UUID mới cho ý định mới và giữ ID khi retry. Mất response thì đọc lại row, so operation ID **và desired snapshot** trước ACK. Nếu 0 row hoặc trạng thái khác, giữ pending và đưa vào conflict; không retry mù hoặc tự gộp. `updated_at` không phân xử xung đột.
- ID câu dùng đủ `(subject_id,chapter_id,question_id)`; đổi nghĩa câu/option cần ID hoặc migration nội dung có chủ đích. Ref đã bỏ khỏi catalog không bị xóa bởi sync. Không tự coi answer cũ đúng/sai theo đáp án hiện hành khi content revision khác hoặc không biết.

Thay đổi schema cần thiết theo D1–D10, **chưa sửa SQL**:

1. **D7 Approved, core:** đổi `review_rounds.round_id` sang `text`; import giữ nguyên string v2 hợp lệ, không ép kiểu hoặc đổi ID.
2. **D2 Approved, extended:** thêm `bookmark_practice_rounds` cho một active round/user với round ID, scope, ordered ref snapshot, progress, revision, operation ID, tombstone và RLS owner. Adapter chuyển được về local v1. **Design pending:** DDL chi tiết và cơ chế ràng buộc một active round.
3. **D3/D4/D9 Approved, extended:** thêm `exam_attempts` với PK `(user_id,attempt_id)`, config, ordered question snapshot, answers, cursor, deadline, status, submit reason/result, revision, operation ID, server timestamps, metadata nguồn `local legacy` và trạng thái xác minh. Nhiều completed rows tạo history phân trang; tối đa một working/user. **Design pending:** constraint một working, trạng thái bỏ lượt, mapping status local `submitted` sang trạng thái cloud, metadata thời điểm/nguồn answer offline và định nghĩa `unverified`. Local v1 không có timestamp từng answer, không được tạo chứng cứ giả khi import.
4. **D8/D10 Approved về yêu cầu bảo đảm:** Stage 3 thử một RPC CAS tại database, xem xét thu hồi direct `UPDATE` cho bảng được bảo vệ. Submit exam và áp mistake refs cần transaction/idempotency; chỉ thêm boolean `mistakes_applied` không làm hai bảng nguyên tử. **Design pending:** contract RPC/mutation, khóa/idempotency và thứ tự side effect với Review; thử response mất, retry và hai client.

JSONB giữ snapshot có thứ tự và nội dung cần xem lại; kiểm tra kích thước row thực tế trước migration. Catalog TypeScript vẫn là nguồn câu hỏi; giữ orphan refs và exam snapshot lịch sử dù catalog đổi. `contentRevision:null` của answer quiz/Review legacy chỉ có nghĩa không biết nội dung lúc trả lời; không tự chấm lại.

## 3. Nhập legacy và ownership

Đề xuất quy trình an toàn, **chưa được triển khai**:

1. Trước UI có thể ghi storage hoặc OAuth redirect, chụp **raw của bảy nhóm dữ liệu gồm tám key/pattern** ở bảng trên (Review v1 có hai key); giữ staging bền qua redirect và so lại raw sau callback. Nếu không tạo được staging bền, dừng import; không dùng snapshot chỉ trong RAM. Không xóa/sửa raw sau import.
2. Review: v2 hợp lệ thắng v1. V2 có mặt nhưng hỏng/không đọc được thì báo và dừng nhập Review, **không fallback v1**. Chỉ có v1 thì áp `inspectLegacyReview`: round/progress hợp lệ và rỗng có thể chuyển; có tiến độ thì chọn tiếp tục hay lượt mới; hỏng, thiếu round, ref/option không khớp thì giữ raw và báo. Không nhập cả v1 và v2 thành hai lượt.
3. Validate từng loại; preview phần hợp lệ, bị loại, orphan, cursor/answer và exam snapshot. `parsePractice`/`resolvePractice` và `restoreProgress` có thể lọc dữ liệu, nên không dùng output đã lọc làm bằng chứng raw. Theo **D9**, import result exam local hợp lệ với đúng điểm đã hiển thị và nhãn `local legacy`, không tự chấm lại hoặc gọi là thành tích đã xác minh. Nếu raw hỏng hoặc snapshot/result không nhất quán, báo và giữ raw, không nhập thành result hợp lệ. Quy tắc validation chi tiết còn phải thiết kế.
4. Dữ liệu origin không chứng minh thuộc ai. Sau khi xác minh `user.id`, người dùng chọn **nhập vào đúng tài khoản đang hiển thị, bỏ qua, hoặc để sau**. Đổi tài khoản không tự chuyển raw/cache/pending của A sang B; guest vẫn đọc dữ liệu guest. Phân vùng cache/outbox theo user và giữ bản guest riêng. Không xóa local khi login/logout hoặc sau cloud ACK. Máy dùng chung cần preview tài khoản đích.
5. Đọc cloud gồm tombstones; insert-if-absent cho entity mới, so sánh và xin lựa chọn với entity đã khác. Không dùng local timestamp, client `updated_at` hoặc thứ tự callback để chọn thắng. Quiz cùng chapter, Review/practice khác round không tự gộp. Exam cùng attemptId nhưng snapshot/status khác là conflict; ID khác là attempts độc lập, còn tranh chấp `working` cần quy tắc active attempt.
6. Import chỉ attempt exam **còn lưu trong v1**, không hứa phục hồi lịch sử cũ. Trước khi thay attempt local/đổi user, xử lý pending submit/mistakes của attempt cũ; không cho cờ local `mistakesApplied=true` bỏ qua xác nhận server. Đánh dấu import theo user, nguồn local và fingerprint raw/attemptId sau khi xác nhận cloud. Mất response thì đọc lại theo PK/operation ID trước retry; giữ raw tới khi xác nhận.

## 4. Đồng bộ, reset và các chi tiết còn thiết kế

Theo **D1/D5/D6 Approved**, core release chỉ sync bốn bảng hiện có. Guest dùng localStorage; practice và exam vẫn local, có thông báo rõ. Authenticated dùng local-first state, outbox bền theo user và trạng thái `pending`/`synced`/`conflict`. Không tự xóa raw local, không tự chuyển guest hoặc dữ liệu tài khoản A sang B. CAS theo revision, Review thêm round ID; không last-write-wins theo đồng hồ máy và không tự gộp snapshot xung đột. Khi storage bị chặn/hết quota, phải báo thay đổi RAM có thể mất sau reload.

Theo **D4 Approved**, deadline exam là mốc tuyệt đối, không gia hạn offline. Answer ghi cục bộ trước deadline có thể gửi lên cloud sau deadline; answer tạo sau deadline không hợp lệ. Hợp đồng sync phải lưu thời điểm ghi nhận và nguồn xác nhận; client timestamp không phải chứng cứ tin cậy. Không xác minh được thì result `unverified`. **Design pending:** xử lý clock skew, thứ tự answer offline và reconciliation sau reconnect; không tự chọn cách giải quyết khi triển khai. Snapshot chứa đáp án đúng nên không tuyên bố chống gian lận hoặc giữ kín đáp án client.

Tombstone không cấm thêm lại mãi mãi. Bookmark bỏ rồi lưu lại, mistake đã giải đúng rồi sai lại, quiz reset rồi làm lại, Review/practice clear rồi tạo round mới đều là **ý định mới** với revision/operation ID mới. Thiết bị stale không tự rebase ý định cũ qua tombstone. Theo **D3/D10 Approved**, completed exam attempts không bị đề mới ghi đè; retry submit không tạo side effect trùng hoặc hồi sinh mistake đã được giải đúng sau đó. **Design pending:** transaction/idempotency và thứ tự operation giữa exam với Review. Xóa history là task riêng, không nằm trong core hoặc mở rộng hiện tại.

**D8 Approved:** Stage 3 thiết kế và kiểm chứng một RPC CAS mẫu; không triển khai hàng loạt RPC trước khi mẫu đạt. SQL draft hiện cho direct `UPDATE`; nếu đường này còn mở thì không gọi bảng đó là có database-enforced CAS, dù ứng dụng tự gửi expected revision. RLS owner không thay kiểm tra concurrency. Xem [decisions.md](decisions.md) cho lý do/đánh đổi và [implementation-plan.md](implementation-plan.md) cho cổng triển khai.

## 5. Cổng kiểm chứng

- Trước schema core, áp D7 và thử RPC mẫu theo D8; trước schema exam, thiết kế metadata/timing answer offline, trạng thái unverified, constraint một working và transaction D10. Các chi tiết **Design pending** không được tự suy ra từ chính sách đã duyệt.
- Chạy migration trên project thử; kiểm tra RLS bằng JWT hai user và anon, CAS bằng hai client cùng user, stale round/attempt, reset và response mất. RLS owner **không thay** CAS.
- Test raw import cho v2/v1 hỏng, orphan, account switch, exam snapshot lớn; test hai thiết bị/offline, deadline, submit trùng, crash giữa submit/mistakes. Browser kiểm tra guest, reload, cảnh báo pending và history. Không coi kiểm tra tĩnh là bằng chứng cloud hoạt động.

D1–D10 là quyết định đã duyệt trong [decisions.md](decisions.md). Các mục **Design pending** và toàn bộ hành vi SQL/RLS/CAS vẫn chưa được xác nhận bằng Supabase runtime.
