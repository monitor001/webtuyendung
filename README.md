# 🚀 JobConnect Vietnam - Nền tảng tuyển dụng hàng đầu Việt Nam

## 📋 Tổng quan

JobConnect Vietnam là một nền tảng tuyển dụng hiện đại, được xây dựng với công nghệ full-stack để kết nối nhà tuyển dụng và ứng viên tài năng. Dự án được phát triển với React, Node.js, PostgreSQL và được deploy trên Heroku.

## ✨ Tính năng chính

### 🎯 Cho ứng viên
- **Tìm kiếm việc làm thông minh** với bộ lọc đa tiêu chí
- **Xem chi tiết công việc** với thông tin đầy đủ
- **Thông tin công ty chi tiết** với đánh giá và liên hệ
- **Phân trang tối ưu** - 3 việc làm cho mỗi trang
- **Giao diện responsive** hoạt động trên mọi thiết bị

### 🔧 Cho admin
- **Quản lý việc làm** - Thêm, sửa, xóa công việc
- **Quản lý thông tin công ty** - Cập nhật thông tin chi tiết
- **Đăng nhập admin** với xác thực đơn giản
- **CRUD đầy đủ** cho cả việc làm và công ty

### 🏢 Cho doanh nghiệp
- **Đăng tin tuyển dụng** dễ dàng
- **Quản lý hồ sơ ứng viên**
- **Thống kê chi tiết** về lượt xem và ứng tuyển

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18.3.1** - UI framework hiện đại
- **Vite 6.3.5** - Build tool nhanh
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Date-fns** - Date manipulation

### Backend
- **Node.js 18.x** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **express-session** - Session management
- **express-rate-limit** - Rate limiting
- **CORS** - Cross-origin resource sharing

### Deployment
- **Heroku** - Cloud platform
- **Git** - Version control
- **Docker** - Containerization (optional)

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18.x trở lên
- PostgreSQL 12.x trở lên
- Git

### Cài đặt

1. **Clone repository**
```bash
git clone https://github.com/monitor001/webtuyendung.git
cd webtuyendung
```

2. **Cài đặt dependencies**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

3. **Cấu hình database**
```bash
# Tạo database PostgreSQL
createdb jobconnect_vietnam

# Import schema
psql jobconnect_vietnam < database.sql
```

4. **Cấu hình environment variables**
```bash
# Backend (.env)
DATABASE_URL=postgresql://username:password@localhost:5432/jobconnect_vietnam
SESSION_SECRET=your-session-secret
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Frontend (.env)
VITE_API_URL=http://localhost:3001
```

5. **Chạy ứng dụng**
```bash
# Backend (port 3001)
cd backend
npm start

# Frontend (port 5173)
npm run dev
```

## 📊 Cấu trúc dự án

```
webtuyendung/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── assets/            # Static assets
│   ├── App.jsx           # Main component
│   └── config.js         # API configuration
├── backend/               # Backend source
│   ├── server.js         # Express server
│   ├── package.json      # Dependencies
│   └── database.sql      # Database schema
├── database.sql          # Main database schema
├── package.json          # Frontend dependencies
└── README.md            # Documentation
```

## 🔐 Tài khoản Admin

Tài khoản admin được cấp riêng cho quản trị viên. Vui lòng liên hệ để được cấp quyền truy cập.

## 📝 API Endpoints

### Jobs
- `GET /api/jobs` - Lấy danh sách việc làm (phân trang)
- `POST /api/jobs` - Thêm việc làm mới
- `PUT /api/jobs/:id` - Cập nhật việc làm
- `DELETE /api/jobs/:id` - Xóa việc làm

### Companies
- `GET /api/companies` - Lấy danh sách công ty
- `GET /api/companies/:name` - Lấy thông tin công ty
- `PUT /api/companies/:name` - Cập nhật thông tin công ty

### Authentication
- `POST /api/auth/login` - Đăng nhập admin
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Kiểm tra trạng thái đăng nhập

### Search & Stats
- `GET /api/search` - Tìm kiếm việc làm
- `GET /api/stats` - Thống kê tổng quan

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

### URLs
- **Frontend:** https://jobconnect-vietnam-app-588c0b4ff56c.herokuapp.com
- **Backend:** https://jobconnect-vietnam-backend-b74d68215fab.herokuapp.com

## 🔧 Tính năng kỹ thuật

### Bảo mật
- **Rate limiting** - 1000 requests/15 phút
- **CORS configuration** - Cross-origin requests
- **Session management** - Secure cookies
- **Input validation** - Sanitize user input

### Performance
- **Lazy loading** - Tải component theo nhu cầu
- **Image optimization** - Compressed assets
- **Database indexing** - Optimized queries
- **Caching** - Static asset caching

### UX/UI
- **Responsive design** - Mobile-first approach
- **Smooth animations** - Framer Motion
- **Loading states** - User feedback
- **Error handling** - Graceful error messages

## 📈 Thống kê

- **5 công việc mẫu** gốc
- **3 việc làm/trang** hiển thị
- **Phân trang** hoàn chỉnh
- **CRUD đầy đủ** cho admin
- **Rate limiting** bảo vệ server

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát triển bởi JobConnect Vietnam Team.

## 📞 Liên hệ

- **Website:** https://jobconnect-vietnam-app-588c0b4ff56c.herokuapp.com
- **Email:** contact@jobconnect.vn
- **Phone:** +84 24 1234 5678

---

**JobConnect Vietnam** - Kết nối tài năng với cơ hội 🚀 