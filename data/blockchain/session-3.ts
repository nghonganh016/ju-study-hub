import type { Chapter } from "@/types/quiz";

// Câu hỏi và đáp án do Ju cung cấp; giải thích đối chiếu nguồn sơ cấp ngày 06/10/2026.
// Xem docs/session-3-sources.md về phạm vi nguồn, phép tính và các giới hạn của bài lab.
export const session3: Chapter = {
    "id": "session-3",
    "title": "Session 3: Hash, chữ ký số và ví HD",
    "description": "151 câu ôn tập Session 3 và Lab 3.1–3.3: Hash, Merkle tree, chữ ký số, ví HD và địa chỉ blockchain.",
    "revision": 2,
    "questions": [
        {
            "id": "bc-session3-q001",
            "prompt": "Một cryptographic hash function như SHA-256 nhận đầu vào như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ nhận đúng 256 bit"
                },
                {
                    "id": "b",
                    "text": "Nhận dữ liệu có độ dài bất kỳ và cho đầu ra 256 bit"
                },
                {
                    "id": "c",
                    "text": "Nhận private key và trả public key"
                },
                {
                    "id": "d",
                    "text": "Chỉ nhận chuỗi ký tự"
                }
            ],
            "correctOptionId": "b",
            "explanation": "SHA-256 nhận dữ liệu có độ dài thay đổi nhưng luôn trả 256 bit. Chính xác hơn, chuẩn giới hạn đầu vào dưới 2^64 bit; không yêu cầu đúng 256 bit.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q002",
            "prompt": "Tính chất deterministic của hash có nghĩa là:",
            "options": [
                {
                    "id": "a",
                    "text": "Hai input khác nhau luôn cho cùng hash"
                },
                {
                    "id": "b",
                    "text": "Cùng input luôn cho cùng hash"
                },
                {
                    "id": "c",
                    "text": "Hash thay đổi ngẫu nhiên mỗi lần chạy"
                },
                {
                    "id": "d",
                    "text": "Có thể giải ngược hash về input"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Thuật toán không dùng ngẫu nhiên khi băm: cùng dãy byte đầu vào luôn cho cùng kết quả, dù chạy nhiều lần.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q003",
            "prompt": "\"Fast forward\" của hash function nghĩa là:",
            "options": [
                {
                    "id": "a",
                    "text": "Dễ dàng tìm input từ hash"
                },
                {
                    "id": "b",
                    "text": "Việc tính H(m) phải tương đối nhanh"
                },
                {
                    "id": "c",
                    "text": "Hash phải có độ dài thay đổi"
                },
                {
                    "id": "d",
                    "text": "Collision phải dễ tìm"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tính xuôi H(m) phải hiệu quả để sử dụng thực tế. Khó tìm ngược đầu vào không có nghĩa là việc băm cũng chậm.",
            "source": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf"
        },
        {
            "id": "bc-session3-q004",
            "prompt": "Với SHA-256, dù input là 1 byte hay 1 GB, output có độ dài:",
            "options": [
                {
                    "id": "a",
                    "text": "Phụ thuộc input"
                },
                {
                    "id": "b",
                    "text": "128 bit"
                },
                {
                    "id": "c",
                    "text": "256 bit"
                },
                {
                    "id": "d",
                    "text": "512 bit"
                }
            ],
            "correctOptionId": "c",
            "explanation": "256 bit bằng 32 byte. Đây là kích thước đầu ra cố định của SHA-256, không phụ thuộc độ dài dữ liệu được băm.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q005",
            "prompt": "Avalanche effect mô tả hiện tượng nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Input tăng gấp đôi thì hash tăng gấp đôi"
                },
                {
                    "id": "b",
                    "text": "Thay đổi rất nhỏ ở input có thể làm nhiều bit output thay đổi"
                },
                {
                    "id": "c",
                    "text": "Hai hash gần nhau có input gần nhau"
                },
                {
                    "id": "d",
                    "text": "Hash có thể giải ngược"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Hiệu ứng lan truyền mô tả việc một thay đổi nhỏ lan ra nhiều bit của giá trị băm. Nó không làm đầu ra dài hơn.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q006",
            "prompt": "Nếu thay đổi 1 bit của input SHA-256, trung bình khoảng bao nhiêu bit output có thể thay đổi?",
            "options": [
                {
                    "id": "a",
                    "text": "1"
                },
                {
                    "id": "b",
                    "text": "16"
                },
                {
                    "id": "c",
                    "text": "Khoảng 128"
                },
                {
                    "id": "d",
                    "text": "Chính xác 256"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trong mô hình đầu ra lý tưởng, mỗi bit có xác suất đổi khoảng 1/2, nên kỳ vọng là 256 × 1/2 = 128 bit. Đây không phải số cố định mỗi lần.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q007",
            "prompt": "Preimage resistance yêu cầu điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Biết m, khó tìm H(m)"
                },
                {
                    "id": "b",
                    "text": "Biết h, khó tìm m sao cho H(m)=h"
                },
                {
                    "id": "c",
                    "text": "Khó tìm hai public key giống nhau"
                },
                {
                    "id": "d",
                    "text": "Không thể tính hash nhiều lần"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Kháng tiền ảnh: biết giá trị băm h nhưng khó tìm bất kỳ đầu vào m nào cho H(m) = h.",
            "source": "https://csrc.nist.gov/projects/hash-functions"
        },
        {
            "id": "bc-session3-q008",
            "prompt": "Second-preimage resistance là:",
            "options": [
                {
                    "id": "a",
                    "text": "Với m_1 cho trước, khó tìm m_2≠ m_1 có cùng hash"
                },
                {
                    "id": "b",
                    "text": "Khó tìm bất kỳ hai input trùng nhau"
                },
                {
                    "id": "c",
                    "text": "Khó tìm public key từ private key"
                },
                {
                    "id": "d",
                    "text": "Khó tính SHA-256"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Kháng tiền ảnh thứ hai: đầu vào m₁ đã được cố định; cần tìm m₂ khác nó nhưng có cùng giá trị băm.",
            "source": "https://csrc.nist.gov/projects/hash-functions"
        },
        {
            "id": "bc-session3-q009",
            "prompt": "Collision resistance yêu cầu:",
            "options": [
                {
                    "id": "a",
                    "text": "Không tồn tại collision"
                },
                {
                    "id": "b",
                    "text": "Khó tìm bất kỳ m_1≠ m_2 sao cho H(m_1)=H(m_2)"
                },
                {
                    "id": "c",
                    "text": "Hash phải bí mật"
                },
                {
                    "id": "d",
                    "text": "Không ai được biết thuật toán hash"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Kháng va chạm: khó tìm hai đầu vào khác nhau có cùng giá trị băm, ngay cả khi được tự chọn cả hai.",
            "source": "https://csrc.nist.gov/projects/hash-functions"
        },
        {
            "id": "bc-session3-q010",
            "prompt": "Phát biểu nào chính xác?",
            "options": [
                {
                    "id": "a",
                    "text": "Collision của SHA-256 về toán học không thể tồn tại"
                },
                {
                    "id": "b",
                    "text": "Collision chắc chắn tồn tại về nguyên lý, nhưng phải rất khó tìm"
                },
                {
                    "id": "c",
                    "text": "Mỗi input có output dài tùy ý"
                },
                {
                    "id": "d",
                    "text": "Collision và preimage là cùng một bài toán"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đầu vào nhiều hơn 2^256 đầu ra có thể có, nên va chạm phải tồn tại. An toàn mật mã đòi hỏi khó tìm được chúng.",
            "source": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf"
        },
        {
            "id": "bc-session3-q011",
            "prompt": "Độ khó lý tưởng của preimage attack đối với hash 256 bit xấp xỉ:",
            "options": [
                {
                    "id": "a",
                    "text": "2^32"
                },
                {
                    "id": "b",
                    "text": "2^64"
                },
                {
                    "id": "c",
                    "text": "2^128"
                },
                {
                    "id": "d",
                    "text": "2^256"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Với hàm băm lý tưởng 256 bit, tìm tiền ảnh bằng thử vét cạn có độ khó cỡ 2^256 phép thử cổ điển.",
            "source": "https://csrc.nist.gov/projects/hash-functions"
        },
        {
            "id": "bc-session3-q012",
            "prompt": "Độ khó collision attack đối với hash 256 bit xấp xỉ:",
            "options": [
                {
                    "id": "a",
                    "text": "2^64"
                },
                {
                    "id": "b",
                    "text": "2^128"
                },
                {
                    "id": "c",
                    "text": "2^192"
                },
                {
                    "id": "d",
                    "text": "2^256"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tìm một cặp va chạm lý tưởng chỉ cần cỡ 2^(256/2) = 2^128 phép thử, thấp hơn tìm tiền ảnh cụ thể.",
            "source": "https://csrc.nist.gov/projects/hash-functions"
        },
        {
            "id": "bc-session3-q013",
            "prompt": "Vì sao collision attack có độ phức tạp khoảng 2^128 thay vì 2^256?",
            "options": [
                {
                    "id": "a",
                    "text": "Do elliptic curve"
                },
                {
                    "id": "b",
                    "text": "Do birthday bound"
                },
                {
                    "id": "c",
                    "text": "Do Merkle tree"
                },
                {
                    "id": "d",
                    "text": "Do ECDSA"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Sau q giá trị băm có khoảng q²/2 cặp để so sánh. Vì thế ngưỡng va chạm xuất hiện ở q cỡ √(2^256) = 2^128.",
            "source": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf"
        },
        {
            "id": "bc-session3-q014",
            "prompt": "Trong ba tính chất bảo mật của hash, slide xem tính chất nào là \"weakest link\" xét theo số phép thử?",
            "options": [
                {
                    "id": "a",
                    "text": "Preimage resistance"
                },
                {
                    "id": "b",
                    "text": "Second-preimage resistance"
                },
                {
                    "id": "c",
                    "text": "Collision resistance"
                },
                {
                    "id": "d",
                    "text": "Determinism"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trong so sánh lý tưởng của câu hỏi, va chạm có mức 128 bit, thấp hơn tiền ảnh 256 bit. Đây không phải tuyên bố SHA-256 đã bị phá.",
            "source": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf"
        },
        {
            "id": "bc-session3-q015",
            "prompt": "Hashing khác encryption ở điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Hashing luôn cần secret key"
                },
                {
                    "id": "b",
                    "text": "Hashing được thiết kế one-way và không cần key"
                },
                {
                    "id": "c",
                    "text": "Encryption không thể giải ngược"
                },
                {
                    "id": "d",
                    "text": "Hashing giữ bí mật message"
                }
            ],
            "correctOptionId": "b",
            "explanation": "SHA-256 là phép băm không khóa, không có thao tác giải mã để lấy lại thông điệp. Mã hóa có thể giải mã khi có khóa phù hợp.",
            "source": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf"
        },
        {
            "id": "bc-session3-q016",
            "prompt": "Bitcoin chủ yếu sử dụng họ hash nào trong các nội dung của Session 3?",
            "options": [
                {
                    "id": "a",
                    "text": "MD5"
                },
                {
                    "id": "b",
                    "text": "SHA-1"
                },
                {
                    "id": "c",
                    "text": "SHA-256"
                },
                {
                    "id": "d",
                    "text": "bcrypt"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Bitcoin dùng SHA-256, thường băm hai lần cho mã giao dịch. RIPEMD-160 xuất hiện ở một số bước khác, chẳng hạn tạo địa chỉ P2PKH.",
            "source": "https://developer.bitcoin.org/devguide/transactions.html"
        },
        {
            "id": "bc-session3-q017",
            "prompt": "Ethereum sử dụng hàm nào trong Solidity?",
            "options": [
                {
                    "id": "a",
                    "text": "NIST SHA3-256 hoàn toàn giống Keccak-256"
                },
                {
                    "id": "b",
                    "text": "Keccak-256"
                },
                {
                    "id": "c",
                    "text": "RIPEMD-160 duy nhất"
                },
                {
                    "id": "d",
                    "text": "MD5"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Solidity có hàm keccak256 cho phép băm dùng phổ biến trong Ethereum. Solidity cũng hỗ trợ SHA-256; câu này không có nghĩa chỉ tồn tại một hàm băm.",
            "source": "https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions"
        },
        {
            "id": "bc-session3-q018",
            "prompt": "Phát biểu đúng về Keccak-256 và NIST SHA3-256 là:",
            "options": [
                {
                    "id": "a",
                    "text": "Hoàn toàn giống nhau"
                },
                {
                    "id": "b",
                    "text": "Không liên quan"
                },
                {
                    "id": "c",
                    "text": "Có quan hệ nhưng khác padding, nên không phải cùng một hàm"
                },
                {
                    "id": "d",
                    "text": "Ethereum dùng cả hai thay thế lẫn nhau"
                }
            ],
            "correctOptionId": "c",
            "explanation": "SHA3-256 dùng cùng họ cấu trúc Keccak nhưng thêm các bit phân biệt miền trước khi đệm. Vì vậy không thể thay Keccak-256 của Ethereum bằng NIST SHA3-256.",
            "source": "https://keccak.team/keccak_specs_summary.html"
        },
        {
            "id": "bc-session3-q019",
            "prompt": "RIPEMD-160 xuất hiện trong Session 3 chủ yếu liên quan tới:",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum mining"
                },
                {
                    "id": "b",
                    "text": "Bitcoin address"
                },
                {
                    "id": "c",
                    "text": "ECDSA nonce"
                },
                {
                    "id": "d",
                    "text": "BIP39 checksum"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Địa chỉ Bitcoin P2PKH dùng HASH160 của khóa công khai, tức SHA-256 rồi RIPEMD-160. Bước RIPEMD-160 tạo kết quả 20 byte.",
            "source": "https://developer.bitcoin.org/reference/transactions.html#address-conversion"
        },
        {
            "id": "bc-session3-q020",
            "prompt": "Trong block linking, block k+1 lưu:",
            "options": [
                {
                    "id": "a",
                    "text": "Private key của block k"
                },
                {
                    "id": "b",
                    "text": "Hash của block trước"
                },
                {
                    "id": "c",
                    "text": "Toàn bộ blockchain"
                },
                {
                    "id": "d",
                    "text": "Public key của miner trước"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Header của block lưu giá trị băm header block trước. Liên kết này buộc mỗi block tham chiếu một lịch sử cụ thể.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q021",
            "prompt": "Nếu dữ liệu trong block k thay đổi, điều gì xảy ra đầu tiên?",
            "options": [
                {
                    "id": "a",
                    "text": "Private key thay đổi"
                },
                {
                    "id": "b",
                    "text": "Hash của block k thay đổi"
                },
                {
                    "id": "c",
                    "text": "ChainID thay đổi"
                },
                {
                    "id": "d",
                    "text": "Hash block k+1 tự động được sửa"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Sửa giao dịch làm đổi giá trị băm của nó, lan lên Merkle root rồi ảnh hưởng hash header. Block sau không tự cập nhật tham chiếu cũ.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q022",
            "prompt": "Hashing tự nó chủ yếu cung cấp:",
            "options": [
                {
                    "id": "a",
                    "text": "Tamper-resistance hoàn chỉnh"
                },
                {
                    "id": "b",
                    "text": "Tamper-evidence"
                },
                {
                    "id": "c",
                    "text": "Confidentiality"
                },
                {
                    "id": "d",
                    "text": "Consensus"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Hash giúp phát hiện sửa đổi khi có giá trị gốc đáng tin để đối chiếu. Riêng hash không ngăn kẻ sửa dữ liệu tính lại toàn bộ hash.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q023",
            "prompt": "Consensus bổ sung điều gì cho khả năng phát hiện sửa đổi của hash?",
            "options": [
                {
                    "id": "a",
                    "text": "Làm message bí mật"
                },
                {
                    "id": "b",
                    "text": "Tạo chi phí để viết lại lịch sử"
                },
                {
                    "id": "c",
                    "text": "Loại bỏ hash"
                },
                {
                    "id": "d",
                    "text": "Tạo private key"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Với PoW, sửa lịch sử đòi hỏi làm lại công việc tính toán và đuổi kịp chuỗi trung thực. Riêng hash không tạo rào cản này.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q024",
            "prompt": "Trong Proof of Work, miner tìm nonce sao cho:",
            "options": [
                {
                    "id": "a",
                    "text": "H(block||nonce)>target"
                },
                {
                    "id": "b",
                    "text": "H(block||nonce)<target"
                },
                {
                    "id": "c",
                    "text": "nonce=target"
                },
                {
                    "id": "d",
                    "text": "H(block)=nonce"
                }
            ],
            "correctOptionId": "b",
            "explanation": "B là mô tả giản lược trong bài. Quy tắc Bitcoin chính xác là hash header ≤ target, không chỉ <; target là ngưỡng số mà kết quả phải đạt.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q025",
            "prompt": "Tại sao PoW cần preimage resistance?",
            "options": [
                {
                    "id": "a",
                    "text": "Để miner suy trực tiếp nonce từ target"
                },
                {
                    "id": "b",
                    "text": "Để miner buộc phải thử nhiều nonce thay vì giải ngược hash"
                },
                {
                    "id": "c",
                    "text": "Để public key không bị lộ"
                },
                {
                    "id": "d",
                    "text": "Để tạo seed phrase"
                }
            ],
            "correctOptionId": "b",
            "explanation": "PoW phải thử nhiều ứng viên để tìm hash dưới ngưỡng, thay vì giải ngược một hash duy nhất.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q026",
            "prompt": "Collision resistance đặc biệt quan trọng với transaction ID vì:",
            "options": [
                {
                    "id": "a",
                    "text": "Ta không muốn hai transaction khác nhau dễ có cùng txid"
                },
                {
                    "id": "b",
                    "text": "Txid phải giữ bí mật"
                },
                {
                    "id": "c",
                    "text": "Txid là private key"
                },
                {
                    "id": "d",
                    "text": "Txid dùng để sinh mnemonic"
                }
            ],
            "correctOptionId": "a",
            "explanation": "TXID là mã nhận diện giao dịch dựa trên hash. Hai giao dịch khác nhau dễ trùng TXID sẽ làm việc tham chiếu giao dịch mất tính đáng tin.",
            "source": "https://developer.bitcoin.org/devguide/transactions.html"
        },
        {
            "id": "bc-session3-q027",
            "prompt": "Nếu collision SHA-256 trở nên dễ tìm, một nguy cơ được slide nêu là:",
            "options": [
                {
                    "id": "a",
                    "text": "Hai transaction khác nhau có thể chia sẻ cùng txid"
                },
                {
                    "id": "b",
                    "text": "Mọi private key lập tức bằng 0"
                },
                {
                    "id": "c",
                    "text": "Mọi mnemonic bị xóa"
                },
                {
                    "id": "d",
                    "text": "ECDSA không còn cần public key"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Nếu dễ tạo va chạm cho cấu trúc hash dùng làm TXID, kẻ tấn công có thể gây nhập nhằng định danh giao dịch. Điều đó không đồng nghĩa tự tìm được khóa riêng.",
            "source": "https://csrc.nist.gov/projects/hash-functions"
        },
        {
            "id": "bc-session3-q028",
            "prompt": "Leaf của Merkle tree trong ví dụ transaction được tạo bằng:",
            "options": [
                {
                    "id": "a",
                    "text": "Tx_i+1"
                },
                {
                    "id": "b",
                    "text": "H(Tx_i)"
                },
                {
                    "id": "c",
                    "text": "Private key của Tx_i"
                },
                {
                    "id": "d",
                    "text": "Address của miner"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Lá chứa giá trị băm của giao dịch. Trong Bitcoin, đó là TXID từ phép băm hai lần, với quy tắc tuần tự hóa tương ứng.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q029",
            "prompt": "Một parent node trong binary Merkle tree thường được tạo bằng:",
            "options": [
                {
                    "id": "a",
                    "text": "H(left||right)"
                },
                {
                    "id": "b",
                    "text": "left+right không hash"
                },
                {
                    "id": "c",
                    "text": "H(left)"
                },
                {
                    "id": "d",
                    "text": "H(right)"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Ghép hai hash con theo thứ tự trái rồi phải, sau đó băm để tạo hash cha. Dấu || biểu thị phép nối dữ liệu.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q030",
            "prompt": "Khi một tầng Merkle tree Bitcoin có số node lẻ, quy tắc trong slide là:",
            "options": [
                {
                    "id": "a",
                    "text": "Xóa node cuối"
                },
                {
                    "id": "b",
                    "text": "Đưa node cuối thẳng lên root"
                },
                {
                    "id": "c",
                    "text": "Duplicate node cuối"
                },
                {
                    "id": "d",
                    "text": "Thêm một hash ngẫu nhiên"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Nếu một tầng có số hash lẻ và cần ghép tiếp, Bitcoin ghép hash cuối với chính nó. Không bỏ giao dịch cuối.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q031",
            "prompt": "Merkle root trong slide có kích thước:",
            "options": [
                {
                    "id": "a",
                    "text": "16 byte"
                },
                {
                    "id": "b",
                    "text": "20 byte"
                },
                {
                    "id": "c",
                    "text": "32 byte"
                },
                {
                    "id": "d",
                    "text": "64 byte"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Merkle root của Bitcoin là giá trị băm 256 bit, tức 32 byte, dù block có nhiều giao dịch.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q032",
            "prompt": "Nếu bất kỳ transaction nào trong tree thay đổi thì:",
            "options": [
                {
                    "id": "a",
                    "text": "Merkle root phải thay đổi"
                },
                {
                    "id": "b",
                    "text": "Chỉ leaf thay đổi"
                },
                {
                    "id": "c",
                    "text": "Root luôn giữ nguyên"
                },
                {
                    "id": "d",
                    "text": "Public key thay đổi"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Thay một giao dịch làm thay đổi các hash trên nhánh tới gốc, nếu không xảy ra va chạm. Chữ “phải” ở đáp án hiểu theo giả định mật mã này.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q033",
            "prompt": "Merkle root có thể được xem là:",
            "options": [
                {
                    "id": "a",
                    "text": "Một commitment tới toàn bộ transaction trong tree"
                },
                {
                    "id": "b",
                    "text": "Một private key"
                },
                {
                    "id": "c",
                    "text": "Một block reward"
                },
                {
                    "id": "d",
                    "text": "Một nonce mining"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Root là dấu cam kết gọn với các giao dịch và cách sắp xếp trong cây. Khó thay nội dung mà vẫn giữ root khi hàm băm còn an toàn.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q034",
            "prompt": "Để chứng minh Tx5 thuộc tree gồm 8 leaves, proof cần bao nhiêu sibling hashes?",
            "options": [
                {
                    "id": "a",
                    "text": "1"
                },
                {
                    "id": "b",
                    "text": "2"
                },
                {
                    "id": "c",
                    "text": "3"
                },
                {
                    "id": "d",
                    "text": "8"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Cây nhị phân đủ 8 lá có 3 tầng ghép. Mỗi tầng cần hash của nút anh em, nên đường chứng minh cần 3 hash.",
            "source": "https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof"
        },
        {
            "id": "bc-session3-q035",
            "prompt": "Vì sao câu trên là 3?",
            "options": [
                {
                    "id": "a",
                    "text": "8/2=4"
                },
                {
                    "id": "b",
                    "text": "log₂(8)=3"
                },
                {
                    "id": "c",
                    "text": "8-5=3"
                },
                {
                    "id": "d",
                    "text": "Vì hash dài 3 byte"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đếm số lần ghép: 8 → 4 → 2 → 1, tức 3 bước. Vì 2^3 = 8 nên log₂(8) = 3.",
            "source": "https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof"
        },
        {
            "id": "bc-session3-q036",
            "prompt": "Kích thước Merkle proof tăng theo:",
            "options": [
                {
                    "id": "a",
                    "text": "O(n)"
                },
                {
                    "id": "b",
                    "text": "O(n^2)"
                },
                {
                    "id": "c",
                    "text": "O(\\log n)"
                },
                {
                    "id": "d",
                    "text": "O(1/n)"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Với cây nhị phân cân bằng, mỗi tầng giảm khoảng một nửa số nút. Một bằng chứng chỉ đi dọc một nhánh, nên tăng theo log₂(n).",
            "source": "https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof"
        },
        {
            "id": "bc-session3-q037",
            "prompt": "Một tree có 1,024 transaction cần khoảng bao nhiêu hash trong proof?",
            "options": [
                {
                    "id": "a",
                    "text": "8"
                },
                {
                    "id": "b",
                    "text": "10"
                },
                {
                    "id": "c",
                    "text": "16"
                },
                {
                    "id": "d",
                    "text": "32"
                }
            ],
            "correctOptionId": "b",
            "explanation": "1.024 = 2^10, nên cây đủ có 10 tầng từ lá tới gốc. Cần một hash anh em ở mỗi tầng.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q038",
            "prompt": "Với 1,024 transaction và mỗi hash 32 byte, proof khoảng:",
            "options": [
                {
                    "id": "a",
                    "text": "32 bytes"
                },
                {
                    "id": "b",
                    "text": "160 bytes"
                },
                {
                    "id": "c",
                    "text": "320 bytes"
                },
                {
                    "id": "d",
                    "text": "1,024 bytes"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Tính riêng dữ liệu hash: 10 × 32 = 320 byte. Con số này chưa gồm giao dịch, vị trí nhánh hay thông tin đóng gói.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q039",
            "prompt": "Với khoảng 1,000,000 transaction, proof cần xấp xỉ:",
            "options": [
                {
                    "id": "a",
                    "text": "10 hashes"
                },
                {
                    "id": "b",
                    "text": "20 hashes"
                },
                {
                    "id": "c",
                    "text": "100 hashes"
                },
                {
                    "id": "d",
                    "text": "1,000 hashes"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Vì 2^19 < 1.000.000 < 2^20, cây cân bằng có độ sâu khoảng 20. Số hash thực tế phụ thuộc cách dựng và biểu diễn bằng chứng.",
            "source": "https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv"
        },
        {
            "id": "bc-session3-q040",
            "prompt": "20 hash 32 byte tương đương khoảng:",
            "options": [
                {
                    "id": "a",
                    "text": "320 bytes"
                },
                {
                    "id": "b",
                    "text": "512 bytes"
                },
                {
                    "id": "c",
                    "text": "640 bytes"
                },
                {
                    "id": "d",
                    "text": "1 MB"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Phép tính là 20 × 32 = 640 byte cho các hash. Không phải toàn bộ dữ liệu mà ví cần tải để kiểm tra giao dịch.",
            "source": "https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv"
        },
        {
            "id": "bc-session3-q041",
            "prompt": "Merkle proof chứng minh trực tiếp điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Transaction chắc chắn không gian lận"
                },
                {
                    "id": "b",
                    "text": "Transaction thuộc tập dữ liệu được Merkle root cam kết"
                },
                {
                    "id": "c",
                    "text": "Sender sở hữu private key"
                },
                {
                    "id": "d",
                    "text": "Block đã finality"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Bằng chứng khớp root chứng minh lá thuộc cây đó. Nó không tự chứng minh mọi giao dịch hợp lệ hoặc giao dịch đã đạt tính chung cuộc.",
            "source": "https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof"
        },
        {
            "id": "bc-session3-q042",
            "prompt": "Bitcoin SPV wallet dùng:",
            "options": [
                {
                    "id": "a",
                    "text": "Toàn bộ blockchain bắt buộc"
                },
                {
                    "id": "b",
                    "text": "Block header + Merkle proof"
                },
                {
                    "id": "c",
                    "text": "Chỉ mnemonic"
                },
                {
                    "id": "d",
                    "text": "Chỉ private key miner"
                }
            ],
            "correctOptionId": "b",
            "explanation": "SPV dùng chuỗi header có công tích lũy phù hợp và nhánh Merkle nối giao dịch tới root. Không tin một header tùy ý.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q043",
            "prompt": "Lợi ích chính của SPV là:",
            "options": [
                {
                    "id": "a",
                    "text": "Không cần chữ ký số"
                },
                {
                    "id": "b",
                    "text": "Xác minh membership mà không tải toàn bộ block"
                },
                {
                    "id": "c",
                    "text": "Không cần block header"
                },
                {
                    "id": "d",
                    "text": "Có thể đào Bitcoin miễn phí"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Ví tải header và bằng chứng liên quan thay vì toàn bộ block. SPV tiết kiệm dữ liệu nhưng không kiểm tra đầy đủ quy tắc như một nút đầy đủ.",
            "source": "https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv"
        },
        {
            "id": "bc-session3-q044",
            "prompt": "Ethereum sử dụng biến thể cây nào cho state?",
            "options": [
                {
                    "id": "a",
                    "text": "AVL tree"
                },
                {
                    "id": "b",
                    "text": "Merkle-Patricia trie"
                },
                {
                    "id": "c",
                    "text": "Red-black tree thuần túy"
                },
                {
                    "id": "d",
                    "text": "B-tree"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Ethereum biểu diễn trạng thái bằng modified Merkle-Patricia trie. Cấu trúc này kết hợp tra cứu theo khóa với cam kết bằng hash gốc.",
            "source": "https://ethereum.org/en/developers/docs/evm/"
        },
        {
            "id": "bc-session3-q045",
            "prompt": "Trong airdrop, lợi ích của Merkle tree là:",
            "options": [
                {
                    "id": "a",
                    "text": "Contract chỉ cần giữ một root thay vì toàn bộ allowlist lớn"
                },
                {
                    "id": "b",
                    "text": "Không cần address người dùng"
                },
                {
                    "id": "c",
                    "text": "Không cần transaction"
                },
                {
                    "id": "d",
                    "text": "Không cần gas"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Hợp đồng lưu root; người nhận nộp lá và bằng chứng để xác minh quyền nhận. Đây là cách áp dụng phép kiểm tra thành viên mà không lưu cả danh sách.",
            "source": "https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof"
        },
        {
            "id": "bc-session3-q046",
            "prompt": "Trong rollup, Merkle/root commitment có thể dùng để:",
            "options": [
                {
                    "id": "a",
                    "text": "Cam kết trạng thái hoặc dữ liệu L2 lên L1"
                },
                {
                    "id": "b",
                    "text": "Tạo mnemonic"
                },
                {
                    "id": "c",
                    "text": "Thay private key"
                },
                {
                    "id": "d",
                    "text": "Sinh ETH"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Rollup có thể đăng root đại diện trạng thái hoặc lô dữ liệu lên Ethereum. Root là cam kết; tính đúng đắn còn cần cơ chế chứng minh hoặc tranh chấp tương ứng.",
            "source": "https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/"
        },
        {
            "id": "bc-session3-q047",
            "prompt": "Proof-of-reserves của CEX có thể sử dụng Merkle tree để:",
            "options": [
                {
                    "id": "a",
                    "text": "Cam kết danh sách số dư khách hàng"
                },
                {
                    "id": "b",
                    "text": "Sinh mining nonce"
                },
                {
                    "id": "c",
                    "text": "Mã hóa password"
                },
                {
                    "id": "d",
                    "text": "Thay consensus"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Merkle tree gom các số dư thành root để khách hàng kiểm tra số dư mình có trong danh sách. Riêng cây không chứng minh sàn sở hữu đủ tài sản.",
            "source": "https://blog.kraken.com/news/proof-of-reserves-june-30-2025"
        },
        {
            "id": "bc-session3-q048",
            "prompt": "Trong ECC, G là:",
            "options": [
                {
                    "id": "a",
                    "text": "Gas price"
                },
                {
                    "id": "b",
                    "text": "Generator/base point"
                },
                {
                    "id": "c",
                    "text": "Genesis block"
                },
                {
                    "id": "d",
                    "text": "Hash digest"
                }
            ],
            "correctOptionId": "b",
            "explanation": "G là điểm sinh được cố định trong tham số đường cong. Các bội của G tạo nhóm điểm dùng để xây dựng cặp khóa.",
            "source": "https://www.secg.org/sec2-v2.pdf"
        },
        {
            "id": "bc-session3-q049",
            "prompt": "Private key d của secp256k1 về bản chất là:",
            "options": [
                {
                    "id": "a",
                    "text": "Một ảnh QR"
                },
                {
                    "id": "b",
                    "text": "Một số nguyên trong miền hợp lệ"
                },
                {
                    "id": "c",
                    "text": "Một Merkle root"
                },
                {
                    "id": "d",
                    "text": "Một Ethereum address"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Khóa riêng d là số nguyên từ 1 đến n − 1, với n là bậc của G. Không phải tọa độ điểm hay địa chỉ.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q050",
            "prompt": "Public key được tính theo:",
            "options": [
                {
                    "id": "a",
                    "text": "Q=d+G"
                },
                {
                    "id": "b",
                    "text": "Q=dG"
                },
                {
                    "id": "c",
                    "text": "Q=H(d) luôn luôn"
                },
                {
                    "id": "d",
                    "text": "Q=d/G"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Khóa công khai Q được tính bằng phép nhân vô hướng Q = dG. d là số bí mật, còn G là tham số công khai.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q051",
            "prompt": "Phép dG trong ECC được gọi là:",
            "options": [
                {
                    "id": "a",
                    "text": "Scalar multiplication"
                },
                {
                    "id": "b",
                    "text": "Symmetric encryption"
                },
                {
                    "id": "c",
                    "text": "Hash collision"
                },
                {
                    "id": "d",
                    "text": "PBKDF2"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Nhân vô hướng là cộng điểm G theo quy tắc đường cong với hệ số d. Nó không phải nhân riêng từng tọa độ với d.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q052",
            "prompt": "Biết d, việc tính Q=dG là:",
            "options": [
                {
                    "id": "a",
                    "text": "Bất khả thi"
                },
                {
                    "id": "b",
                    "text": "Nhanh"
                },
                {
                    "id": "c",
                    "text": "Chỉ miner làm được"
                },
                {
                    "id": "d",
                    "text": "Cần mnemonic"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Có thuật toán cộng và nhân đôi điểm để tính dG hiệu quả. Không cần thực hiện d lần cộng một cách tuần tự.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q053",
            "prompt": "Biết Q và G, tìm d là bài toán:",
            "options": [
                {
                    "id": "a",
                    "text": "Birthday problem"
                },
                {
                    "id": "b",
                    "text": "Elliptic Curve Discrete Logarithm Problem"
                },
                {
                    "id": "c",
                    "text": "Halting problem"
                },
                {
                    "id": "d",
                    "text": "Merkle membership"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Bài toán logarit rời rạc trên đường cong yêu cầu tìm d từ Q = dG. Chiều ngược này được xem là khó với tham số an toàn.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q054",
            "prompt": "secp256k1 được sử dụng bởi:",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ Ethereum validator"
                },
                {
                    "id": "b",
                    "text": "Bitcoin và Ethereum EOA"
                },
                {
                    "id": "c",
                    "text": "Chỉ Solana"
                },
                {
                    "id": "d",
                    "text": "Chỉ Cardano"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Ethereum EOA dùng secp256k1; Bitcoin cũng dùng đường cong này. Hai hệ thống dùng chung đường cong không có nghĩa cách tạo địa chỉ giống nhau.",
            "source": "https://ethereum.org/en/developers/docs/accounts/"
        },
        {
            "id": "bc-session3-q055",
            "prompt": "Curve secp256k1 trong slide có phương trình dạng:",
            "options": [
                {
                    "id": "a",
                    "text": "y=x+7"
                },
                {
                    "id": "b",
                    "text": "y^2=x^3+7"
                },
                {
                    "id": "c",
                    "text": "y=x^2+3"
                },
                {
                    "id": "d",
                    "text": "x^2+y^2=1"
                }
            ],
            "correctOptionId": "b",
            "explanation": "secp256k1 chọn a = 0 và b = 7 trong y² = x³ + ax + b. Các phép tính thực hiện modulo số nguyên tố p, không trên số thực.",
            "source": "https://www.secg.org/sec2-v2.pdf"
        },
        {
            "id": "bc-session3-q056",
            "prompt": "Security level của secp256k1 trong slide xấp xỉ:",
            "options": [
                {
                    "id": "a",
                    "text": "32 bit"
                },
                {
                    "id": "b",
                    "text": "64 bit"
                },
                {
                    "id": "c",
                    "text": "128 bit"
                },
                {
                    "id": "d",
                    "text": "512 bit"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Đường cong cỡ 256 bit tương ứng mức an toàn cổ điển khoảng 128 bit. Độ dài khóa không bằng số bit an toàn trước thuật toán tấn công tốt nhất.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q057",
            "prompt": "ed25519 được slide liên hệ với:",
            "options": [
                {
                    "id": "a",
                    "text": "Solana, TON, Cardano"
                },
                {
                    "id": "b",
                    "text": "Bitcoin Taproot duy nhất"
                },
                {
                    "id": "c",
                    "text": "Ethereum PoS validator duy nhất"
                },
                {
                    "id": "d",
                    "text": "SHA-256"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Solana, TON và Cardano đều có cơ chế chữ ký dựa trên Ed25519. Đây là thuật toán chữ ký khác ECDSA trên secp256k1, dù đều dùng đường cong elliptic.",
            "source": "https://developers.cardano.org/docs/operate-a-stake-pool/basics/cardano-key-pairs/"
        },
        {
            "id": "bc-session3-q058",
            "prompt": "BLS12-381 trong slide liên hệ với:",
            "options": [
                {
                    "id": "a",
                    "text": "Bitcoin legacy address"
                },
                {
                    "id": "b",
                    "text": "Ethereum PoS validators"
                },
                {
                    "id": "c",
                    "text": "BIP39"
                },
                {
                    "id": "d",
                    "text": "Proof of Work nonce"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đặc tả đồng thuận Ethereum định nghĩa khóa và chữ ký BLS12-381 cho validator. Đây là khóa ký của bộ xác thực, khác khóa secp256k1 của tài khoản EOA.",
            "source": "https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#bls-signatures"
        },
        {
            "id": "bc-session3-q059",
            "prompt": "ECDSA viết đầy đủ là:",
            "options": [
                {
                    "id": "a",
                    "text": "Elliptic Curve Digital Signature Algorithm"
                },
                {
                    "id": "b",
                    "text": "Ethereum Cryptographic Data Storage Algorithm"
                },
                {
                    "id": "c",
                    "text": "Electronic Coin Distributed Security Architecture"
                },
                {
                    "id": "d",
                    "text": "Elliptic Chain Data Sharing Algorithm"
                }
            ],
            "correctOptionId": "a",
            "explanation": "ECDSA là Elliptic Curve Digital Signature Algorithm: thuật toán chữ ký số trên đường cong elliptic. Nó phục vụ ký và xác minh, không phải mã hóa thông điệp.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q060",
            "prompt": "Khi ký ECDSA, bước đầu tiên với message m là:",
            "options": [
                {
                    "id": "a",
                    "text": "Xóa message"
                },
                {
                    "id": "b",
                    "text": "Tính e=H(m)"
                },
                {
                    "id": "c",
                    "text": "Chuyển message thành address"
                },
                {
                    "id": "d",
                    "text": "Tính Merkle root bắt buộc"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Thông điệp được băm rồi chuyển thành số e theo quy tắc thuật toán. Chữ ký gắn với nội dung thông qua giá trị này.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q061",
            "prompt": "Trong ECDSA, k là:",
            "options": [
                {
                    "id": "a",
                    "text": "Public key"
                },
                {
                    "id": "b",
                    "text": "Nonce dùng trong quá trình ký"
                },
                {
                    "id": "c",
                    "text": "ChainID"
                },
                {
                    "id": "d",
                    "text": "Merkle proof"
                }
            ],
            "correctOptionId": "b",
            "explanation": "k là số bí mật dùng riêng khi tạo chữ ký, khác nonce đếm giao dịch. Tạo k sai hoặc tái sử dụng không đúng có thể làm lộ khóa.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q062",
            "prompt": "Từ k, thuật toán tính:",
            "options": [
                {
                    "id": "a",
                    "text": "R=kG"
                },
                {
                    "id": "b",
                    "text": "R=k+d"
                },
                {
                    "id": "c",
                    "text": "R=H(k) duy nhất"
                },
                {
                    "id": "d",
                    "text": "R=kQ bắt buộc"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Thuật toán nhân điểm sinh G với số bí mật k để có R = kG. Điểm này cung cấp tọa độ dùng tạo r.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q063",
            "prompt": "Thành phần r được lấy chủ yếu từ:",
            "options": [
                {
                    "id": "a",
                    "text": "Tọa độ x của R=kG"
                },
                {
                    "id": "b",
                    "text": "Private key trực tiếp"
                },
                {
                    "id": "c",
                    "text": "ChainID"
                },
                {
                    "id": "d",
                    "text": "Seed phrase"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Lấy tọa độ x của R rồi giảm modulo n để được r. Không dùng nguyên cả điểm R làm thành phần r.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q064",
            "prompt": "Chữ ký ECDSA cơ bản gồm:",
            "options": [
                {
                    "id": "a",
                    "text": "(d,Q)"
                },
                {
                    "id": "b",
                    "text": "(r,s)"
                },
                {
                    "id": "c",
                    "text": "(m,k)"
                },
                {
                    "id": "d",
                    "text": "(seed,address)"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Chữ ký ECDSA cơ bản gồm hai số r và s. Thông tin phục hồi v của Ethereum là phần bổ sung cho cách dùng có phục hồi khóa công khai.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q065",
            "prompt": "Trong quá trình verify, thành phần bí mật nào KHÔNG cần?",
            "options": [
                {
                    "id": "a",
                    "text": "Signature"
                },
                {
                    "id": "b",
                    "text": "Message"
                },
                {
                    "id": "c",
                    "text": "Public key"
                },
                {
                    "id": "d",
                    "text": "Private key"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Bên xác minh dùng thông điệp, chữ ký và khóa công khai. Khóa riêng chỉ cần ở phía ký và không được đưa cho bên kiểm tra.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q066",
            "prompt": "Một chữ ký số hợp lệ chủ yếu chứng minh:",
            "options": [
                {
                    "id": "a",
                    "text": "Message được giữ bí mật"
                },
                {
                    "id": "b",
                    "text": "Người sở hữu private key đã authorize message và message chưa bị sửa"
                },
                {
                    "id": "c",
                    "text": "Người nhận đã đọc message"
                },
                {
                    "id": "d",
                    "text": "Blockchain không bao giờ fork"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Chữ ký liên kết nội dung với khóa của tài khoản ký. Nó thể hiện quyền phê duyệt bằng khóa, không chứng minh danh tính ngoài đời hoặc giữ bí mật thông điệp.",
            "source": "https://ethereum.org/en/developers/docs/transactions/"
        },
        {
            "id": "bc-session3-q067",
            "prompt": "Nếu message bị thay đổi sau khi ký nhưng vẫn dùng signature cũ:",
            "options": [
                {
                    "id": "a",
                    "text": "Luôn verify thành công"
                },
                {
                    "id": "b",
                    "text": "Verification/recovery không còn khớp signer ban đầu"
                },
                {
                    "id": "c",
                    "text": "Private key tự động thay đổi"
                },
                {
                    "id": "d",
                    "text": "Hash không thay đổi"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đổi thông điệp làm thay giá trị băm cần xác minh, nên chữ ký cũ không còn khớp khóa ban đầu với xác suất áp đảo. Không cần thay khóa riêng.",
            "source": "https://www.secg.org/sec1-v2.pdf"
        },
        {
            "id": "bc-session3-q068",
            "prompt": "Integrity trong digital signature nghĩa là:",
            "options": [
                {
                    "id": "a",
                    "text": "Message được mã hóa"
                },
                {
                    "id": "b",
                    "text": "Việc thay đổi message có thể bị phát hiện"
                },
                {
                    "id": "c",
                    "text": "Người ký ẩn danh"
                },
                {
                    "id": "d",
                    "text": "Không cần private key"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tính toàn vẹn nghĩa là phát hiện nội dung đã bị sửa so với nội dung được xác thực. Nó khác tính bí mật: thông điệp vẫn có thể đọc công khai.",
            "source": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf"
        },
        {
            "id": "bc-session3-q069",
            "prompt": "Điều gì nguy hiểm nhất nếu reuse cùng ECDSA nonce k cho hai message khác nhau?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ tăng gas"
                },
                {
                    "id": "b",
                    "text": "Có thể suy ra private key"
                },
                {
                    "id": "c",
                    "text": "Public key dài hơn"
                },
                {
                    "id": "d",
                    "text": "Address đổi format"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Hai chữ ký khác thông điệp dùng cùng k tạo hai phương trình có chung ẩn. Từ đó có thể suy ra k rồi khóa riêng d.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q070",
            "prompt": "Vì sao hai chữ ký dùng cùng k có cùng r?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì cùng R=kG"
                },
                {
                    "id": "b",
                    "text": "Vì message luôn giống nhau"
                },
                {
                    "id": "c",
                    "text": "Vì public key thay đổi"
                },
                {
                    "id": "d",
                    "text": "Vì hash luôn bằng nhau"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Cùng k và cùng điểm sinh G cho cùng R = kG. Vì r lấy từ tọa độ x của R nên hai chữ ký có cùng r.",
            "source": "https://www.secg.org/sec2-v2.pdf"
        },
        {
            "id": "bc-session3-q071",
            "prompt": "RFC nào trong Session 3 giải quyết deterministic ECDSA nonce?",
            "options": [
                {
                    "id": "a",
                    "text": "RFC 1918"
                },
                {
                    "id": "b",
                    "text": "RFC 6979"
                },
                {
                    "id": "c",
                    "text": "RFC 2612"
                },
                {
                    "id": "d",
                    "text": "RFC 1559"
                }
            ],
            "correctOptionId": "b",
            "explanation": "RFC 6979 mô tả cách sinh k tất định cho DSA/ECDSA. Nó thay bước lấy ngẫu nhiên cho từng chữ ký, không thay thuật toán xác minh.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q072",
            "prompt": "Với RFC 6979, k được dẫn xuất chủ yếu từ:",
            "options": [
                {
                    "id": "a",
                    "text": "Thời gian hệ thống"
                },
                {
                    "id": "b",
                    "text": "Private key và message"
                },
                {
                    "id": "c",
                    "text": "Block height duy nhất"
                },
                {
                    "id": "d",
                    "text": "Public address duy nhất"
                }
            ],
            "correctOptionId": "b",
            "explanation": "RFC 6979 dùng khóa riêng và hash thông điệp trong quá trình HMAC để tạo k. Chỉ thời gian hoặc địa chỉ công khai không đủ.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q073",
            "prompt": "Với cùng private key và cùng message dưới deterministic ECDSA, hai lần ký sẽ:",
            "options": [
                {
                    "id": "a",
                    "text": "Bắt buộc khác nhau"
                },
                {
                    "id": "b",
                    "text": "Cho cùng signature"
                },
                {
                    "id": "c",
                    "text": "Lộ private key"
                },
                {
                    "id": "d",
                    "text": "Có public key khác"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Cùng khóa, thông điệp và cấu hình theo RFC 6979 cho cùng chữ ký. Điều này khác tái dùng k cho hai thông điệp khác nhau.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q074",
            "prompt": "Low-s rule chủ yếu giúp hạn chế:",
            "options": [
                {
                    "id": "a",
                    "text": "Hash collision"
                },
                {
                    "id": "b",
                    "text": "Signature malleability"
                },
                {
                    "id": "c",
                    "text": "Mining difficulty"
                },
                {
                    "id": "d",
                    "text": "Seed reuse"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Low-s chỉ chấp nhận s ở nửa dưới miền hợp lệ, hạn chế đổi chữ ký thành dạng tương đương. EIP-2 áp dụng cho giao dịch; ecrecover vẫn chấp nhận high-s.",
            "source": "https://eips.ethereum.org/EIPS/eip-2"
        },
        {
            "id": "bc-session3-q075",
            "prompt": "Ethereum recoverable signature thường được biểu diễn bằng:",
            "options": [
                {
                    "id": "a",
                    "text": "(x,y,z)"
                },
                {
                    "id": "b",
                    "text": "(v,r,s)"
                },
                {
                    "id": "c",
                    "text": "(d,Q)"
                },
                {
                    "id": "d",
                    "text": "(seed,nonce)"
                }
            ],
            "correctOptionId": "b",
            "explanation": "r và s là hai thành phần ECDSA; v bổ sung thông tin phục hồi. Khi đóng gói thành byte, dạng thông dụng là r rồi s rồi v.",
            "source": "https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions"
        },
        {
            "id": "bc-session3-q076",
            "prompt": "Vai trò của v trong Ethereum signature là:",
            "options": [
                {
                    "id": "a",
                    "text": "Giá trị ETH"
                },
                {
                    "id": "b",
                    "text": "Recovery information để chọn đúng public key candidate"
                },
                {
                    "id": "c",
                    "text": "Gas limit"
                },
                {
                    "id": "d",
                    "text": "Version BIP39"
                }
            ],
            "correctOptionId": "b",
            "explanation": "v chứa thông tin giúp phục hồi đúng ứng viên khóa công khai. Với giao dịch legacy có EIP-155, giá trị v còn kết hợp chainId; không phải số ETH.",
            "source": "https://eips.ethereum.org/EIPS/eip-155"
        },
        {
            "id": "bc-session3-q077",
            "prompt": "ecrecover dùng để:",
            "options": [
                {
                    "id": "a",
                    "text": "Khôi phục private key"
                },
                {
                    "id": "b",
                    "text": "Khôi phục signer/address từ message hash và signature"
                },
                {
                    "id": "c",
                    "text": "Sinh seed phrase"
                },
                {
                    "id": "d",
                    "text": "Đào block"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ecrecover nhận hash, v, r, s và trả địa chỉ suy ra từ chữ ký, hoặc địa chỉ 0 khi lỗi. Ứng dụng phải so sánh với địa chỉ được phép ký.",
            "source": "https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions"
        },
        {
            "id": "bc-session3-q078",
            "prompt": "ecrecover tuyệt đối KHÔNG làm được việc nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Xác định signer"
                },
                {
                    "id": "b",
                    "text": "Hỗ trợ kiểm tra chữ ký off-chain trên smart contract"
                },
                {
                    "id": "c",
                    "text": "Khôi phục private key của signer"
                },
                {
                    "id": "d",
                    "text": "Dùng trong các cơ chế ký"
                }
            ],
            "correctOptionId": "c",
            "explanation": "ecrecover khôi phục địa chỉ gắn với khóa công khai, không trả khóa riêng. Phục hồi danh tính người ký không đồng nghĩa có thể ký thay họ.",
            "source": "https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions"
        },
        {
            "id": "bc-session3-q079",
            "prompt": "Replay attack là:",
            "options": [
                {
                    "id": "a",
                    "text": "Thử lại nonce mining"
                },
                {
                    "id": "b",
                    "text": "Tái sử dụng một message/signature hợp lệ trong ngữ cảnh không mong muốn"
                },
                {
                    "id": "c",
                    "text": "Hash hai lần"
                },
                {
                    "id": "d",
                    "text": "Duplicate leaf Merkle"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tấn công phát lại dùng lại chữ ký hợp lệ để thực hiện hành động ngoài ý định ban đầu. Việc xác minh chữ ký thành công chưa đủ để ngăn điều này.",
            "source": "https://eips.ethereum.org/EIPS/eip-712"
        },
        {
            "id": "bc-session3-q080",
            "prompt": "Một biện pháp quan trọng chống replay là đưa gì vào signed data?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ tên người dùng"
                },
                {
                    "id": "b",
                    "text": "Nonce và chainId/context phù hợp"
                },
                {
                    "id": "c",
                    "text": "Chỉ gas price"
                },
                {
                    "id": "d",
                    "text": "Chỉ timestamp"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Nonce được theo dõi và tiêu thụ để chặn dùng lại; chainId và miền ký ràng buộc ngữ cảnh. Chỉ đưa trường vào dữ liệu mà không kiểm tra chúng là chưa đủ.",
            "source": "https://eips.ethereum.org/EIPS/eip-2612"
        },
        {
            "id": "bc-session3-q081",
            "prompt": "EIP-712 chủ yếu liên quan tới:",
            "options": [
                {
                    "id": "a",
                    "text": "Typed structured data signing"
                },
                {
                    "id": "b",
                    "text": "Bitcoin mining"
                },
                {
                    "id": "c",
                    "text": "BIP39 mnemonic"
                },
                {
                    "id": "d",
                    "text": "Merkle root duplication"
                }
            ],
            "correctOptionId": "a",
            "explanation": "EIP-712 quy định băm và ký dữ liệu có cấu trúc, có kiểu và miền ký. Nó giúp ví trình bày nội dung rõ hơn, nhưng không tự giải quyết mọi tấn công phát lại.",
            "source": "https://eips.ethereum.org/EIPS/eip-712"
        },
        {
            "id": "bc-session3-q082",
            "prompt": "permit kiểu EIP-2612 tận dụng chữ ký để:",
            "options": [
                {
                    "id": "a",
                    "text": "Cấp allowance bằng chữ ký thay vì bắt user tự gửi transaction approve trước"
                },
                {
                    "id": "b",
                    "text": "Tạo Bitcoin address"
                },
                {
                    "id": "c",
                    "text": "Sinh block mới"
                },
                {
                    "id": "d",
                    "text": "Thay PoS bằng PoW"
                }
            ],
            "correctOptionId": "a",
            "explanation": "permit cho phép chủ token ký quyền chi tiêu ngoài chuỗi; người khác có thể nộp chữ ký lên hợp đồng. Vẫn cần giao dịch để cập nhật allowance trên chuỗi.",
            "source": "https://eips.ethereum.org/EIPS/eip-2612"
        },
        {
            "id": "bc-session3-q083",
            "prompt": "Sign-In with Ethereum dùng chữ ký chủ yếu để:",
            "options": [
                {
                    "id": "a",
                    "text": "Mã hóa password"
                },
                {
                    "id": "b",
                    "text": "Chứng minh người dùng kiểm soát một Ethereum address"
                },
                {
                    "id": "c",
                    "text": "Đào ETH"
                },
                {
                    "id": "d",
                    "text": "Sinh token"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Dịch vụ xác minh thông điệp đăng nhập có chữ ký, tên miền và nonce để kiểm tra quyền kiểm soát địa chỉ. Không cần gửi khóa riêng cho dịch vụ.",
            "source": "https://eips.ethereum.org/EIPS/eip-4361"
        },
        {
            "id": "bc-session3-q084",
            "prompt": "Chữ ký trong transaction blockchain có ý nghĩa gần nhất với:",
            "options": [
                {
                    "id": "a",
                    "text": "\"Tôi giữ message này bí mật\""
                },
                {
                    "id": "b",
                    "text": "\"Tôi authorize hành động này\""
                },
                {
                    "id": "c",
                    "text": "\"Tôi đã tải blockchain\""
                },
                {
                    "id": "d",
                    "text": "\"Tôi là miner\""
                }
            ],
            "correctOptionId": "b",
            "explanation": "Ký giao dịch là phê duyệt hành động và các trường dữ liệu của giao dịch bằng khóa tài khoản. Nó không mã hóa nội dung giao dịch.",
            "source": "https://ethereum.org/en/developers/docs/transactions/"
        },
        {
            "id": "bc-session3-q085",
            "prompt": "Lợi thế nổi bật của Schnorr được slide nhấn mạnh là:",
            "options": [
                {
                    "id": "a",
                    "text": "Không dùng elliptic curve"
                },
                {
                    "id": "b",
                    "text": "Aggregation, giúp multisig có thể trông giống một signature"
                },
                {
                    "id": "c",
                    "text": "Tạo mnemonic"
                },
                {
                    "id": "d",
                    "text": "Không cần key"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tính tuyến tính của Schnorr cho phép giao thức đa chữ ký tạo một chữ ký chung. Cần giao thức phối hợp an toàn; không phải cộng tùy ý các chữ ký có sẵn.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki"
        },
        {
            "id": "bc-session3-q086",
            "prompt": "Lợi thế nổi bật của BLS trong slide là:",
            "options": [
                {
                    "id": "a",
                    "text": "Có thể aggregate rất nhiều signatures"
                },
                {
                    "id": "b",
                    "text": "Không cần public key"
                },
                {
                    "id": "c",
                    "text": "Không có signature"
                },
                {
                    "id": "d",
                    "text": "Chỉ dùng cho Bitcoin legacy"
                }
            ],
            "correctOptionId": "a",
            "explanation": "BLS cho phép gộp nhiều chữ ký thành một chữ ký tổng hợp, giúp giảm dữ liệu cần truyền. Xác minh vẫn cần các khóa công khai và thông điệp phù hợp.",
            "source": "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/keys/"
        },
        {
            "id": "bc-session3-q087",
            "prompt": "Entropy trong BIP39 là:",
            "options": [
                {
                    "id": "a",
                    "text": "Password do server cấp"
                },
                {
                    "id": "b",
                    "text": "Dữ liệu ngẫu nhiên mật mã làm nguồn ban đầu"
                },
                {
                    "id": "c",
                    "text": "Ethereum balance"
                },
                {
                    "id": "d",
                    "text": "Merkle proof"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Entropy là các bit ngẫu nhiên ban đầu để tạo cụm từ khôi phục. Không nên tự nghĩ câu dễ nhớ thay cho nguồn ngẫu nhiên mật mã.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q088",
            "prompt": "CSPRNG là:",
            "options": [
                {
                    "id": "a",
                    "text": "Cryptographically Secure Pseudo-Random Number Generator"
                },
                {
                    "id": "b",
                    "text": "Centralized Seed Private Recovery Node Generator"
                },
                {
                    "id": "c",
                    "text": "Consensus Security Proof Random Number Group"
                },
                {
                    "id": "d",
                    "text": "Chain State Public Random Node Generator"
                }
            ],
            "correctOptionId": "a",
            "explanation": "CSPRNG là bộ sinh số giả ngẫu nhiên an toàn mật mã, được thiết kế để khó dự đoán. Bộ ngẫu nhiên cho mô phỏng không mặc nhiên đạt yêu cầu này.",
            "source": "https://docs.python.org/3/library/secrets.html"
        },
        {
            "id": "bc-session3-q089",
            "prompt": "BIP39 sử dụng word list có bao nhiêu từ?",
            "options": [
                {
                    "id": "a",
                    "text": "256"
                },
                {
                    "id": "b",
                    "text": "512"
                },
                {
                    "id": "c",
                    "text": "1,024"
                },
                {
                    "id": "d",
                    "text": "2,048"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Mỗi chỉ số từ có 11 bit, biểu diễn 2^11 = 2.048 giá trị từ 0 đến 2.047.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q090",
            "prompt": "Vì sao mỗi BIP39 word tương ứng với 11 bit?",
            "options": [
                {
                    "id": "a",
                    "text": "2^11=2048"
                },
                {
                    "id": "b",
                    "text": "11^2=121"
                },
                {
                    "id": "c",
                    "text": "SHA-256 dài 11 bit"
                },
                {
                    "id": "d",
                    "text": "Private key dài 11 byte"
                }
            ],
            "correctOptionId": "a",
            "explanation": "11 bit đủ mã hóa đúng 2.048 chỉ số. Đây là chỉ số trong danh sách, không phải số chữ cái của từ.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q091",
            "prompt": "Với 128-bit entropy, BIP39 thường tạo:",
            "options": [
                {
                    "id": "a",
                    "text": "6 words"
                },
                {
                    "id": "b",
                    "text": "12 words"
                },
                {
                    "id": "c",
                    "text": "18 words"
                },
                {
                    "id": "d",
                    "text": "24 words"
                }
            ],
            "correctOptionId": "b",
            "explanation": "128 bit entropy cộng 4 bit kiểm tra bằng 132 bit; chia nhóm 11 bit được 12 từ.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q092",
            "prompt": "Với 256-bit entropy, BIP39 thường tạo:",
            "options": [
                {
                    "id": "a",
                    "text": "12 words"
                },
                {
                    "id": "b",
                    "text": "15 words"
                },
                {
                    "id": "c",
                    "text": "18 words"
                },
                {
                    "id": "d",
                    "text": "24 words"
                }
            ],
            "correctOptionId": "d",
            "explanation": "256 bit entropy cộng 8 bit kiểm tra bằng 264 bit; 264 / 11 = 24 từ.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q093",
            "prompt": "Với entropy 128 bit, checksum dài:",
            "options": [
                {
                    "id": "a",
                    "text": "2 bit"
                },
                {
                    "id": "b",
                    "text": "4 bit"
                },
                {
                    "id": "c",
                    "text": "8 bit"
                },
                {
                    "id": "d",
                    "text": "32 bit"
                }
            ],
            "correctOptionId": "b",
            "explanation": "BIP39 lấy ENT / 32 bit kiểm tra từ SHA-256 của entropy. Với ENT = 128, ta có 4 bit.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q094",
            "prompt": "Vì sao 128-bit entropy tạo 12 words?",
            "options": [
                {
                    "id": "a",
                    "text": "128/12 là số nguyên"
                },
                {
                    "id": "b",
                    "text": "128+4=132 bit, chia thành 12 nhóm 11 bit"
                },
                {
                    "id": "c",
                    "text": "Mỗi word có 12 bit"
                },
                {
                    "id": "d",
                    "text": "Wordlist có 12 từ"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Phải cộng cả checksum: (128 + 4) / 11 = 12. Checksum là phần dữ liệu giúp phát hiện sai sót.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q095",
            "prompt": "BIP39 mnemonic được biến thành seed bằng:",
            "options": [
                {
                    "id": "a",
                    "text": "PBKDF2"
                },
                {
                    "id": "b",
                    "text": "ECDSA verify"
                },
                {
                    "id": "c",
                    "text": "Merkle proof"
                },
                {
                    "id": "d",
                    "text": "RIPEMD-160 duy nhất"
                }
            ],
            "correctOptionId": "a",
            "explanation": "BIP39 dùng PBKDF2-HMAC-SHA512 với 2.048 vòng để biến mnemonic và passphrase thành seed.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q096",
            "prompt": "Seed BIP39 trong slide có độ dài:",
            "options": [
                {
                    "id": "a",
                    "text": "128 bit"
                },
                {
                    "id": "b",
                    "text": "160 bit"
                },
                {
                    "id": "c",
                    "text": "256 bit"
                },
                {
                    "id": "d",
                    "text": "512 bit"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Seed đầu ra luôn dài 512 bit, tức 64 byte. Nó không có cùng độ dài với entropy ban đầu.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-session3-q097",
            "prompt": "Optional BIP39 passphrase đôi khi được gọi không chính thức là:",
            "options": [
                {
                    "id": "a",
                    "text": "\"13th block\""
                },
                {
                    "id": "b",
                    "text": "\"25th word\""
                },
                {
                    "id": "c",
                    "text": "\"Merkle password\""
                },
                {
                    "id": "d",
                    "text": "\"nonce word\""
                }
            ],
            "correctOptionId": "b",
            "explanation": "“Từ thứ 25” chỉ là cách gọi không chính thức. Passphrase là chuỗi bổ sung tùy chọn, không buộc là một từ trong danh sách BIP39.",
            "source": "https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase"
        },
        {
            "id": "bc-session3-q098",
            "prompt": "Cùng mnemonic nhưng passphrase khác sẽ:",
            "options": [
                {
                    "id": "a",
                    "text": "Luôn cho cùng wallet"
                },
                {
                    "id": "b",
                    "text": "Có thể tạo wallet hoàn toàn khác"
                },
                {
                    "id": "c",
                    "text": "Làm mnemonic invalid ngay"
                },
                {
                    "id": "d",
                    "text": "Không ảnh hưởng seed"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Thay passphrase làm thay đầu vào tạo seed và dẫn đến ví khác. Gõ sai có thể mở một ví rỗng, không nhất thiết báo mật khẩu sai.",
            "source": "https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase"
        },
        {
            "id": "bc-session3-q099",
            "prompt": "Ai có mnemonic + passphrase cần thiết thì về nguyên tắc có thể:",
            "options": [
                {
                    "id": "a",
                    "text": "Dẫn xuất lại các private key của wallet"
                },
                {
                    "id": "b",
                    "text": "Chỉ xem balance"
                },
                {
                    "id": "c",
                    "text": "Không thể ký transaction"
                },
                {
                    "id": "d",
                    "text": "Chỉ tạo public key nhưng không private key"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Có đúng cụm từ khôi phục và passphrase cho phép tái tạo seed. Để tìm lại tài khoản còn cần dùng đúng quy tắc và đường dẫn tạo khóa.",
            "source": "https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase"
        },
        {
            "id": "bc-session3-q100",
            "prompt": "HD trong HD wallet là:",
            "options": [
                {
                    "id": "a",
                    "text": "Hash Digest"
                },
                {
                    "id": "b",
                    "text": "Hierarchical Deterministic"
                },
                {
                    "id": "c",
                    "text": "High Difficulty"
                },
                {
                    "id": "d",
                    "text": "Hidden Data"
                }
            ],
            "correctOptionId": "b",
            "explanation": "HD là Hierarchical Deterministic: các khóa được tổ chức theo cây và tái tạo xác định từ cùng dữ liệu gốc.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-session3-q101",
            "prompt": "BIP32 mô tả chủ yếu:",
            "options": [
                {
                    "id": "a",
                    "text": "HD key derivation"
                },
                {
                    "id": "b",
                    "text": "Ethereum gas"
                },
                {
                    "id": "c",
                    "text": "Bitcoin mining target"
                },
                {
                    "id": "d",
                    "text": "EIP-55 checksum"
                }
            ],
            "correctOptionId": "a",
            "explanation": "BIP32 mô tả cách tạo khóa chủ và khóa con theo cây. BIP39 chuyển cụm từ khôi phục thành seed; hai chuẩn làm việc khác nhau.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-session3-q102",
            "prompt": "Từ một seed BIP32 có thể tạo:",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ đúng một private key"
                },
                {
                    "id": "b",
                    "text": "Một cây gồm nhiều child keys"
                },
                {
                    "id": "c",
                    "text": "Chỉ một address"
                },
                {
                    "id": "d",
                    "text": "Chỉ một hash"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Seed tạo khóa chủ mở rộng; mỗi nhánh tiếp tục tạo các khóa con. Vì vậy một seed có thể quản lý nhiều địa chỉ.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-session3-q103",
            "prompt": "Lợi ích của HD wallet là:",
            "options": [
                {
                    "id": "a",
                    "text": "Mỗi address bắt buộc backup riêng"
                },
                {
                    "id": "b",
                    "text": "Một seed có thể khôi phục cả cây key"
                },
                {
                    "id": "c",
                    "text": "Không cần private key"
                },
                {
                    "id": "d",
                    "text": "Không dùng cryptography"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Các khóa được dẫn xuất có quy luật nên có thể tái tạo từ dữ liệu gốc thay vì sao lưu riêng từng khóa. Khóa nhập từ bên ngoài không tự thuộc cây này.",
            "source": "https://developer.bitcoin.org/devguide/wallets.html"
        },
        {
            "id": "bc-session3-q104",
            "prompt": "xpub có thể hỗ trợ:",
            "options": [
                {
                    "id": "a",
                    "text": "Watch-only wallet"
                },
                {
                    "id": "b",
                    "text": "Chi tiêu coin mà không cần private key"
                },
                {
                    "id": "c",
                    "text": "Khôi phục private key bất kỳ"
                },
                {
                    "id": "d",
                    "text": "Mining"
                }
            ],
            "correctOptionId": "a",
            "explanation": "xpub chứa khóa công khai mở rộng, cho phép tạo địa chỉ con phù hợp và theo dõi tiền. Nó không có khóa riêng để ký chi tiêu.",
            "source": "https://developer.bitcoin.org/devguide/wallets.html"
        },
        {
            "id": "bc-session3-q105",
            "prompt": "Watch-only wallet có thể:",
            "options": [
                {
                    "id": "a",
                    "text": "Theo dõi address/balance nhưng không ký chi tiêu nếu không có private key"
                },
                {
                    "id": "b",
                    "text": "Chi tiêu mọi coin"
                },
                {
                    "id": "c",
                    "text": "Tạo collision"
                },
                {
                    "id": "d",
                    "text": "Bỏ qua blockchain"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Ví chỉ xem theo dõi giao dịch và số dư bằng dữ liệu công khai. Muốn chi tiêu vẫn phải có chữ ký từ nơi giữ khóa riêng.",
            "source": "https://developer.bitcoin.org/devguide/wallets.html"
        },
        {
            "id": "bc-session3-q106",
            "prompt": "Trong normal BIP32 derivation, parent xpub có thể:",
            "options": [
                {
                    "id": "a",
                    "text": "Derive child public keys"
                },
                {
                    "id": "b",
                    "text": "Luôn derive parent private key"
                },
                {
                    "id": "c",
                    "text": "Tạo mnemonic mới"
                },
                {
                    "id": "d",
                    "text": "Verify PoW"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Với nhánh không hardened, xpub cha và chỉ số đủ tạo khóa công khai con. Không suy ra khóa riêng con chỉ từ xpub.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-session3-q107",
            "prompt": "Hardened derivation khác normal derivation ở điểm quan trọng nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Hardened cần thông tin private của parent để derive"
                },
                {
                    "id": "b",
                    "text": "Hardened không dùng key"
                },
                {
                    "id": "c",
                    "text": "Hardened chỉ dùng cho mining"
                },
                {
                    "id": "d",
                    "text": "Hardened không có index"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Nhánh hardened đưa khóa riêng cha vào dữ liệu dẫn xuất. Vì vậy chỉ có xpub cha thì không tính được khóa công khai con theo nhánh này.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-session3-q108",
            "prompt": "Rủi ro được slide nêu với normal derivation là:",
            "options": [
                {
                    "id": "a",
                    "text": "Child private key bị lộ + parent xpub có thể làm lộ parent private key"
                },
                {
                    "id": "b",
                    "text": "Parent xpub luôn chứa seed phrase"
                },
                {
                    "id": "c",
                    "text": "Public key không tồn tại"
                },
                {
                    "id": "d",
                    "text": "Child key luôn trùng nhau"
                }
            ],
            "correctOptionId": "a",
            "explanation": "xpub cha cộng khóa riêng con không hardened có thể làm lộ khóa riêng cha. Nhánh hardened được thiết kế để ngăn kiểu suy ngược này.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-session3-q109",
            "prompt": "Trong derivation path, dấu ' có nghĩa là:",
            "options": [
                {
                    "id": "a",
                    "text": "Hash lần hai"
                },
                {
                    "id": "b",
                    "text": "Hardened derivation"
                },
                {
                    "id": "c",
                    "text": "Change address"
                },
                {
                    "id": "d",
                    "text": "Public derivation"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Dấu nháy đơn đánh dấu nhánh hardened, tức nhánh dẫn xuất cần thông tin khóa riêng cha. Nó không có nghĩa là địa chỉ tiền thừa.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        },
        {
            "id": "bc-session3-q110",
            "prompt": "Cấu trúc BIP44 là:",
            "options": [
                {
                    "id": "a",
                    "text": "m/index/change/account"
                },
                {
                    "id": "b",
                    "text": "m/purpose'/coin_type'/account'/change/index"
                },
                {
                    "id": "c",
                    "text": "seed/hash/address"
                },
                {
                    "id": "d",
                    "text": "m/gas/nonce/address"
                }
            ],
            "correctOptionId": "b",
            "explanation": "BIP44 chia đường dẫn thành mục đích, loại coin, tài khoản, nhánh và chỉ số địa chỉ. Ba cấp đầu dùng hardened.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        },
        {
            "id": "bc-session3-q111",
            "prompt": "Trong m/44'/60'/0'/0/0, 44' biểu thị:",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum coin type"
                },
                {
                    "id": "b",
                    "text": "BIP44 purpose"
                },
                {
                    "id": "c",
                    "text": "Account thứ 44"
                },
                {
                    "id": "d",
                    "text": "Address thứ 44"
                }
            ],
            "correctOptionId": "b",
            "explanation": "44' đánh dấu cây con dùng quy ước BIP44. Nó là mã mục đích, không phải số thứ tự tài khoản.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        },
        {
            "id": "bc-session3-q112",
            "prompt": "Trong path trên, 60' biểu thị:",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum coin type"
                },
                {
                    "id": "b",
                    "text": "Bitcoin coin type"
                },
                {
                    "id": "c",
                    "text": "Account index"
                },
                {
                    "id": "d",
                    "text": "Change index"
                }
            ],
            "correctOptionId": "a",
            "explanation": "SLIP-0044 đăng ký coin type 60 cho Ether. Dấu nháy đơn cho biết cấp này được dẫn xuất hardened.",
            "source": "https://github.com/satoshilabs/slips/blob/master/slip-0044.md"
        },
        {
            "id": "bc-session3-q113",
            "prompt": "Coin type Bitcoin trong slide là:",
            "options": [
                {
                    "id": "a",
                    "text": "0'"
                },
                {
                    "id": "b",
                    "text": "1'"
                },
                {
                    "id": "c",
                    "text": "44'"
                },
                {
                    "id": "d",
                    "text": "60'"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Bitcoin có coin type 0 trong SLIP-0044, được viết 0' tại cấp hardened của BIP44. Đây không phải chỉ số địa chỉ.",
            "source": "https://github.com/satoshilabs/slips/blob/master/slip-0044.md"
        },
        {
            "id": "bc-session3-q114",
            "prompt": "m/44'/60'/0'/0/0 tương ứng với:",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum account/address đầu tiên theo cấu trúc được trình bày"
                },
                {
                    "id": "b",
                    "text": "Bitcoin Taproot address"
                },
                {
                    "id": "c",
                    "text": "Solana validator"
                },
                {
                    "id": "d",
                    "text": "Merkle root"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Theo quy ước đang xét: 44' là mục đích, 60' là Ethereum, 0' là tài khoản đầu, hai số 0 cuối là nhánh ngoài và địa chỉ đầu.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        },
        {
            "id": "bc-session3-q115",
            "prompt": "Ethereum address được dẫn xuất từ:",
            "options": [
                {
                    "id": "a",
                    "text": "Private key trực tiếp bằng Base58Check"
                },
                {
                    "id": "b",
                    "text": "Public key qua Keccak-256 rồi lấy 20 byte cuối"
                },
                {
                    "id": "c",
                    "text": "Mnemonic trực tiếp"
                },
                {
                    "id": "d",
                    "text": "Transaction nonce"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Với EOA, băm 64 byte tọa độ khóa công khai không nén bằng Keccak-256 rồi lấy 20 byte cuối. Không băm trực tiếp mnemonic để tạo địa chỉ.",
            "source": "https://ethereum.org/en/developers/docs/accounts/"
        },
        {
            "id": "bc-session3-q116",
            "prompt": "Ethereum address có kích thước dữ liệu:",
            "options": [
                {
                    "id": "a",
                    "text": "16 byte"
                },
                {
                    "id": "b",
                    "text": "20 byte"
                },
                {
                    "id": "c",
                    "text": "32 byte"
                },
                {
                    "id": "d",
                    "text": "64 byte"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Địa chỉ Ethereum có 160 bit = 20 byte, biểu diễn thành 40 ký tự hệ 16. Tiền tố 0x không thêm byte vào địa chỉ.",
            "source": "https://ethereum.org/en/developers/docs/accounts/"
        },
        {
            "id": "bc-session3-q117",
            "prompt": "Prefix thông thường của Ethereum address là:",
            "options": [
                {
                    "id": "a",
                    "text": "bc1"
                },
                {
                    "id": "b",
                    "text": "0x"
                },
                {
                    "id": "c",
                    "text": "1"
                },
                {
                    "id": "d",
                    "text": "3"
                }
            ],
            "correctOptionId": "b",
            "explanation": "0x báo chuỗi được viết ở hệ 16. Nó là quy ước biểu diễn, không phải dấu hiệu địa chỉ chắc chắn an toàn hay có tiền.",
            "source": "https://ethereum.org/en/developers/docs/accounts/"
        },
        {
            "id": "bc-session3-q118",
            "prompt": "EIP-55 cung cấp:",
            "options": [
                {
                    "id": "a",
                    "text": "Mixed-case checksum cho Ethereum address"
                },
                {
                    "id": "b",
                    "text": "Mining difficulty"
                },
                {
                    "id": "c",
                    "text": "Seed phrase"
                },
                {
                    "id": "d",
                    "text": "Merkle proof"
                }
            ],
            "correctOptionId": "a",
            "explanation": "EIP-55 chọn chữ hoa/chữ thường dựa trên hash của địa chỉ chữ thường. Kiểu viết này mang thông tin kiểm tra mà không đổi 20 byte địa chỉ.",
            "source": "https://eips.ethereum.org/EIPS/eip-55"
        },
        {
            "id": "bc-session3-q119",
            "prompt": "Mục đích chính của EIP-55 checksum là:",
            "options": [
                {
                    "id": "a",
                    "text": "Làm private key mạnh hơn"
                },
                {
                    "id": "b",
                    "text": "Giúp phát hiện một số lỗi gõ address"
                },
                {
                    "id": "c",
                    "text": "Ẩn address"
                },
                {
                    "id": "d",
                    "text": "Giảm gas"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Sai chữ hoặc sai kiểu hoa/thường có thể không khớp checksum và bị phát hiện. Checksum không chứng minh người nhận là ai, cũng không ngăn mọi lỗi.",
            "source": "https://eips.ethereum.org/EIPS/eip-55"
        },
        {
            "id": "bc-session3-q120",
            "prompt": "Bitcoin legacy address pipeline trong slide sử dụng:",
            "options": [
                {
                    "id": "a",
                    "text": "Keccak-256 duy nhất"
                },
                {
                    "id": "b",
                    "text": "SHA-256 rồi RIPEMD-160"
                },
                {
                    "id": "c",
                    "text": "PBKDF2"
                },
                {
                    "id": "d",
                    "text": "BLS"
                }
            ],
            "correctOptionId": "b",
            "explanation": "P2PKH lấy RIPEMD-160(SHA-256(public key)) để được hash 20 byte, rồi thêm phiên bản và checksum trước khi mã hóa Base58Check.",
            "source": "https://developer.bitcoin.org/reference/transactions.html#address-conversion"
        },
        {
            "id": "bc-session3-q121",
            "prompt": "Bitcoin address bắt đầu bằng 1... trong slide là dạng:",
            "options": [
                {
                    "id": "a",
                    "text": "Legacy P2PKH"
                },
                {
                    "id": "b",
                    "text": "P2SH"
                },
                {
                    "id": "c",
                    "text": "Native SegWit"
                },
                {
                    "id": "d",
                    "text": "Taproot"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Trên Bitcoin mainnet, địa chỉ P2PKH dùng tiền tố phiên bản tạo ký tự đầu 1. Không áp dụng nguyên tiền tố này cho mọi mạng thử nghiệm.",
            "source": "https://developer.bitcoin.org/reference/transactions.html#address-conversion"
        },
        {
            "id": "bc-session3-q122",
            "prompt": "Bitcoin address bắt đầu bằng 3... thường liên hệ với:",
            "options": [
                {
                    "id": "a",
                    "text": "P2SH"
                },
                {
                    "id": "b",
                    "text": "Ethereum"
                },
                {
                    "id": "c",
                    "text": "BIP39 seed"
                },
                {
                    "id": "d",
                    "text": "Taproot trực tiếp"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Trên mainnet, P2SH dùng phiên bản 5 trong Base58Check nên thường bắt đầu bằng 3. Nó cam kết hash của script, không trực tiếp là hash khóa công khai.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0013.mediawiki"
        },
        {
            "id": "bc-session3-q123",
            "prompt": "bc1q... liên hệ với:",
            "options": [
                {
                    "id": "a",
                    "text": "Native SegWit"
                },
                {
                    "id": "b",
                    "text": "Ethereum EOA"
                },
                {
                    "id": "c",
                    "text": "Legacy P2PKH"
                },
                {
                    "id": "d",
                    "text": "BLS"
                }
            ],
            "correctOptionId": "a",
            "explanation": "bc là tiền tố mainnet, 1 là dấu phân cách và q mã hóa witness version 0. Dạng này dùng cho địa chỉ SegWit gốc phiên bản 0.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki"
        },
        {
            "id": "bc-session3-q124",
            "prompt": "bc1p... liên hệ với:",
            "options": [
                {
                    "id": "a",
                    "text": "Taproot"
                },
                {
                    "id": "b",
                    "text": "P2PKH"
                },
                {
                    "id": "c",
                    "text": "P2SH legacy"
                },
                {
                    "id": "d",
                    "text": "Ethereum contract"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Địa chỉ Taproot mainnet có witness version 1, thường viết bc1p… và dùng checksum Bech32m. Không phải định dạng legacy bắt đầu bằng 1.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki"
        },
        {
            "id": "bc-session3-q125",
            "prompt": "Address poisoning thường cố:",
            "options": [
                {
                    "id": "a",
                    "text": "Làm address giả có phần đầu/cuối giống address quen thuộc"
                },
                {
                    "id": "b",
                    "text": "Đánh cắp private key bằng collision SHA-256"
                },
                {
                    "id": "c",
                    "text": "Đổi BIP39 wordlist"
                },
                {
                    "id": "d",
                    "text": "Giảm mining difficulty"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Kẻ tấn công tạo địa chỉ có đầu/cuối giống địa chỉ quen thuộc rồi đưa nó vào lịch sử. Mục tiêu là khiến người dùng sao chép nhầm địa chỉ nhận.",
            "source": "https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/"
        },
        {
            "id": "bc-session3-q126",
            "prompt": "Clipboard hijacking malware có thể:",
            "options": [
                {
                    "id": "a",
                    "text": "Thay address bạn vừa copy bằng address của attacker"
                },
                {
                    "id": "b",
                    "text": "Thay public blockchain"
                },
                {
                    "id": "c",
                    "text": "Tạo block không cần consensus"
                },
                {
                    "id": "d",
                    "text": "Đổi seed phrase trên blockchain"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Mã độc theo dõi vùng nhớ sao chép và thay địa chỉ vừa copy bằng địa chỉ của kẻ tấn công. Blockchain không cần bị sửa để vụ lừa này xảy ra.",
            "source": "https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/clipboard-hacking/"
        },
        {
            "id": "bc-session3-q127",
            "prompt": "Cách phòng vệ tốt hơn khi chuyển crypto là:",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ nhìn 2 ký tự đầu"
                },
                {
                    "id": "b",
                    "text": "Chỉ nhìn 4 ký tự cuối"
                },
                {
                    "id": "c",
                    "text": "Kiểm tra cả phần giữa và xác nhận trên thiết bị khi có thể"
                },
                {
                    "id": "d",
                    "text": "Không cần kiểm tra checksum"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Địa chỉ giả có thể giống cả đầu lẫn cuối. Cần đối chiếu toàn bộ địa chỉ từ nguồn tin cậy, gồm phần giữa và màn hình ví phần cứng nếu có.",
            "source": "https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/"
        },
        {
            "id": "bc-session3-q128",
            "prompt": "Phát biểu \"coin nằm trong app MetaMask\" là:",
            "options": [
                {
                    "id": "a",
                    "text": "Đúng"
                },
                {
                    "id": "b",
                    "text": "Sai, blockchain lưu state/balance; wallet chủ yếu quản key"
                },
                {
                    "id": "c",
                    "text": "Đúng với Ethereum nhưng sai với Bitcoin"
                },
                {
                    "id": "d",
                    "text": "Đúng nếu dùng hardware wallet"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Ví quản lý khóa để truy cập tài sản được ghi nhận trên blockchain. Xóa ứng dụng không xóa số dư khỏi mạng.",
            "source": "https://support.metamask.io/start/user-guide-secret-recovery-phrase-password-and-private-keys"
        },
        {
            "id": "bc-session3-q129",
            "prompt": "Nếu xóa app wallet nhưng vẫn còn seed phrase đúng:",
            "options": [
                {
                    "id": "a",
                    "text": "Coin biến mất khỏi blockchain"
                },
                {
                    "id": "b",
                    "text": "Có thể khôi phục quyền kiểm soát các key/address tương ứng"
                },
                {
                    "id": "c",
                    "text": "Blockchain xóa account"
                },
                {
                    "id": "d",
                    "text": "Address bị thay ngay"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Cụm từ khôi phục đúng giúp tạo lại các tài khoản được dẫn xuất từ nó. Khóa riêng nhập riêng có thể cần sao lưu riêng; nếu có passphrase thì cũng cần đúng passphrase.",
            "source": "https://support.metamask.io/start/user-guide-secret-recovery-phrase-password-and-private-keys"
        },
        {
            "id": "bc-session3-q130",
            "prompt": "private trong \"private key\" quan trọng vì:",
            "options": [
                {
                    "id": "a",
                    "text": "Blockchain cần private key để hiển thị balance"
                },
                {
                    "id": "b",
                    "text": "Ai có key có thể tạo chữ ký authorize giao dịch"
                },
                {
                    "id": "c",
                    "text": "Nó là tên account"
                },
                {
                    "id": "d",
                    "text": "Nó chính là address"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Khóa riêng cho phép tạo chữ ký mà mạng kiểm tra được bằng khóa công khai. Ai giữ khóa có thể ký với quyền của tài khoản, nên phải giữ bí mật.",
            "source": "https://ethereum.org/en/developers/docs/accounts/"
        },
        {
            "id": "bc-session3-q131",
            "prompt": "Nếu điều kiện PoW yêu cầu thêm một chữ số 0 ở đầu hash hexadecimal, expected work tăng khoảng:",
            "options": [
                {
                    "id": "a",
                    "text": "2 lần"
                },
                {
                    "id": "b",
                    "text": "8 lần"
                },
                {
                    "id": "c",
                    "text": "16 lần"
                },
                {
                    "id": "d",
                    "text": "256 lần"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trong mô hình phân bố đều, thêm một chữ số 0 làm xác suất còn 1/16. Công việc kỳ vọng tăng 16 lần.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q132",
            "prompt": "Tại sao là 16 lần?",
            "options": [
                {
                    "id": "a",
                    "text": "SHA-256 có 16 bit"
                },
                {
                    "id": "b",
                    "text": "Một hex digit có 16 giá trị khả dĩ"
                },
                {
                    "id": "c",
                    "text": "Nonce có 16 byte"
                },
                {
                    "id": "d",
                    "text": "Block header có 16 trường"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Một chữ số hệ 16 biểu diễn 4 bit, có 2^4 = 16 giá trị. Đây là phép đổi hệ số, không phải SHA-256 chỉ có 16 bit.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q133",
            "prompt": "Xác suất một hex digit cụ thể là 0 là:",
            "options": [
                {
                    "id": "a",
                    "text": "1/2"
                },
                {
                    "id": "b",
                    "text": "1/8"
                },
                {
                    "id": "c",
                    "text": "1/16"
                },
                {
                    "id": "d",
                    "text": "1/256"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Theo giả định phân bố đều, 0 chỉ là một trong 16 giá trị của một chữ số hệ 16. Vì vậy xác suất là 1/16.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf"
        },
        {
            "id": "bc-session3-q134",
            "prompt": "Xác suất hash bắt đầu bằng k hex zeros xấp xỉ:",
            "options": [
                {
                    "id": "a",
                    "text": "1/2^k"
                },
                {
                    "id": "b",
                    "text": "1/16^k"
                },
                {
                    "id": "c",
                    "text": "k/16"
                },
                {
                    "id": "d",
                    "text": "1/k"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Trong mô hình độc lập, k vị trí đầu cùng bằng 0 có xác suất (1/16)^k = 1/16^k. Đây là giả định dùng cho bài PoW đơn giản.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q135",
            "prompt": "Expected number of attempts tương ứng xấp xỉ:",
            "options": [
                {
                    "id": "a",
                    "text": "k^16"
                },
                {
                    "id": "b",
                    "text": "2^k"
                },
                {
                    "id": "c",
                    "text": "16^k"
                },
                {
                    "id": "d",
                    "text": "256k"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Xác suất thành công p cho số lần thử kỳ vọng 1/p = 16^k. Đây là trung bình lý thuyết, không bảo đảm số lần thử mỗi lượt.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q136",
            "prompt": "Nếu chương trình thử nonce từ 0 và valid nonce là 61, số hash calls là:",
            "options": [
                {
                    "id": "a",
                    "text": "60"
                },
                {
                    "id": "b",
                    "text": "61"
                },
                {
                    "id": "c",
                    "text": "62"
                },
                {
                    "id": "d",
                    "text": "63"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Theo giả thiết mỗi nonce được băm một lần: 61 − 0 + 1 = 62 ứng viên. Đây là phép đếm, không phải số đo từ nguồn.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q137",
            "prompt": "Tại sao lại là 62?",
            "options": [
                {
                    "id": "a",
                    "text": "Có thêm verify hash"
                },
                {
                    "id": "b",
                    "text": "Các nonce từ 0 đến 61 gồm 62 giá trị"
                },
                {
                    "id": "c",
                    "text": "SHA-256 luôn chạy hai lần"
                },
                {
                    "id": "d",
                    "text": "Nonce bắt đầu từ -1"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Dãy 0, 1, …, 61 có 62 phần tử vì tính cả nonce 0. Không cần cộng thêm lần xác minh.",
            "source": "https://bitcoin.org/bitcoin.pdf"
        },
        {
            "id": "bc-session3-q138",
            "prompt": "Lab PoW minh họa đặc điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Dễ solve, khó verify"
                },
                {
                    "id": "b",
                    "text": "Khó solve, dễ verify"
                },
                {
                    "id": "c",
                    "text": "Khó solve, khó verify"
                },
                {
                    "id": "d",
                    "text": "Dễ solve, dễ verify"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tìm lời giải cần thử nhiều ứng viên, còn kiểm tra một ứng viên đã cho chỉ cần tính hash và so ngưỡng. Đó là tính bất đối xứng của PoW.",
            "source": "https://developer.bitcoin.org/devguide/block_chain.html"
        },
        {
            "id": "bc-session3-q139",
            "prompt": "Một node kiểm tra lời giải PoW đã được cung cấp cần chủ yếu:",
            "options": [
                {
                    "id": "a",
                    "text": "Lặp lại toàn bộ search nonce"
                },
                {
                    "id": "b",
                    "text": "Hash candidate một lần và kiểm tra điều kiện target"
                },
                {
                    "id": "c",
                    "text": "Biết private key miner"
                },
                {
                    "id": "d",
                    "text": "Tải mnemonic miner"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Bài lab chỉ cần một lần đánh giá hàm hash cho ứng viên đã cho. Bitcoin thực tế dùng SHA-256 hai lần trên header và còn phải kiểm tra các quy tắc block khác.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session3-q140",
            "prompt": "Với n=1,000,000, Lab 3.2 kết luận proof có khoảng:",
            "options": [
                {
                    "id": "a",
                    "text": "10 hash"
                },
                {
                    "id": "b",
                    "text": "20 hash"
                },
                {
                    "id": "c",
                    "text": "100 hash"
                },
                {
                    "id": "d",
                    "text": "1,000 hash"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Làm tròn lên log₂(1.000.000) ≈ 19,93 được 20 tầng. Vì thế bài dùng khoảng 20 hash anh em cho một nhánh chứng minh.",
            "source": "https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv"
        },
        {
            "id": "bc-session3-q141",
            "prompt": "Con số này xuất phát từ:",
            "options": [
                {
                    "id": "a",
                    "text": "log₂(n)"
                },
                {
                    "id": "b",
                    "text": "n/2"
                },
                {
                    "id": "c",
                    "text": "√n"
                },
                {
                    "id": "d",
                    "text": "n^2"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Mỗi tầng ghép đôi giảm số nút khoảng một nửa. Số bước từ n lá về một gốc tăng theo log₂(n), không theo n.",
            "source": "https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv"
        },
        {
            "id": "bc-session3-q142",
            "prompt": "Lab đưa SPV Bitcoin làm ví dụ vì SPV:",
            "options": [
                {
                    "id": "a",
                    "text": "Verify transaction membership bằng block header + Merkle proof"
                },
                {
                    "id": "b",
                    "text": "Không sử dụng hash"
                },
                {
                    "id": "c",
                    "text": "Cần toàn bộ transaction history"
                },
                {
                    "id": "d",
                    "text": "Dùng private key của miner"
                }
            ],
            "correctOptionId": "a",
            "explanation": "SPV kiểm tra giao dịch nối tới Merkle root trong header bằng nhánh chứng minh. Nó không cần toàn bộ giao dịch của block để thực hiện riêng phép kiểm tra này.",
            "source": "https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv"
        },
        {
            "id": "bc-session3-q143",
            "prompt": "Nếu Merkle proof tính ra một root khác root trong block header thì:",
            "options": [
                {
                    "id": "a",
                    "text": "Proof được chấp nhận"
                },
                {
                    "id": "b",
                    "text": "Membership proof thất bại"
                },
                {
                    "id": "c",
                    "text": "Private key bị lộ"
                },
                {
                    "id": "d",
                    "text": "Block tự động đổi root"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Root tính lại không bằng root được tin cậy thì bằng chứng không chứng minh được thành viên của cây đó. Không thể tự sửa root để chấp nhận bằng chứng.",
            "source": "https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof"
        },
        {
            "id": "bc-session3-q144",
            "prompt": "Trong Lab 3.3, ký cùng message hai lần bằng cùng private key cho:",
            "options": [
                {
                    "id": "a",
                    "text": "Hai signature khác nhau bắt buộc"
                },
                {
                    "id": "b",
                    "text": "Signature giống nhau"
                },
                {
                    "id": "c",
                    "text": "Hai private key"
                },
                {
                    "id": "d",
                    "text": "Hai Ethereum address ngẫu nhiên"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Quan sát phù hợp RFC 6979: cùng khóa, thông điệp và cấu hình tạo cùng k và chữ ký. Không phải mọi cách triển khai ECDSA đều tất định.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q145",
            "prompt": "Kết quả trên được giải thích bởi:",
            "options": [
                {
                    "id": "a",
                    "text": "BIP44"
                },
                {
                    "id": "b",
                    "text": "RFC 6979 deterministic ECDSA"
                },
                {
                    "id": "c",
                    "text": "EIP-55"
                },
                {
                    "id": "d",
                    "text": "Merkle proof"
                }
            ],
            "correctOptionId": "b",
            "explanation": "RFC 6979 xác định k từ khóa riêng và hash thông điệp. Đây là lý do chữ ký lặp lại được trong bài, không phải do chuẩn địa chỉ EIP-55.",
            "source": "https://www.rfc-editor.org/rfc/rfc6979"
        },
        {
            "id": "bc-session3-q146",
            "prompt": "Khi thay đổi một ký tự trong message nhưng giữ signature cũ, Lab quan sát:",
            "options": [
                {
                    "id": "a",
                    "text": "Vẫn recover đúng address cũ"
                },
                {
                    "id": "b",
                    "text": "Recover một address khác"
                },
                {
                    "id": "c",
                    "text": "Private key được in ra"
                },
                {
                    "id": "d",
                    "text": "Không có hash nào thay đổi"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đổi thông điệp làm đổi hash được dùng để phục hồi. Kết quả không còn khớp người ký ban đầu; tùy đầu vào/thư viện có thể ra địa chỉ khác hoặc báo lỗi.",
            "source": "https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message"
        },
        {
            "id": "bc-session3-q147",
            "prompt": "Kết quả đó minh họa trực tiếp thuộc tính:",
            "options": [
                {
                    "id": "a",
                    "text": "Confidentiality"
                },
                {
                    "id": "b",
                    "text": "Integrity"
                },
                {
                    "id": "c",
                    "text": "Availability"
                },
                {
                    "id": "d",
                    "text": "Mining fairness"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Thử sửa thông điệp rồi kiểm tra lại cho thấy thay đổi bị phát hiện. Đó là tính toàn vẹn; không chứng minh rằng thông điệp đã được mã hóa.",
            "source": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf"
        },
        {
            "id": "bc-session3-q148",
            "prompt": "Trong kết quả Lab, Match: True giữa address gốc và recovered address chứng minh:",
            "options": [
                {
                    "id": "a",
                    "text": "Chữ ký tương ứng với account đã ký message"
                },
                {
                    "id": "b",
                    "text": "Address chứa private key"
                },
                {
                    "id": "c",
                    "text": "SHA-256 bị collision"
                },
                {
                    "id": "d",
                    "text": "Mining thành công"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Địa chỉ phục hồi khớp địa chỉ mong đợi cho thấy chữ ký phù hợp với thông điệp và tài khoản đó. Không tiết lộ khóa riêng hay tự xác minh danh tính ngoài đời.",
            "source": "https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message"
        },
        {
            "id": "bc-session3-q149",
            "prompt": "MetaMask bonus sử dụng phương thức:",
            "options": [
                {
                    "id": "a",
                    "text": "personal_sign"
                },
                {
                    "id": "b",
                    "text": "eth_mine"
                },
                {
                    "id": "c",
                    "text": "merkle_sign"
                },
                {
                    "id": "d",
                    "text": "bip39_sign"
                }
            ],
            "correctOptionId": "a",
            "explanation": "personal_sign ký thông điệp theo định dạng có tiền tố Ethereum Signed Message. Bên xác minh phải dùng cùng cách mã hóa và tiền tố, không băm văn bản tùy ý.",
            "source": "https://docs.metamask.io/metamask-connect/evm/guides/sign-data/"
        },
        {
            "id": "bc-session3-q150",
            "prompt": "Python sử dụng hàm nào trong bonus để recover signer?",
            "options": [
                {
                    "id": "a",
                    "text": "Account.create()"
                },
                {
                    "id": "b",
                    "text": "Account.recover_message()"
                },
                {
                    "id": "c",
                    "text": "hashlib.sha256()"
                },
                {
                    "id": "d",
                    "text": "Web3.mine()"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Account.recover_message nhận thông điệp đã mã hóa và chữ ký, rồi trả địa chỉ người ký. Hàm không cần được cấp khóa riêng để làm việc này.",
            "source": "https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message"
        },
        {
            "id": "bc-session3-q151",
            "prompt": "Việc MetaMask address khớp recovered address trong Python cho thấy:",
            "options": [
                {
                    "id": "a",
                    "text": "Cơ chế chữ ký Ethereum có thể được kiểm tra xuyên các môi trường khác nhau"
                },
                {
                    "id": "b",
                    "text": "Python biết private key của MetaMask"
                },
                {
                    "id": "c",
                    "text": "MetaMask gửi mnemonic cho Python"
                },
                {
                    "id": "d",
                    "text": "Address chính là signature"
                }
            ],
            "correctOptionId": "a",
            "explanation": "MetaMask và Python có thể đối chiếu chữ ký khi dùng cùng byte thông điệp, tiền tố và quy tắc Ethereum. Đây là khả năng tương thích, không phải chia sẻ khóa riêng.",
            "source": "https://docs.metamask.io/metamask-connect/evm/guides/sign-data/"
        }
    ]
};
