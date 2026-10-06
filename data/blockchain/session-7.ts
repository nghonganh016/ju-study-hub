import type { Chapter } from "@/types/quiz";

// Session 7 — Smart Contract Programming II: Token Standards
// Nguồn: Session07-slides.pdf + Lab 07 Token Standards worksheet.
// Bộ câu hỏi được rút gọn để bao quát toàn bộ kiến thức mà không lặp lại các ý tương đương.
export const session7: Chapter = {
    "id": "session-7",
    "title": "Session 7: Token Standards",
    "description": "68 câu ôn tập về ERC-20, OpenZeppelin, EIP-2612 permit, ERC-721/1155, on-chain metadata, upgradeability, proxy và Lab 7.",
    "revision": 1,
    "questions": [
        {
            "id": "bc-s7-q01",
            "prompt": "Mục đích quan trọng nhất của một token standard như ERC-20 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Quy định blockchain phải dùng cơ chế consensus nào"
                },
                {
                    "id": "b",
                    "text": "Chuẩn hóa interface gồm function và event để wallet, DEX và explorer có thể tương tác theo cùng một cách"
                },
                {
                    "id": "c",
                    "text": "Quy định giá thị trường của token"
                },
                {
                    "id": "d",
                    "text": "Biến token thành native coin của blockchain"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Token standard chuẩn hóa interface để các ứng dụng có thể tương tác với nhiều token mà không cần viết logic riêng cho từng token."
        },
        {
            "id": "bc-s7-q02",
            "prompt": "Phát biểu nào mô tả đúng mối quan hệ giữa EIP và ERC trong Session 7?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC là proposal, EIP là implementation"
                },
                {
                    "id": "b",
                    "text": "EIP chỉ dành cho Bitcoin, ERC dành cho Ethereum"
                },
                {
                    "id": "c",
                    "text": "EIP là proposal; ERC là application standard hình thành từ proposal đó và thường giữ cùng số"
                },
                {
                    "id": "d",
                    "text": "Hai khái niệm hoàn toàn không liên quan"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Slide mô tả EIP là proposal và ERC là application standard tương ứng, thường sử dụng cùng số."
        },
        {
            "id": "bc-s7-q03",
            "prompt": "Phát biểu nào đúng về ERC-20 token?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC-20 là một loại coin đặc biệt được lưu trực tiếp trong EVM"
                },
                {
                    "id": "b",
                    "text": "ERC-20 thực chất là một smart contract duy trì ledger số dư và các đơn vị token là fungible"
                },
                {
                    "id": "c",
                    "text": "Mỗi ERC-20 token có một tokenId riêng"
                },
                {
                    "id": "d",
                    "text": "ERC-20 bắt buộc phải có tổng cung cố định"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-20 là contract quản lý số dư; fungible nghĩa là các đơn vị cùng loại có thể thay thế cho nhau."
        },
        {
            "id": "bc-s7-q04",
            "prompt": "Nhóm nào chỉ gồm các function cốt lõi của ERC-20?",
            "options": [
                {
                    "id": "a",
                    "text": "balanceOf, ownerOf, approve, mint"
                },
                {
                    "id": "b",
                    "text": "totalSupply, balanceOf, transfer, approve, allowance, transferFrom"
                },
                {
                    "id": "c",
                    "text": "transfer, safeTransferFrom, tokenURI, approve"
                },
                {
                    "id": "d",
                    "text": "deposit, withdraw, redeem, mint"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-20 định nghĩa các function cốt lõi totalSupply, balanceOf, transfer, approve, allowance và transferFrom."
        },
        {
            "id": "bc-s7-q05",
            "prompt": "Phát biểu nào đúng về cách ERC-20 quản lý số dư và event?",
            "options": [
                {
                    "id": "a",
                    "text": "Balance thường nằm trong mapping(address => uint256) và hai event chuẩn là Transfer, Approval"
                },
                {
                    "id": "b",
                    "text": "Balance nằm trong mapping(uint256 => address) và chỉ có event Transfer"
                },
                {
                    "id": "c",
                    "text": "Balance được lưu hoàn toàn bên ngoài blockchain"
                },
                {
                    "id": "d",
                    "text": "Mỗi lần transfer phải tạo một tokenId mới"
                }
            ],
            "correctOptionId": "a",
            "explanation": "ERC-20 thường lưu balance theo address; transfer về bản chất là cập nhật các con số trong ledger và phát event tương ứng."
        },
        {
            "id": "bc-s7-q06",
            "prompt": "Alice có raw balance là 1_000_000_000_000_000_000 và token có decimals() = 18. Giao diện nên hiển thị bao nhiêu token?",
            "options": [
                {
                    "id": "a",
                    "text": "0.18 token"
                },
                {
                    "id": "b",
                    "text": "1 token"
                },
                {
                    "id": "c",
                    "text": "18 token"
                },
                {
                    "id": "d",
                    "text": "10^18 token"
                }
            ],
            "correctOptionId": "b",
            "explanation": "EVM lưu integer base units. Với 18 decimals, 10^18 base units được hiển thị thành 1 token."
        },
        {
            "id": "bc-s7-q07",
            "prompt": "Vì sao không nên mặc định mọi ERC-20 đều có 18 decimals?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC-20 không hỗ trợ decimals"
                },
                {
                    "id": "b",
                    "text": "Một số token như USDC và USDT dùng 6 decimals, nên giả định 18 có thể làm sai phép tính"
                },
                {
                    "id": "c",
                    "text": "decimals thay đổi theo từng block"
                },
                {
                    "id": "d",
                    "text": "decimals phụ thuộc vào ví người dùng"
                }
            ],
            "correctOptionId": "b",
            "explanation": "decimals là metadata phục vụ hiển thị. Không phải token nào cũng dùng 18 decimals."
        },
        {
            "id": "bc-s7-q08",
            "prompt": "Khi Alice gọi transfer(Bob, 100), điều gì xảy ra?",
            "options": [
                {
                    "id": "a",
                    "text": "Bob được quyền rút tối đa 100 token của Alice"
                },
                {
                    "id": "b",
                    "text": "Alice trực tiếp push 100 token từ balance của mình sang Bob"
                },
                {
                    "id": "c",
                    "text": "Bob phải gọi transferFrom mới nhận được token"
                },
                {
                    "id": "d",
                    "text": "Smart contract của Bob luôn được thực thi"
                }
            ],
            "correctOptionId": "b",
            "explanation": "transfer là mô hình push: người gọi chuyển token của chính mình tới địa chỉ nhận."
        },
        {
            "id": "bc-s7-q09",
            "prompt": "Vì sao DEX thường cần approve rồi transferFrom thay vì yêu cầu người dùng transfer token thẳng tới DEX?",
            "options": [
                {
                    "id": "a",
                    "text": "transferFrom không tốn gas"
                },
                {
                    "id": "b",
                    "text": "transfer không được ERC-20 hỗ trợ"
                },
                {
                    "id": "c",
                    "text": "approve cấp allowance để DEX chủ động pull token trong chính transaction thực hiện swap"
                },
                {
                    "id": "d",
                    "text": "transferFrom tạo thêm token cho DEX"
                }
            ],
            "correctOptionId": "c",
            "explanation": "approve + transferFrom cho phép spender contract pull token của user tới giới hạn allowance ngay trong logic giao dịch của nó."
        },
        {
            "id": "bc-s7-q10",
            "prompt": "allowance[owner][spender] nên được hiểu như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Balance phụ của owner"
                },
                {
                    "id": "b",
                    "text": "Lượng token tối đa mà spender được phép pull từ owner"
                },
                {
                    "id": "c",
                    "text": "Lượng ETH dùng để trả gas"
                },
                {
                    "id": "d",
                    "text": "Tổng số token spender từng nhận"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Allowance là ledger thứ hai ghi hạn mức spender được phép sử dụng thay mặt owner."
        },
        {
            "id": "bc-s7-q11",
            "prompt": "Rủi ro chính của approve(spender, 2^256 - 1) là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Token tự động bị burn"
                },
                {
                    "id": "b",
                    "text": "Spender chỉ có thể dùng allowance một lần"
                },
                {
                    "id": "c",
                    "text": "Nếu spender bị hack hoặc malicious, nó có thể rút toàn bộ balance được phép mà không cần chữ ký mới"
                },
                {
                    "id": "d",
                    "text": "Blockchain luôn reject giá trị này"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Infinite approval tiện lợi nhưng tạo rủi ro lớn nếu spender contract bị chiếm quyền hoặc có logic độc hại."
        },
        {
            "id": "bc-s7-q12",
            "prompt": "Alice đang có allowance 100 CTK cho một DEX và muốn đổi trực tiếp thành 200 CTK. Rủi ro của việc đổi allowance khác 0 sang một allowance khác 0 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Spender có thể front-run, tiêu allowance 100 cũ rồi tiếp tục tiêu allowance 200 mới"
                },
                {
                    "id": "b",
                    "text": "Balance của Alice tự động trở về 0"
                },
                {
                    "id": "c",
                    "text": "Token sẽ mint thêm 200 CTK"
                },
                {
                    "id": "d",
                    "text": "approve không thể thay đổi allowance"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Đây là approve race: spender có thể khai thác cả allowance cũ và mới nếu giao dịch thay đổi bị front-run."
        },
        {
            "id": "bc-s7-q13",
            "prompt": "Cách xử lý được Session 7 khuyến nghị cho approve race là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Luôn dùng increaseAllowance"
                },
                {
                    "id": "b",
                    "text": "Đặt allowance về 0 trước rồi đặt giá trị mới, hoặc dùng permit"
                },
                {
                    "id": "c",
                    "text": "Luôn dùng infinite approval"
                },
                {
                    "id": "d",
                    "text": "Dùng transfer thay cho mọi DEX"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Slide khuyến nghị reset allowance về 0 trước khi đặt giá trị mới hoặc sử dụng permit."
        },
        {
            "id": "bc-s7-q14",
            "prompt": "Cặp mô tả nào đúng về _mint và _burn trong ERC-20?",
            "options": [
                {
                    "id": "a",
                    "text": "_mint giảm supply, _burn tăng supply"
                },
                {
                    "id": "b",
                    "text": "Cả hai không ảnh hưởng totalSupply"
                },
                {
                    "id": "c",
                    "text": "_mint tạo supply mới, _burn hủy supply và totalSupply phản ánh mint trừ burn"
                },
                {
                    "id": "d",
                    "text": "Chỉ ERC-721 có mint và burn"
                }
            ],
            "correctOptionId": "c",
            "explanation": "_mint làm tăng tổng cung, _burn làm giảm tổng cung."
        },
        {
            "id": "bc-s7-q15",
            "prompt": "Nếu một token dùng ERC20Capped với cap 1,000,000 token và mint toàn bộ cap ngay khi deploy, hệ quả là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Có thể tiếp tục mint vô hạn"
                },
                {
                    "id": "b",
                    "text": "Supply ban đầu đã đạt ceiling nên không thể tăng supply vượt cap"
                },
                {
                    "id": "c",
                    "text": "Cap chỉ ảnh hưởng UI"
                },
                {
                    "id": "d",
                    "text": "Token tự động burn sau mỗi transfer"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC20Capped giới hạn tổng cung tối đa; mint toàn bộ cap lúc deploy tạo fixed supply nếu không burn rồi mint lại."
        },
        {
            "id": "bc-s7-q16",
            "prompt": "Vì sao contract tương tác với các ERC-20 tùy ý nên dùng SafeERC20?",
            "options": [
                {
                    "id": "a",
                    "text": "SafeERC20 làm transaction miễn phí"
                },
                {
                    "id": "b",
                    "text": "Một số token thực tế không tuân thủ hoàn toàn return value bool; SafeERC20 xử lý cả missing hoặc false return"
                },
                {
                    "id": "c",
                    "text": "ERC-20 không có transfer"
                },
                {
                    "id": "d",
                    "text": "SafeERC20 chuyển ERC-20 thành ERC-721"
                }
            ],
            "correctOptionId": "b",
            "explanation": "SafeERC20 bọc các lời gọi như safeTransfer, safeTransferFrom và forceApprove để xử lý token lệch chuẩn."
        },
        {
            "id": "bc-s7-q17",
            "prompt": "Lý do chính Session 7 khuyến nghị xây token dựa trên OpenZeppelin thay vì tự viết ERC-20 từ đầu là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "OpenZeppelin làm token tăng giá"
                },
                {
                    "id": "b",
                    "text": "Implementation đã được dùng rộng rãi, audit và gas-review, giúp giảm code và attack surface"
                },
                {
                    "id": "c",
                    "text": "Solidity không cho phép tự viết ERC-20"
                },
                {
                    "id": "d",
                    "text": "OpenZeppelin loại bỏ nhu cầu testing"
                }
            ],
            "correctOptionId": "b",
            "explanation": "OpenZeppelin cung cấp các implementation chuẩn cộng đồng đã được kiểm tra kỹ, giúp giảm nguy cơ tự tạo bug."
        },
        {
            "id": "bc-s7-q18",
            "prompt": "Ghép nối extension ERC-20 nào đúng?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC20Capped → pause transfer; ERC20Pausable → cap supply"
                },
                {
                    "id": "b",
                    "text": "ERC20Burnable → burn; ERC20Capped → giới hạn supply; ERC20Pausable → pause transfer; ERC20Permit → approval bằng chữ ký"
                },
                {
                    "id": "c",
                    "text": "ERC20Permit → NFT metadata"
                },
                {
                    "id": "d",
                    "text": "ERC20Burnable → upgrade contract"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Mỗi extension bổ sung một khả năng cụ thể; chỉ nên compose những extension thực sự cần."
        },
        {
            "id": "bc-s7-q19",
            "prompt": "Khi nào AccessControl phù hợp hơn Ownable?",
            "options": [
                {
                    "id": "a",
                    "text": "Khi contract chỉ có đúng một admin đơn giản"
                },
                {
                    "id": "b",
                    "text": "Khi nhiều nhiệm vụ cần tách thành các role như MINTER_ROLE và PAUSER_ROLE với nhiều người có thể được grant/revoke"
                },
                {
                    "id": "c",
                    "text": "Khi contract không có admin"
                },
                {
                    "id": "d",
                    "text": "Chỉ khi xây NFT"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Ownable phù hợp mô hình một owner; AccessControl phù hợp khi cần chia quyền thành nhiều role."
        },
        {
            "id": "bc-s7-q20",
            "prompt": "Nhược điểm quan trọng của mô hình chỉ có một owner key là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Không thể gọi smart contract"
                },
                {
                    "id": "b",
                    "text": "Owner không thể mint"
                },
                {
                    "id": "c",
                    "text": "Owner key trở thành single point of failure"
                },
                {
                    "id": "d",
                    "text": "Gas luôn cao hơn AccessControl"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Một khóa owner duy nhất bị mất hoặc bị lộ có thể làm mất quyền quản trị hoặc khiến toàn bộ quyền admin bị chiếm."
        },
        {
            "id": "bc-s7-q21",
            "prompt": "EIP-2612 permit chủ yếu giải quyết vấn đề nào của ERC-20?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC-20 không thể transfer"
                },
                {
                    "id": "b",
                    "text": "approve thông thường cần một transaction riêng, khiến user phải trả thêm gas và click thêm một lần"
                },
                {
                    "id": "c",
                    "text": "ERC-20 không có allowance"
                },
                {
                    "id": "d",
                    "text": "ERC-20 không có signature"
                }
            ],
            "correctOptionId": "b",
            "explanation": "permit cho phép owner ký approval off-chain thay vì tự gửi một transaction approve riêng."
        },
        {
            "id": "bc-s7-q22",
            "prompt": "Quy trình EIP-2612 permit nào đúng?",
            "options": [
                {
                    "id": "a",
                    "text": "Relayer ký thay owner và owner trả gas"
                },
                {
                    "id": "b",
                    "text": "Owner ký approval off-chain; relayer submit permit on-chain và trả gas"
                },
                {
                    "id": "c",
                    "text": "Owner phải gửi ETH cho spender trước"
                },
                {
                    "id": "d",
                    "text": "Permit không cần chữ ký"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Token holder ký miễn phí off-chain; relayer gửi permit lên chain và chịu gas cho transaction đó."
        },
        {
            "id": "bc-s7-q23",
            "prompt": "EIP-2612 permit sử dụng dạng chữ ký nào trong Session 7?",
            "options": [
                {
                    "id": "a",
                    "text": "Plain-text SHA-256"
                },
                {
                    "id": "b",
                    "text": "EIP-712 typed data"
                },
                {
                    "id": "c",
                    "text": "Bitcoin Script"
                },
                {
                    "id": "d",
                    "text": "Merkle proof"
                }
            ],
            "correctOptionId": "b",
            "explanation": "permit sử dụng EIP-712 typed structured data để ràng buộc chữ ký vào một domain và message cụ thể."
        },
        {
            "id": "bc-s7-q24",
            "prompt": "Tập thông tin nào phối hợp để ngăn permit bị replay nhiều lần hoặc replay sang chain/contract khác?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ owner"
                },
                {
                    "id": "b",
                    "text": "Chỉ deadline"
                },
                {
                    "id": "c",
                    "text": "Per-owner nonce, deadline, chainId và địa chỉ contract trong EIP-712 domain"
                },
                {
                    "id": "d",
                    "text": "Chỉ gas price"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Nonce ngăn dùng lại cùng permit; deadline giới hạn thời gian; chainId và verifying contract khóa chữ ký vào đúng chain và contract."
        },
        {
            "id": "bc-s7-q25",
            "prompt": "Sau khi nhận một permit signature, contract cần làm gì để xác thực owner?",
            "options": [
                {
                    "id": "a",
                    "text": "Tin địa chỉ owner được truyền vào"
                },
                {
                    "id": "b",
                    "text": "Recover signer từ chữ ký on-chain rồi kiểm tra signer == owner"
                },
                {
                    "id": "c",
                    "text": "Hỏi MetaMask trực tiếp"
                },
                {
                    "id": "d",
                    "text": "So sánh gas price của owner và relayer"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Contract phục hồi địa chỉ người ký từ chữ ký và xác minh người ký đúng là owner."
        },
        {
            "id": "bc-s7-q26",
            "prompt": "Điểm khác biệt cốt lõi giữa ERC-20 và ERC-721 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC-721 không sử dụng smart contract"
                },
                {
                    "id": "b",
                    "text": "ERC-20 tập trung vào 'how much', còn ERC-721 tập trung vào 'which token' vì mỗi NFT có tokenId riêng"
                },
                {
                    "id": "c",
                    "text": "ERC-721 không có owner"
                },
                {
                    "id": "d",
                    "text": "ERC-20 có tokenId riêng cho từng đơn vị"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-20 đại diện các đơn vị fungible; ERC-721 đại diện từng tài sản riêng biệt được nhận diện bằng tokenId."
        },
        {
            "id": "bc-s7-q27",
            "prompt": "Với ERC-721, balanceOf(Alice) trả về gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Giá trị tiền của tất cả NFT Alice sở hữu"
                },
                {
                    "id": "b",
                    "text": "tokenId lớn nhất của Alice"
                },
                {
                    "id": "c",
                    "text": "Số lượng NFT Alice đang sở hữu"
                },
                {
                    "id": "d",
                    "text": "Tổng supply NFT của collection"
                }
            ],
            "correctOptionId": "c",
            "explanation": "balanceOf(owner) là số NFT owner đang giữ; ownerOf(tokenId) cho biết ai sở hữu một NFT cụ thể."
        },
        {
            "id": "bc-s7-q28",
            "prompt": "ERC-721 hỗ trợ hai kiểu approval nào?",
            "options": [
                {
                    "id": "a",
                    "text": "approve cho từng token và setApprovalForAll cho toàn bộ token của owner đối với operator"
                },
                {
                    "id": "b",
                    "text": "Chỉ infinite approval"
                },
                {
                    "id": "c",
                    "text": "Chỉ allowance giống ERC-20"
                },
                {
                    "id": "d",
                    "text": "mintApproval và burnApproval"
                }
            ],
            "correctOptionId": "a",
            "explanation": "ERC-721 có thể cấp quyền cho một token cụ thể hoặc cấp quyền operator cho toàn bộ NFT của owner."
        },
        {
            "id": "bc-s7-q29",
            "prompt": "Phần 'safe' trong _safeMint và safeTransferFrom chủ yếu làm gì khi recipient là một smart contract?",
            "options": [
                {
                    "id": "a",
                    "text": "Audit source code của recipient"
                },
                {
                    "id": "b",
                    "text": "Kiểm tra recipient implement onERC721Received; nếu không thì revert"
                },
                {
                    "id": "c",
                    "text": "Kiểm tra recipient có ETH hay không"
                },
                {
                    "id": "d",
                    "text": "Mã hóa NFT trước khi chuyển"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Handshake onERC721Received giúp tránh NFT bị kẹt trong contract không biết cách nhận ERC-721."
        },
        {
            "id": "bc-s7-q30",
            "prompt": "Vì sao việc recipient implement onERC721Received không có nghĩa contract đó hoàn toàn an toàn?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì đây chỉ là handshake chứng minh contract biết nhận ERC-721, không phải security guarantee về toàn bộ logic hoặc ý định"
                },
                {
                    "id": "b",
                    "text": "Vì function này luôn trả false"
                },
                {
                    "id": "c",
                    "text": "Vì nó chỉ dùng cho ERC-20"
                },
                {
                    "id": "d",
                    "text": "Vì callback chạy off-chain"
                }
            ],
            "correctOptionId": "a",
            "explanation": "onERC721Received chỉ xác nhận contract hỗ trợ cơ chế nhận NFT an toàn, không chứng minh contract đáng tin."
        },
        {
            "id": "bc-s7-q31",
            "prompt": "ERC-165 supportsInterface(interfaceId) phục vụ mục đích nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Xác định giá NFT"
                },
                {
                    "id": "b",
                    "text": "Cho phép caller kiểm tra contract có hỗ trợ một interface như ERC-721 hay không"
                },
                {
                    "id": "c",
                    "text": "Thực hiện transfer NFT"
                },
                {
                    "id": "d",
                    "text": "Nâng cấp implementation"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-165 cung cấp cơ chế interface detection để contract hoặc app hỏi một contract có hỗ trợ interface cụ thể hay không."
        },
        {
            "id": "bc-s7-q32",
            "prompt": "tokenURI(tokenId) của ERC-721 thường trả về gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Toàn bộ bytecode của NFT"
                },
                {
                    "id": "b",
                    "text": "Một URI trỏ tới metadata JSON của token"
                },
                {
                    "id": "c",
                    "text": "Private key của owner"
                },
                {
                    "id": "d",
                    "text": "Transaction receipt gần nhất"
                }
            ],
            "correctOptionId": "b",
            "explanation": "tokenURI trả URI tới metadata; metadata có thể nằm off-chain hoặc được encode trực tiếp on-chain."
        },
        {
            "id": "bc-s7-q33",
            "prompt": "Metadata JSON trong ví dụ ClassBadge chứa tổ hợp trường nào?",
            "options": [
                {
                    "id": "a",
                    "text": "name, description, image, attributes"
                },
                {
                    "id": "b",
                    "text": "balance, allowance, gas, nonce"
                },
                {
                    "id": "c",
                    "text": "owner, privateKey, seed, RPC"
                },
                {
                    "id": "d",
                    "text": "price, marketCap, volume, rank"
                }
            ],
            "correctOptionId": "a",
            "explanation": "ClassBadge dùng metadata JSON có name, description, image và attributes; Student là một trait trong attributes."
        },
        {
            "id": "bc-s7-q34",
            "prompt": "So sánh nào đúng giữa IPFS metadata và on-chain data URI?",
            "options": [
                {
                    "id": "a",
                    "text": "IPFS bắt buộc lưu toàn bộ dữ liệu trong contract"
                },
                {
                    "id": "b",
                    "text": "IPFS thường rẻ hơn nhưng nội dung cần được pin; on-chain tự chứa và không cần pinning service nhưng tốn gas hơn khi dữ liệu lớn"
                },
                {
                    "id": "c",
                    "text": "On-chain luôn rẻ hơn IPFS"
                },
                {
                    "id": "d",
                    "text": "Hai cách giống hệt nhau"
                }
            ],
            "correctOptionId": "b",
            "explanation": "IPFS lưu dữ liệu ngoài chain và cần pinning/gateway; on-chain data URI tự chứa nhưng storage/bytecode lớn sẽ tốn gas."
        },
        {
            "id": "bc-s7-q35",
            "prompt": "Vì sao ClassBadge của Lab 7 sử dụng data:application/json;base64,... thay vì IPFS?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC-721 cấm IPFS"
                },
                {
                    "id": "b",
                    "text": "TrustKeys trong lab không có IPFS gateway, nên metadata được dựng on-chain để không phụ thuộc pinning/gateway"
                },
                {
                    "id": "c",
                    "text": "Base64 không tốn storage"
                },
                {
                    "id": "d",
                    "text": "MetaMask chỉ đọc được Base64"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Lab dùng on-chain data URI để JSON và SVG có thể được decode trực tiếp mà không cần dịch vụ IPFS."
        },
        {
            "id": "bc-s7-q36",
            "prompt": "Trong ClassBadge, OpenZeppelin Base64 và Strings được dùng chủ yếu để làm gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Encrypt private key"
                },
                {
                    "id": "b",
                    "text": "Xây JSON/SVG và encode thành data URI để wallet hoặc script có thể decode cục bộ"
                },
                {
                    "id": "c",
                    "text": "Thay đổi owner của NFT"
                },
                {
                    "id": "d",
                    "text": "Giảm tokenId"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Base64 và Strings hỗ trợ dựng metadata on-chain tự chứa, không cần server."
        },
        {
            "id": "bc-s7-q37",
            "prompt": "EIP-2981 quy định điều gì về NFT royalties?",
            "options": [
                {
                    "id": "a",
                    "text": "Marketplace bắt buộc phải trả royalty on-chain"
                },
                {
                    "id": "b",
                    "text": "royaltyInfo(tokenId, salePrice) cung cấp receiver và royalty amount, nhưng marketplace tự quyết định có tôn trọng hay không"
                },
                {
                    "id": "c",
                    "text": "NFT không thể bán lại"
                },
                {
                    "id": "d",
                    "text": "Royalty luôn là 10%"
                }
            ],
            "correctOptionId": "b",
            "explanation": "EIP-2981 là advisory standard; code on-chain không thể ép mọi marketplace off-chain trả royalty."
        },
        {
            "id": "bc-s7-q38",
            "prompt": "EIP-5192 phù hợp nhất với use case nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Fungible stablecoin"
                },
                {
                    "id": "b",
                    "text": "Non-transferable credential hoặc badge dạng soulbound"
                },
                {
                    "id": "c",
                    "text": "DEX liquidity pool"
                },
                {
                    "id": "d",
                    "text": "Gas token"
                }
            ],
            "correctOptionId": "b",
            "explanation": "EIP-5192 mô tả NFT bị khóa, phù hợp credential hoặc badge không nên chuyển nhượng."
        },
        {
            "id": "bc-s7-q39",
            "prompt": "Đặc điểm nổi bật của ERC-1155 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Mỗi contract chỉ quản lý một token"
                },
                {
                    "id": "b",
                    "text": "Một contract có thể quản lý nhiều token ID, trong đó mỗi ID có thể fungible hoặc non-fungible"
                },
                {
                    "id": "c",
                    "text": "Chỉ dùng cho fungible token"
                },
                {
                    "id": "d",
                    "text": "Không hỗ trợ NFT"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-1155 là multi-token standard: nhiều loại tài sản có thể nằm trong cùng một contract."
        },
        {
            "id": "bc-s7-q40",
            "prompt": "Lợi thế của balanceOfBatch và safeBatchTransferFrom trong ERC-1155 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Có thể xử lý nhiều token ID trong một transaction, thường hiệu quả hơn thực hiện từng operation riêng"
                },
                {
                    "id": "b",
                    "text": "Chỉ dùng để kiểm tra gas price"
                },
                {
                    "id": "c",
                    "text": "Loại bỏ hoàn toàn gas"
                },
                {
                    "id": "d",
                    "text": "Chuyển NFT thành ERC-20"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Batch operations là một lợi thế quan trọng của ERC-1155, đặc biệt với game hoặc collection có nhiều item."
        },
        {
            "id": "bc-s7-q41",
            "prompt": "Metadata của ERC-1155 thường sử dụng pattern nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Một contract riêng cho từng metadata file"
                },
                {
                    "id": "b",
                    "text": "URI template chứa {id} để dùng chung pattern cho nhiều token ID"
                },
                {
                    "id": "c",
                    "text": "Metadata bị cấm"
                },
                {
                    "id": "d",
                    "text": "Chỉ lưu trong event"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-1155 có thể sử dụng một URI template với placeholder {id} để xác định metadata của từng token type."
        },
        {
            "id": "bc-s7-q42",
            "prompt": "Nhóm lựa chọn token standard nào phù hợp nhất?",
            "options": [
                {
                    "id": "a",
                    "text": "Currency → ERC-721; unique artwork → ERC-20; game catalogue → ERC-20"
                },
                {
                    "id": "b",
                    "text": "Currency/points → ERC-20; unique 1-of-1 item → ERC-721; nhiều item type và batch operations → ERC-1155"
                },
                {
                    "id": "c",
                    "text": "Mọi use case đều nên dùng ERC-1155"
                },
                {
                    "id": "d",
                    "text": "Mọi NFT đều nên dùng ERC-20"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Quy tắc nhớ nhanh của slide: 'how much' → ERC-20, 'which one' → ERC-721, 'a catalogue' → ERC-1155."
        },
        {
            "id": "bc-s7-q43",
            "prompt": "Lý do phổ biến khiến team muốn smart contract có khả năng upgrade là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Contract Ethereum luôn tự xóa sau một năm"
                },
                {
                    "id": "b",
                    "text": "Contract vốn immutable, nên bug đã deploy khó sửa trực tiếp"
                },
                {
                    "id": "c",
                    "text": "Upgrade làm mọi transaction miễn phí"
                },
                {
                    "id": "d",
                    "text": "Solidity yêu cầu upgrade hàng tháng"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Immutability làm bug đã deploy tồn tại lâu dài, nên một số dự án muốn có upgrade path."
        },
        {
            "id": "bc-s7-q44",
            "prompt": "Đánh đổi quan trọng nhất của upgradeability là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "User không thể dùng contract"
                },
                {
                    "id": "b",
                    "text": "Admin hoặc governance có quyền thay đổi code mà user đang tin tưởng, tạo thêm centralization và attack risk"
                },
                {
                    "id": "c",
                    "text": "Contract không còn storage"
                },
                {
                    "id": "d",
                    "text": "Upgradeable contract không thể dùng ERC-20"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Upgradeability tạo quyền thay đổi logic sau deploy; phải hiểu rõ ai kiểm soát quyền upgrade."
        },
        {
            "id": "bc-s7-q45",
            "prompt": "delegatecall trong proxy pattern có đặc điểm nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Chạy code của contract khác trên storage của contract gọi"
                },
                {
                    "id": "b",
                    "text": "Sao chép toàn bộ storage sang implementation"
                },
                {
                    "id": "c",
                    "text": "Chạy code hoàn toàn off-chain"
                },
                {
                    "id": "d",
                    "text": "Chỉ dùng cho ERC-721"
                }
            ],
            "correctOptionId": "a",
            "explanation": "delegatecall dùng code của implementation nhưng thao tác trên context và storage của caller, tức proxy."
        },
        {
            "id": "bc-s7-q46",
            "prompt": "Trong kiến trúc proxy thông thường, đâu là cách phân chia đúng?",
            "options": [
                {
                    "id": "a",
                    "text": "Implementation giữ toàn bộ state, proxy chỉ giữ bytecode ERC-20"
                },
                {
                    "id": "b",
                    "text": "Proxy giữ state và implementation pointer; implementation chủ yếu cung cấp logic/code"
                },
                {
                    "id": "c",
                    "text": "Cả hai giữ hai bản state độc lập giống nhau"
                },
                {
                    "id": "d",
                    "text": "Proxy không có địa chỉ"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Proxy giữ địa chỉ ổn định và state; implementation chứa logic được delegatecall thực thi."
        },
        {
            "id": "bc-s7-q47",
            "prompt": "Một upgrade từ V1 lên V2 qua proxy thường được thực hiện như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Xóa proxy rồi deploy lại từ đầu"
                },
                {
                    "id": "b",
                    "text": "Repoint implementation pointer từ V1 sang V2, trong khi giữ cùng proxy address và state"
                },
                {
                    "id": "c",
                    "text": "Chuyển toàn bộ user sang blockchain khác"
                },
                {
                    "id": "d",
                    "text": "Burn contract cũ"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đổi implementation pointer cho phép giữ cùng địa chỉ và state nhưng sử dụng logic mới."
        },
        {
            "id": "bc-s7-q48",
            "prompt": "Điểm khác biệt được Session 7 nhấn mạnh giữa Transparent proxy và UUPS là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Transparent không dùng proxy"
                },
                {
                    "id": "b",
                    "text": "Transparent đặt upgrade logic ở proxy, còn UUPS đặt upgrade logic trong implementation"
                },
                {
                    "id": "c",
                    "text": "UUPS không hỗ trợ state"
                },
                {
                    "id": "d",
                    "text": "Transparent chỉ dùng với NFT"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Hai pattern khác nhau chủ yếu ở nơi chứa cơ chế upgrade; UUPS thường nhẹ hơn ở proxy."
        },
        {
            "id": "bc-s7-q49",
            "prompt": "Trong UUPS, _authorizeUpgrade có vai trò gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Encode NFT image"
                },
                {
                    "id": "b",
                    "text": "Kiểm soát ai được phép thực hiện upgrade"
                },
                {
                    "id": "c",
                    "text": "Tính ERC-20 allowance"
                },
                {
                    "id": "d",
                    "text": "Burn implementation cũ"
                }
            ],
            "correctOptionId": "b",
            "explanation": "_authorizeUpgrade là hook kiểm soát quyền nâng cấp trong UUPS implementation."
        },
        {
            "id": "bc-s7-q50",
            "prompt": "Vì sao upgradeable contract thường dùng initialize() thay vì constructor?",
            "options": [
                {
                    "id": "a",
                    "text": "Constructor không tồn tại trong Solidity"
                },
                {
                    "id": "b",
                    "text": "Constructor chạy trên storage của implementation, không khởi tạo state của proxy theo cách mong muốn; initializer được gọi qua proxy và phải chỉ chạy một lần"
                },
                {
                    "id": "c",
                    "text": "initialize() không tốn gas"
                },
                {
                    "id": "d",
                    "text": "Constructor chỉ dành cho ERC-20"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Proxy giữ state, nên upgradeable contract dùng initializer thay cho constructor và cần modifier đảm bảo chỉ khởi tạo một lần."
        },
        {
            "id": "bc-s7-q51",
            "prompt": "Storage collision có thể xảy ra trong tình huống nào?",
            "options": [
                {
                    "id": "a",
                    "text": "V2 thay đổi hoặc reorder layout của state variables khiến slot cũ bị diễn giải thành dữ liệu khác"
                },
                {
                    "id": "b",
                    "text": "Hai user có cùng ETH balance"
                },
                {
                    "id": "c",
                    "text": "Hai NFT cùng owner"
                },
                {
                    "id": "d",
                    "text": "Hai event có cùng tên"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Proxy giữ storage qua các version; thay đổi slot layout có thể làm state bị corrupt mà không nhất thiết revert."
        },
        {
            "id": "bc-s7-q52",
            "prompt": "Cách phát triển V2 an toàn hơn đối với storage layout là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Chèn variable mới vào đầu contract"
                },
                {
                    "id": "b",
                    "text": "Đổi thứ tự toàn bộ variable để dễ đọc"
                },
                {
                    "id": "c",
                    "text": "Giữ nguyên layout cũ, append variable mới ở cuối, có thể reserve storage gaps và dùng OZ Upgrades kiểm tra layout"
                },
                {
                    "id": "d",
                    "text": "Xóa mọi variable không dùng"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Upgradeable storage phải bảo toàn thứ tự slot cũ; biến mới nên được thêm ở cuối và có thể dùng storage gaps."
        },
        {
            "id": "bc-s7-q53",
            "prompt": "ERC-4626 mô tả loại contract nào?",
            "options": [
                {
                    "id": "a",
                    "text": "NFT marketplace"
                },
                {
                    "id": "b",
                    "text": "Tokenized vault: user deposit ERC-20 asset và nhận share token biểu diễn phần sở hữu trong pool"
                },
                {
                    "id": "c",
                    "text": "Blockchain consensus protocol"
                },
                {
                    "id": "d",
                    "text": "Oracle network"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-4626 chuẩn hóa vault nhận ERC-20 asset và phát hành share token đại diện phần sở hữu của người gửi."
        },
        {
            "id": "bc-s7-q54",
            "prompt": "Nhóm operation cốt lõi được ERC-4626 chuẩn hóa trong Session 7 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "approve, transfer, transferFrom"
                },
                {
                    "id": "b",
                    "text": "deposit, mint, withdraw, redeem cùng quy đổi share ↔ asset"
                },
                {
                    "id": "c",
                    "text": "ownerOf, tokenURI, safeTransferFrom"
                },
                {
                    "id": "d",
                    "text": "pause, upgrade, delegatecall"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ERC-4626 chuẩn hóa các thao tác vault và quy đổi giữa underlying asset với share token."
        },
        {
            "id": "bc-s7-q55",
            "prompt": "Điều kiện hoàn thành chính của Lab 7 là gì?",
            "options": [
                {
                    "id": "a",
                    "text": "Chỉ cần compile thành công"
                },
                {
                    "id": "b",
                    "text": "Hardhat tests pass, deploy ClassToken và ClassBadge lên TrustKeys, transfer 100 CTK và decode được ClassBadge tokenURI"
                },
                {
                    "id": "c",
                    "text": "Chỉ cần deploy ClassToken"
                },
                {
                    "id": "d",
                    "text": "Chỉ cần MetaMask hiển thị ETH"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Worksheet yêu cầu test xanh, deploy hai contract, import/chuyển CTK và decode badge metadata."
        },
        {
            "id": "bc-s7-q56",
            "prompt": "Cấu hình chuẩn bị nào đúng cho Lab 7?",
            "options": [
                {
                    "id": "a",
                    "text": "Node < 12, Ethereum mainnet, real wallet"
                },
                {
                    "id": "b",
                    "text": "Node >= 18, TrustKeys RPC l1testnet.trustkeys.network, chainId 11968 và dedicated test account có test funds"
                },
                {
                    "id": "c",
                    "text": "Không cần Node.js"
                },
                {
                    "id": "d",
                    "text": "Bitcoin Core và chainId 1"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Worksheet yêu cầu Node >= 18 và sử dụng tài khoản test riêng trên TrustKeys testnet."
        },
        {
            "id": "bc-s7-q57",
            "prompt": "Thực hành bảo mật nào được worksheet Lab 7 nhấn mạnh?",
            "options": [
                {
                    "id": "a",
                    "text": "Dán seed phrase thật vào .env cho tiện"
                },
                {
                    "id": "b",
                    "text": "Sử dụng private key của ví có tài sản thật"
                },
                {
                    "id": "c",
                    "text": "Chỉ dùng dedicated test account và tuyệt đối không dán mnemonic/private key giữ real funds vào lab"
                },
                {
                    "id": "d",
                    "text": "Commit .env lên GitHub"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Lab yêu cầu chỉ dùng test account và không đưa mnemonic hoặc private key chứa tài sản thật vào project."
        },
        {
            "id": "bc-s7-q58",
            "prompt": "Vì sao Lab 7 pin @openzeppelin/contracts@5.0.2 và dùng EVM paris?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì OpenZeppelin 5.0.2 là phiên bản duy nhất có ERC-20"
                },
                {
                    "id": "b",
                    "text": "Vì OpenZeppelin mới hơn dùng Cancun mcopy, trong khi TrustKeys Geth target paris và không hỗ trợ opcode đó"
                },
                {
                    "id": "c",
                    "text": "Vì Paris luôn rẻ gas hơn Cancun"
                },
                {
                    "id": "d",
                    "text": "Vì Hardhat không chạy Solidity mới"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Đây là yêu cầu tương thích môi trường của lab: OZ mới dùng opcode Cancun mà TrustKeys hiện target Paris."
        },
        {
            "id": "bc-s7-q59",
            "prompt": "Cấu hình Solidity nào được dùng trong project Lab 7?",
            "options": [
                {
                    "id": "a",
                    "text": "Solidity 0.4.0, optimizer off"
                },
                {
                    "id": "b",
                    "text": "Solidity 0.8.24, optimizer enabled với runs: 200"
                },
                {
                    "id": "c",
                    "text": "Solidity 1.0.0"
                },
                {
                    "id": "d",
                    "text": "Không dùng compiler"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Worksheet chỉ định compiler 0.8.24 với optimizer bật và runs bằng 200."
        },
        {
            "id": "bc-s7-q60",
            "prompt": "ClassToken trong Lab 7 phải kế thừa những contract nào và có cấu hình nào?",
            "options": [
                {
                    "id": "a",
                    "text": "ERC721, Ownable, Pausable; symbol NFT"
                },
                {
                    "id": "b",
                    "text": "ERC20, ERC20Capped, ERC20Permit; name ClassToken, symbol CTK, cap 1,000,000 × 10^18 base units"
                },
                {
                    "id": "c",
                    "text": "Chỉ ERC20 với unlimited supply"
                },
                {
                    "id": "d",
                    "text": "ERC1155, ERC4626, ERC721"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ClassToken kết hợp ERC20 với cap và permit; tổng cap là một triệu token với 18 decimals."
        },
        {
            "id": "bc-s7-q61",
            "prompt": "Constructor của ClassToken thực hiện gì với supply?",
            "options": [
                {
                    "id": "a",
                    "text": "Không mint token nào"
                },
                {
                    "id": "b",
                    "text": "Mint 50% cap cho DEX"
                },
                {
                    "id": "c",
                    "text": "Mint toàn bộ cap cho initialHolder, khiến initial supply bằng cap"
                },
                {
                    "id": "d",
                    "text": "Mint token sau mỗi transaction"
                }
            ],
            "correctOptionId": "c",
            "explanation": "Lab yêu cầu constructor mint toàn bộ cap cho initialHolder ngay khi deploy."
        },
        {
            "id": "bc-s7-q62",
            "prompt": "Vì sao ClassToken phải override _update(...) với override(ERC20, ERC20Capped)?",
            "options": [
                {
                    "id": "a",
                    "text": "Vì Solidity bắt mọi function đều override"
                },
                {
                    "id": "b",
                    "text": "Vì cả ERC20 và ERC20Capped đều định nghĩa logic liên quan _update, tạo multiple-inheritance override requirement"
                },
                {
                    "id": "c",
                    "text": "Vì _update là event"
                },
                {
                    "id": "d",
                    "text": "Vì ERC20Permit yêu cầu nó"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Khi nhiều parent cùng định nghĩa function, Solidity cần child contract override rõ ràng."
        },
        {
            "id": "bc-s7-q63",
            "prompt": "Giả sử deployer chính là initialHolder. Bộ kiểm thử ban đầu nào phù hợp với ClassToken?",
            "options": [
                {
                    "id": "a",
                    "text": "cap() = 0 và totalSupply() = 0"
                },
                {
                    "id": "b",
                    "text": "Kiểm tra name, symbol, decimals và cap() == totalSupply() == balanceOf(deployer)"
                },
                {
                    "id": "c",
                    "text": "Chỉ kiểm tra contract address"
                },
                {
                    "id": "d",
                    "text": "totalSupply() phải tăng sau mọi transfer"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Vì mint toàn bộ cap cho initialHolder khi deploy, cap, totalSupply và balance ban đầu của holder phải khớp."
        },
        {
            "id": "bc-s7-q64",
            "prompt": "Khi test transfer của ClassToken, hành vi nào được kỳ vọng?",
            "options": [
                {
                    "id": "a",
                    "text": "Transfer hợp lệ thay đổi balance và emit Transfer; transfer vượt balance revert với ERC20InsufficientBalance"
                },
                {
                    "id": "b",
                    "text": "Transfer hợp lệ mint thêm supply"
                },
                {
                    "id": "c",
                    "text": "Transfer vượt balance tạo balance âm"
                },
                {
                    "id": "d",
                    "text": "Không có event nào được emit"
                }
            ],
            "correctOptionId": "a",
            "explanation": "Transfer chỉ di chuyển balance và phải fail nếu sender không đủ token."
        },
        {
            "id": "bc-s7-q65",
            "prompt": "Trong test approve → transferFrom, điều gì cần xảy ra sau khi spender sử dụng một phần allowance?",
            "options": [
                {
                    "id": "a",
                    "text": "Allowance tăng lên"
                },
                {
                    "id": "b",
                    "text": "Allowance không đổi trong mọi trường hợp"
                },
                {
                    "id": "c",
                    "text": "Allowance giảm tương ứng, balances thay đổi nhưng totalSupply vẫn không đổi"
                },
                {
                    "id": "d",
                    "text": "totalSupply giảm bằng lượng transfer"
                }
            ],
            "correctOptionId": "c",
            "explanation": "transferFrom tiêu allowance và di chuyển token; một transfer thông thường không làm thay đổi totalSupply."
        },
        {
            "id": "bc-s7-q66",
            "prompt": "ClassBadge được thiết kế như thế nào?",
            "options": [
                {
                    "id": "a",
                    "text": "Kế thừa ERC-20 và bất cứ ai cũng mint"
                },
                {
                    "id": "b",
                    "text": "Kế thừa ERC721 + Ownable; mint(to, studentName) là onlyOwner, dùng _safeMint và trả về tokenId mới"
                },
                {
                    "id": "c",
                    "text": "Kế thừa ERC-1155 và không có tokenId"
                },
                {
                    "id": "d",
                    "text": "NFT được mint off-chain"
                }
            ],
            "correctOptionId": "b",
            "explanation": "ClassBadge là ERC-721 do owner kiểm soát mint và dùng _safeMint để tránh gửi NFT vào contract không hỗ trợ nhận ERC-721."
        },
        {
            "id": "bc-s7-q67",
            "prompt": "Phát biểu nào mô tả đầy đủ nhất tokenURI và error handling của ClassBadge?",
            "options": [
                {
                    "id": "a",
                    "text": "tokenURI chỉ trả tên sinh viên; mọi tokenId đều hợp lệ"
                },
                {
                    "id": "b",
                    "text": "tokenURI trả data:application/json;base64,...; JSON có name, description, Student attribute và Base64 SVG image; tên rỗng revert EmptyName, token chưa mint gây ERC721NonexistentToken"
                },
                {
                    "id": "c",
                    "text": "Metadata bắt buộc lấy từ IPFS"
                },
                {
                    "id": "d",
                    "text": "Image lưu ở máy của owner và không có JSON"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Lab xây metadata hoàn toàn on-chain và kiểm tra cả input rỗng lẫn tokenId chưa tồn tại."
        },
        {
            "id": "bc-s7-q68",
            "prompt": "Scenario nào mô tả đúng phần deploy/interact và permit bonus của Lab 7?",
            "options": [
                {
                    "id": "a",
                    "text": "TrustKeys không có explorer nên không thể kiểm tra transaction; permit không có nonce"
                },
                {
                    "id": "b",
                    "text": "Có thể xác nhận 100 CTK bằng MetaMask hoặc ethers balanceOf/event logs, decode badge bằng tokenURI; owner ký permit bằng signTypedData, relayer submit, allowance được set, nonce tăng và expired deadline phải revert"
                },
                {
                    "id": "c",
                    "text": "Permit bắt buộc owner tự gửi transaction và trả gas"
                },
                {
                    "id": "d",
                    "text": "tokenURI chỉ đọc được qua IPFS gateway"
                }
            ],
            "correctOptionId": "b",
            "explanation": "Lab đọc state bằng ethers khi không có explorer và kiểm thử permit gồm allowance, nonce cùng expired deadline."
        }
    ]
};
