# Đề xuất bảo vệ dữ liệu khi đổi lượt Review

Ngày phân tích: 20/10/2026. Ju đã duyệt triển khai với các điều kiện migration bổ sung. Trạng thái triển khai và kết quả kiểm tra được ghi ở `docs/progress.md`; phần dưới giữ lại lý do thiết kế ban đầu.

## Nguyên nhân đã xác nhận

- `components/ReviewMistakes.tsx` gọi `removeItem(REVIEW_PROGRESS_KEY)` rồi `setItem(ROUND_KEY, ...)` trong cùng `try`, nhưng luôn chuyển state sang lượt mới sau `catch`. Nếu xóa lỗi, ghi round không chạy; giao diện vào lượt mới trong khi hai key vẫn thuộc lượt cũ. `hooks/useQuizProgress.ts` lại ưu tiên progress đọc từ storage hơn `initialReviewProgress`, nên đáp án có ID trùng có thể hiện trong lượt mới. Effect ghi progress sau restore còn có thể ghi lại bản đã lọc theo câu của lượt mới vào key của lượt cũ.
- Nếu xóa thành công nhưng ghi round lỗi, key progress cũ đã mất, key round vẫn là lượt cũ, còn giao diện đang hiện lượt mới trong bộ nhớ. Reload trở về lượt cũ với progress rỗng. `catch` hiện không báo trạng thái chưa lưu.
- Round v1 (`ju-study-hub:review-round:v1`) chỉ có scope và refs; progress v1 (`ju-study-hub:review-progress:v1`) chỉ có cursor và answers. Cả hai không có `roundId`. `restoreProgress` lọc theo ID câu và đáp án hiện có, nên không thể xác định một answer hợp lệ có thật sự thuộc snapshot round đang đọc hay không.

Ví dụ: round A gồm Q1, Q2; progress có đáp án Q1. Một thao tác từ tab khác, dữ liệu lệch đã tồn tại, hoặc một cách đổi thứ tự ghi có thể để lại round B cũng gồm Q1 cùng progress A. Hai JSON lúc reload giống hệt một round B hợp lệ đã làm Q1. Quy tắc đọc chỉ dựa trên hai JSON v1 không thể phân biệt hai lịch sử này. Đổi thứ tự hai thao tác hoặc rollback chỉ giảm một số lỗi đơn lẻ, không bảo đảm khi rollback cũng lỗi hoặc trang đóng giữa hai thao tác.

## Phương án cần duyệt

1. Thêm một record nguồn sự thật `ju-study-hub:review-state:v2` gồm `version: 2`, `roundId`, `scope`, `items` và `progress` (cursor và answers). Một lần `setItem` ghi toàn bộ record khi tạo lượt, làm lại, đổi đáp án hoặc reset. Không ghi tiếp hai key Review v1 sau khi v2 hoạt động. `roundId` chặn callback của lượt cũ.
2. Khi tạo hoặc reset lượt, chỉ chuyển giao diện sang lượt mới sau khi write v2 thành công. Nếu write lỗi, giữ nguyên lượt đang hiển thị và báo rõ chưa tạo/lưu được lượt mới. Khi lưu tiến độ trong một lượt lỗi, giữ đáp án trong bộ nhớ, báo chưa lưu, cho thử lại; reload sẽ về bản bền cuối cùng. Không dùng progress từ v1 để khôi phục một round v2.
3. Khi chưa có v2, đọc hai raw v1 trước mọi ghi. Giữ nguyên hai key v1 để có thể khôi phục thủ công; không tự xóa dữ liệu cũ hoặc orphan mistakes. Round v1 hợp lệ và không có progress v1 có thể nhập thành v2 bằng một write. Với progress v1 có đáp án hoặc cursor, kể cả ID đều khớp round, không thể chứng minh cặp này cùng lượt. Cần màn chọn rõ ràng: tiếp tục với progress v1 hiện có hoặc bắt đầu lượt mới; chỉ ghi v2 sau lựa chọn và write thành công. Raw hỏng hoặc round thiếu câu trong catalog cũng phải được báo và giữ nguyên.
4. Nếu v2 đã có, luôn ưu tiên v2. Hai key v1 chỉ là dữ liệu dự phòng cho migration; việc dọn chúng là task khác sau khi có chính sách backup. Kho mistakes vẫn là key riêng, không tự xóa orphan refs khi đổi lượt.

## Kiểm tra cần có sau khi duyệt

- Test tái hiện riêng hai lỗi v1: `removeItem` progress thất bại và `setItem` round thất bại. Với luồng v2, fault injection cho lỗi đọc legacy, lỗi ghi lúc tạo lượt, ghi tiến độ và reset; xác nhận không còn thao tác `removeItem` trên progress v1.
- Ghi thành công rồi reload giữ đúng round, cursor, nháp và đáp án đã chấm. Ghi lỗi rồi reload trả về bản bền trước đó và UI đã báo chưa lưu.
- Legacy v1 có answer trùng ID với round khác phải yêu cầu lựa chọn, không tự nhận là progress của lượt mới; trường hợp round/progress không khớp ID cũng không xóa raw.
- Đang làm dở: xác nhận thay lượt, hủy xác nhận, làm lại sau hoàn thành, callback trễ từ lượt cũ, và mở đồng thời hai tab. Kiểm tra browser trên `/review` cùng localStorage thật.

## Giới hạn của phương án

Một record v2 ngăn lỗi ghi nửa round/nửa progress trong một tab. Hai tab vẫn có thể ghi đè nhau vì localStorage không có compare-and-swap; cần chính sách conflict riêng ở giai đoạn cloud sync. Việc nhập progress v1 có answer cần Ju duyệt cách hỏi người dùng vì định dạng cũ không chứa chứng cứ để tự chọn phiên bản đúng.
