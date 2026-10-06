import type { Chapter } from "@/types/quiz";

// Giữ thứ tự và đáp án A1–G30 do Ju cung cấp; chỉ chuẩn hóa định dạng.
// Giải thích dựa trên slide, worksheet và tài liệu Bitcoin chính thức.
// Xem docs/session-4-sources.md về các điểm cần lưu ý trong đề.
export const session4: Chapter = {
    "id": "session-4",
    "title": "Session 4: Bitcoin chuyên sâu và đồng thuận",
    "description": "Ôn tập Session 4 và Lab 4: UTXO, Bitcoin Script, phí giao dịch, mining, đồng thuận Nakamoto, BFT và Lightning Network.",
    "revision": 1,
    "questions": [
        {
            "id": "bc-session4-q001",
            "prompt": "Bài toán cốt lõi mà Bitcoin giải quyết theo slide là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Tăng tốc độ Internet"
                },
                {
                    "id": "b",
                    "text": "Double-spending mà không cần trusted third party"
                },
                {
                    "id": "c",
                    "text": "Mã hóa toàn bộ dữ liệu Internet"
                },
                {
                    "id": "d",
                    "text": "Loại bỏ hoàn toàn transaction fee"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Chi tiêu hai lần là dùng cùng một khoản tiền cho nhiều giao dịch. Bitcoin dùng lịch sử chung và PoW để ngăn việc này mà không cần bên trung gian tin cậy.",
            "source": "/references/session-4-slides.pdf#page=5"
        },
        {
            "id": "bc-session4-q002",
            "prompt": "Bitcoin whitepaper được công bố vào thời điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "03/01/2009"
                },
                {
                    "id": "b",
                    "text": "20/04/2024"
                },
                {
                    "id": "c",
                    "text": "31/10/2008"
                },
                {
                    "id": "d",
                    "text": "01/01/2012"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Slide ghi ngày công bố sách trắng là 31/10/2008. Đây là ngày giới thiệu thiết kế, khác ngày tạo block đầu tiên năm 2009.",
            "source": "/references/session-4-slides.pdf#page=5"
        },
        {
            "id": "bc-session4-q003",
            "prompt": "Genesis block của Bitcoin được tạo vào ngày nào?",
            "options": [
                {
                    "id": "a",
                    "text": "03/01/2009"
                },
                {
                    "id": "b",
                    "text": "31/10/2008"
                },
                {
                    "id": "c",
                    "text": "01/01/2010"
                },
                {
                    "id": "d",
                    "text": "20/04/2024"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Block khởi đầu được tạo ngày 03/01/2009, đánh dấu mạng bắt đầu có lịch sử block. Ngày 31/10/2008 là mốc công bố sách trắng.",
            "source": "/references/session-4-slides.pdf#page=5"
        },
        {
            "id": "bc-session4-q004",
            "prompt": "Trong UTXO model, trạng thái của hệ thống được biểu diễn chủ yếu bằng gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Balance của từng username"
                },
                {
                    "id": "b",
                    "text": "Tập hợp các transaction output chưa được tiêu"
                },
                {
                    "id": "c",
                    "text": "Danh sách private key"
                },
                {
                    "id": "d",
                    "text": "Bảng account nonce"
                }
            ],
            "correctOptionId": "b",
            "explanation": "UTXO là đầu ra giao dịch chưa được tiêu. Trạng thái Bitcoin theo dõi tập đầu ra này để biết khoản nào còn có thể sử dụng.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q005",
            "prompt": "Account model như Ethereum thường biểu diễn tài sản như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Một tập UTXO"
                },
                {
                    "id": "b",
                    "text": "Một Merkle proof cho mỗi đồng coin"
                },
                {
                    "id": "c",
                    "text": "Balance gắn với account/address"
                },
                {
                    "id": "d",
                    "text": "Một file riêng cho mỗi transaction"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Mô hình tài khoản ghi số dư theo tài khoản. Giao dịch cập nhật số dư thay vì tiêu từng đầu ra cũ như UTXO.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q006",
            "prompt": "Một Bitcoin transaction thông thường làm gì với UTXO?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉnh sửa trực tiếp giá trị của UTXO cũ"
                },
                {
                    "id": "b",
                    "text": "Tiêu UTXO cũ và tạo output mới"
                },
                {
                    "id": "c",
                    "text": "Sao chép UTXO mà không tiêu nó"
                },
                {
                    "id": "d",
                    "text": "Chỉ cập nhật balance"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Giao dịch tiêu các UTXO được tham chiếu rồi tạo đầu ra mới. Nó không sửa trực tiếp giá trị của UTXO cũ.",
            "source": "/references/session-4-slides.pdf#page=7"
        },
        {
            "id": "bc-session4-q007",
            "prompt": "“Balance Bitcoin của Alice” được hiểu chính xác nhất là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Một biến balance duy nhất trong blockchain"
                },
                {
                    "id": "b",
                    "text": "Số BTC ghi trong wallet.dat"
                },
                {
                    "id": "c",
                    "text": "Tổng mọi transaction Alice từng nhận"
                },
                {
                    "id": "d",
                    "text": "Tổng các UTXO mà khóa của Alice có thể mở"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Ví cộng các UTXO có thể chi tiêu để hiển thị số dư. Những khoản đã tiêu không còn được cộng dù Alice từng nhận chúng.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q008",
            "prompt": "Một lợi thế của UTXO model về song song hóa là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Transaction tiêu các UTXO khác nhau có thể tương đối độc lập"
                },
                {
                    "id": "b",
                    "text": "Mọi transaction của một người phải có nonce tuần tự"
                },
                {
                    "id": "c",
                    "text": "Mọi transaction phải sửa cùng một balance"
                },
                {
                    "id": "d",
                    "text": "Chỉ miner mới được tạo transaction"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Hai giao dịch dùng các UTXO khác nhau không tranh chấp cùng đầu vào. Điều này tạo điều kiện xử lý độc lập, dù vẫn phải kiểm tra các quy tắc chung.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q009",
            "prompt": "Đặc điểm privacy nào của UTXO được nêu trong slide?",
            "options": [
                {
                    "id": "a",
                    "text": "Mọi payment bắt buộc dùng cùng một address"
                },
                {
                    "id": "b",
                    "text": "UTXO ẩn hoàn toàn sender"
                },
                {
                    "id": "c",
                    "text": "Change có thể được gửi tới address mới"
                },
                {
                    "id": "d",
                    "text": "Blockchain không công khai transaction"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Đưa tiền thừa về địa chỉ mới hạn chế việc tái sử dụng địa chỉ. Đây là hỗ trợ riêng tư, không làm lịch sử giao dịch công khai biến mất.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q010",
            "prompt": "Một input Bitcoin chủ yếu tham chiếu tới gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Block header hiện tại"
                },
                {
                    "id": "b",
                    "text": "Một output của transaction trước"
                },
                {
                    "id": "c",
                    "text": "Public key của miner"
                },
                {
                    "id": "d",
                    "text": "Coinbase của block kế tiếp"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Input chỉ tới một output cũ bằng txid và chỉ số output. Node dùng tham chiếu đó để tìm giá trị và điều kiện chi tiêu.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q011",
            "prompt": "Thông tin nào phù hợp nhất với một transaction input?",
            "options": [
                {
                    "id": "a",
                    "text": "Previous txid, output index và unlocking data"
                },
                {
                    "id": "b",
                    "text": "Chỉ amount và recipient"
                },
                {
                    "id": "c",
                    "text": "Chỉ private key"
                },
                {
                    "id": "d",
                    "text": "Block subsidy"
                }
            ],
            "correctOptionId": "a",
            "explanation": "txid cùng chỉ số output xác định khoản đang tiêu; dữ liệu mở khóa chứng minh quyền chi tiêu. Khóa riêng không được đưa vào giao dịch.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q012",
            "prompt": "Một transaction output thường chứa gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Nonce và timestamp"
                },
                {
                    "id": "b",
                    "text": "Previous block hash"
                },
                {
                    "id": "c",
                    "text": "Private key và signature"
                },
                {
                    "id": "d",
                    "text": "Value và locking script"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Output nêu giá trị tính bằng satoshi và scriptPubKey, tức điều kiện khóa. Giao dịch sau phải thỏa điều kiện ấy để tiêu output.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q013",
            "prompt": "Một UTXO khi được sử dụng sẽ được xử lý thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Có thể tiêu từng phần trực tiếp"
                },
                {
                    "id": "b",
                    "text": "Có thể tiêu lặp lại nếu còn balance"
                },
                {
                    "id": "c",
                    "text": "Được tiêu một lần và toàn bộ"
                },
                {
                    "id": "d",
                    "text": "Chỉ miner được tiêu"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Một UTXO được tiêu trọn vẹn một lần. Nếu cần giữ lại tiền thừa, giao dịch tạo output mới trả về người gửi.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q014",
            "prompt": "Công thức transaction fee của Bitcoin là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Outputs − Inputs"
                },
                {
                    "id": "b",
                    "text": "Inputs − Outputs"
                },
                {
                    "id": "c",
                    "text": "Inputs × fee rate"
                },
                {
                    "id": "d",
                    "text": "Outputs × block height"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Phí là tổng giá trị đầu vào trừ tổng giá trị đầu ra. Đây là phần chênh lệch ngầm định, không phải một trường phí riêng trong giao dịch.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q015",
            "prompt": "Nếu người dùng quên tạo change output thì điều gì xảy ra?",
            "options": [
                {
                    "id": "a",
                    "text": "Phần còn lại trở thành fee"
                },
                {
                    "id": "b",
                    "text": "Transaction tự động bị reject"
                },
                {
                    "id": "c",
                    "text": "Phần còn lại được hoàn tự động"
                },
                {
                    "id": "d",
                    "text": "Miner tự tạo change output"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Không tạo output tiền thừa khiến phần dư được tính vào phí nếu giao dịch được chấp nhận. Ví có thể cảnh báo, nhưng giao thức không tự hoàn tiền.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q016",
            "prompt": "Điểm đặc biệt của coinbase transaction là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Không có outputs"
                },
                {
                    "id": "b",
                    "text": "Không có txid"
                },
                {
                    "id": "c",
                    "text": "Không được nằm trong block"
                },
                {
                    "id": "d",
                    "text": "Không có input thông thường"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Coinbase có input đặc biệt không tham chiếu UTXO thông thường. Nó ghi nhận trợ cấp block và khoản phí mà miner nhận.",
            "source": "/references/session-4-slides.pdf#page=9"
        },
        {
            "id": "bc-session4-q017",
            "prompt": "Giá trị miner có thể nhận từ coinbase gồm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ subsidy"
                },
                {
                    "id": "b",
                    "text": "Subsidy + transaction fees"
                },
                {
                    "id": "c",
                    "text": "Chỉ transaction fees"
                },
                {
                    "id": "d",
                    "text": "Toàn bộ BTC trong block"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Mức nhận tối đa là trợ cấp block cộng phí giao dịch trong block. Phí chuyển từ người dùng sang miner, không phải BTC mới được phát hành.",
            "source": "/references/session-4-slides.pdf#page=9"
        },
        {
            "id": "bc-session4-q018",
            "prompt": "Block subsidy sau halving tháng 4/2024 là bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "12.5 BTC"
                },
                {
                    "id": "b",
                    "text": "6.25 BTC"
                },
                {
                    "id": "c",
                    "text": "3.125 BTC"
                },
                {
                    "id": "d",
                    "text": "1.5625 BTC"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Sau lần halving thứ tư, trợ cấp giảm từ 6,25 xuống 3,125 BTC mỗi block. Tổng coinbase còn có thể bao gồm phí giao dịch.",
            "source": "/references/session-4-slides.pdf#page=23"
        },
        {
            "id": "bc-session4-q019",
            "prompt": "Coinbase output phải chờ bao nhiêu block trước khi được tiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "100 block"
                },
                {
                    "id": "b",
                    "text": "6 block"
                },
                {
                    "id": "c",
                    "text": "2,016 block"
                },
                {
                    "id": "d",
                    "text": "210,000 block"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Coinbase phải đủ độ chín 100 block mới được chi tiêu. Nếu tạo ở độ cao h, sớm nhất có thể được tiêu trong block h + 100.",
            "source": "/references/session-4-slides.pdf#page=9"
        },
        {
            "id": "bc-session4-q020",
            "prompt": "Coinbase maturity chủ yếu giúp giảm rủi ro nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Private key bị lộ"
                },
                {
                    "id": "b",
                    "text": "Hash collision"
                },
                {
                    "id": "c",
                    "text": "Reward của một block bị mất do reorganization"
                },
                {
                    "id": "d",
                    "text": "Address bị trùng"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Nếu block bị thay khỏi chuỗi, phần thưởng của nó cũng mất hiệu lực. Chờ 100 block hạn chế lan truyền rủi ro này sang các giao dịch con.",
            "source": "/references/session-4-slides.pdf#page=9"
        },
        {
            "id": "bc-session4-q021",
            "prompt": "Miner có thể đặt dữ liệu tùy ý vào đâu để mở rộng không gian tìm kiếm PoW?",
            "options": [
                {
                    "id": "a",
                    "text": "scriptPubKey của mọi user"
                },
                {
                    "id": "b",
                    "text": "Coinbase input, chẳng hạn extraNonce"
                },
                {
                    "id": "c",
                    "text": "Previous block hash"
                },
                {
                    "id": "d",
                    "text": "Chain ID"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Thay extraNonce trong input coinbase làm txid coinbase đổi, kéo theo Merkle root và header đổi. Dữ liệu này vẫn phải tuân thủ giới hạn coinbase.",
            "source": "/references/session-4-slides.pdf#page=9"
        },
        {
            "id": "bc-session4-q022",
            "prompt": "txid truyền thống của Bitcoin liên quan đến phép tính nào?",
            "options": [
                {
                    "id": "a",
                    "text": "SHA-1 của public key"
                },
                {
                    "id": "b",
                    "text": "Keccak-256"
                },
                {
                    "id": "c",
                    "text": "Một lần SHA-256 trên block"
                },
                {
                    "id": "d",
                    "text": "Double SHA-256 của serialized transaction, với cách hiển thị byte đảo"
                }
            ],
            "correctOptionId": "d",
            "explanation": "txid là SHA-256 hai lần của dữ liệu giao dịch theo định dạng tính txid, rồi hiển thị đảo thứ tự byte. Với SegWit, định dạng đó bỏ phần witness.",
            "source": "/references/session-4-slides.pdf#page=8"
        },
        {
            "id": "bc-session4-q023",
            "prompt": "So sánh trực giác nào phù hợp nhất với UTXO?",
            "options": [
                {
                    "id": "a",
                    "text": "Các tờ tiền/mảnh giá trị chưa tiêu"
                },
                {
                    "id": "b",
                    "text": "Số dư tài khoản ngân hàng"
                },
                {
                    "id": "c",
                    "text": "Credit score"
                },
                {
                    "id": "d",
                    "text": "Database row có thể update tùy ý"
                }
            ],
            "correctOptionId": "a",
            "explanation": "UTXO giống các mảnh tiền riêng: muốn dùng phải tiêu cả mảnh rồi tạo tiền thừa. Đây là phép so sánh, không phải coin vật lý trong ví.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q024",
            "prompt": "So sánh trực giác nào phù hợp nhất với account model?",
            "options": [
                {
                    "id": "a",
                    "text": "Một hộp nhiều UTXO"
                },
                {
                    "id": "b",
                    "text": "Một tập chữ ký"
                },
                {
                    "id": "c",
                    "text": "Một con số balance của tài khoản"
                },
                {
                    "id": "d",
                    "text": "Một mining pool"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Tài khoản có một số dư được cập nhật khi nhận hoặc gửi tiền. Cách biểu diễn này gần trực giác tài khoản ngân hàng hơn một tập UTXO.",
            "source": "/references/session-4-slides.pdf#page=6"
        },
        {
            "id": "bc-session4-q025",
            "prompt": "Alice có một UTXO 0.8 BTC, muốn gửi Bob 0.5 BTC và trả fee 0.0001 BTC. Change hợp lý là bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "0.3000 BTC"
                },
                {
                    "id": "b",
                    "text": "0.2999 BTC"
                },
                {
                    "id": "c",
                    "text": "0.1999 BTC"
                },
                {
                    "id": "d",
                    "text": "0.7999 BTC"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tiền thừa = 0,8 − 0,5 − 0,0001 = 0,2999 BTC. Hai output trả Bob và Alice cộng lại bằng đầu vào trừ phí.",
            "source": "/references/session-4-slides.pdf#page=19"
        },
        {
            "id": "bc-session4-q026",
            "prompt": "Bitcoin Script được thiết kế theo mô hình nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Stack machine"
                },
                {
                    "id": "b",
                    "text": "Register machine"
                },
                {
                    "id": "c",
                    "text": "Neural network"
                },
                {
                    "id": "d",
                    "text": "SQL engine"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Stack là ngăn xếp: dữ liệu được đưa lên và lấy từ đỉnh. Các lệnh Script thao tác trên ngăn xếp để kiểm tra điều kiện chi tiêu.",
            "source": "/references/session-4-slides.pdf#page=10"
        },
        {
            "id": "bc-session4-q027",
            "prompt": "Vì sao Bitcoin Script cố ý không Turing-complete?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì Bitcoin không hỗ trợ chữ ký số"
                },
                {
                    "id": "b",
                    "text": "Để tránh loop tùy ý, dễ xác định việc thực thi sẽ kết thúc"
                },
                {
                    "id": "c",
                    "text": "Vì SHA-256 không hỗ trợ loop"
                },
                {
                    "id": "d",
                    "text": "Vì block chỉ có 80 byte"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Script không có vòng lặp tùy ý và có giới hạn thực thi. Nhờ đó việc xác minh có phạm vi hữu hạn, tránh chương trình chạy mãi.",
            "source": "/references/session-4-slides.pdf#page=10"
        },
        {
            "id": "bc-session4-q028",
            "prompt": "Đặc điểm nào của Bitcoin Script giúp các node dễ xác minh nhất quán?",
            "options": [
                {
                    "id": "a",
                    "text": "Có global mutable state"
                },
                {
                    "id": "b",
                    "text": "Có random number generator"
                },
                {
                    "id": "c",
                    "text": "Không có persistent state như EVM"
                },
                {
                    "id": "d",
                    "text": "Chỉ chạy trên miner"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Script không có kho trạng thái hợp đồng bền vững như EVM. Cùng dữ liệu và quy tắc thực thi cho cùng kết quả; node vẫn phải kiểm tra trạng thái UTXO.",
            "source": "/references/session-4-slides.pdf#page=10"
        },
        {
            "id": "bc-session4-q029",
            "prompt": "Trade-off của Bitcoin Script là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Nhiều tính năng hơn nhưng chậm hơn EVM"
                },
                {
                    "id": "b",
                    "text": "Không thể xác minh chữ ký"
                },
                {
                    "id": "c",
                    "text": "Không thể khóa BTC"
                },
                {
                    "id": "d",
                    "text": "Ít biểu đạt hơn, đổi lại đơn giản và bề mặt tấn công nhỏ hơn"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Script giới hạn khả năng lập trình để việc kiểm tra đơn giản hơn. Nó vẫn hỗ trợ chữ ký và nhiều điều kiện khóa tiền.",
            "source": "/references/session-4-slides.pdf#page=10"
        },
        {
            "id": "bc-session4-q030",
            "prompt": "P2PKH là viết tắt của gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Pay to Public Key Hash"
                },
                {
                    "id": "b",
                    "text": "Proof to Public Key Hash"
                },
                {
                    "id": "c",
                    "text": "Pay to Private Key Hash"
                },
                {
                    "id": "d",
                    "text": "Public to Public Key Header"
                }
            ],
            "correctOptionId": "a",
            "explanation": "P2PKH là Pay to Public Key Hash: trả tiền tới hash của khóa công khai. Khi tiêu, người nhận phải chứng minh khóa và chữ ký phù hợp.",
            "source": "/references/session-4-slides.pdf#page=11"
        },
        {
            "id": "bc-session4-q031",
            "prompt": "Để tiêu một P2PKH output, người chi tiêu thường cung cấp gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Private key trực tiếp"
                },
                {
                    "id": "b",
                    "text": "Signature và public key"
                },
                {
                    "id": "c",
                    "text": "Seed phrase"
                },
                {
                    "id": "d",
                    "text": "Block header"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Khóa công khai phải băm ra đúng hash đã khóa; chữ ký phải hợp lệ với khóa đó. Người chi tiêu không công bố khóa riêng.",
            "source": "/references/session-4-slides.pdf#page=11"
        },
        {
            "id": "bc-session4-q032",
            "prompt": "OP_DUP trong P2PKH dùng để làm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Hash transaction hai lần"
                },
                {
                    "id": "b",
                    "text": "Kiểm tra fee"
                },
                {
                    "id": "c",
                    "text": "Nhân bản phần tử trên stack"
                },
                {
                    "id": "d",
                    "text": "Tạo private key mới"
                }
            ],
            "correctOptionId": "c",
            "explanation": "OP_DUP sao chép phần tử trên đỉnh stack. Trong P2PKH, một bản khóa dùng để băm, bản còn lại được giữ để kiểm tra chữ ký.",
            "source": "/references/session-4-slides.pdf#page=11"
        },
        {
            "id": "bc-session4-q033",
            "prompt": "OP_HASH160 được dùng để làm gì trong P2PKH?",
            "options": [
                {
                    "id": "a",
                    "text": "Hash block header"
                },
                {
                    "id": "b",
                    "text": "Hash private key"
                },
                {
                    "id": "c",
                    "text": "Tạo Merkle root"
                },
                {
                    "id": "d",
                    "text": "Hash public key để so với hash đã khóa"
                }
            ],
            "correctOptionId": "d",
            "explanation": "OP_HASH160 tính RIPEMD-160(SHA-256(pubkey)). Kết quả được đối chiếu với hash khóa công khai đã ghi trong điều kiện chi tiêu.",
            "source": "/references/session-4-slides.pdf#page=11"
        },
        {
            "id": "bc-session4-q034",
            "prompt": "OP_EQUALVERIFY có mục đích gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Xác minh hai giá trị hash khớp nhau"
                },
                {
                    "id": "b",
                    "text": "Tính transaction fee"
                },
                {
                    "id": "c",
                    "text": "Kiểm tra difficulty"
                },
                {
                    "id": "d",
                    "text": "Tạo signature"
                }
            ],
            "correctOptionId": "a",
            "explanation": "OP_EQUALVERIFY yêu cầu hai giá trị trên stack bằng nhau, nếu khác thì thất bại. Trong P2PKH, đó là hai hash khóa công khai.",
            "source": "/references/session-4-slides.pdf#page=11"
        },
        {
            "id": "bc-session4-q035",
            "prompt": "OP_CHECKSIG kiểm tra điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Merkle root"
                },
                {
                    "id": "b",
                    "text": "Digital signature"
                },
                {
                    "id": "c",
                    "text": "Block subsidy"
                },
                {
                    "id": "d",
                    "text": "Fee rate"
                }
            ],
            "correctOptionId": "b",
            "explanation": "OP_CHECKSIG xác minh chữ ký với khóa công khai và dữ liệu giao dịch được ký. Nó không kiểm tra trợ cấp block hay độ khó đào.",
            "source": "/references/session-4-slides.pdf#page=11"
        },
        {
            "id": "bc-session4-q036",
            "prompt": "P2SH khóa tiền vào gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Hash của private key"
                },
                {
                    "id": "b",
                    "text": "Hash của block"
                },
                {
                    "id": "c",
                    "text": "Hash của script"
                },
                {
                    "id": "d",
                    "text": "Hash của fee"
                }
            ],
            "correctOptionId": "c",
            "explanation": "P2SH cam kết bằng hash của redeem script, tức chương trình mở khóa. Người gửi chưa cần biết toàn bộ chương trình đó.",
            "source": "/references/session-4-slides.pdf#page=12"
        },
        {
            "id": "bc-session4-q037",
            "prompt": "Redeem script trong P2SH thường được tiết lộ khi nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Khi mining block"
                },
                {
                    "id": "b",
                    "text": "Khi tạo address"
                },
                {
                    "id": "c",
                    "text": "Khi tạo private key"
                },
                {
                    "id": "d",
                    "text": "Khi output được tiêu"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Khi tiêu output, người nhận đưa redeem script và dữ liệu thỏa mãn nó. Node kiểm tra hash của script khớp cam kết trước đó.",
            "source": "/references/session-4-slides.pdf#page=12"
        },
        {
            "id": "bc-session4-q038",
            "prompt": "Ứng dụng nổi bật ban đầu của P2SH là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Multisig"
                },
                {
                    "id": "b",
                    "text": "Mining"
                },
                {
                    "id": "c",
                    "text": "Stablecoin"
                },
                {
                    "id": "d",
                    "text": "NFT"
                }
            ],
            "correctOptionId": "a",
            "explanation": "P2SH cho phép điều kiện như cần 2 trong 3 chữ ký mà người gửi chỉ dùng một địa chỉ. Sự phức tạp được chuyển sang lúc chi tiêu.",
            "source": "/references/session-4-slides.pdf#page=12"
        },
        {
            "id": "bc-session4-q039",
            "prompt": "Theo slide, Bitcoin address nên được hiểu chính xác nhất là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Public key nguyên bản"
                },
                {
                    "id": "b",
                    "text": "Human-readable encoding của locking condition"
                },
                {
                    "id": "c",
                    "text": "Private key đã mã hóa"
                },
                {
                    "id": "d",
                    "text": "Một account có balance"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Địa chỉ mã hóa thông tin để ví tạo điều kiện khóa đầu ra. Nó không nhất thiết là khóa công khai nguyên bản hoặc một tài khoản chứa số dư.",
            "source": "/references/session-4-slides.pdf#page=15"
        },
        {
            "id": "bc-session4-q040",
            "prompt": "P2PKH address truyền thống thường có đặc điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Bắt đầu bc1p"
                },
                {
                    "id": "b",
                    "text": "Bắt đầu 3"
                },
                {
                    "id": "c",
                    "text": "Bắt đầu 1, dùng Base58Check"
                },
                {
                    "id": "d",
                    "text": "Bắt đầu 0x"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trên Bitcoin mainnet, P2PKH dùng Base58Check và thường bắt đầu bằng 1. Tiền tố khác có thể được dùng ở mạng thử nghiệm.",
            "source": "/references/session-4-slides.pdf#page=15"
        },
        {
            "id": "bc-session4-q041",
            "prompt": "P2SH address thường có đặc điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Bắt đầu 3, dùng Base58Check"
                },
                {
                    "id": "b",
                    "text": "Bắt đầu 1"
                },
                {
                    "id": "c",
                    "text": "Bắt đầu bc1q"
                },
                {
                    "id": "d",
                    "text": "Bắt đầu bc1p"
                }
            ],
            "correctOptionId": "a",
            "explanation": "P2SH mainnet dùng Base58Check với tiền tố 3. Dữ liệu địa chỉ chứa hash của script, không chứa khóa riêng.",
            "source": "/references/session-4-slides.pdf#page=15"
        },
        {
            "id": "bc-session4-q042",
            "prompt": "P2WPKH SegWit v0 thường dùng dạng address nào?",
            "options": [
                {
                    "id": "a",
                    "text": "1... Base58Check"
                },
                {
                    "id": "b",
                    "text": "3... Base58Check"
                },
                {
                    "id": "c",
                    "text": "0x... hex"
                },
                {
                    "id": "d",
                    "text": "bc1q... Bech32"
                }
            ],
            "correctOptionId": "d",
            "explanation": "P2WPKH gốc trên mainnet là witness phiên bản 0, mã hóa Bech32 nên bắt đầu bc1q. Không phải mọi địa chỉ bc1q đều là P2WPKH.",
            "source": "/references/session-4-slides.pdf#page=15"
        },
        {
            "id": "bc-session4-q043",
            "prompt": "P2TR Taproot thường dùng dạng address nào?",
            "options": [
                {
                    "id": "a",
                    "text": "3..."
                },
                {
                    "id": "b",
                    "text": "bc1p... Bech32m"
                },
                {
                    "id": "c",
                    "text": "bc1q..."
                },
                {
                    "id": "d",
                    "text": "1..."
                }
            ],
            "correctOptionId": "b",
            "explanation": "Taproot dùng witness phiên bản 1 với Bech32m, tạo tiền tố bc1p trên mainnet. Bech32m khác checksum Bech32 của phiên bản 0.",
            "source": "/references/session-4-slides.pdf#page=15"
        },
        {
            "id": "bc-session4-q044",
            "prompt": "SegWit trực tiếp xử lý vấn đề nổi bật nào?",
            "options": [
                {
                    "id": "a",
                    "text": "51% attack"
                },
                {
                    "id": "b",
                    "text": "ASIC centralization"
                },
                {
                    "id": "c",
                    "text": "Transaction malleability"
                },
                {
                    "id": "d",
                    "text": "Halving"
                }
            ],
            "correctOptionId": "c",
            "explanation": "SegWit tách witness khỏi txid, ngăn sửa chữ ký làm đổi txid với giao dịch thỏa điều kiện SegWit. Nó không loại bỏ mọi cách biến đổi giao dịch.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki"
        },
        {
            "id": "bc-session4-q045",
            "prompt": "Ý tưởng chính của SegWit đối với signature là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Chuyển signature sang witness, tách khỏi cách tính txid cũ"
                },
                {
                    "id": "b",
                    "text": "Xóa hoàn toàn signature"
                },
                {
                    "id": "c",
                    "text": "Lưu signature trong coinbase"
                },
                {
                    "id": "d",
                    "text": "Thay signature bằng password"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Chữ ký vẫn được truyền và xác minh trong witness. Chúng chỉ bị loại khỏi phần dữ liệu dùng tính txid, không bị xóa khỏi giao dịch.",
            "source": "/references/session-4-slides.pdf#page=13"
        },
        {
            "id": "bc-session4-q046",
            "prompt": "Công thức weight được slide sử dụng là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "baseSize + witnessSize"
                },
                {
                    "id": "b",
                    "text": "baseSize × 4 + witnessSize"
                },
                {
                    "id": "c",
                    "text": "baseSize × witnessSize"
                },
                {
                    "id": "d",
                    "text": "baseSize / 4"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Mỗi byte phần cơ sở tính 4 đơn vị trọng lượng, mỗi byte witness tính 1. witnessSize ở đây là phần dữ liệu thêm ngoài baseSize.",
            "source": "/references/session-4-slides.pdf#page=13"
        },
        {
            "id": "bc-session4-q047",
            "prompt": "vsize được suy ra chủ yếu từ gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Amount gửi"
                },
                {
                    "id": "b",
                    "text": "Số confirmations"
                },
                {
                    "id": "c",
                    "text": "Block height"
                },
                {
                    "id": "d",
                    "text": "Weight chia 4, làm tròn phù hợp"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Kích thước ảo là trọng lượng chia 4 rồi làm tròn lên. Quy tắc làm tròn bảo đảm phần lẻ vẫn được tính vào vsize.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki"
        },
        {
            "id": "bc-session4-q048",
            "prompt": "BIP-143 trong SegWit mang lại cải tiến nào được slide nhắc tới?",
            "options": [
                {
                    "id": "a",
                    "text": "Thay SHA-256 bằng Keccak"
                },
                {
                    "id": "b",
                    "text": "Tăng subsidy"
                },
                {
                    "id": "c",
                    "text": "Sighash sạch hơn, cam kết input amount và giảm vấn đề chi phí bậc hai"
                },
                {
                    "id": "d",
                    "text": "Bỏ public key"
                }
            ],
            "correctOptionId": "c",
            "explanation": "BIP-143 ký cả giá trị input và cho phép tái sử dụng các hash trung gian. Nhờ đó giảm việc băm lặp gây chi phí bậc hai.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki"
        },
        {
            "id": "bc-session4-q049",
            "prompt": "Vì sao SegWit có thể được triển khai như soft fork?",
            "options": [
                {
                    "id": "a",
                    "text": "Node cũ vẫn có thể chấp nhận chuỗi theo quy tắc tương thích"
                },
                {
                    "id": "b",
                    "text": "Mọi node cũ bị loại khỏi mạng"
                },
                {
                    "id": "c",
                    "text": "Vì SegWit không thay đổi transaction"
                },
                {
                    "id": "d",
                    "text": "Vì chỉ mining pool dùng SegWit"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Node cũ chấp nhận dạng giao dịch tương thích nhưng không kiểm tra đầy đủ điều kiện witness mới. Node nâng cấp áp dụng thêm ràng buộc SegWit.",
            "source": "/references/session-4-slides.pdf#page=13"
        },
        {
            "id": "bc-session4-q050",
            "prompt": "BIP-340 liên quan chủ yếu tới gì?",
            "options": [
                {
                    "id": "a",
                    "text": "RBF"
                },
                {
                    "id": "b",
                    "text": "P2SH"
                },
                {
                    "id": "c",
                    "text": "SegWit v0"
                },
                {
                    "id": "d",
                    "text": "Schnorr signatures"
                }
            ],
            "correctOptionId": "d",
            "explanation": "BIP-340 đặc tả chữ ký Schnorr trên secp256k1. Nó là phần chữ ký của bộ nâng cấp Taproot, không phải quy tắc tăng phí RBF.",
            "source": "/references/session-4-slides.pdf#page=14"
        },
        {
            "id": "bc-session4-q051",
            "prompt": "BIP-341 liên quan tới gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Coinbase maturity"
                },
                {
                    "id": "b",
                    "text": "Taproot và MAST/script tree"
                },
                {
                    "id": "c",
                    "text": "Mining difficulty"
                },
                {
                    "id": "d",
                    "text": "RBF"
                }
            ],
            "correctOptionId": "b",
            "explanation": "BIP-341 định nghĩa đầu ra Taproot và cách tiêu theo khóa hoặc cây script. Cây Merkle cho phép chứng minh nhánh dùng mà không lộ toàn bộ cây.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki"
        },
        {
            "id": "bc-session4-q052",
            "prompt": "BIP-342 liên quan tới gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Address Base58"
                },
                {
                    "id": "b",
                    "text": "Block subsidy"
                },
                {
                    "id": "c",
                    "text": "Tapscript và nâng cấp opcode cho script path"
                },
                {
                    "id": "d",
                    "text": "SHA-1"
                }
            ],
            "correctOptionId": "c",
            "explanation": "BIP-342 quy định Tapscript khi chi tiêu bằng đường script của Taproot, gồm cách xác minh và các lệnh liên quan.",
            "source": "/references/session-4-slides.pdf#page=14"
        },
        {
            "id": "bc-session4-q053",
            "prompt": "Một lợi ích quan trọng của Taproot là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Có thể chỉ tiết lộ script branch cần dùng, cải thiện privacy và hiệu quả"
                },
                {
                    "id": "b",
                    "text": "Bắt buộc tiết lộ toàn bộ script tree"
                },
                {
                    "id": "c",
                    "text": "Loại bỏ chữ ký số"
                },
                {
                    "id": "d",
                    "text": "Làm transaction không cần fee"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Đường script chỉ tiết lộ script được dùng và đường chứng minh; đường khóa có thể không tiết lộ script nào. Điều này tiết kiệm dữ liệu và tăng riêng tư.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki"
        },
        {
            "id": "bc-session4-q054",
            "prompt": "Vì sao Bitcoin có fee market?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì private key khan hiếm"
                },
                {
                    "id": "b",
                    "text": "Vì số lượng wallet bị giới hạn"
                },
                {
                    "id": "c",
                    "text": "Vì block space là tài nguyên khan hiếm"
                },
                {
                    "id": "d",
                    "text": "Vì SHA-256 tính phí"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Block có giới hạn trọng lượng nên không chứa được mọi giao dịch ngay lập tức. Người gửi cạnh tranh chỗ trong block bằng mức phí.",
            "source": "/references/session-4-slides.pdf#page=16"
        },
        {
            "id": "bc-session4-q055",
            "prompt": "Đơn vị phổ biến để so sánh fee rate là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "sat/vB"
                },
                {
                    "id": "b",
                    "text": "BTC/block"
                },
                {
                    "id": "c",
                    "text": "hash/s"
                },
                {
                    "id": "d",
                    "text": "BTC/address"
                }
            ],
            "correctOptionId": "a",
            "explanation": "sat/vB là số satoshi trả cho mỗi byte ảo. Nó giúp so sánh tiền phí với lượng chỗ mà giao dịch chiếm trong block.",
            "source": "/references/session-4-slides.pdf#page=16"
        },
        {
            "id": "bc-session4-q056",
            "prompt": "Transaction fee của Bitcoin phụ thuộc trực tiếp nhất vào yếu tố nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Giá trị BTC gửi"
                },
                {
                    "id": "b",
                    "text": "Tuổi của address"
                },
                {
                    "id": "c",
                    "text": "Số BTC người gửi sở hữu"
                },
                {
                    "id": "d",
                    "text": "Kích thước/vsize và fee rate"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Phí bằng vsize nhân mức phí trên mỗi vB. Gửi nhiều BTC hơn không tự làm giao dịch tốn nhiều chỗ hơn.",
            "source": "/references/session-4-slides.pdf#page=16"
        },
        {
            "id": "bc-session4-q057",
            "prompt": "Một transaction 141 vB ở 10 sat/vB trả khoảng bao nhiêu fee?",
            "options": [
                {
                    "id": "a",
                    "text": "141 sat"
                },
                {
                    "id": "b",
                    "text": "1,410 sat"
                },
                {
                    "id": "c",
                    "text": "14,100 sat"
                },
                {
                    "id": "d",
                    "text": "141,000 sat"
                }
            ],
            "correctOptionId": "b",
            "explanation": "141 × 10 = 1.410 satoshi. Đây là phép nhân kích thước ảo với mức phí, không phải phần trăm số BTC chuyển đi.",
            "source": "/references/session-4-slides.pdf#page=16"
        },
        {
            "id": "bc-session4-q058",
            "prompt": "Miner thường ưu tiên transaction dựa trên chỉ số nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Giá trị USD của payment"
                },
                {
                    "id": "b",
                    "text": "Tuổi private key"
                },
                {
                    "id": "c",
                    "text": "Fee rate theo sat/vB"
                },
                {
                    "id": "d",
                    "text": "Số lượng output duy nhất"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Mức phí trên mỗi vB giúp miner chọn giao dịch có doanh thu cao theo chỗ chiếm. Thực tế còn phải xét quan hệ phụ thuộc giữa các giao dịch.",
            "source": "/references/session-4-slides.pdf#page=16"
        },
        {
            "id": "bc-session4-q059",
            "prompt": "Mempool nên được hiểu thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Mỗi node có waiting room riêng, không có một mempool toàn cục duy nhất"
                },
                {
                    "id": "b",
                    "text": "Một database duy nhất do Bitcoin Core quản lý toàn cầu"
                },
                {
                    "id": "c",
                    "text": "Chỉ mining pool mới có mempool"
                },
                {
                    "id": "d",
                    "text": "Là nơi chứa confirmed transaction"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Mỗi node tự lưu tập giao dịch chưa xác nhận mà nó chấp nhận. Do thời điểm nhận và chính sách khác nhau, các mempool có thể không giống nhau.",
            "source": "/references/session-4-slides.pdf#page=17"
        },
        {
            "id": "bc-session4-q060",
            "prompt": "Điều gì có thể xảy ra với transaction trả fee quá thấp?",
            "options": [
                {
                    "id": "a",
                    "text": "Luôn được confirm sau đúng 10 phút"
                },
                {
                    "id": "b",
                    "text": "Miner bắt buộc phải chọn"
                },
                {
                    "id": "c",
                    "text": "Fee được tự động nâng"
                },
                {
                    "id": "d",
                    "text": "Có thể chờ lâu rồi bị evict/expire"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Giao dịch trả phí thấp có thể chờ lâu hoặc bị loại khỏi bộ nhớ theo chính sách node. Không có bảo đảm rằng nó sẽ được xác nhận sau 10 phút.",
            "source": "/references/session-4-slides.pdf#page=17"
        },
        {
            "id": "bc-session4-q061",
            "prompt": "RBF, BIP-125, cho phép điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Thay block đã confirm"
                },
                {
                    "id": "b",
                    "text": "Phát lại transaction tiêu cùng coin với fee cao hơn"
                },
                {
                    "id": "c",
                    "text": "Giảm subsidy"
                },
                {
                    "id": "d",
                    "text": "Bỏ signature"
                }
            ],
            "correctOptionId": "b",
            "explanation": "RBF thay giao dịch chưa xác nhận bằng giao dịch xung đột trả phí cao hơn theo chính sách node. Nó không sửa một giao dịch đã nằm chắc trong lịch sử chuỗi.",
            "source": "/references/session-4-slides.pdf#page=17"
        },
        {
            "id": "bc-session4-q062",
            "prompt": "CPFP hoạt động theo ý tưởng nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Parent trả fee cho child"
                },
                {
                    "id": "b",
                    "text": "Miner tự sửa fee"
                },
                {
                    "id": "c",
                    "text": "Tạo high-fee child tiêu output của low-fee parent để package hấp dẫn hơn"
                },
                {
                    "id": "d",
                    "text": "Xóa parent"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Giao dịch con trả phí cao và tiêu output của giao dịch cha. Muốn nhận phí con, miner phải đưa cả cha vào block, khiến cả nhóm hấp dẫn hơn.",
            "source": "/references/session-4-slides.pdf#page=17"
        },
        {
            "id": "bc-session4-q063",
            "prompt": "Phát biểu nào đúng nhất về unconfirmed transaction?",
            "options": [
                {
                    "id": "a",
                    "text": "Là một lời hứa, chưa phải settlement chắc chắn"
                },
                {
                    "id": "b",
                    "text": "Đã final tuyệt đối"
                },
                {
                    "id": "c",
                    "text": "Không thể RBF"
                },
                {
                    "id": "d",
                    "text": "Không thể double-spend"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Giao dịch chưa xác nhận có thể bị thay thế, bị loại hoặc thua giao dịch xung đột. Vì vậy nó chưa bảo đảm người nhận sẽ nhận được tiền trên chuỗi.",
            "source": "/references/session-4-slides.pdf#page=17"
        },
        {
            "id": "bc-session4-q064",
            "prompt": "Vì sao transaction 2-input thường đắt hơn 1-input ở cùng fee rate?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì gửi nhiều BTC hơn"
                },
                {
                    "id": "b",
                    "text": "Vì có nhiều confirmations hơn"
                },
                {
                    "id": "c",
                    "text": "Vì miner ghét nhiều input"
                },
                {
                    "id": "d",
                    "text": "Vì transaction thường có vsize lớn hơn"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Thêm input thường cần thêm tham chiếu và dữ liệu mở khóa, làm vsize tăng. Với cùng sat/vB và loại input tương đương, phí vì thế cao hơn.",
            "source": "/references/session-4-slides.pdf#page=19"
        },
        {
            "id": "bc-session4-q065",
            "prompt": "Đợt congestion năm 2017 trong slide gắn với điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Taproot"
                },
                {
                    "id": "b",
                    "text": "ICO era và tranh luận block size"
                },
                {
                    "id": "c",
                    "text": "Runes"
                },
                {
                    "id": "d",
                    "text": "Ethereum Merge"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Slide đặt tắc nghẽn Bitcoin năm 2017 trong giai đoạn ICO và tranh luận kích thước block. Đây là bối cảnh thời gian, không có nghĩa các ICO đều chạy trên Bitcoin.",
            "source": "/references/session-4-slides.pdf#page=18"
        },
        {
            "id": "bc-session4-q066",
            "prompt": "Ordinals/inscriptions năm 2023 tận dụng vùng nào để đưa dữ liệu ảnh/text vào Bitcoin?",
            "options": [
                {
                    "id": "a",
                    "text": "Nonce"
                },
                {
                    "id": "b",
                    "text": "Previous block hash"
                },
                {
                    "id": "c",
                    "text": "Witness data"
                },
                {
                    "id": "d",
                    "text": "Chain ID"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Inscriptions đưa dữ liệu vào witness của giao dịch Bitcoin. Dữ liệu vẫn sử dụng trọng lượng block, không phải được lưu miễn phí ngoài chuỗi.",
            "source": "/references/session-4-slides.pdf#page=18"
        },
        {
            "id": "bc-session4-q067",
            "prompt": "BRC-20 minting waves có tác động nào được slide nhắc tới?",
            "options": [
                {
                    "id": "a",
                    "text": "Làm đầy block và đẩy fee tăng"
                },
                {
                    "id": "b",
                    "text": "Giảm block size xuống 100 KB"
                },
                {
                    "id": "c",
                    "text": "Tắt SegWit"
                },
                {
                    "id": "d",
                    "text": "Bỏ mining"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Nhiều giao dịch mint cùng cạnh tranh không gian block làm nhu cầu tăng. Khi chỗ hữu hạn, mức phí để được ưu tiên có thể tăng theo.",
            "source": "/references/session-4-slides.pdf#page=18"
        },
        {
            "id": "bc-session4-q068",
            "prompt": "Sự kiện nào gắn với fee spike rất lớn tại block 840,000?",
            "options": [
                {
                    "id": "a",
                    "text": "The DAO"
                },
                {
                    "id": "b",
                    "text": "Ethereum Merge"
                },
                {
                    "id": "c",
                    "text": "Bitcoin genesis"
                },
                {
                    "id": "d",
                    "text": "Halving 2024 và Runes launch"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Runes ra mắt cùng block halving 840.000. Slide dùng sự kiện này để minh họa nhu cầu block tăng mạnh và phí giao dịch đột biến.",
            "source": "/references/session-4-slides.pdf#page=18"
        },
        {
            "id": "bc-session4-q069",
            "prompt": "Fee cực cao vào thời điểm Runes launch minh họa điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Protocol luôn đặt fee cố định"
                },
                {
                    "id": "b",
                    "text": "Block space vận hành như một cuộc đấu giá theo demand"
                },
                {
                    "id": "c",
                    "text": "Fee phụ thuộc amount gửi"
                },
                {
                    "id": "d",
                    "text": "Miner được tự mint fee"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Người gửi cạnh tranh chỗ trong block bằng phí. Khi nhiều người muốn được ghi nhận ngay, giá chỗ có thể tăng mạnh dù lượng BTC gửi không đổi.",
            "source": "/references/session-4-slides.pdf#page=18"
        },
        {
            "id": "bc-session4-q070",
            "prompt": "Phát biểu nào SAI về Bitcoin fee?",
            "options": [
                {
                    "id": "a",
                    "text": "Fee có thể tăng mạnh khi mempool congested"
                },
                {
                    "id": "b",
                    "text": "Miner có incentive chọn transaction trả tốt"
                },
                {
                    "id": "c",
                    "text": "Protocol đặt cố định mọi transaction ở 10 sat/vB"
                },
                {
                    "id": "d",
                    "text": "Transaction nhỏ có thể trả ít hơn transaction lớn"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Không có quy tắc đồng thuận ấn định mọi giao dịch ở 10 sat/vB. Đó chỉ có thể là mức phí ví lựa chọn trong một thời điểm cụ thể.",
            "source": "/references/session-4-slides.pdf#page=16"
        },
        {
            "id": "bc-session4-q071",
            "prompt": "Theo Lab 4, cách tính vsize được dùng là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "ceil(weight / 4)"
                },
                {
                    "id": "b",
                    "text": "weight × 4"
                },
                {
                    "id": "c",
                    "text": "floor(weight / 8)"
                },
                {
                    "id": "d",
                    "text": "inputs + outputs"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Lab dùng ceil(weight / 4), tức làm tròn lên. Với số nguyên, có thể viết (weight + 3) // 4 để cho cùng kết quả.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q072",
            "prompt": "Một transaction có weight 749 WU sẽ có vsize theo cách tính trong lab là bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "186 vB"
                },
                {
                    "id": "b",
                    "text": "187 vB"
                },
                {
                    "id": "c",
                    "text": "749 vB"
                },
                {
                    "id": "d",
                    "text": "188 vB"
                }
            ],
            "correctOptionId": "d",
            "explanation": "749 / 4 = 187,25, làm tròn lên thành 188 vB. 187 vB là kết quả cắt phần lẻ và không đúng quy tắc đã nêu.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q073",
            "prompt": "Transaction 187 vB ở khoảng 3.6 triệu sat/vB sẽ trả xấp xỉ bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "0.067 BTC"
                },
                {
                    "id": "b",
                    "text": "0.67 BTC"
                },
                {
                    "id": "c",
                    "text": "6.73 BTC"
                },
                {
                    "id": "d",
                    "text": "67.3 BTC"
                }
            ],
            "correctOptionId": "c",
            "explanation": "187 × 3.600.000 = 673.200.000 satoshi = 6,732 BTC. Làm tròn đến hai chữ số thập phân được khoảng 6,73 BTC.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q074",
            "prompt": "Bước đầu tiên miner thường làm khi tạo candidate block là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Tạo private key cho mọi user"
                },
                {
                    "id": "b",
                    "text": "Chọn transaction từ mempool"
                },
                {
                    "id": "c",
                    "text": "Thay đổi consensus rules"
                },
                {
                    "id": "d",
                    "text": "Tạo Ethereum account"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Miner thường lấy các giao dịch hợp lệ đang chờ từ mempool để dựng block ứng viên. Khi chọn phải xét phí và các giao dịch cha cần đi kèm.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q075",
            "prompt": "Ngoài transaction thường, miner phải tạo gì cho candidate block?",
            "options": [
                {
                    "id": "a",
                    "text": "Coinbase transaction và Merkle root"
                },
                {
                    "id": "b",
                    "text": "Chain ID mới"
                },
                {
                    "id": "c",
                    "text": "Seed phrase"
                },
                {
                    "id": "d",
                    "text": "Smart contract"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Coinbase ghi khoản thưởng cho miner; Merkle root cam kết danh sách giao dịch của block. Cả hai là thành phần khi dựng block ứng viên.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q076",
            "prompt": "Bitcoin block header có kích thước bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "32 byte"
                },
                {
                    "id": "b",
                    "text": "64 byte"
                },
                {
                    "id": "c",
                    "text": "80 byte"
                },
                {
                    "id": "d",
                    "text": "256 byte"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Header dài 80 byte; đó chỉ là phần đầu block. Toàn bộ block còn chứa số lượng và dữ liệu các giao dịch.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q077",
            "prompt": "Tập nào sau đây gồm các trường chính của Bitcoin block header?",
            "options": [
                {
                    "id": "a",
                    "text": "account, nonce, gas, calldata"
                },
                {
                    "id": "b",
                    "text": "sender, receiver, amount, fee"
                },
                {
                    "id": "c",
                    "text": "seed, mnemonic, address, balance"
                },
                {
                    "id": "d",
                    "text": "version, previous hash, Merkle root, time, bits, nonce"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Sáu trường gồm version, hash block trước, Merkle root, thời gian, bits và nonce. bits mã hóa ngưỡng PoW; nonce là giá trị được thay đổi để thử băm.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q078",
            "prompt": "Điều kiện PoW của Bitcoin được biểu diễn chính xác nhất là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "hash > target"
                },
                {
                    "id": "b",
                    "text": "dSHA256(header) < target"
                },
                {
                    "id": "c",
                    "text": "nonce = target"
                },
                {
                    "id": "d",
                    "text": "hash = zero"
                }
            ],
            "correctOptionId": "b",
            "explanation": "B là đáp án dự kiến của đề. Chính xác theo Bitcoin, hash được chấp nhận khi nhỏ hơn hoặc bằng target, tức hash ≤ target, không chỉ dấu <.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session4-q079",
            "prompt": "Khi mining, miner thường thay đổi trường nào liên tục trước tiên?",
            "options": [
                {
                    "id": "a",
                    "text": "Nonce"
                },
                {
                    "id": "b",
                    "text": "Previous block hash"
                },
                {
                    "id": "c",
                    "text": "Version của Bitcoin Core"
                },
                {
                    "id": "d",
                    "text": "Public key người nhận"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Đổi nonce tạo header khác để thử hash mới. Nonce không cần tăng đến một giá trị định trước và không biểu thị lượng BTC được thưởng.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q080",
            "prompt": "Nếu không gian nonce 32-bit đã được thử hết, miner có thể làm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Xóa block trước"
                },
                {
                    "id": "b",
                    "text": "Tăng subsidy"
                },
                {
                    "id": "c",
                    "text": "Đổi extraNonce trong coinbase, làm Merkle root và header thay đổi"
                },
                {
                    "id": "d",
                    "text": "Bỏ PoW"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Đổi extraNonce làm txid coinbase thay đổi, kéo theo Merkle root và header mới. Miner nhờ đó có thêm không gian thử ngoài nonce 32 bit.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q081",
            "prompt": "Vì sao verify PoW rẻ hơn rất nhiều so với tìm PoW?",
            "options": [
                {
                    "id": "a",
                    "text": "Verifier không dùng SHA-256"
                },
                {
                    "id": "b",
                    "text": "Verifier biết private key miner"
                },
                {
                    "id": "c",
                    "text": "Verifier chỉ kiểm Merkle root"
                },
                {
                    "id": "d",
                    "text": "Chỉ cần hash header và so với target thay vì thử khổng lồ số candidate"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Khi đã có header, chỉ cần băm SHA-256 hai lần rồi so ngưỡng. Tìm header đạt ngưỡng phải thử rất nhiều ứng viên; xác minh cả block còn có các bước khác.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q082",
            "prompt": "Vì sao mining được mô tả giống lottery hơn race?",
            "options": [
                {
                    "id": "a",
                    "text": "Miner có thể dự đoán hash tiếp theo"
                },
                {
                    "id": "b",
                    "text": "Mỗi phép hash là một thử nghiệm gần như độc lập"
                },
                {
                    "id": "c",
                    "text": "Miner nhanh nhất luôn thắng mọi block"
                },
                {
                    "id": "d",
                    "text": "Nonce lớn hơn luôn tốt hơn"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Trong mô hình hash lý tưởng, mỗi header mới cho một cơ hội gần độc lập. Máy nhanh hơn có nhiều lượt thử hơn, nhưng không chắc thắng từng block.",
            "source": "/references/session-4-slides.pdf#page=21"
        },
        {
            "id": "bc-session4-q083",
            "prompt": "Khi target giảm thì mining thay đổi thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Khó hơn"
                },
                {
                    "id": "b",
                    "text": "Dễ hơn"
                },
                {
                    "id": "c",
                    "text": "Không đổi"
                },
                {
                    "id": "d",
                    "text": "Không còn cần PoW"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Target thấp hơn nghĩa là ít giá trị hash được chấp nhận hơn. Xác suất thành công mỗi lần thử giảm nên cần nhiều lần thử trung bình hơn.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q084",
            "prompt": "Quan hệ thông thường giữa difficulty và target là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Cùng tăng"
                },
                {
                    "id": "b",
                    "text": "Hoàn toàn độc lập"
                },
                {
                    "id": "c",
                    "text": "Difficulty tăng thì target giảm"
                },
                {
                    "id": "d",
                    "text": "Target tăng thì difficulty cũng tăng"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Độ khó đo mức khắt khe so với một ngưỡng chuẩn và tỉ lệ nghịch với target. Vì vậy độ khó tăng thì target giảm.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q085",
            "prompt": "Bitcoin retarget difficulty sau mỗi bao nhiêu block?",
            "options": [
                {
                    "id": "a",
                    "text": "100"
                },
                {
                    "id": "b",
                    "text": "210,000"
                },
                {
                    "id": "c",
                    "text": "840,000"
                },
                {
                    "id": "d",
                    "text": "2,016"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Bitcoin mainnet điều chỉnh ngưỡng sau mỗi 2.016 block. Mục tiêu là đưa thời gian tạo block trung bình về khoảng 10 phút.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q086",
            "prompt": "2,016 block ở mục tiêu 10 phút/block tương ứng khoảng bao lâu?",
            "options": [
                {
                    "id": "a",
                    "text": "1 ngày"
                },
                {
                    "id": "b",
                    "text": "2 tuần"
                },
                {
                    "id": "c",
                    "text": "1 tháng"
                },
                {
                    "id": "d",
                    "text": "1 năm"
                }
            ],
            "correctOptionId": "b",
            "explanation": "2.016 × 10 = 20.160 phút = 336 giờ = 14 ngày. Đây là thời gian mục tiêu, không phải thời gian được bảo đảm chính xác.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q087",
            "prompt": "Công thức trực giác của target adjustment là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "new target = old target × actual time / expected time"
                },
                {
                    "id": "b",
                    "text": "new target = old target + subsidy"
                },
                {
                    "id": "c",
                    "text": "new target = old target × hashrate"
                },
                {
                    "id": "d",
                    "text": "new target = fee / vsize"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Nếu thời gian thực ngắn hơn dự kiến, tỉ số actual/expected nhỏ hơn 1 nên target giảm. Công thức thực tế còn có giới hạn điều chỉnh và độ chính xác số.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q088",
            "prompt": "Nếu 2,016 block được đào chỉ trong một nửa thời gian kỳ vọng, điều gì hợp lý xảy ra?",
            "options": [
                {
                    "id": "a",
                    "text": "Target tăng gấp đôi"
                },
                {
                    "id": "b",
                    "text": "Difficulty giảm"
                },
                {
                    "id": "c",
                    "text": "Target giảm khoảng một nửa, difficulty tăng"
                },
                {
                    "id": "d",
                    "text": "Subsidy tăng"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Tỉ số thời gian là 1/2 nên target mới xấp xỉ một nửa target cũ. Ngưỡng thấp hơn làm xác suất tìm block mỗi lần thử giảm.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q089",
            "prompt": "Slide nhắc Bitcoin giới hạn mức thay đổi difficulty mỗi kỳ xấp xỉ thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Không giới hạn"
                },
                {
                    "id": "b",
                    "text": "Chỉ được 1%"
                },
                {
                    "id": "c",
                    "text": "Chỉ được 10%"
                },
                {
                    "id": "d",
                    "text": "Giới hạn khoảng ×4 hoặc ÷4"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Thời gian dùng để điều chỉnh được kẹp trong khoảng 1/4 đến 4 lần mục tiêu. Nhờ đó ngưỡng không nhảy vô hạn chỉ trong một kỳ.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q090",
            "prompt": "Nếu network hashrate đột ngột tăng mạnh trước kỳ retarget thì trước mắt điều gì có thể xảy ra?",
            "options": [
                {
                    "id": "a",
                    "text": "Block tạm thời được tìm nhanh hơn"
                },
                {
                    "id": "b",
                    "text": "Block subsidy ngay lập tức giảm"
                },
                {
                    "id": "c",
                    "text": "21M cap tăng"
                },
                {
                    "id": "d",
                    "text": "Transaction không cần fee"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Khi target chưa đổi, nhiều phép băm mỗi giây hơn làm thời gian chờ block trung bình ngắn lại. Điều chỉnh độ khó phản ứng ở kỳ kế tiếp.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q091",
            "prompt": "Tăng hashrate có đồng nghĩa mạng phát hành nhiều BTC hơn mãi mãi không?",
            "options": [
                {
                    "id": "a",
                    "text": "Có, vì hash tạo coin"
                },
                {
                    "id": "b",
                    "text": "Có, nếu miner đủ lớn"
                },
                {
                    "id": "c",
                    "text": "Không, difficulty adjustment kéo lịch phát hành về quỹ đạo"
                },
                {
                    "id": "d",
                    "text": "Chỉ đúng sau halving"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Độ khó điều chỉnh để đưa nhịp block về mục tiêu. Nó không tăng trợ cấp mỗi block hay trần cung, dù lịch theo ngày có thể lệch tạm thời.",
            "source": "/references/session-4-slides.pdf#page=22"
        },
        {
            "id": "bc-session4-q092",
            "prompt": "Bitcoin halving diễn ra xấp xỉ mỗi bao nhiêu block?",
            "options": [
                {
                    "id": "a",
                    "text": "210,000"
                },
                {
                    "id": "b",
                    "text": "2,016"
                },
                {
                    "id": "c",
                    "text": "100"
                },
                {
                    "id": "d",
                    "text": "840"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Trợ cấp Bitcoin mainnet giảm một nửa theo mỗi 210.000 block. Khoảng bốn năm chỉ là quy đổi theo nhịp block trung bình.",
            "source": "/references/session-4-slides.pdf#page=23"
        },
        {
            "id": "bc-session4-q093",
            "prompt": "Block subsidy ban đầu của Bitcoin là bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "3.125 BTC"
                },
                {
                    "id": "b",
                    "text": "6.25 BTC"
                },
                {
                    "id": "c",
                    "text": "25 BTC"
                },
                {
                    "id": "d",
                    "text": "50 BTC"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Trợ cấp khởi đầu là 50 BTC mỗi block rồi giảm theo các kỳ halving. Phí giao dịch là phần thưởng bổ sung, tách khỏi trợ cấp.",
            "source": "/references/session-4-slides.pdf#page=23"
        },
        {
            "id": "bc-session4-q094",
            "prompt": "Chuỗi subsidy nào đúng?",
            "options": [
                {
                    "id": "a",
                    "text": "50 → 40 → 30 → 20"
                },
                {
                    "id": "b",
                    "text": "50 → 25 → 12.5 → 6.25 → 3.125"
                },
                {
                    "id": "c",
                    "text": "100 → 50 → 10 → 1"
                },
                {
                    "id": "d",
                    "text": "21 → 10.5 → 5.25"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Mỗi kỳ lấy một nửa trợ cấp kỳ trước: 50, 25, 12,5, 6,25 rồi 3,125 BTC. Không phải giảm đi một lượng BTC cố định.",
            "source": "/references/session-4-slides.pdf#page=23"
        },
        {
            "id": "bc-session4-q095",
            "prompt": "Trần khoảng 21 triệu BTC hình thành chủ yếu từ đâu?",
            "options": [
                {
                    "id": "a",
                    "text": "Mining pool biểu quyết"
                },
                {
                    "id": "b",
                    "text": "Exchange đặt giới hạn"
                },
                {
                    "id": "c",
                    "text": "Quy tắc phát hành giảm theo chuỗi hình học trong consensus"
                },
                {
                    "id": "d",
                    "text": "Số lượng address"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Chuỗi trợ cấp giảm một nửa có tổng hữu hạn: 210.000 × 50 × 2 ≈ 21 triệu BTC. Làm tròn theo satoshi khiến tổng phát hành thực tế thấp hơn đôi chút.",
            "source": "/references/session-4-slides.pdf#page=23"
        },
        {
            "id": "bc-session4-q096",
            "prompt": "Khi subsidy tiến dần về 0, nguồn security budget nào ngày càng quan trọng?",
            "options": [
                {
                    "id": "a",
                    "text": "Transaction fees"
                },
                {
                    "id": "b",
                    "text": "Seed phrase fees"
                },
                {
                    "id": "c",
                    "text": "NFT royalties"
                },
                {
                    "id": "d",
                    "text": "Gas của Ethereum"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Khi BTC mới từ trợ cấp giảm, phí của người dùng trở thành nguồn trả công ngày càng quan trọng. Điều này không bảo đảm mức thu nhập miner trong tương lai.",
            "source": "/references/session-4-slides.pdf#page=23"
        },
        {
            "id": "bc-session4-q097",
            "prompt": "Lộ trình phần cứng mining trong slide là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "ASIC → CPU → GPU → FPGA"
                },
                {
                    "id": "b",
                    "text": "GPU → CPU → ASIC → FPGA"
                },
                {
                    "id": "c",
                    "text": "CPU → ASIC → GPU → FPGA"
                },
                {
                    "id": "d",
                    "text": "CPU → GPU → FPGA → ASIC"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Slide mô tả quá trình từ CPU đa dụng qua GPU, FPGA rồi ASIC chuyên dụng. Mục tiêu là thực hiện SHA-256 hiệu quả hơn về tốc độ và điện năng.",
            "source": "/references/session-4-slides.pdf#page=24"
        },
        {
            "id": "bc-session4-q098",
            "prompt": "Công suất băm điển hình của modern ASIC được slide đưa ra ở khoảng nào?",
            "options": [
                {
                    "id": "a",
                    "text": "100–300 H/s"
                },
                {
                    "id": "b",
                    "text": "100–300 TH/s"
                },
                {
                    "id": "c",
                    "text": "100–300 kH/s"
                },
                {
                    "id": "d",
                    "text": "100–300 MH/s"
                }
            ],
            "correctOptionId": "b",
            "explanation": "TH/s nghĩa là nghìn tỷ phép băm mỗi giây. Mức 100–300 TH/s là ví dụ trong slide, không phải giới hạn cho mọi máy ASIC hoặc thông số mới nhất.",
            "source": "/references/session-4-slides.pdf#page=24"
        },
        {
            "id": "bc-session4-q099",
            "prompt": "Hiệu suất năng lượng ASIC trong slide được nêu xấp xỉ ở mức nào?",
            "options": [
                {
                    "id": "a",
                    "text": "15–25 BTC/TH"
                },
                {
                    "id": "b",
                    "text": "15–25 W/block"
                },
                {
                    "id": "c",
                    "text": "15–25 J/TH"
                },
                {
                    "id": "d",
                    "text": "15–25 sat/hash"
                }
            ],
            "correctOptionId": "c",
            "explanation": "J/TH đo số joule cần cho một nghìn tỷ phép băm; thấp hơn là tiết kiệm năng lượng hơn. Khoảng 15–25 là số liệu minh họa của slide.",
            "source": "/references/session-4-slides.pdf#page=24"
        },
        {
            "id": "bc-session4-q100",
            "prompt": "Vì sao PoW tạo “security wall” về kinh tế?",
            "options": [
                {
                    "id": "a",
                    "text": "Muốn tấn công phải huy động phần cứng, điện và thời gian tương đương đáng kể"
                },
                {
                    "id": "b",
                    "text": "Attacker phải biết seed phrase của Satoshi"
                },
                {
                    "id": "c",
                    "text": "Blockchain bị mã hóa bằng AES"
                },
                {
                    "id": "d",
                    "text": "Full node bí mật"
                }
            ],
            "correctOptionId": "a",
            "explanation": "PoW khiến việc tạo chuỗi cạnh tranh cần máy móc, điện và thời gian. Chi phí kinh tế này tạo rào cản, không chứng minh tấn công là bất khả thi.",
            "source": "/references/session-4-slides.pdf#page=24"
        },
        {
            "id": "bc-session4-q101",
            "prompt": "“Share” trong mining pool chủ yếu là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Một phần BTC đã được token hóa"
                },
                {
                    "id": "b",
                    "text": "Cổ phiếu công ty mining"
                },
                {
                    "id": "c",
                    "text": "Một UTXO đặc biệt"
                },
                {
                    "id": "d",
                    "text": "Low-difficulty PoW chứng minh miner đã đóng góp work"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Share là kết quả băm đạt ngưỡng dễ hơn ngưỡng mạng để ghi nhận đóng góp. Phần lớn share không đủ điều kiện trở thành block Bitcoin.",
            "source": "/references/session-4-slides.pdf#page=25"
        },
        {
            "id": "bc-session4-q102",
            "prompt": "Lợi ích chính của mining pool đối với miner nhỏ là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Tăng block subsidy"
                },
                {
                    "id": "b",
                    "text": "Giảm variance của thu nhập"
                },
                {
                    "id": "c",
                    "text": "Làm mining không tốn điện"
                },
                {
                    "id": "d",
                    "text": "Loại bỏ PoW"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Pool chia thu nhập theo đóng góp, giúp miner nhận khoản nhỏ đều hơn thay vì hiếm khi trúng cả block. Tổng trợ cấp mạng không tăng vì tham gia pool.",
            "source": "/references/session-4-slides.pdf#page=25"
        },
        {
            "id": "bc-session4-q103",
            "prompt": "Cơ chế nào được slide nhắc tới như một cách giảm lo ngại tập trung của pool?",
            "options": [
                {
                    "id": "a",
                    "text": "Cấm miner rời pool"
                },
                {
                    "id": "b",
                    "text": "Cho pool sở hữu private key miner"
                },
                {
                    "id": "c",
                    "text": "Miner có thể đổi pool; Stratum V2 tăng quyền lựa chọn transaction của miner"
                },
                {
                    "id": "d",
                    "text": "Mỗi pool chỉ được đào một block"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Khả năng đổi pool hạn chế quyền kiểm soát của một nhà vận hành. Cơ chế chọn công việc của Stratum V2 có thể trao thêm quyền chọn giao dịch cho miner.",
            "source": "/references/session-4-slides.pdf#page=25"
        },
        {
            "id": "bc-session4-q104",
            "prompt": "Quy tắc chain selection của Nakamoto consensus là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Chọn valid chain có greatest cumulative work"
                },
                {
                    "id": "b",
                    "text": "Chọn chain có timestamp mới nhất"
                },
                {
                    "id": "c",
                    "text": "Chọn chain có nhiều transaction nhất"
                },
                {
                    "id": "d",
                    "text": "Chọn chain do pool lớn nhất công bố"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Node chọn chuỗi hợp lệ có tổng công việc tích lũy lớn nhất. Nhiều công việc không giúp một chuỗi vi phạm quy tắc trở thành hợp lệ.",
            "source": "/references/session-4-slides.pdf#page=26"
        },
        {
            "id": "bc-session4-q105",
            "prompt": "Vì sao gọi “longest chain” có thể chưa chính xác?",
            "options": [
                {
                    "id": "a",
                    "text": "Bitcoin không có block"
                },
                {
                    "id": "b",
                    "text": "Chain ngắn hơn luôn thắng"
                },
                {
                    "id": "c",
                    "text": "Node đếm số address"
                },
                {
                    "id": "d",
                    "text": "Điều quan trọng là cumulative work, tức “heaviest chain”"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Số block chưa phản ánh đầy đủ độ khó của từng block. Tổng công việc tích lũy mới là tiêu chí chọn giữa các chuỗi hợp lệ.",
            "source": "/references/session-4-slides.pdf#page=26"
        },
        {
            "id": "bc-session4-q106",
            "prompt": "Nakamoto consensus khác BFT voting ở điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Cần danh sách voter cố định"
                },
                {
                    "id": "b",
                    "text": "Không có voting round hay identity vote truyền thống; chain work đóng vai trò quyết định"
                },
                {
                    "id": "c",
                    "text": "Không có block"
                },
                {
                    "id": "d",
                    "text": "Không dùng cryptography"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Bitcoin không yêu cầu các vòng bỏ phiếu của danh sách validator cố định. Việc đào nối chuỗi biểu thị lựa chọn bằng công việc đã thực hiện.",
            "source": "/references/session-4-slides.pdf#page=26"
        },
        {
            "id": "bc-session4-q107",
            "prompt": "PoW giúp Bitcoin chống Sybil như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Cấm tạo nhiều node"
                },
                {
                    "id": "b",
                    "text": "Một IP chỉ được một node"
                },
                {
                    "id": "c",
                    "text": "Identity rẻ nhưng computational work thì tốn chi phí"
                },
                {
                    "id": "d",
                    "text": "Yêu cầu KYC"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Tạo thêm danh tính không tự tạo thêm năng lực băm. Sybil là giả nhiều người tham gia; PoW buộc ảnh hưởng phải gắn với tài nguyên thực.",
            "source": "/references/session-4-slides.pdf#page=26"
        },
        {
            "id": "bc-session4-q108",
            "prompt": "“Incentive glue” của Bitcoin chủ yếu là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Block reward làm hành vi honest trở nên có lợi về kinh tế"
                },
                {
                    "id": "b",
                    "text": "Miner bị pháp luật bắt buộc"
                },
                {
                    "id": "c",
                    "text": "Miner không thể gian lận kỹ thuật"
                },
                {
                    "id": "d",
                    "text": "Mọi miner dùng cùng private key"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Phần thưởng khuyến khích miner tạo block được mạng chấp nhận. Đây là động lực kinh tế, không phải bảo đảm mọi chiến lược gian lận đều vô ích.",
            "source": "/references/session-4-slides.pdf#page=26"
        },
        {
            "id": "bc-session4-q109",
            "prompt": "Natural fork có thể xảy ra khi nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ khi bị hack"
                },
                {
                    "id": "b",
                    "text": "Khi một user quên change"
                },
                {
                    "id": "c",
                    "text": "Khi SegWit bị tắt"
                },
                {
                    "id": "d",
                    "text": "Hai miner tìm thấy valid block gần như cùng lúc"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Hai miner có thể tìm block hợp lệ trước khi kịp nhận block của nhau. Độ trễ truyền tin tạo hai nhánh tạm thời mà không cần có tấn công.",
            "source": "/references/session-4-slides.pdf#page=27"
        },
        {
            "id": "bc-session4-q110",
            "prompt": "Natural fork thường được giải quyết như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Satoshi chọn branch"
                },
                {
                    "id": "b",
                    "text": "Một branch tích lũy nhiều work hơn và mạng hội tụ theo branch đó"
                },
                {
                    "id": "c",
                    "text": "Hai branch tồn tại vĩnh viễn"
                },
                {
                    "id": "d",
                    "text": "Exchange bỏ phiếu"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Khi một nhánh có tổng công việc lớn hơn, các node chuyển sang nhánh hợp lệ đó. Giao dịch ở nhánh thua có thể quay lại mempool nếu còn hợp lệ.",
            "source": "/references/session-4-slides.pdf#page=27"
        },
        {
            "id": "bc-session4-q111",
            "prompt": "Block trên branch hợp lệ nhưng sau đó bị bỏ khỏi canonical chain được xem là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Genesis block"
                },
                {
                    "id": "b",
                    "text": "Coinbase"
                },
                {
                    "id": "c",
                    "text": "Stale/orphaned block trong ngữ cảnh bài học"
                },
                {
                    "id": "d",
                    "text": "Smart contract"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Thuật ngữ chính xác là stale block khi block hợp lệ rời chuỗi chính. Orphan cũng được dùng trong bài, nhưng có thể chỉ block chưa biết block cha.",
            "source": "/references/session-4-slides.pdf#page=27"
        },
        {
            "id": "bc-session4-q112",
            "prompt": "Bitcoin cung cấp loại finality nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Probabilistic finality"
                },
                {
                    "id": "b",
                    "text": "Deterministic finality ngay sau một block"
                },
                {
                    "id": "c",
                    "text": "Không có consensus"
                },
                {
                    "id": "d",
                    "text": "Legal finality"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Finality xác suất nghĩa là càng nhiều block nối sau, khả năng bị đảo càng nhỏ trong mô hình an ninh. Không có mốc chốt tuyệt đối chỉ do số xác nhận.",
            "source": "/references/session-4-slides.pdf#page=28"
        },
        {
            "id": "bc-session4-q113",
            "prompt": "Khi số confirmation tăng, khả năng đảo ngược transaction của attacker dưới 50% hashrate thay đổi thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Tăng tuyến tính"
                },
                {
                    "id": "b",
                    "text": "Không đổi"
                },
                {
                    "id": "c",
                    "text": "Tăng theo hàm mũ"
                },
                {
                    "id": "d",
                    "text": "Giảm rất nhanh, xấp xỉ theo hàm mũ"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Nếu phần băm của kẻ tấn công nhỏ hơn phần trung thực, khoảng cách lớn hơn làm cơ hội đuổi kịp giảm nhanh. Kết luận phụ thuộc giả định của mô hình.",
            "source": "/references/session-4-slides.pdf#page=28"
        },
        {
            "id": "bc-session4-q114",
            "prompt": "Trực giác trong slide cho attacker với q < 50%, honest fraction p, kém z block là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "p + q + z"
                },
                {
                    "id": "b",
                    "text": "(q/p)^z"
                },
                {
                    "id": "c",
                    "text": "z/q"
                },
                {
                    "id": "d",
                    "text": "2^q"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Với q < p và đang kém đúng z block, xác suất cuối cùng đuổi kịp trong mô hình là (q/p)^z. Đây không phải toàn bộ công thức rủi ro sau z xác nhận.",
            "source": "https://bitcoin.org/bitcoin.pdf#page=6"
        },
        {
            "id": "bc-session4-q115",
            "prompt": "Với payment rất nhỏ như một ly cà phê, slide gợi ý điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Luôn chờ 100 block"
                },
                {
                    "id": "b",
                    "text": "Chờ 2,016 block"
                },
                {
                    "id": "c",
                    "text": "Có thể chấp nhận 0-conf cùng rủi ro hoặc dùng L2"
                },
                {
                    "id": "d",
                    "text": "Không được dùng Bitcoin"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Slide nêu chấp nhận rủi ro chưa xác nhận hoặc dùng Lightning cho khoản nhỏ. Đây là lựa chọn theo rủi ro, không bảo đảm giao dịch 0-conf an toàn.",
            "source": "/references/session-4-slides.pdf#page=28"
        },
        {
            "id": "bc-session4-q116",
            "prompt": "Normal payment thường có thể chờ khoảng bao nhiêu confirmation theo bảng trong slide?",
            "options": [
                {
                    "id": "a",
                    "text": "1–3"
                },
                {
                    "id": "b",
                    "text": "20–30"
                },
                {
                    "id": "c",
                    "text": "100"
                },
                {
                    "id": "d",
                    "text": "2,016"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Bảng trong slide minh họa 1–3 xác nhận cho khoản thông thường. Đây là quy ước học tập, không phải yêu cầu đồng thuận hay khuyến nghị cho mọi thanh toán.",
            "source": "/references/session-4-slides.pdf#page=28"
        },
        {
            "id": "bc-session4-q117",
            "prompt": "Khoản giá trị cao hoặc exchange deposit thường được slide minh họa bằng mức nào?",
            "options": [
                {
                    "id": "a",
                    "text": "0 confirmation"
                },
                {
                    "id": "b",
                    "text": "1 confirmation"
                },
                {
                    "id": "c",
                    "text": "100 confirmation"
                },
                {
                    "id": "d",
                    "text": "6 confirmation, khoảng một giờ"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Sáu xác nhận tương ứng khoảng một giờ nếu trung bình 10 phút/block. Mức chờ thực tế tùy rủi ro và chính sách bên nhận, không bảo đảm chốt tuyệt đối.",
            "source": "/references/session-4-slides.pdf#page=28"
        },
        {
            "id": "bc-session4-q118",
            "prompt": "Coinbase reward yêu cầu maturity bao nhiêu block?",
            "options": [
                {
                    "id": "a",
                    "text": "6"
                },
                {
                    "id": "b",
                    "text": "100"
                },
                {
                    "id": "c",
                    "text": "1,000"
                },
                {
                    "id": "d",
                    "text": "210,000"
                }
            ],
            "correctOptionId": "b",
            "explanation": "100 block là quy tắc đồng thuận dành cho chi tiêu coinbase. Nó khác quy ước người nhận tự chọn đợi 1, 3 hay 6 xác nhận.",
            "source": "/references/session-4-slides.pdf#page=9"
        },
        {
            "id": "bc-session4-q119",
            "prompt": "Một attacker có majority hashrate CÓ THỂ làm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Giả signature của Satoshi"
                },
                {
                    "id": "b",
                    "text": "Tạo BTC vượt consensus rules"
                },
                {
                    "id": "c",
                    "text": "Double-spend coin của chính attacker"
                },
                {
                    "id": "d",
                    "text": "Thay private key của user"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Kẻ tấn công có thể xây chuỗi thay thế để đảo giao dịch của chính mình rồi tiêu lại khoản đó. Quyền tạo chuỗi không cho phép giả chữ ký của người khác.",
            "source": "/references/session-4-slides.pdf#page=29"
        },
        {
            "id": "bc-session4-q120",
            "prompt": "Majority attacker có thể thực hiện hành vi nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Censor một số transaction bằng cách không đưa chúng vào block của mình"
                },
                {
                    "id": "b",
                    "text": "Tự thay SHA-256"
                },
                {
                    "id": "c",
                    "text": "Đọc private key từ address"
                },
                {
                    "id": "d",
                    "text": "Thay 21M cap và bắt full node chấp nhận"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Miner chọn giao dịch cho block của mình nên có thể loại một số giao dịch. Duy trì kiểm duyệt trên chuỗi chính còn đòi hỏi thắng cạnh tranh công việc.",
            "source": "/references/session-4-slides.pdf#page=29"
        },
        {
            "id": "bc-session4-q121",
            "prompt": "Majority attacker có thể ảnh hưởng honest blocks thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Biến chúng thành Ethereum blocks"
                },
                {
                    "id": "b",
                    "text": "Xóa cryptography"
                },
                {
                    "id": "c",
                    "text": "Tăng block reward của chúng"
                },
                {
                    "id": "d",
                    "text": "Làm chúng bị orphan nếu chain attacker vượt cumulative work"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Nếu chuỗi hợp lệ của kẻ tấn công vượt tổng công việc, node có thể đổi nhánh. Khi ấy một số block trung thực trở thành stale và mất phần thưởng trên chuỗi chính.",
            "source": "/references/session-4-slides.pdf#page=29"
        },
        {
            "id": "bc-session4-q122",
            "prompt": "Vì sao 51% attacker không thể lấy BTC từ address bất kỳ?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì attacker không biết block height"
                },
                {
                    "id": "b",
                    "text": "Vì hashrate không cho khả năng giả chữ ký hợp lệ"
                },
                {
                    "id": "c",
                    "text": "Vì UTXO không có owner"
                },
                {
                    "id": "d",
                    "text": "Vì transaction fee quá cao"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Năng lực băm không thay thế khóa riêng cần để ký chi tiêu. Full node vẫn kiểm tra điều kiện mở khóa dù block do miner có hashrate rất lớn tạo ra.",
            "source": "/references/session-4-slides.pdf#page=30"
        },
        {
            "id": "bc-session4-q123",
            "prompt": "Nếu majority miner tạo block trả coinbase vượt mức subsidy hợp lệ, điều gì xảy ra?",
            "options": [
                {
                    "id": "a",
                    "text": "Block chắc chắn thắng vì PoW lớn"
                },
                {
                    "id": "b",
                    "text": "Reward mới trở thành luật"
                },
                {
                    "id": "c",
                    "text": "Full node reject block vì vi phạm consensus rules"
                },
                {
                    "id": "d",
                    "text": "Exchange quyết định"
                }
            ],
            "correctOptionId": "c",
            "explanation": "C đúng nếu tổng coinbase vượt trợ cấp cộng phí. Đề thiếu phần phí: vượt riêng trợ cấp vẫn hợp lệ nếu phần thêm không vượt tổng phí của block.",
            "source": "https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp"
        },
        {
            "id": "bc-session4-q124",
            "prompt": "Vì sao deep reorg ngày càng khó?",
            "options": [
                {
                    "id": "a",
                    "text": "Attacker phải tái tạo ngày càng nhiều cumulative work trong khi honest chain tiếp tục tiến"
                },
                {
                    "id": "b",
                    "text": "Private key tự thay đổi"
                },
                {
                    "id": "c",
                    "text": "Fee tự tăng vô hạn"
                },
                {
                    "id": "d",
                    "text": "Block cũ bị mã hóa"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Đảo một block sâu đòi làm lại công việc của nhánh thay thế và đuổi kịp chuỗi đang tăng. Chi phí vì thế lớn hơn khi lịch sử cần thay dài hơn.",
            "source": "/references/session-4-slides.pdf#page=30"
        },
        {
            "id": "bc-session4-q125",
            "prompt": "Ý nghĩa của câu “Security = making attacks unprofitable, not impossible” là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Bitcoin chứng minh attack bất khả thi về toán học"
                },
                {
                    "id": "b",
                    "text": "PoW loại bỏ mọi attacker"
                },
                {
                    "id": "c",
                    "text": "Attack không cần chi phí"
                },
                {
                    "id": "d",
                    "text": "Thiết kế khiến attack rất tốn kém và kém hấp dẫn kinh tế, chứ không chứng minh xác suất bằng 0"
                }
            ],
            "correctOptionId": "d",
            "explanation": "An ninh kinh tế làm tấn công đắt và ít hấp dẫn so với lợi ích dự kiến. Nó không loại trừ kẻ chấp nhận lỗ hoặc có mục tiêu ngoài lợi nhuận.",
            "source": "/references/session-4-slides.pdf#page=30"
        },
        {
            "id": "bc-session4-q126",
            "prompt": "Selfish mining hoạt động theo ý tưởng nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Publish mọi block ngay lập tức"
                },
                {
                    "id": "b",
                    "text": "Giữ block đã tìm được và tung ra chiến lược để làm lãng phí work của honest miners"
                },
                {
                    "id": "c",
                    "text": "Không mining"
                },
                {
                    "id": "d",
                    "text": "Chỉ mine empty block"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đào ích kỷ giữ kín block rồi công bố vào thời điểm có lợi để làm công việc đối thủ bị bỏ. Chiến lược nhằm tăng phần thưởng tương đối.",
            "source": "/references/session-4-slides.pdf#page=31"
        },
        {
            "id": "bc-session4-q127",
            "prompt": "Tại sao selfish mining làm giả định “honest majority” tinh tế hơn?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì private key có thể bị phá"
                },
                {
                    "id": "b",
                    "text": "Vì block subsidy không tồn tại"
                },
                {
                    "id": "c",
                    "text": "Incentive và network position cũng ảnh hưởng chiến lược, không chỉ ngưỡng 50% đơn giản"
                },
                {
                    "id": "d",
                    "text": "Vì miner không có fee"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Khả năng lan truyền block và cách miner phản ứng khi có nhánh ngang nhau ảnh hưởng lợi nhuận. Vì vậy chỉ nhìn ngưỡng 50% là chưa đủ.",
            "source": "/references/session-4-slides.pdf#page=31"
        },
        {
            "id": "bc-session4-q128",
            "prompt": "Slide lưu ý selfish mining về mặt lý thuyết có thể mang lại lợi thế với hashrate nào trong một số điều kiện mạng tốt?",
            "options": [
                {
                    "id": "a",
                    "text": "Dưới 50%, thậm chí khoảng 25–33% trong mô hình nghiên cứu"
                },
                {
                    "id": "b",
                    "text": "Chỉ đúng ở 99%"
                },
                {
                    "id": "c",
                    "text": "Chỉ đúng ở 100%"
                },
                {
                    "id": "d",
                    "text": "Không bao giờ"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Khoảng 25–33% được nêu theo mô hình và lợi thế mạng nhất định. Đây không phải ngưỡng lợi nhuận chung cho mọi mạng hoặc mọi chiến lược.",
            "source": "/references/session-4-slides.pdf#page=31"
        },
        {
            "id": "bc-session4-q129",
            "prompt": "Một phê phán môi trường đối với PoW được slide nêu là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Bitcoin không dùng điện"
                },
                {
                    "id": "b",
                    "text": "PoW chỉ dùng năng lượng tái tạo"
                },
                {
                    "id": "c",
                    "text": "Full node cần GPU gaming"
                },
                {
                    "id": "d",
                    "text": "Mức tiêu thụ điện đáng kể và e-waste do vòng đời ASIC"
                }
            ],
            "correctOptionId": "d",
            "explanation": "PoW dùng điện để băm; thay máy ASIC còn tạo rác điện tử. Mức tác động thực tế tùy nguồn điện, thiết bị và vòng đời, không chỉ số giao dịch.",
            "source": "/references/session-4-slides.pdf#page=32"
        },
        {
            "id": "bc-session4-q130",
            "prompt": "Phản biện nào được slide đưa ra đối với phép so sánh “điện trên mỗi transaction”?",
            "options": [
                {
                    "id": "a",
                    "text": "Bitcoin không có transaction"
                },
                {
                    "id": "b",
                    "text": "Năng lượng mua security/final settlement cho toàn hệ thống, và L2 có thể chia sẻ nền bảo mật đó"
                },
                {
                    "id": "c",
                    "text": "Điện không có giá"
                },
                {
                    "id": "d",
                    "text": "Miner không xác minh transaction"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Công việc băm bảo vệ cả lịch sử chứ không tăng tuyến tính theo từng giao dịch. Chia điện cho số giao dịch L1 có thể bỏ qua phần sử dụng qua L2.",
            "source": "/references/session-4-slides.pdf#page=32"
        },
        {
            "id": "bc-session4-q131",
            "prompt": "Lập luận bảo vệ PoW nào khác được slide nhắc tới?",
            "options": [
                {
                    "id": "a",
                    "text": "ASIC không tạo nhiệt"
                },
                {
                    "id": "b",
                    "text": "Bitcoin luôn dùng điện miễn phí"
                },
                {
                    "id": "c",
                    "text": "Mining có thể tận dụng stranded/curtailed energy, methane flare và hỗ trợ một số dịch vụ cân bằng lưới"
                },
                {
                    "id": "d",
                    "text": "Mining không cần phần cứng"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Slide nêu khả năng dùng điện dư hoặc tham gia điều tiết phụ tải ở một số nơi. Đây là tiềm năng giảm tác động, không chứng minh mọi hoạt động đào đều xanh.",
            "source": "/references/session-4-slides.pdf#page=32"
        },
        {
            "id": "bc-session4-q132",
            "prompt": "PBFT thường giả định điều gì về validator set?",
            "options": [
                {
                    "id": "a",
                    "text": "Không biết ai tham gia"
                },
                {
                    "id": "b",
                    "text": "Có n validator đã biết, trong đó f có thể Byzantine"
                },
                {
                    "id": "c",
                    "text": "Chỉ có một validator"
                },
                {
                    "id": "d",
                    "text": "Validator không giao tiếp"
                }
            ],
            "correctOptionId": "b",
            "explanation": "PBFT giả định biết tập n thành viên và tối đa f thành viên lỗi tùy ý hoặc ác ý. Danh sách này giúp xác định ai được bỏ phiếu.",
            "source": "/references/session-4-slides.pdf#page=33"
        },
        {
            "id": "bc-session4-q133",
            "prompt": "Điều kiện kinh điển cho Byzantine safety là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "n = f"
                },
                {
                    "id": "b",
                    "text": "n ≥ 2f"
                },
                {
                    "id": "c",
                    "text": "n ≥ 3f + 1"
                },
                {
                    "id": "d",
                    "text": "n ≥ f²"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trong mô hình PBFT, cần ít nhất 3f + 1 thành viên để chịu tối đa f lỗi Byzantine. Lỗi Byzantine là thành viên có thể gửi thông tin sai hoặc mâu thuẫn.",
            "source": "/references/session-4-slides.pdf#page=33"
        },
        {
            "id": "bc-session4-q134",
            "prompt": "PBFT-style consensus cần mức đồng thuận nào để commit theo slide?",
            "options": [
                {
                    "id": "a",
                    "text": "Hơn 2/3"
                },
                {
                    "id": "b",
                    "text": "Hơn 1/4"
                },
                {
                    "id": "c",
                    "text": "Chính xác 50%"
                },
                {
                    "id": "d",
                    "text": "100% tuyệt đối"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Với cấu hình n = 3f + 1, ngưỡng 2f + 1 lớn hơn 2/3 số thành viên. Các tập phiếu đủ ngưỡng giao nhau để không chốt hai kết quả mâu thuẫn.",
            "source": "/references/session-4-slides.pdf#page=33"
        },
        {
            "id": "bc-session4-q135",
            "prompt": "Communication complexity trực giác của PBFT là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "O(1)"
                },
                {
                    "id": "b",
                    "text": "O(log n)"
                },
                {
                    "id": "c",
                    "text": "O(n)"
                },
                {
                    "id": "d",
                    "text": "O(n²)"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Các vòng trao đổi giữa nhiều cặp thành viên làm lượng thông điệp tăng gần theo n². Vì thế tăng số người bỏ phiếu làm chi phí truyền tin tăng nhanh.",
            "source": "/references/session-4-slides.pdf#page=33"
        },
        {
            "id": "bc-session4-q136",
            "prompt": "Sau khi PBFT block đã commit, finality có đặc điểm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Phải chờ 100 block"
                },
                {
                    "id": "b",
                    "text": "Deterministic/immediate theo mô hình, không chờ confirmation kiểu Bitcoin"
                },
                {
                    "id": "c",
                    "text": "Luôn có natural fork"
                },
                {
                    "id": "d",
                    "text": "Phụ thuộc mining difficulty"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đã chốt thì không có hai kết quả xung đột khi các giả định an toàn còn đúng. Tính chốt này không phải bảo đảm vô điều kiện nếu vượt ngưỡng lỗi.",
            "source": "/references/session-4-slides.pdf#page=33"
        },
        {
            "id": "bc-session4-q137",
            "prompt": "Vì sao BFT cần biết ai có quyền vote?",
            "options": [
                {
                    "id": "a",
                    "text": "Để tính SHA-256"
                },
                {
                    "id": "b",
                    "text": "Để tạo Bitcoin address"
                },
                {
                    "id": "c",
                    "text": "Voting power phải gắn với một tập validator có định danh/quyền hoặc stake"
                },
                {
                    "id": "d",
                    "text": "Để tạo UTXO"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Phải biết tập và trọng số phiếu để xác định đã đủ ngưỡng đồng thuận chưa. Nếu ai cũng tự tạo phiếu, một bên có thể giả vô số danh tính.",
            "source": "/references/session-4-slides.pdf#page=33"
        },
        {
            "id": "bc-session4-q138",
            "prompt": "Nếu hơn 1/3 validator BFT không thể tham gia thì hệ thống thường làm gì để bảo vệ safety?",
            "options": [
                {
                    "id": "a",
                    "text": "Halt, không tạo finality mới"
                },
                {
                    "id": "b",
                    "text": "Tự chuyển sang PoW"
                },
                {
                    "id": "c",
                    "text": "Mint thêm validator"
                },
                {
                    "id": "d",
                    "text": "Bỏ chữ ký"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Khi hơn 1/3 quyền biểu quyết vắng mặt, hệ thống không đủ phiếu để chốt mới. Đếm validator chỉ tương đương đếm phiếu khi các thành viên có trọng số như nhau.",
            "source": "/references/session-4-slides.pdf#page=34"
        },
        {
            "id": "bc-session4-q139",
            "prompt": "Nếu hơn 1/3 Bitcoin hashrate biến mất nhưng phần còn lại vẫn hoạt động thì điều gì thường xảy ra trước retarget?",
            "options": [
                {
                    "id": "a",
                    "text": "Chain mất toàn bộ lịch sử"
                },
                {
                    "id": "b",
                    "text": "Finality lập tức deterministic"
                },
                {
                    "id": "c",
                    "text": "Consensus dừng vĩnh viễn"
                },
                {
                    "id": "d",
                    "text": "Block chậm hơn nhưng chain vẫn có thể tiếp tục"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Phần hashrate còn lại vẫn có thể tìm block nhưng mất nhiều thời gian trung bình hơn. Bitcoin không cần đủ số phiếu trực tuyến để tiếp tục đào.",
            "source": "/references/session-4-slides.pdf#page=34"
        },
        {
            "id": "bc-session4-q140",
            "prompt": "Trade-off được slide mô tả giữa Nakamoto và BFT là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Privacy vs encryption"
                },
                {
                    "id": "b",
                    "text": "Liveness vs safety"
                },
                {
                    "id": "c",
                    "text": "CPU vs GPU"
                },
                {
                    "id": "d",
                    "text": "Token vs coin"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Liveness là tiếp tục tiến triển; safety là tránh chốt kết quả mâu thuẫn. Slide dùng cặp này để so sánh, còn mỗi hệ đều có giả định an ninh riêng.",
            "source": "/references/session-4-slides.pdf#page=34"
        },
        {
            "id": "bc-session4-q141",
            "prompt": "So sánh nào đúng?",
            "options": [
                {
                    "id": "a",
                    "text": "Nakamoto deterministic, BFT probabilistic"
                },
                {
                    "id": "b",
                    "text": "Cả hai luôn fork"
                },
                {
                    "id": "c",
                    "text": "Nakamoto probabilistic finality; BFT hướng tới deterministic finality"
                },
                {
                    "id": "d",
                    "text": "BFT dùng longest chain"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Bitcoin giảm rủi ro đảo theo lượng công việc nối sau. BFT chốt theo chứng cứ đủ phiếu, với điều kiện số thành viên lỗi không vượt giả định.",
            "source": "/references/session-4-slides.pdf#page=34"
        },
        {
            "id": "bc-session4-q142",
            "prompt": "Tendermint kết hợp những yếu tố nào?",
            "options": [
                {
                    "id": "a",
                    "text": "PoS + BFT rounds"
                },
                {
                    "id": "b",
                    "text": "PoW + ASIC only"
                },
                {
                    "id": "c",
                    "text": "UTXO + Lightning"
                },
                {
                    "id": "d",
                    "text": "RBF + CPFP"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Trong ví dụ Cosmos ở slide, Tendermint kết hợp các vòng BFT với quyền biểu quyết gắn stake. Bản thân cơ chế đồng thuận cũng có thể dùng tập thành viên cấp phép.",
            "source": "/references/session-4-slides.pdf#page=35"
        },
        {
            "id": "bc-session4-q143",
            "prompt": "Trình tự BFT-style của Tendermint trong slide gồm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Mine → burn → mint"
                },
                {
                    "id": "b",
                    "text": "Approve → transferFrom"
                },
                {
                    "id": "c",
                    "text": "Input → output → change"
                },
                {
                    "id": "d",
                    "text": "Propose → prevote → precommit"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Thành viên đề xuất block, bỏ phiếu sơ bộ rồi bỏ phiếu cam kết. Chỉ nhận được đề xuất chưa đủ để block được chốt.",
            "source": "/references/session-4-slides.pdf#page=35"
        },
        {
            "id": "bc-session4-q144",
            "prompt": "Ethereum được slide dùng làm cầu nối sang Session 5 với ý tưởng nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum vẫn dùng Bitcoin Script"
                },
                {
                    "id": "b",
                    "text": "Block production cùng Casper FFG-style finality bằng stake voting"
                },
                {
                    "id": "c",
                    "text": "Ethereum dùng UTXO"
                },
                {
                    "id": "d",
                    "text": "Ethereum không có validator"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Slide phân biệt việc tạo block với việc bỏ phiếu chốt checkpoint bằng Casper FFG. Một block mới xuất hiện chưa đồng nghĩa đã được chốt ngay.",
            "source": "/references/session-4-slides.pdf#page=35"
        },
        {
            "id": "bc-session4-q145",
            "prompt": "Trong PoS, cơ chế nào đóng vai trò “cost of lying” thay cho hóa đơn điện của PoW?",
            "options": [
                {
                    "id": "a",
                    "text": "RBF"
                },
                {
                    "id": "b",
                    "text": "CPFP"
                },
                {
                    "id": "c",
                    "text": "Slashing"
                },
                {
                    "id": "d",
                    "text": "Taproot"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Slashing là cắt một phần tiền đặt cọc khi có bằng chứng vi phạm cụ thể, như ký mâu thuẫn. Không phải mọi lần mất kết nối đều bị slashing.",
            "source": "/references/session-4-slides.pdf#page=35"
        },
        {
            "id": "bc-session4-q146",
            "prompt": "Bitcoin L1 throughput trong slide được mô tả xấp xỉ mức nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Khoảng 7 tx/s toàn cầu"
                },
                {
                    "id": "b",
                    "text": "7 triệu tx/s"
                },
                {
                    "id": "c",
                    "text": "1 triệu tx/s"
                },
                {
                    "id": "d",
                    "text": "Không giới hạn"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Khoảng 7 giao dịch/giây là ước lượng trong slide. Thông lượng thực phụ thuộc kích thước, loại giao dịch và nhịp block, không phải hằng số giao thức.",
            "source": "/references/session-4-slides.pdf#page=36"
        },
        {
            "id": "bc-session4-q147",
            "prompt": "Payment channel Lightning thường bắt đầu bằng gì?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC-20 contract"
                },
                {
                    "id": "b",
                    "text": "Coinbase transaction không input"
                },
                {
                    "id": "c",
                    "text": "Mining pool share"
                },
                {
                    "id": "d",
                    "text": "2-of-2 multisig funding output on-chain"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Kênh tiêu chuẩn khóa tiền trong output cần chữ ký của cả hai bên. Giao dịch cam kết được chuẩn bị để các bên có đường rút tiền theo quy tắc kênh.",
            "source": "/references/session-4-slides.pdf#page=36"
        },
        {
            "id": "bc-session4-q148",
            "prompt": "Trong payment channel, phần lớn state update diễn ra ở đâu?",
            "options": [
                {
                    "id": "a",
                    "text": "Mỗi update thành một block mới"
                },
                {
                    "id": "b",
                    "text": "Off-chain bằng các state được ký"
                },
                {
                    "id": "c",
                    "text": "Trong mining pool"
                },
                {
                    "id": "d",
                    "text": "Trong DNS"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Hai bên trao đổi trạng thái và chữ ký ngoài chuỗi thay vì ghi mỗi lần trả tiền lên Bitcoin. Khi cần, giao dịch cam kết cho phép giải quyết trên chuỗi.",
            "source": "/references/session-4-slides.pdf#page=36"
        },
        {
            "id": "bc-session4-q149",
            "prompt": "Khi nào payment channel thường cần chạm L1?",
            "options": [
                {
                    "id": "a",
                    "text": "Mỗi micropayment"
                },
                {
                    "id": "b",
                    "text": "Mỗi signature"
                },
                {
                    "id": "c",
                    "text": "Chủ yếu lúc mở và đóng channel"
                },
                {
                    "id": "d",
                    "text": "Không bao giờ"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Mở kênh cấp vốn và đóng kênh quyết toán cần giao dịch L1. Tranh chấp hoặc một số thao tác quản lý kênh cũng có thể dùng L1.",
            "source": "/references/session-4-slides.pdf#page=36"
        },
        {
            "id": "bc-session4-q150",
            "prompt": "HTLC trong Lightning cho phép điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Route payment qua nhiều channel bằng hash-lock/time condition mà không cần tin các trung gian"
                },
                {
                    "id": "b",
                    "text": "Tăng block subsidy"
                },
                {
                    "id": "c",
                    "text": "Bỏ signature"
                },
                {
                    "id": "d",
                    "text": "Thay SHA-256 bằng AES"
                }
            ],
            "correctOptionId": "a",
            "explanation": "HTLC kết hợp điều kiện biết bí mật có hash phù hợp với hạn thời gian. Nó ràng buộc các chặng thanh toán và cho phép hoàn tiền khi không hoàn tất.",
            "source": "/references/session-4-slides.pdf#page=36"
        },
        {
            "id": "bc-session4-q151",
            "prompt": "Cơ chế penalty đối với việc publish old channel state nhằm mục đích gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Thưởng người gian lận"
                },
                {
                    "id": "b",
                    "text": "Tăng supply BTC"
                },
                {
                    "id": "c",
                    "text": "Giảm difficulty"
                },
                {
                    "id": "d",
                    "text": "Ngăn một bên cố dùng state cũ có lợi cho họ; channel cũng cần cơ chế theo dõi online"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Trong cơ chế phạt trạng thái cũ, bên bị hại có thể dùng bí mật thu hồi để nhận khoản phạt. Cần tự theo dõi hoặc nhờ watchtower phản ứng đúng thời hạn.",
            "source": "/references/session-4-slides.pdf#page=36"
        },
        {
            "id": "bc-session4-q152",
            "prompt": "Anchor block của Lab 4 là block nào?",
            "options": [
                {
                    "id": "a",
                    "text": "#210,000"
                },
                {
                    "id": "b",
                    "text": "#420,000"
                },
                {
                    "id": "c",
                    "text": "#630,000"
                },
                {
                    "id": "d",
                    "text": "#840,000"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Worksheet chọn block 840.000 làm mốc cố định để cả lớp kiểm tra cùng dữ liệu. Không phải mỗi lần chạy đều tự dùng block mới nhất.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q153",
            "prompt": "Vì sao block #840,000 đặc biệt?",
            "options": [
                {
                    "id": "a",
                    "text": "Là genesis block"
                },
                {
                    "id": "b",
                    "text": "Là block halving lần 4 và block đầu tiên có subsidy 3.125 BTC"
                },
                {
                    "id": "c",
                    "text": "Là block đầu tiên dùng SegWit"
                },
                {
                    "id": "d",
                    "text": "Là block đầu tiên dùng Taproot"
                }
            ],
            "correctOptionId": "b",
            "explanation": "840.000 = 4 × 210.000, là mốc halving thứ tư. Trợ cấp từ block này là 3,125 BTC; coinbase có thể nhận thêm phí.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q154",
            "prompt": "Lab đọc dữ liệu mainnet thông qua gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum JSON-RPC"
                },
                {
                    "id": "b",
                    "text": "Local Bitcoin node bắt buộc"
                },
                {
                    "id": "c",
                    "text": "Blockstream Esplora REST API"
                },
                {
                    "id": "d",
                    "text": "Binance API"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Esplora cung cấp dữ liệu block và giao dịch qua yêu cầu HTTP. Lab vì vậy không bắt buộc chạy một Bitcoin node trên máy cá nhân.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q155",
            "prompt": "Trong Bitcoin thật, trường nào của header mã hóa target theo dạng compact?",
            "options": [
                {
                    "id": "a",
                    "text": "bits"
                },
                {
                    "id": "b",
                    "text": "time"
                },
                {
                    "id": "c",
                    "text": "nonce"
                },
                {
                    "id": "d",
                    "text": "version"
                }
            ],
            "correctOptionId": "a",
            "explanation": "bits lưu dạng mã hóa gọn của target trong header. Nonce là giá trị thử băm, còn time là thời gian block, không phải ngưỡng độ khó.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q156",
            "prompt": "Nếu bits = 0xEEMMMMMM, công thức giải mã target trong worksheet là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "target = EE × MMMMMM"
                },
                {
                    "id": "b",
                    "text": "target = 2^EE + MMMMMM"
                },
                {
                    "id": "c",
                    "text": "target = MMMMMM / 256^EE"
                },
                {
                    "id": "d",
                    "text": "target = MMMMMM × 256^(EE−3)"
                }
            ],
            "correctOptionId": "d",
            "explanation": "EE là số mũ theo cơ số 256, MMMMMM là phần hệ số. Công thức đề dùng áp dụng cho giá trị dương trong ví dụ; giải mã tổng quát còn xét dấu và số mũ nhỏ.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q157",
            "prompt": "Với bits = 0x17034219, mantissa là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "0x17"
                },
                {
                    "id": "b",
                    "text": "0x034219"
                },
                {
                    "id": "c",
                    "text": "0x342190"
                },
                {
                    "id": "d",
                    "text": "0x256"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Tách byte đầu 0x17 làm số mũ, ba byte còn lại là 0x034219. Giữ các số 0 đầu giúp nhìn đúng cấu trúc ba byte của hệ số.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q158",
            "prompt": "Target ví dụ 0x17034219 có khoảng bao nhiêu chữ số hex 0 dẫn đầu?",
            "options": [
                {
                    "id": "a",
                    "text": "5"
                },
                {
                    "id": "b",
                    "text": "10"
                },
                {
                    "id": "c",
                    "text": "19"
                },
                {
                    "id": "d",
                    "text": "32"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Với biểu diễn đủ 64 chữ số hex, 0x034219 × 256^20 có 19 số 0 dẫn đầu. Đếm trên chuỗi bị bỏ số 0 đầu sẽ cho kết quả sai.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q159",
            "prompt": "Mức work trực giác tương ứng với target đó gần nhất với lựa chọn nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Khoảng 2^78 phép thử"
                },
                {
                    "id": "b",
                    "text": "Khoảng 2^8"
                },
                {
                    "id": "c",
                    "text": "Khoảng 2^16"
                },
                {
                    "id": "d",
                    "text": "Khoảng 2^256 chính xác"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Xác suất đạt ngưỡng xấp xỉ target/2^256. Với target đã cho, số lần thử trung bình khoảng 2^78,3, nên 2^78 là lựa chọn gần nhất.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q160",
            "prompt": "Điều kiện CHECK PoW quan trọng nhất của lab là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "hash == nonce"
                },
                {
                    "id": "b",
                    "text": "hash > target"
                },
                {
                    "id": "c",
                    "text": "target == block height"
                },
                {
                    "id": "d",
                    "text": "dSHA256(header) < target"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Lab và đáp án dùng dấu < để diễn đạt kiểm ngưỡng. Quy tắc Bitcoin chính xác chấp nhận hash ≤ target; kiểm PoW chưa đủ để xác minh toàn bộ block.",
            "source": "https://developer.bitcoin.org/reference/block_chain.html"
        },
        {
            "id": "bc-session4-q161",
            "prompt": "Raw Bitcoin block header được lab re-hash có kích thước bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "32 byte"
                },
                {
                    "id": "b",
                    "text": "80 byte"
                },
                {
                    "id": "c",
                    "text": "128 byte"
                },
                {
                    "id": "d",
                    "text": "256 byte"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Lab băm header thô 80 byte hai lần bằng SHA-256. Nó không băm toàn bộ danh sách giao dịch để trực tiếp tính block hash.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q162",
            "prompt": "Vì sao laptop có thể verify PoW rất nhanh trong khi network mất rất nhiều work để tìm block?",
            "options": [
                {
                    "id": "a",
                    "text": "Verifier dùng private key miner"
                },
                {
                    "id": "b",
                    "text": "Miner dùng SHA-1 còn verifier dùng SHA-256"
                },
                {
                    "id": "c",
                    "text": "SHA-256 có tính một chiều/unpredictable nên tìm preimage phù hợp cần brute force, còn kiểm một candidate rất rẻ"
                },
                {
                    "id": "d",
                    "text": "Verifier bỏ qua hash"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Không có cách dự đoán hữu ích hash của header mới trong mô hình sử dụng. Tìm kết quả dưới ngưỡng cần nhiều lần thử, nhưng kiểm một header chỉ cần hai lần băm.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q163",
            "prompt": "Lab yêu cầu fee của transaction được tính thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "sum(inputs) − sum(outputs)"
                },
                {
                    "id": "b",
                    "text": "sum(outputs) − sum(inputs)"
                },
                {
                    "id": "c",
                    "text": "amount × block height"
                },
                {
                    "id": "d",
                    "text": "weight × subsidy"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Cộng giá trị các output trước được input tham chiếu rồi trừ tổng output mới. Coinbase là trường hợp đặc biệt, không dùng công thức input thông thường này.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q164",
            "prompt": "Fee rate sau đó được tính theo công thức nào?",
            "options": [
                {
                    "id": "a",
                    "text": "vsize / fee"
                },
                {
                    "id": "b",
                    "text": "fee × amount"
                },
                {
                    "id": "c",
                    "text": "fee / block height"
                },
                {
                    "id": "d",
                    "text": "fee / vsize"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Lấy phí tính bằng satoshi chia kích thước ảo tính bằng vB sẽ được sat/vB. Trước đó phải tính vsize bằng làm tròn lên weight/4.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q165",
            "prompt": "Transaction nổi bật trong block 840,000 có đặc điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "0 fee"
                },
                {
                    "id": "b",
                    "text": "Khoảng 6.73 BTC fee cho 187 vB"
                },
                {
                    "id": "c",
                    "text": "50 BTC subsidy"
                },
                {
                    "id": "d",
                    "text": "2,016 inputs"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đây là số liệu giao dịch được worksheet nêu, không phải trợ cấp block. Bài học là giao dịch nhỏ vẫn có thể trả phí rất lớn theo mức giá đã chọn.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q166",
            "prompt": "Fee rate của transaction này xấp xỉ bao nhiêu?",
            "options": [
                {
                    "id": "a",
                    "text": "36 sat/vB"
                },
                {
                    "id": "b",
                    "text": "3,600 sat/vB"
                },
                {
                    "id": "c",
                    "text": "3.6 triệu sat/vB"
                },
                {
                    "id": "d",
                    "text": "36 triệu BTC/vB"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Theo số liệu làm tròn của đề: 6,73 × 100.000.000 / 187 ≈ 3,6 triệu sat/vB. BTC cần đổi sang satoshi trước khi chia.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q167",
            "prompt": "Nguyên nhân bối cảnh của mức fee cực cao đó là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Halving day kết hợp Runes launch tạo cuộc đấu giá mempool gay gắt"
                },
                {
                    "id": "b",
                    "text": "SHA-256 bị phá"
                },
                {
                    "id": "c",
                    "text": "Coinbase maturity giảm"
                },
                {
                    "id": "d",
                    "text": "Bitcoin chuyển sang PoS"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Worksheet liên hệ mức phí với ngày halving và đợt ra mắt Runes. Nhu cầu cạnh tranh cùng lúc giải thích áp lực phí, không phải quy tắc tự tăng phí khi halving.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q168",
            "prompt": "Coinbase outputs của block là 4,075,061,499 sat trong khi subsidy chỉ 312,500,000 sat. Phần chênh lệch chủ yếu là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "BTC được mint trái luật"
                },
                {
                    "id": "b",
                    "text": "Change của miner"
                },
                {
                    "id": "c",
                    "text": "Mining pool shares"
                },
                {
                    "id": "d",
                    "text": "Tổng transaction fees của block"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Chênh lệch là 4.075.061.499 − 312.500.000 = 3.762.561.499 satoshi. Theo dữ liệu đề, đây là phí miner thu thêm ngoài trợ cấp.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q169",
            "prompt": "Lab dựng lại Merkle root từ bao nhiêu txid trong block 840,000?",
            "options": [
                {
                    "id": "a",
                    "text": "840"
                },
                {
                    "id": "b",
                    "text": "3,050"
                },
                {
                    "id": "c",
                    "text": "2,016"
                },
                {
                    "id": "d",
                    "text": "21 triệu"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Worksheet yêu cầu dùng đủ 3.050 txid, kể cả coinbase và theo thứ tự block. 2.016 là chu kỳ chỉnh độ khó, không phải số giao dịch ở đây.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q170",
            "prompt": "Hai điểm đặc thù Bitcoin cần lưu ý khi dựng Merkle root trong lab là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Keccak + Base64"
                },
                {
                    "id": "b",
                    "text": "SHA-1 + little-endian integer"
                },
                {
                    "id": "c",
                    "text": "Double SHA-256 và xử lý byte order đảo của txid hiển thị"
                },
                {
                    "id": "d",
                    "text": "AES + nonce"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Các cặp hash được băm SHA-256 hai lần; txid hiển thị phải đổi về thứ tự byte nội bộ. Sai một trong hai quy ước sẽ cho root khác.",
            "source": "/references/session-4-worksheet.pdf#page=3"
        },
        {
            "id": "bc-session4-q171",
            "prompt": "Nếu số node ở một tầng Merkle là lẻ thì làm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Duplicate node cuối"
                },
                {
                    "id": "b",
                    "text": "Xóa node cuối"
                },
                {
                    "id": "c",
                    "text": "Thêm coinbase mới"
                },
                {
                    "id": "d",
                    "text": "Hash với target"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Khi một tầng có số hash lẻ và còn phải ghép cặp, hash cuối được ghép với chính nó. Không xóa giao dịch hoặc tự tạo giao dịch mới.",
            "source": "/references/session-4-worksheet.pdf#page=3"
        },
        {
            "id": "bc-session4-q172",
            "prompt": "Trước khi hash txid hiển thị trong lab, thao tác nào được yêu cầu?",
            "options": [
                {
                    "id": "a",
                    "text": "Encode Base58"
                },
                {
                    "id": "b",
                    "text": "Hash một lần"
                },
                {
                    "id": "c",
                    "text": "Chuyển thành decimal"
                },
                {
                    "id": "d",
                    "text": "bytes.fromhex(txid)[::-1]"
                }
            ],
            "correctOptionId": "d",
            "explanation": "fromhex đổi chuỗi hex thành byte, còn [::-1] đảo thứ tự byte. Phải băm dữ liệu byte nội bộ, không băm trực tiếp chuỗi ký tự txid.",
            "source": "/references/session-4-worksheet.pdf#page=3"
        },
        {
            "id": "bc-session4-q173",
            "prompt": "Khi hoàn thành Merkle calculation, kết quả cuối được xử lý byte order như thế nào để so với header/display?",
            "options": [
                {
                    "id": "a",
                    "text": "Không cần xử lý"
                },
                {
                    "id": "b",
                    "text": "Reverse lại theo quy ước hiển thị"
                },
                {
                    "id": "c",
                    "text": "Chuyển thành Base58"
                },
                {
                    "id": "d",
                    "text": "Chỉ lấy 20 byte"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đảo root nội bộ để so với chuỗi hex hiển thị của API. Nếu so với trường Merkle trong header thô thì dùng thứ tự byte nội bộ, không đảo thêm.",
            "source": "/references/session-4-worksheet.pdf#page=3"
        },
        {
            "id": "bc-session4-q174",
            "prompt": "Nếu computed Merkle root khớp chính xác root trong block header, điều đó chứng minh điều gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Miner sở hữu mọi BTC"
                },
                {
                    "id": "b",
                    "text": "Block không cần PoW"
                },
                {
                    "id": "c",
                    "text": "Danh sách transaction được tính vào commitment khớp với Merkle root trong header"
                },
                {
                    "id": "d",
                    "text": "Không transaction nào có signature"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Kết quả xác nhận root tính từ danh sách khớp cam kết header, với giả định hash an toàn. Vẫn cần kiểm số lượng, thứ tự, trùng lặp và tính hợp lệ giao dịch.",
            "source": "/references/session-4-worksheet.pdf#page=3"
        },
        {
            "id": "bc-session4-q175",
            "prompt": "Tính chất hash nào quan trọng để Merkle root phát hiện việc sửa danh sách transaction?",
            "options": [
                {
                    "id": "a",
                    "text": "Collision resistance và avalanche behavior"
                },
                {
                    "id": "b",
                    "text": "Reversibility"
                },
                {
                    "id": "c",
                    "text": "Compression lossless"
                },
                {
                    "id": "d",
                    "text": "Symmetric encryption"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Kháng va chạm khiến khó tìm dữ liệu khác có cùng hash. Hiệu ứng avalanche làm thay đổi nhỏ lan mạnh vào kết quả, nhưng riêng nó chưa chứng minh an toàn mật mã.",
            "source": "/references/session-4-slides.pdf#page=4"
        },
        {
            "id": "bc-session4-q176",
            "prompt": "Nếu thay đổi chỉ một transaction trong block, điều gì dự kiến xảy ra?",
            "options": [
                {
                    "id": "a",
                    "text": "Merkle root luôn giữ nguyên"
                },
                {
                    "id": "b",
                    "text": "Chỉ fee thay đổi, root không đổi"
                },
                {
                    "id": "c",
                    "text": "Block height giảm"
                },
                {
                    "id": "d",
                    "text": "Hash leaf thay đổi và lan lên khiến Merkle root thay đổi"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Nếu sửa phần dữ liệu được txid cam kết, hash lá và các hash tổ tiên sẽ đổi, trừ va chạm. Sửa riêng witness không đổi txid và root txid theo cách này.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki"
        },
        {
            "id": "bc-session4-q177",
            "prompt": "Lab cho phép chạy khi không có Internet bằng cách nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Bỏ qua mọi CHECK"
                },
                {
                    "id": "b",
                    "text": "Dùng --offline với API responses đã tải sẵn"
                },
                {
                    "id": "c",
                    "text": "Dùng Ethereum testnet"
                },
                {
                    "id": "d",
                    "text": "Tắt SHA-256"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Cờ --offline dùng phản hồi API đã lưu trong bộ lab để tái hiện dữ liệu. Nó không bỏ kiểm chứng và không tự tải dữ liệu mới khi mất mạng.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q178",
            "prompt": "Lab Q2 minh họa tính bất đối xứng nào của PoW?",
            "options": [
                {
                    "id": "a",
                    "text": "Khó verify, dễ tìm"
                },
                {
                    "id": "b",
                    "text": "Tìm và verify tốn như nhau"
                },
                {
                    "id": "c",
                    "text": "Rất tốn work để tìm, rất rẻ để verify"
                },
                {
                    "id": "d",
                    "text": "Không cần hash để verify"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Tìm cần thử nhiều header; kiểm chỉ tính lại hash của header được đưa ra. Đây là bất đối xứng chi phí cốt lõi của PoW.",
            "source": "/references/session-4-worksheet.pdf#page=1"
        },
        {
            "id": "bc-session4-q179",
            "prompt": "Lab Q3 về transaction 6.73 BTC fee nhằm kiểm tra hiểu biết nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Fee là kết quả của block-space market, có thể tăng cực mạnh khi demand cao"
                },
                {
                    "id": "b",
                    "text": "Fee luôn tỷ lệ với số BTC gửi"
                },
                {
                    "id": "c",
                    "text": "Subsidy luôn bằng fee"
                },
                {
                    "id": "d",
                    "text": "Miner không quan tâm sat/vB"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Ví dụ nhấn mạnh người gửi cạnh tranh không gian block bằng phí. Phí không mặc định tỉ lệ với số BTC gửi hay bằng trợ cấp block.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q180",
            "prompt": "Lab Q4 về coinbase nhằm kiểm tra quan hệ nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Coinbase = subsidy − fees"
                },
                {
                    "id": "b",
                    "text": "Coinbase = only subsidy"
                },
                {
                    "id": "c",
                    "text": "Coinbase = UTXO count"
                },
                {
                    "id": "d",
                    "text": "Coinbase reward có thể gồm subsidy cộng transaction fees"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Coinbase có thể nhận trợ cấp phát hành mới cộng tổng phí trong block. Mức này là trần được phép nhận, không bắt buộc miner phải nhận hết.",
            "source": "/references/session-4-worksheet.pdf#page=2"
        },
        {
            "id": "bc-session4-q181",
            "prompt": "Lab Q5 nối trực tiếp lại kiến thức Session 3 nào?",
            "options": [
                {
                    "id": "a",
                    "text": "BIP39"
                },
                {
                    "id": "b",
                    "text": "Merkle tree và tính chất mật mã của hash"
                },
                {
                    "id": "c",
                    "text": "Ethereum gas"
                },
                {
                    "id": "d",
                    "text": "Proof of Stake"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Q5 yêu cầu giải thích root khớp header bằng cây Merkle và tính chất hash. Nó nối lại cách cam kết dữ liệu từ Session 3, không phải bài về ví BIP39.",
            "source": "/references/session-4-worksheet.pdf#page=3"
        }
    ]
};
