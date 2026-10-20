# Audit trước khi triển khai Supabase

Ngày kiểm tra: 18/10/2026. Phạm vi: quiz thường, Review, bookmark, luyện câu đã lưu, Thi thử và thiết kế bốn bảng. Đây là audit source và test hiện tại; chưa triển khai Supabase, chưa chạy SQL trên PostgreSQL và chưa kiểm thử tương tác browser trong lượt này.

## Cách đọc mức độ và kết luận

- **P0**: phải xử lý hoặc chốt chính sách trước khi nhập dữ liệu hay bật sync, vì có thể làm mất dữ liệu hoặc bỏ sót cả một loại dữ liệu.
- **P1**: lỗi hiện có hoặc nguy cơ xung đột đáng kể cần xử lý trước khi phát hành sync.
- **P2**: thiếu kiểm thử, validation hoặc tài liệu cần đưa vào backlog.
- **Bug đã xác nhận** nghĩa là đường thực thi và hậu quả thấy được từ source, hoặc test đã chạy cho kết quả lỗi. **Rủi ro cần kiểm thử** nghĩa là chưa có tái hiện browser/hai thiết bị hay môi trường Supabase thật. **Khoảng trống thiết kế** là hành vi chưa được quyết định, không gọi là bug của ứng dụng hiện tại.

## Đối chiếu dữ liệu localStorage với bốn bảng

Toàn bộ bảy nhóm key ứng dụng được tìm thấy qua source. `lib/storage.ts:7-13` chỉ có adapter chuỗi đồng bộ, không có user ID, revision, outbox bền hoặc transaction. Các key hiện thuộc browser origin, không tự chuyển giữa thiết bị.

| Dữ liệu local | Source và reset hiện tại | Đích trong thiết kế cloud | Kết luận |
| --- | --- | --- | --- |
| `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` | `hooks/useQuizProgress.ts:41-96,138-148`; nháp, đáp án đã chấm, cursor; reset xóa key chapter | `quiz_progress`, một row/user/chapter, `reset_at` tombstone | Có ánh xạ, nhưng local không có revision/thời điểm sửa; import phải chụp raw trước khi mount quiz. |
| `ju-study-hub:mistakes:v1` | `lib/mistakes.ts:16-85`; ref sai, đúng trong Review xóa | `mistakes`, row/ref, `is_present` tombstone | Có ánh xạ; mở Review hiện có thể xóa ref không còn trong catalog. |
| `ju-study-hub:review-round:v1` | `components/ReviewMistakes.tsx:29-43,51-63`; snapshot thứ tự và scope; lượt mới ghi đè | `review_rounds.items`, `scope_*`, `round_id` | Có ánh xạ; local chưa có round ID và không ghi nguyên tử với progress. |
| `ju-study-hub:review-progress:v1` | `hooks/useQuizProgress.ts:27,41-96,138-148`; đáp án/cursor; lượt mới hoặc reset xóa key | `review_rounds.progress` cùng row | Có ánh xạ; phải nhận diện cặp local không khớp trước import. |
| `ju-study-hub:bookmarks:v1` | `lib/bookmarks.ts:21-87`; danh sách ref; bỏ lưu xóa ref | `bookmarks`, row/ref, `is_present` tombstone | Có ánh xạ; ref orphan phải giữ. |
| `ju-study-hub:bookmark-practice:v1` | `lib/bookmark-practice.ts:29-95`; một round ID, scope, ref snapshot, cursor/answers; lượt mới ghi đè | **Không có** trong bốn bảng | Chưa có chính sách nhập/sync, reset hoặc xung đột giữa thiết bị. |
| `ju-study-hub:exam-attempt:v1` | `lib/exam.ts:18-25,42-60,164-192`; một attempt gồm snapshot nội dung, deadline, kết quả và cờ ghi mistakes; đề mới ghi đè | **Không có** trong bốn bảng | Chưa có chính sách nhập/sync attempt, deadline và kết quả. Không có key hay cấu trúc exam history. |

`docs/supabase/data-model.md:5-16,56-68` được viết khi chỉ có năm nhóm key đầu; câu “không có ... lịch sử lượt hoàn thành hay nội dung câu hỏi trong storage” nay sai với exam snapshot và kết quả. `docs/storage-architecture.md` đã liệt kê đủ bảy nhóm. `docs/supabase/implementation-plan.md` Stage 4 đến 10 mới bao phủ bốn bảng, nên chưa có điều kiện nghiệm thu cho hai chế độ mới. `docs/supabase/schema-draft.sql:1-86` chỉ khai báo bốn bảng; không nên ngầm nhét attempt vào `quiz_progress` vì cấu trúc, lịch sử, deadline và snapshot khác nhau.

## Phát hiện theo mức độ ưu tiên

### P0

1. **Bug đã xác nhận, mất ref mistakes khi mở Review.** `components/ReviewMistakes.tsx:29-30` lọc kho câu sai theo catalog rồi gọi `saveMistakes` với danh sách đã lọc. `lib/mistakes.ts:63-74` biến các ref bị lọc thành lệnh xóa bền. Một câu tạm biến mất hoặc đổi ID sẽ mất ref chỉ vì mở `/review`; cloud import sau đó không còn đọc được bản gốc. Cần tách lọc để hiển thị khỏi thao tác xóa, và chụp raw *trước* khi mount Review.
2. **Khoảng trống thiết kế chặn nhập/sync đầy đủ.** Bốn bảng và kế hoạch hiện tại bỏ qua bookmark practice và exam (`lib/bookmark-practice.ts:6-11`, `lib/exam.ts:5,18-25`; `docs/supabase/data-model.md:5-16`; `docs/supabase/implementation-plan.md:1-25`). Nếu công bố “mọi tiến độ được đồng bộ” theo kế hoạch này, hai lượt đang làm và kết quả thi sẽ không sang thiết bị khác. Cần chốt rõ có đồng bộ hai loại này trong đợt Supabase hay giữ local có thông báo, trước khi thiết kế import.
3. **Rủi ro cần kiểm thử, raw quiz bị thay trước import.** `hooks/useQuizProgress.ts:41-59,80-96` khôi phục bản đã lọc theo catalog rồi ghi lại toàn snapshot hoặc xóa key rỗng khi mount; `lib/quiz-progress.ts:15-36` bỏ answer không còn ID/option hợp lệ. Nếu bước import chụp local sau khi người dùng mở quiz, raw answer cũ hoặc bản hỏng có thể đã mất. Kế hoạch `docs/supabase/data-model.md:56-68` yêu cầu giữ raw nhưng cần cổng thực thi trước mọi UI có ghi, kể cả quiz. Chưa tái hiện browser trong lượt này.

### P1

4. **Bug đã xác nhận từ source, đổi lượt Review không nguyên tử.** `components/ReviewMistakes.tsx:51-63` xóa progress rồi ghi round bằng hai thao tác riêng; nếu một thao tác lỗi, state giao diện vẫn chuyển sang lượt mới. `hooks/useQuizProgress.ts:47-52` ưu tiên progress còn trong storage hơn `initialReviewProgress` của lượt mới. Nếu xóa progress thất bại nhưng ghi round thành công, đáp án cũ có cùng tuple ID có thể khôi phục vào lượt mới; nếu ghi round thất bại, reload trở về lượt cũ. Cần kiểm thử fault injection ở từng write và có quy tắc cứu cặp không khớp.
5. **Rủi ro cần kiểm thử, lost update trong nhiều tab hoặc thiết bị.** Quiz ghi cả snapshot chapter tại `hooks/useQuizProgress.ts:80-96` và không nghe `storage`; bookmark/mistakes đọc, ghép rồi ghi cả danh sách tại `lib/bookmarks.ts:57-67`, `lib/mistakes.ts:50-60`, nhưng thao tác đó không nguyên tử qua tab. Bookmark practice và exam dùng một record ghi đè (`lib/bookmark-practice.ts:68-90`, `lib/exam.ts:178-192`); `roundId`/`attemptId` loại callback *sau khi* đọc được record mới, không tạo CAS cho hai writer đồng thời. Một tab cũ có thể ghi đè thay đổi vừa lưu của tab khác. Cloud cần revision/operation ID/round ID, outbox và conflict flow; chưa có test hai writer trong repo.
6. **Bug đã xác nhận từ source, vòng đời exam chỉ giữ một attempt và không có history.** `lib/exam.ts:5,178-182` ghi cùng một key; `components/ExamApp.tsx:131-141,280-281` tạo đề mới hoặc thi lại bằng cách ghi đè, kể cả khi attempt trước đã nộp. Hiện chỉ xem được kết quả gần nhất (`components/ExamApp.tsx:259-260`). Nếu exam history là yêu cầu cloud, cần mô hình lưu nhiều attempt và chính sách giữ/xóa được duyệt; bốn bảng hiện tại không biểu diễn được lịch sử.
7. **Rủi ro cần kiểm thử, nộp exam và cập nhật mistakes không nguyên tử.** `components/ExamApp.tsx:55-71,73-80,144-149` lưu trạng thái submitted rồi thêm từng ref sai vào kho; `mistakesApplied` chỉ đổi sau khi kiểm tra storage. Nếu reload/crash hoặc tạo attempt mới trước khi các ref sai được xác nhận bền, attempt cũ bị ghi đè và không còn nguồn để retry. Khi sync, không được coi cờ local này là xác nhận server; cần operation idempotent, retry bền và quy tắc nếu Review đã xóa mistake sau lần thi đó.
8. **Bug đã xác nhận ở cổng test hiện tại.** `npm test` ngày 18/10/2026: 86/88 đạt. `tests/quiz-data.test.mjs:41,50-58` chờ Database Session 1 revision 2 nhưng `data/database/session-1.ts:9` là 3. `tests/quiz-data.test.mjs:255-261` chờ hash `fd3d34...` nhưng thực tế `57a3c2...`. Chưa kết luận source hay fixture đúng; cần đối chiếu thay đổi nội dung/ID với nguồn được Ju duyệt trước khi sửa test hoặc data. Đây là cổng regression đang đỏ, không phải bằng chứng Supabase gây lỗi.
9. **Khoảng trống thiết kế về deadline và quyền sở hữu exam.** `lib/exam.ts:42-60,86-99` và `components/ExamApp.tsx:73-80,165-176` dựa vào `Date.now()` của thiết bị. Reload trên cùng máy giữ deadline; client đổi đồng hồ hoặc hai máy lệch giờ chưa được kiểm soát. Cần quyết định dùng thời gian server khi sync, cách xử lý offline/hết giờ và liệu exam chỉ là luyện tập hay cần chống gian lận. Snapshot chứa đáp án đúng ngay trong local record (`lib/exam.ts:52-57`), nên không thể hứa bảo mật đáp án trước nộp chỉ bằng UI.

### P2

10. **Rủi ro validation khi nhập exam.** `lib/exam.ts:105-159` kiểm tra cấu trúc và tổng ba số đếm, nhưng không tính lại `result` từ snapshot/answers hoặc xác nhận `deadlineAt = startedAt + minutes`; bản ghi bị sửa có thể hiện điểm/thời gian không khớp. Local record không phải nguồn đáng tin cho kết quả cloud nếu muốn dùng làm thành tích. Cần test dữ liệu sai và quyết định lưu kết quả tự khai hay chấm lại từ snapshot.
11. **Rủi ro mất thay đổi khi storage bị chặn.** Quiz chỉ giữ state trong component (`hooks/useQuizProgress.ts:90-94`); bookmark/mistakes có pending trong module (`lib/bookmarks.ts:38-67`, `lib/mistakes.ts:32-60`); practice/exam có một bản trong RAM (`lib/bookmark-practice.ts:13-14,61-75`, `lib/exam.ts:161-183`). Reload/OAuth redirect/đóng tab làm mất pending. Kế hoạch cloud đã nêu outbox bền theo user (`docs/supabase/data-model.md:68-89`), nhưng chưa có cơ chế hoặc test thực thi.
12. **Rủi ro tương thích catalog.** Practice chỉ lưu ref, khi khôi phục `resolvePractice` loại câu/answer không còn trong catalog (`lib/bookmark-practice.ts:52-59`); quiz thường lọc ID/option tương tự (`lib/quiz-progress.ts:15-36`). Exam giữ snapshot nội dung nên điểm cũ không đổi (`lib/exam.ts:52-74`). Cần chốt cách giữ raw orphan/answer lịch sử trong import và liệu practice dở với câu biến mất có tiếp tục, được lưu trữ hay được báo cho người dùng. `contentRevision:null` cho answer local cũ trong `docs/supabase/data-model.md:37-68` là chính sách đã chốt, không tự thay.
13. **Tài liệu chưa phản ánh tính năng mới.** `README.md:7,25-38,46-48` mô tả cấu trúc và key mà thiếu bookmark practice/exam; `docs/supabase/data-model.md:5-16` và `docs/supabase/implementation-plan.md:1-25` chưa được cập nhật sau hai chế độ đó. Không dựa vào số nhóm key hoặc câu “không có nội dung câu hỏi trong storage” của tài liệu cũ khi viết migration.

## Hành vi hiện tại đã kiểm tra và giới hạn

- Quiz: restore sau mount và chỉ ghi khi đã restore (`hooks/useQuizProgress.ts:41-96`); reset xóa đúng key chapter (`:138-148`). Câu chọn là nháp, chấm mới khóa (`:117-135`); normal wrong thêm mistakes, normal correct giữ nguyên (`components/QuizRunner.tsx:97-104`, `lib/mistakes.ts:78-85`). Không có bảo đảm nhiều tab.
- Review: snapshot giữ thứ tự ref trong lượt (`lib/review-round.ts:25-35`); chấm đúng xóa ref khỏi kho nhưng lượt hiện hành vẫn giữ câu (`components/QuizRunner.tsx:97-104`); tiến độ riêng. Lượt mới/reset không có transaction local.
- Bookmark: ref dùng bộ ba ID, giữ orphan trong danh sách (`lib/bookmarks.ts:7-33`, `components/BookmarkedQuestions.tsx:127-180`); pending chỉ trong RAM. Practice chụp danh sách ref theo bộ lọc tại lúc bắt đầu, tách quiz/Review, round mới có `roundId` và đáp án rỗng (`lib/bookmark-practice.ts:16-27,78-90`). Không lưu nội dung câu hỏi hoặc history lượt practice.
- Exam: `createExam` lọc và loại ref trùng, trộn câu và copy sâu snapshot; giữ thứ tự option (`lib/exam.ts:31-60`). Đáp án sau deadline bị từ chối và `submitExam` idempotent (`:86-99`); mount, interval, focus, pageshow, visibility kiểm tra deadline (`components/ExamApp.tsx:73-116`). Nộp xong mới hiện đáp án/giải thích (`:283-305`); chỉ ref sai còn trong catalog được thêm vào mistakes, bỏ trống không thêm (`lib/exam.ts:76-84`, `components/ExamApp.tsx:55-71`). Đây là kiểm tra source và unit test, chưa xác nhận lại bằng browser trong audit này.

## Quyết định cloud còn thiếu

1. **Phạm vi sync:** bookmark practice và exam là dữ liệu local có chủ đích hay phải theo tài khoản/thiết bị? Nếu phải sync, bốn bảng là không đủ; cần đề xuất schema và migration riêng để Ju duyệt. Nếu giữ local, UI/tài liệu phải nói rõ giới hạn và tránh trộn dữ liệu giữa tài khoản trên cùng origin.
2. **Practice:** chỉ một lượt đang làm hay giữ lịch sử; thay lượt/clear tạo tombstone thế nào; xung đột hai thiết bị cùng lượt hoặc hai `roundId` khác nhau xử lý ra sao; ref bị xóa khỏi bookmark/catalog có còn trong lượt không.
3. **Exam:** một attempt hiện hành hay nhiều attempt và exam history; giữ snapshot, đáp án, kết quả bao lâu; thi lại và thay đề có lưu kết quả cũ không; deadline dùng đồng hồ nào, offline xử lý thế nào; duplicate submit và `mistakesApplied` được xác nhận bền ra sao.
4. **Nhập legacy:** chụp raw bảy nhóm trước UI có write và trước OAuth redirect; khi local khác cloud, không tự gộp quiz/Review theo chính sách đã chốt. Cần quyết định preview/import cho practice và exam, bản hỏng, orphan và dữ liệu thuộc người dùng nào trên máy dùng chung.
5. **Thứ tự sự kiện giữa thực thể:** một exam sai thêm mistake, Review đúng xóa mistake, thiết bị cũ sync muộn. Phải quyết định thao tác nào thắng và cách lưu ý định/phiên bản để tránh hồi sinh ref đã xóa.
6. **Bảo đảm CAS:** `docs/supabase/schema-draft.sql:105-139` tăng revision nhưng direct authenticated `UPDATE` không bắt buộc `expected_revision`; RLS chỉ kiểm tra owner. Nếu cần bất biến tại database, chốt RPC và thu hồi direct UPDATE trước khi tuyên bố chống lost update. SQL hiện chỉ là draft, chưa được chạy.

## Các task nhỏ đề xuất, theo thứ tự

| Thứ tự | Task độc lập | Acceptance criteria |
| --- | --- | --- |
| 1 | Chốt phạm vi và chính sách cho practice, exam, history và deadline. Chỉ cập nhật tài liệu thiết kế. | Có quyết định rõ sync hay local cho từng loại, ownership, offline, history, reset/tombstone, conflict, import và hệ quả với bốn bảng; Ju duyệt trước schema/app. |
| 2 | Sửa việc mở Review xóa orphan mistakes. | Mở `/review` không đổi raw mistakes; ref có thể ôn vẫn hiện, ref orphan giữ để import; unit test và browser xác nhận. |
| 3 | Thiết kế bước chụp raw trước mọi write/mount, không triển khai cloud. | Test với quiz invalid/stale và Review orphan chứng minh snapshot raw bảy nhóm giữ nguyên, có báo phần parse bị loại; OAuth redirect không làm mất staging. |
| 4 | Sửa vòng đời Review local theo một task nhỏ. | Fault injection từng thao tác đổi lượt/reset không gán answer lượt cũ cho lượt mới; reload nhận biết cặp mismatch, không xóa raw im lặng; test và browser. |
| 5 | Đối chiếu Session 1 với nguồn đã duyệt rồi sửa đúng một phía của baseline. | 88/88 test đạt; revision và hash phản ánh nội dung được xác nhận, không sửa ngân hàng chỉ để làm test xanh. |
| 6 | Bổ sung regression tests cho practice/exam và concurrency local. | Có ca hai tab cùng key, stale callback, storage error/reload, deadline sau reload, submit lặp, submit rồi crash trước mistakes, tạo đề mới khi `mistakesApplied=false`, snapshot sau đổi catalog; test ghi rõ giới hạn local không CAS. |
| 7 | Sau khi Ju duyệt thiết kế, mở rộng kế hoạch/schema và thử nghiệm cloud theo từng stage riêng. | Migration chạy trên project thử; RLS A/B/anon và CAS hai client cùng user được chứng minh; mọi key cần sync có import, outbox, tombstone và test hai thiết bị. |

## Kiểm tra trong lượt audit

- Đã đọc `AGENTS.md`, `README.md`, `docs/storage-architecture.md`, toàn bộ ba file trong `docs/supabase/`, source của năm chế độ và test liên quan; `git status --short` ban đầu sạch.
- `npm test`: **86 pass, 2 fail** tại `tests/quiz-data.test.mjs` như mục P1 số 8. Các test exam hiện có bao phủ chọn đề/snapshot, guard deadline, idempotent submit, stale callback và blocked storage (`tests/exam.test.mjs:33-126`), nhưng chưa bao phủ component auto-submit/focus, side effect mistakes, nhiều tab hay history. Practice có test lọc/restore/round ID (`tests/bookmark-practice.test.mjs:38-89`), chưa có test xung đột hoặc import/cloud.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: đạt. `npm run lint` không trả kết quả sau hơn hai phút nên đã dừng; không kết luận lint đạt hay lỗi. Không chạy browser hay Supabase integration. Các tình huống cloud và fault injection nêu trên là đề xuất regression tests, không phải kết quả đã kiểm chứng.

| Chế độ | Coverage hiện có | Regression còn thiếu trước sync |
| --- | --- | --- |
| Quiz thường | Restore sau mount, nháp/chấm/reset, blocked/quota storage (`tests/use-quiz-progress.test.mjs:123-241`) | Hai tab cùng chapter, raw bị chuẩn hóa trước import, reset đối đầu thiết bị stale và thay `contentRevision`. |
| Review và mistakes | Scope/snapshot/restore, thêm/xóa ref, pending retry (`tests/review-round.test.mjs:30-66`, `tests/mistakes.test.mjs:33-197`) | Mở Review giữ orphan, lỗi giữa hai write khi đổi lượt, callback từ lượt cũ, hai thiết bị chấm/xóa cùng ref. |
| Bookmark | Ref, orphan, pending storage (`tests/bookmarks.test.mjs:36-134`) | Hai tab thêm/bỏ cùng hoặc khác ref, tombstone ngăn import cache cũ. |
| Bookmark practice | Scope, restore, round ID và lỗi ghi (`tests/bookmark-practice.test.mjs:38-89`) | Reload khi pending, thay catalog, hai tab/thiết bị thay round, quyết định nhập/sync. |
| Mock exam | Snapshot, deadline hàm thuần, submit idempotent, callback cũ (`tests/exam.test.mjs:33-126`) | Auto-submit ở component sau interval/focus/pageshow, xác nhận nộp qua deadline, crash giữa submit và mistakes, duplicate submit hai client, history/đổi attempt và đồng hồ lệch. |

Task tiếp theo dự kiến sau khi Ju review: chốt quyết định phạm vi sync cho bookmark practice và exam trước khi sửa code hay mở rộng schema.
