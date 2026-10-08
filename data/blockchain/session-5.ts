import type { Chapter } from "@/types/quiz";

export const session5: Chapter = {
  "id": "session-5",
  "title": "Session 5 - Ethereum & the EVM",
  "description": "Accounts, world state, transactions, gas & EIP-1559, EVM, Proof of Stake, upgrade roadmap, MEV và các câu hỏi trọng tâm từ Lab 5.",
  "revision": 2,
  "questions": [
    {
      "id": "bc-s5-q01",
      "prompt": "Vì sao Ethereum thường được mô tả là một “world computer” thay vì chỉ là một sổ cái chuyển tiền?",
      "options": [
        {
          "id": "a",
          "text": "Vì mỗi validator lưu một bản sao EVM nhưng chỉ node được chọn mới có quyền chạy smart contract."
        },
        {
          "id": "b",
          "text": "Vì Ethereum ghép các EOA thành một cụm máy tính, còn contract account chỉ lưu dữ liệu thụ động."
        },
        {
          "id": "c",
          "text": "Vì nhiều node cùng duy trì state và thực thi smart contract theo cùng quy tắc."
        },
        {
          "id": "d",
          "text": "Vì mọi transaction được gửi đến một máy chủ chung rồi máy chủ này phân phối kết quả cho các node khác."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. “World computer” là cách hình dung Ethereum như một máy tính dùng chung: các node giữ bản sao của blockchain state và full node tái thực thi transaction để cùng đi đến một kết quả. “State” là trạng thái hiện tại của hệ thống, ví dụ balance, nonce và storage của contract. “Smart contract” là chương trình được triển khai trên blockchain và được EVM thực thi. Điểm cốt lõi không phải có một máy chủ trung tâm, mà là cùng một computation được kiểm chứng bởi nhiều node.",
      "source": "Session 5, slide 5"
    },
    {
      "id": "bc-s5-q02",
      "prompt": "Cặp mô tả nào phân biệt đúng EOA và contract account trên Ethereum?",
      "options": [
        {
          "id": "a",
          "text": "EOA có bytecode riêng và contract account có private key; cả hai đều tự khởi tạo transaction."
        },
        {
          "id": "b",
          "text": "EOA do private key điều khiển và khởi tạo transaction; contract account do code điều khiển."
        },
        {
          "id": "c",
          "text": "EOA được tạo bằng CREATE còn contract account được tạo bằng key generation; cả hai đều không có storage."
        },
        {
          "id": "d",
          "text": "EOA chỉ giữ ETH còn contract account chỉ giữ token; cả hai cùng được điều khiển bởi chữ ký ECDSA."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. EOA, viết tắt của Externally Owned Account, là tài khoản do người dùng kiểm soát bằng private key. Contract account là tài khoản gắn với EVM bytecode và storage, nên hành vi của nó do code quyết định. “Khởi tạo transaction” nghĩa là tạo giao dịch gốc được ký và đưa lên mạng; theo slide, mọi hành động trên Ethereum bắt đầu từ một EOA ký transaction, còn contract chỉ chạy khi execution flow gọi tới nó.",
      "source": "Session 5, slide 6"
    },
    {
      "id": "bc-s5-q03",
      "prompt": "Phát biểu nào mô tả đúng nguồn gốc của một chuỗi lời gọi contract trên Ethereum?",
      "options": [
        {
          "id": "a",
          "text": "Contract đầu tiên trong chuỗi tự ký transaction bằng codeHash của nó rồi gọi các contract còn lại."
        },
        {
          "id": "b",
          "text": "Block proposer tạo transaction gốc, sau đó EOA chỉ xác nhận lại khi execution đã hoàn tất."
        },
        {
          "id": "c",
          "text": "Bất kỳ account nào có balance lớn hơn 0 đều có thể tự khởi tạo transaction mà không cần chữ ký."
        },
        {
          "id": "d",
          "text": "Transaction gốc do EOA ký; contract có thể tạo các internal call trong quá trình thực thi."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Transaction gốc cần chữ ký của EOA, nhưng sau khi EVM bắt đầu thực thi, một contract có thể tạo các internal call tới contract khác. “Internal call” không phải một transaction độc lập do private key ký; nó là một bước trong cùng execution context của transaction gốc. Vì vậy contract có thể kích hoạt code khác nhưng không tự phát sinh một giao dịch gốc như EOA.",
      "source": "Session 5, slide 6"
    },
    {
      "id": "bc-s5-q04",
      "prompt": "Bốn trường của một Ethereum account state theo Session 5 là bộ nào?",
      "options": [
        {
          "id": "a",
          "text": "nonce, balance, codeHash, storageRoot"
        },
        {
          "id": "b",
          "text": "nonce, gasLimit, transactionRoot, stateRoot"
        },
        {
          "id": "c",
          "text": "balance, privateKeyHash, bytecode, receiptRoot"
        },
        {
          "id": "d",
          "text": "address, balance, publicKey, storageRoot"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. `nonce` là bộ đếm liên quan đến transaction hoặc contract creation; `balance` là số wei account đang giữ; `codeHash` là hash của bytecode đối với contract; `storageRoot` là root của storage trie riêng của contract. “Root” ở đây là một hash đại diện cho toàn bộ cấu trúc dữ liệu bên dưới, cho phép cam kết và kiểm chứng dữ liệu mà không phải nhét toàn bộ storage vào account record.",
      "source": "Session 5, slide 7"
    },
    {
      "id": "bc-s5-q05",
      "prompt": "`nonce` trong account state được hiểu như thế nào đối với EOA và contract account?",
      "options": [
        {
          "id": "a",
          "text": "EOA: số block đã tham gia; contract: số lần bytecode đã chạy."
        },
        {
          "id": "b",
          "text": "EOA: số ETH đã gửi; contract: số storage slot khác 0."
        },
        {
          "id": "c",
          "text": "EOA: số transaction đã gửi; contract: số contract đã tạo."
        },
        {
          "id": "d",
          "text": "EOA: số chữ ký hợp lệ; contract: số internal call đã nhận."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. Với EOA, nonce tăng khi account gửi transaction và giúp chống việc phát lại cùng transaction theo thứ tự cũ. Với contract account, slide mô tả nonce là số contract mà account đó đã tạo. “Anti-replay” là cơ chế ngăn một giao dịch hợp lệ bị dùng lại như thể là giao dịch mới; nonce khiến mỗi transaction của một EOA có vị trí riêng trong chuỗi transaction của account đó.",
      "source": "Session 5, slide 7"
    },
    {
      "id": "bc-s5-q06",
      "prompt": "Phát biểu nào đúng về `balance`, `codeHash` và `storageRoot`?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ EOA có balance; contract account không thể giữ ETH nhưng có storageRoot."
        },
        {
          "id": "b",
          "text": "Cả hai có balance; contract có codeHash của bytecode và storageRoot của storage trie."
        },
        {
          "id": "c",
          "text": "EOA và contract đều có bytecode, nhưng chỉ EOA có storageRoot vì EOA lưu lịch sử transaction."
        },
        {
          "id": "d",
          "text": "codeHash chứa trực tiếp source code Solidity, còn storageRoot chứa private key của owner."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. `balance` được đo bằng wei và cả EOA lẫn contract đều có thể giữ ETH. `codeHash` là hash của bytecode, tức mã máy EVM đã biên dịch; EOA không có contract bytecode nên dùng hash của empty code. `storageRoot` là gốc của trie lưu persistent state của contract. “Persistent” nghĩa là dữ liệu vẫn còn qua nhiều transaction, khác với memory chỉ tồn tại trong một lần gọi.",
      "source": "Session 5, slide 7"
    },
    {
      "id": "bc-s5-q07",
      "prompt": "World state của Ethereum liên hệ với block header theo cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Các account nằm trong Merkle-Patricia trie; root của nó là `stateRoot` trong block header."
        },
        {
          "id": "b",
          "text": "Mỗi block header chứa trực tiếp balance của mọi EOA và code của mọi contract để light client đọc ngay."
        },
        {
          "id": "c",
          "text": "World state chỉ là danh sách transaction chưa xác nhận; khi block hoàn tất danh sách này bị xóa."
        },
        {
          "id": "d",
          "text": "Mỗi contract có một blockchain riêng, sau đó các root được nối bằng transactionRoot của Bitcoin-style Merkle tree."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Merkle-Patricia trie là cấu trúc cây dùng để ánh xạ account address tới account state và tạo một root hash đại diện cho toàn bộ world state. `stateRoot` trong block header là commitment 32 byte cho trạng thái đó. “Commitment” là một giá trị ngắn gọn ràng buộc với dữ liệu gốc: nếu dữ liệu thay đổi thì root cũng đổi, nhờ vậy node và light client có thể kiểm chứng state bằng proof.",
      "source": "Session 5, slides 8-9"
    },
    {
      "id": "bc-s5-q08",
      "prompt": "Một light client muốn kiểm tra balance của một account mà không tải toàn bộ Ethereum state. Điều gì cho phép nó làm vậy?",
      "options": [
        {
          "id": "a",
          "text": "Nó lấy private key của proposer để giải mã state của block gần nhất."
        },
        {
          "id": "b",
          "text": "Nó chỉ cần transaction hash cuối cùng của account vì hash này chứa balance hiện tại."
        },
        {
          "id": "c",
          "text": "Nó hỏi một full node về balance rồi tin kết quả; Merkle structure không tham gia vào quá trình kiểm chứng."
        },
        {
          "id": "d",
          "text": "Dùng block header chứa `stateRoot` cùng Merkle-Patricia proof có kích thước khoảng O(log n)."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Light client không duy trì toàn bộ state nên cần một proof chứng minh rằng account state cụ thể nằm dưới `stateRoot` đã biết. “Merkle-Patricia proof” là tập các node cần thiết trên đường từ leaf tới root; vì cây phân nhánh, lượng dữ liệu proof tăng gần theo O(log n) thay vì theo tổng số account. Đây là cùng ý tưởng Merkle của Session 3 nhưng áp dụng cho Ethereum state.",
      "source": "Session 5, slide 9"
    },
    {
      "id": "bc-s5-q09",
      "prompt": "Với trường `to` của Ethereum transaction, cách diễn giải nào đúng nhất?",
      "options": [
        {
          "id": "a",
          "text": "`to` là EOA thì EVM luôn chạy bytecode của EOA; `to` là contract thì chỉ chuyển ETH; `to` rỗng thì transaction lỗi."
        },
        {
          "id": "b",
          "text": "EOA thường nhận transfer; contract có thể chạy code; `to` rỗng dùng để deploy."
        },
        {
          "id": "c",
          "text": "`to` luôn phải là địa chỉ validator vì validator là người nhận transaction trước khi contract được gọi."
        },
        {
          "id": "d",
          "text": "`to` chỉ quyết định người nhận tip; phần execution được chọn hoàn toàn từ trường `data`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Khi `to` là EOA, transaction có thể là simple transfer. Khi `to` là contract address, EVM có thể thực thi bytecode của contract, thường dựa trên `data`. Khi `to` để trống, transaction là contract-creation transaction. “Deployment” là quá trình tạo một contract account mới và đưa bytecode của nó lên chain.",
      "source": "Session 5, slide 10"
    },
    {
      "id": "bc-s5-q10",
      "prompt": "[Lab Q1] Tại sao `chainId` được đưa vào signed payload của transaction theo EIP-155?",
      "options": [
        {
          "id": "a",
          "text": "Để EVM chọn đúng opcode table vì mỗi chain sử dụng một bộ opcode khác nhau."
        },
        {
          "id": "b",
          "text": "Để RPC server biết địa chỉ ví nào đang giữ private key và có thể ký thay người dùng."
        },
        {
          "id": "c",
          "text": "`chainId` ràng buộc chữ ký với một chain cụ thể, giúp chống cross-chain replay."
        },
        {
          "id": "d",
          "text": "Để `chainId` thay thế nonce, nhờ đó một EOA có thể gửi nhiều transaction song song mà không cần thứ tự."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. EIP-155 đưa `chainId` vào dữ liệu ký để tạo domain separation giữa các chain. “Replay attack” là việc lấy một chữ ký hoặc transaction hợp lệ ở ngữ cảnh này rồi dùng lại ở ngữ cảnh khác. Khi `chainId` khác nhau, signed payload khác nhau nên chữ ký của chain A không còn xác minh cho transaction tương ứng trên chain B. Việc thêm network trong MetaMask chỉ đổi RPC endpoint và chainId; private key vẫn ở thiết bị.",
      "source": "Lab 5, Q1; Session 5, slide 10"
    },
    {
      "id": "bc-s5-q11",
      "prompt": "Trường `data` và chữ ký `(v, r, s)` trong transaction có vai trò nào?",
      "options": [
        {
          "id": "a",
          "text": "`data` chứa selector và arguments; `(v,r,s)` cho phép recover signer."
        },
        {
          "id": "b",
          "text": "`data` chứa private key đã mã hóa; `(v,r,s)` là ba trường dùng để tính gas limit."
        },
        {
          "id": "c",
          "text": "`data` chỉ dùng khi deploy contract; mọi contract call sau đó xác định hàm bằng `to` chứ không cần selector."
        },
        {
          "id": "d",
          "text": "`data` chứa stateRoot của block; `(v,r,s)` là Merkle proof cho transaction receipt."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. `data` là calldata của transaction và khi gọi contract, phần đầu thường chứa function selector, phần sau chứa arguments được ABI-encode. ABI, Application Binary Interface, là quy ước biến lời gọi hàm ở mức ngôn ngữ thành bytes. `(v,r,s)` là các thành phần chữ ký ECDSA; từ chữ ký và message hash, Ethereum có thể recover public key/address của người ký thay vì lưu public key trong transaction.",
      "source": "Session 5, slides 10 and 22"
    },
    {
      "id": "bc-s5-q12",
      "prompt": "Ghép transaction type với đặc điểm nào là đúng theo Session 5?",
      "options": [
        {
          "id": "a",
          "text": "Type 0: EIP-1559; Type 1: blob transaction; Type 2: access list; Type 3: legacy gasPrice."
        },
        {
          "id": "b",
          "text": "Type 0: access list; Type 1: legacy gasPrice; Type 2: EIP-4844; Type 3: EIP-1559."
        },
        {
          "id": "c",
          "text": "Type 0: contract creation only; Type 1: ETH transfer only; Type 2: contract call only; Type 3: rollup only."
        },
        {
          "id": "d",
          "text": "Type 0: legacy `gasPrice`; Type 1: EIP-2930 access list; Type 2: EIP-1559; Type 3: EIP-4844 blobs."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Type 0 là định dạng legacy với một `gasPrice`. Type 1 thêm access list theo EIP-2930. Type 2 là định dạng EIP-1559 với `maxFeePerGas` và `maxPriorityFeePerGas`, được slide gọi là mặc định hiện nay. Type 3 theo EIP-4844 bổ sung blob data phục vụ rollup. “Blob” là vùng dữ liệu tạm thời rẻ hơn cho Layer 2, không phải storage thường của EVM.",
      "source": "Session 5, slide 11"
    },
    {
      "id": "bc-s5-q13",
      "prompt": "Lý do quan trọng nhất để Ethereum gắn gas cost với từng bước thực thi là gì?",
      "options": [
        {
          "id": "a",
          "text": "Để miner hoặc validator có thể sửa kết quả computation nếu transaction trả phí quá thấp."
        },
        {
          "id": "b",
          "text": "Để mọi opcode mất đúng cùng một lượng thời gian CPU trên tất cả phần cứng."
        },
        {
          "id": "c",
          "text": "Gas giới hạn computation, ngăn infinite loop/DoS và định giá state growth."
        },
        {
          "id": "d",
          "text": "Để smart contract được phép truy cập Internet nhưng phải trả phí theo số byte tải xuống."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. EVM có thể chạy chương trình tùy ý nên tồn tại halting problem: không có thuật toán tổng quát biết trước một chương trình bất kỳ có dừng hay không. Gas giải quyết theo hướng thực dụng bằng cách buộc mỗi opcode tiêu một phần ngân sách hữu hạn. Khi hết gas, execution dừng. Gas cũng định giá state growth, đặc biệt việc ghi storage, vì dữ liệu đó tạo gánh nặng lâu dài cho các node.",
      "source": "Session 5, slide 12"
    },
    {
      "id": "bc-s5-q14",
      "prompt": "[Lab Q5] Con số 21,000 gas trong một simple ETH transfer nên được hiểu thế nào?",
      "options": [
        {
          "id": "a",
          "text": "21,000 là intrinsic cost; transaction thất bại vẫn trả phần gas đã dùng."
        },
        {
          "id": "b",
          "text": "Đó là `gasPrice` mặc định của EIP-1559, luôn bằng 21,000 gwei bất kể network congestion."
        },
        {
          "id": "c",
          "text": "Đó là số opcode mà EVM bắt buộc chạy cho mọi transaction, kể cả contract creation và contract call."
        },
        {
          "id": "d",
          "text": "Đó là block gas target chia cho số transaction trung bình trong block và được hoàn toàn bộ khi transaction revert."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. `21,000 gas` là intrinsic gas floor của một simple ETH transfer, không phải giá gas. “Gas” đo lượng công việc; “gas price” đo số wei trả cho mỗi gas. Khi transaction thất bại, state có thể rollback nhưng computation trước khi lỗi vẫn đã được các node thực hiện, nên gas đã tiêu không được hoàn lại. Điều này ngăn người dùng spam các execution thất bại miễn phí.",
      "source": "Session 5, slide 13; Lab 5, Q5"
    },
    {
      "id": "bc-s5-q15",
      "prompt": "Phân biệt `gasLimit` và `gasUsed` trong một transaction như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "`gasLimit` là lượng gas validator đã dùng; `gasUsed` là mức tối đa wallet chấp nhận trả."
        },
        {
          "id": "b",
          "text": "Hai trường luôn bằng nhau sau khi transaction được đưa vào block, vì gas thừa bị burn."
        },
        {
          "id": "c",
          "text": "`gasUsed` do người dùng đặt trước; `gasLimit` chỉ được biết sau khi EVM chạy xong."
        },
        {
          "id": "d",
          "text": "`gasLimit` là ngân sách tối đa; `gasUsed` là lượng execution thực tế tiêu thụ."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. `gasLimit` là trần gas cho một transaction, giống ngân sách computation. `gasUsed` là số gas EVM thực sự tiêu sau execution. Nếu transaction dùng ít hơn limit, phần chưa dùng không bị tính vào chi phí. Nếu execution cần vượt quá limit thì xảy ra out-of-gas: state changes rollback nhưng gas đã cung cấp cho execution bị tiêu.",
      "source": "Session 5, slide 13"
    },
    {
      "id": "bc-s5-q16",
      "prompt": "Cặp opcode và gas cost gần đúng nào khớp trực giác pricing trong slide?",
      "options": [
        {
          "id": "a",
          "text": "ADD/PUSH ≈ 20,000; SSTORE 0→x ≈ 3; cold SLOAD ≈ 30; CALL ≈ 6/word."
        },
        {
          "id": "b",
          "text": "ADD/PUSH ≈ 2-3; KECCAK256 ≈ 30 + 6/word; cold SLOAD ≈ 2,100; SSTORE 0→x ≈ 20,000."
        },
        {
          "id": "c",
          "text": "Mọi opcode ≈ 21,000 vì transaction nào cũng có intrinsic cost giống nhau."
        },
        {
          "id": "d",
          "text": "SSTORE rẻ nhất vì dữ liệu đã nằm on-chain; ADD đắt nhất vì phải chạy trên mọi full node."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Các phép tính CPU đơn giản như ADD/PUSH rẻ, còn thao tác state như SLOAD và đặc biệt SSTORE đắt hơn nhiều. `SLOAD` đọc storage; `SSTORE` ghi persistent storage. “Cold” access là lần đầu chạm tới một slot/account trong transaction nên đắt hơn “warm” access đã được truy cập trước đó. Việc ghi storage đắt vì state phải được duy trì lâu dài bởi mạng.",
      "source": "Session 5, slide 14"
    },
    {
      "id": "bc-s5-q17",
      "prompt": "Trong EIP-1559, cơ chế `baseFee` ở cấp block được mô tả đúng nhất bởi lựa chọn nào?",
      "options": [
        {
          "id": "a",
          "text": "Protocol đặt `baseFee`; target 15M, cap 30M và điều chỉnh tối đa khoảng ±12.5% mỗi block."
        },
        {
          "id": "b",
          "text": "Proposer đấu giá base fee với người dùng; target 30M gas và base fee không bao giờ giảm khi block rỗng."
        },
        {
          "id": "c",
          "text": "Wallet tự đặt base fee cho từng transaction; protocol chỉ kiểm tra tip có lớn hơn base fee hay không."
        },
        {
          "id": "d",
          "text": "Base fee bằng median của `maxFeePerGas` trong mempool và được trả toàn bộ cho block proposer."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. EIP-1559 tách phần phí protocol-controlled là `baseFee` khỏi tip. Block có target 15M gas và cap 30M gas theo slide. Nếu block dùng nhiều hơn target, base fee của block sau tăng; nếu dùng ít hơn target, base fee giảm; biên thay đổi mỗi block khoảng 12.5%. “Protocol-controlled” nghĩa là giá này được tính theo quy tắc của Ethereum chứ không do proposer tùy ý chọn.",
      "source": "Session 5, slide 15"
    },
    {
      "id": "bc-s5-q18",
      "prompt": "Nếu một block dùng đúng mức target khoảng 15M gas của EIP-1559, điều gì xảy ra với `baseFee` của block kế tiếp?",
      "options": [
        {
          "id": "a",
          "text": "Tăng đúng 12.5% vì block đã đạt mục tiêu."
        },
        {
          "id": "b",
          "text": "Giảm đúng 12.5% vì target vẫn thấp hơn cap 30M."
        },
        {
          "id": "c",
          "text": "`baseFee` về cơ bản giữ nguyên vì gas used đúng target."
        },
        {
          "id": "d",
          "text": "Được đặt lại về mức priority fee trung vị trong block vừa rồi."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. Target là điểm cân bằng của cơ chế điều chỉnh base fee. Khi gas used bằng target, protocol không có lý do tăng hoặc giảm mức base fee kế tiếp. Nếu gas used cao hơn target, base fee tăng để làm demand đắt hơn; nếu thấp hơn target, base fee giảm. Đây là feedback mechanism, tức cơ chế phản hồi tự động dựa trên mức sử dụng block space.",
      "source": "Session 5, slide 15"
    },
    {
      "id": "bc-s5-q19",
      "prompt": "Tại sao sustained congestion có thể khiến `baseFee` tăng nhanh theo thời gian?",
      "options": [
        {
          "id": "a",
          "text": "Vì mỗi transaction mới cộng trực tiếp 12.5 gwei vào base fee của block hiện tại."
        },
        {
          "id": "b",
          "text": "Vì validator có quyền nhân base fee tùy ý khi mempool dài hơn một block."
        },
        {
          "id": "c",
          "text": "Vì cap 30M gas tự động tăng sau mỗi block đầy, làm base fee tăng theo cùng tỷ lệ."
        },
        {
          "id": "d",
          "text": "Tỷ lệ tăng được lặp trên base fee hiện tại nên có thể tạo tăng trưởng lũy thừa."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Nếu nhiều block liên tiếp vượt target, mỗi block làm base fee tiếp theo tăng theo tỷ lệ trên giá trị hiện tại. Việc nhân lặp qua nhiều block tạo quỹ đạo gần exponential, hay tăng trưởng lũy thừa. Cơ chế này tiếp tục cho tới khi phí đủ cao để một phần demand rút lui, kéo gas used về quanh target.",
      "source": "Session 5, slide 15"
    },
    {
      "id": "bc-s5-q20",
      "prompt": "Công thức nào đúng cho `effectiveGasPrice` của một type-2 transaction?",
      "options": [
        {
          "id": "a",
          "text": "`effectiveGasPrice = maxFeePerGas + maxPriorityFeePerGas`"
        },
        {
          "id": "b",
          "text": "`baseFee + min(maxPriorityFeePerGas, maxFeePerGas - baseFee)`"
        },
        {
          "id": "c",
          "text": "`effectiveGasPrice = gasUsed × maxFeePerGas`"
        },
        {
          "id": "d",
          "text": "`effectiveGasPrice = max(baseFee, maxFeePerGas) - maxPriorityFeePerGas`"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. `maxFeePerGas` là mức trần tổng giá người dùng sẵn sàng trả cho mỗi gas; `maxPriorityFeePerGas` là mức tip tối đa mong muốn. Sau khi block có base fee cụ thể, effective price bằng base fee cộng phần tip thực tế, nhưng tổng không được vượt max fee. Vì vậy phần tip thực tế là `min(maxPriorityFee, maxFee - baseFee)`.",
      "source": "Session 5, slide 17"
    },
    {
      "id": "bc-s5-q21",
      "prompt": "Phân rã tổng phí của một transaction EIP-1559 theo Session 5 là gì?",
      "options": [
        {
          "id": "a",
          "text": "`paid = gasLimit × maxFee`; toàn bộ `paid` được trả cho proposer nếu transaction thành công."
        },
        {
          "id": "b",
          "text": "`burned = gasUsed × priorityFee`; `tip = gasUsed × baseFee`; hai phần đều rời circulation."
        },
        {
          "id": "c",
          "text": "`paid = gasUsed × effectiveGasPrice`; `burned = gasUsed × baseFee`; `tip = paid - burned`."
        },
        {
          "id": "d",
          "text": "`paid = burned - tip`; nếu tip lớn hơn base fee thì protocol hoàn phần chênh lệch cho sender."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. `paid` là tổng phí thực tế. Phần `burned` tương ứng base fee bị đốt, tức bị loại khỏi circulating supply. Phần `tip` hay priority fee thực tế đi tới block proposer. Vì `effectiveGasPrice = baseFee + effective tip`, luôn có invariant `paid = burned + tip` khi nhân cả hai phía với `gasUsed`. “Invariant” là một đẳng thức phải luôn đúng trong mô hình này.",
      "source": "Session 5, slides 16-17; Lab 5.3"
    },
    {
      "id": "bc-s5-q22",
      "prompt": "Một transaction dùng 21,000 gas với `baseFee = 30 gwei`, `maxPriorityFee = 2 gwei`, `maxFee = 100 gwei`. Kết quả nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "Effective price = 32 gwei; 30 gwei/gas bị burn, 2 gwei/gas là tip; tổng phí = 0.000672 ETH."
        },
        {
          "id": "b",
          "text": "Effective price = 100 gwei; phần chênh giữa 100 và 32 gwei được proposer giữ làm bonus."
        },
        {
          "id": "c",
          "text": "Effective price = 30 gwei; priority fee chỉ được dùng khi base fee chạm maxFee."
        },
        {
          "id": "d",
          "text": "Effective price = 102 gwei; maxFee và priority fee luôn cộng trực tiếp rồi mới trừ base fee."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Vì `maxFee - baseFee = 70 gwei`, cap không bó phần tip 2 gwei, nên effective price = 30 + 2 = 32 gwei. Tổng phí là `21,000 × 32 gwei = 672,000 gwei = 0.000672 ETH`. Trong đó `21,000 × 30 gwei` là base fee bị burn và `21,000 × 2 gwei` là tip cho proposer. `gwei = 10^9 wei`, còn `1 ETH = 10^18 wei`.",
      "source": "Session 5, slides 16-17"
    },
    {
      "id": "bc-s5-q23",
      "prompt": "Trong EIP-1559, `baseFee` và phần tip thực tế được xử lý như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Base fee trả cho proposer; tip bị burn để giảm phát."
        },
        {
          "id": "b",
          "text": "Cả hai được burn, còn proposer chỉ nhận block issuance."
        },
        {
          "id": "c",
          "text": "Cả hai được trả cho proposer nếu block trên target; nếu block dưới target thì cả hai được hoàn lại."
        },
        {
          "id": "d",
          "text": "`baseFee` bị burn; phần tip thực tế được trả cho block proposer."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. `baseFee` bị burn, nghĩa là số ETH tương ứng bị loại khỏi lưu thông. Tip, hay priority fee, là phần incentive trực tiếp cho proposer để đưa transaction vào block. “Proposer” trong PoS là validator được chọn để đề xuất block ở một slot. Việc burn base fee tách doanh thu của proposer khỏi phần giá protocol dùng để điều tiết block-space demand.",
      "source": "Session 5, slides 16-17"
    },
    {
      "id": "bc-s5-q24",
      "prompt": "Việc burn base fee kể từ London upgrade có ý nghĩa kinh tế nào trong slide?",
      "options": [
        {
          "id": "a",
          "text": "Nó làm gas limit của block giảm dần cho đến khi mọi block có kích thước giống nhau."
        },
        {
          "id": "b",
          "text": "Burn làm giảm circulating supply và tạo deflationary pressure."
        },
        {
          "id": "c",
          "text": "Nó chuyển toàn bộ phí từ proposer sang người gửi transaction sau khi block finalized."
        },
        {
          "id": "d",
          "text": "Nó khóa base fee vào staking contract và phân phối lại cho attesters sau mỗi epoch."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Burn làm giảm lượng ETH lưu hành vì phần base fee không được chuyển cho bất kỳ account nào. “Deflationary pressure” là áp lực làm nguồn cung ròng giảm hoặc tăng chậm hơn; nó không có nghĩa ETH chắc chắn luôn giảm cung, vì còn phải so với lượng ETH mới được phát hành cho validator. Slide nhấn mạnh hàng triệu ETH đã bị burn kể từ London vào tháng 8/2021.",
      "source": "Session 5, slide 17"
    },
    {
      "id": "bc-s5-q25",
      "prompt": "[Lab Q3] `eth_feeHistory` trả `baseFeePerGas` dài N+1 nhưng `gasUsedRatio` chỉ dài N. Phần tử base fee dư đại diện cho gì?",
      "options": [
        {
          "id": "a",
          "text": "Đó là base fee dự kiến của block kế tiếp, dùng cùng tip estimate để đặt `maxFeePerGas`."
        },
        {
          "id": "b",
          "text": "Base fee của genesis block; wallet dùng nó làm mức sàn vĩnh viễn cho mọi transaction."
        },
        {
          "id": "c",
          "text": "Median base fee của N block; wallet dùng nó thay cho `maxPriorityFeePerGas`."
        },
        {
          "id": "d",
          "text": "Base fee của transaction cuối cùng trong mempool; wallet dùng nó để chọn nonce tiếp theo."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Với N block lịch sử, có N gas-used ratios nhưng N+1 base fees vì phần tử cuối là base fee đã được protocol dự phóng cho block kế tiếp. Wallet có thể nhìn recent base fees, projected next base fee và tip percentiles để ước lượng fee cap. `maxFeePerGas` là trần tổng giá trên mỗi gas, nên thường cần đủ khoảng đệm nếu base fee tiếp tục tăng trước khi transaction được đưa vào block.",
      "source": "Lab 5, Q3; Session 5, slide 17"
    },
    {
      "id": "bc-s5-q26",
      "prompt": "[Lab Q2] TrustKeys L1 có `gasUsedRatio` khoảng 2%, rất thấp so với target. Vì sao `baseFee` có thể nằm ở mức chỉ vài wei?",
      "options": [
        {
          "id": "a",
          "text": "Vì chain ít transaction nên proposer tự đặt base fee về 0 để thu hút người dùng."
        },
        {
          "id": "b",
          "text": "Vì EIP-1559 tắt khi gasUsedRatio dưới 50%, chỉ còn priority fee được tính."
        },
        {
          "id": "c",
          "text": "Vì block liên tục dưới target nên EIP-1559 liên tục điều chỉnh `baseFee` xuống."
        },
        {
          "id": "d",
          "text": "Vì `gasUsedRatio` thấp làm `maxPriorityFeePerGas` tự động chuyển thành base fee và được hoàn lại."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. EIP-1559 là cơ chế feedback: gas used thấp hơn target làm base fee của block tiếp theo giảm. Nếu chain duy trì mức sử dụng rất thấp trong nhiều block, base fee giảm lặp lại và có thể nằm ở mức vài wei. `gasUsedRatio` biểu diễn phần gas limit của block đã được sử dụng; khoảng 2% cho thấy chain rất rảnh so với target 15M/cap 30M được dùng trong bài lab.",
      "source": "Lab 5, Q2; Session 5, slide 15"
    },
    {
      "id": "bc-s5-q27",
      "prompt": "[Lab Q4] Giả sử `baseFee = 20 gwei`, `maxPriorityFee = 2 gwei`, `maxFee = 100 gwei`. Nếu tăng `maxFee` lên 200 gwei nhưng giữ priority fee như cũ, điều gì xảy ra ngay với `effectiveGasPrice`?",
      "options": [
        {
          "id": "a",
          "text": "Tăng lên 122 gwei vì phần maxFee tăng thêm luôn được coi là tip cho proposer."
        },
        {
          "id": "b",
          "text": "Giảm xuống 20 gwei vì maxFee cao làm transaction được xếp ưu tiên hơn nên không cần tip."
        },
        {
          "id": "c",
          "text": "Tăng gấp đôi vì effective price luôn tỷ lệ tuyến tính với maxFee."
        },
        {
          "id": "d",
          "text": "Vẫn là 22 gwei vì `maxFee` chỉ là cap; priority fee mới đang giới hạn giá thực tế."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Công thức là `baseFee + min(priorityFee, maxFee - baseFee)`. Ban đầu `maxFee - baseFee = 80`, lớn hơn priority fee 2, nên effective tip = 2 và effective price = 22. Nâng maxFee lên 200 chỉ nới “cap”, tức trần cho phép, chứ không buộc người dùng trả sát trần. MaxFee chỉ làm effective price thay đổi khi cap hiện tại đang bó phần tip hoặc không đủ chứa base fee.",
      "source": "Lab 5, Q4; Session 5, slide 17"
    },
    {
      "id": "bc-s5-q28",
      "prompt": "Mô tả nào đúng nhất về kiến trúc cơ bản của EVM?",
      "options": [
        {
          "id": "a",
          "text": "Một register machine 64-bit dùng floating-point để tối ưu smart contract tài chính."
        },
        {
          "id": "b",
          "text": "EVM là stack machine 256-bit và deterministic trên mọi node."
        },
        {
          "id": "c",
          "text": "Một VM bất định, dùng nguồn randomness của hệ điều hành để tránh người dùng dự đoán execution."
        },
        {
          "id": "d",
          "text": "Một runtime chỉ chạy trên proposer; các full node khác tin stateRoot do proposer công bố."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. EVM là stack machine với word size 256 bit, phù hợp với Keccak-256 và toán học elliptic-curve được nhắc lại từ Session 3. “Stack machine” là máy ảo mà phần lớn opcode lấy toán hạng từ stack và đẩy kết quả trở lại stack. Tính “deterministic” nghĩa là cùng bytecode + cùng pre-state + cùng input phải cho cùng post-state trên mọi node, nếu không consensus sẽ vỡ.",
      "source": "Session 5, slide 18"
    },
    {
      "id": "bc-s5-q29",
      "prompt": "Tại sao EVM được thiết kế như một môi trường sandboxed?",
      "options": [
        {
          "id": "a",
          "text": "Để contract chỉ được đọc balance của chính nó và không thể gọi contract khác."
        },
        {
          "id": "b",
          "text": "Để source code Solidity được giữ bí mật khỏi các full node trong lúc execution."
        },
        {
          "id": "c",
          "text": "Để mỗi contract có một hệ điều hành riêng với filesystem và network namespace tách biệt."
        },
        {
          "id": "d",
          "text": "Để code không truy cập trực tiếp network, disk, randomness hay clock bên ngoài chain."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Sandbox của EVM loại bỏ các nguồn dữ liệu tùy ý từ môi trường máy chạy, như HTTP request, local disk, system clock hoặc OS randomness. Nếu mỗi node đọc dữ liệu ngoài khác nhau, cùng transaction có thể cho kết quả khác nhau và phá determinism. Contract vẫn có thể gọi contract khác, nhưng tất cả lời gọi đó diễn ra trong mô hình execution mà các node có thể tái hiện giống nhau.",
      "source": "Session 5, slide 18"
    },
    {
      "id": "bc-s5-q30",
      "prompt": "Vì sao every full node re-executes every transaction theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Để node tự kiểm tra state transition thay vì tin kết quả computation của proposer."
        },
        {
          "id": "b",
          "text": "Để mỗi node tạo lại chữ ký `(v,r,s)` và thay signer bằng địa chỉ validator của node đó."
        },
        {
          "id": "c",
          "text": "Để gas fee được nhân với số full node, nhờ đó proposer nhận nhiều phí hơn khi mạng lớn."
        },
        {
          "id": "d",
          "text": "Để mỗi node tạo một stateRoot khác nhau rồi consensus chọn root có số phiếu cao nhất."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Full node không tin proposer về kết quả computation; nó thực thi lại transaction và tự tính post-state. “State transition” là phép biến đổi từ trạng thái trước transaction sang trạng thái sau transaction. Nếu transaction hoặc block hợp lệ, các node tuân cùng quy tắc sẽ tính cùng kết quả và cùng root. Đây là một lý do Ethereum computation đắt: cùng công việc logic được lặp lại trên nhiều node để có verification phi tập trung.",
      "source": "Session 5, slide 18"
    },
    {
      "id": "bc-s5-q31",
      "prompt": "Ghép bốn vùng dữ liệu EVM với vòng đời và mục đích nào là đúng?",
      "options": [
        {
          "id": "a",
          "text": "Stack: persistent contract state; Memory: read-only input; Storage: per-op operands; Calldata: temporary hashing buffer."
        },
        {
          "id": "b",
          "text": "Stack: read-only input; Memory: persistent state; Storage: per-call temporary; Calldata: nơi lưu bytecode của contract."
        },
        {
          "id": "c",
          "text": "Stack: operand; memory: dữ liệu tạm; storage: state vĩnh viễn; calldata: input read-only."
        },
        {
          "id": "d",
          "text": "Stack và storage đều tồn tại vĩnh viễn; memory và calldata đều được ghi lại trong account state sau transaction."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. `stack` chứa operands cho opcode và sống theo execution; `memory` là vùng byte tạm của một call và mất sau call; `storage` là persistent contract state nên đắt; `calldata` là input read-only chứa function selector và arguments. “Data location” chỉ nơi dữ liệu sống và thời gian tồn tại của nó. Đây là nền tảng để Session 6 phân biệt `storage`, `memory` và `calldata` trong Solidity.",
      "source": "Session 5, slide 20"
    },
    {
      "id": "bc-s5-q32",
      "prompt": "Stack của EVM có đặc điểm nào được nhấn mạnh trong Session 5?",
      "options": [
        {
          "id": "a",
          "text": "Mỗi phần tử 160 bit và stack không giới hạn độ sâu vì gas đã đủ để chống DoS."
        },
        {
          "id": "b",
          "text": "Mỗi phần tử 256 bit và stack chứa tối đa 1,024 phần tử."
        },
        {
          "id": "c",
          "text": "Mỗi phần tử 32 bit; khi cần số lớn EVM ghép 8 phần tử thành một word 256 bit."
        },
        {
          "id": "d",
          "text": "Mỗi phần tử có kích thước thay đổi tùy opcode và được lưu trực tiếp trong persistent storage."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. EVM dùng word 256 bit và stack depth tối đa 1,024 phần tử. Word size 256 bit thuận tiện cho Keccak-256 và các phép toán mật mã được Ethereum sử dụng. “Stack” là cấu trúc LIFO, Last In First Out: dữ liệu được push lên đỉnh và opcode thường pop toán hạng từ đỉnh để tính toán rồi push kết quả trở lại.",
      "source": "Session 5, slides 18 and 20"
    },
    {
      "id": "bc-s5-q33",
      "prompt": "Ghép opcode với chức năng nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "PUSH1 đọc storage; SLOAD gọi contract; CALL hoàn tác state; REVERT ghi permanent storage."
        },
        {
          "id": "b",
          "text": "SSTORE chỉ sửa memory; DELEGATECALL luôn tạo contract mới; REVERT xóa bytecode."
        },
        {
          "id": "c",
          "text": "CALL chạy code của caller trong storage của callee; DELEGATECALL chạy code của callee trong storage của chính callee."
        },
        {
          "id": "d",
          "text": "PUSH1 đẩy hằng lên stack; SLOAD/SSTORE đọc-ghi storage; CALL gọi contract; REVERT hoàn tác state."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. `PUSH1` đưa một hằng số lên stack. `SLOAD` và `SSTORE` đọc/ghi persistent storage. `CALL` chuyển execution sang contract khác với context riêng của contract đó. `REVERT` kết thúc execution thất bại, rollback state changes và giữ lại phần gas chưa dùng. “Storage slot” là ô 256 bit trong contract storage, còn “rollback” là quay trạng thái về trước transaction/call bị lỗi.",
      "source": "Session 5, slide 21"
    },
    {
      "id": "bc-s5-q34",
      "prompt": "Điểm khác biệt quan trọng của `DELEGATECALL` so với `CALL` là gì?",
      "options": [
        {
          "id": "a",
          "text": "`DELEGATECALL` chạy code của target trong storage/context của caller."
        },
        {
          "id": "b",
          "text": "`DELEGATECALL` tạo một EOA tạm thời để ký internal transaction rồi tự hủy sau khi call xong."
        },
        {
          "id": "c",
          "text": "`DELEGATECALL` chỉ đọc codeHash của contract khác mà không thực thi code, nhờ vậy không tốn gas cho opcode."
        },
        {
          "id": "d",
          "text": "`DELEGATECALL` buộc callee dùng storage riêng và xóa `msg.sender`, nên an toàn hơn `CALL` cho mọi trường hợp."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. `DELEGATECALL` lấy code từ một target nhưng thực thi code đó trong storage context của caller. Đây là nền tảng của proxy upgradeability: proxy giữ state, implementation cung cấp logic. Tuy nhiên nó cũng là nguồn exploit nghiêm trọng vì code bên ngoài có thể sửa storage của caller. “Proxy” là contract đứng trước, giữ địa chỉ/state ổn định trong khi logic có thể được ủy quyền sang implementation khác.",
      "source": "Session 5, slide 21"
    },
    {
      "id": "bc-s5-q35",
      "prompt": "ABI trong bối cảnh gọi smart contract được hiểu đúng nhất là gì?",
      "options": [
        {
          "id": "a",
          "text": "Một consensus rule quyết định contract nào được phép nhận transaction type 2."
        },
        {
          "id": "b",
          "text": "Một bảng gas cost cho từng opcode, do compiler Solidity gắn vào bytecode."
        },
        {
          "id": "c",
          "text": "ABI quy định cách lời gọi hàm và kiểu dữ liệu được mã hóa thành raw calldata."
        },
        {
          "id": "d",
          "text": "Một Merkle proof gắn function selector với codeHash của contract để ngăn replay."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. ABI, Application Binary Interface, mô tả tên hàm, kiểu tham số, kiểu trả về và cách encode/decode bytes. Khi frontend gọi `transfer(address,uint256)`, ABI giúp tạo selector và arguments đúng định dạng. Etherscan cũng cần ABI để biến raw input data trở lại tên hàm và giá trị dễ đọc. ABI không phải bytecode và cũng không phải consensus rule; nó là hợp đồng giao tiếp giữa code và caller.",
      "source": "Session 5, slide 22"
    },
    {
      "id": "bc-s5-q36",
      "prompt": "Function selector của `transfer(address,uint256)` được tạo theo quy tắc nào?",
      "options": [
        {
          "id": "a",
          "text": "Lấy 4 byte cuối của transaction hash rồi XOR với contract address."
        },
        {
          "id": "b",
          "text": "Lấy 4 byte đầu của `keccak256(\"transfer(address,uint256)\")`."
        },
        {
          "id": "c",
          "text": "Lấy 4 byte đầu của public key của contract owner."
        },
        {
          "id": "d",
          "text": "Lấy 4 byte đầu của `stateRoot` rồi nối với ABI-encoded arguments."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Function selector là 4 byte đầu của Keccak-256 hash trên canonical function signature, tức tên hàm và kiểu tham số không có tên biến. Với `transfer(address,uint256)`, selector quen thuộc là `0xa9059cbb`. “Keccak-256” là họ hàm băm Ethereum sử dụng; 4 byte selector không chứa toàn bộ chữ ký hàm mà chỉ là một định danh ngắn để dispatcher so khớp.",
      "source": "Session 5, slide 22; Lab 5, Q6"
    },
    {
      "id": "bc-s5-q37",
      "prompt": "[Lab Q6] EVM và Etherscan sử dụng selector/ABI khác nhau như thế nào khi xử lý calldata?",
      "options": [
        {
          "id": "a",
          "text": "Dispatcher dùng 4 byte selector để chọn hàm; Etherscan dùng ABI để decode arguments."
        },
        {
          "id": "b",
          "text": "EVM cần toàn bộ ABI JSON mới có thể chạy bytecode; Etherscan chỉ cần selector nên không cần ABI."
        },
        {
          "id": "c",
          "text": "EVM dùng selector để kiểm tra chữ ký người gửi; Etherscan dùng ABI để tính `effectiveGasPrice`."
        },
        {
          "id": "d",
          "text": "Contract dispatcher đọc arguments trước rồi tự tạo selector; Etherscan chỉ hiển thị raw bytes vì ABI không thể decode calldata."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Solidity compiler tạo một “dispatcher” ở đầu runtime bytecode để đọc selector từ calldata và nhảy tới logic của hàm tương ứng. EVM thực chất chỉ chạy bytecode này, không tự hiểu tên hàm. Etherscan muốn hiển thị `transfer(to, amount)` phải có ABI để biết sau 4 byte selector, mỗi chunk byte đại diện cho kiểu nào như `address` hay `uint256`. “Decode” là chuyển bytes về giá trị có cấu trúc.",
      "source": "Lab 5, Q6; Session 5, slide 22"
    },
    {
      "id": "bc-s5-q38",
      "prompt": "So sánh `REVERT` với `INVALID/out-of-gas` theo slide, lựa chọn nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "Cả hai giữ nguyên state changes, nhưng REVERT trả tip còn INVALID burn tip."
        },
        {
          "id": "b",
          "text": "REVERT rollback state và tiêu hết gas; INVALID/out-of-gas rollback state nhưng trả phần gas còn lại."
        },
        {
          "id": "c",
          "text": "REVERT chỉ xảy ra khi block bị fork; INVALID/out-of-gas chỉ xảy ra trong `eth_call`."
        },
        {
          "id": "d",
          "text": "Cả hai rollback state; REVERT trả gas chưa dùng, còn INVALID/out-of-gas tiêu gas còn lại."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Cả hai đều làm execution thất bại và rollback state changes. Điểm khác trong slide là `REVERT` là failure có chủ đích, có thể trả error data và giữ phần gas chưa dùng; `INVALID` hoặc out-of-gas khiến phần gas còn lại bị tiêu. `REVERT` thường được tạo từ `require`/`revert` trong Solidity, trong khi invalid opcode hoặc cạn gas là lỗi execution nặng hơn.",
      "source": "Session 5, slide 23"
    },
    {
      "id": "bc-s5-q39",
      "prompt": "Một transaction on-chain bị thất bại khác `eth_call` ở điểm nào?",
      "options": [
        {
          "id": "a",
          "text": "Transaction thất bại bị xóa khỏi chain và không có receipt; `eth_call` được miner ghi vào block nhưng không thu phí."
        },
        {
          "id": "b",
          "text": "Cả hai đều thay đổi world state tạm thời rồi commit nếu caller chấp nhận kết quả."
        },
        {
          "id": "c",
          "text": "Failed transaction vẫn on-chain và tốn gas; `eth_call` chỉ mô phỏng, không commit state."
        },
        {
          "id": "d",
          "text": "`eth_call` luôn yêu cầu private key để ký, còn transaction thất bại không cần chữ ký vì không thay đổi state."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. Một transaction thật được đưa vào block vẫn chiếm computation và có receipt dù status là failed, nên người gửi trả gas đã dùng. `eth_call` là RPC method mô phỏng execution trên state hiện tại mà không broadcast transaction và không commit state. Vì không trở thành transaction on-chain nên nó không phải trả gas thật, dù client vẫn mô phỏng gas rules để tính execution.",
      "source": "Session 5, slide 23"
    },
    {
      "id": "bc-s5-q40",
      "prompt": "The Merge tháng 9/2022 thay đổi Ethereum theo mô tả nào?",
      "options": [
        {
          "id": "a",
          "text": "Ethereum chuyển PoW → PoS, giữ nguyên state và giảm năng lượng khoảng 99.95%."
        },
        {
          "id": "b",
          "text": "Ethereum chuyển từ PoS sang PoW và reset world state để loại bỏ các contract cũ."
        },
        {
          "id": "c",
          "text": "Ethereum thay EVM bằng WASM, đồng thời chuyển account model sang UTXO."
        },
        {
          "id": "d",
          "text": "Ethereum giữ PoW nhưng chỉ đổi fee mechanism từ legacy sang EIP-1559."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. The Merge thay consensus engine từ Proof of Work sang Proof of Stake mà không reset application state. “PoW” bảo vệ chain bằng computational work và điện năng; “PoS” dùng staked capital làm tài sản đảm bảo kinh tế. Slide nhấn mạnh quá trình chuyển diễn ra in flight, không downtime, state intact, và mức sử dụng năng lượng giảm khoảng 99.95%.",
      "source": "Session 5, slide 25"
    },
    {
      "id": "bc-s5-q41",
      "prompt": "Nhận định nào là một hiểu lầm về The Merge theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Security budget sau Merge dựa nhiều vào staked capital thay vì electricity."
        },
        {
          "id": "b",
          "text": "Merge diễn ra mà không cần xóa account, contract hoặc balance hiện có."
        },
        {
          "id": "c",
          "text": "The Merge tự nó làm transaction fee giảm mạnh."
        },
        {
          "id": "d",
          "text": "Ethereum ngừng dùng PoW làm cơ chế consensus chính sau Merge."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. Slide ghi rõ “The Merge did not cut fees”. Merge đổi cơ chế consensus, không trực tiếp mở rộng execution capacity đủ để làm phí giảm mạnh. “Scaling” là tăng khả năng xử lý/khả dụng dữ liệu để phục vụ nhiều giao dịch hơn; roadmap hiện tại đặt phần lớn scaling cho rollup/L2, với EIP-4844 và PeerDAS tăng data availability cho L2.",
      "source": "Session 5, slide 25"
    },
    {
      "id": "bc-s5-q42",
      "prompt": "Validator Ethereum trong mô hình PoS của Session 5 có vai trò và incentive nào?",
      "options": [
        {
          "id": "a",
          "text": "Stake 32 ETH chỉ để nhận base fee; validator không attest và cũng không bị penalty khi offline."
        },
        {
          "id": "b",
          "text": "Stake 32 ETH; validator propose/attest, nhận reward và chịu penalty hoặc slashing khi vi phạm."
        },
        {
          "id": "c",
          "text": "Stake tùy ý dưới 1 ETH để có quyền mine nonce; ai có nhiều GPU hơn sẽ propose nhiều block hơn."
        },
        {
          "id": "d",
          "text": "Validator chỉ ký transaction của user; việc chọn block vẫn do miner PoW thực hiện sau Merge."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Slide dùng mốc 32 ETH để chạy một validator. Validator có thể được chọn làm proposer và thường xuyên gửi `attestation`, tức phiếu xác nhận về chain/head/checkpoint. “Liveness reward/penalty” khuyến khích online đúng lúc; “slashing” là hình phạt nặng cho hành vi có bằng chứng mâu thuẫn hoặc gian lận, có thể dẫn đến mất stake và forced exit.",
      "source": "Session 5, slide 26"
    },
    {
      "id": "bc-s5-q43",
      "prompt": "BLS signatures giúp Ethereum PoS xử lý số lượng validator lớn chủ yếu bằng cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Cho phép validator dùng cùng một private key chung để giảm số chữ ký cần quản lý."
        },
        {
          "id": "b",
          "text": "Biến mọi attestation thành một Merkle proof nên không cần chữ ký số nữa."
        },
        {
          "id": "c",
          "text": "Thay thế staking bằng zero-knowledge proof để validator không cần online."
        },
        {
          "id": "d",
          "text": "BLS aggregate nhiều chữ ký, giúp xử lý lượng lớn attestation hiệu quả hơn."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. BLS signature có tính chất aggregation: nhiều chữ ký từ nhiều validator có thể được gộp để giảm overhead khi truyền và kiểm tra. “Aggregation” không có nghĩa các validator dùng chung private key; mỗi validator vẫn có key riêng. Nó chỉ giúp biểu diễn nhiều attestations hiệu quả hơn, điều rất quan trọng khi mạng có lượng validator rất lớn.",
      "source": "Session 5, slide 26"
    },
    {
      "id": "bc-s5-q44",
      "prompt": "Cấu trúc thời gian của Ethereum PoS trong slide là gì?",
      "options": [
        {
          "id": "a",
          "text": "Một slot dài 12 giây; một epoch gồm 32 slot, xấp xỉ 6.4 phút."
        },
        {
          "id": "b",
          "text": "Một slot dài 32 giây; một epoch gồm 12 slot, xấp xỉ 6.4 phút."
        },
        {
          "id": "c",
          "text": "Một slot dài 10 phút như Bitcoin; epoch chỉ kết thúc khi đủ 32 block."
        },
        {
          "id": "d",
          "text": "Slot không có độ dài cố định; epoch luôn đúng 13 phút bất kể có block hay không."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. `slot` là đơn vị thời gian 12 giây, trong đó có tối đa một block được đề xuất. `epoch` gồm 32 slot, nên kéo dài khoảng 384 giây, tức 6.4 phút. Ethereum PoS vận hành theo clock, khác với PoW nơi block xuất hiện khi ai đó tình cờ tìm được proof hợp lệ. Một slot có thể bị bỏ trống nếu proposer không tạo block đúng lúc.",
      "source": "Session 5, slide 27"
    },
    {
      "id": "bc-s5-q45",
      "prompt": "Trong mỗi slot, proposer và attesters được tổ chức theo cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Tất cả validator cùng propose một block, sau đó block có nhiều gas nhất thắng."
        },
        {
          "id": "b",
          "text": "Một proposer do RANDAO chọn; các committee attesters gửi phiếu xác nhận."
        },
        {
          "id": "c",
          "text": "Proposer là validator có stake lớn nhất; attesters là các EOA trả priority fee cao nhất."
        },
        {
          "id": "d",
          "text": "RANDAO chọn transaction chứ không chọn proposer; proposer được chọn bằng hashrate."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. RANDAO là nguồn randomness mà các validator cùng đóng góp, được dùng trong cơ chế chọn proposer/committee. “Proposer” là validator có nhiệm vụ đề xuất block cho slot. “Attesters” là validator trong các committee gửi attestation, tức phiếu xác nhận về block/head/checkpoint. Việc phân vai ngẫu nhiên giúp giảm khả năng một bên biết và kiểm soát trước lịch duty dài hạn.",
      "source": "Session 5, slide 27"
    },
    {
      "id": "bc-s5-q46",
      "prompt": "Điểm khác nhau trực giác giữa thời gian block của Bitcoin PoW và Ethereum PoS là gì?",
      "options": [
        {
          "id": "a",
          "text": "Bitcoin cũng có slot clock 12 giây, nhưng cứ 50 slot mới được phép tạo một block."
        },
        {
          "id": "b",
          "text": "Ethereum block xuất hiện ngẫu nhiên khi validator tìm hash dưới target, còn Bitcoin dùng clock cố định."
        },
        {
          "id": "c",
          "text": "Cả hai đều dùng epoch 32 slot nhưng Bitcoin không có attestation."
        },
        {
          "id": "d",
          "text": "Bitcoin block timing ngẫu nhiên theo PoW; Ethereum PoS dùng slot clock cố định."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Trong PoW, mỗi hash giống một vé xổ số nên thời điểm tìm được block không cố định, chỉ có kỳ vọng trung bình. Trong Ethereum PoS, protocol định nghĩa slot đều đặn 12 giây và chọn proposer cho từng slot. “Clocked protocol” vì vậy cho cấu trúc thời gian dự đoán được hơn, dù không phải slot nào cũng có block.",
      "source": "Session 5, slide 27"
    },
    {
      "id": "bc-s5-q47",
      "prompt": "Casper FFG mô tả quá trình justification/finalization của checkpoint như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Checkpoint có trên 50% số validator sẽ finalized ngay; checkpoint sau không ảnh hưởng checkpoint trước."
        },
        {
          "id": "b",
          "text": "Checkpoint chỉ cần proposer ký; attestation chủ yếu dùng cho gas accounting."
        },
        {
          "id": "c",
          "text": "≥2/3 stake vote → justified; checkpoint sau justified → checkpoint trước finalized."
        },
        {
          "id": "d",
          "text": "Checkpoint finalized khi tồn tại 6 block phía sau, giống quy tắc 6 confirmations của Bitcoin."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. Casper FFG, Friendly Finality Gadget, dùng checkpoint ở ranh giới epoch. “Justified” nghĩa checkpoint đã nhận mức hỗ trợ đủ mạnh, khoảng ≥2/3 stake. Khi checkpoint sau cũng được justified theo quan hệ đúng, checkpoint trước được finalized. “Finalized” là trạng thái rất khó đảo về mặt kinh tế, khác với confirmation mang tính xác suất trong Nakamoto consensus.",
      "source": "Session 5, slide 29"
    },
    {
      "id": "bc-s5-q48",
      "prompt": "Vì sao finality của Ethereum PoS được gọi là “economic finality”?",
      "options": [
        {
          "id": "a",
          "text": "Đảo finalized checkpoint cần khoảng ≥1/3 stake tham gia hành vi slashable."
        },
        {
          "id": "b",
          "text": "Vì finalized block luôn chứa đủ phí để bồi thường cho mọi user nếu chain reorg."
        },
        {
          "id": "c",
          "text": "Vì proposer phải burn toàn bộ tip của hai epoch trước khi block được finalized."
        },
        {
          "id": "d",
          "text": "Vì finality chỉ phụ thuộc giá ETH trên thị trường, không phụ thuộc attestation hoặc stake."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Finality không phải phép toán khiến đảo chain tuyệt đối bất khả thi; thay vào đó, protocol làm cho việc đảo finalized history cần lượng stake lớn ký các thông điệp mâu thuẫn có thể chứng minh được và bị slash. “Economic finality” nghĩa chi phí kinh tế của việc phá finality trở nên rất lớn. Slide đối chiếu điều này với Bitcoin “6 confirmations”, vốn là probabilistic finality.",
      "source": "Session 5, slide 29"
    },
    {
      "id": "bc-s5-q49",
      "prompt": "LMD-GHOST được dùng cho quyết định nào trong Ethereum PoS?",
      "options": [
        {
          "id": "a",
          "text": "Tính base fee của block tiếp theo từ latest gas-used messages."
        },
        {
          "id": "b",
          "text": "Chọn chain head theo trọng lượng của latest attestations."
        },
        {
          "id": "c",
          "text": "Chọn validator bị slashing dựa trên số block đã propose trong một epoch."
        },
        {
          "id": "d",
          "text": "Tính RANDAO seed bằng cách chọn branch có transaction fee cao nhất."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. LMD-GHOST là fork-choice rule: giữa các checkpoint đã finalized, node cần biết head nào để tiếp tục xây. “LMD” là Latest Message Driven, dùng thông điệp attestation mới nhất của validator; “GHOST” là Greedy Heaviest Observed SubTree, trực giác là đi theo nhánh có trọng lượng attestation lớn nhất. Casper FFG lo finality theo epoch, còn LMD-GHOST chọn head theo slot.",
      "source": "Session 5, slide 30"
    },
    {
      "id": "bc-s5-q50",
      "prompt": "Mối quan hệ giữa LMD-GHOST và Casper FFG được mô tả đúng nhất thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Hai cơ chế thay phiên nhau: epoch chẵn dùng LMD-GHOST, epoch lẻ dùng Casper FFG."
        },
        {
          "id": "b",
          "text": "LMD-GHOST quyết định gas market; Casper FFG quyết định validator reward."
        },
        {
          "id": "c",
          "text": "Casper FFG chọn transaction trong block; LMD-GHOST chỉ xác minh chữ ký BLS."
        },
        {
          "id": "d",
          "text": "LMD-GHOST chọn head theo slot; Casper FFG finalize checkpoint theo epoch."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. Hai cơ chế giải quyết hai lớp quyết định bổ trợ nhau. LMD-GHOST trả lời “nhánh nào là head hiện tại để xây tiếp?”, còn Casper FFG trả lời “checkpoint nào đã đạt finality kinh tế?”. “Fork choice” và “finality gadget” vì thế không phải hai consensus độc lập cạnh tranh nhau mà là hai phần của Ethereum PoS consensus.",
      "source": "Session 5, slide 30"
    },
    {
      "id": "bc-s5-q51",
      "prompt": "Hai loại hành vi slashable được Session 5 nêu trực tiếp là gì?",
      "options": [
        {
          "id": "a",
          "text": "Offline hai slot liên tiếp và bỏ lỡ một attestation trong epoch."
        },
        {
          "id": "b",
          "text": "Gửi priority fee quá thấp và propose block ít transaction hơn target."
        },
        {
          "id": "c",
          "text": "Double proposal cho cùng slot và double/surround vote bằng các attestation mâu thuẫn."
        },
        {
          "id": "d",
          "text": "Dùng cùng withdrawal address cho hai validator và thay đổi fee recipient giữa các slot."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. `Double proposal` là ký hai block khác nhau cho cùng slot. `Double vote` và `surround vote` là các dạng attestation mâu thuẫn vi phạm điều kiện an toàn của Casper. Vì chữ ký là bằng chứng mật mã không thể chối bỏ, protocol có thể chứng minh validator đã ký thông điệp xung đột. Offline thông thường bị inactivity penalty chứ không tự động là slashing offense.",
      "source": "Session 5, slide 31"
    },
    {
      "id": "bc-s5-q52",
      "prompt": "Hậu quả slashing được mô tả như thế nào trong slide?",
      "options": [
        {
          "id": "a",
          "text": "Có thể mất ≥1 ETH tới toàn bộ stake; phạt nặng hơn khi nhiều validator bị slash, kèm forced exit."
        },
        {
          "id": "b",
          "text": "Validator chỉ mất priority fee của một block; stake gốc không bị ảnh hưởng để tránh centralization."
        },
        {
          "id": "c",
          "text": "Validator bị khóa 12 giây rồi quay lại duty ngay; slashing không ảnh hưởng balance."
        },
        {
          "id": "d",
          "text": "Validator mất đúng 32 ETH trong mọi trường hợp, bất kể mức độ hoặc số validator cùng vi phạm."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Slide nhấn mạnh slashing không phải mức phạt cố định duy nhất: thiệt hại có thể từ ít nhất khoảng 1 ETH tới toàn bộ stake, và correlation penalty làm hậu quả nặng hơn nếu nhiều validator bị slash gần nhau. `Forced exit` nghĩa validator bị loại khỏi tập active validators. Thiết kế này khiến hành vi phối hợp tấn công quy mô lớn đắt hơn lỗi đơn lẻ.",
      "source": "Session 5, slide 31"
    },
    {
      "id": "bc-s5-q53",
      "prompt": "Ghép upgrade với thay đổi nào đúng theo timeline Session 5?",
      "options": [
        {
          "id": "a",
          "text": "Shapella: EIP-1559; Dencun: staking withdrawals; Pectra: The Merge; Fusaka: account abstraction hoàn chỉnh."
        },
        {
          "id": "b",
          "text": "Shapella: staking withdrawals; Dencun: EIP-4844 blobs; Pectra: EIP-7702/EIP-7251; Fusaka: PeerDAS."
        },
        {
          "id": "c",
          "text": "Shapella: PoW→PoS; Dencun: BLS aggregation; Pectra: SegWit; Fusaka: Taproot."
        },
        {
          "id": "d",
          "text": "Shapella: LMD-GHOST; Dencun: Casper FFG; Pectra: RANDAO; Fusaka: slashing."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Timeline slide 32 ghi: The Merge Sep 2022 chuyển PoW→PoS; Shapella Apr 2023 mở staking withdrawals; Dencun Mar 2024 có EIP-4844 blobs; Pectra May 2025 có EIP-7702 code delegation và EIP-7251 tăng max effective balance lên 2048 ETH; Fusaka Dec 2025 đưa PeerDAS và nhiều blob hơn. Đây là timeline theo tài liệu Session 5, không phải danh sách mọi EIP của từng upgrade.",
      "source": "Session 5, slide 32"
    },
    {
      "id": "bc-s5-q54",
      "prompt": "EIP-4844 và PeerDAS nằm trong hướng scaling nào của roadmap?",
      "options": [
        {
          "id": "a",
          "text": "Tăng trực tiếp số opcode EVM có thể chạy trong một transaction L1."
        },
        {
          "id": "b",
          "text": "Thay account model bằng UTXO để state nhỏ hơn và block propagate nhanh hơn."
        },
        {
          "id": "c",
          "text": "Giảm số validator để mỗi block cần ít attestation hơn."
        },
        {
          "id": "d",
          "text": "Tăng data availability cho rollups, không chủ yếu tăng L1 execution."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. EIP-4844 đưa blob data vào Ethereum để rollup đăng dữ liệu rẻ hơn; PeerDAS, Peer Data Availability Sampling, tiếp tục hướng này bằng cách cho node lấy mẫu thay vì mỗi node tải toàn bộ blob data. Slide gọi đây là track “Surge”: scale data for rollups, not L1 execution. “Rollup” thực thi nhiều transaction ở L2 rồi cam kết/dữ liệu hóa kết quả về L1.",
      "source": "Session 5, slides 32-33"
    },
    {
      "id": "bc-s5-q55",
      "prompt": "EIP-7702 trong Pectra được Session 5 liên hệ với khả năng nào?",
      "options": [
        {
          "id": "a",
          "text": "Validator có thể gộp nhiều BLS signature thành một transaction để giảm stake tối thiểu."
        },
        {
          "id": "b",
          "text": "Contract account có thể biến thành EOA và ký transaction bằng codeHash thay cho private key."
        },
        {
          "id": "c",
          "text": "EOA có thể ủy quyền code tạm thời, hỗ trợ batching, sponsored gas và account abstraction."
        },
        {
          "id": "d",
          "text": "Rollup có thể ghi blob trực tiếp vào storageRoot của EOA mà không đi qua block data."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. EIP-7702 cho phép EOA thiết lập code delegation theo cách giúp nó có một số hành vi “smart account” mà không biến vĩnh viễn thành contract account. Slide liên hệ điều này với `batching` nhiều hành động, `sponsored gas` cho phép bên khác trả gas, và account abstraction. “Account abstraction” là hướng làm tài khoản người dùng linh hoạt hơn mô hình EOA ký một transaction đơn giản bằng private key truyền thống.",
      "source": "Session 5, slide 33"
    },
    {
      "id": "bc-s5-q56",
      "prompt": "EIP-7251 trong Pectra thay đổi thông số validator nào theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Tăng maximum effective balance lên 2048 ETH."
        },
        {
          "id": "b",
          "text": "Giảm minimum staking balance xuống 2 ETH cho mọi validator."
        },
        {
          "id": "c",
          "text": "Tăng epoch từ 32 lên 2048 slot."
        },
        {
          "id": "d",
          "text": "Giảm slashing threshold từ 1/3 xuống 1/2048 stake."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Slide timeline ghi EIP-7251 tăng `max balance` hay maximum effective balance lên 2048 ETH. “Effective balance” là lượng stake được protocol tính vào sức nặng/reward của validator theo quy tắc consensus, không đơn giản là mọi ETH nằm trong withdrawal address. Việc tăng trần giúp các operator lớn hợp nhất stake vào ít validator hơn thay vì phải chia thành rất nhiều validator 32 ETH.",
      "source": "Session 5, slide 32"
    },
    {
      "id": "bc-s5-q57",
      "prompt": "Cách đọc các tên roadmap kiểu “Surge / Verge / Purge / Splurge” theo Session 5 nên là gì?",
      "options": [
        {
          "id": "a",
          "text": "Đó là bốn hard fork bắt buộc diễn ra tuần tự và không thể có công việc chồng lấn."
        },
        {
          "id": "b",
          "text": "Tên roadmap chỉ là nhãn định hướng; mục tiêu kỹ thuật thực tế mới là phần cần nhớ."
        },
        {
          "id": "c",
          "text": "Đó là bốn consensus algorithm và mỗi validator chỉ chạy một thuật toán theo khu vực địa lý."
        },
        {
          "id": "d",
          "text": "Đó là bốn transaction type mới thay thế type 0-3 sau Pectra."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Slide nhấn mạnh “names optional, direction real”. Các tên như Surge/Verge/Purge/Splurge là cách Vitalik và cộng đồng nhóm các hướng nghiên cứu/nâng cấp, không nhất thiết là các phase cứng tách biệt tuyệt đối. Khi học nên nhớ vấn đề kỹ thuật cụ thể, ví dụ Surge tập trung data scaling cho rollups, thay vì chỉ học thuộc tên marketing của roadmap.",
      "source": "Session 5, slide 33"
    },
    {
      "id": "bc-s5-q58",
      "prompt": "MEV, Maximal Extractable Value, phát sinh từ quyền lực nào trong quá trình tạo block?",
      "options": [
        {
          "id": "a",
          "text": "Quyền của EOA được tạo nhiều private key và chia transaction thành nhiều nonce."
        },
        {
          "id": "b",
          "text": "Quyền của smart contract thay đổi `stateRoot` sau khi block đã finalized."
        },
        {
          "id": "c",
          "text": "Quyền của attester tăng hoặc giảm `baseFee` bằng cách chọn mức tip trung vị."
        },
        {
          "id": "d",
          "text": "Quyền chọn và sắp xếp transaction trong block có thể tạo lợi nhuận."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. MEV là giá trị có thể trích xuất nhờ quyền kiểm soát ordering và inclusion của transaction. “Ordering” là thứ tự transaction trong block; “inclusion” là quyết định transaction nào được đưa vào. Vì smart contract state phụ thuộc thứ tự execution, thay đổi thứ tự có thể tạo lợi nhuận từ arbitrage, liquidation hay sandwich mà không cần thay đổi code của victim.",
      "source": "Session 5, slide 34"
    },
    {
      "id": "bc-s5-q59",
      "prompt": "Một sandwich attack điển hình quanh giao dịch swap của nạn nhân diễn ra theo thứ tự nào?",
      "options": [
        {
          "id": "a",
          "text": "Mua trước victim swap, để swap đẩy giá, rồi bán ngay sau giao dịch đó."
        },
        {
          "id": "b",
          "text": "Searcher bán trước nạn nhân, đợi một epoch để checkpoint finalized rồi mua lại ở chain khác."
        },
        {
          "id": "c",
          "text": "Searcher chỉ quan sát hai DEX khác giá và giao dịch giữa chúng, không phụ thuộc transaction cụ thể của nạn nhân."
        },
        {
          "id": "d",
          "text": "Searcher cố ý làm validator bị slash, sau đó nhận liquidation reward từ staking contract."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. Sandwich gồm front-run và back-run quanh victim transaction. Searcher mua trước để đẩy giá, victim swap ở mức giá xấu hơn do slippage, rồi searcher bán sau để chốt lợi nhuận. “Front-running” là đặt transaction trước một transaction đã quan sát; “back-running” là đặt transaction ngay sau. Cơ chế này tận dụng public mempool và khả năng kiểm soát thứ tự trong block.",
      "source": "Session 5, slide 34"
    },
    {
      "id": "bc-s5-q60",
      "prompt": "Phân biệt arbitrage và liquidation trong MEV như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Arbitrage luôn cần victim swap; liquidation chỉ cần hai DEX có giá khác nhau."
        },
        {
          "id": "b",
          "text": "Arbitrage là đổi ordering để giảm base fee; liquidation là burn collateral để tăng ETH supply."
        },
        {
          "id": "c",
          "text": "Arbitrage khai thác chênh giá; liquidation tranh bonus từ vị thế thiếu collateral."
        },
        {
          "id": "d",
          "text": "Hai chiến lược là cùng một việc, chỉ khác tên giữa CEX và DEX."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. `Arbitrage` mua nơi rẻ và bán nơi đắt để kéo giá về gần nhau. `Liquidation` xảy ra trong lending protocol khi collateral của borrower không còn đủ theo ngưỡng, cho phép bên khác trả nợ thay và nhận collateral/bonus. Cả hai có thể tạo MEV vì searcher cạnh tranh để transaction của mình được thực thi ở vị trí có lợi trong block.",
      "source": "Session 5, slide 34"
    },
    {
      "id": "bc-s5-q61",
      "prompt": "Tại sao public mempool được ví như “dark forest” trong Session 5?",
      "options": [
        {
          "id": "a",
          "text": "Vì pending transaction được mã hóa, chỉ bot có GPU mạnh mới giải mã trước validator."
        },
        {
          "id": "b",
          "text": "Bot quan sát và simulate pending transaction rồi front-run trước khi nó vào block."
        },
        {
          "id": "c",
          "text": "Vì mempool chỉ tồn tại trong dark mode của client và không thể truy cập qua RPC công khai."
        },
        {
          "id": "d",
          "text": "Vì transaction trong mempool đã finalized nhưng chưa có receipt, tạo cơ hội double-spend giống Bitcoin."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Public mempool là nơi các transaction chưa được đưa vào block có thể được node/searcher quan sát. Bot có thể `simulate`, tức chạy thử transaction trên state gần hiện tại, để dự đoán tác động của nó rồi tạo giao dịch front-run, back-run hoặc arbitrage. Hình ảnh “dark forest” nhấn mạnh môi trường đối kháng: một transaction lộ ra có thể ngay lập tức bị các searcher theo dõi và khai thác.",
      "source": "Session 5, slide 35"
    },
    {
      "id": "bc-s5-q62",
      "prompt": "PBS/mev-boost tách vai trò builder và proposer theo cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Proposer xây mọi block; builder chỉ ký attestation sau khi block được finalized."
        },
        {
          "id": "b",
          "text": "Builder chọn validator có stake cao nhất; proposer chỉ phát base fee cho validator đó."
        },
        {
          "id": "c",
          "text": "Proposer gửi mempool riêng cho từng user; builder chỉ kiểm tra chữ ký ECDSA của EOA."
        },
        {
          "id": "d",
          "text": "Builder tối ưu block; proposer chọn block hoặc bid để đề xuất."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đáp án D. PBS là Proposer-Builder Separation. `Builder` chuyên tìm cách xây block có giá trị cao từ transaction/orderflow; `proposer` là validator có quyền đề xuất block cho slot và có thể chọn bid có lợi nhất thông qua relay/mev-boost. “Separation of powers” làm giảm nhu cầu mỗi validator tự chạy hạ tầng search/build phức tạp, dù nó cũng tạo các câu hỏi mới về relay/builder concentration.",
      "source": "Session 5, slide 35"
    },
    {
      "id": "bc-s5-q63",
      "prompt": "Biện pháp nào phù hợp nhất với nhóm “protecting users from MEV” trong slide?",
      "options": [
        {
          "id": "a",
          "text": "Dùng private RPC, slippage limit, hoặc batch auction/intents."
        },
        {
          "id": "b",
          "text": "Luôn đặt slippage = vô hạn và maxFee rất cao để transaction chắc chắn đứng đầu block."
        },
        {
          "id": "c",
          "text": "Gửi private key cho builder để builder có thể ký lại transaction với thứ tự tối ưu hơn."
        },
        {
          "id": "d",
          "text": "Tắt `chainId` trong chữ ký để transaction có thể chuyển sang chain ít MEV hơn nếu cần."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đáp án A. `Private RPC` tránh broadcast trực tiếp transaction vào public mempool. `Slippage limit` đặt ngưỡng chênh lệch giá tối đa người dùng chấp nhận, giới hạn số lợi nhuận sandwich có thể lấy. `Batch auction/intents` cố tìm giá hoặc ghép giao dịch theo một cơ chế ít phụ thuộc race ordering hơn. Đây là các cách giảm exposure MEV, không phải bảo đảm loại bỏ mọi MEV.",
      "source": "Session 5, slide 36"
    },
    {
      "id": "bc-s5-q64",
      "prompt": "Private RPC như Flashbots Protect giảm rủi ro front-running theo cơ chế nào?",
      "options": [
        {
          "id": "a",
          "text": "Nó mã hóa private key bằng BLS và gửi key thẳng cho proposer để transaction được ưu tiên."
        },
        {
          "id": "b",
          "text": "Nó làm base fee bằng 0 nên bot không có động lực cạnh tranh ordering."
        },
        {
          "id": "c",
          "text": "Tránh broadcast vào public mempool nên searcher khó quan sát và front-run."
        },
        {
          "id": "d",
          "text": "Nó buộc mọi validator phải dùng cùng transaction order đã ký sẵn bởi người dùng."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đáp án C. Private RPC thay đổi đường truyền transaction: thay vì broadcast rộng vào public mempool, transaction được gửi qua một kênh riêng tới builder/relay phù hợp. Điều này giảm khả năng searcher công khai nhìn thấy transaction và front-run. Tuy nhiên “private” ở đây nói về orderflow path, không có nghĩa transaction cuối cùng biến mất khỏi blockchain; sau khi được đưa vào block, dữ liệu on-chain vẫn công khai.",
      "source": "Session 5, slide 36"
    },
    {
      "id": "bc-s5-q65",
      "prompt": "Batch auction hoặc intent-based trading như ví dụ CoW Swap cố giảm MEV bằng ý tưởng nào?",
      "options": [
        {
          "id": "a",
          "text": "Ép mọi user tự chọn chính xác transaction order và ký cả block trước khi gửi swap."
        },
        {
          "id": "b",
          "text": "Ghép giao dịch hoặc tìm giá ngoài cuộc đua strict ordering, giảm lợi thế chen trước-sau."
        },
        {
          "id": "c",
          "text": "Chuyển swap thành transaction type 3 blob để EVM không nhìn thấy giá tài sản."
        },
        {
          "id": "d",
          "text": "Đặt mọi swap vào contract storage vĩnh viễn trước một epoch rồi validator mới được đọc calldata."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đáp án B. Batch auction gom nhiều order rồi xác định cách khớp/giá theo một batch, thay vì để mỗi transaction cạnh tranh vị trí từng mili-giây trong mempool. `Intent` mô tả kết quả người dùng muốn, ví dụ “đổi X lấy ít nhất Y”, còn solver tìm cách thực hiện. Bằng cách giảm vai trò của strict ordering race, mô hình này có thể giảm một số dạng sandwich/front-running truyền thống.",
      "source": "Session 5, slide 36"
    }
  ]
};
