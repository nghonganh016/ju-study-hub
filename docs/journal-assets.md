# Bộ họa tiết sổ học tập

18 hình SVG tự vẽ bằng đường nét trong `components/journal/JournalAsset.tsx`, lấy cảm hứng chung từ giấy thủ công và sổ trò chơi. Không sao chép hình tham chiếu, không dùng ảnh hoặc thư viện mới. Xem toàn bộ hình trong [bảng mẫu](journal-assets.svg).

## Các hình và mục đích

| Tên `kind` | Hình và nơi nên dùng | Giá trị thị giác |
| --- | --- | --- |
| `tape-striped` | Băng dính hồng sọc đào, góc trên sổ. Đã dùng. | Mép xé và sọc lệch nhẹ tạo cảm giác dán tay. |
| `tape-dotted` | Băng dính xanh chấm kem, mép tờ ghi chú về sau. | Nhịp chấm nhỏ, dịu và cùng màu bìa. |
| `tape-wave` | Băng dính kem có sóng tím, cạnh thẻ tiêu đề về sau. | Tạo nét mềm mà không thêm mảng màu lớn. |
| `tab-rounded` | Thẻ giấy xanh bo tròn ở mép trên sổ. Đã dùng. | Gợi trang mục lục và vật liệu giấy gấp. |
| `tab-folded` | Thẻ hồng gấp góc, dành cho nhãn chương về sau. | Góc gấp phân biệt thẻ mà không cần màu mới. |
| `bookmark` | Ruy-băng tím có đường khâu, đầu bảng chọn câu. Đã dùng. | Đánh dấu vùng tra cứu và tăng cảm giác sổ trò chơi. |
| `paper-clip` | Kẹp giấy nét tím, góc ghi chú hoặc thẻ tiêu đề về sau. | Gợi các tờ giấy được ghép lại bằng vật thật. |
| `note-folded` | Giấy ghi chú kem gấp góc, nền ghi chú ngắn về sau. | Có chiều sâu nhưng không cạnh tranh với chữ. |
| `label-torn` | Nhãn giấy dài mép xé, nền nhãn số câu/tiêu đề về sau. | Thay hình chữ nhật đều bằng một mảnh giấy thủ công. |
| `star-soft` | Sao năm cánh tô kem, vùng trống cạnh tiêu đề/kết quả. | Điểm nhấn ấm và nhỏ. |
| `star-sketch` | Sao viền tím có nét phác phụ, lề giấy. | Cảm giác ghi chép bằng tay, ít diện tích tô màu. |
| `sparkle-diamond` | Tia sáng hình thoi hồng và dấu cộng nhỏ, góc nhãn. | Làm nổi nhẹ điểm nhấn. |
| `sparkle-rays` | Cụm tia tím với tâm đào, vùng trống cạnh dấu trang. | Biến thể nhẹ hơn sao có mảng tô. |
| `flower` | Hoa hồng, nhụy kem và cành nét bút, chân trang trống. | Chi tiết dễ thương cùng nét viền của bộ hình. |
| `heart` | Tim đào hơi bất đối xứng, cạnh lời động viên. | Tạo sắc ấm, chỉ nên dùng một điểm nhỏ. |
| `cloud` | Mây kem viền xanh, vùng trống ngoài sổ. | Liên kết nền xanh với giấy kem. |
| `arrow` | Mũi tên vòng nét bút, cạnh ghi chú phụ. | Gợi lời chú thích viết tay; không thay chỉ dẫn bằng chữ. |
| `underline` | Hai nét chì trên vệt đào mờ, dưới tiêu đề ngắn. | Nhấn chữ theo kiểu ghi chép, tránh thêm khung. |

## Cách dùng và bảo trì

```tsx
import JournalAsset from "@/components/journal/JournalAsset";

<JournalAsset kind="tape-striped" className={styles.bookTape} />
```

- `kind` chọn hình; TypeScript chỉ chấp nhận 18 tên trong bộ. `className` quyết định vị trí và kích thước tại nơi dùng.
- `journalPalette` chứa bảng màu chung. Đổi màu tại đây sẽ đổi tất cả hình liên quan, không cần sửa từng đường vẽ. Màu này khớp hệ màu sổ hiện tại; CSS của trang vẫn được quản lý riêng.
- SVG là hình vẽ bằng đường nét nên phóng to vẫn sắc. `viewBox` là khung tọa độ gốc; CSS đặt `width` và `height: auto` để giữ đúng tỉ lệ.
- `strokeLinecap` và `strokeLinejoin` bo đầu nét và chỗ nối. Đường viền hơi lệch được vẽ cố định, không dùng số ngẫu nhiên nên hình ổn định khi trang tải.
- Ba hình tích hợp dùng `position: absolute`: Nằm theo mép phần tử cha có `position: relative`, không thêm chiều cao vào câu hỏi. `drop-shadow` tạo bóng theo hình SVG, thay vì theo khung chữ nhật.
- Tất cả hình chỉ trang trí: `aria-hidden="true"` bỏ qua khi trình đọc màn hình đọc nội dung, `focusable="false"` không tạo điểm dừng bàn phím, `pointer-events: none` không chặn thao tác.
- Nhãn có ý nghĩa vẫn cần chữ HTML thật. Không nhúng chữ vào SVG. Nếu biến thẻ thành nút điều hướng trong tương lai, phải dùng nút/link HTML có tên rõ và đặt SVG trang trí bên trong.
- Bảng mẫu SVG là bản xem tĩnh từ các component, không được tải vào quiz. Nếu sửa hình, cần cập nhật bảng mẫu tương ứng.

## Phạm vi lượt đầu

Chỉ dùng băng dính sọc, thẻ giấy bo và ruy-băng. Chưa trang trí lại tiêu đề hoặc đáp án; 15 hình còn lại mới là tài nguyên sẵn dùng. Không thêm chuyển động, logic, dữ liệu hoặc thay kích thước nội dung quiz.
