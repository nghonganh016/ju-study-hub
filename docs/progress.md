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

## 09/10/2026: Dùng chung đường dẫn cho nhiều môn

- Hoàn thành yêu cầu chuyển kiến trúc: app/subjects/[subjectId]/page.tsx, app/subjects/[subjectId]/[chapterId]/page.tsx và app/quiz/[subjectId]/[chapterId]/page.tsx thay ba trang Blockchain cũ. Kiểm tra subjectId bằng isValidSubject trước khi tra cứu; chỉ tìm chapterId trong môn đã chọn. Bài rỗng hiển thị thông báo và liên kết về đúng môn.
- data/subjects.ts có sẵn của Ju được bổ sung description và satisfies Record<string, Subject>, dùng Chapter có sẵn; khóa đối tượng là ID môn. Giữ SubjectId suy ra từ keyof và Object.hasOwn để loại tên thuộc prototype. app/page.tsx hiển thị SubjectCard từ danh mục chung, giữ bố cục/màu sắc.
- QuizRunner nhận subjectId/chapterId/questions; key ghép môn và bài để trạng thái không lẫn nếu trùng chapterId giữa các môn. Không sửa QuizRunner, QuizQuestion, QuizNavigation, QuizResult, MathText, CSS, kiểu dữ liệu, dependency hoặc nội dung câu hỏi.
- data/database/index.ts và chapter-2.ts đã tồn tại, chưa được Git theo dõi khi bắt đầu. Giữ nguyên: chapter-2, Advanced Internals and Programmability, hiện 1 câu, mô tả This is a test chapter. data/subjects.ts cũng là tệp chưa được Git theo dõi trước task. Khi tự commit cần đưa các tệp này vào để triển khai không thiếu dữ liệu.
- Thêm tests/subjects.test.mjs: 5 nhóm kiểm tra danh mục, liên kết trang chủ/danh sách, mọi trang chi tiết/quiz và props, subject/chapter không hợp lệ, bài rỗng. Dùng Node/TypeScript/React đã có, không thêm thư viện. Viết docs/multi-subject-architecture.md bằng tiếng Việt với ví dụ từ mã thật, thuật ngữ, luồng dữ liệu và hướng dẫn thêm môn/bài.
- Đã chạy: node node_modules/next/dist/bin/next typegen; node node_modules/typescript/bin/tsc --noEmit --incremental false; node node_modules/eslint/bin/eslint.js .; node --test tests/*.test.mjs (9/9 đạt gồm 4 nhóm KaTeX cũ và 5 nhóm mới); node node_modules/next/dist/bin/next build --webpack (đạt, mã thoát 0). npm không có trên PATH, gọi trực tiếp các chương trình cài trong node_modules. Không sửa scripts.
- Lần typecheck/build đầu gặp .next/dev/types còn tham chiếu trang cũ. Xóa riêng thư mục kiểu tự sinh đó sau khi xác minh đường dẫn tuyệt đối nằm trong dự án; typecheck và build chạy lại đạt. Không thay tsconfig để bỏ qua lỗi.
- Kiểm tra HTTP bản production tại localhost:3107: 19 URL hợp lệ trả 200, gồm trang chủ, hai môn, Database chapter-2 và trang chi tiết/quiz của toàn bộ 7 bài Blockchain. 7 URL không hợp lệ trả 404, gồm subject không tồn tại, constructor, chapter thiếu và chapter thuộc môn khác.
- Trình duyệt trên cổng thử riêng: đi trang chủ → Database → chapter-2 → quiz; ban đầu chưa chọn không chấm được; chọn B/chấm đúng/khóa đáp án/tải lại giữ 1/1; kết quả 100%. Blockchain chapter-1: chấm B câu 1 đúng, chuyển câu 2 không giữ lựa chọn cũ; chọn nháp C và tải lại vẫn ở câu 2, giữ 1/25 và bản nháp. Quay lại Database vẫn giữ 1/1. Làm lại lượt thử Database và tải lại về 0/1; Blockchain vẫn giữ câu 2, điểm và bản nháp. Không tác động tiến trình ở localhost:3000 hoặc Vercel.
- Công cụ nhấp chuột có lúc chọn lệch sau khi cuộn ở khung trình duyệt hẹp; xác nhận trạng thái bằng DOM, chuyển sang thao tác bàn phím Enter/Space và kiểm tra được đúng điều khiển. Không sửa giao diện vì hiện tượng này.
- Khóa lưu ju-study-hub:quiz-progress:${subjectId}:${chapterId}, cấu trúc version: 1 và ID Blockchain giữ nguyên qua việc không sửa code lưu và dữ liệu gốc. Không thực hiện chuyển/xóa kho lưu người dùng. Chỉ dùng nút làm lại cho lượt Database do Codex vừa tạo trên cổng thử riêng.
- Giới hạn: Chưa kiểm tra trực tiếp bản đang triển khai trên Vercel hoặc tiến trình lịch sử trong trình duyệt của Ju; chưa kiểm thử toàn bộ đáp án của các bài hoặc mọi kích thước màn hình. Không commit, push hoặc triển khai.
- Ju kiểm tra: mở từng môn từ trang chủ; mở Database chapter-2; chấm/chọn nháp rồi tải lại; mở bài Blockchain đang lưu trước đây để xác nhận tiếp tục đúng câu. Các URL môn/bài không tồn tại phải hiện 404.
- Trạng thái: Hoàn thành refactor và kiểm tra, chờ Ju phản hồi. Bước tiếp theo dự kiến chỉ xử lý phản hồi của Ju, chưa triển khai task khác.

## 09/10/2026: Tích hợp Session 2 môn Database

- Thêm data/database/session-2.ts từ tệp C:/Users/User/Downloads/session-2.ts Ju cung cấp: 88 câu, gồm 25 câu gốc và 63 câu bổ sung, 352 lựa chọn. Giữ nguyên toàn bộ mảng nguồn gồm ID, câu hỏi, đáp án, giải thích và topic. Không kiểm chứng lại kiến thức với tài liệu giảng viên.
- Thêm đối tượng session2 kiểu Chapter, ID session-2. Đổi cấu trúc khi tạo đối tượng: question → prompt; chuỗi lựa chọn → {id, text}; correctAnswer 0/1/2/3 → a/b/c/d. topic vẫn có trong mảng nguồn, chưa hiển thị trên giao diện.
- data/database/index.ts: Nhập session2 và thêm sau chapter2. Giữ nguyên bài chapter-2 hiện có và tiến trình của bài đó. Trang danh sách/chi tiết/quiz dùng kiến trúc chung, không sửa component, CSS hoặc lưu tiến trình.
- Đường dẫn mới: /subjects/database/session-2 và /quiz/database/session-2. Bảng chọn câu hiện có chia thành 1–25, 26–50, 51–75 và 76–88.
- Đã kiểm tra: TypeScript --noEmit --incremental false đạt; ESLint hai tệp dữ liệu đạt; node --test tests/*.test.mjs đạt 9/9, gồm kiểm tra trang/props/liên kết cho bài mới. Kiểm tra độc lập dữ liệu đã chuyển đổi so với JSON nguồn: đủ 88 ID/câu hỏi/giải thích/đáp án, 352 lựa chọn, thứ tự và toàn bộ topic khớp. Không thêm thư viện hoặc bộ kiểm thử chỉ lặp lại phép chuyển đổi.
- Giới hạn: Chưa chạy lại production build hoặc kiểm tra trình duyệt trong lượt nhập dữ liệu này. Không sửa nội dung học, commit, push hoặc triển khai.
- Ju kiểm tra: Vào Database → Session 2; thấy 88 câu. Câu đầu chọn C phải đúng; chuyển câu không giữ lựa chọn cũ. Đến nhóm cuối thấy câu 76–88; chọn nháp rồi tải lại phải giữ tiến trình.
- Trạng thái: Hoàn thành, chờ Ju phản hồi; chưa thực hiện task tiếp theo.

## 09/10/2026: Bản mẫu máy chơi game anime và mèo của Ju

- Phạm vi đã duyệt: bản mẫu riêng trước khi thay giao diện quiz thật. Thêm app/dev/quiz-console/page.tsx, chỉ mở trong môi trường development. Lấy nguyên câu 1, 21 và 25 của chapter-1 để thử câu ngắn/dài, không sửa dữ liệu.
- components/quiz-preview/QuizConsolePreview.tsx: bố cục khung máy cyan/hồng/tím, chọn và chấm 3 câu mẫu, bảng điều hướng, tiến độ, tổng kết và làm lại. Trạng thái chỉ nằm trong bản mẫu, không đọc/ghi localStorage hoặc gọi bộ xử lý của quiz thật.
- components/quiz-preview/StudyCat.tsx: SVG diễn giải lại mèo cam/trắng Ju tự vẽ, có sáu biểu cảm chờ/suy nghĩ/đúng/sai/ăn mừng/hoàn thành; không sửa ảnh gốc. Có nút thử từng biểu cảm; mặc định phản ứng theo câu trả lời.
- components/quiz-preview/QuizConsolePreview.module.css: chuyển động nền chậm, đáp án nảy/nhấn, chuyển câu, phản hồi đúng/sai, tiến độ và mèo. Có nút tắt chuyển động và quy tắc prefers-reduced-motion. Dùng CSS cho bản mẫu, không cài thêm thư viện. Trên desktop thấp, bỏ lời dẫn trang trí để dành chiều cao cho câu hỏi; mobile cuộn an toàn và mở/đóng bảng câu.
- Đã kiểm tra: ESLint phạm vi mới và TypeScript --noEmit --incremental false đạt. Trình duyệt localhost:3000/dev/quiz-console: trước chọn không chấm được; chọn bằng Space, chấm bằng Enter; khóa radio sau chấm, phản hồi đúng/sai, giữ trạng thái qua chọn câu, hoàn thành 3 câu với 2 đúng và tổng kết 2/3, làm lại về 0/3. Mèo đổi suy nghĩ/đúng/sai/hoàn thành.
- Desktop 1366x768: clientWidth=scrollWidth=1351 (có thanh cuộn dọc); câu 21 sau chấm có đáy lựa chọn khoảng y=559 và nút kiểm tra khoảng y=701 tính từ đầu tài liệu, nằm trong chiều cao 768. Đã xem ảnh toàn trang. Mobile 390x844: không tràn ngang cả câu ngắn và câu 21 trước/sau chấm; bảng chọn câu mở được; tắt chuyển động đưa số phần tử có CSS animation về 0, kể cả sau chấm. Đã lưu ảnh kiểm tra ngoài repo.
- Giới hạn: chỉ 3 câu để duyệt thiết kế, chưa đại diện điều hướng 25/88 câu; chưa tích hợp vào quiz thật hoặc kiểm thử lại luồng quiz thật. Chưa giả lập cài đặt giảm chuyển động của hệ điều hành; đã kiểm tra quy tắc CSS và nút tắt trên trang. Chưa chạy production build. Không commit/push/deploy.
- Ju kiểm tra: mở /dev/quiz-console khi chạy dev; chọn B câu mẫu 1 và chấm; thử câu mẫu 2/các biểu cảm mèo; thử tắt chuyển động. Chờ Ju phản hồi màu sắc, độ giống mèo và nhịp chuyển động trước bước tích hợp.

## 09/10/2026: Thiết kế lại mèo đồng hành trong bản mẫu

- Ju duyệt phương án mèo cam đào viền tím, khăn cyan, tay chân rõ và 7 trạng thái. Chỉ sửa components/quiz-preview/StudyCat.tsx, QuizConsolePreview.module.css và phần ánh xạ biểu cảm trong QuizConsolePreview.tsx; giữ nguyên bố cục, kích thước thẻ, nội dung và logic chấm quiz.
- SVG mới tách đầu, thân, từng tay, từng chân, đuôi; tay nằm lớp trước để không mất sau đầu khi giơ lên. Có đế đứng tím, bóng chân và ngôi sao được hai tay ôm ở trạng thái hoàn thành. Tâm xoay đặt trực tiếp trong SVG để hình tĩnh và trình duyệt dùng cùng tư thế.
- Bảy trạng thái: idle/waiting/thinking/correct/wrong/celebrating/completed. Chưa chọn là waiting, chọn nháp là thinking, phản hồi chấm ánh xạ correct/wrong, tổng kết đủ câu là completed; các trạng thái đều thử được qua nút có sẵn. Không thay handlers chọn/chấm/lưu tiến trình. Giữ quy tắc tắt chuyển động và prefers-reduced-motion.
- Kiểm tra: ESLint components/quiz-preview đạt; TypeScript --noEmit --incremental false đạt. Dựng trực tiếp component React thành SVG, dùng sharp có sẵn để xem đủ 7 trạng thái ở 150 px và 58 px; phát hiện và sửa lệch tâm xoay trong bộ dựng ảnh tĩnh. Đã xem bảng ảnh cuối: tay chân tách rõ, không vượt khung. Ảnh tại thư mục visualizations của phiên, không đưa script kiểm tra tạm vào repo.
- Giới hạn: Công cụ trình duyệt chặn đọc tab vì giao thức URL không được phép; không thử vượt chặn. Chưa xác nhận trực tiếp hoạt ảnh, bố cục trong trình duyệt hoặc cài đặt giảm chuyển động hệ thống ở lượt này. Không chạy production build, không cài thư viện, không sửa ảnh gốc hoặc quiz thật.
- Ju kiểm tra: mở /dev/quiz-console khi chạy dev; thử bảy biểu cảm và nút tắt chuyển động; chọn/chấm để xem mèo phản ứng. Chờ Ju phản hồi trước thay đổi tiếp theo.

## 09/10/2026: Sửa lệch tay chân khi mèo chuyển động

- Tái hiện lỗi trực tiếp tại /dev/quiz-console: trạng thái thinking có tay phải nằm ngoài khung SVG. SVG rotate(angle cx cy) đã chứa tâm xoay, trong khi CSS transform-origin tiếp tục áp cùng tâm đó; trình duyệt dịch bộ phận thêm lần nữa. Ảnh SVG tĩnh trước đây không phản ánh lỗi này.
- StudyCat.tsx: tách nhóm định vị khớp translate và nhóm chỉ xoay góc; trả nét vẽ về tọa độ khớp. Bỏ xoay riêng hai chân khi ăn mừng, giữ chúng cùng thân. QuizConsolePreview.module.css: đặt origin 0 0 cho đầu/tay, giữ chuyển góc mượt; giảm biên độ thở và nhảy để đầu nghiêng không chạm mép khung nhỏ.
- Kiểm tra trực tiếp tab HTTP đang hoạt động (tab cũ là trang lỗi kết nối dạng data URL): cả 7 tư thế ổn định có đầu/tay nằm trong SVG, ma trận xoay không còn độ dịch bổ sung; lấy thêm mẫu trong chuyển trạng thái. Xem ảnh trình duyệt ở 1366x768, 1366x900 và 390x844. Sau giảm biên độ, lấy 5 mẫu trạng thái thinking 58 px đều trong khung. Nút tắt chuyển động đưa hoạt ảnh mèo về 0. Đã lưu ảnh chụp trình duyệt cat-fixed-browser.jpg ngoài repo.
- ESLint StudyCat.tsx và TypeScript --noEmit --incremental false đạt. Không sửa handlers quiz, nội dung câu hỏi hoặc bố cục. Chưa kiểm tra trình duyệt khác và chưa chạy production build.
- Ju kiểm tra: tải lại bản mẫu, lần lượt thử Suy nghĩ/Ăn mừng/Hoàn thành và bật/tắt chuyển động; tay cần giữ đúng vai, chân chuyển động cùng thân. Chờ phản hồi trước thay đổi tiếp theo.

## 10/10/2026: Phím tắt cho quiz

- Chỉ sửa components/QuizRunner.tsx và nhật ký này. Không đổi giao diện, dữ liệu, cấu trúc localStorage hoặc các hàm chọn/chấm/chuyển câu hiện có.
- Phím 1/2/3/4 chọn ID a/b/c/d nếu tồn tại và chưa chấm. ArrowLeft/ArrowRight gọi handleNavigate với giới hạn đầu/cuối như hai nút hiện có; vẫn cho phép chuyển câu chưa trả lời. Enter chấm bản nháp, hoặc chuyển tiếp khi câu đã chấm; cuối bài không tự mở kết quả.
- useEffect đăng ký một bộ nghe keydown và gỡ khi component rời trang; useEffectEvent đọc trạng thái mới nhất mà không đăng ký lại sau mỗi lần render. Chỉ bật sau khôi phục tiến trình và khi đang xem câu hỏi. Bỏ qua input (kể cả radio), textarea, select, contenteditable, Ctrl/Alt/Meta/Shift, sự kiện đã xử lý, giữ phím và lúc bộ gõ đang ghép ký tự. Enter trên nút/liên kết giữ hành vi mặc định, tránh chấm và chuyển câu cùng lúc. Chỉ preventDefault khi có hành động hợp lệ.
- Đã chạy đạt: node node_modules/eslint/bin/eslint.js .; node node_modules/typescript/bin/tsc --noEmit --incremental false; node node_modules/next/dist/bin/next build --webpack; node --test tests/*.test.mjs (9/9); git diff --check. npm không có trên PATH nên gọi trực tiếp các công cụ đã cài. Không thêm thư viện.
- Trình duyệt production tại localhost:3110: 2 rồi Enter chấm B câu 1 đúng; Enter tiếp sang câu 2; 3 chọn nháp C rồi tải lại giữ câu 2, bản nháp và điểm câu 1. ArrowLeft trở lại câu 1, thêm ArrowLeft không vượt đầu bài; 4 không thay đáp án đã khóa. ArrowRight trở lại câu 2. Enter trên nút kiểm tra chỉ chấm, không nhảy câu; màn hình tiến độ bỏ qua phím số và ArrowRight.
- Giới hạn: 9 kiểm thử sẵn có không bao phủ phím tắt. Chưa thử trực tiếp mọi tổ hợp phím, bộ gõ, trường nhập liệu, bài có thiếu lựa chọn hoặc cuối bài trên trình duyệt. Các điều kiện này đã được rà soát trong code. Không kiểm tra lại toàn bộ nội dung/đáp án hoặc thiết kế.
- Ju kiểm tra: thử 1–4, Enter hai lần, mũi tên ở đầu/cuối; tải lại câu đang chọn nháp; dùng Tab và Enter trên các nút; kiểm tra phím tắt không tác động màn hình kết quả. Khi radio đang có tiêu điểm, phím mũi tên vẫn theo hành vi radio gốc.
- Trạng thái: Hoàn thành, chờ Ju kiểm tra; không commit/push/deploy. Bước tiếp theo chỉ xử lý phản hồi của Ju.

## 10/10/2026: Sửa tiêu điểm sau khi chọn câu

- Ju báo: bấm câu trong bảng điều hướng rồi chọn bằng phím số thì Enter không chấm; viền tím đậm còn ở nút câu đã bấm khi chuyển câu bằng mũi tên.
- Nguyên nhân: nút điều hướng vẫn giữ tiêu điểm; Enter được nhường cho hành vi nút, còn CSS focus-visible tạo viền tím đậm tại nút cũ dù aria-current đã chuyển đúng.
- QuizRunner.tsx: thêm screenRef, tabIndex=-1 cho vùng Nội dung bài học và chuyển tiêu điểm tới vùng đó trong handleNavigate bằng focus({ preventScroll: true }). Vùng này không thêm vào thứ tự Tab. Áp dụng cả chọn lại cùng câu và điều hướng bằng chuột/bàn phím. Không đổi CSS, hàm chấm/chọn hoặc localStorage.
- Đã đạt: ESLint QuizRunner.tsx, TypeScript --noEmit --incremental false, build --webpack. Trình duyệt production localhost:3111: bấm câu 15 bằng chuột, 2 rồi Enter chấm đúng; ArrowRight sang câu 16, 3 rồi Enter chấm đúng. DOM xác nhận aria-current ở câu 16, focus ở Nội dung bài học và nút câu 15 không còn focus-visible. Kích hoạt nút câu 17 bằng Enter rồi 1/Enter cũng chấm được, không kích hoạt lại nút điều hướng.
- Giới hạn: kiểm tra tập trung vào lỗi tiêu điểm, không chạy lại toàn bộ luồng lưu tiến trình hoặc mọi tổ hợp phím. Máy chủ dev của Ju ở cổng 3000 giữ nguyên; dùng bản production riêng để thử.
- Ju kiểm tra: bấm câu 15 rồi chọn số/Enter; sang câu 16 bằng mũi tên và kiểm tra viền câu hiện tại; dùng Tab/Enter chọn câu rồi tiếp tục chọn/chấm. Chờ phản hồi, không commit/push hoặc triển khai task tiếp theo.

## 10/10/2026: Chế độ ôn câu sai

- Phạm vi: chỉ triển khai Review mistakes theo tệp yêu cầu của Ju. Không sửa nội dung câu hỏi, thêm thư viện, commit, push hoặc deploy.
- lib/mistakes.ts: kho version 1 tại ju-study-hub:mistakes:v1, chỉ lưu { subjectId, chapterId, questionId }. Chống trùng bằng bộ ba ID mã hóa JSON; bỏ qua dữ liệu lỗi/phiên bản lạ. Sai trong bài thường thì thêm; đúng trong bài thường vẫn giữ; đúng trong lượt ôn thì xóa ngay. Khi storage bị chặn/đầy, giữ kho trong bộ nhớ của trang.
- app/review/page.tsx và components/ReviewMistakes.tsx: đọc danh mục thật từ registry; loại mã câu đã mất; lưu danh sách cố định ở ju-study-hub:review-round:v1. Lượt chưa hoàn thành được tiếp tục sau tải lại, kể cả câu đã sửa đúng vẫn nằm ở vị trí cũ. Mở lại lượt đã chấm hết hoặc bấm Lượt ôn mới sẽ lấy kho hiện tại. Câu thêm sau lúc bắt đầu chỉ vào lượt mới. Có trạng thái trống và liên kết chọn môn.
- components/QuizRunner.tsx: dùng lại chọn/chấm/điều hướng/KaTeX và duy nhất bộ nghe phím hiện có. Tiến trình ôn lưu tại ju-study-hub:review-progress:v1; giữ nguyên khóa và cấu trúc version 1 của bài thường. Dùng mã bộ ba cho ID trong lượt ôn để tránh đụng nhau giữa các môn/bài; hiện nguồn môn/bài và liên kết về bài gốc. Không thay nội dung gốc.
- components/MistakeLink.tsx và app/page.tsx: nút Ôn câu sai kèm số lượng ở trang chủ và thanh điều hướng bài thường; bộ đếm cập nhật theo thay đổi trong trang và sự kiện storage giữa các tab. components/QuizResult.tsx: nhãn tiến độ/kết quả và nút bắt đầu lượt ôn tiếp theo phù hợp chế độ, giữ nguyên nhãn bài thường.
- tests/mistakes.test.mjs: 7 kiểm thử mới về chống trùng, tải lại, phân biệt môn/bài, quy tắc xóa, danh sách cố định, dữ liệu lỗi/mã câu đã mất, storage chặn/đầy và giữ nguyên tiến trình thường. Bộ kiểm thử tổng cộng 16/16 đạt. ESLint toàn dự án, TypeScript --noEmit --incremental false và build --webpack đạt; gọi trực tiếp bằng node vì npm không có trên PATH.
- Trình duyệt production riêng localhost:3112: phím số/Enter chấm sai hai câu Blockchain, bộ đếm tăng và giữ sau tải lại; ôn đúng câu đầu, Enter sang câu sau, tải lại vẫn ở câu 2/2 với điểm 1/2. Về bài gốc vẫn ở câu 2 với 2 câu sai và điểm 0; kho còn 1 câu. Ôn sai câu còn lại giữ cho lượt sau; lượt mới chỉ chứa câu đó; sửa đúng rồi bấm lượt mới hiện trạng thái trống.
- Trình duyệt: bài Database 1 câu được làm sai hai lượt vẫn chỉ có 1 mục, làm đúng ở bài thường vẫn giữ mục. Mở lượt ôn gộp Database và Blockchain, mũi tên đổi đúng nguồn môn/bài. Màn hình tiến độ bỏ qua phím số/mũi tên. Không có lỗi/cảnh báo console ở lần kiểm tra này. Đã xem giao diện tại 820x1180; không tràn ngang, đủ lựa chọn/nút ở câu đã kiểm tra. Đây là mô phỏng kích thước iPad, chưa kiểm tra thiết bị thật hoặc mọi câu dài.
- Giới hạn: không nhập hồi tố câu sai từ tiến trình cũ; câu sai được ghi khi chấm từ phiên bản này. Dữ liệu chỉ trên trình duyệt/địa chỉ hiện tại; storage bị chặn hoặc đầy thì không đảm bảo giữ sau tải lại. Mã câu cũ bị loại khi mở trang ôn, nên bộ đếm có thể còn mục cũ trước lần mở đó. Nhiều tab đồng thời ghi vẫn theo cơ chế localStorage, chưa có xử lý hợp nhất giao dịch. Trang ôn nhận toàn bộ danh mục câu để tra cứu, có thể tối ưu nếu ngân hàng câu tăng lớn.
- Ju kiểm tra: làm sai một câu, tải lại và mở Ôn câu sai; sửa đúng và kiểm tra lượt mới không còn câu đó; làm sai khi ôn rồi thoát và quay lại; xác nhận tiến trình bài thường giữ nguyên và thử phím số/Enter/mũi tên trên iPad.
- Trạng thái: hoàn thành, chờ Ju kiểm tra và phản hồi. Bước tiếp theo chỉ xử lý phản hồi trong phạm vi tính năng này.
- Kiểm tra bản dựng cuối: trang tiến độ đã hiện đúng nhãn Tiến độ lượt ôn; đã lưu ảnh review-mistakes-ipad.png ngoài repo. Đã đóng tab và dừng máy chủ kiểm tra riêng; không tác động máy chủ dev của Ju. Ảnh desktop từ công cụ bị cắt theo vùng hiển thị nên không dùng làm bằng chứng bố cục desktop đầy đủ.
