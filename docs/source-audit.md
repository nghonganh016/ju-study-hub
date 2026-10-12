# Audit nguồn tham khảo câu hỏi (Task 3)

Ngày kiểm tra: 12/10/2026. Phạm vi: toàn bộ 742 câu trong registry tại thời điểm audit, `Question.source`, `QuizQuestion`, hai PDF trong `public/references/` và tài liệu nguồn trong `docs/`. Đây là snapshot trước khi thêm Database Session 1 ngày 13/10/2026. Không thay đổi câu hỏi hoặc link trong Task 3; bốn giá trị `revision` bị đổi nhầm từ Task 2 được khôi phục về baseline Git khi chạy test trong Task 3.

## Cách phân loại và giới hạn

- **A**: URL HTTPS bên ngoài có cấu trúc hợp lệ; 56 URL duy nhất đã mở qua công cụ web ngày 12/10/2026. Điều này xác nhận trang/tệp được truy xuất tại thời điểm audit, chưa chứng minh từng nguồn phù hợp nội dung học thuật hoặc mọi fragment anchor hoạt động.
- **B**: URL `/references/...` có file thực tế trong `public/references/`; số trang trong fragment đã đối chiếu với độ dài PDF. Chưa đối chiếu nội dung học thuật của từng câu với trang.
- **C**: URL file cục bộ mà file không tồn tại. **D**: trích dẫn văn bản, gồm tên slide/lab và số trang/câu; đây chưa phải URL. **E**: URL/tham chiếu sai định dạng. **—**: không có trường `source` (không thuộc A–E).
- Tổng số: **742 câu**; A 186, B 171, C 0, D 296, E 0, không có source 89. Các trích dẫn D gồm 166 giá trị khác nhau.
- `QuizQuestion.tsx` hiện render mọi `source` có giá trị thành `<a href={question.source}>`. Ví dụ trên route `/quiz/blockchain/session-7`, `Session 7, slide 6` được trình duyệt giải thành `/quiz/blockchain/Session%207,%20slide%206`, một route không có trong registry, nên nút nguồn dẫn tới 404. Cả 296 câu D chịu ảnh hưởng.
- File cục bộ B: `session-4-slides.pdf` 45 trang, 141 tham chiếu trang 4–36; `session-4-worksheet.pdf` 3 trang, 30 tham chiếu trang 1–3. Mọi `#page=N` trong B là số nguyên và nằm trong file.

## Tài liệu cần có trước khi đổi nguồn

| Session | Tình trạng tài liệu gốc | Hướng xử lý sau khi Ju review |
| --- | --- | --- |
| Blockchain 5 | Có `Downloads/Session05-Ethereum-EVM_lab_lab05_worksheet.pdf` (6 trang), chưa có trong `public/references/`. Lab Q1 ở trang 2, Q2–Q3 trang 3, Q4–Q6 trang 4. Chưa thấy slide Session 5 trong thư mục project, Downloads, Documents, Desktop. | Xin slide gốc; có thể sao chép worksheet được Ju xác nhận vào `public/references/session-5-worksheet.pdf`, rồi map riêng phần Lab và slide. |
| Blockchain 6 | Chưa thấy slide Session 6 hoặc Lab 6 ở các thư mục trên. | Xin đúng PDF slide và Lab 6; đề xuất tên đích `session-6-slides.pdf`, `session-6-worksheet.pdf`. |
| Blockchain 7 | Chưa thấy slide Session 7 hoặc Lab 7 ở các thư mục trên. | Xin đúng PDF slide và Lab 7; đề xuất tên đích `session-7-slides.pdf`, `session-7-worksheet.pdf`. |
| Blockchain 8 | Có `Downloads/Lab08_Reentrancy_restructured.pdf` (2 trang), chưa có trong `public/references/`. Lab 08.1–08.2 ở trang 1, Lab 08.3–08.4 ở trang 2. Chưa thấy slide Session 8 ở các thư mục trên. | Xin slide gốc; có thể sao chép Lab được Ju xác nhận vào `public/references/session-8-worksheet.pdf`, rồi map riêng phần Lab và slide. |
| Database chapter-2, session-2 | 89 câu chưa có `source`; `topic` của Session 2 là metadata phân nhóm, không phải tham chiếu. | Xác định tài liệu gốc trước khi thêm nguồn. Không suy đoán URL từ topic. |

Các kết quả tìm file chỉ bao phủ repository, Downloads, Documents và Desktop. Chưa thể kết luận Ju không có bản slide/lab ở vị trí khác. Hai worksheet tìm được đã xác nhận tên, chủ đề và số trang bằng cách đọc PDF; chưa sao chép file. Trích dẫn một câu có thể chứa nhiều trang hoặc cả slide lẫn Lab; một URL duy nhất không thể giữ trọn quan hệ đó nếu không bổ sung cách hiển thị nhiều nguồn.

## Đề xuất thay đổi code riêng với việc thêm PDF

1. Sửa `QuizQuestion` để chỉ render link khi `source` là URL `https://...` hoặc đường dẫn file `/references/...` hợp lệ; với trích dẫn D, hiển thị văn bản không thể click. Đây là lỗi lặp lại ở 296 câu. Một hàm kiểm tra nhỏ trong component hoặc module hiện có là đủ, chưa cần adapter/parser trích dẫn.
2. Sau khi Ju cung cấp và xác nhận PDF gốc, thêm file vào `public/references/` trong một bước riêng; kiểm tra hash, số trang và mapping. Sau đó mới đổi từng `source` D sang URL PDF phù hợp. Với nguồn ghép nhiều tài liệu, cần quyết định cách giữ đủ metadata trước khi di chuyển.
3. Giữ nguyên 186 nguồn A, 171 nguồn B và 89 trường chưa có nguồn trong lượt audit này. Không sửa nội dung học thuật, đáp án, ID hay localStorage.

## Bảng theo từng câu

| Môn | Session/chapter | Question ID | `source` hiện tại | Loại | Hành động đề xuất |
| --- | --- | --- | --- | --- | --- |
| blockchain | chapter-1 | bc-ch1-2-q01 | https://ethereum.org/wallets/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q02 | https://ethereum.org/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q03 | https://ethereum.org/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q04 | https://ethereum.org/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q05 | https://ethereum.org/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q06 | https://ethereum.org/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q07 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q08 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q09 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q10 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q11 | https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q12 | https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q13 | https://ethereum.org/wallets/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q14 | https://ethereum.org/wallets/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q15 | https://ethereum.org/developers/docs/apis/json-rpc/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q16 | https://ethereum.org/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q17 | https://ethereum.org/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q18 | https://ethereum.org/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q19 | https://ethereum.org/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q20 | https://developer.bitcoin.org/devguide/transactions.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q21 | https://developer.bitcoin.org/devguide/transactions.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q22 | https://ethereum.org/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q23 | https://ethereum.org/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q24 | https://support.metamask.io/configure/wallet/how-to-restore-your-metamask-wallet-from-secret-recovery-phrase | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | chapter-1 | bc-ch1-2-q25 | https://ethereum.org/wallets/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q001 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q002 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q003 | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q004 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q005 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q006 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q007 | https://csrc.nist.gov/projects/hash-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q008 | https://csrc.nist.gov/projects/hash-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q009 | https://csrc.nist.gov/projects/hash-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q010 | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q011 | https://csrc.nist.gov/projects/hash-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q012 | https://csrc.nist.gov/projects/hash-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q013 | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q014 | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q015 | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q016 | https://developer.bitcoin.org/devguide/transactions.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q017 | https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q018 | https://keccak.team/keccak_specs_summary.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q019 | https://developer.bitcoin.org/reference/transactions.html#address-conversion | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q020 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q021 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q022 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q023 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q024 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q025 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q026 | https://developer.bitcoin.org/devguide/transactions.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q027 | https://csrc.nist.gov/projects/hash-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q028 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q029 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q030 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q031 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q032 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q033 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q034 | https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q035 | https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q036 | https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q037 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q038 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q039 | https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q040 | https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q041 | https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q042 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q043 | https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q044 | https://ethereum.org/en/developers/docs/evm/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q045 | https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q046 | https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q047 | https://blog.kraken.com/news/proof-of-reserves-june-30-2025 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q048 | https://www.secg.org/sec2-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q049 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q050 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q051 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q052 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q053 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q054 | https://ethereum.org/en/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q055 | https://www.secg.org/sec2-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q056 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q057 | https://developers.cardano.org/docs/operate-a-stake-pool/basics/cardano-key-pairs/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q058 | https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#bls-signatures | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q059 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q060 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q061 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q062 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q063 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q064 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q065 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q066 | https://ethereum.org/en/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q067 | https://www.secg.org/sec1-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q068 | https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q069 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q070 | https://www.secg.org/sec2-v2.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q071 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q072 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q073 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q074 | https://eips.ethereum.org/EIPS/eip-2 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q075 | https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q076 | https://eips.ethereum.org/EIPS/eip-155 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q077 | https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q078 | https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q079 | https://eips.ethereum.org/EIPS/eip-712 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q080 | https://eips.ethereum.org/EIPS/eip-2612 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q081 | https://eips.ethereum.org/EIPS/eip-712 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q082 | https://eips.ethereum.org/EIPS/eip-2612 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q083 | https://eips.ethereum.org/EIPS/eip-4361 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q084 | https://ethereum.org/en/developers/docs/transactions/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q085 | https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q086 | https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/keys/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q087 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q088 | https://docs.python.org/3/library/secrets.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q089 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q090 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q091 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q092 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q093 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q094 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q095 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q096 | https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q097 | https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q098 | https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q099 | https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q100 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q101 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q102 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q103 | https://developer.bitcoin.org/devguide/wallets.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q104 | https://developer.bitcoin.org/devguide/wallets.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q105 | https://developer.bitcoin.org/devguide/wallets.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q106 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q107 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q108 | https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q109 | https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q110 | https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q111 | https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q112 | https://github.com/satoshilabs/slips/blob/master/slip-0044.md | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q113 | https://github.com/satoshilabs/slips/blob/master/slip-0044.md | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q114 | https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q115 | https://ethereum.org/en/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q116 | https://ethereum.org/en/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q117 | https://ethereum.org/en/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q118 | https://eips.ethereum.org/EIPS/eip-55 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q119 | https://eips.ethereum.org/EIPS/eip-55 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q120 | https://developer.bitcoin.org/reference/transactions.html#address-conversion | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q121 | https://developer.bitcoin.org/reference/transactions.html#address-conversion | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q122 | https://github.com/bitcoin/bips/blob/master/bip-0013.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q123 | https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q124 | https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q125 | https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q126 | https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/clipboard-hacking/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q127 | https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q128 | https://support.metamask.io/start/user-guide-secret-recovery-phrase-password-and-private-keys | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q129 | https://support.metamask.io/start/user-guide-secret-recovery-phrase-password-and-private-keys | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q130 | https://ethereum.org/en/developers/docs/accounts/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q131 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q132 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q133 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q134 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q135 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q136 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q137 | https://bitcoin.org/bitcoin.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q138 | https://developer.bitcoin.org/devguide/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q139 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q140 | https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q141 | https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q142 | https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q143 | https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q144 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q145 | https://www.rfc-editor.org/rfc/rfc6979 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q146 | https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q147 | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q148 | https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q149 | https://docs.metamask.io/metamask-connect/evm/guides/sign-data/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q150 | https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-3 | bc-session3-q151 | https://docs.metamask.io/metamask-connect/evm/guides/sign-data/ | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q001 | /references/session-4-slides.pdf#page=5 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q002 | /references/session-4-slides.pdf#page=5 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q003 | /references/session-4-slides.pdf#page=5 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q004 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q005 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q006 | /references/session-4-slides.pdf#page=7 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q007 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q008 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q009 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q010 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q011 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q012 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q013 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q014 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q015 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q016 | /references/session-4-slides.pdf#page=9 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q017 | /references/session-4-slides.pdf#page=9 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q018 | /references/session-4-slides.pdf#page=23 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q019 | /references/session-4-slides.pdf#page=9 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q020 | /references/session-4-slides.pdf#page=9 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q021 | /references/session-4-slides.pdf#page=9 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q022 | /references/session-4-slides.pdf#page=8 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q023 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q024 | /references/session-4-slides.pdf#page=6 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q025 | /references/session-4-slides.pdf#page=19 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q026 | /references/session-4-slides.pdf#page=10 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q027 | /references/session-4-slides.pdf#page=10 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q028 | /references/session-4-slides.pdf#page=10 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q029 | /references/session-4-slides.pdf#page=10 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q030 | /references/session-4-slides.pdf#page=11 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q031 | /references/session-4-slides.pdf#page=11 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q032 | /references/session-4-slides.pdf#page=11 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q033 | /references/session-4-slides.pdf#page=11 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q034 | /references/session-4-slides.pdf#page=11 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q035 | /references/session-4-slides.pdf#page=11 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q036 | /references/session-4-slides.pdf#page=12 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q037 | /references/session-4-slides.pdf#page=12 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q038 | /references/session-4-slides.pdf#page=12 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q039 | /references/session-4-slides.pdf#page=15 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q040 | /references/session-4-slides.pdf#page=15 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q041 | /references/session-4-slides.pdf#page=15 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q042 | /references/session-4-slides.pdf#page=15 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q043 | /references/session-4-slides.pdf#page=15 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q044 | https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q045 | /references/session-4-slides.pdf#page=13 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q046 | /references/session-4-slides.pdf#page=13 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q047 | https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q048 | https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q049 | /references/session-4-slides.pdf#page=13 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q050 | /references/session-4-slides.pdf#page=14 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q051 | https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q052 | /references/session-4-slides.pdf#page=14 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q053 | https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q054 | /references/session-4-slides.pdf#page=16 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q055 | /references/session-4-slides.pdf#page=16 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q056 | /references/session-4-slides.pdf#page=16 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q057 | /references/session-4-slides.pdf#page=16 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q058 | /references/session-4-slides.pdf#page=16 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q059 | /references/session-4-slides.pdf#page=17 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q060 | /references/session-4-slides.pdf#page=17 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q061 | /references/session-4-slides.pdf#page=17 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q062 | /references/session-4-slides.pdf#page=17 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q063 | /references/session-4-slides.pdf#page=17 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q064 | /references/session-4-slides.pdf#page=19 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q065 | /references/session-4-slides.pdf#page=18 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q066 | /references/session-4-slides.pdf#page=18 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q067 | /references/session-4-slides.pdf#page=18 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q068 | /references/session-4-slides.pdf#page=18 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q069 | /references/session-4-slides.pdf#page=18 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q070 | /references/session-4-slides.pdf#page=16 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q071 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q072 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q073 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q074 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q075 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q076 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q077 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q078 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q079 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q080 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q081 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q082 | /references/session-4-slides.pdf#page=21 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q083 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q084 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q085 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q086 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q087 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q088 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q089 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q090 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q091 | /references/session-4-slides.pdf#page=22 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q092 | /references/session-4-slides.pdf#page=23 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q093 | /references/session-4-slides.pdf#page=23 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q094 | /references/session-4-slides.pdf#page=23 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q095 | /references/session-4-slides.pdf#page=23 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q096 | /references/session-4-slides.pdf#page=23 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q097 | /references/session-4-slides.pdf#page=24 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q098 | /references/session-4-slides.pdf#page=24 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q099 | /references/session-4-slides.pdf#page=24 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q100 | /references/session-4-slides.pdf#page=24 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q101 | /references/session-4-slides.pdf#page=25 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q102 | /references/session-4-slides.pdf#page=25 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q103 | /references/session-4-slides.pdf#page=25 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q104 | /references/session-4-slides.pdf#page=26 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q105 | /references/session-4-slides.pdf#page=26 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q106 | /references/session-4-slides.pdf#page=26 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q107 | /references/session-4-slides.pdf#page=26 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q108 | /references/session-4-slides.pdf#page=26 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q109 | /references/session-4-slides.pdf#page=27 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q110 | /references/session-4-slides.pdf#page=27 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q111 | /references/session-4-slides.pdf#page=27 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q112 | /references/session-4-slides.pdf#page=28 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q113 | /references/session-4-slides.pdf#page=28 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q114 | https://bitcoin.org/bitcoin.pdf#page=6 | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q115 | /references/session-4-slides.pdf#page=28 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q116 | /references/session-4-slides.pdf#page=28 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q117 | /references/session-4-slides.pdf#page=28 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q118 | /references/session-4-slides.pdf#page=9 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q119 | /references/session-4-slides.pdf#page=29 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q120 | /references/session-4-slides.pdf#page=29 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q121 | /references/session-4-slides.pdf#page=29 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q122 | /references/session-4-slides.pdf#page=30 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q123 | https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q124 | /references/session-4-slides.pdf#page=30 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q125 | /references/session-4-slides.pdf#page=30 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q126 | /references/session-4-slides.pdf#page=31 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q127 | /references/session-4-slides.pdf#page=31 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q128 | /references/session-4-slides.pdf#page=31 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q129 | /references/session-4-slides.pdf#page=32 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q130 | /references/session-4-slides.pdf#page=32 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q131 | /references/session-4-slides.pdf#page=32 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q132 | /references/session-4-slides.pdf#page=33 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q133 | /references/session-4-slides.pdf#page=33 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q134 | /references/session-4-slides.pdf#page=33 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q135 | /references/session-4-slides.pdf#page=33 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q136 | /references/session-4-slides.pdf#page=33 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q137 | /references/session-4-slides.pdf#page=33 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q138 | /references/session-4-slides.pdf#page=34 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q139 | /references/session-4-slides.pdf#page=34 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q140 | /references/session-4-slides.pdf#page=34 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q141 | /references/session-4-slides.pdf#page=34 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q142 | /references/session-4-slides.pdf#page=35 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q143 | /references/session-4-slides.pdf#page=35 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q144 | /references/session-4-slides.pdf#page=35 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q145 | /references/session-4-slides.pdf#page=35 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q146 | /references/session-4-slides.pdf#page=36 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q147 | /references/session-4-slides.pdf#page=36 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q148 | /references/session-4-slides.pdf#page=36 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q149 | /references/session-4-slides.pdf#page=36 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q150 | /references/session-4-slides.pdf#page=36 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q151 | /references/session-4-slides.pdf#page=36 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q152 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q153 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q154 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q155 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q156 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q157 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q158 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q159 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q160 | https://developer.bitcoin.org/reference/block_chain.html | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q161 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q162 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q163 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q164 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q165 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q166 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q167 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q168 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q169 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q170 | /references/session-4-worksheet.pdf#page=3 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q171 | /references/session-4-worksheet.pdf#page=3 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q172 | /references/session-4-worksheet.pdf#page=3 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q173 | /references/session-4-worksheet.pdf#page=3 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q174 | /references/session-4-worksheet.pdf#page=3 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q175 | /references/session-4-slides.pdf#page=4 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q176 | https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki | A | Giữ URL; đối chiếu nội dung khi audit học thuật. |
| blockchain | session-4 | bc-session4-q177 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q178 | /references/session-4-worksheet.pdf#page=1 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q179 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q180 | /references/session-4-worksheet.pdf#page=2 | B | Giữ PDF và trang hiện có. |
| blockchain | session-4 | bc-session4-q181 | /references/session-4-worksheet.pdf#page=3 | B | Giữ PDF và trang hiện có. |
| blockchain | session-5 | bc-s5-q01 | Session 5, slide 5 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q02 | Session 5, slide 6 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q03 | Session 5, slide 6 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q04 | Session 5, slide 7 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q05 | Session 5, slide 7 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q06 | Session 5, slide 7 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q07 | Session 5, slides 8-9 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q08 | Session 5, slide 9 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q09 | Session 5, slide 10 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q10 | Lab 5, Q1; Session 5, slide 10 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q11 | Session 5, slides 10 and 22 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q12 | Session 5, slide 11 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q13 | Session 5, slide 12 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q14 | Session 5, slide 13; Lab 5, Q5 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q15 | Session 5, slide 13 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q16 | Session 5, slide 14 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q17 | Session 5, slide 15 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q18 | Session 5, slide 15 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q19 | Session 5, slide 15 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q20 | Session 5, slide 17 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q21 | Session 5, slides 16-17; Lab 5.3 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q22 | Session 5, slides 16-17 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q23 | Session 5, slides 16-17 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q24 | Session 5, slide 17 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q25 | Lab 5, Q3; Session 5, slide 17 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q26 | Lab 5, Q2; Session 5, slide 15 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q27 | Lab 5, Q4; Session 5, slide 17 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q28 | Session 5, slide 18 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q29 | Session 5, slide 18 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q30 | Session 5, slide 18 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q31 | Session 5, slide 20 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q32 | Session 5, slides 18 and 20 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q33 | Session 5, slide 21 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q34 | Session 5, slide 21 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q35 | Session 5, slide 22 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q36 | Session 5, slide 22; Lab 5, Q6 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q37 | Lab 5, Q6; Session 5, slide 22 | D | Giữ trích dẫn; cần slide và Lab 5, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-5 | bc-s5-q38 | Session 5, slide 23 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q39 | Session 5, slide 23 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q40 | Session 5, slide 25 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q41 | Session 5, slide 25 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q42 | Session 5, slide 26 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q43 | Session 5, slide 26 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q44 | Session 5, slide 27 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q45 | Session 5, slide 27 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q46 | Session 5, slide 27 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q47 | Session 5, slide 29 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q48 | Session 5, slide 29 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q49 | Session 5, slide 30 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q50 | Session 5, slide 30 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q51 | Session 5, slide 31 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q52 | Session 5, slide 31 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q53 | Session 5, slide 32 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q54 | Session 5, slides 32-33 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q55 | Session 5, slide 33 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q56 | Session 5, slide 32 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q57 | Session 5, slide 33 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q58 | Session 5, slide 34 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q59 | Session 5, slide 34 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q60 | Session 5, slide 34 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q61 | Session 5, slide 35 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q62 | Session 5, slide 35 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q63 | Session 5, slide 36 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q64 | Session 5, slide 36 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-5 | bc-s5-q65 | Session 5, slide 36 | D | Giữ trích dẫn; cần slide Session 5, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q01 | Session 6, slide 6 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q02 | Session 6, slide 6 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q03 | Session 6, slide 6 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q04 | Session 6, slide 6 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q05 | Session 6, slide 8 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q06 | Session 6, slide 8 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q07 | Session 6, slide 8 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q08 | Session 6, slide 9 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q09 | Session 6, slide 9 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q10 | Session 6, slides 9 and 23 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q11 | Session 6, slide 10 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q12 | Session 6, slide 10 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q13 | Session 6, slide 10 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q14 | Session 6, slide 11 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q15 | Session 6, slide 12 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q16 | Session 6, slide 12 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q17 | Session 6, slide 12 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q18 | Session 6, slide 12 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q19 | Session 6, slide 13 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q20 | Session 6, slide 13 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q21 | Session 6, slide 13 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q22 | Session 6, slide 13 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q23 | Session 6, slide 14 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q24 | Session 6, slides 14 and 17–18 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q25 | Session 6, slide 14 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q26 | Session 6, slide 14 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q27 | Session 6, slide 15 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q28 | Session 6, slide 15 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q29 | Session 6, slide 16 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q30 | Session 6, slide 16 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q31 | Session 6, slide 16 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q32 | Session 6, slide 16 and Lab 6 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q33 | Session 6, slide 18 and Lab Q2 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q34 | Session 6, slide 18 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q35 | Session 6, slides 9, 17–18 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q36 | Session 6, slide 18 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q37 | Session 6, slide 18 and Lab Q2 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q38 | Session 6, slide 19 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q39 | Session 6, slide 19 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q40 | Session 6, slides 19 and 37 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q41 | Session 6, slide 20 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q42 | Session 6, slide 20 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q43 | Session 6, slide 21 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q44 | Session 6, slide 21 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q45 | Session 6, slide 21 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q46 | Session 6, slide 22 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q47 | Session 6, slide 22 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q48 | Session 6, slide 22 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q49 | Session 6, slide 23 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q50 | Session 6, slide 23 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q51 | Session 6, slide 23 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q52 | Session 6, slide 23 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q53 | Session 6, slide 26 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q54 | Session 6, slide 27 and Lab fallback | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q55 | Session 6, slides 27 and 35; Lab 6 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q56 | Session 6, slide 28 and Lab setup | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q57 | Session 6, slide 28 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q58 | Session 6, slide 29 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q59 | Session 6, slide 29 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q60 | Session 6, slide 35 and Lab 6 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q61 | Session 6, slide 30 and Lab Q1 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q62 | Session 6, slide 31 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q63 | Session 6, slide 31 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q64 | Session 6, slide 31 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q65 | Session 6, slide 32 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q66 | Session 6, slide 32 and Lab tests | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q67 | Session 6, slide 32 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q68 | Session 6, slide 33 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q69 | Session 6, slide 34 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q70 | Session 6, slide 35 and Lab setup | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q71 | Session 6, slide 36 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q72 | Session 6, slide 36 and Lab Q4 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q73 | Session 6, slide 36 and Lab Q4 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q74 | Session 6, slide 37 and Lab 6.3 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q75 | Session 6, slide 37 | D | Giữ trích dẫn; cần slide Session 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q76 | Session 6, slide 37 and Lab Q5 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q77 | Session 6, slide 37 and Lab Q5 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q78 | Session 6, slide 30 and Lab Q1 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q79 | Lab 6.1 | D | Giữ trích dẫn; cần Lab 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q80 | Lab 6.1 | D | Giữ trích dẫn; cần Lab 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q81 | Session 6, slide 15 and Lab Q3 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-6 | bc-s6-q82 | Lab 6.1 | D | Giữ trích dẫn; cần Lab 6, rồi ánh xạ trang. |
| blockchain | session-6 | bc-s6-q83 | Session 6, slide 32 and Lab 6.1 | D | Giữ trích dẫn; cần slide và Lab 6, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q01 | Session 7, slide 6 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q02 | Session 7, slide 6 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q03 | Session 7, slides 6–7 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q04 | Session 7, slide 7 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q05 | Session 7, slide 7 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q06 | Session 7, slide 8; Lab 7, Q2 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q07 | Session 7, slide 8 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q08 | Session 7, slides 9–11; Lab 7, Q3 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q09 | Session 7, slide 9; Lab 7, Q3 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q10 | Session 7, slide 11 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q11 | Session 7, slide 12; Lab 7, Q3 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q12 | Session 7, slide 13 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q13 | Session 7, slide 13 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q14 | Session 7, slide 14 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q15 | Session 7, slide 14 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q16 | Session 7, slide 15 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q17 | Session 7, slide 16; Lab 7, Q1 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q18 | Session 7, slide 17 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q19 | Session 7, slide 18 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q20 | Session 7, slide 18 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q21 | Session 7, slide 19 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q22 | Session 7, slide 19 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q23 | Session 7, slide 20; Lab 7, Q7 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q24 | Session 7, slide 20; Lab 7, page 4 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q25 | Session 7, slide 20; Lab 7, Q7 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q26 | Session 7, slide 23 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q27 | Session 7, slide 23 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q28 | Session 7, slide 23 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q29 | Session 7, slide 24; Lab 7, Q5 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q30 | Session 7, slide 24 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q31 | Session 7, slide 24 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q32 | Session 7, slide 25 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q33 | Session 7, slide 25; Lab 7, page 2 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q34 | Session 7, slide 27; Lab 7, Q4 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q35 | Session 7, slides 27–28; Lab 7, Q4 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q36 | Session 7, slide 28; Lab 7, page 2 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q37 | Session 7, slide 29 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q38 | Session 7, slide 29 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q39 | Session 7, slide 30 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q40 | Session 7, slide 30 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q41 | Session 7, slide 30 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q42 | Session 7, slide 31 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q43 | Session 7, slide 32 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q44 | Session 7, slide 32 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q45 | Session 7, slide 34 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q46 | Session 7, slide 34 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q47 | Session 7, slide 34 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q48 | Session 7, slide 34 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q49 | Session 7, slide 34 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q50 | Session 7, slide 35 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q51 | Session 7, slide 35 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q52 | Session 7, slide 35 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q53 | Session 7, slide 36 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q54 | Session 7, slide 36 | D | Giữ trích dẫn; cần slide Session 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q55 | Lab 7, page 1 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q56 | Lab 7, page 1 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q57 | Lab 7, page 1 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q58 | Session 7, slide 39; Lab 7, page 1 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q59 | Lab 7, page 2 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q60 | Session 7, slide 39; Lab 7, page 2 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q61 | Lab 7, page 2 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q62 | Lab 7, page 2 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q63 | Lab 7, page 2 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q64 | Lab 7, pages 2–3 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q65 | Session 7, slide 39; Lab 7, page 2 | D | Giữ trích dẫn; cần slide và Lab 7, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-7 | bc-s7-q66 | Lab 7, page 3; Lab 7, Q6 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q67 | Lab 7, pages 3–4 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-7 | bc-s7-q68 | Lab 7, page 4 | D | Giữ trích dẫn; cần Lab 7, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q01 | Session 8, slides 4–5 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q02 | Session 8, slide 7 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q03 | Session 8, slide 7 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q04 | Session 8, slides 5 and 18 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q05 | Session 8, slide 5 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q06 | Session 8, slide 9 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q07 | Session 8, slides 8–9 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q08 | Session 8, slide 9 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q09 | Session 8, slides 8–9 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q10 | Session 8, slide 10 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q11 | Session 8, slide 10 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q12 | Session 8, slide 10 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q13 | Session 8, slide 11 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q14 | Session 8, slide 11 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q15 | Session 8, slide 12 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q16 | Session 8, slides 12–13 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q17 | Session 8, slide 13 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q18 | Session 8, slide 13 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q19 | Session 8, slide 13 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q20 | Session 8, slide 14 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q21 | Session 8, slide 14 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q22 | Session 8, slide 14 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q23 | Session 8, slide 15 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q24 | Session 8, slide 15 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q25 | Session 8, slide 16 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q26 | Session 8, slide 16 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q27 | Session 8, slide 17 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q28 | Session 8, slide 17 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q29 | Session 8, slide 17 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q30 | Session 8, slide 17 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q31 | Session 8, slide 17 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q32 | Session 8, slide 18 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q33 | Session 8, slide 18 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q34 | Session 8, slide 18 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q35 | Session 8, slide 19 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q36 | Session 8, slide 19 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q37 | Session 8, slide 19 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q38 | Session 8, slide 20 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q39 | Session 8, slide 20 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q40 | Session 8, slide 20 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q41 | Session 8, slide 20 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q42 | Session 8, slide 21 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q43 | Session 8, slide 21 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q44 | Session 8, slide 21 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q45 | Session 8, slide 21 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q46 | Session 8, slide 21 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q47 | Session 8, slides 23–24 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q48 | Session 8, slide 25 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q49 | Session 8, slide 25 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q50 | Session 8, slide 25 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q51 | Session 8, slide 26 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q52 | Session 8, slide 26 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q53 | Session 8, slide 26 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q54 | Session 8, slide 27 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q55 | Session 8, slide 27 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q56 | Session 8, slide 27 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q57 | Session 8, slide 27 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q58 | Session 8, slide 28 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q59 | Session 8, slide 28 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q60 | Session 8, slide 28 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q61 | Session 8, slide 29 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q62 | Session 8, slide 30 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q63 | Session 8, slide 30 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q64 | Session 8, slide 31 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q65 | Session 8, slide 31 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q66 | Session 8, slide 32 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q67 | Session 8, slide 33 and Lab 8 page 1 | D | Giữ trích dẫn; cần slide và Lab 8, rồi ánh xạ từng tài liệu/trang. |
| blockchain | session-8 | bc-s8-q68 | Lab 8, target and Lab 08.1 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q69 | Lab 8, Q1 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q70 | Lab 8, Q1 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q71 | Lab 8, Q2 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q72 | Lab 8, Q3 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q73 | Lab 8, Q4 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q74 | Lab 8, Lab 08.3 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q75 | Lab 8, Q5 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q76 | Lab 8, Lab 08.4 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q77 | Lab 8, Q6 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q78 | Lab 8, pass condition and Lab 08.2 | D | Giữ trích dẫn; cần Lab 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q79 | Session 8, synthesis of slides 14–30 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| blockchain | session-8 | bc-s8-q80 | Session 8, slides 24–32 | D | Giữ trích dẫn; cần slide Session 8, rồi ánh xạ trang. |
| database | chapter-2 | db-ch2-1-q01 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-01 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-02 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-03 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-04 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-05 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-06 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-07 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-08 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-09 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-10 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-11 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-12 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-13 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-14 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-15 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-16 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-17 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-18 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-19 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-20 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-21 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-22 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-23 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-24 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-original-25 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-001 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-002 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-003 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-004 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-005 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-006 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-007 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-008 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-009 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-010 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-011 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-012 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-013 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-014 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-015 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-016 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-017 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-018 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-019 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-020 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-021 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-022 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-023 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-024 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-025 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-026 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-027 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-028 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-029 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-030 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-031 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-032 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-033 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-034 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-035 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-036 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-037 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-038 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-039 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-040 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-041 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-042 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-043 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-044 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-045 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-046 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-047 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-048 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-049 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-050 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-051 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-052 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-053 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-054 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-055 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-056 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-057 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-058 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-059 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-060 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-061 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-062 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
| database | session-2 | db-s2-063 | — | — | Chưa có nguồn; xác định tài liệu gốc trước khi thêm. |
