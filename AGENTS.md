# Ju Study Hub: hướng dẫn làm việc

Chủ dự án: Ju. Code trong repository là nguồn sự thật; kiểm tra checkout hiện tại trước khi dựa vào tài liệu hoặc lịch sử task.

## Mục tiêu và cách cộng tác

Ju Study Hub là website ôn tập cá nhân theo môn và chapter. Codex giúp Ju học phát triển web, nên thay đổi cần nhỏ, dễ kiểm tra và được giải thích rõ. Giao diện dùng tiếng Việt.

- Trả lời bằng tiếng Việt rõ ràng. Giữ thuật ngữ quen thuộc như component, props, state, route và commit. Giải thích thuật ngữ mới khi cần. Không dùng dấu gạch ngang dài; tiêu đề dùng sentence case.
- Với task triển khai, chỉ làm một task đã thống nhất trong mỗi lượt rồi dừng để Ju review. Không tự chuyển sang task tiếp theo.
- Trước khi sửa, nêu mục tiêu, file dự kiến và kết quả Ju sẽ thấy. Đọc các `AGENTS.md` áp dụng, `git status`, `package.json` và source liên quan; đọc lockfile, tài liệu và phần code khác khi task cần. Giữ nguyên thay đổi sẵn có của Ju.
- Audit là kiểm tra và báo cáo, code review ưu tiên bug hoặc nguy cơ regression có vị trí cụ thể, planning đề xuất bước làm và rủi ro. Các task này không sửa file trừ khi Ju yêu cầu. Phân biệt phát hiện đã xác nhận với rủi ro cần kiểm thử.
- Khi phát hiện tài liệu không khớp source, báo rõ sai lệch và đề xuất task cập nhật riêng. Không tự sửa tài liệu ngoài phạm vi.
- Không refactor diện rộng, thêm dependency, backend, dịch vụ trả phí, commit, push hoặc deploy ngoài yêu cầu. Báo vị trí và tác động của bug ngoài phạm vi trước khi sửa.
- Nếu môi trường có Skill phù hợp với task, kiểm tra và dùng hướng dẫn của Skill đó; không giả định Skill tồn tại hoặc chép lại toàn bộ hướng dẫn Skill vào file này.
- Khi làm UI, giữ semantic HTML, keyboard, focus rõ, reduced motion và khả năng cuộn an toàn trên màn hình nhỏ.

## Ranh giới kiến trúc và dữ liệu

- Ứng dụng dùng Next.js App Router, React, TypeScript, Tailwind CSS và npm. `data/subjects.ts` đăng ký môn; `data/<subject>/index.ts` tập hợp chapter; `types/quiz.ts` định nghĩa dữ liệu câu hỏi. ID môn, chapter, câu và đáp án được dùng trong URL và dữ liệu đã lưu.
- Các luồng hiện có gồm quiz thường, Review câu sai, bookmark, luyện câu đã lưu và Thi thử. Route nằm trong `app/`; phần tương tác nằm trong `components/`, `hooks/` và `lib/`. Xem `docs/multi-subject-architecture.md` để hiểu luồng nhiều môn, nhưng đối chiếu source trước khi dùng thông tin có thể thay đổi.
- Dữ liệu người học hiện thuộc `localStorage` theo origin, chưa có Supabase, auth hoặc database trong ứng dụng. `lib/storage.ts` là adapter đồng bộ truy cập `window.localStorage`; từng module sở hữu key, schema và quy tắc khôi phục. Xem `docs/storage-architecture.md` và source liên quan để biết các record hiện tại. Tài liệu trong `docs/supabase/` là thiết kế, không phải chức năng đã triển khai.
- Giữ ID, thứ tự và nội dung học nếu task không yêu cầu đổi. Không đổi key hoặc schema dữ liệu đã lưu nếu chưa có kế hoạch tương thích dữ liệu cũ. Giữ tiến độ quiz thường, Review, bookmark practice và Thi thử đúng phạm vi riêng của từng chế độ.
- Đọc dữ liệu lưu sau khi client mount và chỉ ghi sau khi khôi phục để không ghi đè tiến độ cũ. Storage có thể bị chặn hoặc lỗi; tương tác vẫn phải dùng được trong bộ nhớ và UI không được gọi dữ liệu chưa lưu là đã lưu bền.
- Quiz thường chọn đáp án nháp rồi mới chấm. Thi thử chỉ hiện đáp án, giải thích và kết quả sau khi nộp. Kết quả, làm lại, Review câu sai và bookmark phải tiếp tục hoạt động khi thay đổi liên quan.

## Kiểm tra và bàn giao

Đọc scripts trong `package.json` trước khi chạy. Chọn kiểm tra theo tác động và nguy cơ mất dữ liệu, không chỉ theo đuôi file:

| Loại thay đổi | Kiểm tra phù hợp |
| --- | --- |
| Chỉ tài liệu | Đối chiếu nội dung với source liên quan; `git diff --check` nếu có sửa file. |
| CSS/UI | Lint phần liên quan và kiểm tra browser cho bố cục, keyboard, focus, responsive hoặc reduced motion bị tác động. Thêm typecheck/test khi có đổi TS hoặc logic. |
| Logic TypeScript | Typecheck, lint và test liên quan. |
| Quiz, ID hoặc storage | Test regression liên quan, kiểm tra tương thích dữ liệu cũ và browser cho luồng bị tác động; mở rộng sang full suite khi phạm vi hoặc rủi ro đòi hỏi. |
| Trước deploy hoặc thay đổi diện rộng được duyệt | Full test suite, lint, typecheck, production build và `git diff --check`. |

Khi sửa module dùng chung cho nhiều chế độ học, xác định các consumer có thể bị ảnh hưởng và ưu tiên chạy full test suite nếu có nguy cơ regression giữa các chế độ.

Các lệnh hiện có:

```sh
npm test
npm run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
git diff --check
```

Production build trong checklist dùng `--webpack`. Nếu TypeScript báo thiếu `.next/types`, chạy Next type generation hoặc build trước khi kết luận code lỗi. Với thay đổi tương tác, test tĩnh không thay thế kiểm tra browser; chỉ báo đã kiểm tra những gì thực sự chạy. Nếu không thể thực hiện kiểm tra cần thiết, nêu rõ lý do và giới hạn.

Sau task triển khai, ghi ngắn kết quả vào `docs/progress.md` mà không ghi đè lịch sử. Không cập nhật nhật ký cho audit, planning hoặc code review chỉ đọc, trừ khi Ju yêu cầu. `docs/source-audit.md` là snapshot nguồn tại thời điểm ghi, không phải tổng số câu hiện tại.

Báo cáo cuối task ngắn gọn: đã làm, file thay đổi và lý do, kết quả kiểm tra, phần chưa kiểm chứng, cách Ju kiểm tra và một bước tiếp theo dự kiến. Với code thay đổi, giải thích logic và lý do thiết kế; chỉ giải thích luồng props, state và event khi có liên quan hoặc Ju yêu cầu. Dừng để Ju review.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
