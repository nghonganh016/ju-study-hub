import type { Chapter } from "@/types/quiz";
// Session 6 — Smart Contract Programming I
// Generated from Session06-slides.pdf and Lab 06 worksheet.
// Schema: { id, title, description, revision, questions[] }
// Each question: { id, prompt, options[{id,text}], correctOptionId, explanation, source }

export const session6: Chapter = {
  "id": "session-6",
  "title": "Session 6 — Smart Contract Programming I",
  "description": "Solidity & Hardhat: contract anatomy, types, data locations, events/errors, testing, deployment to TrustKeys, Lab 6 and final-project registration.",
  "revision": 0,
  "questions": [
    {
      "id": "bc-s6-q01",
      "prompt": "Phát biểu nào mô tả đúng nhất một smart contract theo Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Một chương trình được deploy tại một địa chỉ, trong đó các hàm public tạo thành API để tương tác"
        },
        {
          "id": "b",
          "text": "Một tài khoản EOA có thể tự chạy mã bytecode"
        },
        {
          "id": "c",
          "text": "Một cơ sở dữ liệu off-chain chỉ dùng để lưu event"
        },
        {
          "id": "d",
          "text": "Một file cấu hình mạng được lưu trong MetaMask"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Smart contract là chương trình được deploy tại một địa chỉ; các hàm public là API để người dùng và hợp đồng khác tương tác.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q02",
      "prompt": "Tính deterministic của smart contract có ý nghĩa gì?",
      "options": [
        {
          "id": "a",
          "text": "Mỗi node có thể cho ra kết quả khác nhau miễn là phí gas giống nhau"
        },
        {
          "id": "b",
          "text": "Chỉ validator đề xuất block cần thực thi contract"
        },
        {
          "id": "c",
          "text": "Mọi node thực thi lại cùng logic trên cùng trạng thái và phải thống nhất kết quả"
        },
        {
          "id": "d",
          "text": "Kết quả phụ thuộc vào thời gian hệ điều hành của từng node"
        }
      ],
      "correctOptionId": "c",
      "explanation": "EVM yêu cầu cùng bytecode và cùng trạng thái phải cho cùng kết quả trên mọi node.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q03",
      "prompt": "Vì sao slide nhấn mạnh phải test trước khi deploy smart contract?",
      "options": [
        {
          "id": "a",
          "text": "Vì Hardhat chỉ compile được code có test"
        },
        {
          "id": "b",
          "text": "Vì source code Solidity sẽ bị xóa sau khi compile"
        },
        {
          "id": "c",
          "text": "Vì contract mặc định gần như immutable; lỗi đã deploy rất khó sửa trực tiếp"
        },
        {
          "id": "d",
          "text": "Vì testnet không cho phép deploy contract chưa test"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Code contract đã deploy về cơ bản không thể patch tại chỗ, nên lỗi có thể tồn tại lâu dài.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q04",
      "prompt": "Solidity được mô tả trong Session 6 là ngôn ngữ như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Ngôn ngữ truy vấn cho blockchain"
        },
        {
          "id": "b",
          "text": "Ngôn ngữ chỉ dùng để viết frontend dApp"
        },
        {
          "id": "c",
          "text": "Dynamically typed và chạy trực tiếp trên trình duyệt"
        },
        {
          "id": "d",
          "text": "Statically typed và compile thành EVM bytecode"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Solidity là ngôn ngữ kiểu tĩnh và compiler tạo EVM bytecode.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q05",
      "prompt": "Trong recap Session 5, một contract trên Ethereum được tóm gọn là gì?",
      "options": [
        {
          "id": "a",
          "text": "Code + storage tại một địa chỉ"
        },
        {
          "id": "b",
          "text": "ABI + explorer"
        },
        {
          "id": "c",
          "text": "Block header + transaction log"
        },
        {
          "id": "d",
          "text": "Private key + balance"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Contract được mô tả là code và storage sống tại một địa chỉ.",
      "source": "Session 6, slide 4"
    },
    {
      "id": "bc-s6-q06",
      "prompt": "Theo recap Session 5 trong Session 6, nhận định nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ việc chuyển ETH mới tốn gas"
        },
        {
          "id": "b",
          "text": "Mọi thay đổi state đều tốn gas và cơ chế phí theo EIP-1559"
        },
        {
          "id": "c",
          "text": "Các hàm view luôn tốn cùng mức gas như hàm ghi state"
        },
        {
          "id": "d",
          "text": "Gas chỉ tồn tại trên mainnet"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Mọi thay đổi trạng thái cần gas; slide nhắc lại cơ chế phí EIP-1559.",
      "source": "Session 6, slide 4"
    },
    {
      "id": "bc-s6-q07",
      "prompt": "Mục tiêu kỹ thuật cốt lõi của Session 6 là chu trình nào?",
      "options": [
        {
          "id": "a",
          "text": "Deploy → test → compile → interact"
        },
        {
          "id": "b",
          "text": "Write → mine → bridge → stake"
        },
        {
          "id": "c",
          "text": "Compile → test → deploy → interact"
        },
        {
          "id": "d",
          "text": "Sign → hash → mine → finalize"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Session 6 đặt mục tiêu dùng Hardhat theo vòng lặp compile, test, deploy, interact.",
      "source": "Session 6, slides 2 and 34"
    },
    {
      "id": "bc-s6-q08",
      "prompt": "Sau khi deploy contract lên TrustKeys L1 testnet, Session 6 yêu cầu có thể làm gì dù không có public explorer?",
      "options": [
        {
          "id": "a",
          "text": "Bắt buộc dùng IPFS"
        },
        {
          "id": "b",
          "text": "Không thể đọc dữ liệu contract"
        },
        {
          "id": "c",
          "text": "Chỉ chờ validator gửi dữ liệu về email"
        },
        {
          "id": "d",
          "text": "Đọc state và event bằng ethers"
        }
      ],
      "correctOptionId": "d",
      "explanation": "TrustKeys không có public explorer trong bài học, nên state/event được đọc bằng ethers, script hoặc console.",
      "source": "Session 6, slides 2 and 37"
    },
    {
      "id": "bc-s6-q09",
      "prompt": "Dòng `// SPDX-License-Identifier: MIT` có vai trò gì?",
      "options": [
        {
          "id": "a",
          "text": "Khai báo license theo định dạng máy đọc được; compiler sẽ cảnh báo nếu thiếu"
        },
        {
          "id": "b",
          "text": "Khóa compiler ở đúng phiên bản 0.8.24"
        },
        {
          "id": "c",
          "text": "Tự động import OpenZeppelin"
        },
        {
          "id": "d",
          "text": "Chỉ định chainId của contract"
        }
      ],
      "correctOptionId": "a",
      "explanation": "SPDX là license tag machine-readable, không phải cấu hình compiler hay mạng.",
      "source": "Session 6, slide 8"
    },
    {
      "id": "bc-s6-q10",
      "prompt": "Với `pragma solidity ^0.8.24;`, compiler version nào phù hợp?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ đúng 0.8.24"
        },
        {
          "id": "b",
          "text": "Mọi phiên bản >=0.8.24 và <0.9.0"
        },
        {
          "id": "c",
          "text": "Mọi phiên bản >=0.8.24 kể cả 1.x"
        },
        {
          "id": "d",
          "text": "Chỉ các phiên bản <0.8.24"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Dấu ^ cho phép các bản 0.8.x từ 0.8.24 trở lên nhưng không sang 0.9.0.",
      "source": "Session 6, slide 8"
    },
    {
      "id": "bc-s6-q11",
      "prompt": "Từ Solidity 0.8.0 trở đi, overflow/underflow số học mặc định được xử lý thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ revert trên testnet"
        },
        {
          "id": "b",
          "text": "Tự wrap mà không báo lỗi"
        },
        {
          "id": "c",
          "text": "Tự revert nên không còn cần SafeMath cho hành vi mặc định"
        },
        {
          "id": "d",
          "text": "Tự chuyển sang số thực"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Solidity 0.8+ có checked arithmetic mặc định và revert khi overflow/underflow.",
      "source": "Session 6, slide 8"
    },
    {
      "id": "bc-s6-q12",
      "prompt": "Phát biểu nào đúng về state variable khai báo ở contract level?",
      "options": [
        {
          "id": "a",
          "text": "Luôn được lưu trong calldata"
        },
        {
          "id": "b",
          "text": "Không thể đọc từ bên ngoài dù là public"
        },
        {
          "id": "c",
          "text": "Chỉ tồn tại trong một function call"
        },
        {
          "id": "d",
          "text": "Persist trong on-chain storage giữa các transaction"
        }
      ],
      "correctOptionId": "d",
      "explanation": "State variable ở cấp contract tồn tại bền vững trong storage qua nhiều transaction.",
      "source": "Session 6, slide 9"
    },
    {
      "id": "bc-s6-q13",
      "prompt": "Điều gì xảy ra khi khai báo một state variable là `public`?",
      "options": [
        {
          "id": "a",
          "text": "Variable trở thành bí mật đối với off-chain code"
        },
        {
          "id": "b",
          "text": "Variable chuyển từ storage sang memory"
        },
        {
          "id": "c",
          "text": "Variable không thể bị ghi nữa"
        },
        {
          "id": "d",
          "text": "Compiler tự tạo getter function"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Solidity tự sinh getter cho public state variable.",
      "source": "Session 6, slide 9"
    },
    {
      "id": "bc-s6-q14",
      "prompt": "Theo ví dụ `address public immutable owner;`, `owner` có đặc điểm nào?",
      "options": [
        {
          "id": "a",
          "text": "Chiếm một storage slot vĩnh viễn và có thể đổi bất kỳ lúc nào"
        },
        {
          "id": "b",
          "text": "Được set một lần trong constructor và giá trị được đưa vào bytecode thay vì storage slot thông thường"
        },
        {
          "id": "c",
          "text": "Chỉ tồn tại trong calldata"
        },
        {
          "id": "d",
          "text": "Chỉ có thể đọc bên trong contract"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Immutable được gán một lần lúc khởi tạo và không dùng storage slot như state variable thông thường.",
      "source": "Session 6, slides 9 and 23"
    },
    {
      "id": "bc-s6-q15",
      "prompt": "Constructor trong Solidity được thực thi khi nào?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ khi gọi thủ công từ Hardhat console"
        },
        {
          "id": "b",
          "text": "Mỗi lần có transaction gọi contract"
        },
        {
          "id": "c",
          "text": "Đúng một lần khi deploy contract"
        },
        {
          "id": "d",
          "text": "Mỗi block một lần"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Constructor chạy đúng một lần trong lúc deploy.",
      "source": "Session 6, slide 10"
    },
    {
      "id": "bc-s6-q16",
      "prompt": "Trong `constructor() { owner = msg.sender; }`, ai trở thành `owner`?",
      "options": [
        {
          "id": "a",
          "text": "Validator của block"
        },
        {
          "id": "b",
          "text": "Địa chỉ RPC endpoint"
        },
        {
          "id": "c",
          "text": "Địa chỉ contract"
        },
        {
          "id": "d",
          "text": "Địa chỉ gọi transaction deploy"
        }
      ],
      "correctOptionId": "d",
      "explanation": "`msg.sender` trong constructor là tài khoản thực hiện việc deploy.",
      "source": "Session 6, slide 10"
    },
    {
      "id": "bc-s6-q17",
      "prompt": "Ghép nào sau đây về các global variable là đúng?",
      "options": [
        {
          "id": "a",
          "text": "`msg.sender`: người gọi; `msg.value`: wei gửi kèm; `block.timestamp`: thời gian block; `block.number`: chiều cao block"
        },
        {
          "id": "b",
          "text": "`msg.sender`: owner cố định; `msg.value`: gasLimit; `block.number`: chainId"
        },
        {
          "id": "c",
          "text": "`msg.sender`: contract address; `msg.value`: balance contract; `block.timestamp`: thời gian máy local"
        },
        {
          "id": "d",
          "text": "`msg.sender`: wei gửi kèm; `msg.value`: người gọi; `block.number`: timestamp"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Đây là đúng các ý nghĩa được liệt kê trong slide.",
      "source": "Session 6, slide 10"
    },
    {
      "id": "bc-s6-q18",
      "prompt": "Cách dùng `block.timestamp` nào phù hợp nhất theo Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Dùng làm nguồn randomness an toàn cho lottery"
        },
        {
          "id": "b",
          "text": "Dùng cho deadline thô theo ngày, nhưng tránh timing cực chính xác hoặc randomness"
        },
        {
          "id": "c",
          "text": "Dùng để tạo private key"
        },
        {
          "id": "d",
          "text": "Dùng để thay thế chainId"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Timestamp do block proposer đặt và có thể bị dịch vài giây, nên không phải trusted clock hay randomness source.",
      "source": "Session 6, slide 11"
    },
    {
      "id": "bc-s6-q19",
      "prompt": "Ghép visibility nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "public và external hoàn toàn giống nhau trong mọi trường hợp"
        },
        {
          "id": "b",
          "text": "public: chỉ bên ngoài; external: mọi nơi; internal: chỉ child; private: off-chain không đọc được"
        },
        {
          "id": "c",
          "text": "public: external + internal; external: chỉ outside call; internal: contract này + children; private: contract này"
        },
        {
          "id": "d",
          "text": "public: chỉ contract này; external: child; internal: mọi nơi; private: EOA"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Slide phân biệt public, external, internal, private theo phạm vi gọi.",
      "source": "Session 6, slide 12"
    },
    {
      "id": "bc-s6-q20",
      "prompt": "Vì sao `private` trong Solidity không đồng nghĩa với 'secret'?",
      "options": [
        {
          "id": "a",
          "text": "Vì private chỉ áp dụng cho mainnet"
        },
        {
          "id": "b",
          "text": "Vì compiler đổi private thành public sau deploy"
        },
        {
          "id": "c",
          "text": "Vì private variable luôn được emit thành event"
        },
        {
          "id": "d",
          "text": "Vì dữ liệu on-chain vẫn có thể được đọc off-chain; private chỉ hạn chế truy cập ở tầng ngôn ngữ"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Blockchain state là công khai; private chỉ ngăn truy cập trực tiếp từ code khác.",
      "source": "Session 6, slide 12"
    },
    {
      "id": "bc-s6-q21",
      "prompt": "Hàm nào dưới đây phù hợp với từ khóa `view`?",
      "options": [
        {
          "id": "a",
          "text": "Hàm không được đọc bất kỳ state nào"
        },
        {
          "id": "b",
          "text": "Hàm bắt buộc nhận ETH"
        },
        {
          "id": "c",
          "text": "Hàm chỉ chạy trong constructor"
        },
        {
          "id": "d",
          "text": "Hàm đọc state nhưng không ghi state"
        }
      ],
      "correctOptionId": "d",
      "explanation": "`view` cho phép đọc state nhưng không thay đổi state.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q22",
      "prompt": "Hàm `pure` khác `view` ở điểm nào?",
      "options": [
        {
          "id": "a",
          "text": "pure được ghi storage còn view thì không"
        },
        {
          "id": "b",
          "text": "pure không truy cập state; view có thể đọc state"
        },
        {
          "id": "c",
          "text": "pure bắt buộc payable"
        },
        {
          "id": "d",
          "text": "pure chỉ gọi từ external"
        }
      ],
      "correctOptionId": "b",
      "explanation": "`pure` không đụng tới contract state, còn `view` có thể đọc state.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q23",
      "prompt": "Từ khóa `payable` cho phép điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Hàm tự động gửi hết balance cho caller"
        },
        {
          "id": "b",
          "text": "Hàm có thể nhận `msg.value`"
        },
        {
          "id": "c",
          "text": "Hàm được miễn gas"
        },
        {
          "id": "d",
          "text": "Hàm có thể thay đổi chainId"
        }
      ],
      "correctOptionId": "b",
      "explanation": "`payable` cho phép function nhận native coin kèm theo lời gọi.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q24",
      "prompt": "Một hàm `view` được gọi off-chain bằng `eth_call` có đặc điểm nào theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Làm thay đổi state tạm thời"
        },
        {
          "id": "b",
          "text": "Chỉ chạy được trên Hardhat local chain"
        },
        {
          "id": "c",
          "text": "Vẫn phải trả gas on-chain"
        },
        {
          "id": "d",
          "text": "Không tạo transaction và miễn phí đối với người gọi off-chain"
        }
      ],
      "correctOptionId": "d",
      "explanation": "eth_call mô phỏng việc thực thi để đọc dữ liệu mà không ghi vào chain.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q25",
      "prompt": "Nhóm nào chỉ gồm value types theo slide?",
      "options": [
        {
          "id": "a",
          "text": "string, array, struct, mapping"
        },
        {
          "id": "b",
          "text": "string, bytes, uint256, mapping"
        },
        {
          "id": "c",
          "text": "array, address, struct, bool"
        },
        {
          "id": "d",
          "text": "uint256, bool, address, bytes32, enum"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Value types được copy khi gán; string/bytes/array/struct/mapping là reference types.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q26",
      "prompt": "Reference types như `string`, `bytes`, array và struct cần thêm thông tin gì?",
      "options": [
        {
          "id": "a",
          "text": "chainId"
        },
        {
          "id": "b",
          "text": "data location"
        },
        {
          "id": "c",
          "text": "gasPrice cố định"
        },
        {
          "id": "d",
          "text": "private key"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Reference types cần xác định data location như storage, memory hoặc calldata khi phù hợp.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q27",
      "prompt": "Với `uint256 a = 5; uint256 b = a;`, điều gì đúng?",
      "options": [
        {
          "id": "a",
          "text": "Đoạn code không hợp lệ"
        },
        {
          "id": "b",
          "text": "b là reference tới a nên đổi a sẽ đổi b"
        },
        {
          "id": "c",
          "text": "b là bản sao độc lập vì uint256 là value type"
        },
        {
          "id": "d",
          "text": "Cả a và b phải nằm trong calldata"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Value type được copy khi assignment.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q28",
      "prompt": "Khác biệt quan trọng giữa `address` và `address payable` trong slide là gì?",
      "options": [
        {
          "id": "a",
          "text": "`address payable` không thể giữ ETH"
        },
        {
          "id": "b",
          "text": "Không có khác biệt nào"
        },
        {
          "id": "c",
          "text": "Chỉ `address payable` mới có thể dùng `.transfer/.send`"
        },
        {
          "id": "d",
          "text": "`address` chỉ dùng trên Bitcoin"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Các thao tác transfer/send native coin yêu cầu address payable theo nội dung slide.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q29",
      "prompt": "Cặp quy đổi nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "1 gwei = 10^9 wei; 1 ether = 10^18 wei"
        },
        {
          "id": "b",
          "text": "1 gwei = 10^18 wei; 1 ether = 10^9 wei"
        },
        {
          "id": "c",
          "text": "1 gwei = 10^3 wei; 1 ether = 10^6 wei"
        },
        {
          "id": "d",
          "text": "1 gwei = 10^6 wei; 1 ether = 10^9 wei"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Slide dùng các đơn vị 1 gwei = 10^9 wei và 1 ether = 10^18 wei.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q30",
      "prompt": "Với `mapping(address => string) _names`, một key chưa từng được gán sẽ trả về gì?",
      "options": [
        {
          "id": "a",
          "text": "Luôn revert"
        },
        {
          "id": "b",
          "text": "Zero/default value của kiểu value"
        },
        {
          "id": "c",
          "text": "Một key ngẫu nhiên"
        },
        {
          "id": "d",
          "text": "null theo kiểu JavaScript"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Mapping về mặt ngữ nghĩa có giá trị mặc định cho mọi key.",
      "source": "Session 6, slide 15"
    },
    {
      "id": "bc-s6-q31",
      "prompt": "Hạn chế cốt lõi của mapping khiến ClassRegistry cần thêm `address[]` là gì?",
      "options": [
        {
          "id": "a",
          "text": "Mapping luôn đắt hơn array trong mọi thao tác"
        },
        {
          "id": "b",
          "text": "Mapping không thể ghi dữ liệu"
        },
        {
          "id": "c",
          "text": "Mapping không có length và không thể liệt kê/iterate toàn bộ keys"
        },
        {
          "id": "d",
          "text": "Mapping chỉ nhận key kiểu uint"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Mapping tra cứu key hiệu quả nhưng không cho enumerate keys; vì vậy cần mảng song song.",
      "source": "Session 6, slide 15; Lab 6 Q3"
    },
    {
      "id": "bc-s6-q32",
      "prompt": "Nhận định nào đúng về `struct`, `enum` và dynamic array?",
      "options": [
        {
          "id": "a",
          "text": "enum luôn cần calldata; struct không dùng được trong storage"
        },
        {
          "id": "b",
          "text": "Dynamic array không thể chứa struct"
        },
        {
          "id": "c",
          "text": "struct chỉ chứa một field; enum lưu string; array không có length"
        },
        {
          "id": "d",
          "text": "struct gom nhiều field; enum là các hằng số có tên; dynamic array hỗ trợ push/pop/length"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Slide minh họa Member struct, Status enum và các thao tác push/pop/length.",
      "source": "Session 6, slide 16"
    },
    {
      "id": "bc-s6-q33",
      "prompt": "Mục đích của kỹ thuật swap-and-pop khi xóa phần tử khỏi dynamic array là gì?",
      "options": [
        {
          "id": "a",
          "text": "Sắp xếp mảng theo alphabet"
        },
        {
          "id": "b",
          "text": "Mã hóa dữ liệu trong array"
        },
        {
          "id": "c",
          "text": "Biến array thành mapping"
        },
        {
          "id": "d",
          "text": "Giữ mảng dense và tránh phải dịch chuyển hàng loạt phần tử"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đưa phần tử cuối vào vị trí cần xóa rồi pop giúp xóa rẻ mà không để lỗ trống.",
      "source": "Session 6, slide 16; Lab 6"
    },
    {
      "id": "bc-s6-q34",
      "prompt": "Thứ tự trực giác về chi phí data location nào phù hợp nhất với Session 6?",
      "options": [
        {
          "id": "a",
          "text": "storage rẻ nhất, calldata đắt nhất"
        },
        {
          "id": "b",
          "text": "calldata thường rẻ cho input chỉ đọc, memory cho dữ liệu tạm, storage đắt và bền"
        },
        {
          "id": "c",
          "text": "memory bền vĩnh viễn, storage chỉ sống trong call"
        },
        {
          "id": "d",
          "text": "calldata có thể sửa trực tiếp và persist qua transaction"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Calldata là input read-only rẻ; memory tạm; storage là persistent state và đắt.",
      "source": "Session 6, slides 17-18"
    },
    {
      "id": "bc-s6-q35",
      "prompt": "Vì sao `register(string calldata name)` thường rẻ hơn dùng `string memory name` cho external read-only parameter?",
      "options": [
        {
          "id": "a",
          "text": "calldata không tính gas trong mọi trường hợp"
        },
        {
          "id": "b",
          "text": "calldata không cần copy tham số vào memory trước khi đọc"
        },
        {
          "id": "c",
          "text": "calldata được lưu vĩnh viễn trong storage"
        },
        {
          "id": "d",
          "text": "memory không thể chứa string"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đối với external input chỉ đọc, calldata tránh một bước copy vào memory.",
      "source": "Session 6, slide 18; Lab 6 Q2"
    },
    {
      "id": "bc-s6-q36",
      "prompt": "Khi nào nên dùng `memory` theo quy tắc trong slide?",
      "options": [
        {
          "id": "a",
          "text": "Khi muốn frontend filter event"
        },
        {
          "id": "b",
          "text": "Khi muốn khai báo immutable"
        },
        {
          "id": "c",
          "text": "Khi cần sửa một bản sao tạm trong quá trình thực thi"
        },
        {
          "id": "d",
          "text": "Khi dữ liệu phải tồn tại vĩnh viễn qua nhiều transaction"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Memory phù hợp cho dữ liệu tạm trong một call, nhất là khi cần chỉnh sửa bản sao.",
      "source": "Session 6, slide 18"
    },
    {
      "id": "bc-s6-q37",
      "prompt": "Phát biểu nào đúng về `storage`?",
      "options": [
        {
          "id": "a",
          "text": "Tham chiếu tới persistent state và chỉ nên ghi khi dữ liệu cần sống qua transaction"
        },
        {
          "id": "b",
          "text": "Read-only giống calldata"
        },
        {
          "id": "c",
          "text": "Bị xóa sau mỗi function call"
        },
        {
          "id": "d",
          "text": "Chỉ dùng cho tham số external"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Storage là state bền; ghi storage đắt nên chỉ dùng khi cần lưu lâu dài.",
      "source": "Session 6, slides 9 and 18"
    },
    {
      "id": "bc-s6-q38",
      "prompt": "Event như `Registered(address indexed who, string name)` được lưu ở đâu?",
      "options": [
        {
          "id": "a",
          "text": "Trong transaction log/receipt, không phải contract storage"
        },
        {
          "id": "b",
          "text": "Trong localStorage của trình duyệt"
        },
        {
          "id": "c",
          "text": "Trong private key của caller"
        },
        {
          "id": "d",
          "text": "Trong calldata của mọi transaction sau đó"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Event được ghi vào log của receipt nên rẻ hơn lưu cùng dữ liệu vào storage.",
      "source": "Session 6, slide 19"
    },
    {
      "id": "bc-s6-q39",
      "prompt": "Tác dụng chính của `indexed` trên field event là gì?",
      "options": [
        {
          "id": "a",
          "text": "Bỏ field khỏi receipt"
        },
        {
          "id": "b",
          "text": "Mã hóa field để contract khác không đọc được"
        },
        {
          "id": "c",
          "text": "Biến field thành topic có thể filter nhanh; tối đa 3 indexed fields cho event thông thường"
        },
        {
          "id": "d",
          "text": "Lưu field vào storage slot"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Indexed fields thành topics để off-chain code lọc nhanh.",
      "source": "Session 6, slide 19"
    },
    {
      "id": "bc-s6-q40",
      "prompt": "Ai có thể đọc event đã emit theo mô hình trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Không ai đọc được sau khi block finalize"
        },
        {
          "id": "b",
          "text": "Chỉ validator tạo block"
        },
        {
          "id": "c",
          "text": "Contract tự đọc lại event của chính nó bằng Solidity"
        },
        {
          "id": "d",
          "text": "Off-chain code như frontend/ethers có thể đọc; contract không đọc lại log của chính mình"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Events dành cho hệ thống off-chain/indexer; contract không truy vấn log lịch sử của chính nó.",
      "source": "Session 6, slide 19"
    },
    {
      "id": "bc-s6-q41",
      "prompt": "Vì sao custom error thường tiết kiệm gas hơn `require(cond, \"long reason string\")`?",
      "options": [
        {
          "id": "a",
          "text": "Custom error dùng selector 4 byte + arguments thay vì lưu reason string dài"
        },
        {
          "id": "b",
          "text": "Custom error chỉ chạy off-chain"
        },
        {
          "id": "c",
          "text": "Require luôn ghi reason vào storage"
        },
        {
          "id": "d",
          "text": "Custom error không cần revert"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Custom error mã hóa ngắn gọn hơn reason string.",
      "source": "Session 6, slide 20"
    },
    {
      "id": "bc-s6-q42",
      "prompt": "Khi một transaction `revert`, điều gì xảy ra?",
      "options": [
        {
          "id": "a",
          "text": "Mọi state change của transaction bị hoàn tác và gas còn lại được trả lại"
        },
        {
          "id": "b",
          "text": "Toàn bộ gas đã cấp luôn được hoàn lại"
        },
        {
          "id": "c",
          "text": "State vẫn giữ nhưng event bị xóa"
        },
        {
          "id": "d",
          "text": "Contract tự hủy"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Revert undo state changes; phần gas đã dùng không quay lại, còn gas chưa dùng được hoàn.",
      "source": "Session 6, slide 20"
    },
    {
      "id": "bc-s6-q43",
      "prompt": "Trong modifier sau, ký hiệu `_;` có ý nghĩa gì? `modifier onlyOwner(){ if(msg.sender!=owner) revert NotOwner(); _; }`",
      "options": [
        {
          "id": "a",
          "text": "Gửi event"
        },
        {
          "id": "b",
          "text": "Dừng contract vĩnh viễn"
        },
        {
          "id": "c",
          "text": "Đánh dấu vị trí thân function được bọc sẽ thực thi"
        },
        {
          "id": "d",
          "text": "Reset msg.sender"
        }
      ],
      "correctOptionId": "c",
      "explanation": "`_;` là chỗ Solidity chèn và chạy function body.",
      "source": "Session 6, slide 21"
    },
    {
      "id": "bc-s6-q44",
      "prompt": "Nhóm use case nào phù hợp với modifier theo slide?",
      "options": [
        {
          "id": "a",
          "text": "IPFS pinning, explorer indexing, RPC load balancing"
        },
        {
          "id": "b",
          "text": "Key generation, mnemonic backup, signing"
        },
        {
          "id": "c",
          "text": "Access control, pause switch, reentrancy guard"
        },
        {
          "id": "d",
          "text": "Hashing, mining, bridge"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Modifier thường đóng vai trò reusable guard quanh function.",
      "source": "Session 6, slide 21"
    },
    {
      "id": "bc-s6-q45",
      "prompt": "Khi contract nhận một plain native-coin transfer với calldata rỗng, function nào được ưu tiên?",
      "options": [
        {
          "id": "a",
          "text": "receive() external payable"
        },
        {
          "id": "b",
          "text": "fallback() external payable"
        },
        {
          "id": "c",
          "text": "pure()"
        },
        {
          "id": "d",
          "text": "constructor"
        }
      ],
      "correctOptionId": "a",
      "explanation": "`receive` chạy cho bare coin send khi không có calldata.",
      "source": "Session 6, slide 22"
    },
    {
      "id": "bc-s6-q46",
      "prompt": "Khi calldata có selector không khớp function nào, Solidity có thể gọi gì?",
      "options": [
        {
          "id": "a",
          "text": "receive() trong mọi trường hợp"
        },
        {
          "id": "b",
          "text": "fallback()"
        },
        {
          "id": "c",
          "text": "constructor()"
        },
        {
          "id": "d",
          "text": "modifier onlyOwner()"
        }
      ],
      "correctOptionId": "b",
      "explanation": "`fallback` xử lý unknown selector/leftover cases và cũng thường là hook trong proxy.",
      "source": "Session 6, slide 22"
    },
    {
      "id": "bc-s6-q47",
      "prompt": "Nếu contract không có `receive` hoặc `fallback` payable phù hợp, một plain coin transfer sẽ thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Tự động biến thành event"
        },
        {
          "id": "b",
          "text": "Tự tạo function mới"
        },
        {
          "id": "c",
          "text": "Bị từ chối/revert"
        },
        {
          "id": "d",
          "text": "Luôn được chuyển vào owner"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Không có điểm nhận payable thì contract từ chối plain transfer.",
      "source": "Session 6, slide 22"
    },
    {
      "id": "bc-s6-q48",
      "prompt": "Interface trong Solidity được hiểu đúng nhất là gì?",
      "options": [
        {
          "id": "a",
          "text": "Một loại private key"
        },
        {
          "id": "b",
          "text": "Một cơ chế consensus"
        },
        {
          "id": "c",
          "text": "Một database lưu state"
        },
        {
          "id": "d",
          "text": "Một 'khuôn' chung mô tả function signature để các contract tương tác theo cùng giao diện"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Interface chuẩn hóa shape của contract, nền tảng cho các chuẩn như ERC-20/721.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q49",
      "prompt": "Trong `contract Token is Ownable`, từ khóa `is` biểu thị điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Token kế thừa Ownable"
        },
        {
          "id": "b",
          "text": "Token chỉ có thể gọi từ Ownable"
        },
        {
          "id": "c",
          "text": "Ownable là event của Token"
        },
        {
          "id": "d",
          "text": "Token deploy lên chain tên Ownable"
        }
      ],
      "correctOptionId": "a",
      "explanation": "`is` là cú pháp inheritance.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q50",
      "prompt": "Khác biệt đúng giữa `constant` và `immutable` theo slide là gì?",
      "options": [
        {
          "id": "a",
          "text": "constant set trong constructor; immutable set compile-time"
        },
        {
          "id": "b",
          "text": "constant cố định compile-time; immutable có thể set một lần trong constructor"
        },
        {
          "id": "c",
          "text": "Cả hai phải nằm trong storage slot"
        },
        {
          "id": "d",
          "text": "Cả hai có thể đổi sau mỗi transaction"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Constant xác định tại compile-time, immutable thường được gán một lần trong constructor.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q51",
      "prompt": "Vì sao slide khuyến nghị tái sử dụng OpenZeppelin?",
      "options": [
        {
          "id": "a",
          "text": "Vì OpenZeppelin là block explorer"
        },
        {
          "id": "b",
          "text": "Để bỏ hoàn toàn nhu cầu testing"
        },
        {
          "id": "c",
          "text": "Để dùng code đã được kiểm toán và chuẩn hóa thay vì tự viết lại các primitive phổ biến"
        },
        {
          "id": "d",
          "text": "Vì Solidity không hỗ trợ inheritance"
        }
      ],
      "correctOptionId": "c",
      "explanation": "OpenZeppelin cung cấp implementation chuẩn cộng đồng đã được kiểm toán, giảm rủi ro tự viết lại.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q52",
      "prompt": "So sánh nào đúng giữa Remix và Hardhat trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Remix chỉ chạy local; Hardhat chỉ chạy browser"
        },
        {
          "id": "b",
          "text": "Cả hai chỉ hỗ trợ manual tests"
        },
        {
          "id": "c",
          "text": "Remix cần Node >=18; Hardhat không cần cài gì"
        },
        {
          "id": "d",
          "text": "Remix hợp cho làm quen/deploy nhanh trong browser; Hardhat hợp dự án thật, CI và automated testing"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Slide mô tả Remix là browser-first, Hardhat là project toolchain cho testing/CI.",
      "source": "Session 6, slide 26"
    },
    {
      "id": "bc-s6-q53",
      "prompt": "Trong Remix của bài học, Environment nào được chọn để deploy bằng MetaMask?",
      "options": [
        {
          "id": "a",
          "text": "Injected Provider – MetaMask"
        },
        {
          "id": "b",
          "text": "Hardhat localhost bắt buộc"
        },
        {
          "id": "c",
          "text": "IPFS Provider"
        },
        {
          "id": "d",
          "text": "JavaScript VM only"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Remix dùng Injected Provider để kết nối MetaMask đang ở TrustKeys.",
      "source": "Session 6, slide 27"
    },
    {
      "id": "bc-s6-q54",
      "prompt": "Thông số mạng TrustKeys testnet nào đúng trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "RPC `https://l1testnet.trustkeys.network`, chainId 11968"
        },
        {
          "id": "b",
          "text": "RPC `http://localhost:8545`, chainId 1"
        },
        {
          "id": "c",
          "text": "RPC `https://mainnet.infura.io`, chainId 11968"
        },
        {
          "id": "d",
          "text": "RPC `https://l1testnet.trustkeys.network`, chainId 31337"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Slide và lab đều dùng RPC l1testnet.trustkeys.network và chainId 11968.",
      "source": "Session 6, slides 27 and 35; Lab 6"
    },
    {
      "id": "bc-s6-q55",
      "prompt": "Gói nào được cài trong bước khởi tạo Hardhat của lab?",
      "options": [
        {
          "id": "a",
          "text": "bitcoin-core, etherscan, ipfs"
        },
        {
          "id": "b",
          "text": "hardhat, @nomicfoundation/hardhat-toolbox, dotenv"
        },
        {
          "id": "c",
          "text": "react, next, tailwindcss"
        },
        {
          "id": "d",
          "text": "ganache, truffle, web3"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Lệnh npm install trong slide/lab cài Hardhat, toolbox và dotenv.",
      "source": "Session 6, slide 28; Lab 6"
    },
    {
      "id": "bc-s6-q56",
      "prompt": "Theo Session 6, Hardhat yêu cầu Node ở mức nào?",
      "options": [
        {
          "id": "a",
          "text": "Node >= 18"
        },
        {
          "id": "b",
          "text": "Chỉ Node 25"
        },
        {
          "id": "c",
          "text": "Node >= 12"
        },
        {
          "id": "d",
          "text": "Node >= 16"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Tài liệu ghi Node >=18.",
      "source": "Session 6, slide 28; Lab 6"
    },
    {
      "id": "bc-s6-q57",
      "prompt": "Vai trò đúng của các thành phần là gì?",
      "options": [
        {
          "id": "a",
          "text": "hardhat = ví; toolbox = explorer; dotenv = compiler"
        },
        {
          "id": "b",
          "text": "hardhat = database; toolbox = RPC; dotenv = consensus"
        },
        {
          "id": "c",
          "text": "hardhat = frontend; toolbox = CSS; dotenv = contract storage"
        },
        {
          "id": "d",
          "text": "hardhat = task runner + local EVM; toolbox = ethers/Chai/network helpers; dotenv = nạp secrets từ .env"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đây là ba vai trò được mô tả trực tiếp trong slide cài đặt.",
      "source": "Session 6, slide 28"
    },
    {
      "id": "bc-s6-q58",
      "prompt": "File nào chứa Solidity source trong project layout mẫu?",
      "options": [
        {
          "id": "a",
          "text": "scripts/deploy.js"
        },
        {
          "id": "b",
          "text": "contracts/ClassRegistry.sol"
        },
        {
          "id": "c",
          "text": "test/ClassRegistry.test.js"
        },
        {
          "id": "d",
          "text": ".env"
        }
      ],
      "correctOptionId": "b",
      "explanation": "`contracts/` chứa source Solidity.",
      "source": "Session 6, slide 29"
    },
    {
      "id": "bc-s6-q59",
      "prompt": "Sau `npx hardhat compile`, artifacts quan trọng nào được sinh ra?",
      "options": [
        {
          "id": "a",
          "text": "Một mnemonic 12 từ"
        },
        {
          "id": "b",
          "text": "ABI và bytecode trong `artifacts/`"
        },
        {
          "id": "c",
          "text": "Private key mới"
        },
        {
          "id": "d",
          "text": "Một block explorer"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Compile tạo artifact gồm ABI và bytecode.",
      "source": "Session 6, slide 29"
    },
    {
      "id": "bc-s6-q60",
      "prompt": "Hardhat Ignition được giới thiệu như gì?",
      "options": [
        {
          "id": "a",
          "text": "Một RPC endpoint"
        },
        {
          "id": "b",
          "text": "Một test matcher"
        },
        {
          "id": "c",
          "text": "Một alternative cho `scripts/` theo kiểu declarative deployment"
        },
        {
          "id": "d",
          "text": "Một loại custom error"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Ignition là cách deploy khai báo thay cho script thủ công.",
      "source": "Session 6, slide 29"
    },
    {
      "id": "bc-s6-q61",
      "prompt": "Các test mặc định trong ví dụ Session 6 chạy ở đâu?",
      "options": [
        {
          "id": "a",
          "text": "Trên in-memory local chain, không cần coin thật và reset mỗi run"
        },
        {
          "id": "b",
          "text": "Trên Ethereum mainnet"
        },
        {
          "id": "c",
          "text": "Trong block explorer"
        },
        {
          "id": "d",
          "text": "Trực tiếp trên TrustKeys và tốn native coin"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Hardhat test dùng chain local trong bộ nhớ nên nhanh, không chờ block thật và không tiêu coin thật.",
      "source": "Session 6, slide 30; Lab 6 Q1"
    },
    {
      "id": "bc-s6-q62",
      "prompt": "Ý nghĩa của `loadFixture(deployRegistryFixture)` là gì?",
      "options": [
        {
          "id": "a",
          "text": "Deploy lại contract từ đầu trước mọi dòng assert"
        },
        {
          "id": "b",
          "text": "Deploy một lần rồi snapshot/revert để các test nhanh và độc lập"
        },
        {
          "id": "c",
          "text": "Kết nối MetaMask vào TrustKeys"
        },
        {
          "id": "d",
          "text": "Đọc event log từ mainnet"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Fixture dùng snapshot-revert để tránh deploy lại tốn thời gian cho từng test.",
      "source": "Session 6, slide 31"
    },
    {
      "id": "bc-s6-q63",
      "prompt": "`ethers.getSigners()` trên Hardhat local network trả về gì theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Danh sách contract address đã deploy"
        },
        {
          "id": "b",
          "text": "1 tài khoản không có tiền"
        },
        {
          "id": "c",
          "text": "20 tài khoản local đã được cấp sẵn tiền test"
        },
        {
          "id": "d",
          "text": "Danh sách validator TrustKeys"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Slide nói 20 pre-funded local accounts.",
      "source": "Session 6, slide 31"
    },
    {
      "id": "bc-s6-q64",
      "prompt": "`registry.connect(alice).register(\"Alice\")` có ý nghĩa gì?",
      "options": [
        {
          "id": "a",
          "text": "Kết nối contract tới RPC tên Alice"
        },
        {
          "id": "b",
          "text": "Chạy function bằng private key của deployer bất kể connect"
        },
        {
          "id": "c",
          "text": "Đổi owner của contract thành Alice"
        },
        {
          "id": "d",
          "text": "Gửi lời gọi tiếp theo với tư cách signer Alice"
        }
      ],
      "correctOptionId": "d",
      "explanation": "`connect(alice)` thay signer dùng để gửi transaction.",
      "source": "Session 6, slide 31"
    },
    {
      "id": "bc-s6-q65",
      "prompt": "Matcher nào dùng để kiểm tra event được emit đúng arguments?",
      "options": [
        {
          "id": "a",
          "text": ".to.emit(...).withArgs(...)"
        },
        {
          "id": "b",
          "text": ".to.be.revertedWithCustomError(...)"
        },
        {
          "id": "c",
          "text": ".to.have.length(...)"
        },
        {
          "id": "d",
          "text": ".to.equal(...)"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Chai matcher `to.emit(...).withArgs(...)` kiểm tra log event.",
      "source": "Session 6, slide 32"
    },
    {
      "id": "bc-s6-q66",
      "prompt": "Matcher nào phù hợp để kiểm tra contract revert với custom error `AlreadyRegistered`?",
      "options": [
        {
          "id": "a",
          "text": ".to.emit(registry, \"AlreadyRegistered\")"
        },
        {
          "id": "b",
          "text": ".to.be.revertedWithCustomError(registry, \"AlreadyRegistered\")"
        },
        {
          "id": "c",
          "text": ".to.equal(\"AlreadyRegistered\")"
        },
        {
          "id": "d",
          "text": ".to.be.payable()"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Hardhat Chai matcher có hỗ trợ revertedWithCustomError.",
      "source": "Session 6, slide 32"
    },
    {
      "id": "bc-s6-q67",
      "prompt": "`time.increase(3600)` trong test local dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Chờ thực tế 3600 giây"
        },
        {
          "id": "b",
          "text": "Tăng gas limit 3600"
        },
        {
          "id": "c",
          "text": "Fast-forward thời gian local chain thêm 1 giờ"
        },
        {
          "id": "d",
          "text": "Tăng block size 3600 byte"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Network helper cho phép điều khiển thời gian của chain local.",
      "source": "Session 6, slide 32"
    },
    {
      "id": "bc-s6-q68",
      "prompt": "Lệnh nào tạo một local JSON-RPC blockchain tại `localhost:8545`?",
      "options": [
        {
          "id": "a",
          "text": "npx hardhat test"
        },
        {
          "id": "b",
          "text": "npx hardhat init"
        },
        {
          "id": "c",
          "text": "npx hardhat compile"
        },
        {
          "id": "d",
          "text": "npx hardhat node"
        }
      ],
      "correctOptionId": "d",
      "explanation": "`npx hardhat node` chạy local blockchain đầy đủ tại port 8545.",
      "source": "Session 6, slide 33"
    },
    {
      "id": "bc-s6-q69",
      "prompt": "Hardhat console được mô tả đúng nhất là gì?",
      "options": [
        {
          "id": "a",
          "text": "Một Solidity compiler thay thế solc"
        },
        {
          "id": "b",
          "text": "Một block explorer public"
        },
        {
          "id": "c",
          "text": "Một ví phần cứng"
        },
        {
          "id": "d",
          "text": "Một live ethers REPL có thể kết nối tới network được chọn"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Console là phiên ethers tương tác trực tiếp với network.",
      "source": "Session 6, slide 33"
    },
    {
      "id": "bc-s6-q70",
      "prompt": "Thứ tự tổng quát của Hardhat development loop trong slide là gì?",
      "options": [
        {
          "id": "a",
          "text": "Write → compile → test → deploy → interact, sau đó lặp lại khi sửa code"
        },
        {
          "id": "b",
          "text": "Deploy → write → test → compile"
        },
        {
          "id": "c",
          "text": "Mine → stake → bridge → deploy"
        },
        {
          "id": "d",
          "text": "Interact → delete → compile → sign"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Sơ đồ Hardhat loop đi từ viết code, compile, test, deploy sang TrustKeys rồi interact, sau đó tiếp tục vòng lặp khi cần.",
      "source": "Session 6, slide 34"
    },
    {
      "id": "bc-s6-q71",
      "prompt": "Cách quản lý private key nào đúng theo Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Dùng private key có tài sản thật để tránh thiếu gas"
        },
        {
          "id": "b",
          "text": "Commit `.env` để cả nhóm dùng chung key"
        },
        {
          "id": "c",
          "text": "Dùng dedicated test account, nạp `PRIVATE_KEY` từ `.env`, git-ignore `.env`, chỉ commit `.env.example`"
        },
        {
          "id": "d",
          "text": "Dán mnemonic thật vào hardhat.config.js"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Slide nhấn mạnh chỉ dùng test key và tuyệt đối không commit secret.",
      "source": "Session 6, slide 35; Lab 6"
    },
    {
      "id": "bc-s6-q72",
      "prompt": "Trong deploy script mẫu, chuỗi thao tác nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "compile → getAddress → deploy → constructor"
        },
        {
          "id": "b",
          "text": "getContractAt → compile → waitForDeployment → mint"
        },
        {
          "id": "c",
          "text": "getContractFactory → deploy → waitForDeployment → getAddress"
        },
        {
          "id": "d",
          "text": "getSigners → queryFilter → selfdestruct → deploy"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đây là trình tự của script deploy trong slide.",
      "source": "Session 6, slide 36"
    },
    {
      "id": "bc-s6-q73",
      "prompt": "Deploy lên TrustKeys testnet có phải là transaction thật không?",
      "options": [
        {
          "id": "a",
          "text": "Có; tài khoản test được nạp tiền gửi transaction deploy lên testnet"
        },
        {
          "id": "b",
          "text": "Chỉ là thao tác ghi file local"
        },
        {
          "id": "c",
          "text": "Không vì testnet không có gas"
        },
        {
          "id": "d",
          "text": "Không, chỉ là eth_call"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Slide nói deploy trên TrustKeys là real transaction trên testnet.",
      "source": "Session 6, slide 36; Lab 6 Q4"
    },
    {
      "id": "bc-s6-q74",
      "prompt": "Ai trả gas khi deploy contract lên TrustKeys trong lab?",
      "options": [
        {
          "id": "a",
          "text": "RPC endpoint"
        },
        {
          "id": "b",
          "text": "Tài khoản test ký và gửi transaction deploy, bằng native coin của testnet"
        },
        {
          "id": "c",
          "text": "Contract mới deploy tự trả"
        },
        {
          "id": "d",
          "text": "Hardhat toolbox trả thay"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Deployer là sender của transaction nên tài khoản test của người deploy chịu gas bằng coin nền tảng của chain.",
      "source": "Lab 6 Q4; Session 6, slide 36"
    },
    {
      "id": "bc-s6-q75",
      "prompt": "Sau deploy, vì sao cần lưu lại địa chỉ contract in ra?",
      "options": [
        {
          "id": "a",
          "text": "Để compile lại Solidity"
        },
        {
          "id": "b",
          "text": "Để có thể dùng `getContractAt` hoặc script khác tương tác đúng instance đã deploy"
        },
        {
          "id": "c",
          "text": "Để đổi chainId"
        },
        {
          "id": "d",
          "text": "Để phục hồi private key"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Địa chỉ contract là định danh cần thiết để tương tác instance on-chain.",
      "source": "Session 6, slide 36"
    },
    {
      "id": "bc-s6-q76",
      "prompt": "Đoạn `ethers.getContractAt(\"ClassRegistry\", addr)` dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Tạo private key"
        },
        {
          "id": "b",
          "text": "Xóa event log"
        },
        {
          "id": "c",
          "text": "Deploy contract mới"
        },
        {
          "id": "d",
          "text": "Tạo object contract trỏ tới instance đã tồn tại tại `addr`"
        }
      ],
      "correctOptionId": "d",
      "explanation": "getContractAt kết hợp ABI của contract với một address đã deploy để đọc/gọi hàm.",
      "source": "Session 6, slide 37"
    },
    {
      "id": "bc-s6-q77",
      "prompt": "`queryFilter(r.filters.Registered())` trả về loại dữ liệu gì?",
      "options": [
        {
          "id": "a",
          "text": "Các event log `Registered` phù hợp bộ lọc"
        },
        {
          "id": "b",
          "text": "Danh sách private key"
        },
        {
          "id": "c",
          "text": "Compiler warnings"
        },
        {
          "id": "d",
          "text": "Danh sách storage slots"
        }
      ],
      "correctOptionId": "a",
      "explanation": "queryFilter đọc lại event logs phù hợp filter.",
      "source": "Session 6, slide 37; Lab 6 Q5"
    },
    {
      "id": "bc-s6-q78",
      "prompt": "Một frontend muốn hiển thị danh sách thành viên từ event có thể làm theo cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Dùng queryFilter/indexer để đọc các `Registered` logs, dựng danh sách và tiếp tục cập nhật khi có log mới"
        },
        {
          "id": "b",
          "text": "Đọc `.env` của mọi thành viên"
        },
        {
          "id": "c",
          "text": "Dùng constructor gọi lại toàn bộ transaction"
        },
        {
          "id": "d",
          "text": "Không thể vì frontend không đọc event"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Event log có thể được frontend/indexer replay để xây state hiển thị; đây là ý chính của Lab Q5.",
      "source": "Session 6, slide 37; Lab 6 Q5"
    },
    {
      "id": "bc-s6-q79",
      "prompt": "Theo Lab Q1, sample test sau `npx hardhat test` chạy ở đâu và 'tốn gas' theo nghĩa trả coin như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Trên Remix, trả gas bằng browser token"
        },
        {
          "id": "b",
          "text": "Trên TrustKeys, trả gas thật"
        },
        {
          "id": "c",
          "text": "Trên Hardhat local/in-memory chain; có thể đo gas units nhưng không tiêu coin testnet/thật"
        },
        {
          "id": "d",
          "text": "Trên Ethereum mainnet, miễn phí"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Test mặc định chạy local, nên không có chi phí coin thực tế dù EVM vẫn có thể tính gas usage.",
      "source": "Session 6, slide 30; Lab 6 Q1"
    },
    {
      "id": "bc-s6-q80",
      "prompt": "Yêu cầu nào đúng với `register(string calldata name)` trong ClassRegistry lab?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ owner được gọi register"
        },
        {
          "id": "b",
          "text": "register không được emit event"
        },
        {
          "id": "c",
          "text": "Một address được đăng ký nhiều lần nếu đổi name"
        },
        {
          "id": "d",
          "text": "Tên rỗng phải revert `EmptyName`; đăng ký lần hai phải revert `AlreadyRegistered(msg.sender)`"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Lab quy định một registration mỗi address, chặn empty name và double registration.",
      "source": "Lab 6, section 6.1"
    },
    {
      "id": "bc-s6-q81",
      "prompt": "Yêu cầu nào đúng với `deregister(address who)` trong lab?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ owner gọi được qua onlyOwner; address chưa đăng ký phải revert NotRegistered"
        },
        {
          "id": "b",
          "text": "Chỉ người `who` tự deregister"
        },
        {
          "id": "c",
          "text": "Hàm phải là pure"
        },
        {
          "id": "d",
          "text": "Ai cũng gọi được; address lạ bị bỏ qua"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Lab yêu cầu owner-only và custom error cho address không tồn tại.",
      "source": "Lab 6, section 6.1"
    },
    {
      "id": "bc-s6-q82",
      "prompt": "Vì sao ClassRegistry dùng cả `mapping(address => string)` và `address[]`?",
      "options": [
        {
          "id": "a",
          "text": "Mapping để enumerate, array để tra cứu O(1)"
        },
        {
          "id": "b",
          "text": "Mapping để tra cứu name theo address; array để enumerate members vì mapping không có key list"
        },
        {
          "id": "c",
          "text": "Cả hai chỉ để giảm bytecode size"
        },
        {
          "id": "d",
          "text": "Vì Solidity bắt buộc mọi mapping phải có array đi kèm"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Hai cấu trúc giải quyết hai nhu cầu khác nhau: lookup và enumeration.",
      "source": "Session 6, slide 15; Lab 6 Q3"
    },
    {
      "id": "bc-s6-q83",
      "prompt": "Bộ test tối thiểu trong lab bao gồm tổ hợp nào?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ dùng Remix manual test"
        },
        {
          "id": "b",
          "text": "Chỉ deploy và kiểm tra address khác zero"
        },
        {
          "id": "c",
          "text": "Fixture + signers; register lưu name và emit event; double register revert; non-owner deregister revert; loop nhiều signer và kiểm tra round-trip"
        },
        {
          "id": "d",
          "text": "Chỉ kiểm tra gas reporter"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Đây là danh sách test được yêu cầu trực tiếp trong lab worksheet.",
      "source": "Lab 6, section 6.1"
    },
    {
      "id": "bc-s6-q84",
      "prompt": "Lệnh `REPORT_GAS=true npx hardhat test` được dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Reset `.env`"
        },
        {
          "id": "b",
          "text": "Tạo 20 signer mới"
        },
        {
          "id": "c",
          "text": "Deploy lên mainnet"
        },
        {
          "id": "d",
          "text": "In báo cáo gas theo function trong quá trình test"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Gas reporter có thể in gas consumption theo function.",
      "source": "Session 6, slide 32; Lab 6"
    },
    {
      "id": "bc-s6-q85",
      "prompt": "Nếu cài đặt local thất bại, lab đưa ra phương án dự phòng nào?",
      "options": [
        {
          "id": "a",
          "text": "Làm toàn bộ trên `remix.trustkeys.com`, compile 0.8.24+, dùng Injected Provider–MetaMask rồi deploy/call function từ UI"
        },
        {
          "id": "b",
          "text": "Chỉ viết pseudo-code"
        },
        {
          "id": "c",
          "text": "Dùng Ethereum mainnet"
        },
        {
          "id": "d",
          "text": "Bỏ qua lab"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Worksheet nêu Remix path là fallback đầy đủ cho lab.",
      "source": "Lab 6, Remix fallback"
    },
    {
      "id": "bc-s6-q86",
      "prompt": "Khi nộp Lab 6 lên Git repo, nội dung nào phải KHÔNG được commit?",
      "options": [
        {
          "id": "a",
          "text": "contracts/ và test/"
        },
        {
          "id": "b",
          "text": "node_modules/ và .env"
        },
        {
          "id": "c",
          "text": "answers.md"
        },
        {
          "id": "d",
          "text": "deploy/register tx hash"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Worksheet yêu cầu push project nhưng loại node_modules và .env.",
      "source": "Lab 6, Submission"
    },
    {
      "id": "bc-s6-q87",
      "prompt": "Điều kiện pass Lab 6 là gì?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ cần answers.md"
        },
        {
          "id": "b",
          "text": "Chỉ cần code compile"
        },
        {
          "id": "c",
          "text": "Tests xanh, deploy lên TrustKeys và tự đăng ký address on-chain"
        },
        {
          "id": "d",
          "text": "Chỉ cần screenshot MetaMask"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Pass = tests green + deployed & self-registered on TrustKeys.",
      "source": "Lab 6, Pass condition"
    },
    {
      "id": "bc-s6-q88",
      "prompt": "Homework trước Session 7 yêu cầu gì với ClassRegistry?",
      "options": [
        {
          "id": "a",
          "text": "Deploy mainnet và mua ETH"
        },
        {
          "id": "b",
          "text": "Xóa toàn bộ tests sau deploy"
        },
        {
          "id": "c",
          "text": "Ít nhất 6 passing tests, deploy lên TrustKeys, lưu address + tx hash, và thêm một view function kèm test"
        },
        {
          "id": "d",
          "text": "Chỉ viết README"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Slide homework yêu cầu ≥6 tests, deploy, address+tx hash và thêm 1 view function + test.",
      "source": "Session 6, slide 46"
    },
    {
      "id": "bc-s6-q89",
      "prompt": "Quy mô team và thời hạn đăng ký project được nêu trong Session 6 là gì?",
      "options": [
        {
          "id": "a",
          "text": "2–3 người, topic + team due cuối tuần"
        },
        {
          "id": "b",
          "text": "4–5 người, exam week"
        },
        {
          "id": "c",
          "text": "Không giới hạn số người"
        },
        {
          "id": "d",
          "text": "1 người, cuối Session 15"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Final project mở đăng ký ở S6, team 2–3 người và hạn cuối tuần.",
      "source": "Session 6, slides 40 and 45"
    },
    {
      "id": "bc-s6-q90",
      "prompt": "Phần project chiếm 60% học phần được tách như thế nào theo slide?",
      "options": [
        {
          "id": "a",
          "text": "0.6 × group project + 0.4 × oral defense"
        },
        {
          "id": "b",
          "text": "0.5 × report + 0.5 × attendance"
        },
        {
          "id": "c",
          "text": "0.7 × code + 0.3 × quiz"
        },
        {
          "id": "d",
          "text": "Toàn bộ 60% chỉ là demo video"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Slide ghi 60% học phần = 0.6×Project (group) + 0.4×Oral defense.",
      "source": "Session 6, slide 40"
    },
    {
      "id": "bc-s6-q91",
      "prompt": "Bộ deliverable nào đúng cho final project?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ file PDF và không cần deploy"
        },
        {
          "id": "b",
          "text": "Git repo gồm contracts/tests/frontend; deployed & verified DApp; report 10–15 trang; demo ≤5 phút; contribution log"
        },
        {
          "id": "c",
          "text": "Chỉ source code contract"
        },
        {
          "id": "d",
          "text": "Chỉ video demo 30 phút"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Đây là các deliverable được liệt kê trong slide project.",
      "source": "Session 6, slide 40"
    },
    {
      "id": "bc-s6-q92",
      "prompt": "Ràng buộc quan trọng của final project là gì?",
      "options": [
        {
          "id": "a",
          "text": "Không cần test"
        },
        {
          "id": "b",
          "text": "Frontend bị cấm"
        },
        {
          "id": "c",
          "text": "Mainnet only và cấm AI"
        },
        {
          "id": "d",
          "text": "Testnet only; phải giải thích mọi dòng khi oral defense; AI-assisted code được phép nếu khai báo"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Slide yêu cầu testnet only, giải thích mọi dòng và khai báo việc dùng AI.",
      "source": "Session 6, slide 40"
    },
    {
      "id": "bc-s6-q93",
      "prompt": "Cặp topic → yêu cầu tối thiểu/extension nào đúng trong nhóm 1–5?",
      "options": [
        {
          "id": "a",
          "text": "Crowdfunding → ERC-721 + IPFS marketplace; extension lazy mint"
        },
        {
          "id": "b",
          "text": "DAO Governance → goal/deadline/refund-if-fail; extension KYC allowlist"
        },
        {
          "id": "c",
          "text": "Token + Staking → binary prediction market; extension dispute window"
        },
        {
          "id": "d",
          "text": "Mini-AMM DEX → constant-product pool với add/remove/swap+fee; extension có router/TWAP oracle/LP NFT"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Mini-AMM là topic 4 với constant-product pool; các đáp án khác trộn yêu cầu của topic khác.",
      "source": "Session 6, slide 41"
    },
    {
      "id": "bc-s6-q94",
      "prompt": "Cặp topic → nội dung nào đúng trong nhóm 6–10?",
      "options": [
        {
          "id": "a",
          "text": "On-chain Certificates → issuer registry + soulbound NFT + verify page; extension có ZK proof-of-degree/Merkle batch"
        },
        {
          "id": "b",
          "text": "Supply-chain → binary bet/resolve/claim"
        },
        {
          "id": "c",
          "text": "Stablecoin Gateway → ERC-721 marketplace"
        },
        {
          "id": "d",
          "text": "Token-gated Content → constant-product AMM"
        }
      ],
      "correctOptionId": "a",
      "explanation": "Topic 6 là On-chain Certificates với issuer registry, soulbound NFT, verify page; extension ZK/Merkle.",
      "source": "Session 6, slide 42"
    },
    {
      "id": "bc-s6-q95",
      "prompt": "Cặp topic → nội dung nào đúng trong nhóm 11–14?",
      "options": [
        {
          "id": "a",
          "text": "On-chain Game → supply-chain QR verify"
        },
        {
          "id": "b",
          "text": "AI Agent with Wallet → LLM agent + testnet wallet + spend-limit contract; extension session keys/AA và machine-to-machine payment"
        },
        {
          "id": "c",
          "text": "ZK Application → crowdfunding refund-if-fail"
        },
        {
          "id": "d",
          "text": "Lending Micro-protocol → ERC-20 capped staking"
        }
      ],
      "correctOptionId": "b",
      "explanation": "Topic 12 là AI Agent with Wallet với spend-limit contract và extension session keys/AA.",
      "source": "Session 6, slide 43"
    },
    {
      "id": "bc-s6-q96",
      "prompt": "Mốc nào đúng trong project timeline?",
      "options": [
        {
          "id": "a",
          "text": "Design ở S15 và demo ở S10"
        },
        {
          "id": "b",
          "text": "Oral defense ở S7"
        },
        {
          "id": "c",
          "text": "Topic+team ở S6→end of week; 2-page design ở S10; peer review S14; live demo S15; final package + oral defense ở exam week"
        },
        {
          "id": "d",
          "text": "Tất cả deliverable nộp ngay S6"
        }
      ],
      "correctOptionId": "c",
      "explanation": "Slide timeline liệt kê đúng chuỗi mốc này.",
      "source": "Session 6, slide 44"
    },
    {
      "id": "bc-s6-q97",
      "prompt": "Rubric final project nào khớp với slide?",
      "options": [
        {
          "id": "a",
          "text": "Functionality 5.0; Report 5.0"
        },
        {
          "id": "b",
          "text": "Security 4.0; Attendance 6.0"
        },
        {
          "id": "c",
          "text": "Frontend 0; Demo 10"
        },
        {
          "id": "d",
          "text": "Functionality 2.5; Contracts & testing 2.0; Security 1.5; Frontend 1.5; Modern-stack 1.0; Report 1.0; Demo 0.5"
        }
      ],
      "correctOptionId": "d",
      "explanation": "Đây là đúng phân bổ điểm rubric trong slide 44.",
      "source": "Session 6, slide 44"
    }
  ]
} as const;
