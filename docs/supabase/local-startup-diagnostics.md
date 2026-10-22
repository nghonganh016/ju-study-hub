# Chẩn đoán lỗi khởi động Supabase local

Ngày kiểm tra: 22/10/2026. Lượt chẩn đoán đầu chỉ thu thập bằng chứng cho `DbSetupError`. Lượt recovery có kiểm soát bên dưới gắn tag backup và pull theo digest riêng; chưa sửa tag gốc, volume, database, cấu hình hoặc source ứng dụng.

## Môi trường và kiểm tra read-only

| Kiểm tra | Kết quả |
| --- | --- |
| Supabase CLI | `2.121.0`, cài trong project |
| Docker | Client và Engine `29.9.2`; Docker Desktop `4.96.2`; Linux engine chạy với 8 CPU, khoảng 7,55 GiB RAM |
| WSL | Default version 2; `docker-desktop` đang chạy ở WSL 2, Ubuntu dừng; không có `.wslconfig` tùy chỉnh được tìm thấy |
| Cổng | Không có listener trên 54321–54324 hoặc 54327 tại thời điểm kiểm tra; PostgreSQL 54322 chưa mở sau lỗi. Chưa kiểm tra riêng cổng shadow 54320 |
| Docker trước debug | `docker ps -a` không có container; 13 images dùng khoảng 8,06 GB; không có local volume; chỉ có ba network mặc định |
| Dung lượng | Ổ C còn khoảng 38,3 GiB. Filesystem dữ liệu trong Docker WSL báo khoảng 946 GiB *dung lượng logic* còn trống; con số này không chứng minh ổ host có chừng đó dung lượng vật lý |
| Cấu hình ứng dụng | `supabase/config.toml` đặt PostgreSQL 17, cổng 54322; không có file trong `supabase/migrations/` và không có `supabase/seed.sql` |

Đã chạy `npx supabase --version`, `docker version`, `docker info`, `docker ps -a`, `docker system df`, `docker volume ls`, `docker network ls`, `wsl --status`, `wsl --list --verbose`, kiểm tra các cổng bằng `Get-NetTCPConnection` và đọc filesystem Docker bằng `wsl ... df -h`. Truy cập WSL và Docker API từ sandbox bị chặn, nên các phép đọc tương ứng được chạy ngoài sandbox. Không có migration hoặc seed của ứng dụng để `start --debug` áp dụng; lần chạy đó chỉ khởi động stack local và schema nội bộ của Supabase.

## Lần `start --debug`

CLI tự dọn các container sau lỗi, vì vậy sau đó không còn container để chạy `docker inspect` hoặc `docker logs`. Để giữ bằng chứng vòng đời, Docker events được theo dõi từ trước khi gọi CLI. Output debug chỉ được lọc trong bộ nhớ; không lưu raw logs chứa credentials vào repository.

1. `supabase_db_ju-study-hub` dùng image PostgreSQL `17.11.0.004`, khởi động và `pg_isready` trả mã 0. Docker đánh dấu container **healthy**.
2. Helper dùng image `supabase/realtime:v2.143.4` thoát mã 0.
3. Helper dùng image `supabase/storage-api:v1.82.1` thoát mã **1**. Dòng lỗi đầu tiên có ý nghĩa: `Error: Invalid package config /app/package.json.` CLI sau đó trả `DbSetupError: error running container: exit 1`.
4. CLI dừng PostgreSQL (mã thoát 0), hủy các container và dọn tài nguyên tạm. Sau lần chạy, `docker ps -a` không còn container Supabase, nên không thể đọc `OOMKilled`, health state hoặc logs bằng `inspect`/`logs` sau sự kiện. Event stream không cho thấy sự kiện OOM; không đủ để chứng minh OOM không xảy ra. Không quan sát thấy lỗi mount hoặc port trong các dòng debug đã lọc, nhưng không có raw log giữ lại để loại trừ tuyệt đối.

`/app/package.json` nằm **bên trong container Storage API**, không phải `package.json` của Ju Study Hub. Node.js mô tả `ERR_INVALID_PACKAGE_CONFIG` là lỗi parse một `package.json` không hợp lệ. [Node.js errors](https://nodejs.org/download/release/latest-jod/docs/api/errors.html). Một [issue trong repository Supabase CLI](https://github.com/supabase/cli/issues/4254) ghi nhận cùng thông báo trên Windows, nhưng ở **Studio và phiên bản khác**; đó là triệu chứng tương tự, không phải bằng chứng cùng root cause ở đây.

## Kiểm tra image Storage API hiện có

Đã kiểm tra image local `public.ecr.aws/supabase/storage-api:v1.82.1` mà không chạy lại Supabase CLI, sửa image, mount project/volume hoặc truyền credentials. `docker image inspect` cho thấy image ID `sha256:ec2ad41411eac8fc2b769b4bb00d1af32ae37eca3745c15bdb329db27d218934`, tạo lúc `2026-10-14T11:33:18.651639022Z`, nền tảng `linux/amd64`, kích thước khoảng 1,43 GB. Entrypoint là `docker-entrypoint.sh`, lệnh mặc định `node dist/start/server.js`; image không khai báo volume. `docker history` chỉ được đọc ở dạng layer ID, thời điểm và kích thước. Yêu cầu đọc build commands bằng `docker history --no-trunc` bị bộ duyệt tự động từ chối vì có thể lộ build args/secrets, nên không thực hiện.

Đã tạo một container **chưa khởi động** từ đúng image ID với `--network none --read-only --pull never`, không mount. `docker cp` đọc riêng `/app/package.json` từ container đó thành file tạm ngoài repository. File tồn tại nhưng có **0 byte**; SHA-256 là `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` (hash của file rỗng). Đọc lại với `docker cp -L` cũng cho 0 byte. Vì file rỗng, JSON không hợp lệ; không thấy byte lạ hoặc nội dung bị cắt giữa chừng để phân tích thêm.

Để kiểm tra bằng runtime của chính image, một container tạm khác chỉ chạy `node -e` với mạng bị tắt, filesystem chỉ đọc, không mount và không chạy entrypoint ứng dụng. Node `v24.21.0` đọc được 0 byte rồi `JSON.parse` thất bại với `SyntaxError: Unexpected end of JSON input`; container thoát mã 1, `OOMKilled=false`. Như vậy lỗi parse của file hiện có được tái hiện **độc lập với Supabase CLI và quá trình khởi động Storage API**. Bằng chứng này xác nhận trạng thái file trong image local tại thời điểm kiểm tra, chưa chứng minh vì sao nó rỗng. Hai container và hai file sao chép tạm đã được dọn đúng tên; image ID không đổi sau kiểm tra. Không tạo hoặc xóa volume.

`docker manifest inspect --verbose` của tag trên registry tại thời điểm kiểm tra trả về manifest `linux/amd64` digest `sha256:31c11d93a3c7840f97acba43f6df9894028dc85dd9c0781d23427e2009be5b76`, config digest `sha256:ed2afc0194b24a697cfa9b245c60d5fd0b41a9ba5a255083418cd643577098a3`. Tag local lúc đó trỏ tới image ID `sha256:ec2ad...`, khác manifest digest hiện trên registry. Không được so sánh trực tiếp manifest digest với config digest rồi coi chúng phải giống nhau. Sau khi pull theo manifest digest ở lượt kế tiếp, Docker Engine này báo image ID mới `sha256:31c11...`, trùng manifest digest; vì vậy nhận định trước đây rằng phải so config digest với `docker image inspect .Id` đã được rút lại. Chưa biết tag đã thay đổi khi nào hoặc nội dung file trên một host độc lập ra sao. Phép đọc metadata không chứng minh nguyên nhân file rỗng.

## Lượt recovery có kiểm soát

Trước thao tác, `git status --short` vẫn chỉ có các thay đổi Stage 2A đang giữ; không có container đang chạy. `docker system df` báo 13 images, 8,06 GB, 0 container, 0 local volume và 0 build cache. Image local ở `public.ecr.aws/supabase/storage-api:v1.82.1` có ID `sha256:ec2ad414...`, RepoDigest `public.ecr.aws/supabase/storage-api@sha256:ec2ad414...`, nền tảng `linux/amd64`. Kiểm tra registry lại xác nhận manifest `linux/amd64` `sha256:31c11d93...`, config `sha256:ed2afc01...`. Không dùng config digest để thay cho manifest digest khi pull.

Đã gắn tag backup nội bộ `ju-study-hub/storage-api-diagnostic:before-repull` cho image cũ; backup và tag gốc đều tiếp tục trỏ tới `sha256:ec2ad414...`. Chỉ pull `public.ecr.aws/supabase/storage-api@sha256:31c11d93...` với `--platform linux/amd64`, không pull qua tag gốc. Reference theo digest sau pull có image ID `sha256:31c11d93...`, RepoDigest chứa đúng manifest digest, cùng nền tảng. Docker báo `Downloaded newer image`; sau pull `docker system df` có 14 images và vẫn 8,06 GB, 0 container, 0 volume. Hai image có cùng kích thước `1.430.419.230` byte và cùng danh sách 14 RootFS layer digest. Điều này cho thấy Docker đang dùng chung các layer local; output `Downloaded newer image` **không chứng minh** từng layer đã được tải lại từ registry.

Trong container tạm không mạng, không mount, filesystem chỉ đọc và chỉ chạy Node của image mới: `/app/package.json` tồn tại nhưng vẫn **0 byte**. `JSON.parse` không thể thành công; Node `--check /app/dist/start/server.js` (không khởi động ứng dụng) thoát mã 1 với `Error: Invalid package config /app/package.json` và `ERR_INVALID_PACKAGE_CONFIG`. Container kiểm tra dùng `--rm`; tag gốc, backup, image và volume không bị xóa. Lỗi được tái hiện độc lập với Supabase CLI trên reference mới.

**Kết luận của lượt recovery:** Image pull theo digest vẫn không hợp lệ cho Storage API. Chưa thể phân biệt lỗi của bản phát hành trên registry với một layer local được dùng lại hoặc vấn đề Docker filesystem. Không thay thế tag gốc bằng image mới, không chạy `supabase start`, không reset database. Bước tiếp theo cần Ju duyệt riêng: kiểm tra cùng manifest digest trên Docker host độc lập hoặc thực hiện một phép tải lại layer có kiểm soát sau khi bảo toàn image cũ. Chỉ cân nhắc đổi tag gốc khi có một image mà `/app/package.json` không rỗng và Node `--check` đạt; khi đó dùng `docker tag <reference-đã-xác-minh> public.ecr.aws/supabase/storage-api:v1.82.1`, giữ tag backup, rồi kiểm tra lại trước khi khởi động stack. Chưa thực hiện bước này.

## Kiểm tra điều kiện xác minh độc lập

Kiểm tra lại registry và hai image ngày 22/10/2026: manifest `linux/amd64` cho tag `v1.82.1` vẫn là `sha256:31c11d93a3c7840f97acba43f6df9894028dc85dd9c0781d23427e2009be5b76` (config digest `sha256:ed2afc0194b24a697cfa9b245c60d5fd0b41a9ba5a255083418cd643577098a3`). Image backup có ID `sha256:ec2ad414...`; reference đã pull theo manifest có ID `sha256:31c11d93...`. Cả hai là `linux/amd64` và danh sách 14 RootFS layer digest bằng nhau theo đúng thứ tự:

```text
1  e63b02c2b5c761df2cb95e657d744f27d95da4e051235a13c80b88cd68eab188
2  3e3cca1d6d714685487d42af6adeaca4d2d52651fad7335853154b66755933b4
3  ef9c3bd6ce3f3a3714c643c5c9e93580ca138c14dc5333540cf5925fa505f99d
4  7c9a72471da31c8d796a6123d6453670cf9ff1ab2166fe082bd28829fb29748d
5  5d2d786ef552853540c11d9361b06db5a038bf3fe8e278d8c14194e5209e73b4
6  521d33d873dcb9bb2527b628b614072d61e7b408edc0a6e97db7d2cf0c032b1a
7  e39f507fc61e7f597849901d5132cd4bf09449c970d7d9d83f93d39ecc621b97
8  2442a6d4127596e8345c07ec7e1f4ec1824d0130214bcd18451cc55c3dfc0c48
9  e27403ea30b64439c8bddb48ab8a6930471787f0e060399b74ea6b58f1e7bb69
10 1eb329143499b309105e8a01205a76df124b014e2a63654b0ed84624d73473bb
11 bdd5eafb1ec3ac0f8cdcefcc5917ce33a345730396eb6ef683fe571a4983b08c
12 76f56f1eff7843e31ddc29f59600841ceae148adf50dd3d2f6a350db59efb2d7
13 a989103b9b876a0456fec68d950f15c03ec038d8a3a2cfaba60cd57c88ebd48e
14 857623c3e6cbe014651042e96d1b83263889314856716dbe48e536dacfb629ec
```

Đây là RootFS layer digests từ `docker image inspect`, không phải các compressed layer digests của registry manifest; không so hai loại trực tiếp. Danh sách bằng nhau **không tự chứng minh** image bị corrupt hay bản phát hành upstream sai.

`docker context ls` chỉ có `default` và `desktop-linux`. Hai endpoint khác tên nhưng `docker info` trên từng context trả cùng Engine ID `a9a6d680-5bf8-4a07-bb50-efc965281efa`, cùng tên `docker-desktop` và root `/var/lib/docker`; do đó **không phải hai image store độc lập**. WSL có Ubuntu đang dừng và `docker-desktop` đang chạy; không có `podman` hoặc `nerdctl` trong PATH, `DOCKER_HOST` không được đặt. Chưa phát hiện Docker host độc lập nào được cấu hình hoặc Ju cung cấp trong phiên này. Không khởi động WSL distro, tạo host mới, đổi Docker context, pull lại manifest hay kiểm tra trên cloud.

Kết quả `/app/package.json` bằng 0 byte và `ERR_INVALID_PACKAGE_CONFIG` chỉ được xác nhận trên **Docker Engine hiện tại** ở lượt recovery trước. Không có kết quả parse trên host độc lập. Vì vậy giả thuyết upstream và giả thuyết local image store/cache đều **chưa xác định**; không nâng giả thuyết nào lên mức confirmed. Hai bước ít rủi ro để Ju cân nhắc:

1. Nếu Ju đã có một Docker host khác với image store riêng, cung cấp cách truy cập hoặc tự chạy phép pull đúng manifest digest và Node read/parse trên host đó; ghi nhận Engine ID, platform, image digest, file size và kết quả, không mount dữ liệu.
2. Nếu chưa có host như vậy, xin xác nhận từ Supabase về nội dung `/app/package.json` của đúng manifest digest hoặc đối chiếu với một báo cáo tái hiện độc lập có digest và platform. Việc xem issue cùng thông báo nhưng khác image/version không đủ để kết luận.

Dừng tại đây theo điều kiện của task. Không thay tag gốc, xóa image/layer/cache hoặc bắt đầu Stage 2B.

## Phân loại nguyên nhân

| Mức bằng chứng | Kết luận |
| --- | --- |
| **Confirmed** | Helper Storage API thoát mã 1 với `Invalid package config /app/package.json`; PostgreSQL đã healthy trước đó. File trong image local cũ và reference mới theo registry manifest digest đều rỗng. Node `--check` trên image mới cũng trả `ERR_INVALID_PACKAGE_CONFIG`. Hai reference có cùng 14 RootFS layers; tag gốc vẫn là image cũ. |
| **Likely** | File `package.json` rỗng là nguyên nhân trực tiếp của lỗi parse khi khởi động helper. Hai reference dùng chung các layer local; lần pull không tạo được một bản filesystem độc lập để phân biệt upstream và cache local. |
| **Unverified** | Chưa xác định vì sao file rỗng: image được build với file rỗng, layer/cache local có vấn đề, hoặc lỗi filesystem. Tag trên registry hiện trỏ tới manifest khác image local cũ, nhưng chưa biết thời điểm thay đổi. Chưa kiểm tra filesystem của cùng manifest trên host độc lập. Thiếu RAM, thiếu dung lượng, OOM, mount/permission và WSL chưa được chứng minh là nguyên nhân. RAM Docker khoảng 7,55 GiB, trên mức 7 GB Supabase khuyến nghị cho local stack, nhưng số đó không loại trừ áp lực tài nguyên lúc chạy. [Supabase local workflow](https://supabase.com/docs/guides/local-development/cli-workflows). Dung lượng host và dung lượng logic trong Docker là hai phép đo khác nhau. [Docker system df](https://docs.docker.com/reference/cli/docker/system/df/), [Docker Desktop WSL 2](https://docs.docker.com/desktop/features/wsl/). |

## Hướng xử lý và ranh giới phê duyệt

1. **Read-only, không phá dữ liệu:** Nếu muốn phân biệt image local với bản hiện trên registry, kiểm tra `/app/package.json` của manifest digest hiện tại trên một Docker host độc lập hoặc bằng nguồn phát hành đáng tin cậy. Có thể xem Docker Desktop Troubleshoot/diagnostics để tìm lỗi layer/filesystem, nhưng giữ riêng logs vì chúng có thể chứa credentials. Metadata và file trong image local đã được kiểm tra; chưa có bằng chứng cần reset database.
2. **Cần Ju duyệt trước:** Kiểm tra cùng manifest digest trên một host độc lập hoặc tải lại các layer có kiểm soát để tách lỗi upstream khỏi cache local. Không xóa image backup, volume hoặc database. Chưa có image hợp lệ để đổi tag gốc hay chạy lại stack; thay CLI version đơn thuần khó xử lý được file đã rỗng khi Node đọc độc lập.
3. **Không coi `--exclude storage-api` là cách khắc phục đã kiểm chứng:** CLI có cờ `--exclude`, nhưng một [báo cáo trong repository CLI](https://github.com/supabase/cli/issues/5011) ghi nhận helper Storage API vẫn có thể chạy khi khởi tạo schema dù service bị exclude. Nếu Ju muốn thử cô lập ở task khác, cần xác minh hành vi của CLI `2.121.0` và chấp nhận stack thiếu Storage; kết quả đó không hoàn tất Stage 2A.
4. **Có thể xóa dữ liệu, không thực hiện:** `supabase stop --no-backup`, `supabase db reset`, Docker prune/rm, factory reset hoặc xóa dữ liệu WSL. Chưa có bằng chứng biện minh cho những thao tác này.

Chưa triển khai SQL draft, migration core, seed, Auth hoặc cloud. Stage 2B tiếp tục bị chặn cho đến khi stack local khởi động và các service được kiểm tra.
