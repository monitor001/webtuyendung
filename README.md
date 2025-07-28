# JobConnect Vietnam - Nền tảng tuyển dụng hàng đầu Việt Nam

## 🚀 Tính năng chính

- **Frontend hiện đại**: React + Vite + Tailwind CSS
- **Backend API**: Node.js + Express + PostgreSQL
- **Database**: PostgreSQL với 5 dữ liệu việc làm mẫu
- **Responsive Design**: Tương thích mọi thiết bị
- **Pagination**: Phân trang cho danh sách việc làm
- **Search & Filter**: Tìm kiếm và lọc việc làm
- **Admin Panel**: Quản lý việc làm (thêm/xóa)

## 📋 Yêu cầu hệ thống

- Node.js 16+ 
- PostgreSQL 12+
- npm hoặc pnpm

## 🛠️ Cài đặt và chạy

### 🐳 Cách 1: Sử dụng Docker (Khuyến nghị)

```bash
# Đảm bảo Docker và Docker Compose đã được cài đặt
# Windows: https://docs.docker.com/desktop/install/windows/
# macOS: https://docs.docker.com/desktop/install/mac/
# Ubuntu: https://docs.docker.com/engine/install/ubuntu/

# Clone repository
git clone https://github.com/your-username/jobconnect-vietnam.git
cd jobconnect-vietnam

# Chạy ứng dụng với Docker
chmod +x docker-start.sh
./docker-start.sh

# Hoặc chạy thủ công
docker-compose up --build -d
```

### 🔧 Cách 2: Cài đặt thủ công

#### 1. Setup Database

```bash
# Cài đặt PostgreSQL (nếu chưa có)
# Windows: https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql postgresql-contrib

# Tạo database và bảng
psql -U postgres
# Nhập password của PostgreSQL

# Chạy file SQL để tạo database
\i database.sql
```

#### 2. Setup Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env (copy từ .env.example)
cp .env.example .env

# Chỉnh sửa file .env với thông tin database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jobconnect_vietnam
DB_USER=postgres
DB_PASSWORD=your_password

# Chạy backend
npm run dev
```

#### 3. Setup Frontend

```bash
# Di chuyển về thư mục gốc
cd ..

# Cài đặt dependencies
npm install

# Chạy frontend
npm run dev
```

## 🌐 Truy cập ứng dụng

### Docker:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health
- **Database**: localhost:5432

### Development:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

## 📊 Dữ liệu mẫu

Database đã được tạo với 5 việc làm mẫu:

1. **Frontend Developer (React/Vue.js)** - TechViet Solutions
2. **Backend Developer (Node.js/Python)** - Digital Innovation Lab  
3. **UI/UX Designer** - Creative Studio Vietnam
4. **Data Scientist** - AI Research Center
5. **DevOps Engineer** - Cloud Solutions Vietnam

## 🔧 API Endpoints

### Jobs
- `GET /api/jobs` - Lấy danh sách việc làm (có pagination)
- `GET /api/jobs/:id` - Lấy chi tiết việc làm
- `GET /api/search` - Tìm kiếm việc làm

### Companies  
- `GET /api/companies` - Lấy danh sách công ty

### Statistics
- `GET /api/stats` - Thống kê tổng quan

### Health Check
- `GET /api/health` - Kiểm tra trạng thái API

## 🎨 Tính năng UI/UX

### Sections chính:
1. **Header** - Navigation cố định
2. **Hero** - Trang chủ với CTA
3. **About Us** - Giới thiệu công ty
4. **Achievements** - Thành tựu và cảm nhận
5. **Contact** - Liên hệ với QR code
6. **Footer** - Thông tin và links

### Animations:
- Typing animation cho tiêu đề
- Scroll-triggered animations
- Hover effects
- Loading spinners
- Smooth transitions

## 🔍 Tìm kiếm và lọc

- **Tìm kiếm theo từ khóa**: title, company, description
- **Lọc theo địa điểm**: Hà Nội, TP.HCM, Đà Nẵng
- **Lọc theo loại việc làm**: full-time, part-time, contract
- **Lọc theo kinh nghiệm**: entry, mid, senior, lead
- **Lọc theo mức lương**: min/max salary range

## 📱 Responsive Design

- **Desktop**: Layout đầy đủ với sidebar
- **Tablet**: Grid layout tối ưu
- **Mobile**: Single column layout

## 🚀 Deployment

### 🐳 Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build -d

# Scale services
docker-compose up -d --scale backend=3
```

### ☁️ Heroku Deployment

```bash
# Cài đặt Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Deploy tự động
chmod +x deploy-heroku.sh
./deploy-heroku.sh

# Hoặc deploy thủ công
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
heroku config:set NODE_ENV=production
git push heroku main
```

### 📦 Manual Deployment

#### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload dist/ folder
```

#### Backend (Railway/Render)
```bash
# Set environment variables
# Deploy to platform
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 📞 Liên hệ

- **Email**: info@jobconnect.vn
- **Website**: https://jobconnect.vn
- **GitHub**: https://github.com/jobconnect-vietnam 