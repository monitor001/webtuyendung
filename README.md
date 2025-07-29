# JobConnect Vietnam

Nền tảng tuyển dụng hàng đầu Việt Nam - Kết nối doanh nghiệp với ứng viên tài năng.

## 🌟 Tính năng chính

### Frontend (React + Vite)
- **Giao diện hiện đại**: Thiết kế responsive với Tailwind CSS
- **Trang chủ**: Hero section, giới thiệu công ty, thành tựu và cảm nhận
- **Danh sách việc làm**: Tìm kiếm, lọc và xem chi tiết công việc
- **Chi tiết công việc**: Thông tin đầy đủ về vị trí, công ty và yêu cầu
- **Chi tiết công ty**: Thông tin công ty và danh sách việc làm liên quan
- **Quản lý admin**: Đăng nhập và thêm việc làm mới

### Backend (Node.js + Express)
- **API RESTful**: Endpoints cho việc làm, công ty và thống kê
- **Xác thực**: JWT authentication cho admin
- **Database**: PostgreSQL với dữ liệu mẫu
- **Bảo mật**: Rate limiting, CORS, Helmet

## 🚀 Công nghệ sử dụng

### Frontend
- React 18.3.1
- Vite 6.3.5
- Tailwind CSS
- Framer Motion
- React Hook Form
- Date-fns

### Backend
- Node.js 18.x
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt
- express-session

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18.x
- npm 9.x
- PostgreSQL

### Cài đặt Frontend
```bash
# Clone repository
git clone https://github.com/monitor001/webtuyendung.git
cd webtuyendung

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

### Cài đặt Backend
```bash
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
# Cập nhật DATABASE_URL và các biến môi trường khác

# Chạy server
npm start
```

## 🌐 Deployment

### Heroku
- **Frontend**: https://jobconnect-vietnam-app.herokuapp.com
- **Backend**: https://jobconnect-vietnam-backend-b74d68215fab.herokuapp.com

### Docker
```bash
# Chạy với Docker Compose
docker-compose up --build -d
```

## 📊 Cấu trúc dự án

```
jobconnect-vietnam/
├── src/
│   ├── components/
│   │   ├── JobDetail.jsx
│   │   ├── CompanyDetail.jsx
│   │   ├── AddJobForm.jsx
│   │   └── ui/
│   ├── assets/
│   ├── config.js
│   └── App.jsx
├── backend/
│   ├── server.js
│   ├── package.json
│   └── healthcheck.js
├── public/
├── package.json
├── vite.config.js
├── docker-compose.yml
└── README.md
```

## 🔐 Tài khoản Admin

Tài khoản admin được cấp riêng cho quản trị viên. Vui lòng liên hệ để được cấp quyền truy cập.

## 📝 API Endpoints

### Jobs
- `GET /api/jobs` - Lấy danh sách việc làm
- `GET /api/jobs/:id` - Chi tiết việc làm
- `POST /api/jobs` - Thêm việc làm mới (Admin)

### Companies
- `GET /api/companies` - Lấy danh sách công ty
- `GET /api/companies/:id` - Chi tiết công ty

### Search
- `GET /api/search` - Tìm kiếm việc làm

### Authentication
- `POST /api/auth/login` - Đăng nhập admin
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Thông tin user hiện tại

## 🎨 Giao diện

### Trang chủ
- Header cố định với navigation
- Hero section với background đẹp
- Giới thiệu công ty với ảnh nền
- Thành tựu và cảm nhận
- Footer với thông tin liên hệ

### Trang việc làm
- Danh sách việc làm với filter
- Chi tiết việc làm
- Liên kết đến trang công ty

## 🔧 Cấu hình

### Environment Variables
```env
# Backend
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
NODE_ENV=production

# Frontend
VITE_API_URL=https://jobconnect-vietnam-backend-b74d68215fab.herokuapp.com
```

## 📈 Tính năng nổi bật

1. **Responsive Design**: Tương thích mọi thiết bị
2. **Real-time Search**: Tìm kiếm việc làm theo thời gian thực
3. **Admin Panel**: Quản lý việc làm và người dùng
4. **Modern UI/UX**: Giao diện hiện đại với animations
5. **Security**: Bảo mật với JWT và rate limiting
6. **Scalable**: Kiến trúc có thể mở rộng

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License.

## 📞 Liên hệ

- **Email**: hoanguyen25@gmail.com
- **Website**: https://jobconnect-vietnam-app.herokuapp.com
- **Repository**: https://github.com/monitor001/webtuyendung.git

---

© 2025 JobConnect Vietnam. All rights reserved. 