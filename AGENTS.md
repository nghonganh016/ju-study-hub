# Ju Study Hub: hướng dẫn làm việc

Cập nhật: 13/10/2026. Chủ dự án: Ju. Code trong repository là nguồn sự thật; tài liệu này mô tả checkout hiện tại, không thay thế việc đọc code trước mỗi task.

## Mục tiêu và cách cộng tác

Ju Study Hub là website ôn tập cá nhân theo môn và chapter. Codex trực tiếp sửa code để giúp Ju học phát triển web, nên mỗi thay đổi cần nhỏ, dễ kiểm tra và được giải thích rõ. Giao diện dùng tiếng Việt.

- Trả lời bằng tiếng Việt rõ ràng. Giữ thuật ngữ quen thuộc như component, props, state, route và commit. Giải thích thuật ngữ mới khi cần.
- Mỗi lượt chỉ triển khai một task đã thống nhất; xong thì dừng để Ju review. Không tự chuyển sang task kế tiếp.
- Trước khi sửa, nêu mục tiêu, file dự kiến và kết quả Ju sẽ thấy. Đọc các `AGENTS.md` áp dụng, `git status`, `package.json`, lockfile và source liên quan. Giữ nguyên thay đổi sẵn có của Ju.
- Sau khi sửa, giải thích vai trò các file và luồng props/state/sự kiện quan trọng. Báo lệnh đã chạy, kết quả, phần chưa kiểm chứng, cách Ju kiểm tra và bước tiếp theo dự kiến.
- Không refactor diện rộng, thêm dependency, backend, dịch vụ trả phí, commit, push hoặc deploy ngoài yêu cầu. Bug ngoài phạm vi phải báo vị trí và tác động trước khi sửa.
- Giữ semantic HTML, keyboard, focus rõ, reduced motion và khả năng cuộn an toàn trên màn hình nhỏ khi làm UI. Không thay đổi nội dung học, ID, route hay dữ liệu đã lưu khi task không yêu cầu.
- Không dùng dấu gạch ngang dài trong nội dung giải thích. Tiêu đề dùng sentence case.

## Kiến trúc hiện tại

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 và npm. `app/layout.tsx` dùng Nunito, Baloo 2 và CSS KaTeX.
- `data/subjects.ts` là registry môn `blockchain` và `database`; các mảng chapter nằm trong `data/<subject>/index.ts`. Khóa registry là subject ID trong URL và tiến độ. `types/quiz.ts` định nghĩa `Chapter`, `Question` và metadata nguồn tùy chọn.
- Các route chính: `/`, `/subjects/[subjectId]`, `/subjects/[subjectId]/[chapterId]`, `/quiz/[subjectId]/[chapterId]`, `/review`, `/bookmarks`. Route `/dev/math` và `/dev/quiz-console` chỉ phục vụ development.
- Trang quiz là Server Component kiểm tra subject/chapter và truyền dữ liệu sang `components/QuizRunner.tsx`. `hooks/useQuizProgress.ts` giữ state câu/đáp án, khôi phục và lưu tiến độ; `QuizRunner` là Client Component ghép UI, shortcut, focus, feedback, mistakes và bookmark. `QuizQuestion`, `QuizNavigation`, `QuizResult` và các component khác hiển thị từng phần.
- `lib/quiz-progress.ts` giữ khóa và quy tắc khôi phục/đếm tiến độ quiz thường. `components/LevelProgress.tsx` đọc tiến độ đó trên card. `lib/mistakes.ts` quản lý kho câu sai; `lib/review-round.ts` tạo lượt ôn theo phạm vi; `lib/bookmarks.ts` quản lý bookmark; `lib/bookmark-catalog.ts` đối chiếu bookmark với câu hiện có.
- Trạng thái lưu trong `localStorage` theo origin, dùng schema version 1: quiz thường theo `ju-study-hub:quiz-progress:<subjectId>:<chapterId>`, Review dùng các khóa riêng trong `lib/mistakes.ts`, bookmark dùng `ju-study-hub:bookmarks:v1`. Không có Supabase, auth hay database trong ứng dụng hiện tại.
- `tests/*.test.mjs` dùng Node test runner và các dependency đã cài. `npm test` chạy bộ test này. Xem `README.md` và `docs/multi-subject-architecture.md` để biết cách chạy và luồng dữ liệu.

## Ràng buộc khi sửa quiz và storage

- Giữ ID môn/chapter/câu/đáp án, thứ tự và nội dung học. Không đổi schema hoặc key localStorage nếu chưa có kế hoạch tương thích dữ liệu cũ.
- Quiz là luyện tập có phản hồi từng câu; chọn đáp án tạo nháp, bấm chấm mới khóa đáp án. Kết quả, làm lại, Review câu sai và bookmark phải tiếp tục hoạt động.
- Đọc storage sau khi client mount để tránh ghi đè tiến độ trước khi khôi phục. Storage có thể lỗi hoặc bị chặn; UI vẫn phải dùng được trong bộ nhớ.
- Với thay đổi tương tác, kiểm tra cả test và browser theo rủi ro thực tế: chọn/chấm, điều hướng, khôi phục, làm lại, Review, bookmark, keyboard, KaTeX và responsive khi có liên quan. Không nói đã xem giao diện nếu chỉ chạy kiểm tra tĩnh.

## Kiểm tra và bàn giao

Đọc scripts trong `package.json` trước khi chạy. Baseline hiện tại:

```sh
npm test
npm run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
git diff --check
```

Production build dùng `--webpack` trong checklist hiện tại. Nếu `.next/types` chưa có, chạy build hoặc Next type generation trước khi kết luận TypeScript lỗi. Ghi ngắn kết quả task vào `docs/progress.md`; không ghi đè lịch sử. `docs/source-audit.md` là snapshot nguồn ở thời điểm ghi, không tự coi là tổng số câu hiện tại.

Báo cáo cuối task gồm: đã làm, file thay đổi và lý do, kiểm tra Codex đã chạy, thao tác Ju có thể kiểm tra, giới hạn còn lại và một bước kế tiếp dự kiến. Dừng sau task để Ju review.
