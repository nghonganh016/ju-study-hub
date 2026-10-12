# Ju Study Hub

Website ôn tập theo môn và chapter, hiện có Blockchain và Database. Mỗi quiz cho chọn đáp án, chấm từng câu, xem giải thích, theo dõi tiến độ, đánh dấu câu hỏi và ôn lại câu sai. Giao diện dùng tiếng Việt.

## Công nghệ

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 và npm. Công thức được render bằng KaTeX qua `react-katex`. Dữ liệu câu hỏi nằm trong repository; tiến độ, câu sai, lượt Review và bookmark được lưu bằng `localStorage` trong trình duyệt. Ứng dụng hiện không có backend, tài khoản hoặc đồng bộ giữa thiết bị.

## Chạy tại máy

Cần Node.js và npm tương thích với phiên bản Next.js trong `package.json`. Dùng lockfile để cài dependency:

```sh
npm ci
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). `npm run build` tạo production build mặc định; `npm run start` chạy build đó. Trên máy Windows của dự án, checklist kiểm tra production dùng Webpack:

```sh
node node_modules/next/dist/bin/next build --webpack
```

## Cấu trúc chính

| Đường dẫn | Vai trò |
| --- | --- |
| `app/` | Route trang chủ, môn/chapter, quiz, Review, Bookmark; hai route `dev` chỉ mở ở development |
| `data/subjects.ts` | Registry hai môn, ID dùng trong URL và kho tiến độ |
| `data/blockchain/`, `data/database/` | Các `Chapter` và mảng chapter của từng môn |
| `types/quiz.ts` | Kiểu dữ liệu câu hỏi, đáp án, chapter và metadata nguồn |
| `components/QuizRunner.tsx` | State và tương tác quiz, kể cả Review; gọi các module `lib/` để khôi phục/lưu tiến độ, câu sai, bookmark |
| `components/LevelProgress.tsx` | Đọc tiến độ quiz thường trên card chapter |
| `lib/quiz-progress.ts` | Khóa, khôi phục và tóm tắt tiến độ quiz thường |
| `lib/mistakes.ts`, `lib/review-round.ts` | Kho câu sai, snapshot và phạm vi lượt Review |
| `lib/bookmarks.ts`, `lib/bookmark-catalog.ts` | Kho bookmark và đối chiếu với registry câu hỏi |
| `tests/` | Test `.test.mjs` dùng Node test runner |
| `public/references/`, `docs/` | PDF tham khảo và tài liệu dự án |

Các route `/subjects/[subjectId]` và `/quiz/[subjectId]/[chapterId]` đọc registry rồi kiểm tra ID trước khi render. `?questionId=<id>` mở một câu cụ thể trong quiz. Chi tiết luồng dữ liệu và cách thêm môn/chapter nằm ở [tài liệu kiến trúc](docs/multi-subject-architecture.md).

## Lưu tiến độ

Quiz thường dùng key `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` với dữ liệu version 1 gồm ID câu đang xem và đáp án nháp/đã chấm. Review, câu sai và bookmark dùng key riêng trong các module `lib/`. Dữ liệu `localStorage` thuộc origin của trình duyệt: đổi domain hoặc thiết bị không tự chuyển dữ liệu. Khi browser chặn storage, quiz vẫn dùng được trong phiên hiện tại nhưng không bảo đảm khôi phục sau khi tải lại.

## Kiểm thử

```sh
npm test
npm run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
```

`npm test` chạy `node --test tests/*.test.mjs` bằng Node test runner có sẵn, không dùng framework mới. Test kiểm tra dữ liệu/registry, các module storage, Review, Bookmark và một số contract component. Chúng không thay thế kiểm tra tương tác thực tế trên trình duyệt. Nếu TypeScript báo thiếu `.next/types` ở checkout mới, tạo Next types bằng `node node_modules/next/dist/bin/next typegen` hoặc chạy build trước rồi chạy lại TypeScript.

Baseline ngày 13/10/2026: `npm test` đạt 57/57 test sau khi đồng bộ kỳ vọng Database với việc bỏ chapter thử `chapter-2` và rút Session 1 còn 58 câu theo quyết định của Ju. Xem [nhật ký](docs/progress.md) để biết phạm vi kiểm tra.

Quy tắc cộng tác và phạm vi thay đổi xem [AGENTS.md](AGENTS.md). Nhật ký kiểm tra nằm ở [docs/progress.md](docs/progress.md).
