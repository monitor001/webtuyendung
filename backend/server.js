const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Trust proxy for Heroku
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://jobconnect-vietnam-app-588c0b4ff56c.herokuapp.com',
    'https://jobconnect-vietnam-app.herokuapp.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Test database connection and setup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
    
    // Setup database tables if they don't exist
    setupDatabase();
  }
});

// Setup database tables
async function setupDatabase() {
  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        salary_min INTEGER,
        salary_max INTEGER,
        job_type VARCHAR(50) NOT NULL,
        experience_level VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT,
        benefits TEXT,
        deadline_date DATE,
        posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        views_count INTEGER DEFAULT 0,
        industry VARCHAR(100),
        size VARCHAR(50)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        industry VARCHAR(100),
        size VARCHAR(50),
        founded_year INTEGER,
        location VARCHAR(255),
        website VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )
    `);



    // Insert sample data
    await pool.query(`
      INSERT INTO jobs (title, company_name, location, salary_min, salary_max, job_type, experience_level, description, requirements, benefits, industry) VALUES
      ('Senior React Developer', 'TechViet Solutions', 'Hà Nội', 25000000, 35000000, 'full-time', 'senior', 'Chúng tôi đang tìm kiếm một Senior React Developer tài năng để gia nhập đội ngũ phát triển sản phẩm của chúng tôi.', '3+ năm kinh nghiệm với ReactJS, Thành thạo JavaScript ES6+, HTML5, CSS3', 'Lương cạnh tranh + bonus theo performance, Bảo hiểm sức khỏe toàn diện', 'Technology'),
      ('Backend Developer', 'Digital Agency', 'TP.HCM', 20000000, 30000000, 'full-time', 'mid', 'Phát triển và duy trì các ứng dụng backend sử dụng Node.js và PostgreSQL.', '2+ năm kinh nghiệm với Node.js, Hiểu biết về RESTful APIs', 'Môi trường làm việc quốc tế, Cơ hội đi onsite Singapore', 'Technology'),
      ('DevOps Engineer', 'Cloud Solutions', 'Đà Nẵng', 30000000, 40000000, 'full-time', 'senior', 'Quản lý infrastructure và CI/CD pipeline cho các ứng dụng cloud.', '4+ năm kinh nghiệm với AWS/Azure, Kinh nghiệm với Docker và Kubernetes', 'Laptop MacBook Pro cho mỗi nhân viên, Budget đào tạo 10 triệu/năm', 'Technology'),
      ('UI/UX Designer', 'DesignHub', 'Hà Nội', 18000000, 28000000, 'full-time', 'mid', 'Thiết kế giao diện người dùng và trải nghiệm người dùng cho các ứng dụng web và mobile.', '2+ năm kinh nghiệm với Figma, Adobe Creative Suite', 'Team building, company trip hàng năm, Gym membership miễn phí', 'Design'),
      ('Data Scientist', 'AI Solutions', 'TP.HCM', 35000000, 50000000, 'full-time', 'senior', 'Phát triển các mô hình machine learning và phân tích dữ liệu.', '3+ năm kinh nghiệm với Python, TensorFlow, PyTorch', 'Cơ hội học hỏi và phát triển không giới hạn, Work-life balance được đảm bảo', 'Technology')
    `);

    await pool.query(`
      INSERT INTO companies (name, description, industry, size, founded_year, location, website, email, phone) VALUES
      ('TechViet Solutions', 'Công ty công nghệ hàng đầu Việt Nam, chuyên phát triển các giải pháp phần mềm và ứng dụng cho thị trường trong nước và quốc tế.', 'Technology', '500-1000', 2015, 'Hà Nội', 'https://techviet.com', 'hr@techviet.com', '+84 24 1234 5678'),
      ('Digital Agency', 'Công ty chuyên về digital marketing và phát triển web, cung cấp dịch vụ toàn diện cho doanh nghiệp.', 'Marketing', '100-500', 2018, 'TP.HCM', 'https://digitalagency.vn', 'info@digitalagency.vn', '+84 28 9876 5432'),
      ('Cloud Solutions', 'Công ty chuyên về cloud infrastructure và DevOps services, giúp doanh nghiệp chuyển đổi số.', 'Technology', '200-500', 2019, 'Đà Nẵng', 'https://cloudsolutions.vn', 'contact@cloudsolutions.vn', '+84 236 1111 2222'),
      ('DesignHub', 'Công ty thiết kế sáng tạo, chuyên về UI/UX design và branding cho các thương hiệu.', 'Design', '50-200', 2020, 'Hà Nội', 'https://designhub.vn', 'hello@designhub.vn', '+84 24 3333 4444'),
      ('AI Solutions', 'Công ty chuyên về trí tuệ nhân tạo và machine learning, phát triển các giải pháp AI tiên tiến.', 'Technology', '100-300', 2021, 'TP.HCM', 'https://aisolutions.vn', 'info@aisolutions.vn', '+84 28 5555 6666')
    `);

    // Insert admin user (password: Ab123456#)
    await pool.query(`
      INSERT INTO users (email, password_hash, name, role) VALUES 
      ('hoanguyen25@gmail.com', '$2b$10$vvfaIGh88OcD9hgnorckl.0sWlD.WC3Vs/Ejpmvw8a41T4IV6q0QS', 'Hoàng Nguyễn', 'admin')
      ON CONFLICT (email) DO UPDATE SET 
        password_hash = '$2b$10$vvfaIGh88OcD9hgnorckl.0sWlD.WC3Vs/Ejpmvw8a41T4IV6q0QS',
        name = 'Hoàng Nguyễn',
        role = 'admin'
    `);



    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup error:', error);
  }
}

// Simple authentication middleware - just check if user is logged in
const authenticateToken = (req, res, next) => {
  // Simple check - if session has user info, allow access
  if (req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    return res.status(401).json({ error: 'Not authenticated' });
  }
};

// API Routes

// Simple login - just check email/password match
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Simple check - just verify email and password match
    if (email === 'hoanguyen25@gmail.com' && password === 'Ab123456#') {
      // Store user info in session
      req.session.user = { 
        id: 1, 
        email: email, 
        name: 'Hoàng Nguyễn',
        role: 'admin' 
      };

      res.json({
        success: true,
        user: {
          id: 1,
          email: email,
          name: 'Hoàng Nguyễn',
          role: 'admin'
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST logout
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// GET current user - simple check
app.get('/api/auth/me', (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      user: req.session.user
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// GET all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, location, job_type, experience_level } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT j.*, c.description as company_description, c.industry, c.size, c.website as company_website
      FROM jobs j
      LEFT JOIN companies c ON j.company_name = c.name
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      query += ` AND (j.title ILIKE $${paramCount} OR j.company_name ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (location) {
      paramCount++;
      query += ` AND j.location ILIKE $${paramCount}`;
      params.push(`%${location}%`);
    }
    
    if (job_type) {
      paramCount++;
      query += ` AND j.job_type = $${paramCount}`;
      params.push(job_type);
    }
    
    if (experience_level) {
      paramCount++;
      query += ` AND j.experience_level = $${paramCount}`;
      params.push(experience_level);
    }
    
    query += ` ORDER BY j.posted_date DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);
    
    const result = await pool.query(query, params);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) FROM jobs j
    `;
    
    if (search || location || job_type || experience_level) {
      countQuery = countQuery.replace('WHERE', 'WHERE');
      if (search) {
        countQuery += ` AND (j.title ILIKE '%${search}%' OR j.company_name ILIKE '%${search}%')`;
      }
      if (location) {
        countQuery += ` AND j.location ILIKE '%${location}%'`;
      }
      if (job_type) {
        countQuery += ` AND j.job_type = '${job_type}'`;
      }
      if (experience_level) {
        countQuery += ` AND j.experience_level = '${experience_level}'`;
      }
    }
    
    const countResult = await pool.query(countQuery);
    const totalJobs = parseInt(countResult.rows[0].count);
    
    res.json({
      jobs: result.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalJobs / limit),
        totalJobs,
        hasNext: page * limit < totalJobs,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT j.*, c.description as company_description, c.industry, c.size, c.website as company_website
      FROM jobs j
      LEFT JOIN companies c ON j.company_name = c.name
      WHERE j.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    // Increment view count
    await pool.query('UPDATE jobs SET views_count = views_count + 1 WHERE id = $1', [id]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET companies
app.get('/api/companies', async (req, res) => {
  try {
    const query = 'SELECT * FROM companies ORDER BY name';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET job statistics
app.get('/api/stats', async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_jobs,
        COUNT(DISTINCT company_name) as total_companies,
        COUNT(CASE WHEN job_type = 'full-time' THEN 1 END) as full_time_jobs,
        COUNT(CASE WHEN experience_level = 'entry' THEN 1 END) as entry_level_jobs,
        AVG(salary_min) as avg_salary_min,
        AVG(salary_max) as avg_salary_max
      FROM jobs 

    `;
    
    const result = await pool.query(statsQuery);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add new job (Admin only)
app.post('/api/jobs', authenticateToken, async (req, res) => {
  try {
    const { 
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
    } = req.body;

    // Validate required fields
    if (!title || !company_name || !location || !job_type || !experience_level || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate salary range
    if (salary_min && salary_max && parseInt(salary_min) > parseInt(salary_max)) {
      return res.status(400).json({ error: 'Minimum salary cannot be greater than maximum salary' });
    }

    const query = `
      INSERT INTO jobs (
        title, company_name, location, salary_min, salary_max, 
        job_type, experience_level, description, requirements, 
        benefits, deadline_date, posted_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)
      RETURNING *
    `;

    const values = [
      title, company_name, location, 
      salary_min ? parseInt(salary_min) : null, 
      salary_max ? parseInt(salary_max) : null,
      job_type, experience_level, description, 
      requirements || null, benefits || null, 
      deadline_date ? new Date(deadline_date) : null
    ];

    const result = await pool.query(query, values);
    
    res.status(201).json({
      success: true,
      message: 'Job added successfully',
      job: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search jobs
app.get('/api/search', async (req, res) => {
  try {
    const { q, location, job_type, experience_level, salary_min, salary_max } = req.query;
    
    let query = `
      SELECT j.*, c.description as company_description, c.industry, c.size
      FROM jobs j
      LEFT JOIN companies c ON j.company_name = c.name

    `;
    
    const params = [];
    let paramCount = 0;
    
    if (q) {
      paramCount++;
      query += ` AND (j.title ILIKE $${paramCount} OR j.company_name ILIKE $${paramCount} OR j.description ILIKE $${paramCount})`;
      params.push(`%${q}%`);
    }
    
    if (location) {
      paramCount++;
      query += ` AND j.location ILIKE $${paramCount}`;
      params.push(`%${location}%`);
    }
    
    if (job_type) {
      paramCount++;
      query += ` AND j.job_type = $${paramCount}`;
      params.push(job_type);
    }
    
    if (experience_level) {
      paramCount++;
      query += ` AND j.experience_level = $${paramCount}`;
      params.push(experience_level);
    }
    
    if (salary_min) {
      paramCount++;
      query += ` AND j.salary_max >= $${paramCount}`;
      params.push(parseInt(salary_min));
    }
    
    if (salary_max) {
      paramCount++;
      query += ` AND j.salary_min <= $${paramCount}`;
      params.push(parseInt(salary_max));
    }
    
    query += ' ORDER BY j.posted_date DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api/health`);
}); 