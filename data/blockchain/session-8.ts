import type { Chapter } from "@/types/quiz";

export const session8: Chapter = {
  id: "session-8",
  title: "Session 8 — Smart Contract Security",
  description:
    "Smart contract security: vulnerability classes, reentrancy, access control, oracle manipulation, secure-development lifecycle, Slither, and Lab 8.",
  revision: "2026-10-06",
  questions: [
    {
      id: "bc-s8-q01",
      prompt: "Vì sao lỗi bảo mật trong smart contract thường nghiêm trọng hơn lỗi trong một ứng dụng web thông thường?",
      options: [
        { id: "a", text: "Smart contract luôn chạy nhanh hơn ứng dụng web" },
        { id: "b", text: "Smart contract không sử dụng database" },
        { id: "c", text: "Smart contract có thể trực tiếp nắm giữ tài sản, công khai cho mọi người gọi và code đã deploy khó sửa trực tiếp" },
        { id: "d", text: "Smart contract chỉ có thể được gọi bởi validator" },
      ],
      correctOptionId: "c",
      explanation:
        "Smart contract có thể giữ tài sản trực tiếp, chạy công khai trong môi trường đối kháng và code đã deploy thường khó sửa tại chỗ. Vì vậy một bug có thể dẫn trực tiếp đến mất tiền.",
      source: "Session 8, slides 4–5",
    },
    {
      id: "bc-s8-q02",
      prompt: "Một security reviewer đang phân tích một hàm Solidity. Tập câu hỏi nào phù hợp nhất với attacker’s mindset trong Session 8?",
      options: [
        { id: "a", text: "Hàm có tên đẹp không? Code có đủ comment không?" },
        { id: "b", text: "Ai được gọi? Có thể gọi lại trước khi hàm kết thúc không? Input cực đoan thì sao? Hàm đang tin tưởng thành phần nào?" },
        { id: "c", text: "Contract được viết bằng Solidity phiên bản nào? Có dùng VS Code không?" },
        { id: "d", text: "Contract deploy mất bao nhiêu phút?" },
      ],
      correctOptionId: "b",
      explanation:
        "Security review phải đọc code theo hướng đối kháng: quyền gọi, reentrancy, input cực đoan, trust assumptions và khả năng gây DoS.",
      source: "Session 8, slide 7",
    },
    {
      id: "bc-s8-q03",
      prompt: "Khi review một hàm nhận address target rồi gọi contract tại địa chỉ đó, giả định an toàn nhất là gì?",
      options: [
        { id: "a", text: "target luôn trung thực nếu là contract" },
        { id: "b", text: "target an toàn nếu có nhiều ETH" },
        { id: "c", text: "Xem target như một thành phần có thể độc hại" },
        { id: "d", text: "Chỉ EOA mới có thể độc hại" },
      ],
      correctOptionId: "c",
      explanation:
        "Một nguyên tắc của adversarial reading là coi mọi external address như có thể hostile cho tới khi có lý do rõ ràng để tin tưởng.",
      source: "Session 8, slide 7",
    },
    {
      id: "bc-s8-q04",
      prompt: "Flash loan làm thay đổi threat model của DeFi chủ yếu vì:",
      options: [
        { id: "a", text: "Attacker có thể giữ private key của validator" },
        { id: "b", text: "Attacker có thể vay lượng vốn rất lớn trong một transaction mà không cần collateral dài hạn" },
        { id: "c", text: "Flash loan tự động thay đổi bytecode" },
        { id: "d", text: "Flash loan làm transaction không cần gas" },
      ],
      correctOptionId: "b",
      explanation:
        "Flash loan cho phép attacker tạm thời có nguồn vốn lớn trong một transaction để thao túng giá hoặc khai thác các giả định kinh tế rồi hoàn trả khoản vay atomically.",
      source: "Session 8, slides 5 and 18",
    },
    {
      id: "bc-s8-q05",
      prompt: "Phát biểu nào mô tả đúng nhất ý nghĩa của public + composable đối với bảo mật smart contract?",
      options: [
        { id: "a", text: "Chỉ frontend chính thức mới gọi được contract" },
        { id: "b", text: "Contract khác có thể gọi contract của bạn ngay trong quá trình thực thi một transaction" },
        { id: "c", text: "Contract không thể tương tác với contract khác" },
        { id: "d", text: "Chỉ validator được phép gọi public function" },
      ],
      correctOptionId: "b",
      explanation:
        "Composability cho phép contract gọi lẫn nhau trong cùng transaction. Đây là sức mạnh của DeFi nhưng đồng thời tạo thêm attack surface như reentrancy.",
      source: "Session 8, slide 5",
    },
    {
      id: "bc-s8-q06",
      prompt: "Đâu là lỗi cốt lõi trong đoạn withdraw() gọi msg.sender.call{value: bal}(\"\") trước rồi mới đặt balances[msg.sender] = 0?",
      options: [
        { id: "a", text: "require(bal > 0) phải đặt cuối" },
        { id: "b", text: "Contract gửi ETH trước khi cập nhật state" },
        { id: "c", text: "Không được sử dụng biến bal" },
        { id: "d", text: "balances[msg.sender] phải tăng lên trước khi gửi" },
      ],
      correctOptionId: "b",
      explanation:
        "External interaction xảy ra trước effect, vi phạm Checks-Effects-Interactions và mở cửa cho reentrancy.",
      source: "Session 8, slide 9",
    },
    {
      id: "bc-s8-q07",
      prompt: "Tại sao .call{value: bal}(\"\") tạo cơ hội cho reentrancy?",
      options: [
        { id: "a", text: ".call tự động thay đổi msg.sender thành owner" },
        { id: "b", text: ".call xóa storage của contract" },
        { id: "c", text: "Nó chuyển quyền thực thi sang contract nhận ETH, cho phép receive() hoặc fallback() chạy trước khi caller tiếp tục" },
        { id: "d", text: ".call luôn gọi lại chính hàm hiện tại" },
      ],
      correctOptionId: "c",
      explanation:
        "Nếu state chưa được cập nhật trước external call, contract nhận có thể dùng callback để gọi ngược lại trong lúc caller vẫn đang ở giữa quá trình thực thi.",
      source: "Session 8, slides 8–9",
    },
    {
      id: "bc-s8-q08",
      prompt: "Trong vulnerable EtherBank, tại sao lần gọi withdraw() thứ hai của attacker vẫn vượt qua require(bal > 0)?",
      options: [
        { id: "a", text: "Solidity bỏ qua require khi gọi từ contract" },
        { id: "b", text: "balances[attacker] chưa được đặt về 0" },
        { id: "c", text: "msg.sender đã trở thành owner" },
        { id: "d", text: ".call tự động tăng balance" },
      ],
      correctOptionId: "b",
      explanation:
        "Vulnerable withdraw() cập nhật balance quá muộn. Khi attacker re-enter, state vẫn chứa balance cũ nên check tiếp tục pass.",
      source: "Session 8, slide 9",
    },
    {
      id: "bc-s8-q09",
      prompt: "Trình tự nào mô tả đúng một reentrancy attack điển hình?",
      options: [
        { id: "a", text: "Update balance → gửi ETH → attacker gọi deposit" },
        { id: "b", text: "Gửi ETH → attacker receive() → gọi lại withdraw() → state cũ vẫn còn → gửi ETH lần nữa" },
        { id: "c", text: "Gửi ETH → transaction kết thúc → attacker tạo transaction mới" },
        { id: "d", text: "Attacker sửa trực tiếp storage của victim" },
      ],
      correctOptionId: "b",
      explanation:
        "Điểm cốt lõi là attacker gọi ngược lại trước khi lần gọi trước hoàn tất và trước khi victim cập nhật state.",
      source: "Session 8, slides 8–9",
    },
    {
      id: "bc-s8-q10",
      prompt: "Điểm nào khiến reentrancy khác với việc attacker đơn giản gửi nhiều transaction withdraw() liên tục?",
      options: [
        { id: "a", text: "Reentrancy không cần gas" },
        { id: "b", text: "Reentrancy gọi lại contract trước khi lần gọi trước hoàn thành và trước khi state cần thiết được cập nhật" },
        { id: "c", text: "Reentrancy thay đổi private key" },
        { id: "d", text: "Reentrancy chỉ xảy ra giữa các block" },
      ],
      correctOptionId: "b",
      explanation:
        "Reentrancy khai thác call stack trong cùng một transaction, không phải chuỗi transaction độc lập.",
      source: "Session 8, slides 8–9",
    },
    {
      id: "bc-s8-q11",
      prompt: "The DAO năm 2016 liên quan đến lỗ hổng nào?",
      options: [
        { id: "a", text: "Integer overflow" },
        { id: "b", text: "Signature replay" },
        { id: "c", text: "Reentrancy trong đường rút tiền splitDAO" },
        { id: "d", text: "Weak randomness" },
      ],
      correctOptionId: "c",
      explanation:
        "The DAO bị khai thác bằng reentrancy trong đường rút tiền splitDAO.",
      source: "Session 8, slide 10",
    },
    {
      id: "bc-s8-q12",
      prompt: "Tổ hợp nào đúng về The DAO: (1) quỹ đầu tư crowd-funded trên Ethereum; (2) huy động khoảng 12,7 triệu ETH; (3) khoảng 3,6 triệu ETH bị rút; (4) sự kiện dẫn đến một hard fork gây chia rẽ cộng đồng?",
      options: [
        { id: "a", text: "Chỉ 1 và 2" },
        { id: "b", text: "Chỉ 2 và 3" },
        { id: "c", text: "1, 2, 3" },
        { id: "d", text: "Cả 1, 2, 3, 4" },
      ],
      correctOptionId: "d",
      explanation:
        "Cả bốn mệnh đề đều phù hợp với case study The DAO trong Session 8.",
      source: "Session 8, slide 10",
    },
    {
      id: "bc-s8-q13",
      prompt: "Sau sự kiện The DAO, kết quả nào đúng?",
      options: [
        { id: "a", text: "Chuỗi hard fork trở thành Ethereum Classic" },
        { id: "b", text: "Chuỗi không fork trở thành Ethereum hiện nay" },
        { id: "c", text: "Hard fork dẫn tới Ethereum hiện nay, còn chuỗi không fork tiếp tục dưới tên Ethereum Classic" },
        { id: "d", text: "Cả hai chain đều ngừng hoạt động" },
      ],
      correctOptionId: "c",
      explanation:
        "Chuỗi hard fork trở thành Ethereum hiện nay; chuỗi không fork tiếp tục tồn tại dưới tên Ethereum Classic.",
      source: "Session 8, slide 10",
    },
    {
      id: "bc-s8-q14",
      prompt: "Ghép loại reentrancy với mô tả nào đúng?",
      options: [
        { id: "a", text: "Single-function: gọi hàm khác; cross-function: gọi cùng hàm" },
        { id: "b", text: "Cross-function: re-enter một hàm khác có dùng chung state" },
        { id: "c", text: "Cross-contract: chỉ xảy ra trong một contract duy nhất" },
        { id: "d", text: "Read-only: attacker sửa code của view function" },
      ],
      correctOptionId: "b",
      explanation:
        "Cross-function reentrancy xảy ra khi attacker re-enter một hàm khác nhưng hai hàm chia sẻ state liên quan.",
      source: "Session 8, slide 11",
    },
    {
      id: "bc-s8-q15",
      prompt: "Read-only reentrancy nguy hiểm vì:",
      options: [
        { id: "a", text: "View function có thể trực tiếp ghi storage" },
        { id: "b", text: "Một thành phần có thể đọc state tạm thời chưa nhất quán giữa external call và state update rồi đưa ra quyết định dựa trên state đó" },
        { id: "c", text: "view tự động chuyển ETH" },
        { id: "d", text: "view không được gọi bởi contract khác" },
      ],
      correctOptionId: "b",
      explanation:
        "Read-only reentrancy không nhất thiết sửa state trực tiếp; vấn đề là bên đọc quan sát stale/intermediate state và hành động dựa trên dữ liệu sai thời điểm.",
      source: "Session 8, slide 11",
    },
    {
      id: "bc-s8-q16",
      prompt: "Thứ tự đúng của Checks-Effects-Interactions là:",
      options: [
        { id: "a", text: "External call → kiểm tra → cập nhật state" },
        { id: "b", text: "Cập nhật state → external call → kiểm tra" },
        { id: "c", text: "Kiểm tra điều kiện → cập nhật state → external interaction" },
        { id: "d", text: "Interaction → effect → check" },
      ],
      correctOptionId: "c",
      explanation:
        "CEI yêu cầu checks trước, effects lên state kế tiếp, rồi mới interactions với bên ngoài.",
      source: "Session 8, slide 12",
    },
    {
      id: "bc-s8-q17",
      prompt: "Đoạn nào tuân thủ CEI tốt hơn khi thực hiện withdraw?",
      options: [
        { id: "a", text: "sendEther(); balances[msg.sender] = 0;" },
        { id: "b", text: "uint256 bal = balances[msg.sender]; require(bal > 0); balances[msg.sender] = 0; sendEther();" },
        { id: "c", text: "sendEther(); require(balance > 0);" },
        { id: "d", text: "Cả A và C" },
      ],
      correctOptionId: "b",
      explanation:
        "Option B kiểm tra điều kiện, cập nhật state rồi mới thực hiện external interaction.",
      source: "Session 8, slide 12",
    },
    {
      id: "bc-s8-q18",
      prompt: "nonReentrant của ReentrancyGuard về bản chất hoạt động như thế nào?",
      options: [
        { id: "a", text: "Mã hóa ETH trước khi chuyển" },
        { id: "b", text: "Dùng một trạng thái khóa để phát hiện lời gọi lồng nhau và revert" },
        { id: "c", text: "Xóa msg.sender" },
        { id: "d", text: "Hạn chế gas ở mức 2300" },
      ],
      correctOptionId: "b",
      explanation:
        "ReentrancyGuard dùng một trạng thái lock/status. Nếu một lời gọi nonReentrant khác xảy ra khi lock còn bật, lời gọi lồng nhau sẽ revert.",
      source: "Session 8, slide 13",
    },
    {
      id: "bc-s8-q19",
      prompt: "Pull-over-push giúp giảm rủi ro như thế nào?",
      options: [
        { id: "a", text: "Contract tự loop qua hàng nghìn địa chỉ và gửi tiền" },
        { id: "b", text: "Mỗi người dùng tự gọi hàm để rút khoản tiền của mình thay vì contract chủ động trả hàng loạt" },
        { id: "c", text: "Toàn bộ ETH được chuyển cho owner trước" },
        { id: "d", text: "Không cho phép user rút tiền" },
      ],
      correctOptionId: "b",
      explanation:
        "Pull-over-push để từng user tự rút tiền, giảm phụ thuộc vào external recipients trong một payout loop và hạn chế reentrancy/DoS.",
      source: "Session 8, slide 13",
    },
    {
      id: "bc-s8-q20",
      prompt: "Tại sao Session 8 khuyến nghị kết hợp CEI, nonReentrant và pull-over-push?",
      options: [
        { id: "a", text: "Vì mỗi kỹ thuật tự động giảm gas" },
        { id: "b", text: "Vì đây là defense in depth, tránh phụ thuộc vào một cơ chế duy nhất" },
        { id: "c", text: "Vì Solidity yêu cầu phải sử dụng cả ba" },
        { id: "d", text: "Vì nonReentrant không hoạt động với ETH" },
      ],
      correctOptionId: "b",
      explanation:
        "Ba kỹ thuật bổ trợ nhau. CEI xử lý state ordering, guard chặn nested calls và pull-over-push giảm external-call risk.",
      source: "Session 8, slide 13",
    },
    {
      id: "bc-s8-q21",
      prompt: "Hàm nào có lỗi access control rõ ràng nhất?",
      options: [
        { id: "a", text: "function setOwner(address n) external onlyOwner { owner = n; }" },
        { id: "b", text: "function setOwner(address n) external { owner = n; }" },
        { id: "c", text: "function owner() external view returns(address)" },
        { id: "d", text: "function balance() external view returns(uint)" },
      ],
      correctOptionId: "b",
      explanation:
        "Một setter nhạy cảm không có onlyOwner/onlyRole cho phép bất kỳ caller nào thay đổi owner.",
      source: "Session 8, slide 14",
    },
    {
      id: "bc-s8-q22",
      prompt: "Một proxy có hàm initialize() dùng để gán owner nhưng hàm này không được bảo vệ. Rủi ro lớn nhất là:",
      options: [
        { id: "a", text: "Không ai gọi được contract" },
        { id: "b", text: "Một địa chỉ bất kỳ có thể gọi initialize() và trở thành owner" },
        { id: "c", text: "Gas tự động bằng 0" },
        { id: "d", text: "Contract chuyển thành EOA" },
      ],
      correctOptionId: "b",
      explanation:
        "Unprotected initializer là lỗi access control nghiêm trọng: bất kỳ ai cũng có thể chiếm quyền ownership nếu initializer chưa bị khóa đúng cách.",
      source: "Session 8, slide 14",
    },
    {
      id: "bc-s8-q23",
      prompt: "Tập nguyên tắc access control nào phù hợp nhất?",
      options: [
        { id: "a", text: "Maximum privilege + không phát event" },
        { id: "b", text: "Least privilege + modifier rõ ràng + event cho privileged actions + two-step ownership transfer" },
        { id: "c", text: "Dùng tx.origin cho mọi quyền admin" },
        { id: "d", text: "Cho tất cả hàm admin thành public" },
      ],
      correctOptionId: "b",
      explanation:
        "Session 8 nhấn mạnh least privilege, explicit modifiers, event cho hành động đặc quyền và two-step ownership transfer.",
      source: "Session 8, slide 14",
    },
    {
      id: "bc-s8-q24",
      prompt: "Sự khác biệt chính giữa tx.origin và msg.sender là:",
      options: [
        { id: "a", text: "Cả hai luôn giống nhau" },
        { id: "b", text: "tx.origin là contract gọi trực tiếp, msg.sender là EOA đầu tiên" },
        { id: "c", text: "tx.origin là EOA khởi tạo transaction, còn msg.sender là immediate caller" },
        { id: "d", text: "msg.sender luôn là validator" },
      ],
      correctOptionId: "c",
      explanation:
        "tx.origin giữ EOA bắt đầu transaction, còn msg.sender phản ánh caller trực tiếp ở frame gọi hiện tại.",
      source: "Session 8, slide 15",
    },
    {
      id: "bc-s8-q25",
      prompt: "Owner gọi Owner → Evil.claim() → Victim.adminFunction(). Bên trong Victim.adminFunction(), giá trị nào đúng?",
      options: [
        { id: "a", text: "tx.origin = Evil, msg.sender = Owner" },
        { id: "b", text: "tx.origin = Owner, msg.sender = Evil" },
        { id: "c", text: "Cả hai bằng Owner" },
        { id: "d", text: "Cả hai bằng Evil" },
      ],
      correctOptionId: "b",
      explanation:
        "tx.origin vẫn là EOA Owner đã khởi tạo transaction; msg.sender là Evil vì Evil là contract gọi trực tiếp Victim.",
      source: "Session 8, slide 15",
    },
    {
      id: "bc-s8-q26",
      prompt: "Parity multisig incident năm 2017 là sự kết hợp của vấn đề nào?",
      options: [
        { id: "a", text: "Reentrancy + oracle manipulation" },
        { id: "b", text: "Unprotected initializer + delegatecall + selfdestruct" },
        { id: "c", text: "Integer overflow + front-running" },
        { id: "d", text: "Signature replay + weak randomness" },
      ],
      correctOptionId: "b",
      explanation:
        "Shared library có initializer không được bảo vệ; attacker chiếm ownership rồi gọi selfdestruct, trong khi nhiều wallet phụ thuộc vào library qua delegatecall.",
      source: "Session 8, slide 16",
    },
    {
      id: "bc-s8-q27",
      prompt: "Điều gì xảy ra trong sự cố Parity được trình bày trong Session 8?",
      options: [
        { id: "a", text: "Khoảng 514k ETH bị attacker chuyển vào ví cá nhân" },
        { id: "b", text: "Khoảng 514k ETH bị khóa vĩnh viễn khi shared library bị phá hủy" },
        { id: "c", text: "Ethereum phải hard fork" },
        { id: "d", text: "Một DEX bị thao túng giá" },
      ],
      correctOptionId: "b",
      explanation:
        "Khoảng 514k ETH bị frozen, không phải bị đánh cắp. Đây là hậu quả của shared library bị selfdestruct.",
      source: "Session 8, slide 16",
    },
    {
      id: "bc-s8-q28",
      prompt: "Với Solidity < 0.8, điều gì có thể xảy ra với uint8 x = 255; x = x + 1;?",
      options: [
        { id: "a", text: "Luôn revert" },
        { id: "b", text: "x trở thành 0 do overflow wraparound" },
        { id: "c", text: "x trở thành 256" },
        { id: "d", text: "Compiler tự chuyển uint8 thành uint256" },
      ],
      correctOptionId: "b",
      explanation:
        "Trong Solidity trước 0.8, arithmetic overflow/underflow có thể wrap im lặng, do đó SafeMath từng rất cần thiết.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q29",
      prompt: "Trong Solidity >= 0.8, phát biểu nào đúng?",
      options: [
        { id: "a", text: "Overflow/underflow mặc định tự động revert" },
        { id: "b", text: "Luôn phải dùng SafeMath" },
        { id: "c", text: "Overflow luôn wrap về 0" },
        { id: "d", text: "Compiler bỏ qua arithmetic errors" },
      ],
      correctOptionId: "a",
      explanation:
        "Solidity 0.8+ mặc định kiểm tra overflow/underflow và revert nếu xảy ra.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q30",
      prompt: "Tại sao unchecked {} có thể trở thành một security footgun?",
      options: [
        { id: "a", text: "Nó cấm mọi phép tính" },
        { id: "b", text: "Các kiểm tra overflow/underflow được bỏ qua trong block đó" },
        { id: "c", text: "Nó làm msg.sender thay đổi" },
        { id: "d", text: "Nó tự động gọi external contract" },
      ],
      correctOptionId: "b",
      explanation:
        "unchecked cho phép bỏ kiểm tra arithmetic để tối ưu gas, nhưng nếu dùng sai có thể tái tạo overflow/underflow kiểu cũ.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q31",
      prompt: "Để hạn chế precision loss trong integer arithmetic, Session 8 khuyến nghị:",
      options: [
        { id: "a", text: "Divide trước rồi multiply" },
        { id: "b", text: "Multiply trước rồi divide và sử dụng scaling thích hợp" },
        { id: "c", text: "Chuyển toàn bộ sang float" },
        { id: "d", text: "Giả định mọi token có 18 decimals" },
      ],
      correctOptionId: "b",
      explanation:
        "Integer division bị truncate. Nên multiply trước, divide sau và dùng scaling phù hợp; đồng thời không giả định token nào cũng có 18 decimals.",
      source: "Session 8, slide 17",
    },
    {
      id: "bc-s8-q32",
      prompt: "Tại sao spot price lấy trực tiếp từ một DEX pool có thể nguy hiểm khi dùng làm oracle?",
      options: [
        { id: "a", text: "Spot price không bao giờ thay đổi" },
        { id: "b", text: "Giá có thể bị thay đổi đáng kể bởi một giao dịch lớn ngay trước lúc protocol đọc giá" },
        { id: "c", text: "DEX không sử dụng smart contract" },
        { id: "d", text: "Spot price luôn chậm một ngày" },
      ],
      correctOptionId: "b",
      explanation:
        "Spot price từ một pool phản ánh trạng thái giao dịch gần nhất và có thể bị attacker tạm thời bẻ cong nếu liquidity không đủ sâu.",
      source: "Session 8, slide 18",
    },
    {
      id: "bc-s8-q33",
      prompt: "Chuỗi hành động nào mô tả đúng một flash-loan oracle attack?",
      options: [
        { id: "a", text: "Vay lớn → thao túng pool → protocol đọc giá sai → kiếm lợi → trả flash loan trong cùng transaction" },
        { id: "b", text: "Vay lớn → giữ tiền một năm → trả" },
        { id: "c", text: "Manipulate private key của validator → thay bytecode" },
        { id: "d", text: "Chờ oracle cập nhật → hủy blockchain" },
      ],
      correctOptionId: "a",
      explanation:
        "Flash loan cho phép toàn bộ chuỗi thao túng giá, khai thác protocol và hoàn trả khoản vay diễn ra atomically trong một transaction.",
      source: "Session 8, slide 18",
    },
    {
      id: "bc-s8-q34",
      prompt: "Tập biện pháp nào phù hợp nhất để giảm oracle manipulation?",
      options: [
        { id: "a", text: "Một DEX spot price duy nhất" },
        { id: "b", text: "block.timestamp" },
        { id: "c", text: "TWAP + decentralized oracle + nhiều nguồn độc lập + sanity bounds" },
        { id: "d", text: "Chỉ tăng gas limit" },
      ],
      correctOptionId: "c",
      explanation:
        "Session 8 đề xuất TWAP, decentralized oracles như Chainlink, nhiều nguồn độc lập và sanity bounds.",
      source: "Session 8, slide 18",
    },
    {
      id: "bc-s8-q35",
      prompt: "MEV có thể xảy ra vì:",
      options: [
        { id: "a", text: "Pending transactions trong mempool có thể được quan sát trước khi được đưa vào block" },
        { id: "b", text: "Transaction được mã hóa hoàn toàn cho tới khi mined" },
        { id: "c", text: "Searcher không thể thay đổi thứ tự transaction" },
        { id: "d", text: "Validator không thể thấy transaction" },
      ],
      correctOptionId: "a",
      explanation:
        "Public mempool cho phép searchers quan sát pending transactions và tìm cách reorder/insert transaction để kiếm lợi.",
      source: "Session 8, slide 19",
    },
    {
      id: "bc-s8-q36",
      prompt: "Sandwich attack thường có cấu trúc:",
      options: [
        { id: "a", text: "Attacker bán trước và không làm gì sau đó" },
        { id: "b", text: "Attacker mua trước victim swap rồi bán sau victim swap" },
        { id: "c", text: "Victim mua trước attacker và nhận giá tốt hơn" },
        { id: "d", text: "Attacker chỉ gọi view" },
      ],
      correctOptionId: "b",
      explanation:
        "Attacker front-run để đẩy giá theo hướng bất lợi cho victim rồi back-run để chốt lợi nhuận sau victim swap.",
      source: "Session 8, slide 19",
    },
    {
      id: "bc-s8-q37",
      prompt: "Biện pháp nào KHÔNG thuộc nhóm defense chống front-running/MEV được Session 8 nêu?",
      options: [
        { id: "a", text: "Slippage limit" },
        { id: "b", text: "Commit-reveal" },
        { id: "c", text: "Private mempool/relay" },
        { id: "d", text: "Dùng tx.origin" },
      ],
      correctOptionId: "d",
      explanation:
        "Session 8 nêu slippage limits, commit-reveal, private mempools/relays và deadline params. tx.origin không phải defense MEV.",
      source: "Session 8, slide 19",
    },
    {
      id: "bc-s8-q38",
      prompt: "Lỗi unchecked external-call return xảy ra khi:",
      options: [
        { id: "a", text: "Contract kiểm tra ok sau .call" },
        { id: "b", text: ".call hoặc .send trả về false nhưng contract bỏ qua và vẫn cập nhật state như thể call thành công" },
        { id: "c", text: "Không có external call" },
        { id: "d", text: "Call chỉ đọc state" },
      ],
      correctOptionId: "b",
      explanation:
        "Nếu bỏ qua return value của low-level call, internal state có thể diverge khỏi kết quả thực tế của external interaction.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q39",
      prompt: "Điều nguy hiểm nhất khi delegatecall tới untrusted contract là gì?",
      options: [
        { id: "a", text: "Code bên ngoài chạy trong storage context của caller" },
        { id: "b", text: "delegatecall không thể truy cập storage" },
        { id: "c", text: "Nó luôn tạo contract mới" },
        { id: "d", text: "Nó chỉ gọi view" },
      ],
      correctOptionId: "a",
      explanation:
        "delegatecall chạy code đích trong context của caller, bao gồm storage, msg.sender và balance, nên target không đáng tin có thể dẫn tới takeover.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q40",
      prompt: "Một chữ ký hợp lệ bị attacker sử dụng lại nhiều lần. Đây là:",
      options: [
        { id: "a", text: "Reentrancy" },
        { id: "b", text: "Signature replay" },
        { id: "c", text: "Integer overflow" },
        { id: "d", text: "Gas griefing" },
      ],
      correctOptionId: "b",
      explanation:
        "Signature replay là việc reuse một chữ ký hợp lệ. Nonce, chainId và domain separation như EIP-712 giúp chống replay.",
      source: "Session 8, slide 20",
    },
    {
      id: "bc-s8-q41",
      prompt: "Một contract loop qua một array tăng dần theo thời gian. Sau vài năm, hàm không thể chạy hết trong block gas limit. Đây là:",
      options: [
        { id: "a", text: "DoS do unbounded loop" },
        { id: "b", text: "Reentrancy" },
        { id: "c", text: "Oracle manipulation" },
        { id: "d", text: "Replay attack" },
      ],
      correctOptionId: "a",
      explanation:
        "Unbounded loop trên dữ liệu tăng mãi có thể khiến gas vượt block gas limit và biến function thành không thể thực thi.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q42",
      prompt: "Một payout function loop qua 500 người. Chỉ cần một recipient revert thì toàn bộ payout revert. Đây là ví dụ của:",
      options: [
        { id: "a", text: "Gas griefing/DoS do external recipient" },
        { id: "b", text: "Signature replay" },
        { id: "c", text: "Arithmetic overflow" },
        { id: "d", text: "Weak randomness" },
      ],
      correctOptionId: "a",
      explanation:
        "Một recipient có thể cố ý hoặc vô tình revert và chặn cả payout loop. Pull-over-push giúp loại bỏ điểm nghẽn này.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q43",
      prompt: "Nguồn randomness nào bị Session 8 xem là yếu nếu dùng trực tiếp cho lottery?",
      options: [
        { id: "a", text: "Chainlink VRF" },
        { id: "b", text: "Commit-reveal" },
        { id: "c", text: "block.timestamp hoặc blockhash" },
        { id: "d", text: "Cryptographically secure off-chain random source" },
      ],
      correctOptionId: "c",
      explanation:
        "block.timestamp và blockhash có thể bị proposer ảnh hưởng hoặc dự đoán trong giới hạn nhất định, nên không phù hợp làm randomness trực tiếp cho lottery.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q44",
      prompt: "Một contract dùng require(address(this).balance == expectedBalance) cho business logic. Vì sao thiết kế này có thể nguy hiểm?",
      options: [
        { id: "a", text: "ETH có thể bị force-feed vào contract, làm balance thay đổi ngoài luồng accounting dự kiến" },
        { id: "b", text: "address(this).balance luôn bằng 0" },
        { id: "c", text: "Contract không thể nhận ETH" },
        { id: "d", text: "balance chỉ được thay đổi bởi owner" },
      ],
      correctOptionId: "a",
      explanation:
        "ETH có thể bị ép gửi vào contract trong một số cơ chế, nên không nên dựa tuyệt đối vào raw address balance như invariant business logic.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q45",
      prompt: "SWC Registry và SCSVS được Session 8 giới thiệu chủ yếu như:",
      options: [
        { id: "a", text: "Hai token standard" },
        { id: "b", text: "Bộ từ vựng/phân loại và chuẩn verification liên quan đến smart-contract security" },
        { id: "c", text: "Hai consensus algorithm" },
        { id: "d", text: "Hai DEX" },
      ],
      correctOptionId: "b",
      explanation:
        "SWC Registry là hệ thống phân loại weakness; SCSVS là verification standard cho smart-contract security.",
      source: "Session 8, slide 21",
    },
    {
      id: "bc-s8-q46",
      prompt: "Thứ tự nào phù hợp nhất với secure-development lifecycle trong Session 8?",
      options: [
        { id: "a", text: "Audit → code → threat model → deploy" },
        { id: "b", text: "Threat model → static analysis → fuzz/invariant → audit → bug bounty → monitor" },
        { id: "c", text: "Bug bounty → deploy → viết test" },
        { id: "d", text: "Monitor → threat model → xóa test" },
      ],
      correctOptionId: "b",
      explanation:
        "Session 8 trình bày lifecycle gồm threat modeling, static analysis, fuzz/invariant, audit, bug bounty và monitoring.",
      source: "Session 8, slides 23–24",
    },
    {
      id: "bc-s8-q47",
      prompt: "Threat model nên xác định những nhóm thông tin nào trước khi viết code?",
      options: [
        { id: "a", text: "Assets, actors, trust assumptions và invariants" },
        { id: "b", text: "Font, IDE và OS" },
        { id: "c", text: "Token price hiện tại" },
        { id: "d", text: "Số lượng comment trong code" },
      ],
      correctOptionId: "a",
      explanation:
        "Threat modeling yêu cầu xác định tài sản, tác nhân, các giả định tin cậy và những invariant phải luôn đúng.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q48",
      prompt: "Trong threat modeling, câu hỏi “What is worth stealing?” đang xác định:",
      options: [
        { id: "a", text: "Actor" },
        { id: "b", text: "Asset" },
        { id: "c", text: "Invariant" },
        { id: "d", text: "Compiler" },
      ],
      correctOptionId: "b",
      explanation:
        "Assets là những thứ có giá trị cần bảo vệ như funds, ownership hoặc price feeds.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q49",
      prompt: "Trong threat modeling, “sum of balances == totalSupply” là ví dụ của:",
      options: [
        { id: "a", text: "Actor" },
        { id: "b", text: "Trust assumption" },
        { id: "c", text: "Invariant" },
        { id: "d", text: "External call" },
      ],
      correctOptionId: "c",
      explanation:
        "Invariant mô tả một điều phải luôn đúng bất kể sequence hành động hợp lệ nào xảy ra.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q50",
      prompt: "Tại sao nên viết invariants sớm?",
      options: [
        { id: "a", text: "Chỉ để làm documentation đẹp hơn" },
        { id: "b", text: "Chúng có thể trở thành test oracle và monitoring alert" },
        { id: "c", text: "Chúng tự động deploy contract" },
        { id: "d", text: "Chúng loại bỏ nhu cầu testing" },
      ],
      correctOptionId: "b",
      explanation:
        "Invariant được dùng làm tiêu chí cho invariant tests và cũng có thể chuyển thành cảnh báo trong monitoring sau deploy.",
      source: "Session 8, slide 25",
    },
    {
      id: "bc-s8-q51",
      prompt: "Slither thuộc loại công cụ nào?",
      options: [
        { id: "a", text: "Dynamic debugger chạy transaction thật" },
        { id: "b", text: "Static analyzer cho Solidity" },
        { id: "c", text: "Wallet" },
        { id: "d", text: "Consensus client" },
      ],
      correctOptionId: "b",
      explanation:
        "Slither phân tích Solidity mà không cần chạy contract, nên thuộc static analysis.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q52",
      prompt: "Phát biểu nào đúng về Slither?",
      options: [
        { id: "a", text: "Chỉ chạy được với Remix" },
        { id: "b", text: "Có thể auto-detect dự án Hardhat và chạy bằng slither ." },
        { id: "c", text: "Chỉ phát hiện overflow" },
        { id: "d", text: "Mọi warning của Slither đều chắc chắn là exploitable vulnerability" },
      ],
      correctOptionId: "b",
      explanation:
        "Slither chạy trực tiếp trên Hardhat project. Tuy nhiên findings vẫn cần triage vì có warning chỉ mang tính thông tin.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q53",
      prompt: "Slither có thể phát hiện nhóm vấn đề nào?",
      options: [
        { id: "a", text: "Reentrancy, unchecked call, tx.origin, uninitialized storage và nhiều pattern khác" },
        { id: "b", text: "Chỉ lỗi syntax" },
        { id: "c", text: "Chỉ lỗi frontend" },
        { id: "d", text: "Chỉ lỗi network" },
      ],
      correctOptionId: "a",
      explanation:
        "Session 8 nêu Slither có thể phát hiện reentrancy, unchecked calls, tx.origin, uninitialized storage và khoảng 90 pattern khác.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q54",
      prompt: "Tại sao nên chạy Slither trong CI trên mỗi commit?",
      options: [
        { id: "a", text: "Để thay thế hoàn toàn audit" },
        { id: "b", text: "Vì static analysis là một lớp kiểm tra rẻ và nhanh, giúp bắt các pattern nguy hiểm sớm" },
        { id: "c", text: "Vì Solidity không compile nếu thiếu Slither" },
        { id: "d", text: "Để tăng gas" },
      ],
      correctOptionId: "b",
      explanation:
        "Static analysis rẻ, nhanh và phù hợp tự động hóa trong CI để phát hiện sớm các code pattern đáng ngờ.",
      source: "Session 8, slide 26",
    },
    {
      id: "bc-s8-q55",
      prompt: "Phân biệt nào đúng?",
      options: [
        { id: "a", text: "Property testing kiểm tra một rule trên nhiều input; fuzzing tạo input ngẫu nhiên để phá assertion" },
        { id: "b", text: "Property testing chỉ kiểm tra một input cố định" },
        { id: "c", text: "Fuzzing là formal verification" },
        { id: "d", text: "Invariant test chỉ gọi một function một lần" },
      ],
      correctOptionId: "a",
      explanation:
        "Property test kiểm tra rule trên nhiều input; fuzzing sinh input để cố phá assertion; invariant testing mở rộng sang chuỗi lời gọi.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q56",
      prompt: "Invariant testing thường làm gì?",
      options: [
        { id: "a", text: "Chạy một input duy nhất" },
        { id: "b", text: "Sinh chuỗi lời gọi khác nhau và kiểm tra invariant sau các bước" },
        { id: "c", text: "Chỉ compile code" },
        { id: "d", text: "Không chạy contract" },
      ],
      correctOptionId: "b",
      explanation:
        "Invariant testing tạo sequence lời gọi và kiểm tra invariant sau mỗi bước hoặc xuyên suốt quá trình.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q57",
      prompt: "Invariant nào phù hợp cho một bank contract trong ví dụ Session 8?",
      options: [
        { id: "a", text: "sum(user balances) == address(this).balance" },
        { id: "b", text: "Owner luôn có balance bằng 0" },
        { id: "c", text: "Mỗi user phải gọi deposit đúng một lần" },
        { id: "d", text: "Gas luôn bằng 21,000" },
      ],
      correctOptionId: "a",
      explanation:
        "Invariant mẫu trong slide là sau bất kỳ sequence deposit/withdraw hợp lệ nào, tổng accounting balances phải khớp với ETH thực tế trong contract.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q58",
      prompt: "Trong hệ sinh thái testing được slide nêu, lựa chọn nào đúng?",
      options: [
        { id: "a", text: "Hardhat property-style loops/fast-check; ngoài ra có Echidna và Foundry" },
        { id: "b", text: "Chỉ MetaMask" },
        { id: "c", text: "Chỉ Slither" },
        { id: "d", text: "Chỉ Chainlink" },
      ],
      correctOptionId: "a",
      explanation:
        "Session 8 gợi ý Hardhat property-style loops hoặc fast-check; các lựa chọn khác gồm Echidna và Foundry.",
      source: "Session 8, slide 27",
    },
    {
      id: "bc-s8-q59",
      prompt: "Symbolic execution như Mythril khác fuzzing ở điểm nào?",
      options: [
        { id: "a", text: "Nó phân tích các execution path và giải constraints để tìm input đưa chương trình tới bad state" },
        { id: "b", text: "Nó chỉ tạo input hoàn toàn ngẫu nhiên" },
        { id: "c", text: "Nó là một wallet" },
        { id: "d", text: "Nó không phân tích code" },
      ],
      correctOptionId: "a",
      explanation:
        "Symbolic execution khám phá các path và dùng constraint solving để tìm input có thể đưa chương trình tới trạng thái xấu.",
      source: "Session 8, slide 28",
    },
    {
      id: "bc-s8-q60",
      prompt: "Formal verification như Certora hướng tới điều gì?",
      options: [
        { id: "a", text: "Thử một vài example input" },
        { id: "b", text: "Chứng minh code thỏa một specification trong phạm vi được mô hình hóa" },
        { id: "c", text: "Thay đổi compiler version" },
        { id: "d", text: "Tạo private key" },
      ],
      correctOptionId: "b",
      explanation:
        "Formal verification đặt mục tiêu chứng minh implementation thỏa một specification, không chỉ kiểm tra một số execution cụ thể.",
      source: "Session 8, slide 28",
    },
    {
      id: "bc-s8-q61",
      prompt: "Phát biểu nào diễn đạt đúng sự khác nhau giữa testing và proof theo slide?",
      options: [
        { id: "a", text: "Testing có thể cho thấy bug tồn tại trên các path đã thử; proof có thể chứng minh property đúng trên toàn bộ path trong phạm vi" },
        { id: "b", text: "Testing luôn mạnh hơn formal verification" },
        { id: "c", text: "Formal verification chỉ random input" },
        { id: "d", text: "Hai phương pháp hoàn toàn giống nhau" },
      ],
      correctOptionId: "a",
      explanation:
        "Slide đối chiếu tests với proofs: test kiểm tra các path đã chạy, còn proof hướng tới đảm bảo trên toàn bộ path trong scope của mô hình/spec.",
      source: "Session 8, slide 28",
    },
    {
      id: "bc-s8-q62",
      prompt: "Tại sao “audited ≠ safe”?",
      options: [
        { id: "a", text: "Audit chỉ là snapshot theo commit, scope và thời điểm; code hoặc môi trường sau đó có thể thay đổi" },
        { id: "b", text: "Audit không bao giờ xem code" },
        { id: "c", text: "Audit chỉ dành cho Bitcoin" },
        { id: "d", text: "Contract audited chắc chắn có bug" },
      ],
      correctOptionId: "a",
      explanation:
        "Audit giảm rủi ro nhưng không phải bảo chứng. Nó bị giới hạn bởi commit, scope, deadline và có thể mất hiệu lực khi code, integration hay market condition thay đổi.",
      source: "Session 8, slide 29",
    },
    {
      id: "bc-s8-q63",
      prompt: "Bug bounty có vai trò gì trong lifecycle?",
      options: [
        { id: "a", text: "Khuyến khích white-hat báo lỗi có trách nhiệm trước khi black-hat khai thác" },
        { id: "b", text: "Thay thế toàn bộ testing" },
        { id: "c", text: "Tự động sửa bytecode" },
        { id: "d", text: "Ngăn mọi transaction" },
      ],
      correctOptionId: "a",
      explanation:
        "Bug bounty tạo động lực kinh tế để white-hat báo lỗ hổng có trách nhiệm trước khi attacker thực sự khai thác.",
      source: "Session 8, slide 30",
    },
    {
      id: "bc-s8-q64",
      prompt: "Monitoring sau khi deploy nên bao gồm:",
      options: [
        { id: "a", text: "Theo dõi on-chain events, cảnh báo invariant violation, incident runbook và pause mechanism" },
        { id: "b", text: "Chỉ nhìn token price" },
        { id: "c", text: "Xóa toàn bộ log" },
        { id: "d", text: "Không cần vì contract đã audit" },
      ],
      correctOptionId: "a",
      explanation:
        "Session 8 coi security là một loop. Monitoring phải theo dõi event, invariant break và chuẩn bị quy trình ứng phó như pause switch.",
      source: "Session 8, slide 30",
    },
    {
      id: "bc-s8-q65",
      prompt: "Ghép incident với nguyên nhân nào đúng?",
      options: [
        { id: "a", text: "Ronin: reentrancy; Wormhole: integer overflow" },
        { id: "b", text: "Ronin: validator key compromise; Wormhole: signature-verification flaw" },
        { id: "c", text: "Ronin: sandwich attack; Wormhole: weak randomness" },
        { id: "d", text: "Cả hai đều chỉ do gas" },
      ],
      correctOptionId: "b",
      explanation:
        "Slide nêu Ronin liên quan tới compromise validator keys, còn Wormhole là lỗi xác minh chữ ký dẫn đến mint token không có backing.",
      source: "Session 8, slide 31",
    },
    {
      id: "bc-s8-q66",
      prompt: "Bài học quan trọng từ các bridge hack lớn là gì?",
      options: [
        { id: "a", text: "Thiệt hại lớn luôn do một dòng Solidity overflow" },
        { id: "b", text: "Operational security như key management, signatures và upgrade mechanism có thể quan trọng ngang hoặc hơn bug Solidity" },
        { id: "c", text: "Bridge không giữ tài sản" },
        { id: "d", text: "Audit loại bỏ mọi rủi ro key management" },
      ],
      correctOptionId: "b",
      explanation:
        "Session 8 nhấn mạnh nhiều thiệt hại lớn đến từ operational failures như keys, signatures và upgrades chứ không chỉ từ một bug Solidity đơn lẻ.",
      source: "Session 8, slide 31",
    },
    {
      id: "bc-s8-q67",
      prompt: "Trong Lab 8, EtherBank ban đầu có ba honest users gửi 10 ETH mỗi người. Eve bắt đầu attack bằng stake 1 ETH. Ngay sau khi Eve deposit nhưng trước khi rút, bank đang giữ bao nhiêu ETH?",
      options: [
        { id: "a", text: "1 ETH" },
        { id: "b", text: "30 ETH" },
        { id: "c", text: "31 ETH" },
        { id: "d", text: "40 ETH" },
      ],
      correctOptionId: "c",
      explanation:
        "Alice, Bob và Carol gửi tổng 30 ETH; Eve deposit thêm 1 ETH trước khi gọi withdraw(), nên bank tạm thời giữ 31 ETH.",
      source: "Lab 8, target and Lab 08.1",
    },
    {
      id: "bc-s8-q68",
      prompt: "Trong Lab 8, nếu mỗi lần vulnerable withdraw() chuyển cho attacker đúng 1 ETH và attacker tiếp tục re-enter khi bank còn ít nhất 1 ETH, withdraw() sẽ thực thi bao nhiêu lần trong một attack() thành công?",
      options: [
        { id: "a", text: "1 lần" },
        { id: "b", text: "30 lần" },
        { id: "c", text: "31 lần" },
        { id: "d", text: "32 lần" },
      ],
      correctOptionId: "c",
      explanation:
        "Sau khi Eve deposit 1 ETH, bank có 31 ETH. Mỗi lần vulnerable withdraw() gửi 1 ETH, nên cần 31 lần để rút về 0. Eve lấy lại stake 1 ETH và có net profit 30 ETH.",
      source: "Lab 8, Q1",
    },
    {
      id: "bc-s8-q69",
      prompt: "Điều gì dừng vòng reentrancy trong receive() của Attacker trong Lab 8?",
      options: [
        { id: "a", text: "Eve hết allowance" },
        { id: "b", text: "address(bank).balance < unit, cụ thể bank đã bị rút về 0" },
        { id: "c", text: "Block mới được tạo" },
        { id: "d", text: "tx.origin thay đổi" },
      ],
      correctOptionId: "b",
      explanation:
        "Attacker tiếp tục re-enter while address(bank).balance >= unit. Khi bank không còn đủ 1 unit, vòng lặp dừng.",
      source: "Lab 8, Q1",
    },
    {
      id: "bc-s8-q70",
      prompt: "Lab dùng .call{value: bal}(\"\"). Nếu thay bằng transfer() với 2300-gas stipend, nhận định nào đúng nhất?",
      options: [
        { id: "a", text: "Đây là bản vá hoàn chỉnh và được khuyến nghị" },
        { id: "b", text: "Exact attack có thể bị cản do callback không đủ gas, nhưng dựa vào gas stipend là giải pháp mong manh; nên sửa state ordering bằng CEI và guard" },
        { id: "c", text: "Reentrancy chắc chắn vẫn chạy y hệt" },
        { id: "d", text: "transfer() không gửi ETH" },
      ],
      correctOptionId: "b",
      explanation:
        "transfer() có thể chặn exact exploit do giới hạn gas, nhưng 'just use transfer' không phải cách vá thật. Security nên dựa vào CEI, guard và thiết kế đúng thay vì giả định gas stipend.",
      source: "Lab 8, Q2",
    },
    {
      id: "bc-s8-q71",
      prompt: "Sau khi áp dụng CEI, re-entered withdraw() thấy balances[eve] == 0. Vậy tại sao Lab vẫn yêu cầu nonReentrant?",
      options: [
        { id: "a", text: "Vì CEI hoàn toàn vô dụng" },
        { id: "b", text: "Để tạo defense in depth và bảo vệ cả các dạng như cross-function reentrancy dùng chung state" },
        { id: "c", text: "Vì nonReentrant giảm gas" },
        { id: "d", text: "Vì CEI chỉ hoạt động với ERC-20" },
      ],
      correctOptionId: "b",
      explanation:
        "CEI xử lý trực tiếp state ordering của hàm, nhưng guard thêm một lớp bảo vệ cho nested calls, đặc biệt hữu ích với cross-function/cross-contract patterns.",
      source: "Lab 8, Q3",
    },
    {
      id: "bc-s8-q72",
      prompt: "Trong patched EtherBank, reentrant call bị ReentrancyGuard revert, nhưng test lại nhận message “transfer failed”. Vì sao?",
      options: [
        { id: "a", text: "ReentrancyGuard không hoạt động" },
        { id: "b", text: "Revert bên trong làm external low-level .call trả ok = false; sau đó outer require(ok, \"transfer failed\") tạo revert reason bên ngoài" },
        { id: "c", text: "Hardhat tự thay đổi message" },
        { id: "d", text: "Solidity luôn đổi mọi error thành transfer failed" },
      ],
      correctOptionId: "b",
      explanation:
        "Nested withdraw() revert trong callback khiến low-level call thất bại. Caller chỉ nhận ok = false, rồi outer require tạo message 'transfer failed'.",
      source: "Lab 8, Q4",
    },
    {
      id: "bc-s8-q73",
      prompt: "Slither báo trên vulnerable withdraw(): “State variables written after the call(s)”. Finding này chủ yếu chỉ ra điều gì?",
      options: [
        { id: "a", text: "Storage được cập nhật trước external call" },
        { id: "b", text: "State update xảy ra sau external interaction, một pattern liên quan tới reentrancy" },
        { id: "c", text: "Contract không compile" },
        { id: "d", text: "Contract dùng quá nhiều memory" },
      ],
      correctOptionId: "b",
      explanation:
        "Slither phát hiện state variable được ghi sau external call, đúng pattern dễ dẫn tới reentrancy trong vulnerable withdraw().",
      source: "Lab 8, Lab 08.3",
    },
    {
      id: "bc-s8-q74",
      prompt: "Slither vẫn báo low-level-calls trên secure withdraw(). Điều nào đúng nhất?",
      options: [
        { id: "a", text: "Chắc chắn contract vẫn exploitable" },
        { id: "b", text: "Đây là pattern cần review, không tự động đồng nghĩa với vulnerability; cần xem return value, CEI, guard và context" },
        { id: "c", text: "Slither bị hỏng" },
        { id: "d", text: "Mọi .call đều phải xóa" },
      ],
      correctOptionId: "b",
      explanation:
        "Static analyzer đưa ra findings để reviewer triage. low-level-calls có thể chỉ là cảnh báo vì low-level call cần được kiểm tra cẩn thận, không đồng nghĩa contract chắc chắn có lỗ hổng.",
      source: "Lab 8, Q5",
    },
    {
      id: "bc-s8-q75",
      prompt: "Trong bonus access-control lab, vulnerable setOwner() không có modifier. Property test thích hợp nhất là:",
      options: [
        { id: "a", text: "Chỉ test với owner" },
        { id: "b", text: "Thử nhiều signer khác nhau và chứng minh bất kỳ signer nào cũng có thể đổi owner" },
        { id: "c", text: "Chỉ kiểm tra gas" },
        { id: "d", text: "Chỉ gọi view" },
      ],
      correctOptionId: "b",
      explanation:
        "Lab yêu cầu sweep nhiều signer để chứng minh property xấu: bất kỳ caller nào cũng có thể seize ownership trên vulnerable contract.",
      source: "Lab 8, Lab 08.4",
    },
    {
      id: "bc-s8-q76",
      prompt: "Nếu onlyOwner được viết require(tx.origin == owner), kịch bản nào có thể bypass?",
      options: [
        { id: "a", text: "Owner được dụ gọi Evil.claim(), rồi Evil gọi vào protected contract; tx.origin vẫn là owner" },
        { id: "b", text: "Random user gọi thẳng protected contract" },
        { id: "c", text: "Validator thay đổi compiler" },
        { id: "d", text: "Contract tự gọi chính nó mà không có transaction" },
      ],
      correctOptionId: "a",
      explanation:
        "tx.origin vẫn là owner dù immediate caller là Evil, nên malicious contract có thể lợi dụng phishing để vượt authorization check sai.",
      source: "Lab 8, Q6",
    },
    {
      id: "bc-s8-q77",
      prompt: "Pass condition đầy đủ của phần reentrancy trong Lab 8 là gì?",
      options: [
        { id: "a", text: "Vulnerable và secure bank đều bị drain" },
        { id: "b", text: "Vulnerable bank bị drain về 0; sau patch, cùng attack phải revert và funds được giữ nguyên" },
        { id: "c", text: "Chỉ cần Slither chạy không lỗi" },
        { id: "d", text: "Chỉ cần deploy thành công" },
      ],
      correctOptionId: "b",
      explanation:
        "Lab yêu cầu chứng minh exploit trên bản vulnerable rồi chứng minh cùng attack thất bại trên bản patched.",
      source: "Lab 8, pass condition",
    },
    {
      id: "bc-s8-q78",
      prompt: "Trong patched lab, trước attack có 30 ETH của ba honest users. Sau khi cùng attack bị chặn đúng cách, expected bank balance là:",
      options: [
        { id: "a", text: "0 ETH" },
        { id: "b", text: "1 ETH" },
        { id: "c", text: "29 ETH" },
        { id: "d", text: "30 ETH" },
      ],
      correctOptionId: "d",
      explanation:
        "Attack phải revert hoàn toàn, nên 30 ETH của các honest depositors vẫn được bảo toàn trong bank.",
      source: "Lab 8, Lab 08.2",
    },
    {
      id: "bc-s8-q79",
      prompt: "Một DeFi protocol có: (1) spot price từ một pool nhỏ; (2) admin check bằng tx.origin; (3) payout loop gửi ETH cho hàng nghìn địa chỉ; (4) đã audit sáu tháng trước. Đánh giá nào đúng nhất?",
      options: [
        { id: "a", text: "An toàn vì đã audit" },
        { id: "b", text: "Chỉ có vấn đề oracle" },
        { id: "c", text: "Có nhiều attack surface độc lập: oracle manipulation, phishing access control, DoS và audit cũ không bảo đảm an toàn hiện tại" },
        { id: "d", text: "Chỉ cần thêm nonReentrant là giải quyết toàn bộ" },
      ],
      correctOptionId: "c",
      explanation:
        "Session 8 nhấn mạnh phải threat-model toàn hệ thống. Các vấn đề oracle, authorization, DoS và giới hạn của audit là độc lập và cần phòng thủ riêng.",
      source: "Session 8, synthesis of slides 14–30",
    },
    {
      id: "bc-s8-q80",
      prompt: "Một team chuẩn bị deploy contract giữ lượng tài sản lớn. Pipeline nào phù hợp nhất với toàn bộ Session 8?",
      options: [
        { id: "a", text: "Viết code → deploy → nếu bị hack mới audit" },
        { id: "b", text: "Threat model → dùng battle-tested libraries và secure patterns → test/fuzz/invariant → Slither trong CI → audit → deploy → bounty + monitoring" },
        { id: "c", text: "Audit trước khi viết code → bỏ testing → deploy" },
        { id: "d", text: "Chỉ dùng nonReentrant cho mọi function" },
      ],
      correctOptionId: "b",
      explanation:
        "Security là lifecycle nhiều lớp, không phải một modifier hoặc một lần audit. Pipeline cần threat model, secure coding, testing, static analysis, audit, bug bounty và monitoring.",
      source: "Session 8, slides 24–32",
    },
  ],
};
