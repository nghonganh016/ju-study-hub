# Kiến trúc nhiều môn học

Cập nhật: 13/10/2026. Tài liệu mô tả code hiện tại. Lịch sử các thay đổi đã hoàn thành nằm trong `docs/progress.md`.

## Registry và dữ liệu

`data/subjects.ts` đăng ký `blockchain` và `database`. Khóa của mỗi mục là subject ID ổn định trong URL và key tiến độ. Mỗi mục có `title`, `description`, `accent` và `chapters`. Mảng chapter được nhập từ `data/blockchain/index.ts` hoặc `data/database/index.ts`; thứ tự mảng quyết định thứ tự hiển thị. Hiện Blockchain có `chapter-1` và Session 3–8; Database có Session 1 (58 câu) và Session 2. Chapter thử `database/chapter-2` đã được Ju chủ đích bỏ.

`types/quiz.ts` định nghĩa `Chapter`, `Question` và `QuestionSource`. Mỗi câu có ID, prompt, options, đáp án đúng và explanation. `source`, `topic`, `difficulty`, `sources` là metadata tùy chọn. `questionCatalog` từ registry chứa bộ ba ID môn/chapter/câu để đối chiếu kho câu sai; không sao chép toàn bộ nội dung câu vào đó.

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

`hooks/useQuizProgress.ts` giữ state câu hiện tại, đáp án nháp/đã chấm, trang điều hướng, trạng thái khôi phục và số liệu tiến độ. Hook dùng `lib/quiz-progress.ts` để kiểm tra dữ liệu version 1 và xác định câu của deep link, rồi đọc/ghi đúng key qua `lib/storage.ts`. `QuizRunner` nhận state và các thao tác `navigate`, `selectAnswer`, `submitAnswer`, `resetProgress` từ hook; component này tiếp tục xử lý URL, focus, shortcut, feedback, mistakes, bookmark và render `QuizQuestion`, `QuizNavigation`, `QuizResult`. `ReviewMistakes` remount `QuizRunner` bằng `key={generation}` khi mở lượt mới, nên hook cũng bắt đầu với state mới.

## Storage hiện tại

Tất cả dữ liệu dưới đây nằm trong `localStorage` của origin hiện tại và có schema version 1:

| Dữ liệu | Key hoặc module | Ghi chú |
| --- | --- | --- |
| Tiến độ quiz thường | `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` trong `lib/quiz-progress.ts` | ID câu đang xem và bản đồ đáp án `{ optionId, isSubmitted }` |
| Kho câu sai | `ju-study-hub:mistakes:v1` trong `lib/mistakes.ts` | Bộ ba ID môn/chapter/câu; giữ tham chiếu còn hợp lệ qua catalog |
| Lượt Review | `ju-study-hub:review-round:v1` và `ju-study-hub:review-progress:v1` | Snapshot câu của lượt, phạm vi và tiến độ riêng |
| Bookmark | `ju-study-hub:bookmarks:v1` trong `lib/bookmarks.ts` | Bộ ba ID; `lib/bookmark-catalog.ts` tìm nội dung hiện có |

`lib/quiz-progress.ts` kiểm tra phiên bản, question ID và option ID khi khôi phục; `LevelProgress` dùng cùng quy tắc để hiển thị số câu đã chấm trên card. `useQuizProgress` chờ client mount và khôi phục xong rồi mới ghi storage nhằm giữ tiến độ cũ khi hydration. Nếu storage lỗi, quiz tiếp tục trong bộ nhớ. Bookmark và mistakes có cơ chế giữ thay đổi pending để thử ghi lại; không nên gộp các kho này chỉ vì chúng đều dùng localStorage, vì hợp đồng dữ liệu khác nhau.

`localStorage` không đồng bộ giữa origin, browser hoặc thiết bị. Chưa có server, database hay tài khoản trong ứng dụng.

Chi tiết adapter đồng bộ, key/schema, xử lý lỗi và hướng tích hợp cloud sau này nằm trong `docs/storage-architecture.md`.

## Thêm nội dung mới

1. Tạo `Chapter` trong `data/<subject>/`, giữ ID câu và option ổn định.
2. Thêm chapter vào mảng `data/<subject>/index.ts`. Với môn mới, thêm mục `title`, `description`, `accent`, `chapters` vào `data/subjects.ts`.
3. Chạy `npm test`, ESLint, TypeScript và production build. Kiểm tra route, quiz và storage trên browser nếu thay đổi ảnh hưởng đến tương tác hoặc ID.

Không cần tạo route mới cho từng môn/chapter. Nếu buộc phải đổi ID đã lưu, cần thiết kế migration riêng trước khi sửa.

## Kiểm tra

```sh
npm test
npm run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
```

Test trong `tests/` dùng Node test runner, kiểm tra dữ liệu và các contract logic/component. Với thay đổi tương tác, test tĩnh không thay thế việc chấm câu, khôi phục tiến độ, Review và Bookmark trong trình duyệt.
