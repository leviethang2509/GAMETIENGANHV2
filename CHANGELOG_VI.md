# 📜 LỊCH SỬ CẢI TIẾN - WordFarm

Tài liệu này ghi lại toàn bộ quá trình phát triển và nâng cấp game **WordFarm** qua từng phiên bản, viết bằng tiếng Việt để dễ theo dõi.

---

## 🌟 Phiên bản V5 (Hiện tại) - "Đồ họa 3D thật & Nông trại chuyên sâu"

> Bản nâng cấp lớn nhất từ trước đến nay: thay thế toàn bộ khối hình học cơ bản bằng mô hình 3D `.glb` thật và bổ sung các cơ chế nông trại chuyên sâu.

### ✨ Tính năng mới
- **Mô hình 3D thật (GLTFLoader):**
  - Loại bỏ hoàn toàn `BoxGeometry`, `ConeGeometry`... (khối hình học cơ bản của V4).
  - Nạp mô hình `.glb` bất đồng bộ qua `GLTFLoader` (CDN) trước khi vào game.
  - Có **màn hình loading** hiển thị tiến trình tải tài nguyên.
  - Cây trồng: `Carrot.glb`, `Corn.glb`, `Tomato.glb`, `AppleTree.glb`.
  - Động vật: `Chicken.glb`, `Cow.glb`.
  - Công trình: `Windmill.glb`.
  - Môi trường: `DirtPlot.glb` (thay cho ô đất màu nâu).
  - Tự động căn tỷ lệ (scale) và bật đổ bóng (`castShadow`/`receiveShadow`) bằng `.traverse()`.

- **Cơ chế Chăn nuôi (Livestock):**
  - Thêm 2 ô chuyên dụng: 1 chuồng Gà và 1 bãi chăn Bò.
  - Bấm vào con vật đang đói → mở **Quiz Ngữ pháp (điền vào chỗ trống)**.
  - Trả lời đúng → con vật chuyển sang trạng thái "Đang ăn/Xử lý" (30 giây).
  - Hoàn tất → bấm để thu hoạch **Sữa** hoặc **Trứng** (thưởng nhiều XP và Xu).

- **Cơ chế Nhà máy chế biến (Windmill):**
  - Đặt mô hình cối xay gió bên ngoài lưới trồng trọt.
  - Bấm vào cối xay → mở **Quiz Sắp xếp câu (Scramble)**.
  - Trả lời đúng + cần có 2 Ngô trong kho → cối xay bắt đầu quay (45 giây).
  - Hoàn tất → thu **Bột mì** (+50 Xu).

### 🎨 Cải tiến UI/UX
- HUD hiển thị thêm **kho đồ** (số lượng Ngô, Trứng, Sữa).
- 3 modal quiz riêng biệt:
  1. **Vocabulary Quiz** (trồng cây - trắc nghiệm).
  2. **Grammar Quiz** (cho động vật ăn - điền vào chỗ trống).
  3. **Scramble Quiz** (cối xay - sắp xếp/kéo thả từ theo thứ tự).
- **Hiệu ứng chữ bay** (`+15 XP`) nổi lên từ mô hình 3D khi thu hoạch, đồng bộ tọa độ HTML với tọa độ 3D.

### 🔧 Kỹ thuật
- Giữ nguyên kiến trúc **một file/tĩnh**, chạy hoàn toàn phía client, không cần backend Node.js.
- Nạp `GLTFLoader` qua CDN song song với Three.js.
- Dùng đường dẫn tương đối `./assets/models/` cho tất cả mô hình.
- Bổ sung thư mục `libs/` cho phương án dùng thư viện cục bộ (offline).

### 📂 Tài liệu mới
- `README_V5.md` - Giới thiệu tổng quan V5.
- `QUICK_START_V5.md` - Hướng dẫn chạy nhanh.
- `SETUP_V5_COMPLETE.md` - Checklist hoàn tất cài đặt.
- `DEVELOPER_GUIDE_V5.md` - Hướng dẫn cho lập trình viên.
- `GITHUB_DOWNLOAD_GUIDE.md` - Hướng dẫn tải tài nguyên.
- `SETUP_V5_LOCAL_LIBS.md` - Cài đặt thư viện cục bộ.

---

## 🚜 Phiên bản V4 - "3D Isometric một file HTML"

> Nền tảng vững chắc cho V5: game nông trại 3D góc nhìn isometric gói gọn trong một file HTML duy nhất.

- Dựng game 3D bằng **Three.js** với các khối hình học cơ bản (box, cone).
- Cơ chế trồng trọt kết hợp **quiz từ vựng tiếng Anh**.
- Chạy mượt mà chỉ với một file `game.html`.
- Hệ thống lưới trồng trọt 8 ô.
- HUD hiển thị Xu và XP.

---

## 🌱 Các phiên bản trước (V1 - V3)

- **V3:** Mở rộng danh sách cây trồng, cải thiện hướng dẫn và triển khai.
- **V2:** Tích hợp Phaser, cấu trúc dự án theo module, hỗ trợ triển khai GitHub Pages.
- **V1:** Phiên bản đầu tiên - học từ vựng tiếng Anh qua mô hình nông trại đơn giản.

---

## 📝 Ghi chú

- Tất cả tài nguyên 3D dùng giấy phép **CC0** (Quaternius - Ultimate Farm Pack), âm thanh từ **Kenney** (RPG Audio / UI Audio).
- Đặt mô hình vào `assets/models/`, âm thanh vào `assets/audio/`.
- Game hoàn toàn miễn phí và chạy offline sau khi tải đủ tài nguyên.

---

*Cập nhật lần cuối: Phiên bản V5*
