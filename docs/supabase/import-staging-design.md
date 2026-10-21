# Stage 1A: thiết kế raw snapshot và import staging

Trạng thái: **Stage 1A đã được duyệt; capture engine Stage 1B.1 và bootstrap gate Stage 1B.2 đã triển khai**. Đối chiếu source ngày 21/10/2026. Tài liệu này cụ thể hóa Stage 1 của [implementation-plan.md](implementation-plan.md), theo D5–D7 và D9 trong [decisions.md](decisions.md). [data-model.md](data-model.md) sở hữu mapping sang cloud; tài liệu này chỉ thiết kế cách bảo vệ raw **trước** Auth/import. Không có Supabase project, migration, cache hay outbox trong app hiện tại.

## 1. Kiểm kê nguồn và các write phải đi sau capture

Phạm vi capture là **bảy key cố định và mọi key khớp prefix quiz**. Quiz key phải được liệt kê theo prefix `ju-study-hub:quiz-progress:`, kể cả subject/chapter không còn trong registry, thay vì sinh danh sách chỉ từ catalog hiện tại. Bảy key cố định là bookmarks, mistakes, Review v2, hai Review v1, bookmark practice và exam. Với mỗi key cố định không có trong storage, ghi trạng thái `missing`; key quiz chỉ xuất hiện nếu tìm thấy khi liệt kê. Không đọc staging/cache/outbox như nguồn import. Tên key `ju-study-hub:` lạ ngoài inventory phải được báo để review phiên bản inventory, không âm thầm gọi capture là đầy đủ; key ngoài namespace app thì không thu thập.

| Key/pattern | Đọc và biến đổi hiện tại | Lý do cần raw trước mount/interaction |
| --- | --- | --- |
| `ju-study-hub:quiz-progress:<subjectId>:<chapterId>` | `restoreProgress` lọc answer không còn question/option; `useQuizProgress` đọc sau mount rồi effect ghi snapshot đã khôi phục hoặc `removeItem` khi rỗng; reset cũng xóa key. | Raw hỏng, answer cũ hoặc key của chapter đã bỏ có thể mất khi mở quiz, kể cả không bấm chấm. |
| `ju-study-hub:bookmarks:v1` | `parseBookmarks` loại ref sai/trùng; `QuizRunner` và `BookmarkedQuestions` gọi `flushBookmarks` khi mount/focus, ghi lại danh sách nếu có pending RAM; thêm/bỏ ghi cả list. | Parse cho UI không phải bản raw; flush có thể đổi source trước preview. |
| `ju-study-hub:mistakes:v1` | `readMistakes` chỉ parse, giữ pending RAM; `MistakeLink.subscribe` gọi `flushMistakes` khi mount/focus; trả lời hoặc exam submit cũng ghi list. `ReviewMistakes` hiện **không** xóa orphan khi mở. | Pending flush có thể đổi key; orphan vẫn phải được giữ dù UI không hiện. Audit 18/10 mô tả bug cũ, đã sửa ở Task 2. |
| `ju-study-hub:review-state:v2` | `ReviewMistakes` đọc v2 trước; tạo lượt/ghi progress ghi trọn record, không tự ghi lại chỉ vì restore. | Chụp v2 nguyên văn trước mọi lựa chọn/reset; v2 tồn tại nhưng hỏng vẫn là dữ liệu cần bảo vệ. |
| `ju-study-hub:review-round:v1`, `ju-study-hub:review-progress:v1` | Chỉ đọc khi v2 không tồn tại. Nếu v1 hợp lệ và tiến độ rỗng, mount Review có thể tự tạo v2 bằng `setItem`; không xóa hai v1. | Capture cả hai key trước auto migration; thiếu/hỏng/mismatch phải còn raw để xem xét. |
| `ju-study-hub:bookmark-practice:v1` | `readPractice` parse; `resolvePractice` lọc ref/answer theo catalog cho UI; `updatePractice` và `startPractice` ghi đè một record. | Không dùng record đã lọc để thay raw; lượt cũ có thể bị thay khi bắt đầu lượt mới. |
| `ju-study-hub:exam-attempt:v1` | `readExam` parse; mount/focus/timer của `ExamApp` có thể auto-submit, gọi `saveExam` và ghi mistakes; tạo đề mới ghi đè attempt cũ. | Snapshot câu hỏi, deadline, result và `mistakesApplied` phải được giữ trước auto-submit/đề mới; chỉ attempt còn trong key có thể bảo vệ. |

`lib/storage.ts` chỉ có `getItem/setItem/removeItem`; `useQuizProgress` dùng chuỗi `review-state` và `bookmark-practice` làm danh tính hook, **không phải hai key khác**. Các module hiện chưa có hàng đợi bền hoặc transaction nhiều key. Dữ liệu pending chỉ ở RAM không thể chụp sau reload nếu trước đó chưa flush thành công.

## 2. Kiến trúc và lựa chọn nơi lưu

**Đề xuất cho Stage 1B: một IndexedDB cùng origin, dùng API browser gốc, không thêm dependency.** Hai object store:

- `raw_snapshots`: bản sao raw **bất biến**, khóa `captureId`. Chỉ `add` khi tạo; không `put` hay tự xóa khi còn import chưa xử lý. Một snapshot lưu đủ entries của một lần capture và checksum.
- `import_staging`: descriptor riêng, khóa `stagingId`, trỏ `captureId`. Chứa trạng thái preview/owner/consent và version để chuyển trạng thái có điều kiện trong transaction. Không chép lại raw vào đây.

Ghi snapshot và descriptor khởi đầu bằng **một IndexedDB transaction**. `add` với ID mới từ `crypto.randomUUID()` từ chối trùng; nếu transaction abort, không coi là đã staging. Sau commit, đọc lại snapshot, đối chiếu checksum và mới cho UI tiếp tục. Descriptor chưa giải quyết không bị tạo mới cùng ID hoặc ghi đè bằng capture khác; chuyển trạng thái phải đọc revision cũ và ghi revision mới trong một `readwrite` transaction. Nếu hai tab cùng xử lý, một transition thất bại rồi phải đọc lại. Capture mới dùng ID khác và giữ bản cũ. Không tự dọn raw sau cloud ACK theo D5; retention/xóa thủ công là quyết định sau.

| Lựa chọn | Ưu điểm | Đánh đổi |
| --- | --- | --- |
| localStorage namespace riêng, một key cho mỗi snapshot | Ít API/code, đồng bộ, sống qua reload/redirect cùng origin. | Cùng quota với source; exam snapshot có thể làm bản sao thất bại. Không có create-if-absent/CAS nguyên tử giữa tab; cần protocol riêng để chống overwrite. |
| **IndexedDB, đề xuất** | Bản raw và descriptor tách store; transaction tạo cùng lúc, `add` bảo vệ bản chưa xử lý, transition có kiểm tra revision; thường phù hợp dữ liệu exam lớn hơn. Không thêm package. | Bootstrap bất đồng bộ, cần cổng UI trước mount; IndexedDB cũng có thể bị chặn, hết quota, bị browser xóa hoặc ở chế độ phiên tạm. |

Lý do chọn IndexedDB dù code nhiều hơn: yêu cầu **không ghi đè staging chưa xử lý** khi nhiều tab và lưu bản sao exam khiến localStorage cùng quota khó bảo đảm. Không gọi IndexedDB là backup vĩnh viễn: người dùng hoặc browser vẫn có thể xóa dữ liệu site; OAuth phải quay về **cùng origin** để đọc được staging. Nếu IndexedDB không dùng được, fail closed cho import/Auth, không giả vờ một snapshot ở RAM đã sống qua redirect.

## 3. Snapshot schema và fingerprint

Schema đề xuất ở mức logic, không phải schema SQL:

```ts
type RawEntry =
  | { key: string; state: "present"; raw: string }
  | { key: string; state: "missing" }
  | { key: string; state: "read-error"; errorName: string };

type RawSnapshot = {
  schemaVersion: 1;
  captureId: string;                  // ID riêng cho bản sao, không phải user ID
  origin: string;
  capturedAt: string;                 // thời điểm thiết bị, chỉ để audit
  inventoryVersion: 1;
  inventoryStatus: "complete" | "enumeration-error" | "unstable" | "unsupported-key";
  inventoryErrorName: string | null;  // khi liệt kê storage lỗi
  unrecognizedAppKeys: string[];      // chỉ tên, không đọc raw key chưa đăng ký
  entries: RawEntry[];                // sắp theo key bằng thứ tự code unit JS
  sourceFingerprint: string | null;   // sha256:<hex>; null nếu capture chưa đầy đủ
};
```

Ví dụ rút gọn cho một capture **đầy đủ**; Stage 1B phải có entry `missing` cho mọi fixed key còn lại:

```json
{
  "schemaVersion": 1,
  "captureId": "cbe4a020-99c9-4a19-929d-98e322da1825",
  "origin": "https://study.example",
  "capturedAt": "2026-10-20T09:00:00.000Z",
  "inventoryVersion": 1,
  "inventoryStatus": "complete",
  "inventoryErrorName": null,
  "unrecognizedAppKeys": [],
  "entries": [
    { "key": "ju-study-hub:bookmarks:v1", "state": "present", "raw": "{\\"version\\":1,\\"items\\":[]}" },
    { "key": "ju-study-hub:exam-attempt:v1", "state": "missing" },
    { "key": "ju-study-hub:quiz-progress:database:session-1", "state": "present", "raw": "{broken-json" },
    { "key": "ju-study-hub:review-state:v2", "state": "present", "raw": "{\\"version\\":2,\\"roundId\\":\\"r-1\\"}" }
  ],
  "sourceFingerprint": "sha256:<computed-hex>"
}
```

`raw` là **chuỗi y nguyên từ `getItem`**, không `JSON.parse`/`JSON.stringify` lại. `missing` khác `present` có raw chuỗi `"null"`, chuỗi rỗng hoặc JSON hỏng. Nếu `getItem` ném lỗi, dùng `{key,state:"read-error",errorName:"SecurityError"}`, `sourceFingerprint:null`, và snapshot không được import. Nếu không thể gọi `localStorage.length/key(index)` để liệt kê quiz keys, đặt `inventoryStatus:"enumeration-error"`; không kết luận quiz keys vắng mặt. Tên app key chưa được phân loại đặt `unsupported-key` với chẩn đoán tên key, fingerprint null; phải cập nhật inventory hoặc xác nhận nó không thuộc dữ liệu người học trước khi mở gate.

Fingerprint dùng SHA-256 qua Web Crypto trên một byte stream xác định: tiền tố `JSH-RAW-1`, origin, inventory version, rồi từng entry đã sắp theo **UTF-16 code unit** của key; mã hóa mỗi chuỗi key/raw bằng các UTF-16 code unit little-endian có độ dài byte đứng trước, kèm tag `present`/`missing`. Danh sách key quiz tìm thấy là một phần của entries, nên thêm/bỏ key đổi digest. Không tính `captureId` hoặc `capturedAt`: thời gian thiết bị chỉ để audit, không phân xử conflict. Chỉ tính digest khi enumeration và mọi read thành công; lỗi/unstable có fingerprint null và chặn import. Hash phát hiện thay đổi vô tình, **không** chứng minh owner, thời điểm trả lời hay chống sửa dữ liệu trên máy.

Chi tiết encoding đã chốt trong Stage 1B.1: `JSH-RAW-1` là 9 byte ASCII không có length prefix; tiếp theo là origin với length 32-bit little-endian tính theo **byte** rồi UTF-16LE, inventory version 32-bit little-endian, số entries 32-bit little-endian. Mỗi entry gồm key theo cách mã hóa chuỗi trên, tag một byte `1` cho present hoặc `0` cho missing, sau tag present là raw theo cách mã hóa chuỗi trên. Key được sắp bằng so sánh code unit JS, không dùng locale. `read-error` không đi vào digest. Engine hiện trả snapshot lỗi chỉ trong kết quả RAM, không tạo descriptor import khi fingerprint null.

Stage 1B.1 gồm `lib/import-staging-capture.ts` (inventory, digest, capture/reuse, checksum và resume) cùng `lib/import-staging-idb.ts` (hai store IndexedDB native, unique index `sourceFingerprint` trên `raw_snapshots`, index thường trên `import_staging`, transaction tạo cặp bằng `add`). Unique index trên snapshot cho phép descriptor riêng theo account ở giai đoạn sau mà không nhân đôi raw. Khi hai tab cùng tạo cùng fingerprint, một transaction thắng; bên thua đọc lại cặp thắng và kiểm checksum. Engine trả `source-changed` nếu nguồn đổi sau commit, giữ nguyên descriptor cũ; Stage 1B.2 phải giữ gate đóng và capture lại nguồn hiện tại. Chưa có transition `stale`/preview/confirm, Auth hay browser integration trong Stage 1B.1. IndexedDB không phải transaction chung với localStorage; hai pass và post-commit recheck vẫn có race.

Để kiểm tra backup không hỏng, tính lại fingerprint từ `entries` khi đọc IndexedDB và so với giá trị đã lưu. Fingerprint lúc preview/confirm phải tính từ **source localStorage được đọc lại**, cùng inventory/encoding, không so với bản parse. Nếu source có raw malformed, fingerprint vẫn hợp lệ vì không parse.

Descriptor staging tách riêng, ví dụ:

```json
{
  "schemaVersion": 1,
  "stagingId": "fbd0b21f-f9b8-4cff-8184-1ca2e9124601",
  "captureId": "cbe4a020-99c9-4a19-929d-98e322da1825",
  "sourceFingerprint": "sha256:<computed-hex>",
  "state": "captured",
  "revision": 1,
  "targetUserId": null,
  "previewFingerprint": null,
  "createdAt": "2026-10-20T09:00:00.000Z"
}
```

`targetUserId:null` không có nghĩa dữ liệu là của tài khoản sắp đăng nhập. Sau Auth, chỉ gắn account đích vào **staging descriptor** khi người dùng chọn rõ; snapshot raw vẫn không có owner. Stage 1B chỉ cần `captured` và cơ chế resume, chưa xây import/ACK.

## 4. Luồng capture, validate, preview, confirm, retry

1. **Bootstrap gate trước consumers:** trên mọi route có thể vào trực tiếp, giữ các component đọc/ghi storage chưa mount cho tới khi capture bền đã hoàn tất. Một `useEffect` của parent chạy cùng lúc với effect của `QuizRunner` **không đủ** để chứng minh thứ tự. Gate phải render trạng thái chờ trước, chỉ render children sau khi IndexedDB commit + read-back thành công. Không cho thao tác Auth redirect đi vòng qua gate.
2. **Capture:** lấy handle localStorage; liệt kê tất cả key theo quiz prefix, cộng bảy fixed keys; loại namespace backup/staging, không lấy auth token. Đọc hai pass và so key set + từng raw để phát hiện write chen ngang. Nếu không ổn định, báo lỗi và cho người dùng thử lại, không biến thành bản `missing`. Tạo snapshot + descriptor bằng transaction; read-back và kiểm checksum. Đọc lại source sau commit; nếu khác fingerprint, Stage 1B.2 trả `source-changed` và giữ gate đóng để thử chụp lại; descriptor cũ được giữ nguyên. Transition `stale` chưa có trong Stage 1B.2. Không có snapshot nguyên tử xuyên nhiều key localStorage; write từ tab cũ có thể đua, nên còn bước recheck khi preview/confirm.
3. **Validate không ghi nguồn:** parser của từng mode chạy trên bản sao raw; ghi chẩn đoán riêng, không thay `entries`. Review v2 hợp lệ ưu tiên; v2 có mặt nhưng hỏng/không đọc được thì block import Review, **không fallback v1**. Chỉ có v1 mới áp quy tắc migration đã duyệt. Orphan và answer bị parser lọc phải hiện trong preview, không tự xóa.
4. **Preview sau Auth ở Stage 5:** lấy `user.id` thật và đọc cloud gồm tombstone; hiển thị tài khoản đích, dữ liệu hợp lệ/bị loại, xung đột và giới hạn core. Practice/exam được bảo vệ raw nhưng vẫn local ở core. Ghi descriptor preview với fingerprint nguồn đã kiểm, account đích và revision staging mới; không gửi raw lên cloud trong Stage 1B.
5. **Confirm/import ở Stage 6:** ngay trước xác nhận và từng đợt ghi, đọc lại source, so fingerprint và target user; nếu khác, dừng, giữ preview/snapshot cũ và tạo capture mới để xem lại. So lại cloud revision/tombstones bằng CAS. Ghi intent/operation ID vào **outbox riêng** rồi mới gửi; retry đọc kết quả server trước khi resend. Mất response không được đánh dấu ACK hoặc xóa raw. Staging lưu quyết định/tiến trình; outbox sở hữu network mutation, không nhập hai cấu trúc thành một.
6. **Resume:** sau reload/OAuth callback cùng origin, đọc các descriptor chưa xử lý và snapshot tương ứng, kiểm checksum, so source hiện tại. Nếu snapshot hỏng/mất, báo lỗi và không nhập; không tự dùng bản khác. Nếu nguồn đổi, yêu cầu preview mới. Không ghi đè một descriptor đang `captured`, `previewed`, `confirmed` hoặc `conflict` bằng capture mới.

## 5. Failure scenarios và bảo toàn dữ liệu

| Tình huống | Hành vi đề xuất |
| --- | --- |
| Source đổi sau snapshot hoặc hai tab cùng viết | Snapshot cũ bất biến; pass kép/post-commit/preview/confirm phát hiện đổi và buộc xem lại. Có race còn lại sau recheck vì localStorage không có transaction nhiều key; sau ghi cloud vẫn giữ raw và đối chiếu lại. Không tự gọi local mới hơn cloud. |
| Đọc một key lỗi | `read-error`, fingerprint null; không coi là `missing` hoặc import phần còn lại như capture đầy đủ. Giữ các raw đã đọc để chẩn đoán, thử lại khi storage hoạt động. |
| IndexedDB bị chặn/quota hoặc transaction abort | Không mở cổng import/Auth hoặc consumer có thể ghi nguồn; hiện lỗi và nút thử lại. Không thay bằng snapshot chỉ ở RAM, không xóa snapshot cũ để nhường chỗ. Luồng guest RAM-only, nếu muốn, cần thiết kế adapter chặn mọi write source và Ju duyệt riêng. |
| Browser đóng, reload, private session hoặc user xóa site data | Resume từ IndexedDB nếu còn; nếu browser đã xóa cả source lẫn staging thì app không thể khôi phục. Không hứa backup vĩnh viễn. Chưa có auto cleanup; export/retention là quyết định sau. |
| OAuth redirect | Chỉ bắt đầu khi snapshot đã commit và checksum đúng; callback phải về cùng origin. Không đặt raw/hash trong URL, cookie hay OAuth state. Nếu callback khác origin/IDB mất, dừng import và báo lỗi. |
| Guest chuyển sang A, A sang B | Raw theo origin không chứng minh owner. Không gắn snapshot cho user chỉ vì login; cần xác nhận nhập riêng cho A/B. Pending của A không được gửi bằng session B; snapshot và descriptor chưa xử lý vẫn giữ. |
| JSON hỏng, orphan, Review v2 hỏng | Giữ raw từng byte của chuỗi; parser chỉ tạo diagnostics. V2 có mặt nhưng hỏng thì Review import bị chặn, không fallback v1. Các mode khác cũng không silently chuyển phần bị lọc thành bản gốc mới. |
| Exam đang dở, đã nộp hoặc `mistakesApplied` pending | Capture nguyên record và mistakes riêng. Stage 1B không sửa deadline/submit; gate phải chạy trước `ExamApp` auto-submit. Cờ local không là ACK cloud; nếu source đổi sau gate thì preview/confirm phải phát hiện. |

## 6. Ranh giới trách nhiệm và bảo mật

| Cấu trúc | Vai trò | Không được dùng thay cho |
| --- | --- | --- |
| Key nguồn localStorage | Trạng thái guest hiện có, theo origin; có thể tiếp tục thay đổi sau capture. | Backup hay bằng chứng owner. |
| `raw_snapshots` | Bản sao raw bất biến, đủ để kiểm tra/khôi phục thủ công phần đã đọc. | Trạng thái preview, account cache, outbox, hay nguồn chấm điểm đáng tin. |
| `import_staging` | Con trỏ tới snapshot, trạng thái preview/consent theo account và revision xử lý. | Bản sao raw thứ hai hoặc queue gửi mạng. |
| Authenticated cache | Bản đọc cloud theo `user.id`, có thể tái tạo từ server; thiết kế ở Stage 4. | Guest raw hoặc backup. |
| Outbox | Các ý định ghi cloud bền, có owner/operation ID/expected revision; thiết kế ở Stage 4–7. | Backup hay account cache. |

Raw có thể chứa đáp án đúng và nội dung đề exam, tiến độ học và lịch sử sai. IndexedDB cùng origin **không mã hóa** dữ liệu trước script cùng origin/XSS; hạn chế log/analytics, không đưa raw vào URL hoặc lỗi hiển thị, không gửi trước khi có Auth + consent. Fingerprint không thay encryption hoặc xác thực. Stage 1B cần test quota và kích thước exam thực tế, quyền truy cập trên browser dùng chung, và thông báo rằng backup tồn tại trên thiết bị cho tới khi người dùng xử lý theo chính sách sau này. Không tự thu thập localStorage của thư viện khác.

## 7. Acceptance criteria cho Stage 1B

- Inventory test thấy đủ bảy fixed keys và mọi quiz key theo prefix, kể cả chapter đã bỏ; `missing`, `present:"null"`, `present:""` và `read-error` phân biệt được. Không capture namespace staging/cache/outbox hoặc key ngoài app.
- Unit test khẳng định raw JSON hỏng, orphan refs, Review v2 hỏng, v1 lệch và exam snapshot được lưu **y nguyên**; parse/preview không viết lại source. Fingerprint cố định theo cùng raw, đổi khi thêm/bỏ key hoặc đổi một code unit, không đổi vì `capturedAt`.
- Fault injection cho enumeration/getItem, IDB open/transaction/quota, checksum hỏng và hai tab cùng tạo/đổi descriptor: không ghi đè snapshot/descriptor chưa xử lý, không báo `missing` thay lỗi; rollback không để descriptor trỏ bản chưa commit.
- Browser trên **mọi route vào trực tiếp** chứng minh gate commit + read-back **trước** `useQuizProgress` write, `MistakeLink`/`BookmarkedQuestions` flush, Review auto migration và Exam auto-submit. Dùng spies trên `setItem/removeItem` và event log thứ tự, không chỉ kiểm tra UI sau cùng. Khi capture lỗi, không có write nguồn nào trước khi người dùng xử lý.
- Browser reload/đóng mở tab/redirect mô phỏng cùng origin khôi phục descriptor và raw; comparator thuần phải nhận ra source đổi sau một preview giả lập, giữ bản cũ và từ chối xác nhận giả lập. Hai tab có write chen ngang được báo stale/conflict, không tự chọn phiên bản đúng. UI preview/confirm thật nằm ở Stage 5–6.
- Kiểm tra guest và account A/B **mô phỏng trong unit tests**: descriptor không tự gắn raw vào user, không chuyển pending; blocked/quota có cảnh báo và không tiếp tục import. Stage 1B **không** triển khai Auth hoặc gửi cloud; browser Auth thật nằm ở Stage 4–6.

## 8. Điểm cần Ju duyệt trước Stage 1B

1. **Chọn IndexedDB cho snapshot + descriptor** như đề xuất, thay vì localStorage namespace đơn giản hơn nhưng thiếu transaction/CAS giữa tab và chia quota với source.
2. **Fail closed khi không lưu được backup bền:** tạm chặn Auth/import và các consumer có thể ghi source. Nếu muốn vẫn học ở guest RAM-only, cần duyệt thêm cơ chế chặn mọi write vào source trong phiên đó; không dùng luồng hiện tại như thể đã bảo vệ.
3. **Giữ các snapshot chưa xử lý không auto-xóa.** Cần quyết định sau về export, giới hạn dung lượng và thao tác xóa thủ công; Stage 1B chỉ cảnh báo khi quota gần/đã hết.
4. **Bootstrap gate trên tất cả route** trước component data mount. Việc này thay đổi thời điểm hiển thị UI khi vào trang; cần browser regression cho direct links và reload.

Stage 1A và 1B đã được Ju duyệt theo từng task. Chưa bắt đầu Auth, import hoặc cloud sync.

## 9. Trạng thái triển khai Stage 1B.2

`StorageBootstrapGate` nằm trong root layout, render màn chờ trước `children` trên mọi direct route, kể cả trang chủ có `MistakeLink` có thể flush mistakes. Chỉ `captured` và `reused` sau IndexedDB commit, đọc lại và kiểm checksum mới mount các consumer. Mọi trạng thái lỗi giữ gate đóng và hiện nút **Thử lại**. Client navigation giữ root gate đã mở, tránh capture lại chỉ do đổi route; một lần reload tạo capture mới nếu source đổi hoặc reuse nếu fingerprint không đổi. Vì vậy, những write xảy ra sau khi gate đã mở, kể cả write từ tab khác, vẫn cần recheck tại preview/confirm trước import; gate không phải khóa nhiều tab hoặc giao dịch xuyên localStorage và IndexedDB.

Browser probe tạm trên origin thử `http://127.0.0.1:3000` đã kiểm tra capture/resume qua reload, hai tab đồng thời, transaction hai store bị abort, source đổi, lỗi unavailable mô phỏng, legacy Review migration và exam auto-submit sau khi raw attempt `working` đã được chụp. Probe đã được gỡ khỏi source. Quota thật và IndexedDB bị browser chặn thật chưa tái hiện; fault injection unit test và mô phỏng browser chỉ kiểm tra nhánh xử lý. Snapshot và descriptor thử nghiệm vẫn ở IndexedDB theo chính sách không tự cleanup.

## 10. Stage 1B.3: recovery và bootstrap UX

### Ranh giới mount và route

`StorageBootstrapGate` ở root layout trả màn chờ trước khi mount `children`. Không có component người học nào đọc/ghi localStorage nguồn trước gate trong cây route hiện tại. `Analytics` ở ngoài gate, nhưng source hiện tại không cho thấy nó truy cập các key `ju-study-hub:`; cần re-audit nếu thêm script hoặc provider mới ngoài gate. Sau khi gate mở, `/` có `MistakeLink` có thể flush mistakes; trang subject có `LevelProgress` chỉ đọc quiz progress; trang chapter mô tả thuần server, không đọc/ghi; `/quiz/...` có `useQuizProgress` và `QuizRunner` có thể ghi progress/bookmarks/mistakes; `/review` có migration v1 và cập nhật v2/mistakes; `/bookmarks` có thể flush bookmarks; `/bookmarks/practice` ghi lượt practice khi tương tác; `/exam` và `/exam/attempt` có thể auto-submit attempt hết hạn và ghi mistakes. Hai route dev `/dev/math` và `/dev/quiz-console` không ghi dữ liệu người học trong source hiện tại.

Gate vẫn chặn cả trang chỉ đọc và dev khi IndexedDB lỗi. Client navigation thông thường giữ root layout và gate đã mở, nên không capture lại, không remount các consumer chỉ vì gate. Direct load/reload vẫn chờ capture và có thể hiện màn chờ ngắn; thời gian phụ thuộc lượng raw và tốc độ IndexedDB, chưa có benchmark định lượng trên thiết bị chậm. Nếu nguồn đổi sau khi gate mở, điều hướng trong cùng phiên không tự capture lại. Do đó bước preview/confirm import phải đọc lại nguồn và so fingerprint; gate không phải cơ chế khóa nguồn giữa các tab. Chưa thêm bypass theo route: khi chuyển từ route chỉ đọc sang route có thể ghi, phải capture và read-back trước mount, kể cả client navigation và retry. Cần test thứ tự sự kiện cho chiều chuyển route đó trước khi nới gate.

### Kiểm chứng lỗi và giới hạn

Probe tạm qua browser thật, đã gỡ khỏi source, dùng nguồn giả trong RAM để không sửa localStorage nguồn. IndexedDB thật đã kiểm chứng: tạo cặp và reuse, resume sau reload, nguồn thay đổi tạo capture mới, hai tab cùng fingerprint nhận một `captured` và một `reused` cùng capture ID, transaction ghi hai store rồi abort không để snapshot dở. Tạo riêng một raw snapshot thử nghiệm **không có descriptor** bằng `add` đã xác nhận capture và retry đều trả `invalid-descriptor`; record không bị xóa. Engine giờ tra cứu snapshot theo fingerprint khi descriptor không có, kể cả nhánh `ConstraintError`, để báo `MissingDescriptor` thay vì che giấu lỗi thành `transaction-aborted`. Không tự tạo descriptor mới hoặc dùng bản khác. Các record thử nghiệm trong IndexedDB được giữ nguyên theo chính sách không tự cleanup.

`SecurityError` khi mở IndexedDB, `AbortError` và `QuotaExceededError` của capture engine chỉ được **mô phỏng có kiểm soát** bằng factory/repository thử nghiệm trên browser và unit tests; cả ba không trả thành công. Transaction abort thực trên browser đã được kiểm chứng riêng. Chưa gây được browser quota thật hoặc browser policy chặn IndexedDB thật. Unit tests còn bao phủ source đổi giữa hai pass và sau commit, snapshot/descriptor hỏng, retry, callback effect cũ và đổi route child trong khi capture pending. Chưa có browser test trực tiếp cho gate retry sau IndexedDB lỗi thật hoặc chuyển route trong lúc capture còn pending; đây là giới hạn cần kiểm tra trước khi nới gate hoặc triển khai Auth/import.

### Fail closed và guest RAM-only

**Khuyến nghị cho quy mô hiện tại: tiếp tục fail closed trong Stage 1/2, chưa triển khai guest RAM-only.** Lựa chọn A giữ đường dữ liệu đơn giản: khi backup bền thất bại, quiz/Review/bookmarks/practice/exam không mount; source local giữ nguyên và retry được khi lỗi thoáng qua. Đánh đổi là trang chỉ đọc cũng bị chặn, kể cả khi người dùng chỉ muốn xem nội dung, và IDB bị chặn lâu dài khiến app khó sử dụng.

Lựa chọn B cần một adapter RAM riêng và chặn hoàn toàn mọi `getItem/setItem/removeItem` trên localStorage nguồn cho phiên đó. Chỉ vô hiệu hóa write là chưa đủ vì restore từ source rồi ghi state RAM có thể khiến người dùng tưởng đang tiếp tục tiến độ được lưu. Quiz và Review phải phân biệt state phiên tạm với tiến độ cũ; bookmarks/mistakes và pending flush không được trộn; practice/exam cần cảnh báo rõ attempt, deadline, auto-submit và kết quả sẽ mất khi reload, đóng tab hoặc OAuth/logout. Cần truyền adapter qua toàn bộ consumer, ngăn direct localStorage access, kiểm tra mọi route/transition, và xử lý chuyển từ RAM sang chế độ bền theo quyết định riêng. Khả năng mất tiến độ phiên tạm và độ phức tạp này lớn hơn lợi ích hiện tại. Nếu nhu cầu học khi IDB bị chặn trở nên quan trọng, ưu tiên task riêng với acceptance criteria cho isolation, UX mất dữ liệu và test reload/tab/account switch; không dùng RAM snapshot như bằng chứng backup qua OAuth.

### Điều kiện còn lại trước Stage 2

- Có thể bắt đầu thiết kế Stage 2 trên nền fail closed hiện tại, nhưng không coi lỗi IDB/quota thật trên mọi browser đã được chứng minh. Cần thử trên browser/profile mục tiêu trước phát hành; nếu thêm telemetry, không chứa raw.
- Nếu muốn mở trang chỉ đọc khi IDB lỗi, phải thiết kế và test gate theo route, bao gồm chuyển sang route ghi khi capture pending, back/forward và Strict Mode. Không chỉ kiểm tra trang hiển thị.
- Cần chính sách/công cụ recovery có chủ đích cho snapshot mồ côi hoặc descriptor hỏng; 1B.3 chỉ chẩn đoán và giữ dữ liệu, không tự sửa staging.
