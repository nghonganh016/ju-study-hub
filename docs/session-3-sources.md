# Nguồn giải thích Session 3

Đối chiếu ngày 06/10/2026. Mỗi câu trong `data/blockchain/session-3.ts` có giải thích tiếng Việt tự viết và một URL nguồn tham khảo. Không thay câu hỏi, lựa chọn hoặc đáp án Ju đã cung cấp. Phiên bản nội dung tăng từ 1 lên 2.

## Nhóm nguồn

| Câu | Tài liệu chính và phạm vi |
| --- | --- |
| 1–15 | [NIST FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf), [NIST Hash Functions](https://csrc.nist.gov/projects/hash-functions), [SP 800-107r1](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-107r1.pdf): thuật toán SHA-256, tính chất và mức an toàn. Các phép tính xác suất được diễn giải theo mô hình lý tưởng. |
| 16–27 | [Bitcoin Developer Reference](https://developer.bitcoin.org/reference/block_chain.html), [Bitcoin Developer Guide](https://developer.bitcoin.org/devguide/block_chain.html), [whitepaper Bitcoin](https://bitcoin.org/bitcoin.pdf), [Solidity](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions), [Keccak Team](https://keccak.team/keccak_specs_summary.html): băm, liên kết block và PoW. |
| 28–43, 140–143 | Bitcoin Reference, whitepaper, [SPV](https://developer.bitcoin.org/devguide/operating_modes.html#simplified-payment-verification-spv) và [OpenZeppelin MerkleProof](https://docs.openzeppelin.com/contracts/5.x/api/utils/cryptography#MerkleProof): cấu trúc cây và xác minh thành viên. Các kết quả 3/10/20 hash và 320/640 byte là phép tính từ dữ kiện câu hỏi. |
| 44–47 | [Ethereum EVM](https://ethereum.org/en/developers/docs/evm/), [optimistic rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/), OpenZeppelin và [mô tả Proof of Reserves của Kraken](https://blog.kraken.com/news/proof-of-reserves-june-30-2025). Kraken là nguồn sơ cấp về cách chính Kraken thực hiện, không phải xác nhận độc lập về khả năng thanh toán của sàn. |
| 48–70 | [SEC 1](https://www.secg.org/sec1-v2.pdf), [SEC 2](https://www.secg.org/sec2-v2.pdf), [NIST FIPS 186-5](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf): đường cong, cặp khóa, thuật toán ký/xác minh. SEC 2 định nghĩa secp256k1; không suy ra rằng NIST phê duyệt đường cong này. |
| 57 | Đối chiếu cả ba hệ thống: [Solana transactions](https://solana.com/docs/core/transactions), [TON wallets](https://docs.ton.org/standard/wallets/how-it-works), [Cardano key pairs](https://developers.cardano.org/docs/operate-a-stake-pool/basics/cardano-key-pairs/). Liên kết trực tiếp trong câu dẫn tới Cardano. |
| 58, 86 | [Đặc tả đồng thuận Ethereum](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#bls-signatures) và [khóa PoS](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/keys/): BLS12-381 và gộp chữ ký. |
| 71–85 | [RFC 6979](https://www.rfc-editor.org/rfc/rfc6979), [EIP-2](https://eips.ethereum.org/EIPS/eip-2), [EIP-155](https://eips.ethereum.org/EIPS/eip-155), [EIP-712](https://eips.ethereum.org/EIPS/eip-712), [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612), [ERC-4361](https://eips.ethereum.org/EIPS/eip-4361), Solidity và [BIP340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki). |
| 87–114 | [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki), [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki), [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki), [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md), [Bitcoin wallets](https://developer.bitcoin.org/devguide/wallets.html), [Trezor passphrase](https://trezor.io/guides/backups-recovery/advanced-wallets/what-is-a-passphrase), [Python secrets](https://docs.python.org/3/library/secrets.html). |
| 115–124 | [Ethereum accounts](https://ethereum.org/en/developers/docs/accounts/), [EIP-55](https://eips.ethereum.org/EIPS/eip-55), Bitcoin Developer Guide, [BIP13](https://github.com/bitcoin/bips/blob/master/bip-0013.mediawiki), [BIP173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki), [BIP350](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki). |
| 125–130 | Tài liệu MetaMask về [address poisoning](https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/address-poisoning-scams/), [clipboard hacking](https://support.metamask.io/stay-safe/protect-yourself/wallet-and-hardware/clipboard-hacking/), [cụm từ khôi phục và khóa](https://support.metamask.io/start/user-guide-secret-recovery-phrase-password-and-private-keys), cùng Ethereum accounts. |
| 131–139 | Whitepaper Bitcoin và Bitcoin Reference cung cấp nền tảng PoW. Các xác suất 1/16^k, kỳ vọng 16^k và phép đếm 0…61 là suy luận toán học từ giả thiết bài. Không phải kết quả đo lại lab. |
| 144–151 | RFC 6979, NIST FIPS 186-5, [MetaMask personal_sign](https://docs.metamask.io/metamask-connect/evm/guides/sign-data/), [eth-account recover_message](https://eth-account.readthedocs.io/en/stable/eth_account.html#eth_account.account.Account.recover_message). |

## Những điểm cần đọc đúng

- Câu 1: “Độ dài bất kỳ” là cách nói về đầu vào có độ dài thay đổi; SHA-256 có giới hạn dưới 2^64 bit theo chuẩn.
- Câu 5–6: Con số 128 bit thay đổi là kỳ vọng theo mô hình đầu ra lý tưởng, không phải cam kết mọi cặp thông điệp khác một bit đều cho đúng 128 bit khác nhau.
- Câu 14: So sánh mức an toàn lý tưởng không phải kết luận về mọi kiểu tấn công hoặc mọi độ dài thông điệp.
- Câu 24: Giữ đáp án B theo mô hình giản lược của đề; phần giải thích nêu Bitcoin thực tế chấp nhận hash ≤ target. Không âm thầm đổi đáp án.
- Câu 32: Nhận định root thay đổi có giả định không xảy ra va chạm; không phải mệnh đề tuyệt đối toán học.
- Câu 34–40 và 140–141: Dùng cây nhị phân cân bằng; số byte chỉ đếm hash, chưa tính dữ liệu đóng gói.
- Câu 41–47: Kiểm tra thành viên của cây không tự chứng minh tính hợp lệ của mọi giao dịch, tính chung cuộc hay khả năng thanh toán của sàn. Root phải có nguồn tin cậy.
- Câu 54: Đối chiếu Ethereum accounts và phần secp256k1 trong [Bitcoin transactions](https://developer.bitcoin.org/devguide/transactions.html). Chung đường cong không có nghĩa chung cách tạo địa chỉ.
- Câu 74: Quy tắc low-s của EIP-2 áp dụng cho chữ ký giao dịch; không được suy ra ecrecover tự từ chối high-s.
- Câu 80–82: Nonce cần được kiểm tra và tiêu thụ; ký dữ liệu có kiểu không tự ngăn mọi cách phát lại. permit vẫn cần giao dịch để thay đổi trạng thái trên chuỗi.
- Câu 97: “Từ thứ 25” là tên gọi trong câu hỏi, không phải yêu cầu số từ của BIP39. Nguồn Trezor xác nhận ý nghĩa chuỗi bổ sung, không định nghĩa tên gọi này như một chuẩn.
- Câu 115: Cách lấy 20 byte cuối ở đây dành cho EOA, không phải công thức tạo địa chỉ hợp đồng.
- Câu 121–124: Tiền tố được giải thích trong phạm vi mạng chính Bitcoin.
- Câu 139: “Một lần băm” là một lần đánh giá hàm của bài PoW đơn giản; Bitcoin dùng SHA-256 hai lần và xác minh block còn nhiều bước khác.
- Câu 144–151: Chưa có slide gốc hoặc mã/kết quả `answers.md` để tái lập lab. Chỉ kiểm chứng cơ chế kỹ thuật tương ứng; quan sát cụ thể vẫn xuất phát từ đề Ju cung cấp. Đổi thông điệp không đảm bảo mọi thư viện luôn trả về một địa chỉ khác, có trường hợp báo lỗi.

## Cách giữ nguồn khi cập nhật

- Giữ URL đi cùng giải thích từng câu; không dùng nguồn về chủ đề gần giống để chứng minh một quan sát lab cụ thể.
- Khi sửa dữ kiện hay đáp án, đối chiếu lại câu và tăng revision. Lần này chỉ thêm giải thích/nguồn, giữ nguyên bộ câu và đáp án.
- Không chép nguyên văn các đoạn tài liệu dài. Giải thích tập trung vào lý do đáp án đúng và giới hạn của mô hình.
