import type { Chapter } from "@/types/quiz";

// Session 7 — Smart Contract Programming II: Token Standards
// Rebuilt after question review:
// - answer positions are balanced (17 A / 17 B / 17 C / 17 D)
// - distractors use similar specificity and technical vocabulary
// - detailed explanations include quick terminology definitions
// - KaTeX-compatible LaTeX is used for formulas
// Sources: Session07-slides.pdf + Lab 07 Token Standards worksheet.

export const session7: Chapter = {
  "id": "session-7",
  "title": "Session 7 — Token Standards",
  "description": "68 câu ôn tập về ERC-20, allowance, OpenZeppelin, EIP-2612 permit, ERC-721/1155, on-chain metadata, upgradeability, ERC-4626 và Lab 7. Distractor được cân bằng về độ dài và mức độ kỹ thuật để hạn chế đoán đáp án.",
  "revision": 0,
  "questions": [
    {
      "id": "bc-s7-q01",
      "prompt": "Vai trò chính của một token standard như ERC-20 là gì?",
      "options": [
        {
          "id": "a",
          "text": "Định nghĩa một interface chung để wallet, DEX và explorer có thể gọi token theo cùng một quy ước."
        },
        {
          "id": "b",
          "text": "Định nghĩa storage layout bắt buộc để mọi token lưu balance vào cùng các slot EVM."
        },
        {
          "id": "c",
          "text": "Định nghĩa monetary policy để mọi token có cùng supply, decimals và giá trị thị trường; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "d",
          "text": "Định nghĩa consensus rule để mọi token dùng cùng cơ chế tạo block và finality."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Token standard` là một chuẩn giao diện: nó quy định tên function, kiểu tham số, giá trị trả về và event mà ứng dụng có thể trông đợi. `Interface` không quyết định consensus hay giá token; nó quyết định cách phần mềm khác gọi contract. Lợi ích lớn là `composability`, tức nhiều ứng dụng có thể ghép nối với token mà không cần viết adapter riêng cho từng dự án.",
      "source": "Session 7, slide 6"
    },
    {
      "id": "bc-s7-q02",
      "prompt": "Theo cách trình bày trong Session 7, mối quan hệ giữa EIP và ERC được hiểu thế nào?",
      "options": [
        {
          "id": "a",
          "text": "EIP dành cho thay đổi consensus, còn ERC chỉ dành cho NFT nên hai hệ thống đánh số độc lập."
        },
        {
          "id": "b",
          "text": "ERC là bản triển khai Solidity bắt buộc, còn EIP chỉ là tài liệu mô tả bytecode đã deploy."
        },
        {
          "id": "c",
          "text": "ERC là proposal ở giai đoạn draft, sau khi final mới đổi tên thành EIP với số mới."
        },
        {
          "id": "d",
          "text": "EIP là proposal; khi proposal thuộc nhóm application standard và được dùng như chuẩn ứng dụng, nó được gọi ERC với cùng số."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`EIP` là Ethereum Improvement Proposal, tức đề xuất cải tiến cho hệ sinh thái Ethereum. `ERC` là Ethereum Request for Comments, thường dùng cho các application-level standard như token interface. Vì vậy EIP-20 và ERC-20 nói về cùng chuẩn token fungible, không phải hai chuẩn khác nhau.",
      "source": "Session 7, slide 6"
    },
    {
      "id": "bc-s7-q03",
      "prompt": "Phát biểu nào mô tả đúng nhất một ERC-20 token?",
      "options": [
        {
          "id": "a",
          "text": "Đó là một smart contract duy trì ledger số dư, trong đó các đơn vị cùng loại có thể thay thế cho nhau."
        },
        {
          "id": "b",
          "text": "Đó là collection mà mỗi đơn vị có tokenId riêng và ownerOf(tokenId) xác định chủ sở hữu."
        },
        {
          "id": "c",
          "text": "Đó là native coin được protocol tạo trực tiếp và không cần smart contract để theo dõi số dư; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "d",
          "text": "Đó là vault contract bắt buộc nhận asset rồi phát hành share theo tỷ lệ của pool."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Fungible` nghĩa là các đơn vị cùng loại tương đương nhau về mặt định danh, ví dụ 1 CTK không cần phân biệt với một CTK khác. ERC-20 thường duy trì một `ledger`, tức sổ cái logic gồm balance của từng address và allowance giữa owner với spender. Native coin như ETH khác ở chỗ nó được protocol xử lý trực tiếp chứ không phải một ERC-20 contract.",
      "source": "Session 7, slides 6–7"
    },
    {
      "id": "bc-s7-q04",
      "prompt": "Nhóm nào gồm đúng sáu function cốt lõi được liệt kê trong interface ERC-20 của Session 7?",
      "options": [
        {
          "id": "a",
          "text": "`deposit`, `mint`, `withdraw`, `redeem`, `convertToAssets`, `convertToShares`."
        },
        {
          "id": "b",
          "text": "`totalSupply`, `balanceOf`, `transfer`, `approve`, `allowance`, `transferFrom`."
        },
        {
          "id": "c",
          "text": "`safeTransferFrom`, `balanceOfBatch`, `uri`, `mintBatch`, `burnBatch`, `supportsInterface`."
        },
        {
          "id": "d",
          "text": "`balanceOf`, `ownerOf`, `approve`, `setApprovalForAll`, `transferFrom`, `tokenURI`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Sáu function này chia thành ba nhóm: đọc supply/balance, chuyển token trực tiếp, và quản lý allowance cho spender. `ownerOf`/`tokenURI` thuộc ERC-721; `deposit`/`redeem` gắn với ERC-4626; `balanceOfBatch`/`uri` gắn với ERC-1155. Nhận diện đúng interface giúp phân biệt các token standard trong câu hỏi trắc nghiệm.",
      "source": "Session 7, slide 7"
    },
    {
      "id": "bc-s7-q05",
      "prompt": "Cặp event chuẩn nào được liệt kê cùng interface ERC-20?",
      "options": [
        {
          "id": "a",
          "text": "`Transfer` ghi nhận việc di chuyển token; `Approval` ghi nhận việc owner đặt allowance cho spender."
        },
        {
          "id": "b",
          "text": "`Mint` ghi nhận phát hành token; `Burn` ghi nhận hủy token và cả hai đều bắt buộc trong EIP-20."
        },
        {
          "id": "c",
          "text": "`ApprovalForAll` ghi nhận operator; `URI` ghi nhận metadata và cả hai đều bắt buộc trong EIP-20; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "d",
          "text": "`Deposit` ghi nhận gửi asset; `Withdraw` ghi nhận rút asset và cả hai đều bắt buộc trong EIP-20."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Event` là log được ghi vào transaction receipt để phần mềm off-chain theo dõi hành động của contract. ERC-20 chuẩn hóa `Transfer` và `Approval`; mint/burn thường cũng biểu hiện thông qua `Transfer` với zero address thay vì cần hai event bắt buộc riêng. `ApprovalForAll` là khái niệm quen thuộc hơn ở NFT.",
      "source": "Session 7, slide 7"
    },
    {
      "id": "bc-s7-q06",
      "prompt": "Một token có `decimals() = 18`. Nếu raw balance của Alice là `$10^{18}$` base units thì UI nên hiển thị bao nhiêu token?",
      "options": [
        {
          "id": "a",
          "text": "`$0.18$` token, vì UI chia raw balance cho `$10^{19}$` để chừa một chữ số thập phân."
        },
        {
          "id": "b",
          "text": "`$18$` token, vì giá trị trả về của `decimals()` chính là số token được hiển thị."
        },
        {
          "id": "c",
          "text": "`$1$` token, vì `$1\\ \\text{token}=10^{18}$` base units khi `decimals = 18`."
        },
        {
          "id": "d",
          "text": "`$10^{18}$` token, vì EVM lưu balance dưới dạng integer nên UI không được đổi đơn vị."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Base unit` là đơn vị nguyên nhỏ nhất được contract lưu on-chain. Với `decimals = 18`, UI tính số token theo công thức `$\\text{display}=\\frac{\\text{raw balance}}{10^{18}}$`. `decimals` chỉ là metadata phục vụ cách hiển thị; EVM vẫn thao tác với integer và không lưu số thập phân theo kiểu 1.5 token.",
      "source": "Session 7, slide 8; Lab 7, Q2"
    },
    {
      "id": "bc-s7-q07",
      "prompt": "Vì sao việc hard-code `18` decimals cho mọi ERC-20 là một lỗi thiết kế?",
      "options": [
        {
          "id": "a",
          "text": "Vì EVM thay đổi decimals theo từng block, nên giá trị đúng phải đọc lại sau mỗi transaction."
        },
        {
          "id": "b",
          "text": "Vì decimals chỉ tồn tại trong MetaMask, còn contract không thể cung cấp function `decimals()`."
        },
        {
          "id": "c",
          "text": "Vì decimals là metadata theo từng token; có token dùng 6 decimals nên cùng một raw amount có cách hiển thị khác."
        },
        {
          "id": "d",
          "text": "Vì ERC-20 yêu cầu decimals luôn bằng số chữ số của totalSupply, nên giá trị phụ thuộc supply hiện tại; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Slide nêu USDC/USDT như ví dụ dùng 6 decimals. Nếu code giả định 18, phép quy đổi giữa raw amount và số token hiển thị có thể sai tới nhiều bậc độ lớn. `Metadata` ở đây là dữ liệu mô tả cách con người diễn giải token, chứ không biến balance on-chain thành floating-point.",
      "source": "Session 7, slide 8"
    },
    {
      "id": "bc-s7-q08",
      "prompt": "Khác biệt chính giữa `transfer(to, amount)` và `approve + transferFrom` là gì?",
      "options": [
        {
          "id": "a",
          "text": "`transfer` chỉ dùng giữa contract; `transferFrom` chỉ dùng giữa EOA nên hai function phục vụ hai loại account khác nhau; worksheet cũng giả định cơ chế đó trong flow triển khai."
        },
        {
          "id": "b",
          "text": "`transfer` luôn gọi code của contract nhận; `transferFrom` cố ý bỏ qua code nhận để tiết kiệm gas."
        },
        {
          "id": "c",
          "text": "`transfer` push token của chính caller; `approve + transferFrom` cho phép một spender pull token trong giới hạn allowance."
        },
        {
          "id": "d",
          "text": "`transfer` tạo allowance tạm thời; `transferFrom` xóa allowance rồi mint amount mới vào địa chỉ nhận."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Push` nghĩa là owner chủ động gửi token của mình. `Pull` nghĩa là spender đã được cấp quyền chủ động lấy token từ owner, tối đa bằng allowance. Mô hình pull rất quan trọng với DEX vì DEX cần lấy token của user bên trong transaction thực hiện swap, thay vì mong một transfer trước đó tự kích hoạt logic swap.",
      "source": "Session 7, slides 9–11; Lab 7, Q3"
    },
    {
      "id": "bc-s7-q09",
      "prompt": "Tại sao một DEX cần cơ chế `approve → transferFrom` thay vì chỉ yêu cầu user gửi `transfer` vào địa chỉ DEX?",
      "options": [
        {
          "id": "a",
          "text": "Vì `transfer` luôn bị EVM chặn nếu địa chỉ nhận là contract, còn `transferFrom` mới cho phép gửi tới contract; worksheet cũng giả định cơ chế đó trong flow triển khai."
        },
        {
          "id": "b",
          "text": "Vì `approve` đồng thời khóa giá swap, còn `transferFrom` chỉ dùng để giải phóng số token đã khóa."
        },
        {
          "id": "c",
          "text": "Vì ERC-20 `transfer` không tạo callback chuẩn để DEX tự chạy logic swap; allowance cho phép DEX pull token khi swap được gọi."
        },
        {
          "id": "d",
          "text": "Vì `transferFrom` không cần signature hoặc gas, nên DEX dùng nó để tránh mọi transaction từ user."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Một ERC-20 transfer tới contract không giống `safeTransferFrom` của ERC-721: chuẩn ERC-20 không bắt buộc callback ở phía nhận. `Allowance` là hạn mức chi tiêu mà owner giao cho spender. DEX dùng allowance để thực hiện token pull đúng thời điểm swap, trong cùng execution flow với logic trao đổi.",
      "source": "Session 7, slide 9; Lab 7, Q3"
    },
    {
      "id": "bc-s7-q10",
      "prompt": "`allowance[owner][spender]` biểu diễn điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Phí gas mà spender có quyền trừ từ native balance của owner khi gửi transaction."
        },
        {
          "id": "b",
          "text": "Số token tối đa mà owner được phép mint cho spender trong toàn bộ vòng đời contract."
        },
        {
          "id": "c",
          "text": "Balance dự phòng mà owner đã chuyển hẳn sang contract spender nhưng chưa được hạch toán."
        },
        {
          "id": "d",
          "text": "Hạn mức token mà spender còn được phép lấy từ owner thông qua `transferFrom`."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Allowance` là một ledger quyền chi tiêu tách khỏi ledger balance. Khi `transferFrom` thành công, implementation thông thường kiểm tra allowance rồi giảm phần đã tiêu, sau đó mới di chuyển balance. Có thể hiểu `approve` giống việc owner ký một hạn mức chi tiêu cho contract spender.",
      "source": "Session 7, slide 11"
    },
    {
      "id": "bc-s7-q11",
      "prompt": "Rủi ro chính của infinite approval `approve(spender, $2^{256}-1$)` là gì?",
      "options": [
        {
          "id": "a",
          "text": "Nếu spender bị compromise hoặc malicious, nó có thể tiếp tục kéo token tới mức rất lớn mà không cần owner ký approval mới."
        },
        {
          "id": "b",
          "text": "Infinite approval làm spender trở thành owner của token contract và có quyền upgrade implementation; worksheet cũng giả định cơ chế đó trong flow triển khai."
        },
        {
          "id": "c",
          "text": "Giá trị quá lớn làm EVM overflow ngay trong Solidity 0.8 và transaction approve luôn revert."
        },
        {
          "id": "d",
          "text": "Allowance cực lớn buộc token contract mint thêm supply để bảo đảm spender luôn có đủ token để rút."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Infinite approval` là cách đặt allowance gần giá trị uint256 tối đa để khỏi approve lại nhiều lần. `Compromise` nghĩa là spender contract hoặc quyền điều khiển nó bị chiếm; khi đó attacker có thể tận dụng allowance còn hiệu lực. Biện pháp thực tế là approve đúng lượng cần dùng và revoke quyền cũ khi không còn sử dụng.",
      "source": "Session 7, slide 12; Lab 7, Q3"
    },
    {
      "id": "bc-s7-q12",
      "prompt": "Approve race xuất hiện rõ nhất khi owner làm thao tác nào?",
      "options": [
        {
          "id": "a",
          "text": "Burn token của chính mình rồi kiểm tra totalSupply trong cùng một transaction."
        },
        {
          "id": "b",
          "text": "Đổi một allowance đang khác 0 sang một giá trị khác 0 trong lúc spender có thể front-run transaction thay đổi."
        },
        {
          "id": "c",
          "text": "Đổi allowance từ 0 sang 0, trong khi spender chưa từng nhận quyền chi tiêu trước đó; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "d",
          "text": "Gọi `balanceOf` nhiều lần trong cùng block và nhận về cùng một số dư chưa thay đổi."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Front-running` là việc một actor quan sát transaction đang chờ và đưa transaction của mình lên trước. Với approve race, spender có thể tiêu allowance cũ trước khi transaction đổi hạn mức được mined, rồi sau đó lại có allowance mới. Vì vậy slide khuyến nghị reset về 0 trước khi đặt hạn mức mới, hoặc dùng permit phù hợp.",
      "source": "Session 7, slide 13"
    },
    {
      "id": "bc-s7-q13",
      "prompt": "Theo Session 7, pattern nào giảm rủi ro khi thay đổi allowance từ giá trị cũ sang giá trị mới?",
      "options": [
        {
          "id": "a",
          "text": "Xóa balance của spender trước khi approve lại để mọi transaction đang pending tự động bị invalidate."
        },
        {
          "id": "b",
          "text": "Luôn chuyển sang `$2^{256}-1$` trước, sau đó giảm dần tới allowance mong muốn trong transaction kế tiếp."
        },
        {
          "id": "c",
          "text": "Đặt allowance về 0 trước, sau đó mới đặt giá trị mới; permit cũng là một lựa chọn khác."
        },
        {
          "id": "d",
          "text": "Dùng `increaseAllowance` và `decreaseAllowance` vì OpenZeppelin v5 bắt buộc hai function này cho mọi ERC-20."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Reset-to-zero tách việc hủy quyền cũ và cấp quyền mới thành hai trạng thái rõ ràng. Session 7 cũng nhắc OpenZeppelin v5 đã bỏ `increaseAllowance/decreaseAllowance` khỏi core ERC20 để không khuyến khích pattern có thể gây hiểu nhầm. `Permit` chuyển bước cấp quyền sang chữ ký off-chain có nonce và deadline.",
      "source": "Session 7, slide 13"
    },
    {
      "id": "bc-s7-q14",
      "prompt": "Cặp mô tả nào đúng về `_mint` và `_burn` trong ERC-20?",
      "options": [
        {
          "id": "a",
          "text": "`_mint` chuyển token từ zero address; `_burn` chuyển token sang owner nên tổng cung giữ nguyên."
        },
        {
          "id": "b",
          "text": "`_mint` làm tăng balance và totalSupply; `_burn` làm giảm balance và totalSupply."
        },
        {
          "id": "c",
          "text": "`_mint` và `_burn` chỉ thay allowance, còn balance và totalSupply không đổi."
        },
        {
          "id": "d",
          "text": "`_mint` chỉ đổi metadata decimals; `_burn` chỉ xóa event history mà không đổi supply."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Mint` là phát hành thêm token mới; `burn` là hủy token đang tồn tại. Vì vậy `totalSupply` theo dõi tổng lượng đã mint trừ lượng đã burn. Nhiều implementation biểu diễn mint/burn bằng event `Transfer` có zero address ở một đầu để giữ cách theo dõi thống nhất.",
      "source": "Session 7, slide 14"
    },
    {
      "id": "bc-s7-q15",
      "prompt": "`ERC20Capped` bổ sung ràng buộc nào?",
      "options": [
        {
          "id": "a",
          "text": "Một limit cho số lần transfer trong mỗi block, ngăn spam giao dịch token."
        },
        {
          "id": "b",
          "text": "Một deadline cho allowance, khiến mọi approval tự hết hạn sau một khoảng thời gian."
        },
        {
          "id": "c",
          "text": "Một ceiling cho total supply, ngăn mint làm tổng cung vượt quá cap đã định."
        },
        {
          "id": "d",
          "text": "Một floor cho balance từng holder, ngăn user transfer xuống dưới mức tối thiểu."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Cap` là trần tổng cung. Nếu ClassToken có cap một triệu token và mint toàn bộ cap lúc deploy, contract không thể mint thêm vượt trần đó. Cap khác với `allowance`: cap giới hạn supply toàn hệ thống, còn allowance giới hạn quyền chi tiêu của một spender đối với một owner.",
      "source": "Session 7, slide 14"
    },
    {
      "id": "bc-s7-q16",
      "prompt": "Vì sao `SafeERC20` hữu ích khi contract phải xử lý nhiều ERC-20 từ các dự án khác nhau?",
      "options": [
        {
          "id": "a",
          "text": "Nó tự động revoke mọi allowance sau một block để loại bỏ hoàn toàn approval risk; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "b",
          "text": "Nó bọc các token call và xử lý cả trường hợp token không trả bool hoặc trả false theo cách lệch chuẩn."
        },
        {
          "id": "c",
          "text": "Nó biến mọi external token thành ERC-721 để có callback `onERC721Received`."
        },
        {
          "id": "d",
          "text": "Nó ép mọi token chuyển sang 18 decimals trước khi contract tính toán amount."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Một số token cũ hoặc lệch chuẩn không trả `bool` đúng như ERC-20 mong đợi. `SafeERC20` cung cấp wrapper như `safeTransfer`, `safeTransferFrom` và `forceApprove` để xử lý các hành vi đó thống nhất hơn. `Wrapper` là lớp gọi trung gian giúp chuẩn hóa cách contract tương tác với nhiều implementation khác nhau.",
      "source": "Session 7, slide 15"
    },
    {
      "id": "bc-s7-q17",
      "prompt": "Lý do chính Session 7 khuyên dùng OpenZeppelin thay vì tự viết ERC-20 từ đầu là gì?",
      "options": [
        {
          "id": "a",
          "text": "OpenZeppelin bảo đảm contract không thể có bug nên dự án không còn cần test hoặc audit riêng."
        },
        {
          "id": "b",
          "text": "OpenZeppelin làm token trở thành native asset nên transfer không còn chạy qua smart contract."
        },
        {
          "id": "c",
          "text": "OpenZeppelin cung cấp implementation chuẩn cộng đồng đã được audit và sử dụng rộng rãi, giúp giảm code tự viết và attack surface."
        },
        {
          "id": "d",
          "text": "OpenZeppelin bắt buộc mọi token dùng cùng governance model và cùng private key của admin."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Audit` là quá trình rà soát code để tìm lỗi và rủi ro bảo mật; nó không phải lời bảo đảm tuyệt đối không có bug. `Attack surface` là tổng số điểm mà attacker có thể khai thác. Kế thừa implementation đã được battle-tested thường an toàn hơn việc tự tái hiện toàn bộ ERC-20 logic.",
      "source": "Session 7, slide 16; Lab 7, Q1"
    },
    {
      "id": "bc-s7-q18",
      "prompt": "Ghép extension ERC-20 nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "`ERC20Burnable` cho holder burn; `ERC20Pausable` hỗ trợ pause transfer; `ERC20Permit` thêm approval bằng chữ ký."
        },
        {
          "id": "b",
          "text": "`ERC20Pausable` thêm tokenId; `ERC20Capped` thêm safeMint; `ERC20Permit` thêm vault share."
        },
        {
          "id": "c",
          "text": "`ERC20Burnable` thêm hard cap; `ERC20Pausable` thêm permit; `ERC20Permit` thêm batch transfer; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "d",
          "text": "`ERC20Capped` thêm metadata URI; `ERC20Burnable` thêm ownerOf; `ERC20Permit` thêm royalty."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Các extension là module bổ sung hành vi lên ERC-20 cơ bản. `Pausable` hữu ích cho emergency stop, `Burnable` cho phép hủy token, `Capped` giới hạn supply, còn `Permit` triển khai EIP-2612. Slide nhấn mạnh chỉ compose những gì thực sự cần vì mỗi extension làm tăng code và logic phải tin cậy.",
      "source": "Session 7, slide 17"
    },
    {
      "id": "bc-s7-q19",
      "prompt": "Tình huống nào phù hợp với `AccessControl` hơn `Ownable`?",
      "options": [
        {
          "id": "a",
          "text": "Một wallet cá nhân chỉ cần giữ private key để ký transaction và không deploy contract."
        },
        {
          "id": "b",
          "text": "Một ERC-20 hoàn toàn không có function đặc quyền và không tồn tại bất kỳ admin action nào; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "c",
          "text": "Một demo lớp học chỉ cần một admin duy nhất gọi các function quản trị bằng `onlyOwner`."
        },
        {
          "id": "d",
          "text": "Một DAO cần tách `MINTER_ROLE` và `PAUSER_ROLE`, mỗi role có thể do nhiều address giữ và được grant/revoke riêng."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Ownable` dùng một owner duy nhất và modifier `onlyOwner`, phù hợp mô hình quản trị đơn giản. `AccessControl` dùng role có tên, cho phép nhiều holder và tách nhiệm vụ. `Least privilege` là nguyên tắc chỉ cấp đúng quyền cần thiết; AccessControl hỗ trợ nguyên tắc này tốt hơn khi hệ thống có nhiều trách nhiệm.",
      "source": "Session 7, slide 18"
    },
    {
      "id": "bc-s7-q20",
      "prompt": "Rủi ro quản trị đáng chú ý của mô hình một owner key là gì?",
      "options": [
        {
          "id": "a",
          "text": "Owner key làm `totalSupply` tự động tăng mỗi khi owner gửi một transaction quản trị."
        },
        {
          "id": "b",
          "text": "Owner key trở thành single point of failure: mất khóa hoặc lộ khóa có thể làm mất quyền quản trị hoặc bị chiếm quyền."
        },
        {
          "id": "c",
          "text": "Owner key làm contract không thể emit event vì event chỉ hoạt động với AccessControl."
        },
        {
          "id": "d",
          "text": "Owner key khiến mọi transaction của user phải được owner đồng ký, kể cả ERC-20 transfer thông thường; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Single point of failure` là một thành phần duy nhất có thể làm cả hệ thống gặp sự cố nếu nó hỏng hoặc bị chiếm. Với owner duy nhất, quyền mint/pause/upgrade có thể tập trung vào một key. Vì vậy slide nhấn mạnh phải cân nhắc ai giữ key và khi nào nên chia quyền bằng role hoặc governance.",
      "source": "Session 7, slide 18"
    },
    {
      "id": "bc-s7-q21",
      "prompt": "EIP-2612 `permit` giải quyết friction nào của flow ERC-20 truyền thống?",
      "options": [
        {
          "id": "a",
          "text": "Owner có thể ký approval off-chain thay vì tự gửi một transaction `approve` riêng trước khi spender sử dụng allowance."
        },
        {
          "id": "b",
          "text": "Owner có thể transfer token mà không cần signature vì permit thay thế hoàn toàn private key; cơ chế này được áp dụng trong cùng permit flow."
        },
        {
          "id": "c",
          "text": "DEX có thể bỏ qua allowance vì permit chuyển quyền sở hữu token contract cho relayer."
        },
        {
          "id": "d",
          "text": "Spender có thể mint token nếu owner hết balance, nhờ permit tự mở rộng totalSupply."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Friction` ở đây là thêm một transaction, thêm gas và thêm một bước tương tác trước khi swap. `Off-chain signature` là chữ ký được tạo ngoài blockchain nên việc ký tự nó không tốn gas. Sau đó một relayer hoặc spender có thể gửi `permit` on-chain để contract thiết lập allowance.",
      "source": "Session 7, slide 19"
    },
    {
      "id": "bc-s7-q22",
      "prompt": "Flow nào mô tả đúng EIP-2612 permit?",
      "options": [
        {
          "id": "a",
          "text": "Owner gửi private key cho relayer; relayer ký transaction và contract khôi phục private key on-chain."
        },
        {
          "id": "b",
          "text": "Owner gửi `approve`; spender gửi `permit`; cả hai transaction cùng cần owner trả gas."
        },
        {
          "id": "c",
          "text": "Owner ký EIP-712 message off-chain; relayer submit `permit`; contract verify signer rồi cập nhật allowance."
        },
        {
          "id": "d",
          "text": "Relayer ký thay owner; contract tin `msg.sender`; allowance được cập nhật mà không cần xác thực chữ ký; cơ chế này được áp dụng trong cùng permit flow."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Relayer` là bên gửi transaction thay người ký và có thể trả gas. `EIP-712 typed data` là định dạng chữ ký có cấu trúc, giúp người dùng và contract cùng hiểu rõ domain và fields đang được ký. Contract không biết private key; nó chỉ recover địa chỉ signer từ chữ ký rồi so sánh với owner.",
      "source": "Session 7, slide 19"
    },
    {
      "id": "bc-s7-q23",
      "prompt": "Trong EIP-2612, vai trò của per-owner `nonce` là gì?",
      "options": [
        {
          "id": "a",
          "text": "Mỗi permit hợp lệ tiêu thụ một nonce, nên cùng một chữ ký không thể được dùng lại lần thứ hai."
        },
        {
          "id": "b",
          "text": "Nonce xác định decimals của token để relayer biết cách hiển thị `value` trong UI."
        },
        {
          "id": "c",
          "text": "Nonce lưu số block còn lại trước khi chữ ký hết hạn và được giảm sau mỗi block."
        },
        {
          "id": "d",
          "text": "Nonce là gas budget tối đa relayer được phép tiêu khi submit transaction permit."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Nonce` là bộ đếm chống replay. Một signature được tạo cho nonce hiện tại; sau khi permit thành công, nonce tăng nên chữ ký cũ không còn khớp state mới. `Replay attack` là việc lấy lại một chữ ký hoặc message hợp lệ rồi phát lại để thực hiện hành động thêm lần nữa.",
      "source": "Session 7, slide 20; Lab 7, Q7"
    },
    {
      "id": "bc-s7-q24",
      "prompt": "Trong permit, `deadline` bảo vệ người ký khỏi tình huống nào?",
      "options": [
        {
          "id": "a",
          "text": "Một spender cố gọi `transferFrom` nhiều hơn số token owner đang có trong balance hiện tại."
        },
        {
          "id": "b",
          "text": "Một chữ ký cũ bị giữ lại quá lâu rồi mới được submit sau thời điểm owner còn muốn cấp quyền."
        },
        {
          "id": "c",
          "text": "Một relayer gửi transaction với gas price cao hơn mức trung bình của block."
        },
        {
          "id": "d",
          "text": "Một token contract thay đổi decimals sau khi signature được tạo nhưng trước khi permit được submit."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Deadline` là thời điểm hết hiệu lực của signature. Nó không thay thế nonce: nonce chống dùng lại, còn deadline giới hạn cửa sổ thời gian mà chữ ký có thể được chấp nhận. Trong Lab 7, expired permit phải revert với `ERC2612ExpiredSignature`.",
      "source": "Session 7, slide 20; Lab 7, page 4"
    },
    {
      "id": "bc-s7-q25",
      "prompt": "Vì sao `chainId` và `verifyingContract` được đưa vào EIP-712 domain của permit?",
      "options": [
        {
          "id": "a",
          "text": "Để wallet tự chuyển ERC-20 thành ERC-721 nếu cùng một symbol xuất hiện trên nhiều chain."
        },
        {
          "id": "b",
          "text": "Để contract có thể tính gas price từ chainId và lấy balance của relayer từ verifyingContract."
        },
        {
          "id": "c",
          "text": "Để owner không cần nonce vì domain đã tự bảo đảm mỗi signature chỉ dùng đúng một lần."
        },
        {
          "id": "d",
          "text": "Để ràng buộc chữ ký vào đúng chain và đúng token contract, hạn chế replay sang chain hoặc contract khác."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Domain separation` là kỹ thuật gắn chữ ký với một ngữ cảnh cụ thể. Ở đây `chainId` phân biệt blockchain, còn `verifyingContract` phân biệt contract xác minh chữ ký. Nonce vẫn cần để chống replay lần hai trên chính chain và contract đó; domain không thay thế nonce.",
      "source": "Session 7, slide 20; Lab 7, Q7"
    },
    {
      "id": "bc-s7-q26",
      "prompt": "Khác biệt khái niệm cốt lõi giữa ERC-20 và ERC-721 là gì?",
      "options": [
        {
          "id": "a",
          "text": "ERC-20 dùng account model; ERC-721 dùng UTXO model nên không thể chạy trên cùng EVM."
        },
        {
          "id": "b",
          "text": "ERC-20 luôn có fixed supply; ERC-721 luôn có unlimited supply nên không cần mint."
        },
        {
          "id": "c",
          "text": "ERC-20 chỉ dùng cho EOA; ERC-721 chỉ dùng cho contract account nên interface khác nhau; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "d",
          "text": "ERC-20 trả lời 'bao nhiêu'; ERC-721 trả lời 'token nào' vì mỗi NFT được nhận diện bằng một `tokenId` riêng."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Fungible` token quan tâm đến quantity, còn `non-fungible` token quan tâm identity. ERC-721 dùng `tokenId` để nhận diện từng NFT và `ownerOf(tokenId)` để biết chủ sở hữu. Hai chuẩn vẫn cùng chạy dưới dạng smart contract trên EVM.",
      "source": "Session 7, slide 23"
    },
    {
      "id": "bc-s7-q27",
      "prompt": "Trong ERC-721, `balanceOf(owner)` trả về gì?",
      "options": [
        {
          "id": "a",
          "text": "Tổng số ERC-721 đã được mint trong toàn bộ collection kể từ lúc deploy."
        },
        {
          "id": "b",
          "text": "Danh sách đầy đủ tokenId của owner theo thứ tự mint từ nhỏ đến lớn."
        },
        {
          "id": "c",
          "text": "Số lượng NFT mà owner đang nắm giữ, không phải tổng giá trị thị trường của chúng."
        },
        {
          "id": "d",
          "text": "TokenId gần nhất được chuyển vào owner trong transaction cuối cùng."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`balanceOf` ở ERC-721 là count, còn ownership của một NFT cụ thể được hỏi bằng `ownerOf(tokenId)`. Chuẩn cơ bản không bắt buộc `balanceOf` trả danh sách tokenId; muốn enumerate cần extension hoặc indexing off-chain. Đây là điểm dễ nhầm với ERC-20, nơi balance là lượng fungible units.",
      "source": "Session 7, slide 23"
    },
    {
      "id": "bc-s7-q28",
      "prompt": "ERC-721 cung cấp hai kiểu approval nào được Session 7 nhấn mạnh?",
      "options": [
        {
          "id": "a",
          "text": "`allowance` cho amount cụ thể và `permit` cho operator quản lý NFT tới deadline."
        },
        {
          "id": "b",
          "text": "`mintApproval` cho minter và `burnApproval` cho burner trong toàn bộ collection."
        },
        {
          "id": "c",
          "text": "`approve` cho một token cụ thể và `setApprovalForAll` cho operator quản lý toàn bộ NFT của owner."
        },
        {
          "id": "d",
          "text": "`transferApproval` cho một transaction và `batchApproval` cho danh sách tokenId."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`approve` gắn quyền với một `tokenId`; `setApprovalForAll` gắn quyền operator trên collection của owner. `Operator` là address được phép thực hiện transfer NFT thay owner trong phạm vi được cấp. Đây là mô hình khác allowance theo amount của ERC-20.",
      "source": "Session 7, slide 23"
    },
    {
      "id": "bc-s7-q29",
      "prompt": "Khi `_safeMint` hoặc `safeTransferFrom` gửi NFT tới một contract, điều gì được kiểm tra?",
      "options": [
        {
          "id": "a",
          "text": "Contract nhận phải có ETH balance lớn hơn giá floor của NFT để chứng minh khả năng thanh toán; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "b",
          "text": "Contract nhận phải là proxy upgradeable để có thể xử lý tokenId trong các version sau."
        },
        {
          "id": "c",
          "text": "Contract nhận phải implement `permit` để ký lại ownership trước khi NFT được ghi nhận."
        },
        {
          "id": "d",
          "text": "Contract nhận phải hỗ trợ `onERC721Received`; nếu handshake không đạt yêu cầu thì transfer revert."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Handshake` là bước bên gửi gọi một callback chuẩn ở bên nhận để xác nhận contract hiểu ERC-721. Điều này tránh NFT bị mắc kẹt trong contract không có logic nhận/chuyển NFT. Tuy nhiên đây chỉ là compatibility check, không chứng minh contract nhận là an toàn hoặc có ý định tốt.",
      "source": "Session 7, slide 24; Lab 7, Q5"
    },
    {
      "id": "bc-s7-q30",
      "prompt": "Vì sao chữ `safe` trong ERC-721 không nên được hiểu là 'recipient contract đã được audit'?",
      "options": [
        {
          "id": "a",
          "text": "Vì `safe` chỉ dùng khi mint; transfer giữa hai address luôn dùng logic hoàn toàn khác."
        },
        {
          "id": "b",
          "text": "Vì nó chỉ xác nhận contract nhận có callback ERC-721 phù hợp; nó không đánh giá logic hoặc mức độ đáng tin của contract đó."
        },
        {
          "id": "c",
          "text": "Vì `safe` chỉ nói transaction có gas refund, không liên quan khả năng nhận NFT của contract; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "d",
          "text": "Vì `safeTransferFrom` bỏ qua mọi callback và chỉ kiểm tra recipient có phải EOA hay không."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Compatibility` khác `security`. `onERC721Received` chỉ cho biết recipient hiểu protocol nhận NFT và trả đúng selector. Một contract vẫn có thể malicious hoặc có bug dù callback hợp lệ, nên 'safe' ở đây là tránh accidental lock, không phải chứng nhận an toàn.",
      "source": "Session 7, slide 24"
    },
    {
      "id": "bc-s7-q31",
      "prompt": "ERC-165 `supportsInterface(interfaceId)` được dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Cho phép contract đổi chuẩn từ ERC-721 sang ERC-1155 mà giữ nguyên mọi tokenId."
        },
        {
          "id": "b",
          "text": "Cho phép caller lấy toàn bộ source code từ bytecode để audit interface tại runtime; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "c",
          "text": "Cho phép wallet tự thêm function mới vào contract nếu interface hiện tại còn thiếu."
        },
        {
          "id": "d",
          "text": "Cho phép caller hỏi một contract có tuyên bố hỗ trợ interface như ERC-721 hay không."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Interface detection` là cơ chế phát hiện capability của contract bằng một interface ID. ERC-165 không tải source code và cũng không thay đổi contract; nó chỉ cung cấp một câu trả lời chuẩn hóa về interface được hỗ trợ. Điều này giúp wallet và contract khác tương tác có điều kiện.",
      "source": "Session 7, slide 24"
    },
    {
      "id": "bc-s7-q32",
      "prompt": "`tokenURI(tokenId)` trong ERC-721 có vai trò gì?",
      "options": [
        {
          "id": "a",
          "text": "Trả về private storage slot chứa tokenId để client đọc trực tiếp từ EVM."
        },
        {
          "id": "b",
          "text": "Trả về một URI để client tìm hoặc decode metadata JSON của NFT đó."
        },
        {
          "id": "c",
          "text": "Trả về address owner để client không cần gọi `ownerOf(tokenId)` nữa."
        },
        {
          "id": "d",
          "text": "Trả về raw SVG bắt buộc; chuẩn ERC-721 không cho phép JSON hoặc IPFS."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Metadata` là dữ liệu mô tả NFT, thường gồm `name`, `description`, `image`, `attributes`. `tokenURI` trả một URI chứ không bắt buộc vị trí lưu metadata: URI có thể trỏ IPFS, HTTP hoặc dùng `data:` URI encode dữ liệu ngay trong chuỗi trả về.",
      "source": "Session 7, slide 25"
    },
    {
      "id": "bc-s7-q33",
      "prompt": "Trong ví dụ ClassBadge, metadata JSON chứa nhóm field nào?",
      "options": [
        {
          "id": "a",
          "text": "`baseFee`, `priorityFee`, `gasLimit` và `receipt`, trong đó có trait `Block`."
        },
        {
          "id": "b",
          "text": "`name`, `description`, `image` và `attributes`, trong đó có trait `Student`."
        },
        {
          "id": "c",
          "text": "`implementation`, `admin`, `storageRoot` và `slot`, trong đó có trait `Proxy`."
        },
        {
          "id": "d",
          "text": "`owner`, `allowance`, `nonce` và `deadline`, trong đó có trait `Spender`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Attributes` là danh sách trait dùng để mô tả đặc điểm của NFT; mỗi phần tử thường có `trait_type` và `value`. Trong ClassBadge, trait `Student` lưu tên sinh viên. `image` có thể là một data URI của SVG đã Base64-encode.",
      "source": "Session 7, slide 25; Lab 7, page 2"
    },
    {
      "id": "bc-s7-q34",
      "prompt": "So sánh nào đúng giữa IPFS metadata và on-chain `data:` URI theo Session 7?",
      "options": [
        {
          "id": "a",
          "text": "IPFS lưu dữ liệu trực tiếp trong EVM storage; on-chain data URI chỉ lưu hash nên luôn rẻ hơn."
        },
        {
          "id": "b",
          "text": "IPFS không dùng content addressing; on-chain data URI bắt buộc phụ thuộc gateway để decode JSON; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "c",
          "text": "IPFS rẻ hơn cho dữ liệu lớn nhưng cần nội dung được pin; on-chain tự chứa nhưng chi phí lưu byte cao hơn."
        },
        {
          "id": "d",
          "text": "Hai cách có chi phí và availability giống nhau; khác biệt chỉ nằm ở phần mở rộng URI."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Pinning` là việc duy trì dữ liệu IPFS trên node để nội dung tiếp tục khả dụng. `Content addressing` nghĩa là CID phụ thuộc nội dung, nhưng nếu không có node giữ dữ liệu thì client có thể không lấy được file. On-chain data URI tự chứa trong code/storage nên bền hơn về availability nhưng tốn gas khi dữ liệu lớn.",
      "source": "Session 7, slide 27; Lab 7, Q4"
    },
    {
      "id": "bc-s7-q35",
      "prompt": "Vì sao Lab 7 chọn metadata on-chain thay vì IPFS?",
      "options": [
        {
          "id": "a",
          "text": "ERC-721 cấm sử dụng `ipfs://` nên mọi implementation hợp chuẩn đều phải encode Base64 on-chain; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "b",
          "text": "IPFS không hỗ trợ image hoặc JSON, nên chỉ có on-chain URI mới hiển thị được trong wallet."
        },
        {
          "id": "c",
          "text": "Base64 làm dữ liệu nhỏ hơn bản nhị phân nên luôn rẻ gas hơn lưu CID trong contract."
        },
        {
          "id": "d",
          "text": "TrustKeys trong lab không có IPFS gateway, nên data URI cho phép đọc JSON và SVG trực tiếp từ contract."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Gateway` là dịch vụ HTTP giúp client truy cập nội dung IPFS. Lab muốn không phụ thuộc explorer hay IPFS gateway, nên `tokenURI` trả dữ liệu Base64 tự chứa. Base64 không phải nén dữ liệu; nó là encoding, thường còn làm chuỗi dài hơn, nên lựa chọn này đổi chi phí gas lấy tính tự chứa.",
      "source": "Session 7, slides 27–28; Lab 7, Q4"
    },
    {
      "id": "bc-s7-q36",
      "prompt": "Trong ClassBadge, `Base64` và `Strings` của OpenZeppelin giúp xây metadata như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "`Strings` mã hóa private key; `Base64` ký metadata để contract có thể recover owner; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "b",
          "text": "`Strings` chuyển giá trị như tokenId thành text; `Base64` encode SVG và JSON để ghép thành `data:` URI."
        },
        {
          "id": "c",
          "text": "`Strings` tạo storage slot; `Base64` thực hiện delegatecall sang contract metadata."
        },
        {
          "id": "d",
          "text": "`Strings` tính hash CID; `Base64` pin file lên IPFS và trả về gateway URL."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Encoding` là biến dữ liệu sang một biểu diễn khác để truyền hoặc nhúng thuận tiện; nó không phải encryption. `data:application/json;base64,...` cho phép client decode JSON ngay từ chuỗi URI. SVG cũng có thể được Base64-encode rồi đặt vào field `image` dưới dạng data URI lồng bên trong.",
      "source": "Session 7, slide 28; Lab 7, page 2"
    },
    {
      "id": "bc-s7-q37",
      "prompt": "EIP-2981 cung cấp thông tin royalty theo cách nào?",
      "options": [
        {
          "id": "a",
          "text": "`royaltyInfo(tokenId, salePrice)` trả receiver và amount; marketplace vẫn tự quyết định có thực thi khoản royalty đó hay không."
        },
        {
          "id": "b",
          "text": "`royaltyInfo` khóa mọi transfer nếu marketplace không chứng minh đã thanh toán royalty on-chain."
        },
        {
          "id": "c",
          "text": "`royaltyInfo` thay đổi ownership của NFT để creator luôn giữ một phần quyền sở hữu sau mỗi sale."
        },
        {
          "id": "d",
          "text": "`royaltyInfo` tự chuyển ETH từ buyer sang creator trước khi marketplace được phép hoàn tất transfer NFT; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Royalty` là khoản phí dành cho creator khi NFT được bán lại. EIP-2981 chuẩn hóa cách hỏi 'trả cho ai, bao nhiêu', nhưng được slide gọi là `advisory`: chuẩn không cưỡng chế marketplace phải thanh toán. Vì vậy metadata/contract có thể nêu royalty nhưng execution phụ thuộc marketplace.",
      "source": "Session 7, slide 29"
    },
    {
      "id": "bc-s7-q38",
      "prompt": "EIP-5192 phù hợp nhất với loại NFT nào?",
      "options": [
        {
          "id": "a",
          "text": "Vault share cần quy đổi giữa underlying asset và share theo tỷ lệ pool; đây được xem là một phần của ownership/metadata model."
        },
        {
          "id": "b",
          "text": "Stablecoin cần giữ tỷ giá 1:1 với USD nhưng vẫn dùng interface ERC-721."
        },
        {
          "id": "c",
          "text": "DEX LP token cần batch transfer nhiều asset trong cùng một transaction."
        },
        {
          "id": "d",
          "text": "Credential hoặc badge cần trạng thái locked để không thể chuyển nhượng như NFT thông thường."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Soulbound` là cách gọi NFT không thể chuyển nhượng sau khi được gắn với một account. EIP-5192 cung cấp một interface tối giản để biểu diễn trạng thái `locked`. Use case phù hợp là chứng chỉ hoặc huy hiệu gắn với danh tính/thành tích, nơi transfer sẽ làm mất ý nghĩa.",
      "source": "Session 7, slide 29"
    },
    {
      "id": "bc-s7-q39",
      "prompt": "Đặc điểm phân biệt ERC-1155 với ERC-721 rõ nhất là gì?",
      "options": [
        {
          "id": "a",
          "text": "ERC-1155 không có token ID; mọi balance được gộp vào một mapping giống ERC-20."
        },
        {
          "id": "b",
          "text": "Một contract ERC-1155 có thể quản lý nhiều token ID, và mỗi ID có thể fungible hoặc non-fungible."
        },
        {
          "id": "c",
          "text": "ERC-1155 bắt buộc dùng proxy để mỗi token type có implementation riêng."
        },
        {
          "id": "d",
          "text": "Mỗi contract ERC-1155 chỉ có đúng một tokenId nhưng token đó có thể đổi decimals theo owner; đây được xem là một phần của ownership/metadata model."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Multi-token` nghĩa là một contract quản lý cả catalogue tài sản thay vì mỗi collection theo mô hình ERC-721 truyền thống. Một ID có thể đại diện 1,000 gold coins còn ID khác đại diện một item hiếm. Điều này đặc biệt hợp game và edition có nhiều loại asset.",
      "source": "Session 7, slide 30"
    },
    {
      "id": "bc-s7-q40",
      "prompt": "Lợi ích chính của `balanceOfBatch` và `safeBatchTransferFrom` trong ERC-1155 là gì?",
      "options": [
        {
          "id": "a",
          "text": "Nhiều token ID có thể được đọc hoặc chuyển theo lô trong một transaction, giảm overhead so với nhiều call riêng."
        },
        {
          "id": "b",
          "text": "Batch operation chỉ chạy off-chain rồi ghi một hash tổng hợp lên blockchain sau khi hoàn tất."
        },
        {
          "id": "c",
          "text": "Batch operation bỏ qua balance check để giảm gas, nên caller có thể chuyển amount tùy ý."
        },
        {
          "id": "d",
          "text": "Mỗi token ID được tự động chuyển thành một ERC-20 riêng trước khi batch operation chạy."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Batch` nghĩa là xử lý nhiều mục trong một lần gọi. Khi game cần chuyển nhiều vật phẩm, một batch transaction thường rẻ hơn nhiều transaction độc lập vì giảm overhead cố định. `safeBatchTransferFrom` vẫn kiểm tra quyền và balance; batch không có nghĩa bỏ qua validation.",
      "source": "Session 7, slide 30"
    },
    {
      "id": "bc-s7-q41",
      "prompt": "Metadata của ERC-1155 thường dùng pattern nào?",
      "options": [
        {
          "id": "a",
          "text": "Một URI template chứa `{id}`, để client thay token ID vào cùng một mẫu metadata."
        },
        {
          "id": "b",
          "text": "Một mapping on-chain bắt buộc lưu raw image bytes riêng cho từng token ID."
        },
        {
          "id": "c",
          "text": "Một `tokenURI(tokenId)` bắt buộc trả Base64 JSON hoàn chỉnh giống mọi ERC-721."
        },
        {
          "id": "d",
          "text": "Một CID duy nhất cho toàn contract và chuẩn cấm phân biệt metadata giữa các token ID."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`URI template` là chuỗi có placeholder được thay bằng ID cụ thể khi client lấy metadata. Cách này phù hợp collection lớn vì contract không cần lưu một URI độc lập cho từng ID. Chuẩn không bắt buộc metadata phải on-chain; vị trí lưu vẫn là quyết định thiết kế.",
      "source": "Session 7, slide 30"
    },
    {
      "id": "bc-s7-q42",
      "prompt": "Ghép nhu cầu với token standard nào đúng nhất theo rule of thumb của Session 7?",
      "options": [
        {
          "id": "a",
          "text": "Currency/points → ERC-20; item độc nhất → ERC-721; catalogue nhiều loại và batch → ERC-1155."
        },
        {
          "id": "b",
          "text": "Currency/points → ERC-1155; item độc nhất → ERC-20; catalogue nhiều loại → ERC-721."
        },
        {
          "id": "c",
          "text": "Currency/points → ERC-721; item độc nhất → ERC-1155; catalogue nhiều loại → ERC-20."
        },
        {
          "id": "d",
          "text": "Cả ba nhu cầu đều nên dùng ERC-20 vì mọi token standard cuối cùng đều lưu balance theo address."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Rule nhớ nhanh của slide là: `how much` → ERC-20, `which one` → ERC-721, `a catalogue` → ERC-1155. Đây không phải luật tuyệt đối nhưng giúp map use case với data model tự nhiên nhất. Credential không chuyển nhượng có thể dùng ERC-721 kết hợp EIP-5192.",
      "source": "Session 7, slide 31"
    },
    {
      "id": "bc-s7-q43",
      "prompt": "Vì sao một team có thể muốn thiết kế upgradeability cho smart contract?",
      "options": [
        {
          "id": "a",
          "text": "Vì EVM tự xóa bytecode sau một số block và proxy là cách duy nhất để duy trì contract address."
        },
        {
          "id": "b",
          "text": "Vì logic đã deploy thường immutable; một upgrade path có thể cho phép sửa bug hoặc thay đổi logic mà vẫn giữ state."
        },
        {
          "id": "c",
          "text": "Vì mọi ERC standard bắt buộc implementation phải được thay mới định kỳ để tiếp tục tương thích wallet; giả định này được áp dụng khi call đi qua proxy."
        },
        {
          "id": "d",
          "text": "Vì contract không thể giữ state qua nhiều block nếu không có proxy đứng trước implementation."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Immutable` nghĩa là code đã deploy không thể đơn giản sửa tại chỗ như server app. Proxy tạo một lớp indirection để cùng địa chỉ/state có thể chạy logic implementation khác. Tuy nhiên upgradeability là lựa chọn thiết kế chứ không bắt buộc; có dự án chọn contract bất biến rồi migrate khi cần.",
      "source": "Session 7, slide 32"
    },
    {
      "id": "bc-s7-q44",
      "prompt": "Trade-off lớn nhất của upgradeability được Session 7 nhấn mạnh là gì?",
      "options": [
        {
          "id": "a",
          "text": "Quyền upgrade cho phép một admin/governance thay code mà user đang tin tưởng, tạo thêm centralization và attack risk."
        },
        {
          "id": "b",
          "text": "Upgradeability làm mọi transaction phải trả gấp đôi gas vì EVM luôn execute cả V1 lẫn V2."
        },
        {
          "id": "c",
          "text": "Upgradeability loại bỏ event log nên frontend không thể theo dõi state sau khi implementation thay đổi."
        },
        {
          "id": "d",
          "text": "Upgradeability buộc contract dùng ERC-1155 thay vì ERC-20 hoặc ERC-721."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Centralization risk` xuất hiện khi một nhóm nhỏ có quyền viết lại rules sau deploy. `Attack risk` tăng vì upgrade key, admin process và implementation mới đều trở thành bề mặt tấn công. Các biện pháp giảm rủi ro gồm timelock, DAO governance hoặc giữ immutable rồi migrate.",
      "source": "Session 7, slide 32"
    },
    {
      "id": "bc-s7-q45",
      "prompt": "`delegatecall` trong proxy pattern thực thi code theo context nào?",
      "options": [
        {
          "id": "a",
          "text": "Nó chạy logic off-chain rồi gửi result trở lại proxy bằng event nên không thay đổi storage trực tiếp."
        },
        {
          "id": "b",
          "text": "Nó chỉ đọc bytecode của implementation để xác minh hash, còn mọi logic vẫn chạy trong proxy code."
        },
        {
          "id": "c",
          "text": "Nó chạy code và storage của implementation, sau đó copy state mới về proxy khi transaction kết thúc."
        },
        {
          "id": "d",
          "text": "Nó chạy code của implementation nhưng đọc/ghi storage của contract caller, tức proxy."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`delegatecall` giữ `address(this)` và storage context của caller trong khi mượn code từ target. Vì vậy proxy có thể giữ state ổn định còn implementation chỉ chứa logic. Đây cũng là lý do storage layout giữa các version phải tương thích.",
      "source": "Session 7, slide 34"
    },
    {
      "id": "bc-s7-q46",
      "prompt": "Trong proxy architecture của Session 7, proxy và implementation chia trách nhiệm thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Proxy và implementation giữ hai bản state độc lập rồi đồng bộ bằng event sau mỗi transaction."
        },
        {
          "id": "b",
          "text": "Implementation giữ toàn bộ state; proxy chỉ giữ ABI để frontend biết function nào có thể gọi."
        },
        {
          "id": "c",
          "text": "Proxy giữ state và implementation pointer; implementation cung cấp logic được gọi bằng `delegatecall`."
        },
        {
          "id": "d",
          "text": "Proxy giữ token balance; implementation giữ allowance nên mỗi upgrade chỉ ảnh hưởng một nửa state; giả định này được áp dụng khi call đi qua proxy."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Implementation pointer` là địa chỉ logic contract hiện tại mà proxy chuyển call tới. `State` phải nằm ở proxy vì user tương tác với địa chỉ proxy qua nhiều version. Implementation có thể thay đổi, nhưng cùng storage của proxy được diễn giải bởi code mới.",
      "source": "Session 7, slide 34"
    },
    {
      "id": "bc-s7-q47",
      "prompt": "Một upgrade V1 → V2 theo proxy pattern thường thay đổi thành phần nào?",
      "options": [
        {
          "id": "a",
          "text": "Storage của proxy bị xóa rồi được restore từ event log để V2 có layout mới hoàn toàn."
        },
        {
          "id": "b",
          "text": "ChainId được đổi để signature của V1 không còn hợp lệ và V2 trở thành contract mới."
        },
        {
          "id": "c",
          "text": "Implementation pointer được trỏ từ V1 sang V2; proxy address và state vẫn được giữ."
        },
        {
          "id": "d",
          "text": "Proxy address được thay bằng V2; toàn bộ user phải chuyển token sang địa chỉ mới để giữ state."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Indirection` cho phép đổi logic mà không đổi địa chỉ người dùng tương tác. Đây là giá trị chính của proxy: same address, same state, new logic. Nhưng việc giữ state cũng tạo yêu cầu chặt chẽ về storage layout.",
      "source": "Session 7, slide 34"
    },
    {
      "id": "bc-s7-q48",
      "prompt": "Khác biệt được slide nêu giữa Transparent proxy và UUPS là gì?",
      "options": [
        {
          "id": "a",
          "text": "Transparent giữ state ở implementation; UUPS giữ state ở EOA của admin."
        },
        {
          "id": "b",
          "text": "Transparent chỉ hỗ trợ ERC-20; UUPS chỉ hỗ trợ ERC-721 và ERC-1155."
        },
        {
          "id": "c",
          "text": "Transparent dùng `staticcall`; UUPS dùng `call` nên chỉ UUPS thay đổi state được."
        },
        {
          "id": "d",
          "text": "Transparent đặt upgrade logic ở proxy; UUPS đặt cơ chế upgrade trong implementation."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`UUPS` là pattern đưa logic upgrade vào implementation, thường làm proxy gọn hơn. `Transparent proxy` giữ cơ chế upgrade ở proxy và phân biệt admin call với user call. Cả hai vẫn dựa trên delegatecall để logic thao tác lên state của proxy.",
      "source": "Session 7, slide 34"
    },
    {
      "id": "bc-s7-q49",
      "prompt": "Trong UUPS, `_authorizeUpgrade` có ý nghĩa gì?",
      "options": [
        {
          "id": "a",
          "text": "Đó là hook encode metadata Base64 để explorer nhận ra version mới của contract."
        },
        {
          "id": "b",
          "text": "Đó là hook kiểm soát quyền: implementation quyết định caller nào được phép thực hiện upgrade."
        },
        {
          "id": "c",
          "text": "Đó là hook tự động rollback V2 nếu gasUsed của transaction đầu tiên cao hơn V1."
        },
        {
          "id": "d",
          "text": "Đó là hook chuyển mọi storage slot sang layout mới trước khi implementation pointer thay đổi."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Authorization` là kiểm tra ai được làm một hành động đặc quyền. Với UUPS, `_authorizeUpgrade` thường được override để gắn `onlyOwner` hoặc role phù hợp. Nếu cơ chế upgrade bị cấu hình sai, contract có thể bị khóa đường nâng cấp hoặc tệ hơn là bị người không được phép nâng cấp.",
      "source": "Session 7, slide 34"
    },
    {
      "id": "bc-s7-q50",
      "prompt": "Vì sao upgradeable implementation thường không dùng constructor để khởi tạo state của proxy?",
      "options": [
        {
          "id": "a",
          "text": "Constructor chạy khi deploy implementation và tác động context của implementation; proxy cần `initialize()` chạy trên storage của proxy."
        },
        {
          "id": "b",
          "text": "Constructor không tồn tại trong Solidity 0.8 nên upgradeable contract bắt buộc dùng function thường; giả định này được áp dụng khi call đi qua proxy. Đây là cơ chế được lựa chọn trong phương án này."
        },
        {
          "id": "c",
          "text": "Constructor luôn bị EVM gọi lại mỗi lần proxy nhận transaction, nên sẽ reset state liên tục."
        },
        {
          "id": "d",
          "text": "Constructor chỉ có thể gán constant, còn state variable khác bắt buộc phải khởi tạo bằng event."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Initializer` là function khởi tạo được gọi sau khi proxy được deploy và phải được bảo vệ để chỉ chạy một lần. Vì delegatecall làm logic chạy trên storage proxy, `initialize()` có thể thiết lập owner hoặc state đúng nơi. `initializer modifier` ngăn việc gọi lại và chiếm quyền sau này.",
      "source": "Session 7, slide 35"
    },
    {
      "id": "bc-s7-q51",
      "prompt": "Storage collision trong upgradeable contract là gì?",
      "options": [
        {
          "id": "a",
          "text": "Code V2 diễn giải các storage slot cũ theo layout khác, khiến state hiện có bị đọc/ghi sai mà có thể không revert."
        },
        {
          "id": "b",
          "text": "Hai user có cùng token balance nên mapping tạo cùng hash và ghi đè lên nhau trong mọi ERC-20; giả định này được áp dụng khi call đi qua proxy."
        },
        {
          "id": "c",
          "text": "Proxy và implementation có cùng address nên EVM không phân biệt contract nào sở hữu bytecode."
        },
        {
          "id": "d",
          "text": "Hai event có cùng signature nên receipt chỉ lưu được một event và làm mất state còn lại."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Storage layout` là thứ tự state variables được ánh xạ vào slot. Vì state nằm ở proxy, V2 phải tôn trọng layout mà V1 đã dùng. `Silent corruption` nghĩa là state bị hiểu sai nhưng transaction vẫn có thể thành công, khiến lỗi khó phát hiện hơn một revert rõ ràng.",
      "source": "Session 7, slide 35"
    },
    {
      "id": "bc-s7-q52",
      "prompt": "Cách thay đổi storage layout nào an toàn hơn khi nâng cấp từ V1 sang V2?",
      "options": [
        {
          "id": "a",
          "text": "Đổi thứ tự biến theo alphabet rồi thêm biến mới vào giữa để source code dễ đọc hơn."
        },
        {
          "id": "b",
          "text": "Xóa mọi biến cũ không còn dùng vì Solidity sẽ tự compact lại slot mà không ảnh hưởng state."
        },
        {
          "id": "c",
          "text": "Đổi kiểu dữ liệu của slot cũ sang kiểu nhỏ hơn để tiết kiệm gas rồi dùng cùng tên biến."
        },
        {
          "id": "d",
          "text": "Giữ nguyên các slot cũ, append biến mới ở cuối và có thể reserve storage gap; dùng OZ Upgrades kiểm tra layout."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Append-only` nghĩa là không reorder hoặc tái sử dụng tùy tiện các slot đã có state. `Storage gap` là vùng slot dự phòng để implementation tương lai có chỗ mở rộng trong một số pattern. OpenZeppelin Upgrades có thể kiểm tra compatibility, nhưng developer vẫn phải hiểu nguyên tắc layout.",
      "source": "Session 7, slide 35"
    },
    {
      "id": "bc-s7-q53",
      "prompt": "ERC-4626 mô tả mô hình nào?",
      "options": [
        {
          "id": "a",
          "text": "Một oracle contract tổng hợp giá từ nhiều DEX rồi mint stablecoin theo giá trung bình."
        },
        {
          "id": "b",
          "text": "Một tokenized vault nhận ERC-20 asset và phát hành share token đại diện phần sở hữu của depositor trong pool."
        },
        {
          "id": "c",
          "text": "Một NFT marketplace phát hành tokenId mới cho mỗi lệnh mua bán và tự thu royalty."
        },
        {
          "id": "d",
          "text": "Một multisig wallet yêu cầu nhiều owner ký EIP-712 message trước mỗi transfer."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Vault` là contract giữ tài sản và quản lý quyền rút/đổi tài sản đó. `Share` là token đại diện tỷ lệ sở hữu của user trong tài sản của vault. ERC-4626 chuẩn hóa cách deposit asset, mint share và quy đổi giữa hai đơn vị.",
      "source": "Session 7, slide 36"
    },
    {
      "id": "bc-s7-q54",
      "prompt": "Nhóm operation nào thuộc interface được Session 7 nhắc cho ERC-4626?",
      "options": [
        {
          "id": "a",
          "text": "`permit`, `nonces`, `DOMAIN_SEPARATOR`, cùng chữ ký EIP-712 cho allowance."
        },
        {
          "id": "b",
          "text": "`ownerOf`, `tokenURI`, `setApprovalForAll`, cùng phép kiểm tra `onERC721Received`; client tích hợp sẽ dựa trực tiếp vào cơ chế đó."
        },
        {
          "id": "c",
          "text": "`balanceOfBatch`, `safeBatchTransferFrom`, `uri`, cùng placeholder `{id}`."
        },
        {
          "id": "d",
          "text": "`deposit`, `mint`, `withdraw`, `redeem`, cùng các phép quy đổi giữa asset và share."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Deposit` thường vào theo lượng asset; `mint` thường nhắm tới lượng share. `Withdraw` thường rút một lượng asset; `redeem` thường đổi một lượng share. Chuẩn hóa các phép này giúp nhiều DeFi protocol tích hợp vault mà không cần API riêng cho từng dự án.",
      "source": "Session 7, slide 36"
    },
    {
      "id": "bc-s7-q55",
      "prompt": "Điều kiện pass chính của Lab 7 gồm những gì?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ cần deploy ClassToken lên TrustKeys và import MetaMask; ClassBadge được làm hoàn toàn off-chain."
        },
        {
          "id": "b",
          "text": "Chỉ cần compile hai contract local và chụp ảnh terminal; không cần deploy hoặc tương tác với token."
        },
        {
          "id": "c",
          "text": "Chỉ cần chạy Remix với một EOA thật trên mainnet và gửi 100 ETH để chứng minh network hoạt động."
        },
        {
          "id": "d",
          "text": "Tests phải green, deploy cả ClassToken và ClassBadge lên TrustKeys, transfer 100 CTK và decode được badge `tokenURI`."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Green tests` nghĩa là toàn bộ automated test đều pass. Lab không dừng ở compile: nó yêu cầu deploy, tương tác và đọc metadata thật trên TrustKeys. Đây là end-to-end workflow từ code → test → deploy → verify state.",
      "source": "Lab 7, page 1"
    },
    {
      "id": "bc-s7-q56",
      "prompt": "Thiết lập nào đúng với môi trường Lab 7?",
      "options": [
        {
          "id": "a",
          "text": "Node.js không cần thiết vì Hardhat chạy trong browser; TrustKeys dùng chainId 31337 giống local Hardhat."
        },
        {
          "id": "b",
          "text": "Node.js phải nhỏ hơn 18; MetaMask dùng Ethereum mainnet chainId 1 và account giữ real funds."
        },
        {
          "id": "c",
          "text": "Lab dùng Bitcoin regtest; MetaMask chỉ dùng để đọc address chứ không kết nối RPC."
        },
        {
          "id": "d",
          "text": "Node.js phải từ 18 trở lên; MetaMask dùng TrustKeys testnet với chainId 11968 và một dedicated test account được fund."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`RPC endpoint` là điểm kết nối để wallet hoặc script đọc/gửi dữ liệu tới blockchain. `ChainId` giúp phân biệt network và chống một số dạng cross-chain replay. `Dedicated test account` là account riêng cho thực hành, không chứa tài sản thật.",
      "source": "Lab 7, page 1"
    },
    {
      "id": "bc-s7-q57",
      "prompt": "Quy tắc bảo mật nào được worksheet nhấn mạnh khi cấu hình account cho Lab 7?",
      "options": [
        {
          "id": "a",
          "text": "Dùng main wallet để tránh quên seed phrase, nhưng mã hóa private key trong source code trước khi commit."
        },
        {
          "id": "b",
          "text": "Đưa mnemonic vào file test để Hardhat có thể tự khôi phục mọi account khi chạy CI."
        },
        {
          "id": "c",
          "text": "Không dùng mnemonic/private key giữ real funds; chỉ dùng test account riêng cho lab."
        },
        {
          "id": "d",
          "text": "Commit `.env` lên repository private vì private repo được xem là đủ an toàn cho secret."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Mnemonic` là chuỗi từ khôi phục wallet; ai có mnemonic thường có thể suy ra private key. `.env` cũng không nên commit nếu chứa secret. Lab yêu cầu cô lập rủi ro bằng account thử nghiệm riêng, vì sai thao tác trong code hoặc repo không được phép đe dọa tài sản thật.",
      "source": "Lab 7, page 1"
    },
    {
      "id": "bc-s7-q58",
      "prompt": "Vì sao Lab 7 pin `@openzeppelin/contracts@5.0.2` và target EVM `paris`?",
      "options": [
        {
          "id": "a",
          "text": "Hardhat không compile Solidity 0.8.24 với OpenZeppelin mới, bất kể network target nào."
        },
        {
          "id": "b",
          "text": "OpenZeppelin mới hơn dùng opcode Cancun `mcopy`, trong khi TrustKeys Geth của lab target Paris nên không chạy opcode đó."
        },
        {
          "id": "c",
          "text": "EVM Paris là phiên bản duy nhất hỗ trợ `delegatecall`, còn Cancun chỉ hỗ trợ staticcall."
        },
        {
          "id": "d",
          "text": "OpenZeppelin 5.0.2 là bản cuối cùng hỗ trợ ERC-20; các bản mới đã xóa toàn bộ token standard."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Opcode` là instruction cấp thấp mà EVM thực thi. Nếu bytecode chứa opcode mà network client chưa hỗ trợ, contract có thể deploy hoặc execute thất bại. Vì vậy pin dependency và EVM target là vấn đề compatibility, không phải vì ERC-20 biến mất ở bản mới. Worksheet đồng thời cấu hình Solidity `0.8.24`, optimizer bật với `runs: 200`. `Optimizer` là bước compiler tối ưu bytecode; `runs` định hướng mức tối ưu theo tần suất code dự kiến được gọi.",
      "source": "Session 7, slide 39; Lab 7, page 1"
    },
    {
      "id": "bc-s7-q59",
      "prompt": "ClassToken trong Lab 7 phải kế thừa tổ hợp nào?",
      "options": [
        {
          "id": "a",
          "text": "`ERC4626`, `ERC20Pausable`, `ReentrancyGuard`, với underlying asset là ETH."
        },
        {
          "id": "b",
          "text": "`ERC20`, `ERC20Capped`, `ERC20Permit`, với name `ClassToken` và symbol `CTK`."
        },
        {
          "id": "c",
          "text": "`ERC721`, `ERC721URIStorage`, `Ownable`, với name `ClassBadge` và symbol `CTK`."
        },
        {
          "id": "d",
          "text": "`ERC1155`, `ERC20Burnable`, `AccessControl`, với URI template dùng `{id}`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`ERC20Capped` thêm hard cap cho supply; `ERC20Permit` thêm EIP-2612 permit. Lab dùng đúng ba parent này cho ClassToken. `Name` và `symbol` là metadata giúp wallet hiển thị token, còn logic balance vẫn đến từ ERC-20. ClassToken có cap `$1{,}000{,}000 \\times 10^{18}$` base units và constructor mint toàn bộ cap cho `initialHolder`. Vì vậy ngay sau deploy, `cap()`, `totalSupply()` và balance của `initialHolder` phải bằng nhau.",
      "source": "Lab 7, page 2"
    },
    {
      "id": "bc-s7-q60",
      "prompt": "Vì sao ClassToken phải override `_update(...)` với `override(ERC20, ERC20Capped)`?",
      "options": [
        {
          "id": "a",
          "text": "Cả `ERC20` và `ERC20Capped` cùng định nghĩa logic liên quan `_update`, nên Solidity yêu cầu child contract giải quyết multiple inheritance."
        },
        {
          "id": "b",
          "text": "`_update` là constructor ẩn của ERC-20 nên phải gọi lại sau khi deploy để set name và symbol."
        },
        {
          "id": "c",
          "text": "`ERC20Capped` không kế thừa ERC-20 nên override được dùng để convert balance giữa hai token contract."
        },
        {
          "id": "d",
          "text": "`ERC20Permit` yêu cầu mọi token override `_update` để verify EIP-712 signature trong mỗi transfer."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Multiple inheritance` là khi một contract kế thừa từ nhiều parent. Nếu nhiều parent cùng cung cấp function cùng signature, Solidity cần child chỉ rõ override để compiler biết linearization và logic nào được gọi. Ở đây `_update` cũng là điểm ERC20Capped enforce cap.",
      "source": "Session 7, slide 39; Lab 7, page 2"
    },
    {
      "id": "bc-s7-q61",
      "prompt": "Behavior nào phải được test khi ClassToken transfer vượt balance?",
      "options": [
        {
          "id": "a",
          "text": "Transaction vẫn success nhưng allowance của sender bị giảm để bù phần balance thiếu."
        },
        {
          "id": "b",
          "text": "Transaction chuyển toàn bộ balance còn lại rồi emit event cho amount nhỏ hơn request."
        },
        {
          "id": "c",
          "text": "Transaction tự động mint phần thiếu cho sender miễn là totalSupply chưa vượt cap."
        },
        {
          "id": "d",
          "text": "Transaction phải revert với `ERC20InsufficientBalance` thay vì tạo balance âm hoặc mint bù."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Revert` nghĩa là execution thất bại và các state change trong transaction được hoàn tác. ERC-20 balance dùng unsigned integer nên không có khái niệm balance âm hợp lệ. OpenZeppelin dùng custom error `ERC20InsufficientBalance` để biểu diễn trường hợp sender không đủ token.",
      "source": "Lab 7, page 2"
    },
    {
      "id": "bc-s7-q62",
      "prompt": "Trong test `approve → transferFrom`, invariant nào nên được giữ sau một loạt transfer hợp lệ?",
      "options": [
        {
          "id": "a",
          "text": "Recipient balance giữ nguyên, allowance tăng theo mỗi transfer, còn `totalSupply` giảm dần; worksheet cũng giả định cơ chế đó trong flow triển khai."
        },
        {
          "id": "b",
          "text": "Recipient balance bằng tổng amount đã nhận, allowance giảm theo phần spender dùng, còn `totalSupply` giữ nguyên."
        },
        {
          "id": "c",
          "text": "Recipient balance và totalSupply cùng tăng vì `transferFrom` được xem như mint có ủy quyền."
        },
        {
          "id": "d",
          "text": "Recipient balance tăng, allowance giữ nguyên tuyệt đối, còn `totalSupply` tăng theo amount."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Running sum` là tổng cộng dồn các amount đã chuyển trong loop test. `Invariant` ở đây là conservation of supply: transfer chỉ đổi phân bố token giữa account chứ không tạo/hủy token. Allowance là quota tiêu dùng nên giảm khi spender sử dụng `transferFrom`.",
      "source": "Lab 7, page 2"
    },
    {
      "id": "bc-s7-q63",
      "prompt": "ClassBadge trong Lab 7 dùng access-control và mint pattern nào?",
      "options": [
        {
          "id": "a",
          "text": "Kế thừa `ERC1155 + AccessControl`; mọi user có thể tự mint nếu gửi đủ gas."
        },
        {
          "id": "b",
          "text": "Kế thừa `ERC4626 + Ownable`; badge được tạo khi user deposit CTK vào vault."
        },
        {
          "id": "c",
          "text": "Kế thừa `ERC721 + Ownable`; `mint(to, studentName)` là `onlyOwner` và dùng `_safeMint`."
        },
        {
          "id": "d",
          "text": "Kế thừa `ERC20 + ERC20Permit`; badge được mint bằng `transferFrom` từ owner; đây được xem là một phần của ownership/metadata model."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`onlyOwner` là modifier chặn caller không phải owner. `_safeMint` mint NFT rồi kiểm tra callback nếu recipient là contract, giúp tránh NFT bị kẹt. Function còn trả tokenId mới để caller hoặc test biết NFT vừa tạo có ID nào.",
      "source": "Lab 7, page 2"
    },
    {
      "id": "bc-s7-q64",
      "prompt": "Behavior nào đúng với `tokenURI` và error handling của ClassBadge?",
      "options": [
        {
          "id": "a",
          "text": "URI được lưu trong MetaMask; contract không kiểm tra token tồn tại nên mọi tokenId đều có metadata."
        },
        {
          "id": "b",
          "text": "URI bắt buộc là IPFS CID; empty name được thay bằng `Unknown`, còn token chưa mint trả JSON rỗng."
        },
        {
          "id": "c",
          "text": "URI chứa Base64 JSON/SVG on-chain; empty name revert `EmptyName`, còn token chưa mint gây `ERC721NonexistentToken`."
        },
        {
          "id": "d",
          "text": "URI chỉ chứa SVG raw; empty name mint bình thường, còn token chưa mint trả zero address."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Custom error` như `EmptyName` biểu diễn điều kiện input không hợp lệ bằng dữ liệu ngắn gọn hơn string dài. `_requireOwned` của OpenZeppelin kiểm tra tokenId đã tồn tại và dẫn tới `ERC721NonexistentToken` khi không có owner. Metadata của lab tự chứa JSON và SVG nên không cần IPFS.",
      "source": "Lab 7, pages 2–3"
    },
    {
      "id": "bc-s7-q65",
      "prompt": "Test JavaScript của ClassBadge xác minh metadata on-chain bằng flow nào?",
      "options": [
        {
          "id": "a",
          "text": "Tách Base64 từ `tokenURI`, decode bằng `Buffer.from(..., 'base64')`, `JSON.parse`, rồi assert các field/trait."
        },
        {
          "id": "b",
          "text": "Đọc raw storage slot chứa bytecode, convert toàn bộ runtime code thành JSON rồi tìm trait tương ứng."
        },
        {
          "id": "c",
          "text": "Query event `Transfer` để rebuild toàn bộ metadata, sau đó dùng `ownerOf` làm field `Student`."
        },
        {
          "id": "d",
          "text": "Đưa URI tới IPFS gateway, tải SVG rồi so hash ảnh với address của owner trước khi assert."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Decode` là chuyển Base64 trở lại bytes/text gốc; nó không phải decrypt. Sau khi decode, `JSON.parse` biến chuỗi JSON thành object JavaScript để test kiểm tra `name`, `attributes` hoặc `image`. Lab dùng cách này để chứng minh metadata có thể được đọc hoàn toàn từ dữ liệu mà contract trả về.",
      "source": "Session 7, slide 39; Lab 7, page 2"
    },
    {
      "id": "bc-s7-q66",
      "prompt": "TrustKeys không có public explorer. Lab 7 xác nhận transfer 100 CTK bằng cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Đọc `balanceOf` qua ethers/RPC và có thể đối chiếu event log hoặc balance hiển thị trong MetaMask."
        },
        {
          "id": "b",
          "text": "Không thể xác minh transaction cho tới khi TrustKeys triển khai explorer công khai."
        },
        {
          "id": "c",
          "text": "Dùng private key của recipient để tính lại balance từ chữ ký của transaction đã gửi."
        },
        {
          "id": "d",
          "text": "Decode `tokenURI` của ClassBadge vì metadata ERC-721 luôn chứa balance ERC-20 của cùng account; worksheet cũng giả định cơ chế đó trong flow triển khai."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`RPC` là giao diện để client đọc state hoặc gửi transaction trực tiếp tới node. Explorer chỉ là một frontend/indexer tiện lợi, không phải điều kiện để blockchain có thể được kiểm chứng. `balanceOf` là view call nên ethers có thể đọc số dư CTK trực tiếp; event log hoặc MetaMask cung cấp thêm bằng chứng quan sát.",
      "source": "Lab 7, page 3; Lab 7, Q6"
    },
    {
      "id": "bc-s7-q67",
      "prompt": "Test permit bonus của Lab 7 cần kiểm tra kết quả nào sau một permit hợp lệ và một permit quá hạn?",
      "options": [
        {
          "id": "a",
          "text": "Permit hợp lệ chuyển token ngay cho relayer; permit quá hạn vẫn success nhưng allowance bằng 0."
        },
        {
          "id": "b",
          "text": "Permit hợp lệ tăng totalSupply; permit quá hạn burn signature rồi giảm nonce của owner."
        },
        {
          "id": "c",
          "text": "Permit hợp lệ set allowance và tăng owner nonce; permit có deadline đã hết phải revert."
        },
        {
          "id": "d",
          "text": "Permit hợp lệ đổi spender thành owner contract; permit quá hạn tự gia hạn deadline thêm một block."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Permit` chỉ thiết lập allowance, không tự chuyển token. Sau khi chữ ký được consume, per-owner `nonce` tăng để cùng signature không thể replay. `Deadline` là mốc hết hiệu lực; Lab 7 yêu cầu expired signature revert với `ERC2612ExpiredSignature`.",
      "source": "Lab 7, pages 3–4"
    },
    {
      "id": "bc-s7-q68",
      "prompt": "Worksheet dùng API nào trong ethers v6 để ký EIP-712 permit data?",
      "options": [
        {
          "id": "a",
          "text": "`wallet._signTypedData(domain, types, value)` là API mà worksheet chỉ định cho ethers v6."
        },
        {
          "id": "b",
          "text": "`token.permit.sign(domain, types, value)` vì chữ ký phải được tạo trực tiếp bên trong contract."
        },
        {
          "id": "c",
          "text": "`signer.signMessage(JSON.stringify(value))` vì EIP-712 không cần domain hoặc type definition."
        },
        {
          "id": "d",
          "text": "`signer.signTypedData(domain, types, value)`."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`signTypedData` là API ethers v6 cho EIP-712 structured-data signature. Worksheet lưu ý ethers v5 từng dùng `_signTypedData`, nên copy code giữa hai version có thể gây lỗi API. `Domain` và `types` phải khớp dữ liệu mà contract dùng để recover signer.",
      "source": "Lab 7, page 4"
    }
  ]
};
