import type { Chapter } from "@/types/quiz";
// Session 6 — Smart Contract Programming I
// Revised question bank based only on Session06-slides.pdf and Lab 06 worksheet.
// Distractors are written with comparable length/technical density to reduce answer-length bias.
// Schema: { id, title, description, revision, questions[] }
// Each question: { id, prompt, options[{id,text}], correctOptionId, explanation, source }

export const session6: Chapter = {
  "id": "session-6",
  "title": "Session 6 — Smart Contract Programming I",
  "description": "Solidity & Hardhat: contract anatomy, visibility, types, data locations, gas, events, errors, modifiers, Remix/Hardhat testing, deployment and interaction with ClassRegistry on TrustKeys.",
  "revision": 0,
  "questions": [
    {
      "id": "bc-s6-q01",
      "prompt": "Phát biểu nào mô tả đúng nhất một smart contract theo Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Một file ABI lưu state của dApp và được đồng bộ trực tiếp giữa các validator."
        },
        {
          "id": "b",
          "text": "Một RPC endpoint thực thi Solidity thay cho EVM và giữ toàn bộ dữ liệu contract."
        },
        {
          "id": "c",
          "text": "Chương trình deploy tại một địa chỉ, với các hàm public làm API."
        },
        {
          "id": "d",
          "text": "Một EOA chứa bytecode và tự chạy logic khi nhận transaction từ mạng."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Smart contract` là chương trình chạy trên blockchain sau khi được deploy tới một địa chỉ. `API` ở đây là tập các hàm có thể được gọi từ bên ngoài, đặc biệt là các hàm `public`/`external`. Contract không phải EOA, ABI hay RPC endpoint.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q02",
      "prompt": "Tính deterministic của smart contract có nghĩa là gì?",
      "options": [
        {
          "id": "a",
          "text": "Cùng bytecode và cùng state đầu vào phải dẫn tới cùng kết quả trên mọi node thực thi."
        },
        {
          "id": "b",
          "text": "Kết quả phụ thuộc vào đồng hồ hệ điều hành của node nhưng được làm tròn trước khi ghi block."
        },
        {
          "id": "c",
          "text": "Mỗi node có thể tạo kết quả khác nhau miễn block proposer chọn một kết quả cuối cùng."
        },
        {
          "id": "d",
          "text": "Chỉ node đề xuất block chạy contract; các node còn lại chỉ kiểm tra chữ ký của transaction."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Deterministic` nghĩa là tất định: cùng chương trình và cùng trạng thái đầu vào phải cho cùng đầu ra. Điều này cần thiết vì nhiều node cùng re-execute transaction và phải đồng thuận về state mới.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q03",
      "prompt": "Vì sao Session 6 nhấn mạnh nguyên tắc “test before you deploy”?",
      "options": [
        {
          "id": "a",
          "text": "TrustKeys chỉ chấp nhận bytecode nếu toàn bộ test local đã được ghi vào transaction deploy."
        },
        {
          "id": "b",
          "text": "Vì code đã deploy gần như immutable và khó vá trực tiếp."
        },
        {
          "id": "c",
          "text": "Hardhat từ chối compile mọi contract chưa có ít nhất một file test đi kèm."
        },
        {
          "id": "d",
          "text": "Solidity xóa source code sau compile, nên deploy xong sẽ không thể đọc lại logic contract."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Immutable by default` nghĩa là code đã triển khai không thể đơn giản sửa tại đúng địa chỉ như sửa ứng dụng web. Vì vậy kiểm thử trước deploy là lớp phòng ngừa quan trọng, đặc biệt khi contract quản lý state hoặc tài sản.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q04",
      "prompt": "Solidity được mô tả trong Session 6 như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Là ngôn ngữ frontend, được trình duyệt compile thành ABI nhưng không tạo bytecode."
        },
        {
          "id": "b",
          "text": "Là ngôn ngữ truy vấn state, được RPC server dịch thành JavaScript trước khi thực thi."
        },
        {
          "id": "c",
          "text": "Là ngôn ngữ statically typed và được compile thành EVM bytecode."
        },
        {
          "id": "d",
          "text": "Là ngôn ngữ dynamically typed và được interpreter của MetaMask chạy trực tiếp."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Statically typed` nghĩa là kiểu dữ liệu được xác định và kiểm tra khi compile. Solidity compiler tạo `EVM bytecode`, tức mã máy mà Ethereum Virtual Machine thực thi.",
      "source": "Session 6, slide 6"
    },
    {
      "id": "bc-s6-q05",
      "prompt": "Dòng `// SPDX-License-Identifier: MIT` trong file Solidity dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Đăng ký contract với mạng TrustKeys trước khi chạy lệnh deploy."
        },
        {
          "id": "b",
          "text": "Khai báo license theo định dạng máy đọc được; compiler có thể cảnh báo khi thiếu."
        },
        {
          "id": "c",
          "text": "Chỉ định ABI encoding để ethers biết cách gọi các hàm public."
        },
        {
          "id": "d",
          "text": "Khóa compiler vào đúng phiên bản 0.8.24 và chặn mọi bản cao hơn."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`SPDX-License-Identifier` là thẻ giấy phép chuẩn hóa để công cụ có thể đọc tự động. Nó không quyết định compiler version, network hay ABI.",
      "source": "Session 6, slide 8"
    },
    {
      "id": "bc-s6-q06",
      "prompt": "Với `pragma solidity ^0.8.24;`, dải compiler nào phù hợp?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ đúng phiên bản 0.8.24, không chấp nhận bất kỳ bản vá nào khác."
        },
        {
          "id": "b",
          "text": "Mọi phiên bản từ 0.8.24 trở lên nhưng nhỏ hơn 0.9.0."
        },
        {
          "id": "c",
          "text": "Mọi phiên bản từ 0.8.0 đến dưới 0.8.24, vì dấu `^` nghĩa là lùi phiên bản."
        },
        {
          "id": "d",
          "text": "Mọi phiên bản từ 0.8.24 trở lên, kể cả 0.9.x và 1.x."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Dấu `^` cho phép nâng phiên bản tương thích trong cùng major version. Với `^0.8.24`, slide xác định phạm vi là `>=0.8.24` và `<0.9.0`.",
      "source": "Session 6, slide 8"
    },
    {
      "id": "bc-s6-q07",
      "prompt": "Từ Solidity 0.8.0, overflow và underflow số học mặc định được xử lý thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Compiler tự chuyển mọi phép toán sang số thực để tránh vượt giới hạn integer."
        },
        {
          "id": "b",
          "text": "EVM bỏ qua phép tính lỗi nhưng vẫn ghi các thay đổi state xảy ra trước đó."
        },
        {
          "id": "c",
          "text": "Overflow/underflow mặc định gây revert; SafeMath cơ bản không còn cần thiết."
        },
        {
          "id": "d",
          "text": "Giá trị luôn wrap về đầu miền số và contract tiếp tục chạy như Solidity cũ."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Overflow` là vượt giá trị lớn nhất, `underflow` là thấp hơn giá trị nhỏ nhất của kiểu số. Từ Solidity 0.8.x, các trường hợp này mặc định gây `revert`, tức hủy phần thay đổi state của transaction.",
      "source": "Session 6, slide 8"
    },
    {
      "id": "bc-s6-q08",
      "prompt": "State variable được khai báo ở contract level có đặc điểm nào?",
      "options": [
        {
          "id": "a",
          "text": "Nó chỉ tồn tại trong file ABI và được frontend gửi lại mỗi khi gọi contract."
        },
        {
          "id": "b",
          "text": "Nó tồn tại trong on-chain state qua nhiều transaction."
        },
        {
          "id": "c",
          "text": "Nó được ghi vào event log nên contract không thể đọc lại trong lần gọi sau."
        },
        {
          "id": "d",
          "text": "Nó chỉ tồn tại trong memory của một function call rồi được xóa sau khi return."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`State variable` là biến thuộc trạng thái bền của contract. Khác với biến tạm trong `memory`, giá trị state được duy trì giữa các transaction và thường nằm trong `storage`.",
      "source": "Session 6, slide 9"
    },
    {
      "id": "bc-s6-q09",
      "prompt": "Khi khai báo một state variable là `public`, Solidity làm gì thêm?",
      "options": [
        {
          "id": "a",
          "text": "Tự mã hóa giá trị để chỉ owner mới đọc được từ blockchain."
        },
        {
          "id": "b",
          "text": "Tự chuyển biến sang `immutable` để giảm số lần ghi storage."
        },
        {
          "id": "c",
          "text": "Tự sinh một getter function để bên ngoài đọc giá trị của biến."
        },
        {
          "id": "d",
          "text": "Tự tạo setter function cho phép mọi địa chỉ cập nhật giá trị."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Getter` là hàm đọc giá trị. Từ khóa `public` trên state variable giúp Solidity sinh getter tự động, nhưng không tự sinh setter và cũng không làm dữ liệu trở thành bí mật.",
      "source": "Session 6, slide 9"
    },
    {
      "id": "bc-s6-q10",
      "prompt": "Phát biểu nào đúng về `address public immutable owner;` trong ví dụ Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Được gán một lần khi khởi tạo và không dùng storage slot thông thường."
        },
        {
          "id": "b",
          "text": "`owner` có thể được thay đổi bởi bất kỳ hàm `public` nào sau khi contract đã deploy."
        },
        {
          "id": "c",
          "text": "`owner` được lưu trong event log và phải dùng `queryFilter` để đọc lại."
        },
        {
          "id": "d",
          "text": "`owner` chỉ tồn tại trong constructor, nên các function khác không thể truy cập."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Immutable` cho phép gán giá trị một lần, thường trong constructor, rồi giữ nguyên. Slide nhấn mạnh `immutable` nằm trong bytecode thay vì một storage slot thông thường, nên đọc rẻ hơn storage.",
      "source": "Session 6, slides 9 and 23"
    },
    {
      "id": "bc-s6-q11",
      "prompt": "Constructor của một contract Solidity được chạy khi nào?",
      "options": [
        {
          "id": "a",
          "text": "Chạy đúng một lần trong quá trình deploy contract."
        },
        {
          "id": "b",
          "text": "Chạy khi `npx hardhat compile` tạo ABI và bytecode."
        },
        {
          "id": "c",
          "text": "Chạy mỗi khi contract nhận native coin qua `receive()`."
        },
        {
          "id": "d",
          "text": "Chạy lại trước mỗi lần một hàm `external` được gọi."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Constructor` là hàm khởi tạo contract. Nó chỉ thực thi lúc contract được tạo, không chạy lại trong các transaction tương tác sau này.",
      "source": "Session 6, slide 10"
    },
    {
      "id": "bc-s6-q12",
      "prompt": "Trong `constructor() { owner = msg.sender; }`, `msg.sender` là ai?",
      "options": [
        {
          "id": "a",
          "text": "Địa chỉ RPC endpoint mà Hardhat dùng để gửi transaction."
        },
        {
          "id": "b",
          "text": "Địa chỉ contract mới vừa được tạo bởi transaction deploy."
        },
        {
          "id": "c",
          "text": "Địa chỉ trực tiếp gửi lời gọi tạo contract."
        },
        {
          "id": "d",
          "text": "Địa chỉ của block proposer đã đưa transaction deploy vào block."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`msg.sender` là immediate caller, tức người gọi trực tiếp function hoặc constructor. Trong constructor, đó là tài khoản gửi transaction deploy, nên ví dụ dùng nó để gán `owner`.",
      "source": "Session 6, slide 10"
    },
    {
      "id": "bc-s6-q13",
      "prompt": "Cặp mô tả nào đúng về các message/block globals trong Solidity?",
      "options": [
        {
          "id": "a",
          "text": "`msg.value` là gas limit của transaction; `block.number` là nonce của người gửi."
        },
        {
          "id": "b",
          "text": "`msg.value` là priority fee; `block.number` là timestamp tính bằng giây."
        },
        {
          "id": "c",
          "text": "`msg.value` là số wei gửi kèm lời gọi; `block.number` là chiều cao block hiện tại."
        },
        {
          "id": "d",
          "text": "`msg.value` là balance của contract; `block.number` là chainId của mạng."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`msg.value` biểu diễn lượng native coin gửi kèm call, tính theo `wei`. `block.number` là số thứ tự hay chiều cao của block hiện tại.",
      "source": "Session 6, slide 10"
    },
    {
      "id": "bc-s6-q14",
      "prompt": "Cách dùng nào phù hợp nhất với cảnh báo về `block.timestamp` trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Dùng cho deadline thô; tránh randomness và timing quá chính xác."
        },
        {
          "id": "b",
          "text": "Dùng để sinh private key trong contract vì timestamp thay đổi theo từng block."
        },
        {
          "id": "c",
          "text": "Dùng thay cho oracle thời gian vì proposer không thể tác động dù chỉ vài giây."
        },
        {
          "id": "d",
          "text": "Dùng trực tiếp để tạo số ngẫu nhiên cho lottery vì mọi node đều nhìn thấy cùng timestamp."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Randomness` là tính ngẫu nhiên khó dự đoán hoặc thao túng. `block.timestamp` không đáp ứng yêu cầu đó vì proposer có ảnh hưởng nhất định, nhưng vẫn phù hợp cho deadline không đòi hỏi độ chính xác cao.",
      "source": "Session 6, slide 11"
    },
    {
      "id": "bc-s6-q15",
      "prompt": "Visibility `public` cho phép một function được gọi từ đâu?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ từ transaction bên ngoài; code nội bộ phải dùng `this.function()`."
        },
        {
          "id": "b",
          "text": "Cả từ bên ngoài contract và từ logic nội bộ của contract."
        },
        {
          "id": "c",
          "text": "Chỉ từ contract hiện tại; mọi lời gọi ngoài đều bị compiler chặn."
        },
        {
          "id": "d",
          "text": "Chỉ từ contract hiện tại và các contract kế thừa, không từ EOA."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Visibility` quy định phạm vi gọi function ở tầng ngôn ngữ. `public` là phạm vi rộng: có thể gọi từ bên ngoài và cũng có thể gọi nội bộ.",
      "source": "Session 6, slide 12"
    },
    {
      "id": "bc-s6-q16",
      "prompt": "Visibility `external` được mô tả đúng nhất như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ được gọi từ contract hiện tại, tương tự `private` nhưng rẻ hơn."
        },
        {
          "id": "b",
          "text": "Tự động cho phép nhận `msg.value`, nên tương đương với `payable`."
        },
        {
          "id": "c",
          "text": "Chủ yếu cho lời gọi từ bên ngoài contract."
        },
        {
          "id": "d",
          "text": "Chỉ được gọi từ contract kế thừa, tương tự `internal` nhưng có ABI."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`External` chủ yếu dành cho call từ bên ngoài. Slide cũng lưu ý nó có thể rẻ hơn với argument lớn, đặc biệt khi kết hợp dữ liệu đầu vào dạng `calldata`.",
      "source": "Session 6, slide 12"
    },
    {
      "id": "bc-s6-q17",
      "prompt": "Cặp visibility nào được ghép đúng?",
      "options": [
        {
          "id": "a",
          "text": "`internal`: chỉ owner; `private`: chỉ block proposer."
        },
        {
          "id": "b",
          "text": "`internal`: chỉ EOA; `private`: mọi contract có cùng ABI."
        },
        {
          "id": "c",
          "text": "`internal`: mọi địa chỉ ngoài chain; `private`: contract hiện tại và contract con."
        },
        {
          "id": "d",
          "text": "`internal`: contract hiện tại và contract con; `private`: chỉ contract hiện tại."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Internal` cho phép contract hiện tại và các contract kế thừa truy cập. `Private` hẹp hơn, chỉ code trong chính contract khai báo được truy cập trực tiếp.",
      "source": "Session 6, slide 12"
    },
    {
      "id": "bc-s6-q18",
      "prompt": "Vì sao `private` trong Solidity không có nghĩa là “secret”?",
      "options": [
        {
          "id": "a",
          "text": "State vẫn đọc được off-chain; `private` chỉ giới hạn trong code Solidity."
        },
        {
          "id": "b",
          "text": "Compiler luôn tự sinh public getter cho mọi biến `private`."
        },
        {
          "id": "c",
          "text": "MetaMask tự công khai private variable trong transaction signature."
        },
        {
          "id": "d",
          "text": "Biến `private` được mã hóa nhưng khóa giải mã luôn nằm trong ABI."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Private` là access control ở mức ngôn ngữ, không phải cơ chế mã hóa dữ liệu. Dữ liệu nằm on-chain có thể được quan sát bằng công cụ ngoài chuỗi dù contract không cung cấp getter.",
      "source": "Session 6, slide 12"
    },
    {
      "id": "bc-s6-q19",
      "prompt": "Function `view` có đặc điểm nào?",
      "options": [
        {
          "id": "a",
          "text": "Luôn nhận được native coin thông qua `msg.value`."
        },
        {
          "id": "b",
          "text": "Có thể đọc state nhưng không được thay đổi state."
        },
        {
          "id": "c",
          "text": "Không được đọc state và cũng không được dùng bất kỳ biến toàn cục nào."
        },
        {
          "id": "d",
          "text": "Được phép ghi state nếu transaction cung cấp đủ gas."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`View` mô tả function chỉ đọc đối với state. Nó khác `pure`, vì `pure` còn nghiêm ngặt hơn: không đọc hay ghi state.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q20",
      "prompt": "Function `pure` khác `view` ở điểm cốt lõi nào?",
      "options": [
        {
          "id": "a",
          "text": "`pure` luôn chạy off-chain, còn `view` luôn tạo transaction on-chain."
        },
        {
          "id": "b",
          "text": "`pure` có thể ghi state nhưng không emit event, còn `view` chỉ được emit event."
        },
        {
          "id": "c",
          "text": "`pure` được nhận `msg.value`, còn `view` không thể nhận bất kỳ argument nào."
        },
        {
          "id": "d",
          "text": "`pure` không đọc và không ghi state, còn `view` có thể đọc state."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Pure` phù hợp với tính toán chỉ dựa trên input và biến cục bộ. `View` có thể tham chiếu state hiện có, nhưng không được thay đổi state.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q21",
      "prompt": "Từ khóa `payable` trên function cho phép điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Function được miễn toàn bộ gas khi thay đổi state."
        },
        {
          "id": "b",
          "text": "Function được gọi nội bộ ngay cả khi visibility là `external`."
        },
        {
          "id": "c",
          "text": "Function có thể nhận native coin được gửi kèm lời gọi thông qua `msg.value`."
        },
        {
          "id": "d",
          "text": "Function có thể tự động truy cập private key của `msg.sender`."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Payable` nghĩa là function chấp nhận giá trị native coin đi kèm call. Lượng nhận được được đọc qua `msg.value`, đơn vị cơ sở là wei.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q22",
      "prompt": "Khi một hàm `view` được gọi off-chain bằng `eth_call`, nhận định nào phù hợp với slide?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ miễn gas nếu function không có argument và không trả về dữ liệu."
        },
        {
          "id": "b",
          "text": "Vẫn tạo transaction nhưng base fee được hoàn lại toàn bộ sau khi block finalizes."
        },
        {
          "id": "c",
          "text": "Là lời đọc không tạo transaction thay đổi chain."
        },
        {
          "id": "d",
          "text": "Luôn ghi một receipt mới vì mọi lời gọi contract đều phải vào block."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`eth_call` là lời gọi mô phỏng đọc state qua RPC, không được đưa vào block như transaction thay đổi state. Vì vậy nó không làm người dùng trả phí gas on-chain.",
      "source": "Session 6, slide 13"
    },
    {
      "id": "bc-s6-q23",
      "prompt": "Nhóm nào chỉ gồm value types được nêu trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "`uint256`, `bool`, `address`, `bytes32`, `enum`."
        },
        {
          "id": "b",
          "text": "`uint256`, `string`, `bytes`, `struct`, `mapping`."
        },
        {
          "id": "c",
          "text": "`address[]`, `bool`, `bytes`, `enum`, `struct`."
        },
        {
          "id": "d",
          "text": "`string`, `bytes`, `address[]`, `struct`, `mapping`."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Value type` được sao chép giá trị khi gán. Slide liệt kê các ví dụ như integer, `bool`, `address`, `bytes32` và `enum`; còn string, array, struct, mapping là reference types.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q24",
      "prompt": "Reference types như `string`, `bytes`, array và struct thường cần khai báo thêm điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Network location như `mainnet`, `testnet` hoặc `localhost`."
        },
        {
          "id": "b",
          "text": "Data location như `storage`, `memory` hoặc `calldata` tùy ngữ cảnh."
        },
        {
          "id": "c",
          "text": "Visibility như `public`, `external` hoặc `private` cho mọi biến cục bộ."
        },
        {
          "id": "d",
          "text": "Fee mode như `baseFee`, `priorityFee` hoặc `gasPrice`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Data location` cho biết dữ liệu tham chiếu nằm ở vùng nào và có vòng đời ra sao. Ba location quan trọng trong bài là `storage`, `memory` và `calldata`.",
      "source": "Session 6, slides 14 and 17–18"
    },
    {
      "id": "bc-s6-q25",
      "prompt": "Khác biệt được nhấn mạnh giữa `address` và `address payable` là gì?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ `address payable` hỗ trợ trực tiếp `.transfer()`/`.send()`."
        },
        {
          "id": "b",
          "text": "`address payable` luôn chứa private key, còn `address` chỉ chứa public key."
        },
        {
          "id": "c",
          "text": "`address` dài 20 byte, còn `address payable` dài 32 byte."
        },
        {
          "id": "d",
          "text": "`address` chỉ dùng cho EOA, còn `address payable` chỉ dùng cho contract."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Address payable` là kiểu địa chỉ có khả năng dùng trực tiếp các phương thức chuyển native coin được nêu trong slide. Hai kiểu không khác về độ dài địa chỉ hay việc nắm private key.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q26",
      "prompt": "Cặp quy đổi đơn vị nào đúng?",
      "options": [
        {
          "id": "a",
          "text": "`1 gwei = 10^3 wei` và `1 ether = 10^9 wei`."
        },
        {
          "id": "b",
          "text": "`1 gwei = 10^18 wei` và `1 ether = 10^9 wei`."
        },
        {
          "id": "c",
          "text": "`1 gwei = 10^9 wei` và `1 ether = 10^18 wei`."
        },
        {
          "id": "d",
          "text": "`1 gwei = 10^6 wei` và `1 ether = 10^12 wei`."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Wei` là đơn vị nhỏ nhất thường dùng để biểu diễn native coin trong Solidity. `Gwei` thường xuất hiện khi nói về giá gas, còn `ether` là đơn vị lớn hơn tương ứng `10^18 wei`.",
      "source": "Session 6, slide 14"
    },
    {
      "id": "bc-s6-q27",
      "prompt": "Với `mapping(address => string) _names`, đọc một key chưa từng được gán sẽ cho kết quả nào?",
      "options": [
        {
          "id": "a",
          "text": "Giá trị mặc định của kiểu `string`, tức chuỗi rỗng."
        },
        {
          "id": "b",
          "text": "Một địa chỉ zero address được tự động chuyển thành string."
        },
        {
          "id": "c",
          "text": "Transaction sẽ revert vì mapping không chứa key đó."
        },
        {
          "id": "d",
          "text": "Giá trị `null`, vì Solidity dùng null cho mọi key chưa tồn tại."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Trong Solidity mapping, mọi key về mặt logic đều có giá trị, và key chưa gán trả về `zero value` của kiểu value. Với `string`, zero value là chuỗi rỗng.",
      "source": "Session 6, slide 15"
    },
    {
      "id": "bc-s6-q28",
      "prompt": "Hạn chế nào của mapping khiến ClassRegistry cần thêm `address[]`?",
      "options": [
        {
          "id": "a",
          "text": "Mapping không có danh sách key hay length để iterate trực tiếp."
        },
        {
          "id": "b",
          "text": "Mapping không thể dùng `address` làm key trên EVM."
        },
        {
          "id": "c",
          "text": "Mapping chỉ lưu được tối đa 256 phần tử trong một contract."
        },
        {
          "id": "d",
          "text": "Mapping không thể được ghi vào storage giữa hai transaction."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Iterate` nghĩa là duyệt lần lượt các phần tử. Mapping hỗ trợ truy cập key → value hiệu quả, nhưng không cung cấp cơ chế liệt kê tất cả key, nên cần một array song song khi muốn enumeration.",
      "source": "Session 6, slide 15"
    },
    {
      "id": "bc-s6-q29",
      "prompt": "Phát biểu nào đúng về dynamic array trong Solidity?",
      "options": [
        {
          "id": "a",
          "text": "Luôn nằm trong calldata và tự xóa sau mỗi transaction."
        },
        {
          "id": "b",
          "text": "Chỉ có thể chứa value types; string hoặc struct không thể là phần tử."
        },
        {
          "id": "c",
          "text": "Không thể thay đổi kích thước sau deploy, vì mọi array trong storage đều cố định."
        },
        {
          "id": "d",
          "text": "Có thể dùng `.push()`, `.pop()` và `.length` để thêm cuối, bỏ cuối và đọc kích thước."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Dynamic array` là mảng có kích thước thay đổi được. Các thao tác `push`, `pop` và thuộc tính `length` là các công cụ cơ bản được nêu trong slide.",
      "source": "Session 6, slide 16"
    },
    {
      "id": "bc-s6-q30",
      "prompt": "`struct Member { string name; uint256 joinedAt; }` minh họa điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Một interface bắt buộc mọi contract phải implement cùng function signature."
        },
        {
          "id": "b",
          "text": "Một mapping chỉ cho phép truy cập dữ liệu bằng địa chỉ."
        },
        {
          "id": "c",
          "text": "Một record tùy chỉnh gom nhiều field có kiểu khác nhau thành một kiểu dữ liệu."
        },
        {
          "id": "d",
          "text": "Một event tự động được ghi vào transaction receipt khi tạo member."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Struct` là kiểu record do lập trình viên định nghĩa, dùng để nhóm nhiều trường dữ liệu liên quan. Nó là reference type và có thể được lưu trong storage, memory tùy ngữ cảnh.",
      "source": "Session 6, slide 16"
    },
    {
      "id": "bc-s6-q31",
      "prompt": "`enum Status { Pending, Active, Removed }` được hiểu như thế nào?",
      "options": [
        {
          "id": "a",
          "text": "Là dynamic array có ba phần tử string và có thể `.push()` trạng thái mới."
        },
        {
          "id": "b",
          "text": "Là mapping từ address sang bool với ba key cố định."
        },
        {
          "id": "c",
          "text": "Tập hằng có tên, ánh xạ sang các số nguyên nhỏ."
        },
        {
          "id": "d",
          "text": "Là custom error có ba nguyên nhân revert khác nhau."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Enum` giúp code dễ đọc bằng cách đặt tên cho một tập trạng thái hữu hạn. Trong EVM, các giá trị enum tương ứng các số nguyên nhỏ bắt đầu từ 0 theo thứ tự khai báo.",
      "source": "Session 6, slide 16"
    },
    {
      "id": "bc-s6-q32",
      "prompt": "Mục đích chính của kỹ thuật `swap-and-pop` khi xóa phần tử khỏi dynamic array là gì?",
      "options": [
        {
          "id": "a",
          "text": "Tạo một bản sao array trong calldata rồi xóa trên bản sao để không đổi state."
        },
        {
          "id": "b",
          "text": "Đổi array thành mapping tạm thời để có thể iterate bằng key."
        },
        {
          "id": "c",
          "text": "Giữ nguyên tuyệt đối thứ tự phần tử và đồng thời giảm mọi chi phí ghi storage về 0."
        },
        {
          "id": "d",
          "text": "Giữ array dense và tránh phải dịch chuyển hàng loạt phần tử sau vị trí bị xóa."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Swap-and-pop` thường đổi phần tử cần xóa với phần tử cuối, sau đó `pop()` phần tử cuối. Cách này rẻ hơn việc shift nhiều phần tử, nhưng không bảo toàn thứ tự ban đầu.",
      "source": "Session 6, slide 16 and Lab 6"
    },
    {
      "id": "bc-s6-q33",
      "prompt": "Đối với tham số `external` chỉ cần đọc, lựa chọn data location nào được ưu tiên trong slide?",
      "options": [
        {
          "id": "a",
          "text": "`memory`, vì Solidity luôn bắt buộc copy mọi argument trước khi đọc."
        },
        {
          "id": "b",
          "text": "`storage`, vì mọi input từ EOA phải tồn tại sau khi transaction kết thúc."
        },
        {
          "id": "c",
          "text": "`bytecode`, vì argument được compiler nhúng vào code của contract."
        },
        {
          "id": "d",
          "text": "`calldata`, vì dữ liệu chỉ đọc và không cần copy sang memory."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Calldata` là vùng input chỉ đọc của lời gọi. Khi function `external` chỉ cần đọc argument, dùng calldata tránh một bước copy không cần thiết và thường tiết kiệm gas.",
      "source": "Session 6, slide 18 and Lab Q2"
    },
    {
      "id": "bc-s6-q34",
      "prompt": "Khi nào `memory` phù hợp hơn `calldata` theo Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Khi cần tránh mọi cấp phát dữ liệu tạm trong EVM."
        },
        {
          "id": "b",
          "text": "Khi cần một bản tạm có thể sửa trong quá trình function thực thi."
        },
        {
          "id": "c",
          "text": "Khi dữ liệu phải tồn tại vĩnh viễn và được đọc lại ở transaction sau."
        },
        {
          "id": "d",
          "text": "Khi muốn frontend lọc dữ liệu bằng event topic."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Memory` là vùng dữ liệu tạm cho một call và có thể chỉnh sửa. Nó phù hợp khi code cần biến đổi một bản sao dữ liệu trong lúc thực thi, khác với calldata chỉ đọc.",
      "source": "Session 6, slide 18"
    },
    {
      "id": "bc-s6-q35",
      "prompt": "Phát biểu nào đúng nhất về `storage`?",
      "options": [
        {
          "id": "a",
          "text": "Đây là vùng log dành riêng cho event nên contract không thể truy cập."
        },
        {
          "id": "b",
          "text": "Đây là vùng tạm giống memory nhưng rẻ hơn mọi loại đọc dữ liệu."
        },
        {
          "id": "c",
          "text": "Đây là vùng input chỉ đọc của transaction và biến mất ngay khi function bắt đầu."
        },
        {
          "id": "d",
          "text": "Đây là vùng state bền vững của contract và ghi vào đó thường tốn gas nhất."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Storage` chứa trạng thái sống qua nhiều transaction. Vì mỗi node phải duy trì state này, ghi storage là thao tác đắt và nên chỉ dùng khi dữ liệu thật sự cần tồn tại lâu dài.",
      "source": "Session 6, slides 9, 17–18"
    },
    {
      "id": "bc-s6-q36",
      "prompt": "Quy tắc gas nào được nêu trực tiếp trong phần data location?",
      "options": [
        {
          "id": "a",
          "text": "Chuyển mọi biến cục bộ sang state variable để giảm chi phí memory."
        },
        {
          "id": "b",
          "text": "Luôn copy calldata sang storage trước khi kiểm tra dữ liệu đầu vào."
        },
        {
          "id": "c",
          "text": "Ưu tiên storage cho string vì storage rẻ hơn calldata khi đọc."
        },
        {
          "id": "d",
          "text": "Không ghi vào storage nếu dữ liệu không cần sống lâu hơn transaction hiện tại."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Ý chính là tránh `storage write` không cần thiết. Nếu dữ liệu chỉ phục vụ tính toán tạm trong một call, memory hoặc calldata thường phù hợp hơn.",
      "source": "Session 6, slide 18"
    },
    {
      "id": "bc-s6-q37",
      "prompt": "Trong `register(string calldata name)`, vì sao `calldata` thường rẻ hơn `memory`?",
      "options": [
        {
          "id": "a",
          "text": "Vì calldata được lưu vĩnh viễn trong contract nên lần gọi sau không phải truyền lại."
        },
        {
          "id": "b",
          "text": "Vì calldata cho phép sửa trực tiếp bytes của input mà không dùng opcode nào."
        },
        {
          "id": "c",
          "text": "Vì memory luôn tạo một transaction phụ trước transaction chính."
        },
        {
          "id": "d",
          "text": "Vì `name` chỉ được đọc từ input và không cần tạo thêm bản sao tạm trước khi dùng."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Calldata` là read-only input area. Với tham số chỉ đọc, tránh copy sang memory giúp giảm công việc và gas; khi gán `_names[msg.sender] = name`, dữ liệu cần thiết mới được copy vào storage.",
      "source": "Session 6, slide 18 and Lab Q2"
    },
    {
      "id": "bc-s6-q38",
      "prompt": "Event như `Registered(address indexed who, string name)` được ghi ở đâu?",
      "options": [
        {
          "id": "a",
          "text": "Trong transaction log/receipt, tách biệt với contract storage."
        },
        {
          "id": "b",
          "text": "Trong storage slot của contract, cùng vùng với mapping và array."
        },
        {
          "id": "c",
          "text": "Trong bytecode của contract, nên chỉ được tạo một lần khi deploy."
        },
        {
          "id": "d",
          "text": "Trong private key của caller, rồi frontend giải mã bằng ethers."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Event` tạo log gắn với transaction receipt. Log rẻ hơn việc lưu cùng dữ liệu trong storage và rất hữu ích cho code off-chain như frontend hoặc indexer.",
      "source": "Session 6, slide 19"
    },
    {
      "id": "bc-s6-q39",
      "prompt": "Từ khóa `indexed` trên tham số event có tác dụng chính gì?",
      "options": [
        {
          "id": "a",
          "text": "Buộc field phải là `address` và không cho phép các kiểu khác."
        },
        {
          "id": "b",
          "text": "Biến field đó thành topic có thể lọc nhanh khi truy vấn event log."
        },
        {
          "id": "c",
          "text": "Mã hóa field để chỉ contract phát event mới đọc được."
        },
        {
          "id": "d",
          "text": "Biến field thành state variable public và tự sinh getter."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Topic` là phần được lập chỉ mục của log, cho phép công cụ như ethers lọc event hiệu quả. Slide nêu có thể indexed tối đa ba field của event.",
      "source": "Session 6, slide 19"
    },
    {
      "id": "bc-s6-q40",
      "prompt": "Nhận định nào đúng về việc contract đọc event của chính nó?",
      "options": [
        {
          "id": "a",
          "text": "Contract không đọc event như state; code off-chain đọc được log."
        },
        {
          "id": "b",
          "text": "Chỉ owner của contract mới có thể đọc event log từ RPC."
        },
        {
          "id": "c",
          "text": "Contract có thể đọc event bằng `queryFilter`, nhưng frontend thì không."
        },
        {
          "id": "d",
          "text": "Event được tự động đưa vào mapping nội bộ để mọi function `view` đọc trực tiếp."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Event hướng tới quan sát off-chain. `QueryFilter` là cách phía ethers/frontend đọc log, còn contract không dùng các event cũ như storage nội bộ.",
      "source": "Session 6, slides 19 and 37"
    },
    {
      "id": "bc-s6-q41",
      "prompt": "Vì sao custom error như `revert AlreadyRegistered(msg.sender)` thường rẻ hơn `require(..., \"long reason string\")`?",
      "options": [
        {
          "id": "a",
          "text": "Custom error bỏ qua cơ chế revert nên transaction vẫn giữ các state change trước đó."
        },
        {
          "id": "b",
          "text": "Custom error không cần bytecode, vì tên lỗi chỉ tồn tại trong JavaScript test."
        },
        {
          "id": "c",
          "text": "Custom error luôn chạy off-chain nên không tiêu thụ opcode của EVM."
        },
        {
          "id": "d",
          "text": "Custom error dùng selector 4 byte cộng arguments thay vì lưu một reason string dài."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Custom error` là lỗi được khai báo bằng `error Name(args)`. Khi revert, nó encode một selector 4 byte và dữ liệu arguments, thường nhỏ gọn hơn chuỗi lý do dài.",
      "source": "Session 6, slide 20"
    },
    {
      "id": "bc-s6-q42",
      "prompt": "Khi một transaction `revert`, điều gì xảy ra theo Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Transaction được tự động thử lại trong block tiếp theo với cùng nonce."
        },
        {
          "id": "b",
          "text": "Toàn bộ gas limit được hoàn lại và các state change trước lỗi vẫn được giữ."
        },
        {
          "id": "c",
          "text": "Hoàn tác state change và trả lại phần gas chưa dùng."
        },
        {
          "id": "d",
          "text": "Chỉ event bị xóa, còn storage write trước đó vẫn tồn tại."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Revert` hủy các thay đổi state của transaction đang thực thi. Gas đã dùng cho phần công việc trước lỗi không được hoàn lại; slide nhấn mạnh phần gas còn lại được trả lại.",
      "source": "Session 6, slide 20"
    },
    {
      "id": "bc-s6-q43",
      "prompt": "Modifier `onlyOwner` được dùng chủ yếu để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Tự động mã hóa calldata trước khi function body thực thi."
        },
        {
          "id": "b",
          "text": "Chuyển mọi function sang `view` để chúng không thể thay đổi storage."
        },
        {
          "id": "c",
          "text": "Tạo một owner mới cho mỗi function để tránh dùng chung state."
        },
        {
          "id": "d",
          "text": "Tái sử dụng logic kiểm soát quyền trước hoặc quanh phần thân của nhiều function."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Modifier` là đoạn guard logic có thể bọc quanh function. `onlyOwner` là mẫu access control: kiểm tra `msg.sender` trước khi cho phép thân function tiếp tục.",
      "source": "Session 6, slide 21"
    },
    {
      "id": "bc-s6-q44",
      "prompt": "Trong modifier, ký hiệu `_;` biểu thị điều gì?",
      "options": [
        {
          "id": "a",
          "text": "Lệnh trả lại phần gas chưa dùng mà không chạy function body."
        },
        {
          "id": "b",
          "text": "Vị trí mà phần thân của function được bọc sẽ được thực thi."
        },
        {
          "id": "c",
          "text": "Lệnh xóa toàn bộ storage trước khi thoát khỏi modifier."
        },
        {
          "id": "d",
          "text": "Vị trí Solidity tự động emit một event sau khi kiểm tra guard."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`_;` là placeholder của function body bên trong modifier. Code trước `_` chạy trước thân hàm; code đặt sau `_` sẽ chạy sau thân hàm nếu có.",
      "source": "Session 6, slide 21"
    },
    {
      "id": "bc-s6-q45",
      "prompt": "Nhóm use case nào phù hợp với modifier theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Access control, pause switch và reentrancy guard."
        },
        {
          "id": "b",
          "text": "ABI encoding, RPC routing và block proposal."
        },
        {
          "id": "c",
          "text": "Merkle proof, PoW mining và transaction signing."
        },
        {
          "id": "d",
          "text": "Compiler selection, package installation và Git ignore."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Access control` giới hạn ai được gọi; `pause switch` tạm khóa một số chức năng; `reentrancy guard` ngăn lời gọi tái nhập. Đây đều là guard logic có thể tái sử dụng bằng modifier.",
      "source": "Session 6, slide 21"
    },
    {
      "id": "bc-s6-q46",
      "prompt": "Khi contract nhận plain native-coin transfer với calldata rỗng, function nào được gọi nếu có?",
      "options": [
        {
          "id": "a",
          "text": "`receive()` nếu function này được khai báo phù hợp."
        },
        {
          "id": "b",
          "text": "`fallback()` luôn được ưu tiên trước `receive()` dù calldata rỗng."
        },
        {
          "id": "c",
          "text": "`constructor()` vì nhận coin được xem như khởi tạo lại contract."
        },
        {
          "id": "d",
          "text": "Một function `payable` bất kỳ được EVM chọn ngẫu nhiên."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Receive` là special function dành cho việc nhận native coin khi calldata rỗng. Nó phải có dạng `receive() external payable`.",
      "source": "Session 6, slide 22"
    },
    {
      "id": "bc-s6-q47",
      "prompt": "Khi calldata có function selector không khớp bất kỳ function nào, special function nào có thể xử lý?",
      "options": [
        {
          "id": "a",
          "text": "`pure()` vì Solidity dùng pure function làm handler mặc định."
        },
        {
          "id": "b",
          "text": "`fallback()` nếu contract có khai báo nó."
        },
        {
          "id": "c",
          "text": "`receive()` vì mọi calldata lạ đều được coi như chuyển coin trơn."
        },
        {
          "id": "d",
          "text": "`constructor()` vì selector lạ làm EVM tạo contract mới."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Fallback` chạy khi không có function signature nào khớp, và cũng có thể được dùng trong các pattern như proxy. Nó khác `receive`, vốn dành cho calldata rỗng.",
      "source": "Session 6, slide 22"
    },
    {
      "id": "bc-s6-q48",
      "prompt": "Nếu contract không có `receive` hoặc `fallback` payable phù hợp, plain coin transfer sẽ thế nào?",
      "options": [
        {
          "id": "a",
          "text": "MetaMask chuyển coin sang owner thay cho contract."
        },
        {
          "id": "b",
          "text": "Coin vẫn vào contract nhưng không xuất hiện trong balance cho tới block sau."
        },
        {
          "id": "c",
          "text": "Contract sẽ từ chối lời chuyển native coin trơn đó."
        },
        {
          "id": "d",
          "text": "EVM tự tạo `receive()` tạm thời để giữ coin rồi xóa sau transaction."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Để chấp nhận plain transfer, contract cần special function phù hợp và `payable`. Nếu không, lời gọi không có function hợp lệ để nhận giá trị nên bị từ chối.",
      "source": "Session 6, slide 22"
    },
    {
      "id": "bc-s6-q49",
      "prompt": "Interface trong Solidity được hiểu đúng nhất là gì?",
      "options": [
        {
          "id": "a",
          "text": "Một file mạng chứa RPC URL, chainId và private key."
        },
        {
          "id": "b",
          "text": "Một khuôn API chung để các contract gọi nhau thống nhất."
        },
        {
          "id": "c",
          "text": "Một storage layout bắt buộc mọi contract phải dùng cùng địa chỉ slot."
        },
        {
          "id": "d",
          "text": "Một event log chỉ dành cho frontend và không chứa function signature."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Interface` mô tả function signatures mà một contract hỗ trợ, không phải state implementation. Đây là cơ sở để các chuẩn như ERC-20/721 tạo API chung giữa nhiều contract.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q50",
      "prompt": "Trong `contract Token is Ownable`, từ khóa `is` biểu thị điều gì?",
      "options": [
        {
          "id": "a",
          "text": "`Token` triển khai một event tên `Ownable`."
        },
        {
          "id": "b",
          "text": "`Token` kế thừa từ `Ownable`."
        },
        {
          "id": "c",
          "text": "`Token` ép kiểu địa chỉ owner thành contract."
        },
        {
          "id": "d",
          "text": "`Token` dùng `Ownable` làm RPC provider."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Inheritance` là cơ chế tái sử dụng logic từ contract cha. Cú pháp `is Ownable` cho biết `Token` kế thừa các thành phần được phép của `Ownable`.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q51",
      "prompt": "Khác biệt nào đúng giữa `constant` và `immutable`?",
      "options": [
        {
          "id": "a",
          "text": "`constant` nằm trong calldata; `immutable` luôn chiếm một storage slot."
        },
        {
          "id": "b",
          "text": "`constant` cố định lúc compile; `immutable` gán một lần lúc khởi tạo."
        },
        {
          "id": "c",
          "text": "`constant` được sửa bởi owner; `immutable` được sửa bởi mọi function `internal`."
        },
        {
          "id": "d",
          "text": "`constant` chỉ dùng cho string; `immutable` chỉ dùng cho mapping."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Constant` có giá trị biết ngay khi compile. `Immutable` cho phép xác định giá trị lúc deploy, thường trong constructor, nhưng sau đó không đổi.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q52",
      "prompt": "Vì sao Session 6 khuyến nghị tái sử dụng OpenZeppelin?",
      "options": [
        {
          "id": "a",
          "text": "Để lưu private key vào source code nhưng vẫn tránh bị Git phát hiện."
        },
        {
          "id": "b",
          "text": "Để bỏ hoàn toàn bước test vì thư viện đã đảm bảo mọi contract luôn đúng."
        },
        {
          "id": "c",
          "text": "Để thay EVM bằng JavaScript khi contract chạy trên testnet."
        },
        {
          "id": "d",
          "text": "Tái sử dụng contract đã audit thay vì tự viết lại primitive."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`OpenZeppelin` là bộ contract chuẩn cộng đồng đã được audit rộng rãi. Tái sử dụng code trưởng thành giúp giảm lượng logic tự viết, nhưng không loại bỏ trách nhiệm test contract của chính mình.",
      "source": "Session 6, slide 23"
    },
    {
      "id": "bc-s6-q53",
      "prompt": "So sánh nào đúng giữa Remix và Hardhat trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "Remix cần Node và npm; Hardhat chạy hoàn toàn trong browser mà không cần cài đặt."
        },
        {
          "id": "b",
          "text": "Remix chỉ chạy local chain; Hardhat chỉ hoạt động khi kết nối mainnet."
        },
        {
          "id": "c",
          "text": "Remix cho thao tác nhanh; Hardhat cho project và automated testing."
        },
        {
          "id": "d",
          "text": "Remix dùng Chai tests tự động; Hardhat chỉ hỗ trợ kiểm thử thủ công."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Remix` là IDE trên browser thuận tiện cho first contact. `Hardhat` là toolchain local/CLI phù hợp workflow dự án, automated testing và CI.",
      "source": "Session 6, slide 26"
    },
    {
      "id": "bc-s6-q54",
      "prompt": "Trong Remix của bài học, môi trường nào được chọn để deploy qua MetaMask?",
      "options": [
        {
          "id": "a",
          "text": "`JavaScript VM` để transaction được đưa thẳng lên TrustKeys."
        },
        {
          "id": "b",
          "text": "`Hardhat localhost` nhưng không cần chạy local node."
        },
        {
          "id": "c",
          "text": "`Injected Provider – MetaMask` khi MetaMask đang kết nối TrustKeys."
        },
        {
          "id": "d",
          "text": "`WalletConnect read-only` để deploy mà không ký transaction."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Injected Provider` cho Remix dùng provider do MetaMask đưa vào trình duyệt. Khi MetaMask đang ở TrustKeys, transaction deploy sẽ được ví ký và gửi tới mạng đó.",
      "source": "Session 6, slide 27 and Lab fallback"
    },
    {
      "id": "bc-s6-q55",
      "prompt": "Cặp thông số mạng TrustKeys testnet nào đúng trong Session 6?",
      "options": [
        {
          "id": "a",
          "text": "RPC `http://localhost:8545` và `chainId` 1."
        },
        {
          "id": "b",
          "text": "RPC `https://l1testnet.trustkeys.network` và `chainId` 31337."
        },
        {
          "id": "c",
          "text": "RPC `https://mainnet.ethereum.org` và `chainId` 11968."
        },
        {
          "id": "d",
          "text": "RPC `https://l1testnet.trustkeys.network` và `chainId` 11968."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`RPC endpoint` là điểm kết nối để gửi yêu cầu JSON-RPC tới blockchain. `chainId` định danh mạng; cấu hình trong slide dùng TrustKeys L1 testnet với 11968.",
      "source": "Session 6, slides 27 and 35; Lab 6"
    },
    {
      "id": "bc-s6-q56",
      "prompt": "Yêu cầu Node.js được nêu cho Hardhat trong Session 6 là gì?",
      "options": [
        {
          "id": "a",
          "text": "Node.js phiên bản từ 18 trở lên."
        },
        {
          "id": "b",
          "text": "Không cần Node.js vì Hardhat chạy trực tiếp trong Remix."
        },
        {
          "id": "c",
          "text": "Node.js dưới 18 để tương thích với Solidity 0.8.24."
        },
        {
          "id": "d",
          "text": "Chỉ Node.js 12, vì phiên bản mới hơn không hỗ trợ EVM."
        }
      ],
      "correctOptionId": "a",
      "explanation": "Hardhat workflow trong slide yêu cầu môi trường Node và npm. Tài liệu bài học đặt mốc `Node >= 18` cho việc cài và chạy project.",
      "source": "Session 6, slide 28 and Lab setup"
    },
    {
      "id": "bc-s6-q57",
      "prompt": "Vai trò nào được ghép đúng với các package trong project?",
      "options": [
        {
          "id": "a",
          "text": "Hardhat chạy tác vụ/EVM; toolbox cung cấp helpers; dotenv nạp `.env`."
        },
        {
          "id": "b",
          "text": "`hardhat`: ví trình duyệt; `hardhat-toolbox`: Solidity compiler độc lập; `dotenv`: block explorer."
        },
        {
          "id": "c",
          "text": "`hardhat`: frontend framework; `hardhat-toolbox`: CSS library; `dotenv`: database driver."
        },
        {
          "id": "d",
          "text": "`hardhat`: Git client; `hardhat-toolbox`: RPC server; `dotenv`: ABI encoder."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Task runner` điều phối các lệnh compile/test/deploy. `Local EVM` cung cấp mạng thử cục bộ; toolbox bổ sung các thư viện test/tương tác, còn dotenv tách secret khỏi source code.",
      "source": "Session 6, slide 28"
    },
    {
      "id": "bc-s6-q58",
      "prompt": "Trong project layout mẫu, file nào chứa source code Solidity của ClassRegistry?",
      "options": [
        {
          "id": "a",
          "text": "`scripts/deploy.js`."
        },
        {
          "id": "b",
          "text": "`test/ClassRegistry.test.js`."
        },
        {
          "id": "c",
          "text": "`hardhat.config.js`."
        },
        {
          "id": "d",
          "text": "`contracts/ClassRegistry.sol`."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Thư mục `contracts/` chứa source Solidity. `test/` chứa Chai tests, `scripts/` chứa script deploy/interact, và `hardhat.config.js` chứa cấu hình compiler/network.",
      "source": "Session 6, slide 29"
    },
    {
      "id": "bc-s6-q59",
      "prompt": "Sau `npx hardhat compile`, output quan trọng nào được tạo trong `artifacts/`?",
      "options": [
        {
          "id": "a",
          "text": "Private key và mnemonic của các signer local."
        },
        {
          "id": "b",
          "text": "Event logs và transaction receipts của TrustKeys."
        },
        {
          "id": "c",
          "text": "ABI và EVM bytecode của contract."
        },
        {
          "id": "d",
          "text": "Source map của frontend và file CSS đã minify."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`ABI` mô tả giao diện để công cụ như ethers encode/decode lời gọi. `Bytecode` là mã EVM được deploy hoặc thực thi; Hardhat tạo các artifact này từ source Solidity.",
      "source": "Session 6, slide 29"
    },
    {
      "id": "bc-s6-q60",
      "prompt": "Vì sao `.env` không nên được commit vào Git?",
      "options": [
        {
          "id": "a",
          "text": "Vì Solidity compiler không chạy nếu phát hiện `.env` trong cùng thư mục."
        },
        {
          "id": "b",
          "text": "Vì file này có thể chứa `PRIVATE_KEY` và các secret dùng để ký transaction."
        },
        {
          "id": "c",
          "text": "Vì `.env` chứa ABI quá lớn và làm repository vượt giới hạn dung lượng."
        },
        {
          "id": "d",
          "text": "Vì Git sẽ tự đổi chainId trong `.env` thành 1 khi push lên remote."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Secret` là dữ liệu nhạy cảm như private key. Slide yêu cầu `.env` phải nằm trong `.gitignore`, chỉ nên commit một `.env.example` không chứa khóa thật.",
      "source": "Session 6, slide 35 and Lab 6"
    },
    {
      "id": "bc-s6-q61",
      "prompt": "Các test trong ví dụ `npx hardhat test` mặc định chạy ở đâu?",
      "options": [
        {
          "id": "a",
          "text": "Trong MetaMask, mỗi test là một transaction cần xác nhận thủ công."
        },
        {
          "id": "b",
          "text": "Trực tiếp trên TrustKeys vì file config đã chứa RPC của testnet."
        },
        {
          "id": "c",
          "text": "Trên Ethereum mainnet nhưng dùng eth_call để không mất gas."
        },
        {
          "id": "d",
          "text": "Trên chain in-memory/local của Hardhat, không phải TrustKeys testnet."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`In-memory chain` là blockchain thử cục bộ do Hardhat dựng tạm cho test. Nó không cần chờ block thật và không tiêu native coin thật/testnet của tài khoản.",
      "source": "Session 6, slide 30 and Lab Q1"
    },
    {
      "id": "bc-s6-q62",
      "prompt": "Lợi ích chính của `loadFixture(deployRegistryFixture)` là gì?",
      "options": [
        {
          "id": "a",
          "text": "Deploy fixture một lần rồi dùng snapshot/revert để các test chạy nhanh và độc lập."
        },
        {
          "id": "b",
          "text": "Tạo một MetaMask account mới cho mỗi test và lưu private key vào `.env`."
        },
        {
          "id": "c",
          "text": "Deploy lại contract lên TrustKeys trước mỗi assertion để tránh dùng state cũ."
        },
        {
          "id": "d",
          "text": "Copy toàn bộ storage sang calldata để giảm gas cho mọi test."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Fixture` là trạng thái chuẩn bị dùng chung cho test. Hardhat network helpers có thể snapshot state và revert về snapshot, giúp test không ảnh hưởng lẫn nhau mà không phải deploy lại từ đầu mỗi lần.",
      "source": "Session 6, slide 31"
    },
    {
      "id": "bc-s6-q63",
      "prompt": "`ethers.getSigners()` trên Hardhat local network trả về gì theo slide?",
      "options": [
        {
          "id": "a",
          "text": "Các event topics được index từ transaction receipt."
        },
        {
          "id": "b",
          "text": "Các validator thật của TrustKeys và private key tương ứng."
        },
        {
          "id": "c",
          "text": "Danh sách contract đã deploy trong thư mục `artifacts/`."
        },
        {
          "id": "d",
          "text": "Một tập khoảng 20 test accounts đã được cấp sẵn balance trên local chain."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Signer` là đối tượng có khả năng ký/gửi transaction. Trên Hardhat local network, slide dùng các signer như `owner`, `alice`, `bob` từ tập tài khoản test đã được nạp sẵn tiền local.",
      "source": "Session 6, slide 31"
    },
    {
      "id": "bc-s6-q64",
      "prompt": "`registry.connect(alice).register(\"Alice\")` có ý nghĩa gì?",
      "options": [
        {
          "id": "a",
          "text": "Gọi `register` với signer Alice, nên `msg.sender` là Alice."
        },
        {
          "id": "b",
          "text": "Kết nối contract tới RPC của Alice thay vì RPC của Hardhat."
        },
        {
          "id": "c",
          "text": "Đọc event Registered của Alice mà không gửi transaction."
        },
        {
          "id": "d",
          "text": "Chuyển ownership của `registry` sang Alice trước khi gọi function."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`connect(signer)` tạo contract instance dùng signer đó cho các lời gọi cần ký. Vì vậy call sau được gửi với tư cách Alice và contract quan sát `msg.sender = alice.address`.",
      "source": "Session 6, slide 31"
    },
    {
      "id": "bc-s6-q65",
      "prompt": "Matcher nào kiểm tra một event được emit cùng arguments mong đợi?",
      "options": [
        {
          "id": "a",
          "text": "`.to.revertedWithCustomError(...).withEvent(...)`."
        },
        {
          "id": "b",
          "text": "`.to.equal(contract.storage).withGas(...)`."
        },
        {
          "id": "c",
          "text": "`.to.emit(contract, \"EventName\").withArgs(...)`."
        },
        {
          "id": "d",
          "text": "`.to.connect(event).withSigner(...)`."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Chai matcher` là cú pháp assertion dùng trong test. Matcher `.to.emit(...).withArgs(...)` xác minh transaction tạo đúng event log và đúng dữ liệu arguments.",
      "source": "Session 6, slide 32"
    },
    {
      "id": "bc-s6-q66",
      "prompt": "Matcher nào phù hợp để kiểm tra custom error `AlreadyRegistered`?",
      "options": [
        {
          "id": "a",
          "text": "`.to.emit(registry, \"AlreadyRegistered\")`."
        },
        {
          "id": "b",
          "text": "`.revertedWithCustomError(registry, \"AlreadyRegistered\")`."
        },
        {
          "id": "c",
          "text": "`.to.have.storageError(\"AlreadyRegistered\")`."
        },
        {
          "id": "d",
          "text": "`.to.equal(registry.errors.AlreadyRegistered)`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`revertedWithCustomError` kiểm tra transaction đã revert bằng đúng custom error. Có thể nối `.withArgs(...)` để kiểm tra dữ liệu error, ví dụ địa chỉ đã đăng ký.",
      "source": "Session 6, slide 32 and Lab tests"
    },
    {
      "id": "bc-s6-q67",
      "prompt": "`time.increase(3600)` trong test Hardhat local dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Tăng block number trực tiếp thêm đúng 3600 block mà không đổi thời gian."
        },
        {
          "id": "b",
          "text": "Tăng thời gian local chain thêm 3600 giây."
        },
        {
          "id": "c",
          "text": "Đặt gas limit của transaction tiếp theo thành 3600 gas."
        },
        {
          "id": "d",
          "text": "Tăng balance của signer thêm 3600 wei."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`Network helper` về time cho phép điều khiển thời gian trong môi trường local. Điều này hữu ích khi test deadline hoặc logic phụ thuộc thời gian mà không phải chờ ngoài đời.",
      "source": "Session 6, slide 32"
    },
    {
      "id": "bc-s6-q68",
      "prompt": "Lệnh nào khởi chạy một local JSON-RPC blockchain tại `localhost:8545`?",
      "options": [
        {
          "id": "a",
          "text": "`npx ethers console --mainnet`."
        },
        {
          "id": "b",
          "text": "`npx hardhat node`."
        },
        {
          "id": "c",
          "text": "`npm init -y --rpc 8545`."
        },
        {
          "id": "d",
          "text": "`npx hardhat compile --network trustkeys`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`JSON-RPC` là giao thức mà ví/script dùng để nói chuyện với node. `npx hardhat node` dựng một blockchain local đầy đủ để thử tay hoặc kết nối frontend.",
      "source": "Session 6, slide 33"
    },
    {
      "id": "bc-s6-q69",
      "prompt": "Thứ tự cốt lõi của Hardhat development loop là gì?",
      "options": [
        {
          "id": "a",
          "text": "Deploy → interact → compile → test → write, rồi khóa source code."
        },
        {
          "id": "b",
          "text": "Test → deploy → write → compile → mine, rồi xóa local chain."
        },
        {
          "id": "c",
          "text": "Compile → bridge → stake → vote → interact, rồi tạo ABI."
        },
        {
          "id": "d",
          "text": "Write → compile → test → deploy → interact, rồi lặp lại khi cần sửa code."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Development loop` là chu trình lặp của quá trình phát triển. Slide minh họa viết code, compile, test trên local chain, deploy lên testnet, tương tác/đọc kết quả và quay lại sửa khi cần.",
      "source": "Session 6, slide 34"
    },
    {
      "id": "bc-s6-q70",
      "prompt": "Trong cấu hình Hardhat, private key dành cho TrustKeys nên được lấy theo cách nào?",
      "options": [
        {
          "id": "a",
          "text": "Lấy mnemonic của ví chính từ browser storage mỗi lần chạy script."
        },
        {
          "id": "b",
          "text": "Ghi trực tiếp private key thật vào `hardhat.config.js` để deploy nhanh hơn."
        },
        {
          "id": "c",
          "text": "Từ `process.env.PRIVATE_KEY`, sử dụng một tài khoản test riêng đã được nạp tiền."
        },
        {
          "id": "d",
          "text": "Commit private key vào `.env.example` để các thành viên dùng chung."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`Environment variable` cho phép nạp secret mà không hard-code vào source. Lab yêu cầu dùng dedicated TEST account, không dùng mnemonic hoặc khóa đang giữ tài sản thật.",
      "source": "Session 6, slide 35 and Lab setup"
    },
    {
      "id": "bc-s6-q71",
      "prompt": "Chuỗi thao tác nào đúng trong deploy script mẫu?",
      "options": [
        {
          "id": "a",
          "text": "`getContractAt` → `revert()` → `deploy()` → `emit()`."
        },
        {
          "id": "b",
          "text": "`getContractFactory` → `deploy()` → `waitForDeployment()` → `getAddress()`."
        },
        {
          "id": "c",
          "text": "`loadFixture` → `time.increase` → `getAddress` → `npm init`."
        },
        {
          "id": "d",
          "text": "`getSigners` → `queryFilter` → `compile()` → `memberCount()`."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`getContractFactory` chuẩn bị factory từ artifact; `deploy()` gửi transaction tạo contract; `waitForDeployment()` chờ deployment hoàn tất; `getAddress()` lấy địa chỉ contract.",
      "source": "Session 6, slide 36"
    },
    {
      "id": "bc-s6-q72",
      "prompt": "Deploy contract lên TrustKeys testnet có bản chất gì?",
      "options": [
        {
          "id": "a",
          "text": "Là event log không thay đổi state, nên không cần signer."
        },
        {
          "id": "b",
          "text": "Chỉ là `eth_call` đọc state nên không tạo transaction hay tiêu gas."
        },
        {
          "id": "c",
          "text": "Là thao tác compile local; contract address được Hardhat tự giả lập."
        },
        {
          "id": "d",
          "text": "Là transaction thật trên testnet và cần gas."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`Deployment transaction` tạo contract mới và thay đổi state của blockchain, nên khác với lời đọc `eth_call`. Tài khoản test được cấp coin để trả phí trên testnet.",
      "source": "Session 6, slide 36 and Lab Q4"
    },
    {
      "id": "bc-s6-q73",
      "prompt": "Trong Lab Q4, ai chịu phí gas khi deploy ClassRegistry?",
      "options": [
        {
          "id": "a",
          "text": "Tài khoản test gửi deploy trả gas bằng native coin của mạng."
        },
        {
          "id": "b",
          "text": "Hardhat-toolbox trả phí thay người dùng vì nó chứa gas reporter."
        },
        {
          "id": "c",
          "text": "Contract ClassRegistry tự trả phí từ balance chưa tồn tại của chính nó."
        },
        {
          "id": "d",
          "text": "Block explorer trả phí vì explorer là nơi lưu bytecode sau deploy."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Gas payer` là tài khoản gửi transaction. Vì deploy là state-changing transaction, funded test account phải có native coin của mạng để trả gas; contract mới chưa thể tự trả cho transaction tạo ra chính nó.",
      "source": "Session 6, slide 36 and Lab Q4"
    },
    {
      "id": "bc-s6-q74",
      "prompt": "`ethers.getContractAt(\"ClassRegistry\", addr)` dùng để làm gì?",
      "options": [
        {
          "id": "a",
          "text": "Tạo ethers contract instance tại `addr` theo ABI `ClassRegistry`."
        },
        {
          "id": "b",
          "text": "Đọc trực tiếp source Solidity từ blockchain mà không cần artifact."
        },
        {
          "id": "c",
          "text": "Đổi địa chỉ `addr` thành private key để ký transaction."
        },
        {
          "id": "d",
          "text": "Deploy một ClassRegistry mới và bỏ qua contract đang có tại `addr`."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Contract instance` là đối tượng JavaScript đại diện cho contract đã tồn tại. Ethers kết hợp ABI của `ClassRegistry` với địa chỉ cụ thể để encode call và decode kết quả.",
      "source": "Session 6, slide 37 and Lab 6.3"
    },
    {
      "id": "bc-s6-q75",
      "prompt": "`await r.memberCount()` trong ví dụ tương tác được xem là loại thao tác nào?",
      "options": [
        {
          "id": "a",
          "text": "Một deploy transaction tạo thêm một contract member."
        },
        {
          "id": "b",
          "text": "Một event query chỉ đọc topic `Registered` từ receipt."
        },
        {
          "id": "c",
          "text": "Một view/read call để lấy state."
        },
        {
          "id": "d",
          "text": "Một ownership transaction thay đổi `msg.sender` thành registry."
        }
      ],
      "correctOptionId": "c",
      "explanation": "`View call` đọc state nhưng không sửa state. Khi gọi theo kiểu đọc qua RPC, nó không cần được đưa vào block như transaction ghi dữ liệu.",
      "source": "Session 6, slide 37"
    },
    {
      "id": "bc-s6-q76",
      "prompt": "`queryFilter(r.filters.Registered())` dùng để lấy gì?",
      "options": [
        {
          "id": "a",
          "text": "ABI của contract và bytecode dùng khi deploy."
        },
        {
          "id": "b",
          "text": "Toàn bộ storage slots của mapping `_names` theo thứ tự key."
        },
        {
          "id": "c",
          "text": "Danh sách private key của những signer từng gọi `register`."
        },
        {
          "id": "d",
          "text": "Các event log `Registered` phù hợp với filter từ blockchain."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`queryFilter` của ethers truy vấn log theo event filter. `r.filters.Registered()` tạo filter cho event Registered, sau đó kết quả có thể đọc các `args` như `who` và `name`.",
      "source": "Session 6, slide 37 and Lab Q5"
    },
    {
      "id": "bc-s6-q77",
      "prompt": "Một website muốn hiển thị member list từ event `Registered` nên làm thế nào theo ý tưởng của Lab Q5?",
      "options": [
        {
          "id": "a",
          "text": "Query log `Registered`, decode arguments rồi cập nhật frontend."
        },
        {
          "id": "b",
          "text": "Compile lại ClassRegistry ở trình duyệt mỗi lần có block mới."
        },
        {
          "id": "c",
          "text": "Gọi private key của từng member từ RPC rồi tự suy ra tên từ chữ ký."
        },
        {
          "id": "d",
          "text": "Đọc mapping bằng cách iterate toàn bộ address space của Ethereum."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Frontend indexing` là việc đọc event log và chuyển chúng thành dữ liệu dễ hiển thị/tìm kiếm. Vì event có field `indexed`, frontend có thể lọc log hiệu quả mà không cần contract tự đọc lại event.",
      "source": "Session 6, slide 37 and Lab Q5"
    },
    {
      "id": "bc-s6-q78",
      "prompt": "Theo Lab Q1, sample test chạy bởi `npx hardhat test` diễn ra ở đâu và có tốn coin testnet không?",
      "options": [
        {
          "id": "a",
          "text": "Trên TrustKeys testnet; mỗi test trừ native coin khỏi MetaMask account."
        },
        {
          "id": "b",
          "text": "Trên Ethereum mainnet; Hardhat hoàn tiền sau khi test kết thúc."
        },
        {
          "id": "c",
          "text": "Trong Remix VM; phí gas được trừ từ contract thay vì signer."
        },
        {
          "id": "d",
          "text": "Chạy trên local Hardhat chain, không trừ coin TrustKeys."
        }
      ],
      "correctOptionId": "d",
      "explanation": "Local Hardhat chain dùng tài khoản giả lập được fund sẵn, nên test không gửi transaction lên TrustKeys. Có thể đo `gas used` cho logic, nhưng không phát sinh khoản phí bằng coin testnet từ ví của bạn.",
      "source": "Session 6, slide 30 and Lab Q1"
    },
    {
      "id": "bc-s6-q79",
      "prompt": "Yêu cầu nào đúng với `register(string calldata name)` trong ClassRegistry lab?",
      "options": [
        {
          "id": "a",
          "text": "Register chỉ đọc state; function không được ghi mapping hoặc emit event."
        },
        {
          "id": "b",
          "text": "Chỉ owner được register; tên rỗng phát event `NotOwner`; đăng ký lại bị bỏ qua."
        },
        {
          "id": "c",
          "text": "Mọi address đăng ký vô hạn; tên rỗng được đổi thành zero address; đăng ký lại ghi đè."
        },
        {
          "id": "d",
          "text": "Mỗi address chỉ đăng ký một lần; tên rỗng gây `EmptyName`, đăng ký lại gây `AlreadyRegistered`."
        }
      ],
      "correctOptionId": "d",
      "explanation": "`EmptyName` và `AlreadyRegistered` là custom errors dùng để biểu diễn hai điều kiện lỗi khác nhau. Thành công phải lưu tên và emit `Registered`; `calldata` được dùng vì input name chỉ đọc.",
      "source": "Lab 6.1"
    },
    {
      "id": "bc-s6-q80",
      "prompt": "Yêu cầu nào đúng với `deregister(address who)` trong lab?",
      "options": [
        {
          "id": "a",
          "text": "Function là `view`, nên không được xóa phần tử khỏi array hay mapping."
        },
        {
          "id": "b",
          "text": "Chỉ owner gọi; lỗi quyền là `NotOwner`, target lạ là `NotRegistered`."
        },
        {
          "id": "c",
          "text": "Mọi member tự xóa bất kỳ address nào; lỗi duy nhất là `EmptyName`."
        },
        {
          "id": "d",
          "text": "Chỉ block proposer được gọi; owner phải dùng MetaMask để bypass modifier."
        }
      ],
      "correctOptionId": "b",
      "explanation": "`onlyOwner` là modifier bảo vệ quyền gọi `deregister`. `NotOwner` mô tả lỗi quyền truy cập, còn `NotRegistered` mô tả target address không có registration hợp lệ.",
      "source": "Lab 6.1"
    },
    {
      "id": "bc-s6-q81",
      "prompt": "Vì sao ClassRegistry lab giữ cả `mapping(address => string)` và `address[]`?",
      "options": [
        {
          "id": "a",
          "text": "Mapping dùng để trả gas, còn array dùng để giữ private key của member."
        },
        {
          "id": "b",
          "text": "Mapping cho tra cứu theo address, còn array cung cấp danh sách có thể enumerate."
        },
        {
          "id": "c",
          "text": "Mapping chỉ dùng trong memory, còn array là cấu trúc duy nhất có thể nằm storage."
        },
        {
          "id": "d",
          "text": "Mapping lưu event log, còn array lưu bytecode của từng member."
        }
      ],
      "correctOptionId": "b",
      "explanation": "Hai cấu trúc phục vụ hai access pattern khác nhau. Mapping cho lookup key → value trực tiếp, còn array bù cho việc mapping không có key list để duyệt.",
      "source": "Session 6, slide 15 and Lab Q3"
    },
    {
      "id": "bc-s6-q82",
      "prompt": "Bộ test nào phản ánh đúng các yêu cầu tối thiểu của Lab 6?",
      "options": [
        {
          "id": "a",
          "text": "Chỉ test frontend MetaMask và không cần assertion ở contract level."
        },
        {
          "id": "b",
          "text": "Chỉ test gas reporter vì mọi behavior khác đã do Solidity compiler bảo đảm."
        },
        {
          "id": "c",
          "text": "Test lưu tên/event, double-register, access control và nhiều signer."
        },
        {
          "id": "d",
          "text": "Chỉ test constructor deploy thành công và bỏ qua register/deregister."
        }
      ],
      "correctOptionId": "c",
      "explanation": "Lab yêu cầu fixture với `getSigners`, kiểm tra event bằng Chai matcher, custom error khi đăng ký lần hai, access control của `deregister`, và một vòng lặp với nhiều signer. Đây là các behavior quan trọng thay vì chỉ kiểm tra deploy.",
      "source": "Lab 6.1"
    },
    {
      "id": "bc-s6-q83",
      "prompt": "`REPORT_GAS=true npx hardhat test` trong lab được dùng cho mục đích gì?",
      "options": [
        {
          "id": "a",
          "text": "Bật gas reporter để xem mức gas tiêu thụ theo function/test khi chạy bộ kiểm thử."
        },
        {
          "id": "b",
          "text": "Chuyển các view call thành payable transaction để benchmark."
        },
        {
          "id": "c",
          "text": "Gửi toàn bộ test lên TrustKeys để đo phí bằng native coin thật."
        },
        {
          "id": "d",
          "text": "Giới hạn mỗi function ở đúng một lượng gas cố định và revert nếu vượt."
        }
      ],
      "correctOptionId": "a",
      "explanation": "`Gas reporter` là công cụ đo lượng gas EVM mà các lời gọi tiêu thụ trong test. Nó hữu ích để quan sát chi phí tương đối mà không biến local test thành transaction thật trên testnet.",
      "source": "Session 6, slide 32 and Lab 6.1"
    }
  ]
} as const;
