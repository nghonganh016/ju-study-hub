# Sample midterm test: kiểm tra nội dung

Nguồn câu hỏi: `midterm_test.pdf` (SHA-256 `ab7a99112853cd9326aa91ccf6b281865199a9323f97c1003aca742cad4279bd`). Chỉ Part I, câu 1–40, được đưa vào quiz. Part II, câu 41–42, là tự luận và không được nhập. PDF không cung cấp đáp án hay lời giải, nên đáp án và giải thích trong `data/database/sample-midterm-test.ts` được đối chiếu với các slide bài giảng.

| Câu | Đáp án | Slide nguồn |
| --- | --- | --- |
| 1–6 | C, D, B, C, A, A | `AdvanceDB_1.pdf` |
| 7–12 | C, C, A, B, B, C | `AdvancedDatabases_2.pdf` |
| 13–18 | A, D, B, B, D, B | `AdvancedDatabase3.pdf` |
| 19–24 | B, A, C, D, D, D | `AdvancedDatabase3.pdf` |
| 25–30 | A, B, D, D, C, B | `AdvanceDatabases4.pdf` |
| 31–35 | D, D, D, A, A | `DB5.pdf` |
| 36–40 | B, C, D, C, B | `ConcurrencyControl.pdf` |

Mỗi câu trong dữ liệu có link đến trang PDF cụ thể, kèm số slide in trên trang. Đã đối chiếu máy phần chữ của 40 prompt và 160 option với PDF sau khi bỏ khác biệt khoảng trắng do font của đề: 0 sai khác. Đã kiểm tra sự tồn tại của cả sáu PDF nguồn, tiêu đề trang và số slide: 0 sai khác.

Các điểm cần hiểu đúng khi học:

- Câu 14 và 22 dựa trên tình huống của bài giảng. Trong hệ thống thật, PostgreSQL chọn plan theo thống kê và chi phí; chỉ có hay không có index không quyết định tuyệt đối Seq Scan hoặc Hash Join.
- Câu 23 có đáp án dự kiến D theo mục tiêu của lab, nhưng câu hỏi không có đáp án đúng vô điều kiện. `enable_indexscan = off` chỉ làm planner tránh plain Index Scan; Bitmap Index Scan vẫn có thể được dùng, và cost của Seq Scan không nhất thiết cao hơn. Lời giải trong quiz nêu rõ giới hạn này. Nếu dùng như đề thi chấm điểm nghiêm ngặt, nên xin giảng viên xác nhận hoặc sửa câu hỏi.
- Câu 27 dùng `DENSE_RANK()` đúng theo slide và giữ các phim đồng hạng; vì vậy lọc top 3 rank có thể trả hơn ba dòng mỗi category. Muốn đúng ba dòng cần `ROW_NUMBER()` với thứ tự phá hòa rõ ràng.
- Câu 36 và 39 dùng cách nói đơn giản hóa trong slide về X-Lock và MVCC. `SELECT ... FOR UPDATE` khóa các row được chọn; các truy vấn đọc thông thường không chặn writer, còn truy vấn đọc có khóa là ngoại lệ.

Không sửa wording của đề. Các lưu ý học thuật nằm trong explanation, không thay đổi option hay đáp án dự kiến của slide.
