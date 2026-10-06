# Ju Study Hub: hướng dẫn làm việc và bàn giao dự án

Cập nhật: 05/10/2026. Chủ dự án: Ju.

## 1. Mục tiêu

Ju Study Hub là website ôn tập cá nhân theo môn và chapter, ưu tiên Blockchain. Mục tiêu gần nhất là có một website dễ dùng, giao diện cute/kawaii tạo động lực học, sau đó deploy public. Ju muốn có thể đưa hình tự vẽ vào giao diện về sau.

Đây đồng thời là dự án học phát triển web. Codex trực tiếp sửa code để tăng tốc, nhưng phải giúp Ju hiểu và theo dõi từng thay đổi. Không biến dự án thành một sản phẩm lớn mà chủ dự án không hiểu code.

Ngôn ngữ giao diện hiện tại: tiếng Việt. Mong muốn dài hạn có tiếng Anh, chưa triển khai song ngữ trong giai đoạn hiện tại.

## 2. Quy tắc bắt buộc khi cộng tác với Ju

- Trả lời bằng tiếng Việt rõ ràng, thân thiện. Giữ các thuật ngữ quen thuộc như component, props, state, route, commit. Giải thích thuật ngữ mới ngay tại chỗ.
- Mỗi lượt chỉ triển khai một task nhỏ, có kết quả cụ thể và kiểm tra được. Một task có thể sửa vài file nếu chúng cùng phục vụ một mục tiêu.
- Trước khi sửa: nêu mục tiêu task, những file dự kiến liên quan và kết quả người dùng sẽ thấy. Với yêu cầu rõ ràng, thực hiện luôn phần đã được giao, không hỏi lại quyền sửa từng file.
- Sau khi hoàn thành task: dừng để Ju kiểm tra và phản hồi. Không tự chuyển sang task tiếp theo, kể cả còn nhiều việc trong kế hoạch.
- Khi Ju gửi kết quả kiểm tra, câu hỏi hoặc lỗi: review/giải thích/sửa phần đó trước khi mở task mới.
- Luôn giải thích code đã thay đổi: file nào làm gì, vì sao cần thay đổi, props/state/sự kiện đi qua đâu nếu có. Chỉ trích những đoạn code quan trọng, không đổ toàn bộ file vào câu trả lời.
- Không cần giảng lại kiến thức cơ bản trong mọi lượt. Với thay đổi CSS, giải thích bố cục và các class quan trọng. Với logic, dùng một ví dụ nhỏ nếu cần.
- Cuối mỗi task phải có cách kiểm tra ngắn, kết quả mong đợi và giới hạn còn tồn tại. Phân biệt rõ kiểm tra Codex đã chạy với kiểm tra nhờ Ju thực hiện.
- Không nói đã build, test hoặc xem giao diện nếu chưa làm. Nếu thiếu môi trường hoặc quyền truy cập, nói chính xác phần chưa kiểm chứng.
- Không viết lại toàn bộ dự án hoặc refactor diện rộng khi task chỉ yêu cầu sửa một phần.
- Không thêm thư viện, backend, tài khoản đăng nhập hoặc dịch vụ trả phí nếu chưa có nhu cầu rõ. Nêu lý do trước khi đề xuất dependency mới.
- Không tự deploy, push hoặc thực hiện thao tác Git phá hủy khi Ju chưa yêu cầu. Không ghi đè thay đổi đang có của Ju.
- Không dùng dấu gạch ngang dài trong nội dung giải thích. Viết hoa tiêu đề theo sentence case.

Mẫu báo cáo cuối task:

1. Đã làm: kết quả cụ thể trong 1–2 câu.
2. Code thay đổi: các file và giải thích ngắn về thay đổi chính.
3. Đã kiểm tra: lệnh/kết quả hoặc kiểm tra giao diện thực tế.
4. Ju kiểm tra: 2–4 thao tác có kết quả mong đợi.
5. Bước kế tiếp dự kiến: một câu, chưa thực hiện cho tới khi Ju phản hồi.

## 3. Nguồn sự thật và giới hạn bàn giao

Tài liệu này được tổng hợp từ quá trình hướng dẫn, các file Ju đã gửi và các kiểm thử Ju xác nhận. Người viết tài liệu chưa truy cập trực tiếp toàn bộ repository trên máy Ju, chưa chạy build của dự án.

Code trên máy Ju là nguồn sự thật. Khi bắt đầu, đọc repository hiện tại và so sánh với phần mô tả dưới đây. Nếu khác, ghi nhận sự khác biệt; không tự sửa code để ép khớp tài liệu.

Đọc các AGENTS.md có phạm vi áp dụng, package.json, lockfile và git status trước khi chỉnh sửa. Không suy đoán phiên bản từ tài liệu này nếu package.json cho kết quả khác.

## 4. Môi trường và công nghệ đã quan sát

- Máy Ju dùng Windows; thư mục dự án: C:\Projects\ju-study-hub.
- Next.js App Router, TypeScript, Tailwind CSS, npm.
- Dùng thư mục app ở gốc, không có src trong cấu trúc khởi tạo.
- Import alias: @/* trỏ về gốc dự án.
- Cấu hình khởi tạo: ESLint, không bật React Compiler.
- Lệnh phát triển: npm run dev; URL thường là http://localhost:3000.
- Log trước đây báo Node.js v24.21.0, npm 11.19.0, Next.js 16.3.8 với Turbopack. Đây là giá trị đã quan sát, cần xác minh từ môi trường hiện tại.
- Chưa xác nhận remote Git, deployment, bộ test hoặc scripts ngoài dev. Hãy đọc cấu hình thật trước khi dùng.

## 5. Cấu trúc hiện tại

| Đường dẫn | Vai trò |
| --- | --- |
| app/page.tsx | Trang chủ Ju Study Hub, lời chào và thẻ môn Blockchain |
| app/subjects/blockchain/page.tsx | Danh sách chapter của môn Blockchain |
| app/subjects/blockchain/[chapterId]/page.tsx | Giới thiệu chapter và liên kết bắt đầu quiz |
| app/quiz/blockchain/[chapterId]/page.tsx | Đọc chapter và render QuizRunner |
| components/SubjectCard.tsx | Thẻ môn học, nhận title, description, href |
| components/QuizRunner.tsx | Quản lý tiến trình, đáp án, kết quả và làm lại |
| components/QuizQuestion.tsx | Hiển thị một câu, chọn và chấm đáp án |
| components/QuizResult.tsx | Hiển thị điểm, tỉ lệ đúng và nút làm lại |
| data/blockchain/chapter-1.ts | Bộ 25 câu gộp Chapter 1 + 2 |
| types/quiz.ts | Kiểu Question và Chapter |

Đây là các file đã được biết, không phải danh sách đầy đủ mọi file của repository. Kiểm tra thêm layout.tsx, globals.css, public và các file cấu hình khi làm giao diện.

## 6. Mô hình dữ liệu

```ts
export type Question = {
    id: string;
    prompt: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
    explanation: string;
    source?: string;
};

export type Chapter = {
    id: string;
    title: string;
    description: string;
    revision: number;
    questions: Question[];
};
```

Bộ dữ liệu hiện tại:

- Export vẫn là chapter1; id vẫn là chapter-1 để giữ các route/import hiện có.
- Tiêu đề: Chapter 1 + 2: Wallet, key và transaction.
- Có 25 câu về wallet, key/address, seed phrase, BIP32/39/44, custody, RPC, transaction lifecycle, UTXO và account model.
- File được bàn giao có revision: 2; ID câu hỏi dạng bc-ch1-2-q01 đến bc-ch1-2-q25.
- ID đáp án là a, b, c, d; giao diện hiển thị chữ hoa.
- Câu hỏi do Ju cung cấp; đáp án, giải thích và URL nguồn được trợ lý bổ sung. Chưa đối chiếu toàn bộ với slide/đáp án chính thức của giảng viên.
- Không quay lại bộ hai câu mẫu ban đầu hoặc thay nội dung học bằng dữ liệu demo khi sửa UI.
- Câu 4 có lựa chọn D hơi mơ hồ. Đã đề xuất sửa thành “Tùy ý sửa balance của Bob trên blockchain”; chưa xác nhận Ju đã sửa. Kiểm tra và báo lại, không âm thầm sửa nội dung học trong task giao diện.
- Giải thích câu 21 đã nhắc change = 0.6 BTC trừ phí; câu 24 phân biệt account sinh từ seed phrase với account import bằng private key riêng.

## 7. Luồng quiz và trách nhiệm component

Trang quiz là async Server Component. Params có dạng Promise<{ chapterId: string }> và được await. Phiên bản đã review kiểm tra ID với chapter1.id, gọi notFound() nếu không khớp, có xử lý chapter rỗng rồi truyền questions cho QuizRunner. Chưa có bộ registry nhiều chapter.

QuizRunner là Client Component với các state:

```ts
const [currentIndex, setCurrentIndex] = useState(0);
const [answers, setAnswers] = useState<Record<string, string>>({});
const [isFinished, setIsFinished] = useState(false);
```

- question = questions[currentIndex].
- handleAnswer lưu questionId → optionId, giữ các đáp án trước bằng functional state update và object spread.
- correctCount được tính từ questions và answers, không có state điểm riêng.
- handleNext tăng index với điều kiện không vượt câu cuối.
- Truyền key={question.id} cho QuizQuestion để reset state của câu khi chuyển câu.
- Chỉ truyền onNext khi chưa phải câu cuối.
- Nút Xem kết quả chỉ hiện ở câu cuối khi answers[question.id] đã được ghi nhận.
- Khi isFinished là true, render QuizResult.
- handleRestart reset currentIndex về 0, answers về {}, isFinished về false.

QuizQuestion có props question, onNext? và onAnswer(questionId, optionId). State cục bộ gồm selectedOptionId và isSubmitted.

- Chọn radio chưa ghi nhận điểm.
- Kiểm tra đáp án bị vô hiệu hóa khi chưa chọn hoặc đã chấm.
- handleSubmit có guard, đặt isSubmitted rồi gọi onAnswer.
- fieldset disabled sau khi chấm để khóa lựa chọn.
- Hiển thị đúng/sai, đáp án đúng và explanation sau khi chấm.
- Chỉ hiện Câu tiếp theo sau khi chấm và có onNext.

QuizResult nhận correctCount, totalQuestions, onRestart. Tính phần trăm bằng Math.round, có guard tổng câu bằng 0. Component này được import trong cây Client Component của QuizRunner.

Luồng hiện tại là luyện tập có phản hồi từng câu, chưa phải chế độ thi chỉ chấm sau khi nộp toàn bài. Không tự thay đổi điều này.

## 8. Tiến độ đã được xác nhận

- Trang chủ, môn học, giới thiệu chapter và liên kết quay lại hoạt động.
- Quiz chọn được một đáp án, chấm đúng/sai, hiện giải thích và khóa lựa chọn sau khi chấm.
- Chuyển câu reset lựa chọn và trạng thái chấm.
- Điểm được giữ qua các câu; các lượt mẫu 1/2, 2/2 và phần trăm tương ứng đã được kiểm tra.
- Hiển thị kết quả và làm lại hoạt động; Ju xác nhận lượt mới reset đúng.
- Đã tách QuizResult; Ju xác nhận giao diện và hành vi giữ nguyên.
- Đã nhập bộ 25 câu: Ju xác nhận tiêu đề, số câu, câu đầu chấm B đúng và chuyển sang câu tiếp theo hoạt động.
- Đã thu gọn trang quiz. Ju xác nhận cả câu 21 dài hơn cũng vừa màn hình đang dùng.

Chưa xác nhận kiểm thử toàn bộ 25 đáp án bằng tự động, production build hoặc đầy đủ kích thước màn hình. Không biến các xác nhận trên thành tuyên bố đã có test suite.

## 9. Giao diện hiện tại và ràng buộc cần giữ

Giao diện có nền hồng nhạt, card trắng bo tròn, chữ slate và nút hồng đậm. Đây mới là nền tảng, chưa phải bản thiết kế cute hoàn thiện.

Trang quiz đã được thu gọn:

- main: min-h-screen bg-pink-50 px-4 py-6 text-slate-800.
- section: mx-auto max-w-3xl rounded-3xl bg-white p-5 shadow-sm sm:p-6.
- Tiêu đề chapter: mt-3 text-xl font-bold sm:text-2xl.
- Đã bỏ mô tả chapter và dòng tổng số câu riêng khỏi trang quiz; chúng vẫn có thể xuất hiện ở trang giới thiệu.
- Dòng Câu x / 25 và Đúng: y / 25 nằm cùng hàng với flex-wrap.
- Câu hỏi dùng text-lg; đáp án có khoảng cách gọn; đã bỏ dòng thông báo “Bạn đang chọn đáp án...”.
- Kết quả từng câu đã thu nhỏ padding và font.

Yêu cầu quan trọng: trên màn hình desktop hiện tại của Ju, câu hỏi và toàn bộ lựa chọn cần đọc được mà không phải cuộn. Bố cục đã kiểm tra còn chứa được giải thích và nút chuyển câu. Không làm mất lợi ích này khi thêm trang trí.

Không dùng overflow-hidden để che nội dung hoặc ép font quá nhỏ để giả vờ vừa màn hình. Với mobile, zoom lớn hoặc nội dung dài, cho phép cuộn an toàn. Không hứa mọi nội dung đều vừa mọi viewport.

Giữ semantic HTML, radio/fieldset/legend, khả năng dùng bàn phím và focus rõ. Trạng thái đúng/sai cần có chữ hoặc biểu tượng có nhãn, không chỉ dựa vào màu.

## 10. Ưu tiên tiếp theo: giao diện cute

Ju chuyển sang Codex để có giao diện đẹp sớm hơn, từ đó có động lực ôn tập. Trong giai đoạn này, ưu tiên UI trước chapter mới và chức năng mới.

Hướng thiết kế ban đầu để đề xuất, chưa phải yêu cầu mỹ thuật đã được duyệt:

- Kawaii nhẹ nhàng: hồng pastel, kem, khoảng trắng, card bo tròn và điểm nhấn nhỏ.
- Dễ đọc, tập trung vào học; tránh quá nhiều emoji, chuyển động hoặc trang trí chiếm chiều cao.
- Thiết kế nhất quán giữa trang chủ, danh sách chapter, quiz và kết quả.
- Dành chỗ phù hợp cho hình Ju tự vẽ về sau; không tự giả định đã có asset.
- Dùng tài nguyên hiện có và CSS trước. Nếu cần hình mới, hỏi/đề xuất asset cụ thể, không dùng ảnh ngẫu nhiên không rõ nguồn.

Các task gợi ý, thực hiện từng task sau phản hồi của Ju:

1. Đọc code thật, báo cấu trúc và đề xuất một hướng giao diện cụ thể. Nêu task UI đầu tiên có phạm vi nhỏ để Ju duyệt.
2. Áp dụng màu nền, card và kiểu chữ cho một màn hình đại diện, ưu tiên quiz vì Ju đang dùng để ôn tập.
3. Làm trạng thái đáp án dễ nhận biết: đang chọn, đúng và chọn sai; giữ logic khóa đáp án.
4. Đồng bộ trang chủ và danh sách chapter với phong cách đã duyệt.
5. Hoàn thiện màn hình kết quả, sau đó kiểm tra responsive và khả năng đọc.

Đây là backlog đề xuất, không phải quyền triển khai tất cả trong một lượt. Không kéo dài quá trình bằng task chỉ đổi một class nếu một nhóm thay đổi nhỏ cùng mục tiêu có thể được review dễ dàng.

## 11. Backlog sau giao diện, chưa triển khai

- Hiển thị các câu trả lời sai để ôn lại.
- Hỗ trợ nhiều chapter bằng danh sách dữ liệu dùng chung và tra cứu theo ID.
- Lưu lịch sử lượt đã hoàn thành bằng localStorage, có phiên bản dữ liệu.
- Tổ chức nội dung Blockchain từ tài liệu Ju cung cấp.
- Chuẩn bị Git/GitHub và deploy public, dự kiến Vercel nhưng chưa chốt cấu hình.
- Hình tự vẽ, giao diện song ngữ ở giai đoạn phù hợp.

Kế hoạch cấu trúc ban đầu từng đề cập các route /results, /mistakes, lib/storage.ts và lib/quiz.ts. Hiện kết quả đang render trực tiếp trong QuizRunner; không mặc định những route/file dự kiến đó đã tồn tại.

Chưa có backend, database, auth, Supabase hoặc lưu tiến trình đang làm theo trạng thái đã biết. Tải lại trang sẽ reset lượt quiz. Chưa tự triển khai các phần này trong task UI.

## 12. Kiểm tra và quản lý tiến độ

- Đọc scripts trong package.json để chọn lệnh lint/build phù hợp; không giả định next lint tồn tại.
- Chạy kiểm tra vừa đủ cho thay đổi. Với UI, ưu tiên xem giao diện thật nếu môi trường hỗ trợ; nếu không, nhờ Ju gửi ảnh.
- Regression quan trọng: chưa chọn không chấm được; sau chấm khóa đáp án; câu mới không giữ lựa chọn cũ; câu cuối được tính điểm; kết quả chính xác; làm lại xóa điểm cũ.
- Khi sửa giao diện, kiểm tra câu ngắn và câu dài (ví dụ câu 21), cả trước/sau chấm.
- Không tạo test chỉ sao chép implementation; thêm test khi bảo vệ được rủi ro thực sự.
- Ghi tiến độ ngắn vào docs/progress.md khi bắt đầu dùng Codex: task, file đã sửa, kiểm tra đã chạy, trạng thái chờ Ju/đã xác nhận, bước kế tiếp. Tạo file nếu chưa có; không ghi đè tài liệu đang có.
- Dùng git diff để review phạm vi thay đổi. Nếu Ju yêu cầu commit, mỗi task hoàn thành có thể là một commit nhỏ với mô tả rõ mục tiêu.

## 13. Cách bắt đầu phiên Codex đầu tiên

Đọc tài liệu này và repository, không chỉ dựa vào bản bàn giao. Báo ngắn:

1. Dự án thật hiện có gì và khác tài liệu ở đâu.
2. Những file chi phối giao diện hiện tại.
3. Một hướng giao diện cute phù hợp, giữ bố cục quiz gọn.
4. Task UI đầu tiên đề xuất, phạm vi file và cách kiểm tra.

Trong lượt tiếp nhận đầu tiên, chưa thay đổi giao diện hàng loạt. Đợi Ju duyệt hướng thiết kế/task đầu tiên. Sau đó trực tiếp thực hiện task đã thống nhất và tuân thủ chu kỳ giải thích → kiểm tra → phản hồi ở mục 2.
