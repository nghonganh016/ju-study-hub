# Kiến trúc nhiều môn học

Cập nhật: 20/10/2026. Tài liệu mô tả code hiện tại. Lịch sử các thay đổi đã hoàn thành nằm trong `docs/progress.md`.

## Registry và dữ liệu

`data/subjects.ts` đăng ký `blockchain` và `database`. Khóa của mỗi mục là subject ID ổn định trong URL và key tiến độ. Mỗi mục có `title`, `description`, `accent` và `chapters`. Mảng chapter được nhập từ `data/blockchain/index.ts` hoặc `data/database/index.ts`; thứ tự mảng quyết định thứ tự hiển thị. Hiện Blockchain có `chapter-1` và Session 3–8; Database có Session 1–6 và bài thi mẫu `sample-midterm-test`. Chapter thử `database/chapter-2` không còn trong registry.

`types/quiz.ts` định nghĩa `Chapter`, `Question` và `QuestionSource`. Mỗi câu có ID, prompt, options, đáp án đúng và explanation. `source`, `topic`, `difficulty`, `sources` là metadata tùy chọn. `questionCatalog` từ registry chứa bộ ba ID môn/chapter/câu để đối chiếu kho câu sai; không sao chép toàn bộ nội dung câu vào đó. `data/exam-catalog.ts` tạo catalog Thi thử từ cùng registry, gồm cả câu hỏi và revision của chapter để chụp đề khi bắt đầu lượt thi.

`isValidSubject()` dùng `Object.hasOwn` để kiểm tra ID thật. Không suy ra ID từ vị trí mảng, không dùng tên hiển thị làm ID và không thay ID đã được lưu trong trình duyệt.

## Route và component

```text
data/<subject>/*.ts → data/<subject>/index.ts → data/subjects.ts
                                                ↓
app/page.tsx → app/subjects/[subjectId]/page.tsx
                       ↓
app/subjects/[subjectId]/[chapterId]/page.tsx
                       ↓
app/quiz/[subjectId]/[chapterId]/page.tsx → QuizRunner
```

Các trang động nhận `params` dạng Promise, kiểm tra subject và tìm chapter trong đúng môn; ID không có trả 404. Trang quiz xử lý chapter rỗng và truyền `subjectId`, `chapterId`, tiêu đề, câu hỏi và catalog vào `QuizRunner`. `searchParams.questionId` tùy chọn mở câu đã bookmark; ID không hợp lệ rơi về vị trí khôi phục. Trang `/bookmarks` liệt kê câu đã đánh dấu; `/review` chọn phạm vi môn/chapter và tạo lượt ôn câu sai.

Từ `/bookmarks`, người học lọc các câu còn trong catalog theo môn/chapter rồi bắt đầu hoặc tiếp tục lượt tại `/bookmarks/practice`. `BookmarkedQuestions` tạo lượt qua `lib/bookmark-practice.ts`; `BookmarkPractice` đối chiếu các ref đã lưu với catalog hiện tại và dùng `QuizRunner` ở mode `bookmark`. Lượt này giữ thứ tự câu đã chọn, không tự đổi khi bộ lọc hay danh sách bookmark thay đổi về sau; câu đã rời catalog không được đưa vào khi khôi phục.

Trang chủ liên kết tới `/exam` để cấu hình Thi thử; `/exam/attempt` dùng cùng `ExamApp` để làm bài hoặc xem kết quả gần nhất. `data/exam-catalog.ts` lấy câu từ registry; `lib/exam.ts` chọn câu không trùng bộ ba ID, trộn thứ tự câu nhưng giữ thứ tự đáp án và chụp nội dung các câu được chọn. Thi thử quản lý câu trả lời, deadline và nộp bài riêng; đáp án, giải thích, nguồn và kết quả chỉ hiện sau khi nộp. Câu sai còn trong catalog được thêm vào kho câu sai sau nộp; câu bỏ trống không được thêm.

`hooks/useQuizProgress.ts` giữ state câu hiện tại, đáp án nháp/đã chấm, trang điều hướng, trạng thái khôi phục và số liệu tiến độ. Hook dùng `lib/quiz-progress.ts` để kiểm tra dữ liệu version 1 và xác định câu của deep link. `QuizRunner` dùng mode `quiz`, `review` hoặc `bookmark`; hai mode đầu dùng key tiến độ tương ứng qua `lib/storage.ts`, còn mode `bookmark` trả tiến độ qua callback cho record lượt luyện riêng. `QuizRunner` tiếp tục xử lý URL, focus, shortcut, feedback, mistakes, bookmark và render `QuizQuestion`, `QuizNavigation`, `QuizResult`. `ReviewMistakes` remount `QuizRunner` bằng `key={generation}` khi mở lượt mới; `BookmarkPractice` dùng `roundId` làm key. `ExamApp` có vòng đời trả lời và nộp bài riêng, không dùng hook chấm từng câu này.

## Storage hiện tại

Tất cả dữ liệu dưới đây nằm trong `localStorage` của origin hiện tại và có schema version 1:

| Dữ liệu | Key hoặc module | Ghi chú |
| --- | --- | --- |
| Tiến độ quiz thường | `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` trong `lib/quiz-progress.ts` | ID câu đang xem và bản đồ đáp án `{ optionId, isSubmitted }` |
| Kho câu sai | `ju-study-hub:mistakes:v1` trong `lib/mistakes.ts` | Bộ ba ID môn/chapter/câu; đối chiếu catalog khi hiển thị, không tự xóa ref đã mất |
| Lượt Review | `ju-study-hub:review-round:v1` và `ju-study-hub:review-progress:v1` | Snapshot câu của lượt, phạm vi và tiến độ riêng |
| Bookmark | `ju-study-hub:bookmarks:v1` trong `lib/bookmarks.ts` | Bộ ba ID; `lib/bookmark-catalog.ts` tìm nội dung hiện có |
| Luyện câu đã lưu | `ju-study-hub:bookmark-practice:v1` trong `lib/bookmark-practice.ts` | Một lượt gồm `roundId`, phạm vi, ref câu theo thứ tự, vị trí và đáp án; không lưu nội dung câu |
| Thi thử | `ju-study-hub:exam-attempt:v1` trong `lib/exam.ts` | Một lượt gồm `attemptId`, cấu hình, snapshot nội dung câu được chọn, đáp án, deadline và kết quả sau nộp |

`lib/quiz-progress.ts` kiểm tra phiên bản, question ID và option ID khi khôi phục; `LevelProgress` dùng cùng quy tắc để hiển thị số câu đã chấm trên card. `useQuizProgress` chờ client mount và khôi phục xong rồi mới ghi storage nhằm giữ tiến độ cũ khi hydration. Nếu storage lỗi, lượt đang làm tiếp tục trong bộ nhớ, nhưng phần chưa lưu có thể mất sau tải lại. Bookmark và mistakes có thay đổi pending để thử ghi lại; luyện bookmark và Thi thử giữ record tạm trong bộ nhớ. Các chế độ dùng hợp đồng dữ liệu riêng dù cùng dùng `localStorage`.

`localStorage` không đồng bộ giữa origin, browser hoặc thiết bị. Ứng dụng chưa có backend lưu dữ liệu người học, database hay tài khoản.

Chi tiết adapter đồng bộ, key/schema, xử lý lỗi và hướng tích hợp cloud sau này nằm trong `docs/storage-architecture.md`. Thiết kế Supabase trong `docs/supabase/` chưa được triển khai; thiết kế bốn bảng hiện chưa bao gồm record luyện bookmark và Thi thử.

## Thêm nội dung mới

1. Tạo `Chapter` trong `data/<subject>/`, giữ ID câu và option ổn định.
2. Thêm chapter vào mảng `data/<subject>/index.ts`. Với môn mới, thêm mục `title`, `description`, `accent`, `chapters` vào `data/subjects.ts`.
3. Kiểm tra theo phạm vi và rủi ro trong `AGENTS.md`. Với thay đổi ID hoặc dữ liệu câu hỏi, kiểm tra test dữ liệu và các luồng dùng catalog; kiểm tra route, quiz và storage trên browser nếu thay đổi ảnh hưởng đến tương tác hoặc dữ liệu đã lưu.

Không cần tạo route mới cho từng môn/chapter. Nếu buộc phải đổi ID đã lưu, cần thiết kế migration riêng trước khi sửa.

## Kiểm tra

```sh
npm test
npm run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
```

Test trong `tests/` dùng Node test runner, kiểm tra dữ liệu và các contract logic/component. Với thay đổi tương tác, test tĩnh không thay thế việc kiểm tra quiz, khôi phục tiến độ, Review, luyện bookmark và Thi thử trong trình duyệt khi các luồng đó bị tác động.
