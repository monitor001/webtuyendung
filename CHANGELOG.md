# Changelog

Tất cả các thay đổi quan trọng trong dự án HHR Việt Nam sẽ được ghi lại trong file này.

## [1.0.0] - 2025-01-XX

### 🎉 Phát hành chính thức

#### ✨ Tính năng mới
- **Đổi tên thương hiệu:** JobConnect → HHR Việt Nam
- **Bộ lọc thông minh:** Lọc theo địa điểm và kinh nghiệm từ database
- **Xóa nhiều việc làm:** Chọn và xóa hàng loạt
- **Layout tối ưu:** Các sự kiện cùng hàng trong chi tiết công việc
- **API Filters:** Endpoint `/api/filters` để lấy dữ liệu bộ lọc động

#### 🔧 Cải tiến
- **Giao diện responsive:** Tối ưu cho mobile/desktop
- **Performance:** Giảm số lượng API calls
- **UX/UI:** Cải thiện trải nghiệm người dùng
- **Security:** Rate limiting và session management

#### 🐛 Sửa lỗi
- **Build errors:** Sửa lỗi import assets
- **API errors:** Sửa lỗi database queries
- **UI bugs:** Sửa lỗi hiển thị trên mobile

#### 📚 Documentation
- **README.md:** Cập nhật thông tin dự án
- **API docs:** Thêm endpoint documentation
- **Deployment guide:** Hướng dẫn deploy

## [0.9.0] - 2024-12-XX

### 🚀 Phiên bản Beta

#### ✨ Tính năng cơ bản
- **CRUD việc làm:** Tạo, đọc, cập nhật, xóa
- **Quản lý công ty:** Thông tin chi tiết công ty
- **Admin panel:** Đăng nhập và quản trị
- **Tìm kiếm:** Tìm kiếm việc làm cơ bản
- **Pagination:** Phân trang 3 việc làm/trang

#### 🛠️ Công nghệ
- **Frontend:** React 18.3.1, Vite 6.3.5, Tailwind CSS
- **Backend:** Node.js 18.x, Express.js, PostgreSQL
- **Deployment:** Heroku, Docker

#### 📊 Database
- **Bảng Jobs:** 5 dữ liệu mẫu
- **Bảng Companies:** Thông tin công ty
- **Bảng Users:** Quản lý admin

## [0.8.0] - 2024-11-XX

### 🔧 Phiên bản Development

#### ✨ Tính năng ban đầu
- **Setup project:** Cấu trúc dự án cơ bản
- **Database schema:** Thiết kế database
- **Basic UI:** Giao diện đơn giản
- **API endpoints:** Backend cơ bản

---

## 📝 Ghi chú

### Quy ước đặt tên
- **FEAT:** Tính năng mới
- **FIX:** Sửa lỗi
- **IMPROVE:** Cải tiến
- **DOCS:** Cập nhật tài liệu
- **REFACTOR:** Tái cấu trúc code

### Versioning
- **MAJOR.MINOR.PATCH**
- **MAJOR:** Thay đổi lớn, không tương thích ngược
- **MINOR:** Tính năng mới, tương thích ngược
- **PATCH:** Sửa lỗi, tương thích ngược

---

© 2025 HHR Việt Nam. Tất cả quyền được bảo lưu. 