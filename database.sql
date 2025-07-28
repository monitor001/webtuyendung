-- Tạo database
CREATE DATABASE jobconnect_vietnam;

-- Kết nối vào database
\c jobconnect_vietnam;

-- Tạo bảng jobs
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency VARCHAR(10) DEFAULT 'VND',
    job_type VARCHAR(50) NOT NULL, -- 'full-time', 'part-time', 'contract', 'internship'
    experience_level VARCHAR(50) NOT NULL, -- 'entry', 'mid', 'senior', 'lead'
    description TEXT NOT NULL,
    requirements TEXT,
    benefits TEXT,
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline_date DATE,
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0
);

-- Tạo index cho tìm kiếm
CREATE INDEX idx_jobs_title ON jobs(title);
CREATE INDEX idx_jobs_company ON jobs(company_name);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_experience_level ON jobs(experience_level);
CREATE INDEX idx_jobs_posted_date ON jobs(posted_date);

-- Thêm 5 dữ liệu việc làm
INSERT INTO jobs (
    title, 
    company_name, 
    location, 
    salary_min, 
    salary_max, 
    job_type, 
    experience_level, 
    description, 
    requirements, 
    benefits,
    deadline_date
) VALUES 
(
    'Frontend Developer (React/Vue.js)',
    'TechViet Solutions',
    'TP. Hồ Chí Minh',
    25000000,
    40000000,
    'full-time',
    'mid',
    'Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm để tham gia phát triển các ứng dụng web hiện đại. Bạn sẽ làm việc trong môi trường năng động, sử dụng các công nghệ mới nhất như React, Vue.js, TypeScript.',
    '- Có ít nhất 2 năm kinh nghiệm phát triển Frontend
- Thành thạo HTML, CSS, JavaScript/TypeScript
- Có kinh nghiệm với React hoặc Vue.js
- Hiểu biết về responsive design và cross-browser compatibility
- Có kinh nghiệm với Git và các workflow phát triển
- Khả năng làm việc nhóm tốt',
    '- Môi trường làm việc trẻ trung, năng động
- Lương thưởng cạnh tranh
- Bảo hiểm sức khỏe, bảo hiểm xã hội đầy đủ
- Được đào tạo và phát triển kỹ năng liên tục
- Cơ hội thăng tiến rõ ràng',
    '2024-12-31'
),
(
    'Backend Developer (Node.js/Python)',
    'Digital Innovation Lab',
    'Hà Nội',
    30000000,
    50000000,
    'full-time',
    'senior',
    'Chúng tôi cần một Backend Developer có kinh nghiệm để xây dựng và phát triển các hệ thống backend hiệu suất cao. Bạn sẽ tham gia thiết kế kiến trúc, phát triển API và tối ưu hóa hiệu suất hệ thống.',
    '- Có ít nhất 4 năm kinh nghiệm phát triển Backend
- Thành thạo Node.js hoặc Python
- Có kinh nghiệm với các database: PostgreSQL, MongoDB, Redis
- Hiểu biết về microservices architecture
- Có kinh nghiệm với Docker, Kubernetes
- Khả năng thiết kế và tối ưu hóa database',
    '- Lương thưởng cao, cạnh tranh thị trường
- Làm việc từ xa linh hoạt
- Được tham gia các dự án lớn, đa dạng
- Môi trường học hỏi và phát triển chuyên môn
- Cơ hội tham gia các hội thảo, conference',
    '2024-11-30'
),
(
    'UI/UX Designer',
    'Creative Studio Vietnam',
    'TP. Hồ Chí Minh',
    20000000,
    35000000,
    'full-time',
    'mid',
    'Chúng tôi đang tìm kiếm một UI/UX Designer tài năng để tạo ra những trải nghiệm người dùng tuyệt vời. Bạn sẽ tham gia thiết kế giao diện cho web, mobile app và các sản phẩm digital khác.',
    '- Có ít nhất 2 năm kinh nghiệm thiết kế UI/UX
- Thành thạo Figma, Adobe Creative Suite
- Có portfolio thể hiện khả năng thiết kế
- Hiểu biết về design system và user research
- Có kinh nghiệm với responsive design
- Khả năng giao tiếp và thuyết trình tốt',
    '- Môi trường sáng tạo, được tự do thể hiện ý tưởng
- Được làm việc với các thương hiệu lớn
- Cơ hội học hỏi từ các designer có kinh nghiệm
- Lương thưởng theo năng lực
- Được tham gia các workshop, training',
    '2024-12-15'
),
(
    'Data Scientist',
    'AI Research Center',
    'Hà Nội',
    35000000,
    60000000,
    'full-time',
    'senior',
    'Chúng tôi cần một Data Scientist có kinh nghiệm để phát triển các giải pháp AI/ML. Bạn sẽ tham gia xây dựng các model machine learning, phân tích dữ liệu và tạo ra các insight có giá trị.',
    '- Có ít nhất 3 năm kinh nghiệm trong lĩnh vực Data Science
- Thành thạo Python, R, SQL
- Có kinh nghiệm với các framework ML: TensorFlow, PyTorch, Scikit-learn
- Hiểu biết về deep learning, NLP
- Có kinh nghiệm với big data technologies
- Khả năng truyền đạt kết quả phân tích',
    '- Làm việc với các công nghệ AI/ML tiên tiến
- Được tham gia các dự án nghiên cứu
- Môi trường học thuật, được publish paper
- Lương thưởng cao, cạnh tranh
- Cơ hội hợp tác với các trường đại học',
    '2024-11-20'
),
(
    'DevOps Engineer',
    'Cloud Solutions Vietnam',
    'TP. Hồ Chí Minh',
    25000000,
    45000000,
    'full-time',
    'mid',
    'Chúng tôi đang tìm kiếm một DevOps Engineer để xây dựng và quản lý infrastructure. Bạn sẽ tham gia tự động hóa quy trình deployment, monitoring và bảo mật hệ thống.',
    '- Có ít nhất 2 năm kinh nghiệm DevOps
- Thành thạo Linux, Docker, Kubernetes
- Có kinh nghiệm với AWS, Azure hoặc GCP
- Hiểu biết về CI/CD pipelines
- Có kinh nghiệm với monitoring tools
- Khả năng script với Python, Bash',
    '- Được làm việc với cloud infrastructure hiện đại
- Môi trường học hỏi công nghệ mới
- Lương thưởng cạnh tranh
- Được tham gia các khóa đào tạo chứng chỉ
- Cơ hội thăng tiến nhanh',
    '2024-12-10'
);

-- Tạo bảng companies để lưu thông tin công ty
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    size VARCHAR(50),
    founded_year INTEGER,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    location VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50)
);

-- Thêm dữ liệu companies
INSERT INTO companies (name, description, industry, size, founded_year, website, location, contact_email, contact_phone) VALUES
('TechViet Solutions', 'Công ty công nghệ hàng đầu Việt Nam, chuyên phát triển phần mềm và giải pháp digital', 'Technology', '100-500', 2015, 'https://techviet.vn', 'TP. Hồ Chí Minh', 'hr@techviet.vn', '+84 28 1234 5678'),
('Digital Innovation Lab', 'Phòng lab nghiên cứu và phát triển các giải pháp công nghệ tiên tiến', 'Technology', '50-100', 2018, 'https://dilab.vn', 'Hà Nội', 'careers@dilab.vn', '+84 24 9876 5432'),
('Creative Studio Vietnam', 'Studio thiết kế sáng tạo, chuyên về UI/UX và branding', 'Design', '20-50', 2019, 'https://creativestudio.vn', 'TP. Hồ Chí Minh', 'hello@creativestudio.vn', '+84 28 5555 1234'),
('AI Research Center', 'Trung tâm nghiên cứu AI/ML, hợp tác với các trường đại học', 'Research', '50-100', 2020, 'https://airesearch.vn', 'Hà Nội', 'research@airesearch.vn', '+84 24 1111 2222'),
('Cloud Solutions Vietnam', 'Công ty chuyên về cloud infrastructure và DevOps services', 'Technology', '100-500', 2017, 'https://cloudsolutions.vn', 'TP. Hồ Chí Minh', 'info@cloudsolutions.vn', '+84 28 3333 4444');

-- Tạo bảng users cho admin
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Tạo index cho users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Thêm admin user (password: Ab123456#)
INSERT INTO users (email, password_hash, name, role) VALUES 
('hoanguyen25@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Hoàng Nguyễn', 'admin');

-- Tạo view để join jobs và companies
CREATE VIEW jobs_with_company AS
SELECT 
    j.*,
    c.name as company_name,
    c.description as company_description,
    c.industry,
    c.size,
    c.website as company_website,
    c.logo_url as company_logo
FROM jobs j
LEFT JOIN companies c ON j.company_name = c.name
WHERE j.is_active = true
ORDER BY j.posted_date DESC; 