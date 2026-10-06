import type { Chapter } from "@/types/quiz";

// Câu hỏi do Ju cung cấp; đáp án và giải thích được bổ sung để ôn tập.
export const chapter1: Chapter = {
    "id": "chapter-1",
    "title": "Chapter 1 + 2: Wallet, key và transaction",
    "description": "25 câu ôn tập về wallet, key, HD wallet, transaction lifecycle và mô hình UTXO/account.",
    "revision": 2,
    "questions": [
        {
            "id": "bc-ch1-2-q01",
            "prompt": "Phát biểu nào mô tả chính xác nhất về cryptocurrency wallet?",
            "options": [
                {
                    "id": "a",
                    "text": "Là nơi các coin được lưu vật lý trên thiết bị"
                },
                {
                    "id": "b",
                    "text": "Là phần mềm quản lý key và hỗ trợ tương tác với blockchain"
                },
                {
                    "id": "c",
                    "text": "Là một blockchain riêng của người dùng"
                },
                {
                    "id": "d",
                    "text": "Là database lưu toàn bộ transaction của mạng"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Wallet quản lý key và hỗ trợ tương tác; tài sản được ghi nhận trên blockchain.",
            "source": "https://ethereum.org/wallets/"
        },
        {
            "id": "bc-ch1-2-q02",
            "prompt": "Trong chuỗi sinh address cơ bản, thứ tự nào đúng?",
            "options": [
                {
                    "id": "a",
                    "text": "Address → public key → private key"
                },
                {
                    "id": "b",
                    "text": "Public key → private key → address"
                },
                {
                    "id": "c",
                    "text": "Private key → public key → address"
                },
                {
                    "id": "d",
                    "text": "Private key → address → public key"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Với account dùng key thông thường, public key được suy ra từ private key, rồi address được tạo từ public key.",
            "source": "https://ethereum.org/developers/docs/accounts/"
        },
        {
            "id": "bc-ch1-2-q03",
            "prompt": "Private key chủ yếu được sử dụng để:",
            "options": [
                {
                    "id": "a",
                    "text": "Nhận cryptocurrency"
                },
                {
                    "id": "b",
                    "text": "Tạo digital signature"
                },
                {
                    "id": "c",
                    "text": "Lưu balance"
                },
                {
                    "id": "d",
                    "text": "Tìm block mới"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Private key dùng để tạo chữ ký số, chứng minh quyền cho phép thực hiện giao dịch.",
            "source": "https://ethereum.org/developers/docs/accounts/"
        },
        {
            "id": "bc-ch1-2-q04",
            "prompt": "Alice biết Ethereum address của Bob. Điều nào sau đây Alice có thể làm?",
            "options": [
                {
                    "id": "a",
                    "text": "Tính được private key của Bob"
                },
                {
                    "id": "b",
                    "text": "Ký transaction thay Bob"
                },
                {
                    "id": "c",
                    "text": "Gửi ETH tới Bob"
                },
                {
                    "id": "d",
                    "text": "Thay đổi balance của Bob"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Alice có thể gửi ETH đến address của Bob. Việc này có thể làm balance của Bob tăng, nhưng không cho phép Alice tùy ý sửa balance hay chi tiêu thay Bob.",
            "source": "https://ethereum.org/developers/docs/accounts/"
        },
        {
            "id": "bc-ch1-2-q05",
            "prompt": "Phát biểu nào đúng về public key?",
            "options": [
                {
                    "id": "a",
                    "text": "Phải giữ bí mật giống private key"
                },
                {
                    "id": "b",
                    "text": "Được suy ra từ private key"
                },
                {
                    "id": "c",
                    "text": "Được sinh ra từ address"
                },
                {
                    "id": "d",
                    "text": "Là seed phrase đã được hash"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Public key được suy ra từ private key bằng phép toán mật mã.",
            "source": "https://ethereum.org/developers/docs/accounts/"
        },
        {
            "id": "bc-ch1-2-q06",
            "prompt": "Nếu attacker biết address của Alice thì tại sao hắn không thể chuyển ETH của Alice?",
            "options": [
                {
                    "id": "a",
                    "text": "Address được mã hóa nên attacker không đọc được"
                },
                {
                    "id": "b",
                    "text": "Blockchain giấu balance của Alice"
                },
                {
                    "id": "c",
                    "text": "Attacker không có private key để tạo signature hợp lệ"
                },
                {
                    "id": "d",
                    "text": "Ethereum yêu cầu mật khẩu MetaMask cho mọi transaction"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Với account thông thường do private key kiểm soát, biết address không đủ để tạo chữ ký hợp lệ.",
            "source": "https://ethereum.org/developers/docs/accounts/"
        },
        {
            "id": "bc-ch1-2-q07",
            "prompt": "Phát biểu nào đúng nhất về seed phrase?",
            "options": [
                {
                    "id": "a",
                    "text": "Là một Ethereum address dạng chữ"
                },
                {
                    "id": "b",
                    "text": "Là signature của wallet"
                },
                {
                    "id": "c",
                    "text": "Có thể dùng để khôi phục hệ thống key của HD wallet"
                },
                {
                    "id": "d",
                    "text": "Được broadcast cùng mỗi transaction"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Seed phrase giúp tái tạo seed để khôi phục key. Nếu có dùng BIP39 passphrase, cần đúng passphrase đó nữa.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-ch1-2-q08",
            "prompt": "Một wallet sử dụng cùng một seed phrase nhưng hiển thị nhiều address khác nhau. Điều này chủ yếu được giải thích bởi:",
            "options": [
                {
                    "id": "a",
                    "text": "Proof of Work"
                },
                {
                    "id": "b",
                    "text": "HD wallet"
                },
                {
                    "id": "c",
                    "text": "Gas"
                },
                {
                    "id": "d",
                    "text": "Smart contract"
                }
            ],
            "correctOptionId": "b",
            "explanation": "HD wallet suy ra nhiều key và address từ cùng một seed theo các nhánh khác nhau.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-ch1-2-q09",
            "prompt": "BIP39 liên quan nhiều nhất tới:",
            "options": [
                {
                    "id": "a",
                    "text": "Proof of Work"
                },
                {
                    "id": "b",
                    "text": "Transaction fee"
                },
                {
                    "id": "c",
                    "text": "Mnemonic phrase"
                },
                {
                    "id": "d",
                    "text": "Smart contract"
                }
            ],
            "correctOptionId": "c",
            "explanation": "BIP39 mô tả mnemonic phrase và cách chuyển phrase cùng passphrase tùy chọn thành seed.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
        },
        {
            "id": "bc-ch1-2-q10",
            "prompt": "BIP32 chủ yếu mô tả:",
            "options": [
                {
                    "id": "a",
                    "text": "Cơ chế mining"
                },
                {
                    "id": "b",
                    "text": "Hierarchical deterministic key derivation"
                },
                {
                    "id": "c",
                    "text": "Token standard"
                },
                {
                    "id": "d",
                    "text": "Gas calculation"
                }
            ],
            "correctOptionId": "b",
            "explanation": "BIP32 mô tả cách suy ra key theo cấu trúc cây một cách xác định.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
        },
        {
            "id": "bc-ch1-2-q11",
            "prompt": "BIP44 chủ yếu cung cấp:",
            "options": [
                {
                    "id": "a",
                    "text": "Chuẩn về derivation path"
                },
                {
                    "id": "b",
                    "text": "Thuật toán chữ ký mới"
                },
                {
                    "id": "c",
                    "text": "Consensus algorithm"
                },
                {
                    "id": "d",
                    "text": "Hash function"
                }
            ],
            "correctOptionId": "a",
            "explanation": "BIP44 quy định cấu trúc path: m / purpose' / coin_type' / account' / change / address_index.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        },
        {
            "id": "bc-ch1-2-q12",
            "prompt": "Một cách nhớ đúng cho ba BIP là:",
            "options": [
                {
                    "id": "a",
                    "text": "BIP39 = tree, BIP32 = words, BIP44 = gas"
                },
                {
                    "id": "b",
                    "text": "BIP39 = words, BIP32 = tree, BIP44 = path"
                },
                {
                    "id": "c",
                    "text": "BIP39 = path, BIP32 = address, BIP44 = signature"
                },
                {
                    "id": "d",
                    "text": "BIP39 = key, BIP32 = transaction, BIP44 = blockchain"
                }
            ],
            "correctOptionId": "b",
            "explanation": "BIP39 gắn với các từ mnemonic; BIP32 với cây key; BIP44 với cách tổ chức path.",
            "source": "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        },
        {
            "id": "bc-ch1-2-q13",
            "prompt": "Trong self-custodial wallet như MetaMask, ai chịu trách nhiệm chính trong việc bảo vệ seed phrase/private key?",
            "options": [
                {
                    "id": "a",
                    "text": "Ethereum validators"
                },
                {
                    "id": "b",
                    "text": "MetaMask servers"
                },
                {
                    "id": "c",
                    "text": "Người dùng"
                },
                {
                    "id": "d",
                    "text": "Miner"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trong mô hình self-custody dùng seed phrase/private key, người dùng chịu trách nhiệm bảo vệ chúng.",
            "source": "https://ethereum.org/wallets/"
        },
        {
            "id": "bc-ch1-2-q14",
            "prompt": "Trong custodial exchange wallet, phát biểu nào đúng nhất?",
            "options": [
                {
                    "id": "a",
                    "text": "Không tồn tại private key"
                },
                {
                    "id": "b",
                    "text": "Người dùng luôn trực tiếp giữ private key"
                },
                {
                    "id": "c",
                    "text": "Exchange kiểm soát private key thay cho người dùng"
                },
                {
                    "id": "d",
                    "text": "Private key được lưu trên blockchain"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Trong mô hình custodial, bên cung cấp dịch vụ giữ và quản lý key thay người dùng.",
            "source": "https://ethereum.org/wallets/"
        },
        {
            "id": "bc-ch1-2-q15",
            "prompt": "RPC endpoint có chức năng gần nhất với:",
            "options": [
                {
                    "id": "a",
                    "text": "Sinh private key"
                },
                {
                    "id": "b",
                    "text": "Là điểm để wallet/application giao tiếp với blockchain node"
                },
                {
                    "id": "c",
                    "text": "Là nơi lưu seed phrase"
                },
                {
                    "id": "d",
                    "text": "Là consensus algorithm"
                }
            ],
            "correctOptionId": "b",
            "explanation": "RPC endpoint nhận yêu cầu từ ứng dụng, ví dụ đọc dữ liệu hoặc gửi giao dịch tới node.",
            "source": "https://ethereum.org/developers/docs/apis/json-rpc/"
        },
        {
            "id": "bc-ch1-2-q16",
            "prompt": "Alice tạo transaction và ký thành công nhưng transaction hiện vẫn đang trong mempool. Trạng thái phù hợp nhất là:",
            "options": [
                {
                    "id": "a",
                    "text": "Finalized"
                },
                {
                    "id": "b",
                    "text": "Confirmed"
                },
                {
                    "id": "c",
                    "text": "Pending"
                },
                {
                    "id": "d",
                    "text": "Invalid"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Giao dịch còn trong mempool, chưa được đưa vào block, nên đang pending.",
            "source": "https://ethereum.org/developers/docs/transactions/"
        },
        {
            "id": "bc-ch1-2-q17",
            "prompt": "Thứ tự nào hợp lý nhất đối với transaction lifecycle?",
            "options": [
                {
                    "id": "a",
                    "text": "Sign → create transaction → block → mempool"
                },
                {
                    "id": "b",
                    "text": "Create → sign → broadcast → mempool → block → confirmation"
                },
                {
                    "id": "c",
                    "text": "Create → block → private key → broadcast"
                },
                {
                    "id": "d",
                    "text": "Mempool → sign → validator → create"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đây là luồng phổ biến của giao dịch qua mempool công khai; được đưa vào block chưa đồng nghĩa đã finalized.",
            "source": "https://ethereum.org/developers/docs/transactions/"
        },
        {
            "id": "bc-ch1-2-q18",
            "prompt": "Một node nhận được signed transaction. Trước khi chấp nhận transaction vào mempool, nó có thể kiểm tra:",
            "options": [
                {
                    "id": "a",
                    "text": "Signature"
                },
                {
                    "id": "b",
                    "text": "Nonce"
                },
                {
                    "id": "c",
                    "text": "Balance và tính hợp lệ của transaction"
                },
                {
                    "id": "d",
                    "text": "Tất cả các phương án trên"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Node có thể kiểm tra chữ ký, nonce, số dư và các quy tắc hợp lệ; chính sách mempool còn tùy client.",
            "source": "https://ethereum.org/developers/docs/transactions/"
        },
        {
            "id": "bc-ch1-2-q19",
            "prompt": "Một transaction đã được broadcast có nghĩa là:",
            "options": [
                {
                    "id": "a",
                    "text": "Transaction chắc chắn đã final"
                },
                {
                    "id": "b",
                    "text": "Transaction đã được gửi ra mạng nhưng chưa nhất thiết nằm trong block"
                },
                {
                    "id": "c",
                    "text": "Transaction đã có 100 confirmations"
                },
                {
                    "id": "d",
                    "text": "Private key đã được gửi cho validator"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Broadcast là gửi giao dịch ra mạng, chưa bảo đảm được đưa vào block hay finalized.",
            "source": "https://ethereum.org/developers/docs/transactions/"
        },
        {
            "id": "bc-ch1-2-q20",
            "prompt": "Điểm khác biệt quan trọng giữa Bitcoin UTXO model và Ethereum account model là:",
            "options": [
                {
                    "id": "a",
                    "text": "Bitcoin không có transaction"
                },
                {
                    "id": "b",
                    "text": "Ethereum không có address"
                },
                {
                    "id": "c",
                    "text": "Bitcoin theo dõi các unspent outputs, còn Ethereum theo dõi state/balance của account"
                },
                {
                    "id": "d",
                    "text": "Bitcoin không sử dụng digital signature"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Bitcoin theo dõi các output chưa tiêu; Ethereum duy trì trạng thái của account, gồm balance.",
            "source": "https://developer.bitcoin.org/devguide/transactions.html"
        },
        {
            "id": "bc-ch1-2-q21",
            "prompt": "Alice có một Bitcoin UTXO trị giá 1 BTC và muốn gửi Bob 0.4 BTC. Phát biểu nào hợp lý nhất?",
            "options": [
                {
                    "id": "a",
                    "text": "Alice nhất thiết phải gửi toàn bộ 1 BTC cho Bob"
                },
                {
                    "id": "b",
                    "text": "Transaction có thể tiêu UTXO 1 BTC rồi tạo output cho Bob và một change output cho Alice"
                },
                {
                    "id": "c",
                    "text": "Bitcoin giảm trực tiếp biến Alice.balance xuống 0.6 BTC"
                },
                {
                    "id": "d",
                    "text": "Không thể thực hiện vì UTXO không chia nhỏ được"
                }
            ],
            "correctOptionId": "b",
            "explanation": "UTXO được tiêu toàn bộ để tạo output mới. Nếu chỉ dùng input 1 BTC, change là 0.6 BTC trừ phí giao dịch.",
            "source": "https://developer.bitcoin.org/devguide/transactions.html"
        },
        {
            "id": "bc-ch1-2-q22",
            "prompt": "Trong transaction lifecycle, validator/miner có vai trò phù hợp nhất là:",
            "options": [
                {
                    "id": "a",
                    "text": "Biết private key của mọi người dùng"
                },
                {
                    "id": "b",
                    "text": "Chọn các transaction hợp lệ để đưa vào candidate/proposed block"
                },
                {
                    "id": "c",
                    "text": "Tạo address cho sender"
                },
                {
                    "id": "d",
                    "text": "Khôi phục seed phrase của sender"
                }
            ],
            "correctOptionId": "b",
            "explanation": "B là đáp án phù hợp nhất: bên tạo block chọn giao dịch hợp lệ. Không phải mọi validator đều đề xuất mỗi block; có hệ thống dùng block builder riêng.",
            "source": "https://ethereum.org/developers/docs/transactions/"
        },
        {
            "id": "bc-ch1-2-q23",
            "prompt": "Phát biểu nào sai?",
            "options": [
                {
                    "id": "a",
                    "text": "Private key không được broadcast cùng transaction"
                },
                {
                    "id": "b",
                    "text": "Signature có thể được gửi cùng transaction"
                },
                {
                    "id": "c",
                    "text": "Address có thể được chia sẻ công khai"
                },
                {
                    "id": "d",
                    "text": "Private key phải được gửi cho validator để validator kiểm tra signature"
                }
            ],
            "correctOptionId": "d",
            "explanation": "Xác minh chữ ký không đòi hỏi người gửi tiết lộ private key.",
            "source": "https://ethereum.org/developers/docs/accounts/"
        },
        {
            "id": "bc-ch1-2-q24",
            "prompt": "Nếu Alice xóa MetaMask khỏi máy nhưng còn đúng seed phrase thì điều gì hợp lý nhất?",
            "options": [
                {
                    "id": "a",
                    "text": "ETH mất vĩnh viễn"
                },
                {
                    "id": "b",
                    "text": "Alice có thể khôi phục lại các key/account tương ứng"
                },
                {
                    "id": "c",
                    "text": "Blockchain tạo cho Alice một private key hoàn toàn mới và chuyển ETH sang đó"
                },
                {
                    "id": "d",
                    "text": "Validators gửi lại private key cho Alice"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Có thể khôi phục account được suy ra từ seed phrase đó. Account từng import bằng private key riêng cần import lại; tài sản vẫn được ghi nhận trên blockchain.",
            "source": "https://support.metamask.io/configure/wallet/how-to-restore-your-metamask-wallet-from-secret-recovery-phrase"
        },
        {
            "id": "bc-ch1-2-q25",
            "prompt": "Đâu là mô hình hiểu đúng nhất?",
            "options": [
                {
                    "id": "a",
                    "text": "Wallet → chứa ETH → blockchain backup lại ETH"
                },
                {
                    "id": "b",
                    "text": "Blockchain ghi nhận state/tài sản ↑ wallet dùng key để tương tác"
                },
                {
                    "id": "c",
                    "text": "Address → chứa private key → chứa ETH"
                },
                {
                    "id": "d",
                    "text": "Seed phrase → được lưu công khai trên blockchain"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Blockchain ghi nhận trạng thái tài sản; wallet dùng key để tương tác với account.",
            "source": "https://ethereum.org/wallets/"
        }
    ]
};

