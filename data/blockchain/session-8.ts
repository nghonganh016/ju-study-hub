import type { Chapter } from "@/types/quiz";

export const session8: Chapter = {
  id: "session-8",
  title: "Session 8 — Smart Contract Security",
  description:
    "Smart contract security: vulnerability classes, reentrancy, access control, oracle manipulation, secure-development lifecycle, Slither, bridge incidents, and Lab 8.",
  revision: 0,
  questions: [
    {
      id: "bc-s8-q01",
      prompt: "Điểm nào làm smart contract security khác đáng kể so với bảo mật ứng dụng web truyền thống?",
      options: [
        { id: "a", text: "Smart contract chỉ được admin gọi nên attack surface nhỏ hơn đáng kể so với web app." },
        { id: "b", text: "Bug có thể tác động trực tiếp tới tài sản on-chain, trong khi code đã deploy thường khó sửa tại chỗ." },
        { id: "c", text: "Blockchain tự kiểm tra logic nghiệp vụ nên developer chủ yếu cần quan tâm tới hiệu năng." },
        { id: "d", text: "Bug chủ yếu làm giao diện bị lỗi, còn tài sản luôn được blockchain tự động hoàn lại." },
      ],
      correctOptionId: "b",
      explanation:
        "Đáp án đúng nhấn mạnh hai đặc điểm của smart contract: code có thể trực tiếp kiểm soát tài sản và tính bất biến tương đối sau khi deploy. 'On-chain' nghĩa là trạng thái và tài sản được quản lý trên blockchain. Vì contract công khai và có thể được gọi bởi người lạ hoặc contract khác, một lỗi logic có thể chuyển thành mất tiền chứ không chỉ là crash. Blockchain xác thực việc thực thi theo code, nhưng không tự biết code đó có đúng ý định kinh doanh hay không.",
      source: "Session 8, slides 4–5",
    },
    {
      id: "bc-s8-q02",
      prompt: "Khi áp dụng attacker’s mindset để review một hàm Solidity, nhóm câu hỏi nào phù hợp nhất?",
      options: [
        { id: "a", text: "Gas hiện tại có rẻ không, token có tăng giá không, frontend có responsive không và explorer có hiển thị đẹp không?" },
        { id: "b", text: "Hàm có comment đầy đủ không, tên biến có dễ đọc không, IDE nào đang dùng và compile mất bao lâu?" },
        { id: "c", text: "Contract có bao nhiêu dòng code, repository có nhiều star không, deployer dùng ví nào và RPC có nhanh không?" },
        { id: "d", text: "Ai được gọi hàm, có thể re-enter không, input cực đoan ra sao, contract đang tin vào thành phần nào và có thể bị DoS không?" },
      ],
      correctOptionId: "d",
      explanation:
        "Security review theo hướng đối kháng tập trung vào quyền truy cập, reentrancy, input biên, trust assumptions và khả năng gây denial of service. 'Trust assumption' là giả định rằng một thành phần bên ngoài, như oracle hay contract khác, sẽ hành xử đúng. 'DoS' là denial of service, tức làm một chức năng không còn dùng được cho người khác. Những tiêu chí như style hay IDE có thể hữu ích cho phát triển nhưng không thay thế threat-oriented review.",
      source: "Session 8, slide 7",
    },
    {
      id: "bc-s8-q03",
      prompt: "Một hàm nhận `address target` rồi thực hiện external call tới `target`. Giả định an toàn nhất khi review là gì?",
      options: [
        { id: "a", text: "Coi `target` là hostile cho tới khi có lý do rõ ràng để tin tưởng." },
        { id: "b", text: "Coi `target` là trusted nếu địa chỉ đó là contract thay vì EOA." },
        { id: "c", text: "Coi `target` là safe nếu external call chỉ chuyển một lượng ETH nhỏ." },
        { id: "d", text: "Coi `target` là trusted nếu contract đã tồn tại nhiều block mà chưa bị báo lỗi." },
      ],
      correctOptionId: "a",
      explanation:
        "Trong adversarial reading, external address nên được xem là có thể độc hại. 'Hostile' nghĩa là đối tượng có thể cố tình revert, re-enter, trả dữ liệu bất thường hoặc khai thác timing/state của caller. Việc một địa chỉ là contract, tồn tại lâu hay chỉ nhận ít ETH không chứng minh nó an toàn. Đây là lý do external calls luôn cần được xem như một trust boundary.",
      source: "Session 8, slide 7",
    },
    {
      id: "bc-s8-q04",
      prompt: "Vì sao flash loan làm threat model của DeFi trở nên khó hơn?",
      options: [
        { id: "a", text: "Flash loan cho phép transaction bỏ qua mọi kiểm tra collateral của protocol bị tấn công." },
        { id: "b", text: "Attacker có thể dùng flash loan để thay đổi private key của oracle trong cùng một transaction." },
        { id: "c", text: "Flash loan làm validator không thể thấy transaction cho tới khi block đã final." },
        { id: "d", text: "Attacker có thể huy động vốn rất lớn trong một transaction để thao túng trạng thái rồi hoàn trả." },
      ],
      correctOptionId: "d",
      explanation:
        "Flash loan là khoản vay phải được hoàn trả trong cùng transaction; nếu không, toàn bộ transaction revert. Điều nguy hiểm là attacker có thể dùng nguồn vốn lớn để làm lệch giá trong một pool, kích hoạt logic vay/thanh lý sai rồi hoàn trả khoản vay atomically. 'Atomic' nghĩa là toàn bộ chuỗi hành động cùng thành công hoặc cùng bị revert. Flash loan không tự phá private key hay bỏ qua mọi rule của protocol; nó khuếch đại sức mạnh kinh tế của attacker.",
      source: "Session 8, slides 5 and 18",
    },
    {
      id: "bc-s8-q05",
      prompt: "Cụm “public + composable” làm tăng attack surface của smart contract theo cách nào?",
      options: [
        { id: "a", text: "Mỗi contract chỉ có thể được gọi qua frontend chính thức nhưng frontend có thể ghép nhiều giao diện với nhau." },
        { id: "b", text: "Composability buộc mọi contract dùng chung storage nên một lỗi ở contract này tự động sửa state contract khác." },
        { id: "c", text: "Bất kỳ địa chỉ nào có thể gọi hàm công khai và contract khác có thể gọi vào giữa cùng một transaction." },
        { id: "d", text: "Public contract luôn cho phép sửa bytecode, còn composability chỉ liên quan tới việc chia sẻ source code." },
      ],
      correctOptionId: "c",
      explanation:
        "Public nghĩa là giao diện on-chain có thể được gọi trực tiếp, không phụ thuộc frontend chính thức. Composability nghĩa là các contract có thể kết hợp và gọi lẫn nhau trong cùng transaction. Chính khả năng gọi chéo này tạo ra nhiều interaction phức tạp, bao gồm reentrancy. Nó không có nghĩa là contract dùng chung storage hay có thể sửa bytecode của nhau.",
      source: "Session 8, slide 5",
    },
    {
      id: "bc-s8-q06",
      prompt: "Trong vulnerable `withdraw()`, lỗi cốt lõi là gọi `msg.sender.call{value: bal}(\"\")` trước `balances[msg.sender] = 0`. Vấn đề chính là gì?",
      options: [
        { id: "a", text: "Hàm sử dụng biến local `bal` thay vì đọc `balances[msg.sender]` lần thứ hai." },
        { id: "b", text: "Low-level call luôn tự động nhân đôi ETH nếu caller là một smart contract." },
        { id: "c", text: "External interaction xảy ra trước khi effect lên state được ghi nhận." },
        { id: "d", text: "Lệnh `require(bal > 0)` chạy trước external call nên attacker biết trước điều kiện kiểm tra." },
      ],
      correctOptionId: "c",
      explanation:
        "Đây là lỗi ordering: interaction với bên ngoài xảy ra trước effect, tức trước khi balance được đặt về 0. 'Effect' trong CEI là cập nhật state nội bộ của contract; 'interaction' là lời gọi ra ngoài. Khi external contract nhận quyền thực thi trước state update, nó có thể gọi ngược lại và quan sát state cũ. Biến local `bal` không phải nguyên nhân cốt lõi.",
      source: "Session 8, slide 9",
    },
    {
      id: "bc-s8-q07",
      prompt: "Tại sao `.call{value: bal}(\"\")` có thể mở cửa cho reentrancy?",
      options: [
        { id: "a", text: "Nó luôn đổi `msg.sender` thành owner của contract nhận trước khi gửi ETH." },
        { id: "b", text: "Nó tự động gọi lại đúng hàm `withdraw()` của caller sau khi chuyển ETH." },
        { id: "c", text: "Nó ghi trực tiếp vào storage của recipient nên recipient có thể sửa storage của caller." },
        { id: "d", text: "Nó trao quyền thực thi cho recipient trước khi caller hoàn tất, nên callback có thể re-enter." },
      ],
      correctOptionId: "d",
      explanation:
        "Khi gửi ETH bằng low-level `call`, code của recipient có thể được thực thi qua `receive()` hoặc `fallback()`. Nếu recipient là attacker contract, callback đó có thể gọi lại victim trước khi victim hoàn thành lần gọi ban đầu. 'Reentrancy' là việc một execution flow tái nhập vào contract đang chưa hoàn tất. `call` không tự động gọi `withdraw()` và cũng không cho recipient sửa storage của caller trực tiếp.",
      source: "Session 8, slides 8–9",
    },
    {
      id: "bc-s8-q08",
      prompt: "Trong EtherBank dễ tổn thương, vì sao lần re-enter thứ hai vẫn vượt qua `require(bal > 0)`?",
      options: [
        { id: "a", text: "`msg.sender` của nested call trở thành bank nên balance lookup chuyển sang tài khoản khác." },
        { id: "b", text: "`require` chỉ kiểm tra ở lần gọi đầu tiên và bị EVM bỏ qua ở nested call." },
        { id: "c", text: "Mỗi lần external call tự cộng lại số ETH vừa gửi vào mapping `balances`." },
        { id: "d", text: "`balances[attacker]` vẫn giữ giá trị cũ vì state chưa được zero trước external call." },
      ],
      correctOptionId: "d",
      explanation:
        "Trong lần gọi đầu, bank đọc balance nhưng chưa đặt mapping về 0 trước khi trao quyền thực thi cho attacker. Vì vậy nested call đọc lại cùng state cũ và check tiếp tục pass. Mapping là cấu trúc lưu state theo key; ở đây key là địa chỉ attacker. EVM không bỏ qua `require` trong nested call, và `msg.sender` vẫn là attacker contract khi nó gọi lại bank.",
      source: "Session 8, slide 9",
    },
    {
      id: "bc-s8-q09",
      prompt: "Chuỗi nào mô tả đúng cơ chế reentrancy trong EtherBank?",
      options: [
        { id: "a", text: "Attacker tạo nhiều transaction riêng → mỗi transaction chờ block mới → bank quên balance của transaction trước." },
        { id: "b", text: "Bank cập nhật balance → callback của attacker chạy → attacker gọi `deposit()` → state mới bị rollback tự động." },
        { id: "c", text: "Bank gửi ETH → callback của attacker chạy → attacker gọi lại `withdraw()` → state cũ vẫn pass check → bank gửi thêm ETH." },
        { id: "d", text: "Attacker sửa storage của bank trực tiếp → bank phát hiện thay đổi → miner khôi phục state cũ rồi gửi ETH." },
      ],
      correctOptionId: "c",
      explanation:
        "Reentrancy diễn ra trong cùng call stack của một transaction. Sau external interaction, attacker callback gọi ngược lại trước khi victim cập nhật state, nên check dựa trên stale state vẫn thành công. 'Stale state' là trạng thái cũ chưa phản ánh effect đáng lẽ phải xảy ra. Đây không phải nhiều transaction độc lập và attacker không được quyền sửa storage victim trực tiếp.",
      source: "Session 8, slides 8–9",
    },
    {
      id: "bc-s8-q10",
      prompt: "Case study The DAO năm 2016 gắn trực tiếp với lớp lỗ hổng nào?",
      options: [
        { id: "a", text: "Signature replay do chữ ký không chứa `chainId`." },
        { id: "b", text: "Reentrancy trong đường rút tiền `splitDAO`." },
        { id: "c", text: "Arithmetic underflow trong phép tính phần thưởng của validator." },
        { id: "d", text: "Oracle manipulation từ một DEX pool có thanh khoản thấp." },
      ],
      correctOptionId: "b",
      explanation:
        "The DAO bị khai thác qua reentrancy trong luồng rút tiền `splitDAO`. Attacker khiến contract gửi ETH trước khi cập nhật accounting cần thiết rồi tái nhập nhiều lần. 'splitDAO' là đường logic cho phép tách phần vốn ra khỏi DAO. Các lựa chọn còn lại là những vulnerability class có thật nhưng không phải nguyên nhân của sự cố này.",
      source: "Session 8, slide 10",
    },
    {
      id: "bc-s8-q11",
      prompt: "Tổ hợp nào đúng về The DAO theo slide Session 8?",
      options: [
        { id: "a", text: "Quỹ huy động khoảng 12,7 triệu ETH; lỗi do `tx.origin`; cộng đồng không thay đổi lịch sử chain." },
        { id: "b", text: "Quỹ huy động khoảng 514 nghìn ETH; lỗi do shared library; tiền bị khóa vĩnh viễn thay vì bị rút." },
        { id: "c", text: "Khoảng 12,7M ETH huy động, 3,6M ETH bị rút và sự cố dẫn tới hard fork." },
        { id: "d", text: "Quỹ huy động khoảng 3,6 triệu ETH; toàn bộ bị mất; Ethereum chuyển sang Proof of Stake ngay sau đó." },
      ],
      correctOptionId: "c",
      explanation:
        "Slide nêu The DAO huy động khoảng 12,7 triệu ETH và attacker rút khoảng 3,6 triệu ETH trước khi bị chặn bởi cấu trúc của quỹ. Phản ứng sau đó là một hard fork gây tranh luận lớn trong cộng đồng. Con số khoảng 514 nghìn ETH và shared library thuộc case Parity, không phải The DAO. Đây là lý do nên phân biệt các incident thay vì chỉ nhớ tên exploit.",
      source: "Session 8, slide 10",
    },
    {
      id: "bc-s8-q12",
      prompt: "Sau hard fork liên quan The DAO, quan hệ giữa Ethereum và Ethereum Classic được mô tả đúng như thế nào?",
      options: [
        { id: "a", text: "Chuỗi hard fork trở thành Ethereum hiện nay; chuỗi không fork tiếp tục dưới tên Ethereum Classic." },
        { id: "b", text: "Chuỗi hard fork trở thành Ethereum Classic; chuỗi không fork trở thành Ethereum hiện nay." },
        { id: "c", text: "Chuỗi không fork bị xóa hoàn toàn, còn hard fork giữ nguyên tên mà không tạo chain song song." },
        { id: "d", text: "Cả hai chuỗi hợp nhất lại sau vài block và tiếp tục cùng một lịch sử." },
      ],
      correctOptionId: "a",
      explanation:
        "Hard fork tạo ra hai lịch sử khác nhau. Nhánh chấp nhận đảo ngược hậu quả vụ The DAO trở thành Ethereum hiện nay, còn nhánh giữ nguyên lịch sử tiếp tục dưới tên Ethereum Classic, viết tắt ETC. 'Hard fork' là thay đổi protocol không tương thích ngược làm các node có thể đi theo các rule khác nhau. Đây là một sự kiện kỹ thuật lẫn quản trị quan trọng.",
      source: "Session 8, slide 10",
    },
    {
      id: "bc-s8-q13",
      prompt: "Mô tả nào đúng về cross-function reentrancy?",
      options: [
        { id: "a", text: "Attacker gọi lại đúng cùng một hàm và không đụng tới bất kỳ state chung nào." },
        { id: "b", text: "Attacker gọi một contract độc lập không có liên hệ state hoặc control flow với victim." },
        { id: "c", text: "Attacker re-enter một hàm khác nhưng hàm đó dùng chung state với hàm đang thực thi." },
        { id: "d", text: "Attacker chỉ đọc một view function sau khi transaction đã kết thúc hoàn toàn." },
      ],
      correctOptionId: "c",
      explanation:
        "Cross-function reentrancy không nhất thiết gọi lại đúng hàm ban đầu. Vấn đề xuất hiện khi hai hàm chia sẻ state, ví dụ một hàm đang ở giữa quá trình cập nhật balance còn hàm khác đọc hoặc sửa balance đó. Đây là lý do chỉ sửa một hàm theo CEI chưa chắc đủ cho toàn contract. 'Shared state' là state variable hoặc accounting logic được nhiều hàm cùng sử dụng.",
      source: "Session 8, slide 11",
    },
    {
      id: "bc-s8-q14",
      prompt: "Read-only reentrancy nguy hiểm trong tình huống nào?",
      options: [
        { id: "a", text: "Một contract khác đọc state tạm thời chưa nhất quán rồi dùng giá trị đó để ra quyết định kinh tế." },
        { id: "b", text: "Một `view` function ghi trực tiếp storage nhưng compiler không phát hiện." },
        { id: "c", text: "Một external call tự động xóa cache của EVM khiến dữ liệu đọc được trở thành ngẫu nhiên." },
        { id: "d", text: "Một `pure` function chuyển ETH sang caller mà không cần transaction." },
      ],
      correctOptionId: "a",
      explanation:
        "Read-only reentrancy không cần sửa state trực tiếp trong hàm `view`. Nguy cơ là một reader quan sát trạng thái trung gian, còn gọi là stale hoặc inconsistent state, trong lúc một operation chưa hoàn tất. Reader có thể dùng giá trị sai này để định giá, tính collateral hoặc quyết định khác. `view` bị compiler ngăn ghi state trực tiếp trong cách dùng thông thường.",
      source: "Session 8, slide 11",
    },
    {
      id: "bc-s8-q15",
      prompt: "Thứ tự chuẩn của Checks-Effects-Interactions là gì?",
      options: [
        { id: "a", text: "Kiểm tra điều kiện → cập nhật state → gọi ra bên ngoài." },
        { id: "b", text: "Gọi ra bên ngoài → kiểm tra điều kiện → cập nhật state." },
        { id: "c", text: "Cập nhật state → gọi ra bên ngoài → kiểm tra điều kiện." },
        { id: "d", text: "Kiểm tra điều kiện → gọi ra bên ngoài → cập nhật state." },
      ],
      correctOptionId: "a",
      explanation:
        "CEI là viết tắt của Checks-Effects-Interactions. 'Checks' xác nhận preconditions như balance > 0; 'Effects' cập nhật state nội bộ; 'Interactions' mới thực hiện external calls. Đặt effect trước interaction giúp nested call nhìn thấy state đã cập nhật. Đây là defense cơ bản chống reentrancy.",
      source: "Session 8, slide 12",
    },
    {
      id: "bc-s8-q16",
      prompt: "Đoạn pseudocode nào tuân thủ CEI tốt nhất cho `withdraw()`?",
      options: [
        { id: "a", text: "Gửi ETH theo `balances[user]`; sau đó đọc lại balance; nếu còn dương thì đặt về 0." },
        { id: "b", text: "`bal = balances[user]`; gửi ETH; kiểm tra `bal > 0`; cuối cùng đặt `balances[user] = 0`." },
        { id: "c", text: "Kiểm tra `bal > 0`; gửi ETH; nếu call thành công mới đặt balance về 0 để tránh ghi storage thừa." },
        { id: "d", text: "`bal = balances[user]`; kiểm tra `bal > 0`; đặt `balances[user] = 0`; sau đó mới gửi ETH." },
      ],
      correctOptionId: "d",
      explanation:
        "Đáp án đúng tuân thủ đúng thứ tự check, effect, interaction. Đặt balance về 0 trước external call làm nested `withdraw()` nhìn thấy số dư đã được tiêu thụ. Cách này vẫn an toàn nếu external call sau đó revert, vì revert sẽ rollback state update trong cùng transaction. 'Rollback' nghĩa là toàn bộ state change của transaction bị hoàn tác khi transaction revert.",
      source: "Session 8, slides 12–13",
    },
    {
      id: "bc-s8-q17",
      prompt: "`nonReentrant` trong OpenZeppelin `ReentrancyGuard` hoạt động chủ yếu theo nguyên lý nào?",
      options: [
        { id: "a", text: "Dùng một trạng thái khóa để từ chối lời gọi lồng nhau vào vùng được bảo vệ." },
        { id: "b", text: "Giảm gas forwarding của mọi external call xuống đúng 2300 gas." },
        { id: "c", text: "Thay `msg.sender` bằng địa chỉ contract để nested call không còn quyền truy cập." },
        { id: "d", text: "Lưu hash của từng transaction rồi chặn mọi hash xuất hiện lần thứ hai." },
      ],
      correctOptionId: "a",
      explanation:
        "`ReentrancyGuard` duy trì một status flag, có thể hiểu như mutex đơn giản. Khi hàm `nonReentrant` đang chạy, nested call vào một hàm được bảo vệ tương tự sẽ revert. 'Mutex' là cơ chế khóa để ngăn hai luồng logic chồng lên cùng vùng critical section. Guard không dựa vào 2300 gas và không thay đổi `msg.sender`.",
      source: "Session 8, slide 13",
    },
    {
      id: "bc-s8-q18",
      prompt: "Pull-over-push thay đổi thiết kế payout theo hướng nào?",
      options: [
        { id: "a", text: "Admin nhận toàn bộ ETH trước rồi gửi thủ công cho từng địa chỉ ngoài blockchain." },
        { id: "b", text: "Recipient phải ký EIP-712 message trước khi contract có thể cập nhật balance nội bộ." },
        { id: "c", text: "Contract loop qua toàn bộ người nhận và dùng `transfer()` để đẩy ETH trong một transaction." },
        { id: "d", text: "Ghi nhận khoản tiền người dùng được nhận và để từng người tự gọi `withdraw()`." },
      ],
      correctOptionId: "d",
      explanation:
        "Pull-over-push nghĩa là ưu tiên mô hình người nhận chủ động 'pull' tiền thay vì contract 'push' hàng loạt. Cách này giới hạn external interaction vào từng user transaction riêng, nên một recipient revert không chặn cả danh sách. Nó cũng giảm bề mặt reentrancy trong payout loop. Đây là mẫu thiết kế, không bắt buộc phải dùng chữ ký EIP-712.",
      source: "Session 8, slide 13",
    },
    {
      id: "bc-s8-q19",
      prompt: "Vì sao Session 8 khuyến nghị dùng CEI, `nonReentrant` và pull-over-push cùng nhau?",
      options: [
        { id: "a", text: "Ba kỹ thuật chỉ cần cho testnet; khi lên mainnet có thể bỏ vì validator sẽ chặn reentrancy." },
        { id: "b", text: "Cả ba cùng làm một việc giống nhau nên dùng đồng thời giúp giảm gas theo cấp số nhân." },
        { id: "c", text: "Solidity chỉ compile external call nếu contract đồng thời có CEI, guard và pull payment." },
        { id: "d", text: "Ba kỹ thuật tạo defense in depth và bao phủ các failure modes khác nhau." },
      ],
      correctOptionId: "d",
      explanation:
        "'Defense in depth' là chiến lược nhiều lớp phòng thủ. CEI sửa ordering của state, guard chặn nested entry, còn pull-over-push giảm external-call coupling trong payout. Một lớp có thể bị dùng sai hoặc không bao phủ một biến thể như cross-function reentrancy, nên các lớp bổ trợ nhau. Validator không tự sửa logic sai của contract.",
      source: "Session 8, slide 13",
    },
    {
      id: "bc-s8-q20",
      prompt: "Hàm nào thể hiện lỗi access control rõ ràng nhất?",
      options: [
        { id: "a", text: "`function owner() external view returns (address) { return owner; }`" },
        { id: "b", text: "`function setOwner(address n) external { owner = n; }`" },
        { id: "c", text: "`function renounceOwnership() external onlyOwner { owner = address(0); }`" },
        { id: "d", text: "`function setOwner(address n) external onlyOwner { owner = n; }`" },
      ],
      correctOptionId: "b",
      explanation:
        "Hàm `setOwner` không có modifier bảo vệ nên bất kỳ caller nào cũng có thể thay đổi owner. 'Access control' là cơ chế giới hạn ai được phép thực hiện hành động nhạy cảm. `onlyOwner` là một guard phổ biến để chỉ owner được gọi. Một getter `view` không phải lỗi chỉ vì nó công khai dữ liệu owner.",
      source: "Session 8, slide 14",
    },
    {
      id: "bc-s8-q21",
      prompt: "Một proxy dùng `initialize()` để gán owner nhưng initializer không được bảo vệ. Rủi ro chính là gì?",
      options: [
        { id: "a", text: "Contract sẽ tự động chuyển sang immutable mode ngay khi `initialize()` bị gọi." },
        { id: "b", text: "Một địa chỉ bất kỳ có thể gọi `initialize()` trước và chiếm ownership." },
        { id: "c", text: "Initializer sẽ tự chạy lại ở mỗi transaction và reset owner về deployer." },
        { id: "d", text: "Proxy sẽ mất khả năng `delegatecall` vì initializer không có `payable`." },
      ],
      correctOptionId: "b",
      explanation:
        "Trong proxy pattern, logic contract thường không dùng constructor theo cách thông thường mà dùng initializer. Nếu initializer không có guard kiểu `initializer` hoặc không được gọi đúng lúc, attacker có thể gọi trước và tự đặt mình làm owner. 'Ownership takeover' là việc chiếm quyền quản trị contract. Đây là một lỗi access control kinh điển.",
      source: "Session 8, slide 14",
    },
    {
      id: "bc-s8-q22",
      prompt: "Tập nguyên tắc access control nào phù hợp nhất với Session 8?",
      options: [
        { id: "a", text: "Least privilege, modifier rõ ràng, event cho hành động đặc quyền và two-step ownership transfer." },
        { id: "b", text: "Một admin duy nhất có toàn quyền, không cần event và có thể đổi owner trong một bước." },
        { id: "c", text: "Cho mọi hàm admin là public rồi dựa vào frontend để ẩn nút khỏi người dùng thường." },
        { id: "d", text: "Dùng `tx.origin` cho authorization vì nó luôn giữ địa chỉ EOA ban đầu của transaction." },
      ],
      correctOptionId: "a",
      explanation:
        "'Least privilege' nghĩa là mỗi actor chỉ có đúng quyền tối thiểu cần thiết. Event trên privileged action tạo audit trail cho hệ thống giám sát. Two-step ownership transfer thường yêu cầu owner mới chủ động accept để giảm lỗi gửi nhầm quyền. Frontend không phải security boundary và `tx.origin` không an toàn để phân quyền.",
      source: "Session 8, slide 14",
    },
    {
      id: "bc-s8-q23",
      prompt: "Khác biệt chính giữa `tx.origin` và `msg.sender` là gì?",
      options: [
        { id: "a", text: "`tx.origin` là caller trực tiếp, còn `msg.sender` luôn là EOA ban đầu." },
        { id: "b", text: "`tx.origin` là EOA khởi tạo transaction, còn `msg.sender` là caller trực tiếp của frame hiện tại." },
        { id: "c", text: "`msg.sender` là validator đề xuất block, còn `tx.origin` là contract đầu tiên được deploy." },
        { id: "d", text: "Hai giá trị luôn giống nhau miễn là transaction có ít nhất một external call." },
      ],
      correctOptionId: "b",
      explanation:
        "`tx.origin` giữ địa chỉ EOA ở đầu chuỗi gọi, còn `msg.sender` thay đổi theo từng hop. Nếu Owner gọi Evil rồi Evil gọi Victim, trong Victim ta có `tx.origin = Owner` nhưng `msg.sender = Evil`. Vì vậy authorization nên dựa vào immediate caller phù hợp, thường là `msg.sender`. 'EOA' là externally owned account, tức tài khoản điều khiển bằng private key.",
      source: "Session 8, slide 15",
    },
    {
      id: "bc-s8-q24",
      prompt: "Trong chuỗi `Owner → Evil.claim() → Victim.adminFunction()`, giá trị nào đúng bên trong `Victim.adminFunction()`?",
      options: [
        { id: "a", text: "`tx.origin = Evil` và `msg.sender = Owner`." },
        { id: "b", text: "`tx.origin = Owner` và `msg.sender = Evil`." },
        { id: "c", text: "`tx.origin = Owner` và `msg.sender = Owner`." },
        { id: "d", text: "`tx.origin = Evil` và `msg.sender = Evil`." },
      ],
      correctOptionId: "b",
      explanation:
        "Owner là EOA khởi tạo transaction nên vẫn là `tx.origin`. Evil là contract gọi trực tiếp Victim nên là `msg.sender`. Đây là cơ sở của phishing attack khi Victim dùng `require(tx.origin == owner)`. Kẻ xấu chỉ cần dụ owner gọi contract trung gian của nó.",
      source: "Session 8, slide 15",
    },
    {
      id: "bc-s8-q25",
      prompt: "Case Parity multisig năm 2017 trong Session 8 kết hợp những yếu tố nào?",
      options: [
        { id: "a", text: "Reentrancy, flash loan và spot-price oracle từ một DEX pool." },
        { id: "b", text: "Sandwich attack, private mempool và gas griefing trong payout loop." },
        { id: "c", text: "Unprotected initializer, `delegatecall` tới shared library và `selfdestruct`." },
        { id: "d", text: "Arithmetic overflow, signature replay và weak randomness từ `blockhash`." },
      ],
      correctOptionId: "c",
      explanation:
        "Parity wallet dùng shared library qua `delegatecall`. Hàm `initWallet` của library không được bảo vệ, một user trở thành owner rồi gọi `selfdestruct`, làm library biến mất và các wallet phụ thuộc bị đóng băng. `delegatecall` chạy code đích trong storage context của caller. Case này minh họa nhiều lỗi kết hợp thay vì một bug đơn lẻ.",
      source: "Session 8, slide 16",
    },
    {
      id: "bc-s8-q26",
      prompt: "Điều gì xảy ra với khoảng 514 nghìn ETH trong sự cố Parity được slide nhắc tới?",
      options: [
        { id: "a", text: "ETH bị attacker rút bằng reentrancy rồi chain phải hard fork để hoàn tiền." },
        { id: "b", text: "ETH bị chuyển hết sang một DEX rồi đổi thành stablecoin trong cùng block." },
        { id: "c", text: "ETH bị burn trực tiếp bởi `selfdestruct` của từng wallet và biến mất khỏi total supply." },
        { id: "d", text: "ETH bị khóa vĩnh viễn trong các wallet phụ thuộc vào library đã bị phá hủy." },
      ],
      correctOptionId: "d",
      explanation:
        "Slide nhấn mạnh tiền bị 'frozen', tức mắc kẹt và không thể chi tiêu, chứ không phải bị đánh cắp. Library chung bị `selfdestruct`, khiến logic cần thiết để các wallet hoạt động không còn. `selfdestruct` trong bối cảnh lịch sử của incident này làm code library biến mất. Đây là khác biệt quan trọng giữa loss do theft và loss do permanent lock.",
      source: "Session 8, slide 16",
    },
    {
      id: "bc-s8-q27",
      prompt: "Trong Solidity trước 0.8, kết quả có thể xảy ra với `uint8 x = 255; x = x + 1;` là gì?",
      options: [
        { id: "a", text: "`x` trở thành 256 vì EVM tự mở rộng `uint8` thành `uint256`." },
        { id: "b", text: "Compiler tự thay phép cộng bằng phép cộng modulo chỉ khi dùng `unchecked`." },
        { id: "c", text: "Transaction luôn revert vì overflow check đã bật mặc định từ Solidity 0.4." },
        { id: "d", text: "`x` wrap về 0 thay vì tự động revert." },
      ],
      correctOptionId: "d",
      explanation:
        "`uint8` chỉ biểu diễn từ 0 đến 255. Trước Solidity 0.8, overflow có thể wrap theo modulo, nên 255 + 1 trở về 0. 'Overflow' là vượt giới hạn trên của kiểu số; 'underflow' là vượt giới hạn dưới. SafeMath từng được dùng để thêm các kiểm tra này.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q28",
      prompt: "Trong Solidity 0.8 trở lên, hành vi mặc định với overflow/underflow là gì?",
      options: [
        { id: "a", text: "Compiler tự chuyển tất cả integer thành số có độ dài tùy ý nên không thể overflow." },
        { id: "b", text: "Giá trị vẫn wrap theo modulo trừ khi developer import SafeMath." },
        { id: "c", text: "Arithmetic overflow hoặc underflow sẽ revert transaction." },
        { id: "d", text: "Overflow chỉ emit warning trong log nhưng state change vẫn được giữ." },
      ],
      correctOptionId: "c",
      explanation:
        "Từ Solidity 0.8, checked arithmetic là mặc định: overflow/underflow làm transaction revert. Vì vậy SafeMath không còn bắt buộc cho phép toán cơ bản. 'Revert' hoàn tác state changes của transaction đang thực thi. Tuy nhiên developer vẫn có thể chủ động tắt check trong `unchecked {}`.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q29",
      prompt: "Vì sao `unchecked {}` được gọi là một modern footgun?",
      options: [
        { id: "a", text: "Nó khiến compiler bỏ luôn kiểm tra kiểu dữ liệu của mọi biến trong block." },
        { id: "b", text: "Nó tự động bỏ access control modifier của các hàm nằm trong cùng contract." },
        { id: "c", text: "`unchecked` tắt arithmetic checks trong block đó, nên overflow/underflow có thể quay lại." },
        { id: "d", text: "Nó làm mọi phép đọc storage trở thành external call và có thể gây reentrancy." },
      ],
      correctOptionId: "c",
      explanation:
        "`unchecked` cho phép arithmetic wrap thay vì revert, thường nhằm tiết kiệm một phần gas khi developer chứng minh được phép tính an toàn. 'Footgun' là tính năng dễ tự gây lỗi nếu dùng bất cẩn. Nó không tắt type system hay modifier; phạm vi chính là arithmetic checks. Vì thế cần invariant rõ ràng trước khi dùng.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q30",
      prompt: "Nếu Solidity thực hiện integer division, điều gì xảy ra với phần thập phân?",
      options: [
        { id: "a", text: "Phần lẻ được lưu ngầm dưới dạng floating point trong EVM." },
        { id: "b", text: "Phép chia tự động làm tròn tới số nguyên gần nhất theo chuẩn IEEE-754." },
        { id: "c", text: "Phần lẻ bị truncate, tức bị cắt bỏ." },
        { id: "d", text: "Transaction revert nếu kết quả không phải là số nguyên chính xác." },
      ],
      correctOptionId: "c",
      explanation:
        "EVM không dùng floating point cho kiểu integer Solidity thông thường. Integer division truncate phần lẻ, ví dụ `$5 / 2 = 2$` chứ không phải 2.5. Vì thế slide khuyến nghị multiply trước rồi divide để giảm precision loss khi hợp lý. 'Precision loss' là mất độ chính xác do làm tròn hoặc cắt phần lẻ.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q31",
      prompt: "Vì sao không nên mặc định mọi ERC-20 đều có 18 decimals khi tính toán?",
      options: [
        { id: "a", text: "Token có thể dùng decimals khác 18, nên hard-code 18 sẽ làm sai scaling." },
        { id: "b", text: "Decimals quyết định số byte trong private key nên mỗi token có một chuẩn mật mã khác." },
        { id: "c", text: "Decimals chỉ tồn tại ở frontend, vì vậy contract không thể đọc hoặc dùng giá trị đó." },
        { id: "d", text: "Decimals luôn bằng số block kể từ lúc token deploy nên thay đổi liên tục." },
      ],
      correctOptionId: "a",
      explanation:
        "Nhiều token dùng 18 decimals nhưng không phải tất cả; ví dụ các token phổ biến có thể dùng 6. 'Scaling' là việc quy đổi giữa đơn vị cơ sở integer on-chain và đơn vị hiển thị cho người dùng. Nếu code hard-code 18, phép tính giá hoặc amount có thể sai nhiều bậc độ lớn. Session 8 nối điểm này với precision/rounding.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q32",
      prompt: "Tại sao spot price từ một DEX pool duy nhất là oracle nguy hiểm?",
      options: [
        { id: "a", text: "Spot price chỉ nguy hiểm nếu token dùng hơn 18 decimals, còn liquidity không ảnh hưởng." },
        { id: "b", text: "Giá có thể bị thay đổi tạm thời bằng một giao dịch lớn ngay trước lúc protocol đọc nó." },
        { id: "c", text: "DEX pool không lưu reserve on-chain nên protocol không thể kiểm chứng bất kỳ giá nào." },
        { id: "d", text: "DEX spot price luôn chậm hơn block hiện tại đúng 24 giờ nên không phản ánh thị trường." },
      ],
      correctOptionId: "b",
      explanation:
        "Spot price phản ánh trạng thái pool tại một thời điểm rất ngắn và có thể bị skew bởi giao dịch lớn, đặc biệt khi liquidity mỏng. Nếu protocol lấy giá đó làm collateral price ngay lập tức, attacker có thể tạo giá giả trong một transaction. 'Oracle' là nguồn dữ liệu đưa thông tin bên ngoài hoặc giá thị trường vào logic on-chain. Vấn đề nằm ở manipulability, không phải ở decimals.",
      source: "Session 8, slide 18",
    },
    {
      id: "bc-s8-q33",
      prompt: "Chuỗi nào mô tả đúng flash-loan oracle manipulation?",
      options: [
        { id: "a", text: "Vay lớn → giữ tài sản qua nhiều ngày → đợi oracle hết hạn → trả khi giá thuận lợi." },
        { id: "b", text: "Vay lớn → bẻ giá pool → protocol đọc giá sai → khai thác → trả vay trong cùng transaction." },
        { id: "c", text: "Vay lớn → tăng block gas limit → buộc oracle bỏ qua kiểm tra signature → rút tiền." },
        { id: "d", text: "Vay lớn → thay khóa private của oracle → ký giá mới → validator rollback transaction." },
      ],
      correctOptionId: "b",
      explanation:
        "Flash loan cung cấp vốn tức thời để attacker thao túng price source. Vì toàn bộ chuỗi diễn ra trong một transaction, attacker không cần chịu rủi ro giữ khoản vay qua thời gian dài. 'Atomicity' đảm bảo nếu không trả được khoản vay, toàn bộ transaction revert. Đây là lý do economic security phải tính tới capital có thể huy động trong một block.",
      source: "Session 8, slide 18",
    },
    {
      id: "bc-s8-q34",
      prompt: "Tổ hợp defense nào phù hợp nhất chống oracle manipulation theo slide?",
      options: [
        { id: "a", text: "Tăng gas limit, dùng `delegatecall`, tắt overflow checks và giảm số validator." },
        { id: "b", text: "`block.timestamp`, `tx.origin`, một DEX pool nhỏ và hard-code giá dự phòng." },
        { id: "c", text: "Spot price tức thời, một nguồn duy nhất, không giới hạn biến động và không kiểm tra freshness." },
        { id: "d", text: "TWAP, decentralized oracle, nhiều nguồn độc lập và sanity bounds." },
      ],
      correctOptionId: "d",
      explanation:
        "TWAP là time-weighted average price, tức giá trung bình có trọng số theo thời gian, khó bị bẻ cong trong một khoảnh khắc hơn spot price. Decentralized oracle như Chainlink tổng hợp dữ liệu từ nhiều nguồn/nodes. 'Sanity bounds' là biên hợp lý để từ chối giá quá lệch. Kết hợp nhiều nguồn làm giảm single point of failure.",
      source: "Session 8, slide 18",
    },
    {
      id: "bc-s8-q35",
      prompt: "MEV có thể phát sinh vì đặc điểm nào của mempool công khai?",
      options: [
        { id: "a", text: "Node bắt buộc giữ đúng thứ tự transaction theo thời điểm user bấm nút gửi." },
        { id: "b", text: "Validator không thể chọn transaction nào vào block nếu transaction đã vào mempool." },
        { id: "c", text: "Pending transaction lộ trước khi vào block, nên searcher có thể chèn hoặc đổi thứ tự giao dịch." },
        { id: "d", text: "Mempool mã hóa hoàn toàn nội dung transaction cho tới sau khi block final." },
      ],
      correctOptionId: "c",
      explanation:
        "MEV là maximal extractable value, giá trị có thể trích xuất bằng cách sắp xếp, chèn hoặc loại transaction trong block. Public mempool làm ý định giao dịch bị lộ trước khi inclusion. 'Searcher' là tác nhân tự động tìm cơ hội MEV. Thứ tự mempool không phải cam kết bắt buộc cho thứ tự cuối trong block.",
      source: "Session 8, slide 19",
    },
    {
      id: "bc-s8-q36",
      prompt: "Một sandwich attack điển hình quanh swap của victim có thứ tự nào?",
      options: [
        { id: "a", text: "Victim swap trước, attacker mua sau rồi giữ tài sản mà không có giao dịch back-run." },
        { id: "b", text: "Validator xóa transaction của victim, thay bằng transaction giống hệt nhưng có nonce thấp hơn." },
        { id: "c", text: "Attacker mua trước victim để đẩy giá, victim swap ở giá xấu hơn, attacker bán sau để chốt lời." },
        { id: "d", text: "Attacker bán trước để giảm giá, victim nhận giá tốt hơn, attacker mua lại và chịu lỗ." },
      ],
      correctOptionId: "c",
      explanation:
        "Sandwich attack gồm front-run và back-run kẹp quanh giao dịch victim. Front-run di chuyển giá theo hướng có lợi cho attacker; victim chịu slippage; back-run đóng vị thế để kiếm lợi. 'Slippage' là chênh lệch giữa giá kỳ vọng và giá thực thi. Đây là một dạng MEV chứ không phải signature replay.",
      source: "Session 8, slide 19",
    },
    {
      id: "bc-s8-q37",
      prompt: "Biện pháp nào KHÔNG thuộc nhóm defense chống front-running/MEV trong Session 8?",
      options: [
        { id: "a", text: "Dùng private mempool/relay hoặc deadline cho transaction nhạy cảm." },
        { id: "b", text: "Đặt slippage limit để giới hạn mức giá thực thi chấp nhận được." },
        { id: "c", text: "Dùng commit-reveal để tách giai đoạn cam kết và tiết lộ dữ liệu." },
        { id: "d", text: "Authorization bằng `tx.origin`." },
      ],
      correctOptionId: "d",
      explanation:
        "`tx.origin` không liên quan tới việc bảo vệ thứ tự transaction và còn là anti-pattern cho authorization. Slippage limit giảm thiệt hại giá, commit-reveal che nội dung trong giai đoạn đầu, private relay giảm lộ transaction, còn deadline giới hạn thời gian transaction có hiệu lực. Đây là các defense ở lớp execution/ordering.",
      source: "Session 8, slide 19",
    },
    {
      id: "bc-s8-q38",
      prompt: "Lỗi unchecked external-call return xảy ra khi nào?",
      options: [
        { id: "a", text: "Contract bỏ qua failure flag của `.call`/`.send` rồi tiếp tục như thể call đã thành công." },
        { id: "b", text: "Contract chỉ thực hiện `staticcall` đọc dữ liệu và không thay đổi bất kỳ accounting nào." },
        { id: "c", text: "Contract kiểm tra `ok` rồi revert nếu external call thất bại." },
        { id: "d", text: "Contract dùng `try/catch` để xử lý cả success lẫn failure của external call." },
      ],
      correctOptionId: "a",
      explanation:
        "Low-level call thường trả về success flag thay vì tự động propagate failure theo cách high-level call làm. Nếu bỏ qua flag, internal accounting có thể diverge khỏi thực tế, ví dụ đánh dấu đã trả tiền dù transfer thất bại. 'State divergence' là sự lệch giữa state nội bộ và kết quả thật của interaction. Vì vậy mọi external-call return quan trọng phải được kiểm tra.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q39",
      prompt: "Điều nguy hiểm nhất khi `delegatecall` tới một target không đáng tin là gì?",
      options: [
        { id: "a", text: "Code của target chạy trong storage context của caller và có thể làm hỏng hoặc chiếm state của caller." },
        { id: "b", text: "Target chỉ có thể đọc storage của chính nó nên rủi ro chủ yếu là tốn gas." },
        { id: "c", text: "`delegatecall` luôn tạo một contract con mới nên rủi ro chính là address collision." },
        { id: "d", text: "`delegatecall` xóa `msg.sender` và `msg.value`, vì vậy mọi access control đều tự động fail." },
      ],
      correctOptionId: "a",
      explanation:
        "`delegatecall` thực thi code của target nhưng dùng storage, balance và execution context của caller. Vì vậy code lạ có thể ghi vào những slot quan trọng như owner hoặc implementation pointer. Đây là nền tảng của proxy nhưng cũng là attack surface lớn. Session 8 mô tả nguyên tắc: trust target absolutely or not at all.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q40",
      prompt: "Một chữ ký hợp lệ bị sử dụng lại ở lần thứ hai để thực hiện cùng một hành động. Đây là dạng lỗi gì?",
      options: [
        { id: "a", text: "Gas griefing." },
        { id: "b", text: "Signature replay." },
        { id: "c", text: "Cross-function reentrancy." },
        { id: "d", text: "Oracle manipulation." },
      ],
      correctOptionId: "b",
      explanation:
        "Signature replay là việc tái sử dụng một chữ ký từng hợp lệ để kích hoạt lại hành động mà signer không còn chủ đích cho phép. Defense thường gồm nonce, `chainId` và domain separation như EIP-712. 'Nonce' là giá trị dùng một lần hoặc counter để mỗi authorization chỉ được tiêu thụ một lần. Reentrancy và gas griefing là các lớp lỗi khác.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q41",
      prompt: "Tại sao `nonce + chainId + domain` giúp chống signature replay?",
      options: [
        { id: "a", text: "Chúng khiến validator tự động xóa mọi transaction có chữ ký giống nhau trong mempool." },
        { id: "b", text: "Chúng ràng buộc chữ ký với một lần sử dụng và một ngữ cảnh chain/contract cụ thể." },
        { id: "c", text: "Chúng làm chữ ký ngắn hơn nên attacker không thể sao chép đầy đủ dữ liệu." },
        { id: "d", text: "Chúng thay private key sau mỗi lần ký nên chữ ký cũ không còn kiểm chứng được." },
      ],
      correctOptionId: "b",
      explanation:
        "`nonce` ngăn dùng lại cùng authorization; `chainId` ràng buộc với một blockchain cụ thể; `domain` thường ràng buộc với contract và loại thông điệp. EIP-712 dùng domain separation để giảm replay giữa các context khác nhau. Các trường này không thay private key và cũng không dựa vào mempool.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q42",
      prompt: "Một hàm loop qua array tăng mãi và cuối cùng không thể chạy hết vì vượt block gas limit. Đây là ví dụ của gì?",
      options: [
        { id: "a", text: "Oracle staleness." },
        { id: "b", text: "Signature malleability." },
        { id: "c", text: "DoS do unbounded loop." },
        { id: "d", text: "Read-only reentrancy." },
      ],
      correctOptionId: "c",
      explanation:
        "Unbounded loop là vòng lặp không có giới hạn tăng trưởng thực tế theo dữ liệu on-chain. Khi số phần tử đủ lớn, gas cần thiết có thể vượt block gas limit và hàm trở nên không thể thực thi. Đây là denial of service vì chức năng bị khóa bởi chi phí tính toán. Giải pháp thường là pagination, pull pattern hoặc cấu trúc dữ liệu khác.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q43",
      prompt: "Một payout loop dừng hoàn toàn chỉ vì một recipient revert. Đây gần nhất với lớp lỗi nào?",
      options: [
        { id: "a", text: "Oracle manipulation vì recipient có thể thay đổi giá ETH." },
        { id: "b", text: "Gas griefing/DoS do một external recipient chặn cả vòng payout." },
        { id: "c", text: "Signature replay vì một recipient được trả hai lần." },
        { id: "d", text: "Arithmetic overflow vì tổng payout vượt `uint256`." },
      ],
      correctOptionId: "b",
      explanation:
        "Nếu payout dùng mô hình push và mỗi external transfer là bắt buộc thành công, một recipient cố ý revert có thể làm cả transaction revert. Đây là DoS qua external dependency, thường được gọi gas griefing trong ngữ cảnh slide. Pull-over-push tách payout thành giao dịch riêng cho từng user. Như vậy một user lỗi không khóa tất cả.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q44",
      prompt: "Nguồn nào được Session 8 xem là yếu nếu dùng trực tiếp làm randomness cho lottery on-chain?",
      options: [
        { id: "a", text: "`block.timestamp` hoặc `blockhash`." },
        { id: "b", text: "Random beacon có cơ chế xác minh mật mã." },
        { id: "c", text: "Commit-reveal với nhiều participant độc lập." },
        { id: "d", text: "VRF với proof được xác minh on-chain." },
      ],
      correctOptionId: "a",
      explanation:
        "`block.timestamp` và một số block-derived values có thể bị proposer ảnh hưởng hoặc dự đoán trong phạm vi nhất định. Vì vậy chúng không nên là nguồn randomness duy nhất cho trò chơi có giá trị kinh tế. VRF là verifiable random function, cung cấp output kèm proof để contract xác minh. Commit-reveal cũng giảm khả năng một bên đơn lẻ chọn kết quả sau khi thấy người khác.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q45",
      prompt: "Vì sao không nên dùng `address(this).balance` như một invariant tuyệt đối cho business logic?",
      options: [
        { id: "a", text: "EVM không lưu ETH balance của contract nên giá trị này chỉ là ước lượng." },
        { id: "b", text: "`address(this).balance` chỉ cập nhật sau 256 block nên luôn có độ trễ." },
        { id: "c", text: "ETH có thể bị force-feed, nên raw balance có thể lệch khỏi accounting dự kiến." },
        { id: "d", text: "Balance của contract tự động reset về 0 mỗi khi contract gọi external function." },
      ],
      correctOptionId: "c",
      explanation:
        "Session 8 cảnh báo ETH có thể bị ép vào contract trong một số cơ chế, nên raw balance không phải lúc nào cũng phản ánh accounting nội bộ. 'Force-feed' nghĩa là contract nhận ETH mà không đi qua logic deposit dự kiến. Vì vậy invariant nên dựa trên state/accounting được thiết kế rõ ràng, không giả định chỉ có một đường nhận ETH.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q46",
      prompt: "SWC Registry và SCSVS đóng vai trò gì trong smart-contract security?",
      options: [
        { id: "a", text: "Cung cấp consensus protocol cho validator Ethereum." },
        { id: "b", text: "Cung cấp hệ thống phân loại weakness và tiêu chuẩn/khung verification." },
        { id: "c", text: "Định nghĩa chuẩn token ERC-20 và ERC-721 cho ví và DEX." },
        { id: "d", text: "Thay thế compiler Solidity bằng một ngôn ngữ formal." },
      ],
      correctOptionId: "b",
      explanation:
        "SWC Registry là Smart Contract Weakness Classification Registry, dùng để chuẩn hóa cách gọi các loại weakness. SCSVS là Smart Contract Security Verification Standard, hỗ trợ kiểm tra các yêu cầu bảo mật có hệ thống. Chúng giúp team dùng chung vocabulary và checklist. Chúng không phải token standard hay consensus protocol.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q47",
      prompt: "Thứ tự nào khớp với secure-development lifecycle trong Session 8?",
      options: [
        { id: "a", text: "Monitor → audit → viết invariant → bỏ test → deploy → threat model." },
        { id: "b", text: "Threat model → static analysis → fuzz/invariant → audit → bug bounty → monitor." },
        { id: "c", text: "Bug bounty → static analysis → code → audit → threat model → deploy." },
        { id: "d", text: "Audit → deploy → threat model → fuzz → static analysis → monitor." },
      ],
      correctOptionId: "b",
      explanation:
        "Lifecycle bắt đầu từ threat modeling, sau đó là các lớp kiểm tra tự động và động, tiếp đến human audit, bug bounty và monitoring sau deploy. Điểm quan trọng là không có một giai đoạn nào là silver bullet. 'Silver bullet' ở đây nghĩa là một giải pháp duy nhất giải quyết toàn bộ rủi ro. Security là một vòng lặp, không phải checklist làm một lần.",
      source: "Session 8, slides 23–24",
    },
    {
      id: "bc-s8-q48",
      prompt: "Trong threat modeling, bốn nhóm thông tin chính nào nên được ghi ra trước khi code?",
      options: [
        { id: "a", text: "Frontend route, CSS theme, wallet icon và analytics." },
        { id: "b", text: "Gas price, token price, TVL và market cap." },
        { id: "c", text: "Compiler, IDE, RPC endpoint và block explorer." },
        { id: "d", text: "Assets, actors, trust assumptions và invariants." },
      ],
      correctOptionId: "d",
      explanation:
        "'Assets' là thứ đáng bảo vệ; 'actors' là các chủ thể có thể hành động; 'trust assumptions' là điều hệ thống giả định thành phần nào đó sẽ làm đúng; 'invariants' là điều phải luôn đúng. Bốn nhóm này giúp biến security từ cảm tính thành mô hình rõ ràng. Các thông tin triển khai khác có thể quan trọng nhưng không thay thế threat model.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q49",
      prompt: "Mệnh đề `$\\sum_i balances[i] = totalSupply$` trong một token system là ví dụ gần nhất của gì?",
      options: [
        { id: "a", text: "Access modifier." },
        { id: "b", text: "Actor." },
        { id: "c", text: "Invariant." },
        { id: "d", text: "Oracle." },
      ],
      correctOptionId: "c",
      explanation:
        "Invariant là property phải luôn đúng qua mọi state hợp lệ. Công thức `$\\sum_i balances[i] = totalSupply$` nói rằng tổng số dư của mọi holder phải bằng tổng cung, nếu mô hình token không có cơ chế đặc biệt khác. Invariant có thể trở thành test oracle và monitoring rule. 'Test oracle' là tiêu chí giúp test quyết định kết quả đúng hay sai.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q50",
      prompt: "Vì sao invariants nên được viết sớm trong lifecycle?",
      options: [
        { id: "a", text: "Chúng làm gas của mọi transaction giảm vì EVM cache các property." },
        { id: "b", text: "Chúng giúp compiler tối ưu bytecode tự động mà không cần test." },
        { id: "c", text: "Chúng có thể dùng làm property cho testing và alert condition cho monitoring." },
        { id: "d", text: "Chúng thay thế hoàn toàn access control và audit nếu viết đủ chi tiết." },
      ],
      correctOptionId: "c",
      explanation:
        "Invariant là cầu nối giữa design, testing và operations. Khi đã xác định điều phải luôn đúng, team có thể fuzz/invariant test để cố phá property đó và monitor on-chain để cảnh báo khi property gần hoặc đã bị vi phạm. Invariant không thay thế audit hay access control. Nó là một lớp specification.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q51",
      prompt: "Slither thuộc nhóm công cụ nào?",
      options: [
        { id: "a", text: "Formal verifier chứng minh mọi property bằng theorem proving." },
        { id: "b", text: "Block explorer dùng để xem transaction và event." },
        { id: "c", text: "Dynamic fuzzing engine chỉ chạy bytecode đã deploy." },
        { id: "d", text: "Static analysis cho Solidity." },
      ],
      correctOptionId: "d",
      explanation:
        "Static analysis kiểm tra source/IR mà không cần chạy từng transaction thực tế. Slither của Trail of Bits phân tích các pattern như reentrancy, unchecked calls và `tx.origin`. Nó rất nhanh nên phù hợp đưa vào CI. Static analysis không đồng nghĩa formal proof và findings vẫn cần triage.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q52",
      prompt: "Phát biểu nào đúng về việc dùng Slither với Hardhat project?",
      options: [
        { id: "a", text: "Slither chỉ hoạt động nếu test suite đã đạt 100% coverage." },
        { id: "b", text: "Chỉ có thể dùng Slither trong Remix và không hỗ trợ Hardhat." },
        { id: "c", text: "Phải deploy contract lên mainnet trước thì Slither mới đọc được bytecode." },
        { id: "d", text: "Có thể chạy `slither .`; công cụ auto-detect project và compile để phân tích." },
      ],
      correctOptionId: "d",
      explanation:
        "Session 8 nêu lệnh `slither .` cho Hardhat project. Slither phân tích source/project locally, nên không cần deploy mainnet. Nó có thể chạy độc lập với coverage của test suite. Đây là lý do static analysis là một lớp kiểm tra sớm và rẻ.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q53",
      prompt: "Vì sao nên đặt Slither trong CI chạy trên mỗi commit?",
      options: [
        { id: "a", text: "Để thay thế toàn bộ unit test, fuzzing và audit bằng một công cụ duy nhất." },
        { id: "b", text: "Để validator chấp nhận bytecode, vì mainnet yêu cầu báo cáo Slither kèm deployment." },
        { id: "c", text: "Để compiler tự sửa vulnerability trước khi sinh bytecode." },
        { id: "d", text: "Để phát hiện sớm các security pattern đáng ngờ với chi phí thấp và phản hồi nhanh." },
      ],
      correctOptionId: "d",
      explanation:
        "CI là continuous integration, nơi các kiểm tra tự động chạy khi code thay đổi. Slither nhanh và rẻ nên rất phù hợp làm security gate sớm. Tuy nhiên static analyzer không sửa code và không thay thế testing/human review. Defense in depth vẫn cần nhiều lớp.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q54",
      prompt: "Property testing khác example-based unit test chủ yếu ở điểm nào?",
      options: [
        { id: "a", text: "Nó kiểm tra một rule trên nhiều input thay vì chỉ một vài case được viết tay." },
        { id: "b", text: "Nó chứng minh mathematically property đúng cho mọi execution path." },
        { id: "c", text: "Nó chỉ chạy đúng một input nhưng lặp lại nhiều lần để đo gas." },
        { id: "d", text: "Nó không cần assertion vì framework tự biết business logic." },
      ],
      correctOptionId: "a",
      explanation:
        "Property test mô tả một tính chất tổng quát, ví dụ 'không ai rút nhiều hơn số dư'. Framework thử nhiều input để tìm counterexample. Example-based test thì kiểm tra các case cụ thể do developer chọn. Property testing mạnh hơn về breadth nhưng vẫn không phải formal proof.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q55",
      prompt: "Fuzzing trong Session 8 được mô tả gần nhất như thế nào?",
      options: [
        { id: "a", text: "Chỉ kiểm tra ABI compatibility giữa frontend và contract." },
        { id: "b", text: "Chạy đúng một happy-path input với gas limit cực lớn." },
        { id: "c", text: "Duyệt mathematically mọi path và chứng minh không có bug trong scope." },
        { id: "d", text: "Sinh nhiều input ngẫu nhiên hoặc bán ngẫu nhiên để cố làm assertion thất bại." },
      ],
      correctOptionId: "d",
      explanation:
        "Fuzzing ném nhiều input vào contract để tìm edge case mà developer không nghĩ tới. Khi assertion hoặc invariant vỡ, framework trả về counterexample để debug. Fuzzing không chứng minh absence of bugs trên mọi path. Nó là dynamic testing vì thực sự thực thi code với nhiều dữ liệu.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q56",
      prompt: "Invariant testing thường khác fuzzing một hàm đơn lẻ ở điểm nào?",
      options: [
        { id: "a", text: "Nó không thực thi contract mà chỉ đọc source code." },
        { id: "b", text: "Nó tạo sequence nhiều calls rồi kiểm tra invariant sau các bước." },
        { id: "c", text: "Nó chỉ dùng input cố định để dễ tái lập kết quả." },
        { id: "d", text: "Nó yêu cầu mọi function là `view` để không thay đổi state." },
      ],
      correctOptionId: "b",
      explanation:
        "Invariant testing đặc biệt hữu ích cho stateful systems. Framework có thể tạo sequence như deposit, withdraw, transfer rồi kiểm tra một property sau mỗi bước. Điều này giúp tìm bug chỉ xuất hiện sau nhiều operation kết hợp. Đây là khác biệt quan trọng so với fuzz một function stateless.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q57",
      prompt: "Invariant mẫu nào phù hợp nhất cho một EtherBank đơn giản?",
      options: [
        { id: "a", text: "`$gasUsed = 21000$` cho mọi lời gọi deposit và withdraw." },
        { id: "b", text: "`$block.timestamp_{n+1} = block.timestamp_n + 12$` chính xác cho mọi block." },
        { id: "c", text: "`$\\sum_i balances[i] = address(this).balance$` sau mọi sequence deposit/withdraw hợp lệ." },
        { id: "d", text: "`$balances[owner] = 0$` sau mọi transaction bất kể owner có deposit hay không." },
      ],
      correctOptionId: "c",
      explanation:
        "Invariant mẫu trong slide liên hệ tổng accounting balances với ETH thực tế contract nắm giữ. Công thức `$\\sum_i balances[i]$` là tổng số dư nội bộ của các user. Nếu bank không có nguồn ETH khác, giá trị này nên khớp `address(this).balance`. Hai lựa chọn còn lại không phải invariant hợp lệ vì gas và block time không cố định như vậy.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q58",
      prompt: "Symbolic execution như Mythril khác fuzzing chủ yếu ở điểm nào?",
      options: [
        { id: "a", text: "Nó chứng minh mọi property của contract mà không cần specification." },
        { id: "b", text: "Nó chỉ phân tích event logs sau khi contract đã deploy lên mainnet." },
        { id: "c", text: "Nó dùng symbolic values và constraint solving để tìm input dẫn tới bad state." },
        { id: "d", text: "Nó chỉ thử input ngẫu nhiên nhưng với số lượng lớn hơn fuzzing thông thường." },
      ],
      correctOptionId: "c",
      explanation:
        "Symbolic execution coi input như biến ký hiệu thay vì một giá trị cụ thể. Công cụ xây constraints theo từng nhánh và dùng solver để tìm input thỏa điều kiện dẫn tới lỗi. 'Constraint solver' là bộ giải các ràng buộc logic/toán học. Phương pháp này có thể khám phá sâu hơn fuzzing ở một số path nhưng vẫn không tự động tương đương formal verification toàn diện.",
      source: "Session 8, slide 28",
    },
    {
      id: "bc-s8-q59",
      prompt: "Formal verification như Certora hướng tới mục tiêu nào?",
      options: [
        { id: "a", text: "Mô phỏng UI interaction để kiểm tra wallet và frontend." },
        { id: "b", text: "Chạy nhiều random inputs cho tới khi không thấy assertion nào fail." },
        { id: "c", text: "Tìm regex pattern nguy hiểm trong source code giống một linter." },
        { id: "d", text: "Chứng minh implementation thỏa một specification trong phạm vi được mô hình hóa." },
      ],
      correctOptionId: "d",
      explanation:
        "Formal verification sử dụng mathematical reasoning để chứng minh các property đã viết trong specification. 'Specification' là mô tả chính xác contract phải thỏa điều gì. Kết quả mạnh hơn testing trong scope được mô hình hóa, nhưng chi phí viết spec và proof cao hơn. Certora được slide nêu như ví dụ cho hướng tiếp cận này.",
      source: "Session 8, slide 28",
    },
    {
      id: "bc-s8-q60",
      prompt: "Phát biểu nào diễn đạt đúng sự khác nhau giữa test và proof trong Session 8?",
      options: [
        { id: "a", text: "Test luôn bao phủ mọi path, còn proof chỉ kiểm tra một số ví dụ cụ thể." },
        { id: "b", text: "Nếu unit test pass thì formal proof không thể tìm thêm bất kỳ vấn đề nào." },
        { id: "c", text: "Test kiểm tra các paths đã chạy; proof có thể bao phủ mọi path trong scope của mô hình." },
        { id: "d", text: "Proof chỉ là test chạy nhiều lần hơn nên hai khái niệm không khác về guarantee." },
      ],
      correctOptionId: "c",
      explanation:
        "Testing cho evidence dựa trên executions cụ thể, còn formal proof nhắm tới guarantee rộng hơn trong phạm vi specification và assumptions. Câu 'tests show presence of bugs; proofs show absence within scope' nhấn mạnh khác biệt về mức đảm bảo. Tuy nhiên proof chỉ mạnh bằng model/spec của nó; phạm vi sai vẫn có thể bỏ sót rủi ro thực tế.",
      source: "Session 8, slide 28",
    },
    {
      id: "bc-s8-q61",
      prompt: "Vì sao câu “audited ≠ safe” là đúng?",
      options: [
        { id: "a", text: "Audit chỉ là snapshot của một commit và scope tại một thời điểm." },
        { id: "b", text: "Audit chỉ kiểm tra formatting nên không liên quan tới vulnerability." },
        { id: "c", text: "Mọi contract đã audit đều có bug nghiêm trọng chưa được tìm thấy." },
        { id: "d", text: "Audit chỉ hữu ích cho testnet và không áp dụng cho protocol có tài sản thật." },
      ],
      correctOptionId: "a",
      explanation:
        "Audit là expert review nhưng bị giới hạn bởi phạm vi và thời gian. Một report thường áp dụng cho một commit cụ thể và một set assumptions cụ thể. Sau audit, code change, dependency change hoặc market dynamics có thể làm threat model khác đi. Vì vậy audit giảm risk chứ không loại bỏ risk.",
      source: "Session 8, slide 29",
    },
    {
      id: "bc-s8-q62",
      prompt: "Bug bounty đóng vai trò gì trong secure-development lifecycle?",
      options: [
        { id: "a", text: "Tạo incentive để white-hat báo lỗ hổng có trách nhiệm trước khi black-hat khai thác." },
        { id: "b", text: "Thay thế static analysis và audit bằng việc chờ cộng đồng tự tìm bug sau deploy." },
        { id: "c", text: "Tự động pause contract mỗi khi có người gửi một vulnerability report." },
        { id: "d", text: "Bảo đảm protocol không thể bị khai thác vì attacker sẽ luôn chọn nhận thưởng." },
      ],
      correctOptionId: "a",
      explanation:
        "Bug bounty là chương trình thưởng cho researcher báo lỗi theo quy trình responsible disclosure. 'White-hat' là người kiểm thử có phép và báo cáo để sửa; 'black-hat' khai thác vì lợi ích riêng. Bounty là một lớp bổ sung sau các bước engineering khác, không phải replacement. Slide nhắc Immunefi là một nền tảng lớn cho mô hình này.",
      source: "Session 8, slide 30",
    },
    {
      id: "bc-s8-q63",
      prompt: "Monitoring sau deployment nên ưu tiên nhóm tín hiệu nào?",
      options: [
        { id: "a", text: "Chỉ theo dõi token price vì security incidents luôn làm giá giảm trước khi state bị ảnh hưởng." },
        { id: "b", text: "Chỉ kiểm tra compiler version vì bytecode không thể gặp rủi ro mới sau deploy." },
        { id: "c", text: "Chỉ xem frontend error logs vì mọi exploit đều đi qua giao diện chính thức." },
        { id: "d", text: "On-chain events, invariant breaks, incident alerts và khả năng kích hoạt pause/runbook khi cần." },
      ],
      correctOptionId: "d",
      explanation:
        "Monitoring là lớp bảo vệ sau deploy. Team có thể theo dõi privileged events, lượng rút bất thường hoặc invariant bị phá. 'Incident runbook' là quy trình chuẩn bị sẵn cho tình huống khẩn cấp; 'pause switch' cho phép tạm dừng một số chức năng nếu thiết kế hỗ trợ. On-chain attacker không cần dùng frontend nên frontend logs không đủ.",
      source: "Session 8, slide 30",
    },
    {
      id: "bc-s8-q64",
      prompt: "Ghép incident với nguyên nhân nào đúng theo Session 8?",
      options: [
        { id: "a", text: "Ronin: unbounded loop; Wormhole: `tx.origin` phishing." },
        { id: "b", text: "Ronin: reentrancy trong withdraw; Wormhole: integer overflow trong reward." },
        { id: "c", text: "Ronin: validator-key compromise; Wormhole: signature-verification flaw." },
        { id: "d", text: "Ronin: weak randomness; Wormhole: sandwich attack trong DEX." },
      ],
      correctOptionId: "c",
      explanation:
        "Slide dùng hai bridge incident để cho thấy loss lớn thường không chỉ đến từ Solidity trick. Ronin liên quan compromise validator keys, còn Wormhole liên quan lỗi kiểm tra chữ ký cho phép mint token không có backing. 'Unbacked token' là token được tạo ra mà không có tài sản tương ứng khóa ở phía nguồn. Đây là lỗi trust/verification rất nghiêm trọng.",
      source: "Session 8, slide 31",
    },
    {
      id: "bc-s8-q65",
      prompt: "Bài học chính từ các bridge hack lớn trong Session 8 là gì?",
      options: [
        { id: "a", text: "Bridge chỉ cần dùng `nonReentrant` ở mọi function là đủ chống các loss lớn." },
        { id: "b", text: "Key management, signature verification và upgrade process có thể nguy hiểm ngang bug Solidity." },
        { id: "c", text: "Bridge chủ yếu thất bại vì gas quá cao nên security engineering ít quan trọng." },
        { id: "d", text: "Nếu Solidity code đã audit thì validator keys và upgrade permissions không còn là attack surface." },
      ],
      correctOptionId: "b",
      explanation:
        "Cross-chain bridge giữ tài sản lớn và phụ thuộc nhiều trust assumptions. Key management, multisig threshold, signature verification và upgrade authority đều có thể trở thành single point of failure. 'Operational security' là an toàn trong cách vận hành hệ thống, con người và khóa, không chỉ source code. Vì vậy threat model phải bao quát cả kỹ thuật lẫn vận hành.",
      source: "Session 8, slide 31",
    },
    {
      id: "bc-s8-q66",
      prompt: "Checklist secure coding của Session 8 ưu tiên lựa chọn nào?",
      options: [
        { id: "a", text: "Chỉ audit trước deploy; nếu report sạch thì không cần monitoring hoặc bug bounty." },
        { id: "b", text: "Tắt arithmetic checks, bỏ event để giảm gas và dựa vào frontend cho authorization." },
        { id: "c", text: "Dùng `tx.origin`, block timestamp randomness và tự viết lại thư viện để kiểm soát toàn bộ code." },
        { id: "d", text: "Kết hợp CEI/guard, access control, input validation, kiểm tra external calls và thư viện đã kiểm chứng." },
      ],
      correctOptionId: "d",
      explanation:
        "'Battle-tested' nghĩa là thư viện đã được sử dụng rộng rãi và trải qua review thực tế, ví dụ OpenZeppelin. Input validation gồm zero address, zero amount, array lengths và các precondition khác. External-call results phải được kiểm tra vì failure có thể không tự propagate ở low-level calls. Checklist là defense in depth, không phải một mẹo đơn lẻ.",
      source: "Session 8, slide 32",
    },
    {
      id: "bc-s8-q67",
      prompt: "Theo phần ethics của Session 8, cách sử dụng kỹ thuật exploit nào là phù hợp?",
      options: [
        { id: "a", text: "Chỉ exploit trong môi trường mình sở hữu hoặc được phép, rồi disclosure có trách nhiệm." },
        { id: "b", text: "Có thể tấn công contract công khai vì source code đã mở nên mặc nhiên có permission." },
        { id: "c", text: "Có thể dùng private key thật trong lab miễn là không chia sẻ mnemonic cho người khác." },
        { id: "d", text: "Có thể thử exploit mainnet nếu chỉ rút một lượng tiền nhỏ để chứng minh lỗ hổng." },
      ],
      correctOptionId: "a",
      explanation:
        "Kỹ thuật exploit trong khóa học phục vụ defensive security và authorized testing. 'Responsible disclosure' là báo lỗi qua kênh phù hợp để bên vận hành có cơ hội sửa, thay vì tự khai thác. Public source code không đồng nghĩa permission tấn công. Lab cũng yêu cầu dùng test account riêng và không dán mnemonic/private key giữ tiền thật.",
      source: "Session 8, slide 33 and Lab 8 page 1",
    },
    {
      id: "bc-s8-q68",
      prompt: "Trong Lab 8, ba honest users mỗi người deposit 10 ETH và Eve deposit thêm 1 ETH trước khi attack. Bank có bao nhiêu ETH ngay trước lần `withdraw()` đầu tiên của Eve?",
      options: [
        { id: "a", text: "31 ETH." },
        { id: "b", text: "29 ETH." },
        { id: "c", text: "40 ETH." },
        { id: "d", text: "30 ETH." },
      ],
      correctOptionId: "a",
      explanation:
        "Ba user đóng góp `$3 \\times 10 = 30$` ETH. Eve gửi thêm 1 ETH làm unit stake, nên bank có `$30 + 1 = 31$` ETH trước lần withdraw đầu tiên. Stake của Eve không phải lợi nhuận; đó là vốn ban đầu được đưa vào để thiết lập balance hợp lệ trong bank. Lab sau đó tính net profit sau khi trừ phần stake của chính Eve.",
      source: "Lab 8, target and Lab 08.1",
    },
    {
      id: "bc-s8-q69",
      prompt: "Trong Lab 8, nếu mỗi lần reentrant `withdraw()` trả đúng 1 ETH và callback tiếp tục khi bank còn ít nhất 1 ETH, số lần `withdraw()` được thực thi là bao nhiêu?",
      options: [
        { id: "a", text: "31 lần." },
        { id: "b", text: "1 lần." },
        { id: "c", text: "30 lần." },
        { id: "d", text: "32 lần." },
      ],
      correctOptionId: "a",
      explanation:
        "Bank có 31 ETH sau khi Eve deposit 1 ETH. Với unit `$u = 1$` ETH và tổng balance `$B = 31$` ETH, số lần rút là `$N = B/u = 31$`. Eve nhận tổng 31 ETH nhưng 1 ETH là stake của chính mình, nên net profit là 30 ETH trước khi tính gas theo cách test quy ước. Vòng lặp dừng khi bank balance nhỏ hơn `unit`.",
      source: "Lab 8, Q1",
    },
    {
      id: "bc-s8-q70",
      prompt: "Điều kiện nào dừng vòng reentrancy trong `receive()` của Attacker ở Lab 8?",
      options: [
        { id: "a", text: "EVM tự giới hạn mỗi function chỉ được gọi 30 lần trong một transaction." },
        { id: "b", text: "`balances[eve]` tự động giảm sau mỗi external call dù vulnerable bank chưa ghi state." },
        { id: "c", text: "`address(bank).balance < unit` nên callback không gọi `withdraw()` thêm." },
        { id: "d", text: "`tx.origin` đổi sang bank sau một số nested calls nên authorization fail." },
      ],
      correctOptionId: "c",
      explanation:
        "Attacker được viết để tiếp tục re-enter khi bank còn đủ ít nhất một `unit`. Khi balance bank xuống dưới unit, điều kiện vòng lặp không còn đúng và callback dừng. EVM không có rule '30 lần' cố định cho một function. Trong vulnerable version, `balances[eve]` vẫn giữ giá trị cũ cho tới quá muộn.",
      source: "Lab 8, Q1",
    },
    {
      id: "bc-s8-q71",
      prompt: "Nếu thay `.call{value: bal}(\"\")` bằng `transfer()` với 2300-gas stipend, kết luận nào đúng nhất theo Lab 8?",
      options: [
        { id: "a", text: "`transfer()` loại bỏ mọi loại reentrancy nên CEI và guard trở nên không cần thiết." },
        { id: "b", text: "Exact exploit có thể bị cản, nhưng 2300 gas không phải bản vá bền vững." },
        { id: "c", text: "`transfer()` không thể gửi ETH tới contract, vì vậy chỉ dùng được khi recipient là EOA." },
        { id: "d", text: "`transfer()` và `.call` hoàn toàn giống nhau về gas forwarding nên exploit chắc chắn chạy y hệt." },
      ],
      correctOptionId: "b",
      explanation:
        "`transfer()` historically chỉ forward 2300 gas, có thể khiến callback phức tạp không đủ gas. Tuy nhiên gas schedule của EVM có thể thay đổi và security không nên dựa vào giả định recipient 'không đủ gas để tấn công'. Bản vá thật là CEI, guard và thiết kế pull payment khi phù hợp. Đây là lý do slide/lab nói 'just use transfer' không phải real fix.",
      source: "Lab 8, Q2",
    },
    {
      id: "bc-s8-q72",
      prompt: "Nếu CEI đã đặt `balances[eve] = 0` trước external call, vì sao vẫn thêm `nonReentrant`?",
      options: [
        { id: "a", text: "Để defense in depth, nhất là với cross-function reentrancy dùng chung state." },
        { id: "b", text: "Vì `nonReentrant` làm external call rẻ hơn nên luôn nên thêm để tối ưu gas." },
        { id: "c", text: "Vì Solidity không cho phép ghi storage trước `.call` nếu hàm không có modifier." },
        { id: "d", text: "Vì CEI chỉ hoạt động khi gửi ERC-20, còn ETH bắt buộc cần guard." },
      ],
      correctOptionId: "a",
      explanation:
        "CEI xử lý trực tiếp ordering của một flow cụ thể: nested `withdraw()` thấy balance đã bằng 0. Tuy nhiên contract có thể có hàm khác đọc hoặc sửa cùng state, tạo cross-function reentrancy. `nonReentrant` thêm một lock ở cấp execution để chặn nested entry trong vùng được bảo vệ. Đây là defense in depth, không phải requirement của compiler.",
      source: "Lab 8, Q3",
    },
    {
      id: "bc-s8-q73",
      prompt: "Trong patched EtherBank, guard bên trong revert nhưng test lại thấy message `transfer failed`. Vì sao?",
      options: [
        { id: "a", text: "Nested revert làm low-level `.call` trả `ok = false`; outer `require(ok, \"transfer failed\")` tạo revert reason mới." },
        { id: "b", text: "ReentrancyGuard không chạy vì modifier bị bỏ qua khi caller là contract." },
        { id: "c", text: "Solidity chỉ cho phép một revert message cố định cho toàn transaction và ưu tiên string gần đầu hàm." },
        { id: "d", text: "Hardhat luôn thay mọi custom error thành chuỗi `transfer failed` trong local network." },
      ],
      correctOptionId: "a",
      explanation:
        "Low-level `call` không nhất thiết propagate nguyên revert reason theo cách high-level call. Khi callback re-enter và bị guard chặn, call bên ngoài nhận failure flag `ok = false`. Sau đó `require(ok, \"transfer failed\")` revert với message của chính nó. Đây là ý của việc inner revert bị 'swallowed' ở boundary của low-level call.",
      source: "Lab 8, Q4",
    },
    {
      id: "bc-s8-q74",
      prompt: "Slither finding `State variables written after the call(s)` trên vulnerable `withdraw()` cho biết điều gì?",
      options: [
        { id: "a", text: "Contract có arithmetic overflow vì storage write dùng số nguyên." },
        { id: "b", text: "Contract ghi storage trước mọi external call nên đã tuân thủ CEI." },
        { id: "c", text: "Contract dùng quá nhiều memory nên call có thể out-of-gas." },
        { id: "d", text: "State được ghi sau external call, đúng pattern dễ dẫn tới reentrancy." },
      ],
      correctOptionId: "d",
      explanation:
        "Finding `reentrancy-eth` của Slither nhắm tới pattern external call xảy ra trước state write có liên quan. Đây chính là vulnerability trong EtherBank: balance bị zero quá muộn. Sau khi patch đúng CEI, finding này phải biến mất ở secure version. Static finding vẫn cần được đọc trong context, nhưng ở vulnerable version nó trúng nguyên nhân chính.",
      source: "Lab 8, Lab 08.3",
    },
    {
      id: "bc-s8-q75",
      prompt: "Slither vẫn báo `low-level-calls` trên secure `withdraw()`. Cách hiểu đúng nhất là gì?",
      options: [
        { id: "a", text: "Đó là signal cần review, không tự động đồng nghĩa với exploitable vulnerability." },
        { id: "b", text: "Chỉ cần thêm nhiều gas vào `.call` thì warning sẽ biến mất và security được bảo đảm." },
        { id: "c", text: "Mọi low-level call đều là exploitable vulnerability nên secure contract vẫn chắc chắn bị hack." },
        { id: "d", text: "Detector này chỉ là bug của Slither và có thể bỏ qua trong mọi project." },
      ],
      correctOptionId: "a",
      explanation:
        "Static analyzer thường báo pattern cần chú ý, không phải mọi finding đều là exploitable bug. Low-level call có nhiều rủi ro: return flag, reentrancy, unexpected recipient behavior. Nếu contract kiểm tra `ok`, tuân thủ CEI và có guard phù hợp, call có thể là thiết kế hợp lệ. 'Triage' là quá trình phân loại finding thành true positive, false positive hoặc informational.",
      source: "Lab 8, Q5",
    },
    {
      id: "bc-s8-q76",
      prompt: "Property test phù hợp nhất để chứng minh lỗi `setOwner()` không có modifier là gì?",
      options: [
        { id: "a", text: "Thử nhiều non-owner và xác nhận mỗi signer đều có thể chiếm ownership ở bản vulnerable." },
        { id: "b", text: "Đo gas của `setOwner()` với nhiều địa chỉ nhưng không kiểm tra state owner." },
        { id: "c", text: "Chỉ gọi `setOwner()` bằng owner hiện tại để kiểm tra happy path." },
        { id: "d", text: "Chỉ gọi getter `owner()` nhiều lần để xác nhận kết quả ổn định." },
      ],
      correctOptionId: "a",
      explanation:
        "Property cần chứng minh là 'caller bất kỳ có thể trở thành owner', nên test phải sweep nhiều signer khác nhau. Đây là property-style testing: kiểm tra một rule trên nhiều actor thay vì một example đơn lẻ. Sau patch, property mong muốn đảo lại: mọi non-owner phải bị từ chối. Lab còn gợi ý zero-address check và `OwnerChanged` event.",
      source: "Lab 8, Lab 08.4",
    },
    {
      id: "bc-s8-q77",
      prompt: "Nếu `onlyOwner` dùng `require(tx.origin == owner)`, malicious contract có thể phishing owner như thế nào?",
      options: [
        { id: "a", text: "Gửi ETH trực tiếp vào victim để EVM tự thay `tx.origin` bằng địa chỉ recipient." },
        { id: "b", text: "Dụ owner gọi contract độc hại; contract đó gọi tiếp victim khi `tx.origin` vẫn là owner." },
        { id: "c", text: "Tạo block mới có timestamp giả để victim đọc nhầm owner từ storage." },
        { id: "d", text: "Đổi `tx.origin` thành attacker bằng cách tăng gas price cao hơn transaction của owner." },
      ],
      correctOptionId: "b",
      explanation:
        "Phishing này lợi dụng việc `tx.origin` không đổi qua chuỗi internal/external calls trong cùng transaction. Owner tưởng mình đang gọi một dApp khác, nhưng malicious contract gọi victim ở phía sau. Victim kiểm tra `tx.origin == owner` nên cho qua dù immediate caller là attacker contract. Vì vậy authorization nên dùng `msg.sender` theo đúng trust model.",
      source: "Lab 8, Q6",
    },
    {
      id: "bc-s8-q78",
      prompt: "Pass condition đầy đủ của phần reentrancy trong Lab 8 là gì?",
      options: [
        { id: "a", text: "Cả vulnerable và secure bank đều phải bị drain để chứng minh test deterministic." },
        { id: "b", text: "Vulnerable bank bị drain về 0; bản patched phải chặn cùng attack và giữ nguyên 30 ETH." },
        { id: "c", text: "Chỉ cần Slither không còn warning nào, không cần chạy exploit test." },
        { id: "d", text: "Chỉ cần attacker nhận lại stake 1 ETH; bank còn bao nhiêu ETH không quan trọng." },
      ],
      correctOptionId: "b",
      explanation:
        "Lab được thiết kế theo phương pháp exploit-then-patch: trước hết chứng minh bug bằng một exploit test thực sự drain bank, sau đó giữ nguyên attack và chứng minh secure version chặn nó. Đây là cách test bản vá mạnh hơn chỉ kiểm tra code bằng mắt. Expected post-patch balance là 30 ETH vì attack transaction revert, bao gồm phần deposit tấn công của Eve.",
      source: "Lab 8, pass condition and Lab 08.2",
    },
    {
      id: "bc-s8-q79",
      prompt: "Một DeFi protocol dùng spot price từ pool nhỏ, authorization bằng `tx.origin`, payout loop hàng nghìn địa chỉ và đã audit sáu tháng trước. Đánh giá nào hợp lý nhất?",
      options: [
        { id: "a", text: "Chỉ cần thêm `nonReentrant` vào mọi function là bốn rủi ro trên đều được xử lý." },
        { id: "b", text: "Có nhiều attack surfaces độc lập: oracle, access control, DoS và rủi ro hậu-audit." },
        { id: "c", text: "Audit đã hoàn tất nên các vấn đề còn lại chỉ là optimization chứ không phải security risk." },
        { id: "d", text: "Chỉ oracle là vấn đề thật; `tx.origin` và payout loop an toàn nếu gas limit đủ lớn." },
      ],
      correctOptionId: "b",
      explanation:
        "Đây là bài tổng hợp threat modeling. Spot price nhỏ dễ manipulation; `tx.origin` dễ phishing; unbounded/push payout có thể DoS; audit là snapshot chứ không phải guarantee vĩnh viễn. Mỗi rủi ro cần defense tương ứng. Một modifier `nonReentrant` không giải quyết oracle, authorization hay unbounded computation.",
      source: "Session 8, synthesis of slides 14–30",
    },
    {
      id: "bc-s8-q80",
      prompt: "Pipeline nào phù hợp nhất cho team chuẩn bị deploy contract giữ lượng tài sản lớn?",
      options: [
        { id: "a", text: "Viết code → deploy sớm → chờ exploit thực tế → audit và sửa nếu còn tiền." },
        { id: "b", text: "Threat model → secure coding → tests/fuzz/invariants → Slither CI → audit → deploy → bounty/monitoring." },
        { id: "c", text: "Audit source draft → bỏ testing vì audit đã đủ → deploy → chỉ theo dõi token price." },
        { id: "d", text: "Thêm `nonReentrant` vào mọi function → tắt external calls warnings → deploy mà không cần threat model." },
      ],
      correctOptionId: "b",
      explanation:
        "Session 8 coi security là lifecycle nhiều lớp. Threat model định nghĩa assets/actors/invariants; secure coding giảm bug từ đầu; testing và static analysis tìm lỗi tự động; audit bổ sung human review; bounty và monitoring tiếp tục sau deploy. 'Battle-tested library' như OpenZeppelin giảm rủi ro tự viết lại primitive quen thuộc. Không có một bước nào là silver bullet.",
      source: "Session 8, slides 24–32",
    },
  ],
};
