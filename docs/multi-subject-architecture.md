# Kiến trúc nhiều môn học

## Mục tiêu và phạm vi

Blockchain và Database dùng chung ba trang. Nội dung câu hỏi, giao diện quiz, KaTeX và cơ chế lưu tiến trình được giữ nguyên. Các URL Blockchain cũ vẫn hoạt động. Database hiện có `chapter-2`, không cần tạo `chapter-1`.

## Cấu trúc trước và sau

Trước đây, ba trang gắn cố định với Blockchain:

```text
app/subjects/blockchain/page.tsx
app/subjects/blockchain/[chapterId]/page.tsx
app/quiz/blockchain/[chapterId]/page.tsx
```

Sau thay đổi:

```text
app/
  page.tsx
  subjects/[subjectId]/
    page.tsx
    [chapterId]/page.tsx
  quiz/[subjectId]/[chapterId]/page.tsx
data/
  subjects.ts
  blockchain/index.ts
  database/
    index.ts
    chapter-2.ts
```

Thư mục `blockchain` cũ trong `app` không còn chứa trang. Các tệp dữ liệu trong `data/blockchain` vẫn giữ nguyên.

## Đường dẫn động và params

Đường dẫn động là đường dẫn có một phần thay đổi theo URL. Dấu ngoặc vuông đặt tên cho phần đó. `/quiz/database/chapter-2` được xử lý bởi `app/quiz/[subjectId]/[chapterId]/page.tsx`, với `subjectId = "database"` và `chapterId = "chapter-2"`.

Next.js truyền thông tin này qua `params`. Trang hiện tại nhận một `Promise`, nên phải chờ bằng `await`:

```tsx
type QuizPageProps = {
    params: Promise<{ subjectId: string; chapterId: string }>;
};
```

Trong hàm trang:

```tsx
const { subjectId, chapterId } = await params;
if (!isValidSubject(subjectId)) notFound();
const { chapters } = subjects[subjectId];

const chapter = chapters.find((item) => item.id === chapterId);

if (!chapter) {
    notFound();
}
```

Chỉ tìm bài trong môn đã chọn. Vì vậy `/subjects/database/chapter-1` không lấy nhầm bài Blockchain. ID là chuỗi, không được chuyển thành số hoặc suy ra từ vị trí trong mảng. `notFound()` yêu cầu Next.js hiển thị trang 404 khi không tìm thấy dữ liệu.

## Danh mục môn học

`data/subjects.ts` là nơi tập trung cấu hình môn học. Khóa của đối tượng chính là ID duy nhất, tránh lưu thêm một trường `id` có thể lệch với khóa. Mỗi môn có tiêu đề, mô tả và mảng bài học:

```ts
type Subject = {
    title: string;
    description: string;
    chapters: Chapter[];
};
```

Mảng bài được nhập trực tiếp từ `data/blockchain/index.ts` và `data/database/index.ts`. Không sao chép câu hỏi. `Chapter` dùng kiểu `Question` có sẵn trong `types/quiz.ts`.

Đối tượng kết thúc bằng `satisfies Record<string, Subject>`. Cú pháp này kiểm tra mỗi mục có đúng cấu trúc `Subject`, đồng thời giữ tên khóa cụ thể để suy ra kiểu ID.

```ts
export type SubjectId = keyof typeof subjects;

export function isValidSubject(id: string): id is SubjectId {
    return Object.hasOwn(subjects, id);
}
```

- `typeof subjects` lấy kiểu của đối tượng trong TypeScript.
- `keyof` lấy các tên khóa. Hiện tại `SubjectId` tương đương `"blockchain" | "database"`.
- Dấu `|` tạo kiểu hợp: giá trị phải thuộc một trong các khả năng được liệt kê.
- Hàm kiểm tra kiểu (`type guard`) vừa kiểm tra giá trị khi chạy, vừa cho TypeScript biết rằng sau khi kiểm tra thành công, `id` là `SubjectId`.
- `Object.hasOwn` chỉ nhận khóa thực sự được khai báo trong danh mục. Các tên như `constructor` hoặc `toString` không được xem là môn học.

Khi thêm khóa môn mới, `SubjectId` tự cập nhật. Không cần sửa một danh sách kiểu riêng.

## Luồng dữ liệu và liên kết

```text
Tệp câu hỏi → index.ts của môn → data/subjects.ts
                                      ↓
                       Trang chủ / danh sách / chi tiết
                                      ↓
                               Trang quiz
                                      ↓
                                QuizRunner
                                      ↓
                QuizQuestion / QuizNavigation / QuizResult
```

Trang chủ dùng `Object.entries(subjects)` để lấy từng cặp ID và thông tin môn, rồi hiển thị `SubjectCard`. Danh sách bài dùng `subject.chapters.map(...)`. Số câu lấy từ `chapter.questions.length`.

Liên kết dùng ID đã kiểm tra:

```tsx
href={`/subjects/${subjectId}/${chapter.id}`}
href={`/quiz/${subjectId}/${chapter.id}`}
```

Trang quiz kiểm tra bài rỗng trước khi hiển thị QuizRunner. Nếu chưa có câu hỏi, trang hiển thị thông báo và liên kết về đúng môn.

```tsx
<QuizRunner key={`${subjectId}:${chapter.id}`} subjectId={subjectId} chapterId={chapter.id} questions={chapter.questions} />
```

`subjectId`, `chapterId` và `questions` là props, tức dữ liệu trang truyền xuống component. `key` dùng cả môn và bài để React tạo trạng thái riêng khi chuyển giữa hai môn có cùng ID bài. `key` là thông tin React dùng để nhận diện component, không phải một prop mà QuizRunner đọc.

## Tiến trình và localStorage

QuizRunner vẫn quản lý lựa chọn nháp, đáp án đã chấm, câu đang xem, điều hướng, điểm và màn hình kết quả. Không sửa QuizRunner hoặc các component con trong lần chuyển kiến trúc này.

Khóa lưu giữ nguyên:

```ts
const storageKey = `ju-study-hub:quiz-progress:${subjectId}:${chapterId}`;
```

Ví dụ:

```text
ju-study-hub:quiz-progress:blockchain:chapter-1
ju-study-hub:quiz-progress:database:chapter-2
```

Ngay cả khi hai môn có cùng `chapterId`, tiền tố môn vẫn tách riêng tiến trình. Khóa Blockchain cũ không đổi nên không cần chuyển dữ liệu.

Cấu trúc bản lưu hiện có được giữ nguyên:

```ts
{
    version: 1,
    currentQuestionId: questions[currentIndex]?.id ?? null,
    answers,
}
```

Mỗi đáp án chứa `optionId` và `isSubmitted`. QuizRunner đọc sau khi gắn vào trình duyệt, rồi mới cho phép ghi để tránh trạng thái rỗng ban đầu đè lên bản lưu cũ. Trạng thái màn hình kết quả không được lưu. Làm lại giữ hành vi cũ: xóa tiến trình của đúng bài đang làm. Việc chuyển kiến trúc không chạy thao tác xóa kho lưu của người dùng.

`localStorage` là kho dữ liệu trong trình duyệt, riêng theo địa chỉ web và trình duyệt. Đổi từ localhost sang Vercel không tự chuyển tiến trình. Nếu trình duyệt chặn kho lưu, quiz vẫn chạy nhưng không giữ tiến trình sau khi tải lại.

## Thêm bài Database

1. Tạo tệp, ví dụ `data/database/chapter-3.ts`, xuất một đối tượng có kiểu `Chapter`. Chọn ID duy nhất trong môn; dùng nội dung câu hỏi thực tế.
2. Nhập đối tượng và thêm vào mảng `chapters` trong `data/database/index.ts`.

Tệp hiện tại:

```ts
import { chapter2 } from "./chapter-2";

export const chapters = [chapter2];
```

Thứ tự mảng quyết định thứ tự hiển thị. Không cần sửa trang chủ, danh mục môn hoặc tạo trang mới. Giữ ID của các bài/câu/lựa chọn đã có để bản lưu vẫn khớp.

## Thêm môn mới

1. Tạo thư mục dữ liệu môn với các bài kiểu `Chapter` và một `index.ts` xuất mảng `chapters`.
2. Nhập mảng đó trong `data/subjects.ts`.
3. Thêm một khóa môn mới với `title`, `description`, `chapters`. Dùng ID ổn định, ngắn, phù hợp URL, ví dụ `statistics`.

Trang chủ và cả ba trang động tự đọc cấu hình mới. Không cần thêm component trang hoặc QuizRunner mới.

## Các tệp thay đổi

| Tệp | Vai trò trong thay đổi |
| --- | --- |
| `data/subjects.ts` | Hoàn thiện tệp có sẵn của Ju: thêm mô tả và kiểm tra cấu trúc; giữ SubjectId và hàm kiểm tra ID |
| `app/page.tsx` | Hiển thị thẻ môn từ danh mục; lời chào không gắn cố định Blockchain |
| `app/subjects/[subjectId]/page.tsx` | Trang danh sách dùng chung, lấy tiêu đề/mô tả/bài từ môn đã kiểm tra |
| `app/subjects/[subjectId]/[chapterId]/page.tsx` | Trang chi tiết dùng chung và liên kết tới quiz đúng môn |
| `app/quiz/[subjectId]/[chapterId]/page.tsx` | Trang quiz dùng chung, kiểm tra dữ liệu và truyền props |
| Ba trang `blockchain` cũ trong `app` | Được thay thế và xóa sau khi kiểm tra các hàm trang động |
| `tests/subjects.test.mjs` | Kiểm tra danh mục, trang, liên kết, props, 404 và bài rỗng |
| `docs/multi-subject-architecture.md` | Tài liệu này |
| `docs/progress.md` | Ghi kết quả kiểm tra và trạng thái bàn giao |

`data/database/index.ts` và `data/database/chapter-2.ts` đã có trong máy Ju trước lần sửa này, chưa được Git theo dõi. Giữ nguyên hai tệp đó; khi tự commit cần đưa chúng vào cùng thay đổi để máy triển khai đọc được Database. Không có commit hoặc push tự động.

## Cách kiểm tra

Không cần cài thư viện kiểm thử mới:

```sh
node node_modules/next/dist/bin/next typegen
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/eslint/bin/eslint.js .
node --test tests/*.test.mjs
node node_modules/next/dist/bin/next build --webpack
```

Các kiểm tra trang chạy hàm thật và dữ liệu thật, thay phần phụ thuộc Next.js và component hiển thị bằng thành phần mô phỏng. Chúng kiểm tra được nhánh gọi 404 và dữ liệu, nhưng không thay thế kiểm tra trình duyệt hoặc mã HTTP của máy chủ.

Trên trình duyệt: từ trang chủ mở từng môn, mở bài rồi quiz; chấm một câu, chọn nháp câu khác và tải lại; đổi môn rồi quay lại để kiểm tra hai tiến trình độc lập. Thử môn/bài không có để thấy 404. Chỉ thử làm lại trên lượt thử nghiệm có thể bỏ, vì thao tác này chủ ý xóa tiến trình của bài đó.
