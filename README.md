# HHR Việt Nam - Nền tảng Tuyển dụng Hàng đầu

## 🚀 Giới thiệu

**HHR Việt Nam** là nền tảng tuyển dụng hàng đầu Việt Nam, chuyên kết nối các ứng viên tài năng với những cơ hội nghề nghiệp phù hợp nhất. Dự án được xây dựng với công nghệ hiện đại, giao diện thân thiện và trải nghiệm người dùng tối ưu.

## ✨ Tính năng chính

### 🔍 Tìm kiếm & Lọc thông minh
- **Tìm kiếm đa tiêu chí:** Title, công ty, mô tả
- **Lọc theo địa điểm:** Hà Nội, TP.HCM, Đà Nẵng và nhiều thành phố khác
- **Lọc theo kinh nghiệm:** Intern, Fresher, Junior, Middle, Senior, Manager, Director
- **Dữ liệu động:** Lấy từ cơ sở dữ liệu thực tế

### 💼 Quản lý việc làm
- **Xem chi tiết công việc:** Thông tin đầy đủ, mô tả chi tiết
- **Thông tin công ty:** Mô tả, ngành nghề, quy mô, năm thành lập
- **CRUD operations:** Tạo, đọc, cập nhật, xóa việc làm (Admin)
- **Xóa nhiều việc làm:** Chọn và xóa hàng loạt

### 👨‍💼 Quản trị hệ thống
- **Đăng nhập Admin:** Quản lý việc làm và công ty
- **Chỉnh sửa thông tin:** Cập nhật việc làm và thông tin công ty
- **Quản lý session:** Đăng nhập/đăng xuất an toàn

### 📱 Giao diện hiện đại
- **Responsive design:** Tương thích mọi thiết bị
- **Animations:** Hiệu ứng mượt mà với Framer Motion
- **UI/UX tối ưu:** Giao diện đẹp, dễ sử dụng
- **Pagination:** Phân trang 3 việc làm/trang

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18.3.1** - Framework chính
- **Vite 6.3.5** - Build tool nhanh
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Date-fns** - Date utilities

### Backend
- **Node.js 18.x** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database chính
- **express-session** - Session management
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

### Deployment
- **Heroku** - Cloud platform
- **Docker** - Containerization
- **Git** - Version control

## 📊 Cấu trúc Database

### Bảng Jobs
```sql
- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- company_name (VARCHAR)
- location (VARCHAR)
- salary_min/max (INTEGER)
- job_type (VARCHAR)
- experience_level (VARCHAR)
- description (TEXT)
- requirements/benefits (TEXT)
- posted_date (TIMESTAMP)
- deadline_date (DATE)
- views_count (INTEGER)
```

### Bảng Companies
```sql
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- description (TEXT)
- industry (VARCHAR)
- size (VARCHAR)
- founded_year (INTEGER)
- website (VARCHAR)
- location (VARCHAR)
- contact_email/phone (VARCHAR)
```

## 🚀 Cài đặt & Chạy

### Yêu cầu hệ thống
- Node.js 18.x
- PostgreSQL 12+
- Git

### Cài đặt Frontend
```bash
# Clone repository
git clone <repository-url>
cd hhr-vietnam

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

### Cài đặt Backend
```bash
cd backend

# Cài đặt dependencies
npm install

# Cấu hình database
# Tạo file .env với DATABASE_URL

# Chạy development server
npm run dev

# Chạy production
npm start
```

### Cấu hình Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=https://hhr-backend.herokuapp.com
```

#### Backend (.env)
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
CORS_ORIGIN=https://hhr-app.herokuapp.com
```

## 📱 API Endpoints

### Jobs
- `GET /api/jobs` - Lấy danh sách việc làm
- `POST /api/jobs` - Tạo việc làm mới
- `PUT /api/jobs/:id` - Cập nhật việc làm
- `DELETE /api/jobs/:id` - Xóa việc làm
- `DELETE /api/jobs` - Xóa nhiều việc làm

### Companies
- `GET /api/companies` - Lấy danh sách công ty
- `GET /api/companies/:name` - Lấy thông tin công ty
- `PUT /api/companies/:name` - Cập nhật thông tin công ty

### Filters
- `GET /api/filters` - Lấy tùy chọn bộ lọc

### Authentication
- `POST /api/auth/login` - Đăng nhập admin
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Kiểm tra trạng thái đăng nhập

## 🌐 Deployment

### Frontend (Heroku)
```bash
git push heroku main
```

### Backend (Heroku)
```bash
cd backend
git push heroku master
```

## 📈 Tính năng nổi bật

### 🔍 Bộ lọc thông minh
- Lọc theo địa điểm từ database
- Lọc theo kinh nghiệm từ database
- Tìm kiếm trong title, company, description
- Reset bộ lọc nhanh chóng

### 💼 Quản lý việc làm
- Xem chi tiết công việc đầy đủ
- Chỉnh sửa thông tin việc làm (Admin)
- Xóa việc làm (Admin)
- Xóa nhiều việc làm cùng lúc

### 🏢 Thông tin công ty
- Hiển thị thông tin chi tiết công ty
- Chỉnh sửa thông tin công ty (Admin)
- Liên kết với việc làm

### 📱 Giao diện responsive
- Tương thích mobile/desktop
- Animations mượt mà
- Loading states
- Error handling

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.

## 📞 Liên hệ

**HHR Việt Nam**
- Website: https://hhr-vietnam.herokuapp.com
- Email: contact@hhr-vietnam.com
- Phone: +84 28 1234 5678

---

© 2025 HHR Việt Nam. Tất cả quyền được bảo lưu. 