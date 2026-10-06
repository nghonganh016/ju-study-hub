# Tiến độ Ju Study Hub

## 05/10/2026: Khảo sát ban đầu và đề xuất giao diện

- Trạng thái: Đã khảo sát code; chờ Ju duyệt hướng thiết kế và task đầu tiên. Chưa sửa giao diện.
- File thay đổi trong lượt này: Chỉ tạo `docs/progress.md` để ghi nhận khảo sát và bàn giao.
- Đã đọc: `AGENTS.md`, cấu hình npm và lockfile, cấu hình Next.js/TypeScript/ESLint, toàn bộ trang và component hiện có, kiểu dữ liệu và dữ liệu chapter.
- Git trước khi làm: `AGENTS.md` và `app/page.tsx` đã thay đổi; các thư mục `app/quiz`, `app/subjects`, `components`, `data`, `types` có file chưa được Git theo dõi. Giữ nguyên các thay đổi này. `git remote -v` không trả về remote.

### Đối chiếu với bàn giao

- Cấu trúc trang, luồng chọn/chấm/chuyển câu/xem kết quả/làm lại và bố cục quiz gọn khớp mô tả khi đọc code.
- Bộ dữ liệu giữ `chapter-1`, `revision: 2`, gồm 25 câu. Câu 4 vẫn có lựa chọn D “Thay đổi balance của Bob”; chưa sửa nội dung học. Giải thích câu 21 và 24 khớp bàn giao.
- Phần bổ sung quan sát được: `app/layout.tsx` còn tên tab “Create Next App”, mô tả mặc định và `lang="en"`. Có nạp Geist nhưng `app/globals.css` đặt phông chữ nội dung là Arial. CSS nền toàn cục có chế độ tối, trong khi các trang đang đặt nền hồng sáng riêng.
- `public` có các SVG mặc định của bộ khởi tạo, chưa có hình tự vẽ của Ju.
- Lockfile ghi Next.js 16.3.8, React 19.2.8, Tailwind CSS 4.3.3, TypeScript 5.9.3. Có lệnh `dev`, `build`, `start`, `lint`, chưa có lệnh kiểm thử tự động.
- Node trong môi trường lệnh của Codex là v24.19.0, khác v24.21.0 từng được ghi nhận. Không tìm thấy lệnh `npm` trong môi trường lệnh hiện tại; chưa kết luận npm trên máy Ju bị thiếu.

### Hướng thiết kế đề xuất, chưa thực hiện

- “Sổ ôn tập dâu sữa”: nền kem hồng `#FFF7F3`, khung trắng `#FFFFFF`, viền hồng `#F2CEDA`, chữ mận sẫm `#493440`, nút hồng đậm `#A93664`.
- Khung bo tròn, bóng nhẹ và chấm trang trí nhỏ trên nền ngoài. Giữ cỡ chữ, chiều rộng và khoảng cách dọc hiện tại; trang trí không chiếm thêm hàng nội dung.
- Task UI đầu tiên: Áp dụng nền, khung, màu chữ, viền lựa chọn và nút cho màn hình làm quiz. Dự kiến sửa `app/quiz/blockchain/[chapterId]/page.tsx`, `components/QuizRunner.tsx`, `components/QuizQuestion.tsx`, rồi cập nhật tài liệu tiến độ.
- Giữ nguyên state, props, sự kiện, radio/fieldset/legend, nội dung câu hỏi và cách tính điểm. Giữ cuộn an toàn ở màn hình hẹp; không che nội dung hoặc giảm cỡ chữ để ép vừa màn hình. Làm rõ viền focus khi dùng bàn phím.
- Chưa làm riêng màn hình kết quả, đồng bộ các trang khác hoặc bổ sung chức năng. Màu riêng cho từng trạng thái đáp án có thể là task tiếp theo sau phản hồi của Ju.

### Kiểm tra và giới hạn

- Đã kiểm tra bằng đọc code và lệnh: Cấu trúc dự án, Git, phiên bản lockfile, 25 ID câu hỏi không trùng, mọi `correctOptionId` thuộc lựa chọn của câu tương ứng.
- ESLint: Chạy trực tiếp bằng `node node_modules/eslint/bin/eslint.js .`, hoàn tất với mã thoát 0, không báo lỗi hoặc cảnh báo.
- Chưa chạy bản dựng, chưa mở giao diện trình duyệt, chưa thao tác hết 25 câu, chưa đối chiếu tính đúng đắn kiến thức với tài liệu giảng viên. Đọc logic không thay thế kiểm thử tương tác.
- Sau khi được duyệt và sửa UI: Kiểm tra câu ngắn và câu 21 trước/sau chấm; chưa chọn không chấm được, chấm xong khóa lựa chọn, câu mới reset lựa chọn; kiểm tra câu cuối, điểm và làm lại. Kiểm tra bàn phím và màn hình hẹp.
- Ju cần xác nhận sau task UI: Trên màn hình desktop đang dùng, đọc đủ câu hỏi và bốn lựa chọn không cần cuộn; phần giải thích và nút chuyển câu vẫn thuận tiện. Chưa có số đo vùng hiển thị thực tế của Ju.
- Bước kế tiếp: Chờ Ju duyệt hướng “sổ ôn tập dâu sữa” và phạm vi màn hình làm quiz; chỉ triển khai task đó khi được duyệt.

## 05/10/2026: Áp dụng giao diện sổ ôn tập dâu sữa cho quiz

- Trạng thái: Ju đã duyệt hướng và phạm vi. Đã triển khai, chờ Ju kiểm tra cảm nhận giao diện trên màn hình đang dùng.
- `app/quiz/blockchain/[chapterId]/page.tsx`: Nền kem hồng chấm nhỏ bằng CSS, khung trắng có bóng nhẹ và viền `ring-1`, chữ mận sẫm, liên kết quay lại có viền khi dùng bàn phím. Viền ring không thu hẹp vùng nội dung.
- `components/QuizRunner.tsx`: Nền hồng nhạt bo tròn cho số câu, màu điểm và nút xem kết quả theo bảng màu mới. Không thêm khoảng cách dọc.
- `components/QuizQuestion.tsx`: Viền hồng, nền trắng hồng cho lựa chọn, màu chữ A/B/C/D, nút hồng đậm có bóng và nền kem cho giải thích. `focus-visible` làm rõ lựa chọn/nút khi dùng bàn phím; lựa chọn đã khóa không còn hiệu ứng rê chuột như khi có thể bấm.
- Chỉ thay `className` và chuẩn hóa dòng cuối file. Giữ nguyên state, props, sự kiện, nội dung học, điểm, cỡ chữ, chiều rộng khung và khoảng cách dọc. Không sửa `QuizResult.tsx`, không thêm thư viện.
- Đã review thay đổi với `git diff --no-index` so với bản sao trước khi sửa vì ba file này chưa được Git theo dõi.

### Kiểm tra đã chạy

- `node node_modules/eslint/bin/eslint.js .`: Thành công, mã thoát 0, không báo lỗi/cảnh báo.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: Thành công, mã thoát 0.
- Kiểm tra trực tiếp trên trình duyệt: Trước chọn thì nút chấm bị vô hiệu hóa; sau chấm khóa lựa chọn, có phản hồi đúng/sai; chuyển câu reset lựa chọn và nút chấm.
- Hoàn thành một lượt 25 câu, chọn B cho mọi câu: Kết quả 13/25, 52%, khớp số đáp án B trong dữ liệu. Câu cuối chưa chấm thì chưa có nút xem kết quả. Làm lại đưa về câu 1, điểm 0/25, không chọn radio nào và nút chấm bị vô hiệu hóa.
- Desktop 1366 × 768: Đã xem câu 1 và câu 21 trước/sau chấm. Câu 21 sau chấm có đáy khung khoảng 726 px, toàn bộ câu hỏi, lựa chọn, giải thích và nút tiếp theo vừa trong vùng hiển thị, không cần cuộn.
- Màn hình hẹp 390 × 844: Đã xem câu 21 sau chấm, cuộn đến hết giải thích và nút tiếp theo; không tràn ngang. Đã trả kích thước trình duyệt về mặc định sau kiểm tra.
- Bàn phím: Phím Space chọn được radio và viền focus quanh lựa chọn hiển thị kiểu solid.

### Giới hạn và cách Ju kiểm tra

- Turbopack báo lỗi tạo tiến trình Node: `Access is denied (os error 5)`. Chạy thử bằng `node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 3000` thành công. Không đổi lệnh npm hoặc cấu hình dự án; chưa khắc phục riêng lỗi Turbopack và chưa chạy bản dựng production.
- Next.js tự thêm một khối hướng dẫn vào `AGENTS.md` khi khởi động. Đã bỏ riêng khối tự sinh đó để giữ nội dung bàn giao của Ju.
- Chưa kiểm thử mọi tổ hợp đáp án, mọi kích thước hoặc mức thu phóng. Kiểm tra điểm không phải đối chiếu tính đúng đắn kiến thức Blockchain.
- Ju kiểm tra: (1) Mở `/quiz/blockchain/chapter-1` để xem nền, khung và chữ; (2) chấm câu 1, chuyển câu để xác nhận thao tác quen thuộc; (3) kiểm tra câu 21 trước/sau chấm trên desktop thường dùng và phản hồi về độ dễ đọc.
- Bước kế tiếp dự kiến: Sau phản hồi của Ju, cân nhắc task làm rõ trạng thái đang chọn, đúng và sai của đáp án. Chưa thực hiện.

## 05/10/2026: Bảng chọn câu hỏi và lưu trạng thái từng câu

- Bối cảnh: Ju đã kiểm tra giao diện dâu sữa, muốn chuyển sang phong cách trò chơi và bảng chọn 25 câu. Ju duyệt thực hiện riêng bước 1 là bảng chọn và logic điều hướng. Chưa làm giao diện cuốn sổ trò chơi.
- Trạng thái: Đã triển khai và kiểm tra; chờ Ju phản hồi.
- `components/QuizRunner.tsx`: Lưu theo ID câu hỏi cả `optionId` và `isSubmitted`. Chọn đáp án chỉ lưu tạm; chấm mới tính điểm. Cập nhật state có điều kiện chặn sửa/chấm lại câu đã chấm. Điểm và số câu đã chấm được tính từ dữ liệu này, không lưu điểm riêng. Làm lại xóa cả lựa chọn tạm và đáp án đã chấm.
- `components/QuizQuestion.tsx`: Nhận lựa chọn và trạng thái chấm qua props từ QuizRunner, gửi sự kiện chọn/chấm lên; bỏ state cục bộ và nút Câu tiếp theo. Khi quay lại vẫn thấy lựa chọn cũ, giải thích và trạng thái khóa đúng.
- `components/QuizNavigation.tsx` (mới): Lưới 5 cột, số lượng ô theo số câu trong dữ liệu (hiện 25). Ký hiệu ○ chưa chọn, • đã chọn chưa chấm, ✓ đúng, × sai; nhãn đọc được và màu tương ứng. Viền riêng và `aria-current` đánh dấu câu đang xem. Dùng nút chuẩn, hỗ trợ bàn phím.
- `app/quiz/blockchain/[chapterId]/page.tsx`: Mở rộng khung tối đa 1080 px ở desktop để giữ vùng câu hỏi rộng khi thêm cột điều hướng 240 px. Màn hình hẹp xếp bảng chọn dưới câu hỏi, cho phép cuộn.
- Xem kết quả luôn có trong bảng bên phải, chỉ mở khi chấm đủ mọi câu; không phụ thuộc đang xem câu nào. Dòng Đã chấm x/25 giải thích tiến độ.
- Không sửa dữ liệu học, không thêm thư viện, không đổi chế độ phản hồi từng câu. Nội dung bàn giao trong AGENTS.md mô tả luồng tuần tự cũ; mục tiến độ này ghi nhận luồng mới đã được Ju yêu cầu.

### Đã kiểm tra

- ESLint: `node node_modules/eslint/bin/eslint.js .`, mã thoát 0.
- TypeScript: `node node_modules/typescript/bin/tsc --noEmit --incremental false`, mã thoát 0.
- Trình duyệt với máy chủ Webpack đang chạy: Chọn B câu 1 chưa chấm, nhảy câu 25 và chấm, quay lại câu 1 vẫn giữ B và chưa khóa; đổi sang A rồi chấm, quay đi/quay lại vẫn giữ A, báo sai và khóa lựa chọn. Câu 25 đã chấm vẫn giữ B và giải thích đúng.
- Chấm riêng câu 25 không mở kết quả. Chọn đủ 25 câu nhưng còn một câu chưa chấm vẫn không mở kết quả. Chấm đủ rồi quay về câu 1 vẫn mở được kết quả.
- Làm bài không theo thứ tự: Câu 1 chọn A, các câu còn lại chọn B. Kết quả 12/25, 48%, khớp tính độc lập từ bộ dữ liệu. Làm lại đưa về câu 1, điểm 0, cả 25 ô chưa chọn, không radio nào được chọn và nút chấm bị vô hiệu hóa.
- Desktop 1366 × 768: Đã xem câu 1 và câu 21 trước/sau chấm cùng bảng điều hướng; nội dung vừa màn hình, không cần cuộn. Phím Enter kích hoạt được nút chọn câu 21.
- Màn hình 390 × 844: Chuyển câu bằng bảng, chấm và quay lại giữ đúng trạng thái; không tràn ngang, cuộn được tới bảng chọn. Bảng nằm dưới câu hỏi nên cần cuộn khi chuyển câu trên màn hình hẹp.
- Review diff với bản sao trước khi sửa cho các file chưa được Git theo dõi; kiểm tra khoảng trắng bằng git diff --check.

### Ju kiểm tra và giới hạn

- Chọn đáp án nhưng chưa chấm ở câu 1, sang câu 5 rồi quay lại: lựa chọn phải còn nguyên, điểm chưa tăng.
- Chấm câu 1 rồi quay lại sau khi xem câu khác: giữ nguyên lựa chọn và giải thích, không sửa hoặc chấm lại được.
- Nhảy câu 25: chưa chấm đủ thì chưa xem kết quả được. Kiểm tra câu 21 và bảng chọn trên màn hình desktop thường dùng.
- Chỉ lưu trong lượt đang mở; tải lại trang vẫn xóa lượt. Chưa chạy production build, chưa kiểm thử mọi kích thước/mức thu phóng hoặc mọi tổ hợp đáp án.
- Bước kế tiếp dự kiến: Sau phản hồi của Ju về điều hướng, thực hiện riêng giao diện cuốn sổ trò chơi theo hướng đã thảo luận. Chưa triển khai trong lượt này.

## 05/10/2026: Giao diện cuốn sổ nhiệm vụ

- Xác nhận của Ju: Bảng chọn câu và luồng điều hướng đã kiểm tra ổn. Ju yêu cầu thực hiện giao diện cuốn sổ trò chơi.
- Trạng thái: Đã triển khai, kiểm tra trên trình duyệt; chờ Ju đánh giá giao diện.
- `components/QuizNotebook.module.css` (mới): CSS chỉ dành cho quiz. Bảng màu kem, xanh tím và hồng phấn theo ảnh tham khảo; bìa sổ, mép giấy nhiều lớp, nếp gấp và gáy sổ, băng dính, dấu trang, nút có bóng và các ô câu hỏi. Trang trí dùng CSS, không dùng ảnh bên ngoài hoặc thêm thư viện.
- `app/quiz/blockchain/[chapterId]/page.tsx`: Gắn nền và khung sổ; thêm nhãn Sổ nhiệm vụ của Ju. Khung rộng tối đa 1120 px ở desktop để dành khoảng gáy 48 px mà không thu hẹp vùng câu hỏi.
- `components/QuizRunner.tsx`: Dùng định dạng hai trang sổ, cột câu hỏi và bảng chọn bên phải; màu tiến độ và nút kết quả đồng bộ.
- `components/QuizQuestion.tsx`: Lựa chọn như thẻ giấy, lựa chọn đang chọn có nền tím nhạt, giải thích như giấy ghi chú; giữ nguyên cỡ chữ câu hỏi/đáp án và khoảng cách dọc chính.
- `components/QuizNavigation.tsx`: Ô số kiểu trò chơi với bóng nhẹ, giữ nguyên ký hiệu và nhãn trạng thái; viền câu đang xem đổi sang tím đậm và cập nhật chú thích tương ứng.
- `components/QuizResult.tsx`: Đồng bộ màu và nút với cuốn sổ, nội dung kết quả như một tờ ghi nhận hoàn thành.
- Không thay state, props, sự kiện, công thức điểm, điều kiện chấm hoặc điều kiện xem kết quả. Không sửa dữ liệu học. Các trang khác giữ nguyên.

### Đã kiểm tra

- ESLint và TypeScript: `node node_modules/eslint/bin/eslint.js .` và `node node_modules/typescript/bin/tsc --noEmit --incremental false` đều mã thoát 0.
- So sánh phần tính toán và xử lý sự kiện của QuizRunner, QuizQuestion, QuizResult với bản sao trước sửa bằng bộ phân tích TypeScript: Không thay đổi. Review diff trang quiz và bảng điều hướng.
- Trình duyệt desktop 1366 × 768: Đã xem câu 1 và câu 21 trước/sau chấm. Câu 21 sau chấm có đáy khung khoảng 675 px; câu hỏi, lựa chọn, giải thích và bảng chọn đều vừa màn hình, không tràn ngang/dọc.
- Điện thoại 390 × 844: Cuốn sổ chuyển thành một cột; đã cuộn và chuyển câu bằng bảng, quay lại giữ lựa chọn/giải thích. Chiều rộng nội dung bằng vùng hiển thị 375 px sau khi trừ thanh cuộn, không tràn ngang.
- Bàn phím: Space chọn được đáp án, viền focus rõ quanh thẻ. Chọn chưa chấm rồi chuyển đi/quay lại vẫn giữ lựa chọn và chưa khóa.
- Một lượt 25 câu chọn B: Kết quả 13/25, 52%, khớp dữ liệu đã xác minh trước đó. Nút kết quả vẫn khóa trước khi chấm câu cuối cùng còn lại. Làm lại đưa về câu 1, cả 25 ô chưa chọn, không radio nào được chọn.
- Đã xem màn hình kết quả thực tế và trả kích thước trình duyệt về mặc định; bản xem thử ở câu đầu của lượt mới.

### Ju kiểm tra và giới hạn

- Mở quiz trên desktop thường dùng để đánh giá bìa, giấy, gáy sổ, bảng chọn và màu chữ.
- Xem câu 21 trước/sau chấm: Nội dung phải đủ chỗ, dễ đọc. Chuyển đi/quay lại để xác nhận cảm giác thao tác.
- Thu hẹp cửa sổ để xem cách cuốn sổ xếp thành một cột và cuộn tới bảng chọn.
- Chưa thêm tranh nhân vật hoặc hình tự vẽ. Chưa chạy production build, chưa kiểm tra mọi kích thước/mức thu phóng. Lượt vẫn chỉ lưu trong bộ nhớ, tải lại trang sẽ reset.
- Bước kế tiếp: Chờ Ju phản hồi về giao diện cuốn sổ; chỉ tinh chỉnh phần Ju yêu cầu, chưa tự đồng bộ các trang khác.

## 06/10/2026: Nunito, Baloo 2 và góc bo mềm hơn

- Xác nhận của Ju: Màu giấy, màu chữ, cảm giác cuốn sổ, độ dễ đọc và thao tác đã ổn. Yêu cầu đổi phông toàn website và tăng bo góc, giữ thông số bố cục/màu/khoảng cách và logic.
- Trạng thái: Đã triển khai và kiểm tra; chờ Ju đánh giá.
- `app/layout.tsx`: Thay Geist/Geist Mono bằng Nunito và Baloo_2 từ `next/font/google`. Cả hai dùng `weight: "variable"`, `subsets: ["latin", "vietnamese"]`, `display: "swap"`, gắn biến phông lên phần tử html. Đổi `lang` thành `vi`. Không đổi metadata.
- `app/globals.css`: Nunito là phông mặc định của body và `font-sans`. Các h1–h6 tự dùng Baloo 2. Khai báo `--font-heading` trong Tailwind để dùng lại bằng class `font-heading` cho nhãn/nút đặc biệt, không cần gắn class cho từng tiêu đề hoặc đoạn văn.
- `components/QuizNotebook.module.css`: Nhãn sổ, nhãn số câu, nút chính và điểm nổi bật dùng Baloo 2. Câu hỏi, đáp án, mô tả và các ô điều hướng tiếp tục kế thừa Nunito. Bo góc ô đáp án và nút chính 16 px, ô số câu 12 px. Không thay font-size, line-height, padding, margin, gap, chiều rộng, màu hoặc sự kiện.
- `components/SubjectCard.tsx`, `app/subjects/blockchain/page.tsx`, `app/subjects/blockchain/[chapterId]/page.tsx`: Ba liên kết dạng nút chính dùng `font-heading` và bo 16 px; liên kết điều hướng bình thường vẫn dùng Nunito.

### Cách duy trì

- Tiêu đề mới: Dùng h1–h6 đúng vai trò, Baloo 2 được áp dụng tự động.
- Nội dung mới: Không cần khai báo phông, tự dùng Nunito.
- Nhãn nổi bật ngoài tiêu đề: Ví dụ `<span className="font-heading">Nhiệm vụ hôm nay</span>`. Trong CSS module có thể dùng `font-family: var(--font-baloo), sans-serif`.
- `next/font/google` tải phông khi chạy phát triển/tạo bản dựng và website phục vụ tệp phông từ chính nó. Máy tạo bản dựng cần tải được Google Fonts; trình duyệt người học không phải gọi Google để lấy phông.
- `subsets` chọn các bộ ký tự cần nạp trước; bộ Vietnamese có chữ tiếng Việt và dấu thanh. `display: "swap"` cho phép đọc bằng phông thay thế trong khi phông chính đang tải.

### Đã kiểm tra

- ESLint hoàn tất mã thoát 0. TypeScript hoàn tất mã thoát 0 sau khi máy chủ đã khởi động ổn định; lần chạy cùng lúc khởi động lại gặp file kiểu sinh tự động đang được tạo lại, không phải lỗi code.
- Đã xử lý lỗi mạng sandbox khiến Next.js dùng phông thay thế bằng cách chạy lại máy chủ Webpack với quyền tải phông. Xác nhận CSS được tạo có Nunito và Baloo 2 thật cùng các tệp woff2 cục bộ, không phải chỉ phông fallback.
- Kiểm tra phạm vi Unicode trong CSS sinh ra: Bao gồm ă â ê ô ơ ư đ, chữ hoa tương ứng, các nguyên âm có dấu tiếng Việt và năm dấu thanh kết hợp. Các tệp phông được tham chiếu đều tồn tại.
- Trình duyệt: Xác nhận font-family của tiêu đề và nút chính là Baloo 2; body, câu hỏi, đáp án và ô điều hướng là Nunito. Kiểm tra thêm tiêu đề và nút Vào môn học trên trang chủ.
- Đã xem dấu tiếng Việt thực tế trên trang chủ, câu 1 và câu 21. Câu 21 trước/sau chấm cùng bảng chọn vừa vùng 1366 × 768, không cuộn. Màn hình 390 × 844 không tràn ngang.
- Đã chấm câu 21: Đáp án B, trạng thái khóa và điểm 1/25 đúng. Logic không thay đổi. Trả bản xem thử về câu đầu và kích thước trình duyệt mặc định.
- Review diff: Chỉ cấu hình phông, ngôn ngữ tài liệu, phông cho nút/liên kết và bán kính bo; không sửa dữ liệu học hoặc luồng quiz. Đã bỏ riêng khối AGENTS.md do Next.js tự thêm lúc khởi động và chạy git diff --check.

### Ju kiểm tra và giới hạn

- Xem tiêu đề, chữ có dấu và nút trên trang chủ/quiz; so sánh độ mềm và dễ đọc của hai phông.
- Xem câu 21 trước/sau chấm trên desktop thường dùng, thử chuyển câu và quay lại.
- Kiểm tra góc bo của nút, đáp án và ô số có phù hợp không.
- Không đổi thông số bố cục; độ rộng ký tự của phông mới khác phông cũ nên vị trí xuống dòng có thể thay đổi tự nhiên. Chưa chạy production build, chưa kiểm thử mọi mức thu phóng và mọi thiết bị.
- Bước kế tiếp: Chờ phản hồi của Ju, chưa tự triển khai hạng mục mới.

## 06/10/2026: Xóa nhãn trên trang quiz

- Ju xác nhận phông chữ và bo góc đã ổn; yêu cầu xóa nhãn “Sổ nhiệm vụ của Ju”.
- Đã xóa phần tử nhãn trong `app/quiz/blockchain/[chapterId]/page.tsx` và các định dạng `bookLabel` không còn dùng trong `components/QuizNotebook.module.css`. Không sửa logic quiz.
- Đã kiểm tra trên trình duyệt: Nhãn không còn trong trang; tiêu đề, liên kết quay lại và bảng câu hỏi vẫn có. Tìm kiếm xác nhận không còn nhãn/class trong app và components; git diff --check không báo lỗi khoảng trắng. Không chạy lại bộ kiểm tra logic cho thay đổi xóa nhãn.
- Ju kiểm tra: Mở trang quiz và xem phần đầu trang, nhãn góc phải đã biến mất.
- Trạng thái: Hoàn tất, chờ Ju phản hồi; chưa thực hiện hạng mục tiếp theo.

## 06/10/2026: Scrapbook, bước 1: Chiều sâu nền và cuốn sổ

- Yêu cầu mới: Phong cách nhật ký học tập minh họa pastel, scrapbook và sổ trò chơi. Làm từng bước, bắt đầu nền/bìa/giấy; giữ cấu trúc, logic và khả năng đọc gọn.
- Khảo sát: Nền giấy cũ gần như phẳng, bóng bìa đều; khối điều hướng viền kín và các ô đồng nhất vẫn gợi bảng điều khiển. Kế hoạch chia ba bước: (1) nền và chiều sâu sổ, (2) nhãn câu/vùng câu hỏi/thẻ đáp án, (3) trang mục lục/bảng câu hỏi. Chỉ bước 1 được thực hiện trong lượt này.
- File code duy nhất thay đổi: `components/QuizNotebook.module.css`; thêm bản ghi tiến độ này. Không sửa TSX, dữ liệu học hoặc logic.
- `.desk`: Lớp chuyển sắc mô phỏng ánh sáng từ trên trái, chấm nền nhạt hơn, xanh mây và tím dịu. Hai phần tử trang trí CSS giả lập mẩu giấy kẹp sau sổ và bút chì nhỏ, chỉ xuất hiện từ 1280 px trở lên.
- `.book`: Giấy `#FFF8E9`, vân sợi giấy rất nhạt bằng hai lớp repeating-linear-gradient, sắc kem ở mép. Nhiều box-shadow tạo các lớp giấy, bìa và bóng tiếp xúc/bóng lan lệch về dưới phải. Góc giấy hơi bất đối xứng, giữ nguyên hộp bố cục.
- `.book::before`: Băng dính hồng mờ có mép không đều bằng clip-path. `.book::after`: Nếp gấp giữa hai trang rộng hơn, có vùng tối/sáng nhẹ. `.spread::before`: Chỉnh ánh sáng móc gáy sổ hiện có.
- Phần trang trí dùng pointer-events:none, xếp sau nội dung và không tham gia bố cục. Bút chì được giới hạn vị trí theo chiều cao nền để không tự kéo dài trang ngắn. Không thêm ảnh, SVG, thư viện hoặc chuyển động trong bước nền này.

### Kiểm tra

- Trình duyệt đã biên dịch và hiển thị CSS mới. Xem câu 1 và câu 21 trước/sau chấm ở 1366 × 768: Trang vẫn cao 768 px và rộng 1366 px, không cần cuộn; giải thích và bảng chọn còn đầy đủ.
- 390 × 844: Không tràn ngang (clientWidth = scrollWidth = 375 px, phần còn lại là thanh cuộn); trang trí bên ngoài được bỏ ở kích thước này. Đã cuộn/chuyển câu và quay lại câu 21, giữ đáp án B và trạng thái khóa sau chấm.
- Phân tích CSS bằng PostCSS và so sánh với bản sao trước sửa: Các thông số kích thước nội dung, padding, margin, gap, cột, cỡ chữ, phông và chiều cao dòng giữ nguyên. Git diff --check không báo lỗi khoảng trắng.
- Chưa chạy production build hoặc kiểm thử mọi kích thước. Không chạy lại toàn bộ 25 câu vì lần này chỉ sửa lớp nền và trang trí, không thay logic hoặc vùng điều khiển.

### Ju kiểm tra và bước tiếp theo

- Xem mép bìa, bóng sổ và vân giấy trên desktop; kiểm tra vân giấy có đủ nhẹ để đọc lâu không.
- Xem câu 21 sau chấm và thu hẹp cửa sổ: Nội dung vẫn dễ đọc, cuộn an toàn.
- Trạng thái: Hoàn thành bước 1, chờ Ju phản hồi. Nhãn số câu, thẻ đáp án và trang mục lục vẫn giữ thiết kế trước; chưa xử lý các bước 2–3.


## 06/10/2026: Session 3 và bảng chọn phân trang

- Yêu cầu: Thêm 151 câu Session 3; chia bảng chọn thành nhóm 25 câu; xem tiến độ trước khi hoàn thành; giữ giao diện quyển vở.
- Dữ liệu: Thêm data/blockchain/session-3.ts với 151 câu, 604 lựa chọn, 151 đáp án đúng từ tệp Ju cung cấp. Tiêu đề tệp nguồn ghi 80 nhưng số câu và bảng đáp án thực tế là 151. Bỏ dấu định dạng Markdown và chuyển ký hiệu toán sang văn bản dễ đọc. Không thay đổi đáp án; chưa kiểm chứng lại kiến thức với slide giảng viên. Nguồn không có giải thích từng câu nên explanation để trống.
- data/blockchain/index.ts: Danh sách dùng chung gồm chapter1 và session3. Ba trang app/subjects/blockchain/page.tsx, app/subjects/blockchain/[chapterId]/page.tsx, app/quiz/blockchain/[chapterId]/page.tsx dùng danh sách này để hiển thị và tìm bài theo ID. Trang quiz dùng key theo chapter.id để không mang đáp án sang bài khác.
- components/QuizNavigation.tsx: QUESTIONS_PER_PAGE = 25; tính số nhóm từ tổng câu; chỉ render phần slice của nhóm hiện tại. Hiển thị khoảng câu/tổng số và hai nút đổi nhóm; khóa nút ở hai đầu. Giữ trạng thái chưa chọn, nháp, đúng, sai và dấu câu hiện tại.
- components/QuizRunner.tsx: Giữ navigatorPage riêng với currentIndex. Đổi nhóm chỉ đổi navigatorPage. Tất cả thao tác chuyển câu gọi handleNavigate, đồng thời cập nhật currentIndex và nhóm Math.floor(index / QUESTIONS_PER_PAGE). Thêm Câu trước/Câu tiếp theo; giữ nguyên answers khi đổi nhóm, chuyển câu hoặc xem tiến độ. Làm lại đặt câu/nhóm về đầu và xóa đáp án.
- components/QuizResult.tsx: Xem tiến độ bất cứ lúc nào, gồm số chấm, thanh tiến độ, số đúng/sai/chưa chấm và tỉ lệ đúng trên câu đã chấm. Khi chưa chấm không hiển thị 0/0. Có Tiếp tục làm bài; khi hoàn thành có Xem lại câu hỏi và Làm lại bài.
- components/QuizQuestion.tsx: Chỉ render đoạn giải thích khi dữ liệu có nội dung, tránh khoảng trống ở Session 3.
- components/QuizNotebook.module.css: Giữ màu, phông, trang trí, chiều rộng và bố cục quyển vở. Thêm nút đổi nhóm nhỏ, thanh tiến độ và lưới cố định 5 hàng 44 px để nhóm cuối một câu không làm panel co lại. Không dùng cắt nội dung để ép vừa màn hình.

### Kiểm tra đã thực hiện

- Kiểm tra dữ liệu khi nhập: 151 số thứ tự liên tục, bốn lựa chọn a/b/c/d mỗi câu, đủ 151 đáp án khớp bảng nguồn.
- ESLint toàn dự án: node node_modules/eslint/bin/eslint.js ., mã thoát 0.
- TypeScript: node node_modules/typescript/bin/tsc --noEmit, mã thoát 0.
- Trình duyệt 1366 × 768: Đi qua và chấm cả 151 câu Session 3 và 25 câu cũ. Đo kích thước sau chấm từng câu: scrollHeight không vượt 768, scrollWidth không vượt 1366. Xem trực tiếp câu 1 Session 3 và câu 21 bài cũ sau chấm. Sidebar rộng 240 px, cao khoảng 520 px.
- Kiểm tra đủ bảy nhóm: 1–25, 26–50, 51–75, 76–100, 101–125, 126–150, 151; sáu nhóm đầu 25 ô và nhóm cuối một ô. Kiểm tra đổi câu qua các ranh giới tự đổi nhóm, bao gồm chiều ngược 26 về 25 và 151 về 150; nút đầu/cuối được khóa đúng.
- Kiểm tra đáp án nháp còn nguyên khi quay lại, câu đã chấm khóa lựa chọn, viền câu đang xem, hiển thị đúng/sai và điểm không mất khi chuyển nhóm. Chưa chọn thì nút chấm bị khóa.
- Kiểm tra tiến độ 0/151 và 2/151, gồm một câu đúng/một câu sai: 50%, còn 149 câu chưa chấm. Tiếp tục làm bài quay lại đúng câu và nhóm.
- Kết quả thử Session 3: Chọn B ở câu 1 và A ở các câu còn lại, kết quả 44/151, 29%, sai 107. Kết quả thử bài cũ: Chọn A cả 25 câu, kết quả 1/25, 4%, sai 24. Đây là lựa chọn kiểm thử giao diện, không phải điểm học của Ju.
- Làm lại cả hai bài: Xóa đáp án/điểm, về câu 1 và nhóm đầu. Đã kiểm tra liên kết danh sách → giới thiệu Session 3 → quiz.
- 390 × 844: Chiều rộng nội dung 375 px bằng chiều rộng khả dụng, không tràn ngang; đổi nhóm và chọn câu bằng Enter hoạt động. Cho phép cuộn dọc trên điện thoại. Trả trình duyệt về kích thước mặc định và Session 3 chưa làm.
- Chưa chạy bản dựng production; chưa kiểm tra mọi mức zoom/kích thước. Tiến độ vẫn chỉ giữ trong lượt đang mở, tải lại sẽ xóa như trước.

### Ju kiểm tra và bước tiếp theo

- Mở Session 3 từ danh sách môn Blockchain, thử câu 25 → Câu tiếp theo: bảng chuyển sang 26–50.
- Chọn đáp án, đổi nhóm rồi quay lại: đáp án nháp và câu đã chấm vẫn giữ.
- Chấm vài câu, bấm Xem tiến độ rồi Tiếp tục làm bài: số liệu đúng và quay lại câu đang học.
- Kiểm tra độ vừa màn hình thực tế của Ju, gồm câu 21 bài cũ và nhóm cuối chỉ có câu 151.
- Trạng thái: Đã triển khai và kiểm tra; chờ Ju phản hồi. Không triển khai tính năng tiếp theo.

## 06/10/2026: Giải thích và nguồn cho Session 3

- Ju xác nhận giao diện Session 3 và phân trang hoạt động tốt.
- data/blockchain/session-3.ts: Bổ sung giải thích ngắn bằng tiếng Việt và URL nguồn sơ cấp cho đủ 151 câu; revision tăng lên 2. Giữ nguyên ID, thứ tự, câu hỏi, lựa chọn và đáp án bằng kiểm tra đối chiếu với bản sao trước sửa.
- components/QuizQuestion.tsx: Hiển thị liên kết Nguồn tham khảo sau phần giải thích khi đã chấm, mở tab mới với noopener noreferrer. Không đổi state hoặc CSS.
- docs/session-3-sources.md: Ghi các nguồn NIST, Bitcoin, BIP, Ethereum, EIP và tài liệu chính thức liên quan; chỉ rõ các giả định tính toán và giới hạn xác minh lab.
- Đã kiểm tra ESLint, TypeScript và dữ liệu 151 câu. Kiểm tra trình duyệt tất cả 151 giải thích và nguồn ở 1366 × 768 không tràn; màn hình 390 × 844 không tràn ngang. Kiểm tra bổ sung câu 21 bài 25 câu: chấm B đúng, hiện giải thích/nguồn, tiến độ 1/25 và trang vẫn vừa 1366 × 768.
- Giới hạn: Không chạy lại mã lab gốc; không coi các quan sát trong đề là kết quả thực nghiệm đã tái hiện. Chưa chạy production build.
- Trạng thái: Hoàn thành. Trong lúc kiểm tra cuối, Ju gửi yêu cầu tiếp tục thêm Session 4; thực hiện theo yêu cầu mới, giữ nguyên giao diện.

## 06/10/2026: Session 4 với 181 câu và giải thích

- Yêu cầu: Thêm Session 4 theo cấu trúc hiện có, giữ giao diện; Ju bổ sung yêu cầu giải thích đáp án trong khi đang kiểm tra tích hợp.
- data/blockchain/session-4.ts: Thêm 181 câu, 724 lựa chọn và 181 đáp án đúng, giữ thứ tự A1–G30. Tiêu đề theo slide: Session 4: Bitcoin chuyên sâu và đồng thuận. Thêm 181 giải thích ngắn và nguồn ở đúng trang tài liệu. Chỉ bỏ định dạng Markdown/code và chuyển lũy thừa LaTeX thành văn bản, không đổi nội dung hay đáp án.
- data/blockchain/index.ts: Đăng ký session4 sau session3. Các trang danh sách, giới thiệu và quiz tự nhận bài mới; số câu lấy từ questions.length. Không sửa component, CSS, kiểu dữ liệu hoặc cách quản lý state cho Session 4.
- public/references/session-4-slides.pdf và session-4-worksheet.pdf: Sao chép nguyên vẹn hai tài liệu Ju cung cấp để liên kết nguồn trong website không phụ thuộc ổ đĩa cá nhân. Hash SHA-256 của bản sao khớp tệp gốc; HTTP trả 200, đúng application/pdf và byte tệp.
- docs/session-4-sources.md: Ghi nguồn, đối chiếu số câu với đề và các điểm cần lưu ý. Đề ghi 171 ở đầu nhưng thực tế đủ 181; phần lab có 30 câu. Câu 78/160 cần dấu ≤ thay vì < khi nói quy tắc Bitcoin; câu 123 thiếu điều kiện tổng trợ cấp cộng phí. Giải thích chỉ rõ, không âm thầm đổi bảng đáp án.
- Phân trang tiếp tục dùng QUESTIONS_PER_PAGE = 25. Math.ceil(181/25) tạo 8 nhóm; nhóm cuối bắt đầu ở 176, kết thúc ở min(200,181). handleNavigate đồng bộ nhóm từ chỉ số câu. Không thêm logic riêng cho 181.

### Kiểm tra đã thực hiện

- Kiểm tra dữ liệu trực tiếp bằng Node assert, đối chiếu lại độc lập với tệp đề: đủ 181 câu/ID duy nhất/724 lựa chọn/181 đáp án hợp lệ; thứ tự A1–G30, nội dung và đáp án khớp sau chuẩn hóa định dạng; mỗi câu có giải thích và nguồn. Đường dẫn PDF và số trang hợp lệ. Tính lại change, vsize, chênh lệch coinbase và target mẫu (19 chữ số 0 đầu; khoảng 2^78,296 lần thử).
- ESLint toàn dự án đã qua sau tích hợp; sau bổ sung giải thích, ESLint lại các file code liên quan và TypeScript --noEmit đều qua. Git diff --check không có lỗi khoảng trắng. Chưa chạy production build.
- Trình duyệt: Danh sách → giới thiệu → quiz Session 4 hiển thị đúng tiêu đề và 181 câu. Chấm cả 181 câu, mỗi câu đủ giải thích/link mở tab mới, khóa cả bốn lựa chọn, cập nhật trạng thái và số đã chấm. Đo từng câu sau chấm ở 1366 × 768: chiều cao tối đa 768, chiều rộng tối đa 1366. Xem ảnh trực tiếp câu 181.
- Đã kiểm tra tự đổi nhóm qua tất cả ranh giới khi chuyển câu, đặc biệt 25→26, 150→151, 175→176; nhóm cuối 176–181/181 có sáu nút. Nút nhóm trước bị khóa ở đầu, nhóm sau và câu tiếp theo bị khóa ở cuối. Chọn trực tiếp câu 181 sau khi quay lại nhóm trước giữ nguyên kết quả.
- Thử đáp án nháp qua nhóm khác rồi quay lại: vẫn chọn B, chưa chấm và chưa hiện giải thích. Chấm rồi xem tiến độ: 1/181, 100% trên câu đã chấm, còn 180. Tiếp tục quay lại đúng câu; làm lại về câu 1, xóa điểm.
- Chọn B ở câu 1 và A ở 180 câu còn lại để kiểm thử: 47/181 đúng (đối chiếu riêng từ dữ liệu), 134 sai, 26%; hiển thị hoàn thành và nút làm lại đúng. Đây là lượt kiểm thử, không phải điểm học của Ju.
- Kiểm tra lại Session 3: Hiển thị 151 câu, câu 1 chọn B đúng, giải thích và nguồn còn nguyên; 25→26 tự đổi nhóm; chọn câu 151, xem tiến độ vẫn giữ 1/151. Bài 25 câu: Hai nút nhóm đều khóa; câu 21 chấm B đúng, nguồn hiện và tiến độ 1/25.
- Lúc đầu máy chủ phát triển chặn /_next/hmr từ 127.0.0.1 khiến tab không phản hồi như mong đợi; chuyển sang localhost hoạt động. Không sửa allowedDevOrigins hoặc cấu hình máy chủ.
- Giới hạn: Các số liệu lịch sử lab dựa trên worksheet, chưa tải lại block hay chạy starter; không tuyên bố tái hiện thực nghiệm. Chưa kiểm tra mọi viewport/mức zoom; tải lại trang vẫn xóa tiến trình như trước.

### Ju kiểm tra

- Vào Session 4 từ danh sách Blockchain, chấm một câu: hiện giải thích cùng Nguồn tham khảo.
- Mở nguồn của một câu dẫn PDF: xem đúng tài liệu/trang; nguồn chính thức bên ngoài mở tab mới.
- Thử câu 175→176, chọn 181 và xem tiến độ: nhóm cuối và mẫu số 181 đúng.
- Xem riêng câu 78, 123, 160 để đọc các điểm chưa chính xác trong đề gốc.
- Trạng thái: Hoàn thành tích hợp và giải thích Session 4. Dừng để Ju kiểm tra, chưa thực hiện tính năng tiếp theo.

## 06/10/2026: Thêm Session 5 với 65 câu

- Yêu cầu: Nhập bộ 65 câu Session 5 do Ju cung cấp, giữ giao diện và kiến trúc hiện có.
- data/blockchain/session-5.ts: Thêm 65 câu theo đúng thứ tự, 260 lựa chọn, 65 đáp án, 15 giải thích có sẵn và đủ nhãn Lab Q1–Q6. Dòng mở đầu nguồn ghi 55 nhưng thực tế là 65, đúng phần chốt cuối tệp. Bỏ dấu code Markdown để dễ đọc; không sửa kiến thức hoặc tự bổ sung giải thích/URL. 50 câu còn lại để explanation rỗng vì nguồn không có.
- data/blockchain/index.ts: Thêm session5 vào danh sách chung; tự có thẻ bài, trang giới thiệu và quiz tại /quiz/blockchain/session-5. questions.length cung cấp số 65, phân trang dùng nguyên QUESTIONS_PER_PAGE = 25, gồm 1–25, 26–50, 51–65. Không sửa component hoặc CSS.
- Kiểm tra dữ liệu hai lượt, lượt sau đọc từng dòng nguồn độc lập: đủ 65 câu/260 lựa chọn, ID duy nhất, đáp án tồn tại, nội dung và giải thích khớp sau chuẩn hóa; nhãn Lab Q1–Q6 mỗi nhãn một lần.
- ESLint hai file dữ liệu liên quan và TypeScript --noEmit đều qua. git diff --check không báo lỗi khoảng trắng.
- Trình duyệt: Đi từ danh sách qua trang giới thiệu đến quiz; chấm cả 65 câu, số chấm/current state đúng; kiểm 25→26 và 50→51, nhóm cuối có 15 câu; nút nhóm sau khóa ở cuối. Tất cả câu sau chấm có chiều cao tối đa 768 và chiều rộng tối đa 1366 ở viewport 1366 × 768. Xem ảnh trực tiếp câu 65.
- Lượt thử chọn C câu 1, A các câu còn lại: 14/65 đúng, 51 sai, 22%, khớp phép tính độc lập từ dữ liệu. Làm lại về 0/65; lựa chọn nháp C vẫn giữ khi sang nhóm khác rồi quay lại; câu 1 chấm đúng và hiện giải thích gốc. Tiến độ 1/65, còn 64, tỷ lệ đúng 100% trên câu đã chấm. Trả viewport về mặc định và tải lại lượt mới.
- Giới hạn: Chỉ nhập nội dung nguồn, chưa kiểm chứng kiến thức với slide/tài liệu Ethereum hiện hành và chưa viết thêm giải thích còn thiếu. Chưa chạy production build hoặc kiểm tra mọi viewport.
- Ju kiểm tra: Mở Session 5 từ danh sách, chấm câu 1 để thấy giải thích có sẵn; thử 50→51 và chọn câu 65; xem tiến độ /65.
- Trạng thái: Hoàn thành, chờ Ju kiểm tra. Chưa thực hiện tính năng tiếp theo.

## 06/10/2026: Sửa tương tác khi mở web qua mạng nội bộ

- Ju xác nhận Session 5 ổn và đã tự thêm Session 6. Theo yêu cầu, không kiểm tra lại hoặc sửa hai session này.
- Nguyên nhân: Log máy chủ ghi chặn yêu cầu /_next/hmr từ 192.168.1.237 và 127.0.0.1. next.config.ts chưa cấu hình allowedDevOrigins; Next.js 16.3.8 chặn địa chỉ khác hostname khởi động đối với tài nguyên phát triển.
- next.config.ts: Dùng networkInterfaces từ node:os lấy các IPv4 không phải loopback của chính máy chạy server, thêm cùng 127.0.0.1 vào allowedDevOrigins. Danh sách được đọc lại khi khởi động để thích ứng việc đổi IP Wi-Fi/DHCP. Không cho phép wildcard toàn bộ nguồn, không sửa logic quiz, dữ liệu, firewall hay phiên bản thư viện.
- Máy chủ tự nạp lại sau thay đổi cấu hình. Kiểm tra bắt tay WebSocket qua IP LAN: Origin http://192.168.1.237:3000 và http://127.0.0.1:3000 nhận HTTP 101; Origin http://untrusted.example bị Unauthorized.
- Trình duyệt truy cập http://192.168.1.237:3000/quiz/blockchain/chapter-1: Chọn B, chấm đúng, chuyển câu 2, xem tiến độ 1/25 đều hoạt động; không có lỗi console. Chỉ dùng bài cũ để kiểm tra tương tác mạng, không kiểm lại Session 5/6.
- Giới hạn: Kiểm qua địa chỉ LAN trên máy hiện tại, chưa thao tác trên thiết bị vật lý thứ hai. Thay đổi áp dụng cho next dev. Nếu đổi địa chỉ mạng khi server đang chạy, cần khởi động lại để đọc IP mới.
- Ju kiểm tra: Trên máy khác cùng mạng, mở http://192.168.1.237:3000, tải lại trang rồi chọn/chấm/chuyển câu. Nếu terminal cũ chưa tự khởi động lại, dừng bằng Ctrl+C rồi chạy npm run dev.
- Trạng thái: Đã sửa và kiểm tra tương tác LAN, chờ Ju xác nhận từ thiết bị khác. Không thực hiện tính năng tiếp theo.

## 06/10/2026: Lưu tiến trình quiz bằng localStorage

- components/QuizRunner.tsx: Lưu riêng theo khóa ju-study-hub:quiz-progress:blockchain:<chapterId>. Dữ liệu phiên bản 1 gồm currentQuestionId và answers với optionId/isSubmitted. Giữ lựa chọn nháp, đáp án đã chấm và câu đang xem; nhóm điều hướng được tính lại từ câu đó. Không lưu màn hình tiến độ/kết quả.
- app/quiz/blockchain/[chapterId]/page.tsx: Truyền chapterId vào QuizRunner, giữ key theo chapter để mỗi bài có vòng đời trạng thái riêng. Không sửa giao diện, nội dung hoặc các component hiển thị.
- Chỉ đọc localStorage sau khi component được gắn vào trình duyệt. Cờ restoredKey chỉ bật cùng với dữ liệu đã khôi phục; hiệu ứng lưu bỏ qua trạng thái ban đầu. Hủy tác vụ khôi phục cũ khi React Strict Mode chạy lại hiệu ứng. Làm lại xóa đúng khóa, trở về câu 1/nhóm đầu, xóa đáp án; trạng thái rỗng không tạo lại bản lưu.
- Bỏ qua JSON hỏng, phiên bản không hỗ trợ, đáp án sai kiểu, ID câu/lựa chọn đã bị xóa. Câu đang xem không còn tồn tại thì về câu 1 nhưng vẫn giữ các đáp án hợp lệ. Bắt lỗi localStorage bị chặn hoặc đầy để quiz tiếp tục chạy trong bộ nhớ.
- Đã thử npm run lint và npm run build nhưng môi trường không có npm. Chạy trực tiếp node node_modules/eslint/bin/eslint.js: đạt. node node_modules/typescript/bin/tsc --noEmit --incremental false: đạt. Build Turbopack bị Access is denied khi tạo tiến trình xử lý CSS; node node_modules/next/dist/bin/next build --webpack chạy ngoài sandbox để tải Google Fonts: đạt đầy đủ, mã thoát 0. Không sửa cấu hình build hoặc phông chữ.
- Kiểm tra bằng Node trên mã QuizRunner thực tế đã biên dịch, với mô phỏng vòng đời hook: chặn ghi trước khôi phục kể cả khi lặp hiệu ứng Strict Mode, khôi phục câu 27/nhóm 2, đúng/sai/nháp, khóa đáp án, mở lại component, không lưu showProgress, làm lại không ảnh hưởng khóa khác, dữ liệu lỗi/cũ, storage bị chặn, render không có window. Tất cả đạt. Đây là kiểm tra mô phỏng, chưa kiểm tra trình duyệt thật hoặc đóng/mở trình duyệt trong lượt này.
- Ju kiểm tra: Chấm đúng/sai và chọn nháp rồi tải lại; chọn câu thuộc nhóm sau rồi rời trang/quay lại và đóng/mở trình duyệt; đổi session để kiểm tra độc lập; hoàn thành một bài rồi Làm lại bài và tải lại để thấy câu 1 trống, bài khác giữ nguyên.
- Giới hạn: Dữ liệu chỉ thuộc trình duyệt và địa chỉ web hiện tại; localhost và IP LAN có kho lưu riêng. Không đồng bộ giữa các tab/thiết bị. Nếu storage bị chặn thì chỉ giữ tiến trình trong bộ nhớ. ID còn nguyên nhưng nội dung đổi vẫn giữ lựa chọn, trạng thái đúng/sai tính theo dữ liệu hiện tại.
- Trạng thái: Hoàn thành triển khai, chờ Ju kiểm tra thủ công. Không chuyển sang tính năng tiếp theo.

## 07/10/2026: Hiển thị công thức quiz bằng KaTeX

- Thêm katex 0.16.47, react-katex 3.1.0 và @types/react-katex; package.json/package-lock.json cập nhật bằng npm. Dùng cùng dòng KaTeX mà react-katex phụ thuộc để CSS và bộ dựng công thức khớp nhau.
- components/MathText.tsx: Component nhận text, ưu tiên khối $$...$$, nhận $...$ trên một dòng với nội dung sát dấu mở/đóng và không có chữ số ngay sau dấu đóng. Dấu \$ là dấu đô la thường. Không tự suy luận lệnh LaTeX không có dấu bao. Công thức lỗi dùng renderError trả lại chuỗi gốc bằng React, không tự chèn HTML.
- components/QuizQuestion.tsx: Dùng MathText cho prompt, option.text và explanation. Giữ điều khiển radio/chấm điểm/nguồn. Thêm min-w-0 để nội dung toán không ép rộng phần chứa; đổi đoạn giải thích từ p sang div để chứa được công thức khối.
- app/layout.tsx: Nạp CSS KaTeX toàn cục. app/globals.css: Chỉ thêm CSS vùng công thức khối cuộn ngang, viền focus và văn bản lỗi. Dùng MathML mặc định của KaTeX phục vụ công cụ hỗ trợ đọc.
- app/dev/math/page.tsx: Trang mẫu chỉ mở khi NODE_ENV=development, có đủ năm ví dụ yêu cầu, dấu tiền tệ, lỗi công thức và công thức dài. Không thay câu hỏi thật. tests/math-text.test.mjs: Kiểm tra renderer React/KaTeX thật bằng Node và TypeScript sẵn có, không thêm bộ công cụ kiểm thử.
- Đã kiểm tra: npm run lint đạt; node --test tests/math-text.test.mjs đạt 4 nhóm, gồm năm mẫu toán, tiền tệ/dấu không đóng, công thức lỗi/HTML thô và toàn bộ văn bản quiz hiện có. npm run build gặp lỗi Turbopack tạo tiến trình CSS (Access is denied), npm run build -- --webpack đạt đầy đủ, mã thoát 0. npm được tải vào thư mục tạm vì môi trường không có lệnh npm sẵn; không đổi script build dự án.
- Trình duyệt: Xem trang mẫu thật, công thức phân số/tổng/xác suất/nhiều dòng hiển thị, lỗi giữ nguyên chữ và không có lỗi console. 390x844: clientWidth=scrollWidth=390, khối dài có scrollWidth=474 trong vùng rộng 333; xem ảnh không tràn trang. 1366x768: đo clientWidth=scrollWidth=1366, ảnh chụp desktop bị vùng đen của công cụ nên không coi là kiểm tra hình ảnh desktop hoàn chỉnh. Đã trả viewport về mặc định.
- Không sửa QuizRunner, QuizNavigation, QuizResult, types/quiz.ts hoặc dữ liệu Blockchain. Không kiểm tra lại toàn bộ thao tác lưu/khôi phục qua trình duyệt trong lượt này.
- Hướng dẫn nhập: Dùng String.raw với chuỗi template để giữ nguyên dấu gạch chéo LaTeX; nếu dùng chuỗi thường thì viết hai dấu gạch chéo. Dùng aligned trong $$ để xuống dòng trong công thức. Ví dụ O(\\log n) cũ không có dấu $ vẫn là chữ như trước.
- Tài liệu đối chiếu: https://github.com/talyssonoc/react-katex và https://katex.org/docs/options.html.
- Ju kiểm tra: Mở /dev/math khi chạy dev; thử công thức trong câu hỏi/lựa chọn/giải thích; tải lại một bài đang làm để xác nhận tiến trình còn nguyên. Công thức dài nên đặt trong $$ để có vùng cuộn riêng. Trình phân tích đơn giản không suy đoán mọi trường hợp tiền tệ, nên dùng \$ khi cần dấu đô la chắc chắn.
- Trạng thái: Hoàn thành, chờ Ju phản hồi. Không triển khai tính năng tiếp theo.
