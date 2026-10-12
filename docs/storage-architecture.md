# Lưu dữ liệu người học

Ứng dụng hiện lưu dữ liệu trong `localStorage` theo origin của trình duyệt. `lib/storage.ts` định nghĩa `StudyStorage` với ba thao tác đồng bộ `getItem`, `setItem`, `removeItem`; `localStudyStorage` là adapter duy nhất truy cập `window.localStorage`. Adapter chỉ truy cập browser khi phương thức được gọi, nên có thể import trong code chạy trên server. Lỗi đọc/ghi được chuyển nguyên cho nơi gọi xử lý.

Adapter chỉ quản lý chuỗi và key. `lib/quiz-progress.ts`, `lib/bookmarks.ts`, `lib/mistakes.ts` và `lib/review-round.ts` tiếp tục sở hữu serialization, kiểm tra dữ liệu và quy tắc nghiệp vụ. `useQuizProgress` đọc sau khi mount và chỉ ghi sau khi khôi phục, kể cả khi React Strict Mode chạy lại effect.

| Dữ liệu | Key | JSON version 1 và kiểm tra | Xóa/reset |
| --- | --- | --- | --- |
| Quiz thường | `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` | `{ version: 1, currentQuestionId: string \| null, answers: { [questionId]: { optionId: string, isSubmitted: boolean } } }`. Chỉ khôi phục ID câu và đáp án đang có trong chapter; bỏ bản ghi hỏng. | Reset hoặc tiến độ rỗng xóa đúng key của chapter. |
| Kho câu sai | `ju-study-hub:mistakes:v1` | `{ version: 1, items: [{ subjectId, chapterId, questionId }] }`. Kiểm tra ba ID không rỗng, loại trùng bằng bộ ba ID; câu không còn trong catalog không hiện trên Review. | Trả lời đúng trong Review xóa câu tương ứng; câu đúng ở quiz thường không xóa. |
| Lượt Review | `ju-study-hub:review-round:v1` | `{ version: 1, scope: { subjectId: string \| null, chapterId: string \| null }, items: [{ subjectId, chapterId, questionId }] }`. Kiểm tra ID; scope không hợp lệ quay về phạm vi phù hợp. Bản cũ không có scope mặc định là tất cả. | Bắt đầu lượt mới ghi đè snapshot sau khi xác nhận thay lượt dở. |
| Tiến độ Review | `ju-study-hub:review-progress:v1` | Cùng cấu trúc tiến độ quiz, nhưng question ID là bộ ba ID được mã hóa thành JSON tuple. Chỉ khôi phục đáp án hợp lệ với snapshot lượt hiện tại. | Bắt đầu lượt mới xóa tiến độ Review; reset chỉ xóa key này. |
| Bookmark | `ju-study-hub:bookmarks:v1` | `{ version: 1, items: [{ subjectId, chapterId, questionId }] }`. Kiểm tra ba ID không rỗng, loại trùng; tham chiếu tới câu đã bỏ vẫn được giữ cho đến khi người dùng xóa. | Nút Bỏ lưu xóa đúng tham chiếu. |

Khi storage bị chặn hoặc hết dung lượng, quiz tiếp tục với state trong phiên hiện tại. Bookmark và kho câu sai giữ thay đổi pending trong bộ nhớ, rồi ghép chúng với danh sách mới nhất đọc được trước khi thử ghi lại. Đọc dữ liệu không tự ghi hoặc xóa key không hợp lệ. Thay đổi pending chưa được lưu sẽ mất khi đóng hoặc tải lại trang. Các thao tác `localStorage` và việc ghép pending không tạo giao dịch xuyên nhiều tab.

UI hiện cập nhật bằng state trực tiếp, sự kiện `ju-study-hub:mistakes-changed` cho số câu sai cùng trang, và các sự kiện browser `storage`, `focus`, `pageshow` ở nơi cần thiết. Sự kiện `storage` chỉ đến tab khác, không đến chính trang ghi dữ liệu. Không thêm bus sự kiện mới vì các màn hình hiện có đã có đường cập nhật phù hợp.

`StudyStorage` cố ý đồng bộ vì `localStorage` và hiệu ứng hiện tại đồng bộ. Không thể thay adapter này trực tiếp bằng lời gọi Supabase bất đồng bộ. Giai đoạn cloud cần thiết kế lớp đồng bộ bất đồng bộ riêng ở ranh giới state/hook và quy tắc đối chiếu dữ liệu. Trước khi triển khai phải chốt danh tính và quyền sở hữu dữ liệu, nhập dữ liệu local lần đầu, xung đột giữa thiết bị, hoạt động offline, đổi tài khoản/đăng xuất, lỗi mạng và migration phiên bản. Chưa có bất kỳ chức năng nào trong số đó.
