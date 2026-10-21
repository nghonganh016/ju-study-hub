# Quyết định kiến trúc Supabase

Ngày ghi nhận: 20/10/2026. **Nguồn chính thức của các quyết định D1–D10 Ju đã phê duyệt trong Task 5.** Đây là chính sách thiết kế, chưa phải chức năng đã triển khai. [data-model.md](data-model.md) mô tả dữ liệu và migration; [implementation-plan.md](implementation-plan.md) giao việc theo stage. `schema-draft.sql` vẫn là bản nháp bốn bảng trước các quyết định này.

## 1. Mục tiêu và phạm vi

Cloud sync phục vụ việc ôn tập trên nhiều thiết bị mà vẫn giữ guest mode và dữ liệu local. Phát hành core trước, sau đó mới mở rộng sang luyện bookmark và thi thử. Mỗi thay đổi dữ liệu cần có quyền sở hữu rõ, trạng thái lưu rõ và cơ chế xử lý xung đột; không được báo đã sync cho chế độ chưa được triển khai.

Nhãn dùng trong bộ tài liệu:

- **Approved:** chính sách Ju đã chốt; chưa có nghĩa code/SQL đã chạy.
- **Design pending:** chi tiết kỹ thuật cần thiết kế tiếp, không tự suy ra từ chính sách.
- **Deferred:** chủ động để sau phạm vi phát hành đang xét.
- **Validation required:** giả định/hành vi cần chứng minh bằng test hoặc Supabase runtime.

## 2. Quyết định D1–D10, lý do và đánh đổi

| ID và trạng thái | Quyết định đã duyệt | Lý do, đánh đổi và hệ quả kỹ thuật | Stage chịu trách nhiệm |
| --- | --- | --- | --- |
| **D1 · Approved** | Phát hành `quiz_progress`, `bookmarks`, `mistakes`, `review_rounds` trước. `bookmark_practice_rounds` và `exam_attempts` thuộc mở rộng. Trong giai đoạn core, practice/exam phải được ghi rõ là chỉ lưu trên thiết bị; không gọi toàn Study Hub là đã đồng bộ. | Giới hạn phạm vi lần đầu để kiểm chứng import, Auth và CAS. Đánh đổi: hai chế độ còn local, nên UI/release notes phải nêu rõ. | Core: 1–9, 14. Mở rộng: 10–13, 14. |
| **D2 · Approved** | Tối đa một active bookmark practice round/user; chưa lưu history. Lượt giữ snapshot câu hỏi đã chọn theo các refs có thứ tự, không tự đổi khi bookmarks đổi. Thay lượt cần xác nhận và kiểm soát conflict. | Khớp một record local v1, ít bảng/UI hơn. Đánh đổi: lượt cũ không thành lịch sử; round ID, revision và tombstone phải chặn write cũ. | 10–11. |
| **D3 · Approved** | Một row cho mỗi exam attempt; tối đa một `working`/user, nhiều `completed` để lưu history. Đề mới khi còn lượt dở: tiếp tục hoặc xác nhận bỏ. Không ghi đè completed; mặc định giữ toàn bộ history, query phân trang. Xóa history là task riêng. | Bảo toàn kết quả các lần thi và giữ lựa chọn active đơn giản. Đánh đổi: cần trạng thái bỏ lượt, constraint và giải quyết tranh chấp tạo đề trên hai thiết bị; dung lượng tăng theo attempts. | 12–14. |
| **D4 · Approved** | App tự luyện, không có giám sát. Deadline tuyệt đối, không gia hạn offline. Cho làm/lưu cục bộ khi mất mạng; answer được ghi nhận cục bộ trước deadline có thể gửi sau deadline, answer tạo sau deadline không được chấp nhận. Lưu thời điểm ghi nhận và nguồn xác nhận. Timestamp client không là bằng chứng tin cậy; không xác minh được thì kết quả `unverified`. Không tuyên bố chống gian lận hay giữ bí mật đáp án trên client. | Giữ guest/offline và mốc giờ nhất quán. Đánh đổi: có trường hợp không thể chứng minh answer được tạo trước hạn; cần thiết kế clock skew, ordering và reconcile trước khi sync exam. | 12–13. |
| **D5 · Approved** | Guest tiếp tục dùng localStorage. Authenticated dùng local-first state và outbox **bền, tách theo user**; hiển thị `pending`, `synced`, `conflict`. Không tự xóa raw sau upload; không tự chuyển dữ liệu guest/A sang B. Storage bị chặn/hết quota phải báo giới hạn khôi phục. | Bảo vệ dữ liệu qua offline, logout và đổi tài khoản. Đánh đổi: phải thiết kế nơi lưu outbox, ACK/retry và phân vùng cache; RAM fallback không bảo đảm qua reload. | 1, 4–9, 11, 13–14. |
| **D6 · Approved** | Không last-write-wins theo đồng hồ máy. Dùng revision + compare-and-swap (CAS). Quiz, Review, practice, cùng exam attempt không tự gộp snapshot xung đột. Bookmark/mistake xử lý từng ref. Reset/clear/remove có tombstone; conflict không giải quyết an toàn phải giữ để người dùng chọn. | Tránh lost update, hồi sinh dữ liệu cũ và hạ answer đã chấm. Đánh đổi: cần UI conflict và retry có điều kiện; tombstone không cấm một ý định thêm mới hợp lệ. | 3, 5–9, 10–14. |
| **D7 · Approved** | Cloud `review_rounds.round_id` dùng `text` để giữ mọi round ID hợp lệ của Review v2. Không ép kiểu/đổi ID âm thầm khi import. `format_version` cloud độc lập localStorage version và content revision. | Parser v2 hiện chấp nhận nonempty string và `createReviewState` có fallback không phải UUID. Đánh đổi: database không kiểm tra UUID cho cột này; app vẫn phải validate ID, scope và progress. | 2, 5–6, 9. |
| **D8 · Approved** | Ưu tiên RPC để cưỡng chế CAS tại database cho mutation cần chống lost update. Stage 3 phải thiết kế/test **một RPC mẫu**, gồm hai client cùng user và expected revision thiếu/sai. Xem xét thu hồi direct `UPDATE` của bảng được RPC bảo vệ. Không triển khai hàng loạt RPC trước khi mẫu đạt. Application-level CAS còn dùng phải ghi rõ giới hạn. RLS owner không thay CAS. | Direct `UPDATE` trong SQL draft có thể bỏ revision filter. RPC cho phép kiểm tra revision trong transaction, nhưng thêm API/permission cần thử thật; chỉ gọi “database-enforced” sau khi loại đường ghi vòng qua RPC. | 2–3; quyết định áp rộng tại 7–9, 10–13. |
| **D9 · Approved** | Import result exam local như lịch sử tự luyện, giữ điểm đã hiển thị, gắn nguồn `local legacy`. Không âm thầm chấm lại, không coi là thành tích đã xác minh. Dữ liệu hỏng/không nhất quán: báo, giữ raw, không nhập thành result hợp lệ. | Tôn trọng lịch sử người dùng thấy. Đánh đổi: điểm local có thể đã bị sửa; validation chỉ xác nhận tính nhất quán, không chứng minh trung thực. | 1, 5, 12, 14. |
| **D10 · Approved** | Submit exam và áp dụng mistake refs cần transaction/idempotency phía database. Retry không tạo side effect trùng và không hồi sinh mistake đã được giải đúng trong Review sau lần submit. Test duplicate/lost response/concurrent submit/crash. `mistakesApplied` local không xác nhận cloud. | Local hiện lưu submitted rồi ghi mistakes riêng, có cửa sổ mất dữ liệu. Đánh đổi: cần mutation nhiều bảng và quy tắc thứ tự operation; không đủ nếu chỉ thêm một boolean cloud. | 8, 12–13, 14. |

## 3. Ảnh hưởng đến data model và migration

**Approved:** bốn bảng core giữ vai trò riêng; Review v2 là nguồn local chính, Review v1 chỉ đọc để migration. `review_rounds.round_id` cloud chuyển sang `text` trước khi import. Practice sau core cần một row active/user; exam sau core cần một row/attempt và lịch sử phân trang. Các row thuộc `auth.users.id`, còn key local theo origin không chứng minh owner. Reset/clear/remove trên cloud dùng tombstone và revision, không xóa để thiết bị cũ hồi sinh.

**Design pending:** D2/D3 chưa chốt DDL cụ thể cho constraint một active round/attempt, trạng thái bỏ lượt và chỉ mục history. D4 cần metadata thời điểm answer, nguồn xác nhận và trạng thái `unverified`; local `exam-attempt:v1` hiện chỉ có map answer, không có timestamp từng answer, nên không thể suy ngược chứng cứ đã thiếu. D9 cần validation result/snapshot và metadata nguồn local legacy. D10 cần hợp đồng transaction, idempotency key và thứ tự side effect so với Review. Không đưa các cột/constraint này vào SQL draft ở Task 5.

**Validation required:** raw import gồm quiz keys theo chapter, bookmark, mistakes, Review v2 cùng hai key v1, practice và exam; giữ raw hỏng/orphan trước parser hoặc mount có thể ghi. Nếu v2 có mặt nhưng lỗi, không fallback v1. Import local chỉ vào tài khoản được người dùng chọn; tombstone cloud phải được đọc trước khi quyết định insert. Các chi tiết và mapping cột nằm ở [data-model.md](data-model.md).

## 4. Ảnh hưởng đến application architecture

**Approved:** guest vẫn chạy local. Authenticated cần cache/outbox bền tách theo user; mỗi thay đổi có trạng thái pending/synced/conflict. Login, logout và đổi account không xóa raw hoặc chuyển pending sang owner khác. Xung đột snapshot được giữ để người dùng chọn; từng bookmark/mistake là một ref độc lập. Practice và exam vẫn local trong core release, kèm thông báo ở các màn tương ứng.

**Design pending:** ranh giới giữa storage đồng bộ và cloud bất đồng bộ; nơi lưu staging/outbox, retry/ACK khi mất response, UI conflict, UX xác nhận thay active round/attempt; cách lưu nguồn/timing answer offline mà không biến clock client thành bằng chứng. Exam sync phải giữ snapshot, deadline và result có trạng thái xác minh; submitted attempt và mistake refs cần mutation nguyên tử. Không thay `lib/storage.ts` trực tiếp bằng lời gọi Supabase async.

## 5. Mapping quyết định với implementation stages

| Quyết định | Stage chính | Cổng kiểm chứng trước khi gọi hoàn tất |
| --- | --- | --- |
| D1 | 0, 9, 14; mở rộng 10–13 | Core release chỉ công bố bốn loại sync; practice/exam có nhãn local. |
| D2 | 10–11 | Một active practice, snapshot ổn định, thay lượt có xác nhận/CAS. |
| D3 | 12–14 | Completed attempts bất biến, nhiều kết quả phân trang, một working/user. |
| D4 | 12–13 | Deadline/reconcile offline và `unverified` được thiết kế rồi kiểm tra. |
| D5 | 1, 4–9, 11, 13–14 | Guest/account tách, outbox bền, trạng thái lưu và lỗi storage rõ. |
| D6 | 3, 5–14 | CAS/tombstone; conflict giữ cả hai bản và có lựa chọn. |
| D7 | 2, 5–6, 9 | SQL thử dùng `text`, import giữ round ID. |
| D8 | 3; áp rộng ở 7–13 | RPC mẫu, thử hai client và đường direct UPDATE; không nhận vơ DB CAS. |
| D9 | 1, 5, 12 | Import result nguồn local legacy, giữ điểm, raw hỏng không nhập. |
| D10 | 8, 12–14 | Submit và mistakes atomically/idempotently; retry cũ không hồi sinh ref. |

Chi tiết dependency và acceptance criteria từng stage nằm ở [implementation-plan.md](implementation-plan.md).

## 6. Chi tiết còn cần thiết kế hoặc kiểm chứng

- **Design pending:** D4 clock skew, answer ordering offline, điều kiện nào đủ xác minh answer trước deadline, cách đánh dấu/phân biệt `unverified`, và reconcile sau reconnect. Chính sách cho phép gửi muộn **không** đồng nghĩa tin timestamp client.
- **Design pending:** D8 RPC mẫu dùng mutation nào, contract expected revision/operation ID, quyền direct UPDATE và phạm vi áp dụng sau PoC. D10 transaction giữa attempt và mistakes, idempotency qua retry/lost response, thứ tự với thao tác Review xóa mistake.
- **Design pending:** outbox/staging bền qua OAuth/reload, retention bản pending, account switch và UI conflict; D2/D3 constraint một active, trạng thái bỏ attempt; D9 validation snapshot/result local bị sửa.
- **Validation required:** migration/RLS trên project thử bằng hai JWT owner khác nhau và anon; concurrency bằng hai client cùng user; offline/deadline, clock lệch, duplicate submit, crash, raw invalid, orphan, hai account/hai thiết bị trên browser. SQL draft hiện chưa chạy.

## 7. Ngoài phạm vi MVP core

- **Deferred:** cloud sync bookmark practice và exam/history đến stage 10–13; core chỉ có nhãn local cho hai chế độ.
- **Deferred:** UI xóa exam history và chính sách xóa hàng loạt, task riêng sau này; mặc định giữ completed attempts, không đặt giới hạn tùy ý.
- **Deferred:** hệ thống thi giám sát, chống gian lận, bảo mật đáp án phía client và công bố điểm exam import là thành tích đã xác minh.
- **Deferred:** tự động gộp snapshot xung đột hoặc xóa raw local sau import.

Các nhãn **Design pending** và **Validation required** không phải sự cho phép tự chọn hoặc tuyên bố đã kiểm chứng.
