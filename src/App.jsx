import React, { useState, useEffect } from 'react'
import './App.css'
import heroBg from './assets/hero-bg.jpg'
// import aboutUsBg from './assets/about-us-bg.jpg'
import JobDetail from './components/JobDetail'
import CompanyDetail from './components/CompanyDetail'
import AddJobForm from './components/AddJobForm'
import { API_ENDPOINTS } from './config'

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [experienceFilter, setExperienceFilter] = useState('')
  const [jobTypeFilter, setJobTypeFilter] = useState('')
  const [salaryFilter, setSalaryFilter] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check if admin was logged in before
    return localStorage.getItem('adminLoggedIn') === 'true'
  })
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({})
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [showAddJobForm, setShowAddJobForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedJobs, setSelectedJobs] = useState([])
  const [isSelectMode, setIsSelectMode] = useState(false)
  
  // Animation states
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showAnimations, setShowAnimations] = useState(false)

  const testimonials = [
    {
      name: 'Nguyễn Văn An',
      position: 'Software Engineer tại TechCorp',
      content: 'JobConnect đã giúp tôi tìm được công việc mơ ước chỉ trong 2 tuần. Giao diện thân thiện và nhiều cơ hội tuyệt vời!',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Trần Thị Bình',
      position: 'Marketing Manager tại StartupX',
      content: 'Tôi rất ấn tượng với chất lượng ứng viên trên nền tảng này. Đã tuyển được nhiều nhân tài xuất sắc.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Lê Minh Cường',
      position: 'Product Designer tại DesignHub',
      content: 'Quy trình ứng tuyển rất đơn giản và nhanh chóng. Nhà tuyển dụng phản hồi rất tích cực.',
      rating: 5,
      avatar: '🎨'
    },
    {
      name: 'Phạm Thu Hà',
      position: 'Data Scientist tại AI Solutions',
      content: 'Nền tảng có nhiều công việc chất lượng cao trong lĩnh vực công nghệ. Rất khuyến khích!',
      rating: 5,
      avatar: '📊'
    },
    {
      name: 'Hoàng Đức Minh',
      position: 'HR Director tại BigCorp',
      content: 'JobConnect là đối tác tin cậy trong việc tuyển dụng nhân tài. Hiệu quả và tiết kiệm thời gian.',
      rating: 5,
      avatar: '👔'
    }
  ]

  const achievements = [
    { number: '50,000+', label: 'Ứng viên đã kết nối', icon: '👥', color: 'text-blue-600' },
    { number: '5,000+', label: 'Công ty đối tác', icon: '🏢', color: 'text-red-600' },
    { number: '95%', label: 'Tỷ lệ hài lòng', icon: '⭐', color: 'text-orange-500' },
    { number: '10,000+', label: 'Việc làm đã đăng', icon: '📈', color: 'text-blue-600' }
  ]

  // Check admin status on load - disabled for now
  // useEffect(() => {
  //   checkAdminStatus()
  // }, [])

  // Click outside to close admin login form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAdminLogin && !event.target.closest('.admin-login-container')) {
        setShowAdminLogin(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAdminLogin])

  // Fetch jobs when on jobs page
  useEffect(() => {
    if (currentPage === 'jobs') {
      fetchJobs()
    }
  }, [currentPage])

    const checkAdminStatus = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.ME, {
        credentials: 'include' // Include cookies for session
      })
      const data = await response.json()
      if (data.success) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
    }
  }

  const handleAdminLogin = async () => {
    setLoginLoading(true)
    setLoginError('')
    
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword
        })
      })
      const data = await response.json()
      
      if (data.success) {
        setIsAdmin(true)
        localStorage.setItem('adminLoggedIn', 'true')
        setShowAdminLogin(false)
        setAdminEmail('')
        setAdminPassword('')
        setLoginError('')
        // Stay on current page and show success message
        alert('Đăng nhập admin thành công!')
      } else {
        setLoginError(data.error || 'Đăng nhập thất bại')
      }
    } catch (error) {
      console.error('Error logging in:', error)
      setLoginError('Không thể kết nối đến server')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleAdminLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        credentials: 'include' // Include cookies for session
      })
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setIsAdmin(false)
      localStorage.removeItem('adminLoggedIn')
      alert('Đã đăng xuất admin!')
    }
  }

  // Fetch jobs from API
  const fetchJobs = async (page = 1, filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      // Build filter parameters
      const filterParams = {
        page: page.toString(),
        limit: '3'
      }
      
      // Add search term
      if (filters.search || searchTerm) {
        filterParams.search = filters.search || searchTerm
      }
      
      // Add location filter
      if (filters.location || locationFilter) {
        filterParams.location = filters.location || locationFilter
      }
      
      // Add category filter
      if (filters.category || categoryFilter) {
        filterParams.category = filters.category || categoryFilter
      }
      
      // Add experience filter
      if (filters.experience || experienceFilter) {
        filterParams.experience_level = filters.experience || experienceFilter
      }
      
      // Add job type filter
      if (filters.job_type || jobTypeFilter) {
        filterParams.job_type = filters.job_type || jobTypeFilter
      }
      
      // Add salary filter
      if (filters.salary || salaryFilter) {
        filterParams.salary = filters.salary || salaryFilter
      }
      
      // Add sort parameter
      if (filters.sort || sortBy) {
        filterParams.sort = filters.sort || sortBy
      }
      
      const params = new URLSearchParams(filterParams)
      const response = await fetch(`${API_ENDPOINTS.JOBS}?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setJobs(data.jobs.map(job => ({
          ...job,
          posted: formatTimeAgo(job.posted_date)
        })))
        setPagination(data.pagination)
      } else {
        setError(data.error || 'Có lỗi xảy ra khi tải dữ liệu')
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      setError('Không thể kết nối đến server')
    } finally {
      setLoading(false)
    }
  }

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Vừa đăng'
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} ngày trước`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks} tuần trước`
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  // Typing animation effect
  const typeText = (text, speed = 50) => {
    setIsTyping(true)
    setTypedText('')
    let index = 0
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, speed)
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const animatedElements = document.querySelectorAll('.animate-on-scroll')
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [currentPage])

  // Trigger typing animation when about section is visible
  useEffect(() => {
    if (currentPage === 'home') {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setShowAnimations(true)
                typeText('Kết nối tài năng với cơ hội', 80)
              }
            })
          },
          { threshold: 0.3 }
        )
        observer.observe(aboutSection)
        return () => observer.disconnect()
      }
    }
  }, [currentPage])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || job.location === locationFilter
    const matchesCategory = !categoryFilter || job.category === categoryFilter
    return matchesSearch && matchesLocation && matchesCategory
  })

  const addJob = async (newJobData) => {
    try {
      const response = await fetch(API_ENDPOINTS.JOBS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJobData)
      })
      
      const data = await response.json()
      if (data.success) {
        await fetchJobs() // Refresh jobs list
        alert('Thêm việc làm thành công!')
      } else {
        alert('Lỗi: ' + data.message)
      }
    } catch (error) {
      console.error('Error adding job:', error)
      alert('Có lỗi xảy ra khi thêm việc làm')
    }
  }

  const deleteJob = async (jobId) => {
    if (!confirm('Bạn có chắc chắn muốn xóa việc làm này?')) return
    
    try {
      const response = await fetch(`${API_ENDPOINTS.JOBS}/${jobId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      
      const data = await response.json()
      if (data.success) {
        // Remove from local state instead of refetching
        setJobs(jobs.filter(job => job.id !== jobId))
        // Silent success - no alert
      } else {
        console.error('Delete failed:', data.message)
      }
    } catch (error) {
      console.error('Error deleting job:', error)
    }
  }

  const deleteMultipleJobs = async (jobIds) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ${jobIds.length} việc làm đã chọn?`)) return
    
    try {
      const response = await fetch(`${API_ENDPOINTS.JOBS}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ids: jobIds })
      })
      
      const data = await response.json()
      if (data.success) {
        // Remove from local state
        setJobs(jobs.filter(job => !jobIds.includes(job.id)))
        // Silent success - no alert
        setSelectedJobs([])
        setIsSelectMode(false)
      } else {
        console.error('Delete failed:', data.message)
      }
    } catch (error) {
      console.error('Error deleting multiple jobs:', error)
    }
  }

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode)
    if (isSelectMode) {
      setSelectedJobs([])
    }
  }

  const toggleJobSelection = (jobId) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId)
      } else {
        return [...prev, jobId]
      }
    })
  }

  const selectAllJobs = () => {
    setSelectedJobs(jobs.map(job => job.id))
  }

  const deselectAllJobs = () => {
    setSelectedJobs([])
  }

  const handleAddJobClick = () => {
    setShowAddJobForm(true)
  }

  const handleJobAdded = () => {
    // Refresh jobs list after adding new job
    fetchJobs()
  }

  const handleViewJobDetail = (job) => {
    setSelectedJob(job)
    setCurrentPage('jobDetail')
  }

  const handleJobUpdate = (updatedJob) => {
    setSelectedJob(updatedJob)
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job))
  }

  const handleJobDelete = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId))
  }

  const handleViewCompanyDetail = (companyName) => {
    // In a real app, you'd fetch company data from an API
    // For now, we'll use a placeholder or mock data
    setSelectedCompany({ name: companyName, /* other company data */ })
    setCurrentPage('companyDetail')
  }

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Kết nối cơ hội
            <span className="block bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              nghề nghiệp
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Nền tảng tuyển dụng hàng đầu Việt Nam - Nơi kết nối nhà tuyển dụng và ứng viên tài năng
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('jobs')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg rounded-md transition-colors"
            >
              Tìm việc ngay
            </button>

          </div>
        </div>
      </section>

      {/* About Us Section - Full Screen */}
      <section id="about" className="relative h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-110"
          style={{ 
            backgroundAttachment: 'fixed'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-white/70 to-indigo-50/80"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-center mb-8">
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6">
              Về chúng tôi
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Company Introduction */}
              <div className="lg:col-span-2 animate-on-scroll">
                <h4 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6 leading-tight typing-animation">
                  {showAnimations ? typedText : 'Kết nối tài năng với cơ hội'}
                </h4>
                <div className="space-y-4 text-gray-800 leading-relaxed stagger-animation">
                  <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-blue-500 hover:scale-105 transition-transform duration-300">
                    <p className="text-lg font-semibold leading-relaxed">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 font-bold animate-pulse-slow">JobConnect Vietnam</span> là công ty tuyển dụng hàng đầu Việt Nam, 
                      chuyên kết nối các ứng viên tài năng với những cơ hội nghề nghiệp phù hợp nhất.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50/60 to-purple-50/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-indigo-500 hover:scale-105 transition-transform duration-300">
                    <p className="text-lg font-semibold leading-relaxed">
                      Với sứ mệnh <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700 font-bold animate-pulse-slow">kiến tạo tương lai</span>, chúng tôi không ngừng nỗ lực 
                      để mang đến những giải pháp tuyển dụng đột phá và sáng tạo.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50/60 to-blue-50/60 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-green-500 hover:scale-105 transition-transform duration-300">
                    <p className="text-lg font-semibold leading-relaxed">
                      Chúng tôi cam kết giúp doanh nghiệp tìm kiếm <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-700 font-bold animate-pulse-slow">nhân tài xuất sắc</span> và 
                      ứng viên phát triển sự nghiệp bền vững.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Company Values */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100 animate-on-scroll">
                <h5 className="text-lg font-bold text-gray-800 mb-4 text-center animate-bounce-in">Giá trị cốt lõi</h5>
                <div className="grid grid-cols-1 gap-4 stagger-animation">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50/70 to-blue-100/70 backdrop-blur-sm rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-4xl mb-2 animate-bounce-in">🎯</div>
                    <h6 className="text-lg font-bold text-blue-700 mb-2">Sứ mệnh</h6>
                    <p className="text-sm text-gray-700 leading-relaxed">Kết nối tài năng với cơ hội</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50/70 to-indigo-100/70 backdrop-blur-sm rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-4xl mb-2 animate-bounce-in">🌟</div>
                    <h6 className="text-lg font-bold text-indigo-700 mb-2">Tầm nhìn</h6>
                    <p className="text-sm text-gray-700 leading-relaxed">Lãnh đạo thị trường tuyển dụng</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50/70 to-green-100/70 backdrop-blur-sm rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-4xl mb-2 animate-bounce-in">💎</div>
                    <h6 className="text-lg font-bold text-green-700 mb-2">Giá trị</h6>
                    <p className="text-sm text-gray-700 leading-relaxed">Chất lượng và uy tín</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50/70 to-purple-100/70 backdrop-blur-sm rounded-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="text-4xl mb-2 animate-bounce-in">🚀</div>
                    <h6 className="text-lg font-bold text-purple-700 mb-2">Mục tiêu</h6>
                    <p className="text-sm text-gray-700 leading-relaxed">Đổi mới và phát triển</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Testimonials Section */}
      <section id="achievements" className="relative h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6">
              Thành tựu & Cảm nhận
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Achievements */}
            <div className="mb-12 animate-on-scroll">
              <h4 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-slide-in-up">
                Thành tựu nổi bật
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-animation">
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-600 hover:scale-105 hover:-translate-y-2">
                  <div className="text-5xl mb-4 animate-bounce-in">🏆</div>
                  <h5 className="text-xl font-bold mb-3 text-blue-600">Giải thưởng xuất sắc</h5>
                  <p className="text-gray-600">Top 3 nền tảng tuyển dụng được yêu thích nhất Việt Nam 2024</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-red-600 hover:scale-105 hover:-translate-y-2">
                  <div className="text-5xl mb-4 animate-bounce-in">📈</div>
                  <h5 className="text-xl font-bold mb-3 text-red-600">Tăng trưởng vượt bậc</h5>
                  <p className="text-gray-600">200% tăng trưởng số lượng ứng viên và nhà tuyển dụng trong năm 2024</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500 hover:scale-105 hover:-translate-y-2">
                  <div className="text-5xl mb-4 animate-bounce-in">⭐</div>
                  <h5 className="text-xl font-bold mb-3 text-orange-500">Đánh giá cao</h5>
                  <p className="text-gray-600">4.8/5 sao từ hơn 10,000 đánh giá của người dùng trên các nền tảng</p>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="animate-on-scroll">
              <h4 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Cảm nghĩ từ cộng đồng
              </h4>
              <div className="relative max-w-6xl mx-auto">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 border border-blue-300 rounded-full hover:bg-blue-50 text-blue-600 text-lg"
                  >
                    ←
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                    {getVisibleTestimonials().map((testimonial, index) => (
                      <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600">
                        <div className="flex items-center mb-4">
                          <div className="text-3xl mr-3">{testimonial.avatar}</div>
                          <div>
                            <h5 className="font-semibold text-blue-600">{testimonial.name}</h5>
                            <p className="text-sm text-gray-600">{testimonial.position}</p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-orange-400">⭐</span>
                          ))}
                        </div>
                        <p className="text-gray-700 italic">"{testimonial.content}"</p>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={nextTestimonial}
                    className="p-3 border border-blue-300 rounded-full hover:bg-blue-50 text-blue-600 text-lg"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700 mb-6">
              Liên hệ
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-on-scroll">
                <h4 className="text-3xl font-bold text-gray-800 mb-8">Thông tin liên hệ</h4>
                <div className="space-y-6">
                  <div className="flex items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Địa chỉ</h5>
                      <p className="text-gray-600">123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Email</h5>
                      <p className="text-gray-600">info@jobconnect.vn</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Điện thoại</h5>
                      <p className="text-gray-600">+84 24 1234 5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">🕒</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">Giờ làm việc</h5>
                      <p className="text-gray-600">8:00 - 18:00 (Thứ 2 - Thứ 6)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code Section */}
              <div className="animate-on-scroll">
                <h4 className="text-3xl font-bold text-gray-800 mb-8">Quét mã QR</h4>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                  <div className="text-center space-y-6">
                    {/* QR Code Placeholder */}
                    <div className="mx-auto w-48 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border-4 border-indigo-200 flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📱</div>
                        <p className="text-sm text-gray-600 font-medium">QR Code</p>
                        <p className="text-xs text-gray-500">JobConnect Vietnam</p>
                      </div>
                    </div>
                    
                    {/* QR Code Description */}
                    <div className="space-y-4">
                      <h5 className="text-xl font-semibold text-gray-800">Liên hệ nhanh</h5>
                      <p className="text-gray-600 leading-relaxed">
                        Quét mã QR để kết nối trực tiếp với chúng tôi qua Zalo, Facebook hoặc các ứng dụng khác.
                      </p>
                      
                      {/* Social Media Links */}
                      <div className="flex justify-center space-x-4 pt-4">
                        <a href="tel:+84901234567" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl" title="Điện thoại">
                          <span className="text-white text-lg">📞</span>
                        </a>
                        <a href="https://facebook.com/jobconnectvietnam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl" title="Facebook">
                          <span className="text-white text-lg">📘</span>
                        </a>
                        <a href="https://zalo.me/jobconnectvietnam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl" title="Zalo">
                          <span className="text-white text-lg">💬</span>
                        </a>
                        <a href="https://youtube.com/@jobconnectvietnam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl" title="YouTube">
                          <span className="text-white text-lg">📺</span>
                        </a>
                      </div>
                      
                      <p className="text-sm text-gray-500 pt-2">
                        Hoặc liên hệ trực tiếp qua các kênh bên cạnh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-2xl font-bold">JC</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    JobConnect Vietnam
                  </h3>
                  <p className="text-gray-400">Kết nối tài năng với cơ hội</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                JobConnect Vietnam là nền tảng tuyển dụng hàng đầu Việt Nam, 
                chuyên kết nối các ứng viên tài năng với những cơ hội nghề nghiệp phù hợp nhất.
              </p>
              <div className="flex space-x-4">
                <a href="tel:+84901234567" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors" title="Điện thoại">
                  <span className="text-white">📞</span>
                </a>
                <a href="https://facebook.com/jobconnectvietnam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" title="Facebook">
                  <span className="text-white">📘</span>
                </a>
                <a href="https://zalo.me/jobconnectvietnam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors" title="Zalo">
                  <span className="text-white">💬</span>
                </a>
                <a href="https://youtube.com/@jobconnectvietnam" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors" title="YouTube">
                  <span className="text-white">📺</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Liên kết nhanh</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">Trang chủ</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">Về chúng tôi</a></li>
                <li><a href="#achievements" className="text-gray-300 hover:text-blue-400 transition-colors">Thành tựu</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Liên hệ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Việc làm</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Liên hệ</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="mr-3">📍</span>
                  <span className="text-gray-300">Hà Nội, Việt Nam</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">📧</span>
                  <span className="text-gray-300">info@jobconnect.vn</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">📞</span>
                  <span className="text-gray-300">+84 24 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">🕒</span>
                  <span className="text-gray-300">8:00 - 18:00 (T2-T6)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 JobConnect Vietnam. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Chính sách bảo mật</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Điều khoản sử dụng</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Sơ đồ trang</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )

  const renderJobsPage = () => (
    <section className="h-screen bg-gray-50 overflow-y-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-4xl font-bold text-gray-800">Việc làm nổi bật</h3>
          <div className="flex gap-2">
            {isAdmin && (
              <>
                {isSelectMode ? (
                  <>
                    <button
                      onClick={() => deleteMultipleJobs(selectedJobs)}
                      disabled={selectedJobs.length === 0}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      🗑️ Xóa ({selectedJobs.length})
                    </button>
                    <button
                      onClick={selectAllJobs}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Chọn tất cả
                    </button>
                    <button
                      onClick={deselectAllJobs}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Bỏ chọn tất cả
                    </button>
                    <button
                      onClick={toggleSelectMode}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      ❌ Hủy
                    </button>
                  </>
                ) : (
                  <button
                    onClick={toggleSelectMode}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center gap-2"
                  >
                    ☑️ Chọn nhiều
                  </button>
                )}
                <button
                  onClick={handleAddJobClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  ➕ Thêm việc làm
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔍 Tìm kiếm & Lọc</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm việc làm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">📍 Tất cả địa điểm</option>
              <option value="Hà Nội">🏛️ Hà Nội</option>
              <option value="TP.HCM">🏙️ TP.HCM</option>
              <option value="Đà Nẵng">🏖️ Đà Nẵng</option>
              <option value="Cần Thơ">🌾 Cần Thơ</option>
              <option value="Hải Phòng">🚢 Hải Phòng</option>
              <option value="Nha Trang">🏝️ Nha Trang</option>
              <option value="Huế">🏛️ Huế</option>
              <option value="Vũng Tàu">⛵ Vũng Tàu</option>
            </select>
            
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">💼 Tất cả ngành nghề</option>
              <option value="Công nghệ thông tin">💻 Công nghệ thông tin</option>
              <option value="Marketing">📢 Marketing</option>
              <option value="Thiết kế">🎨 Thiết kế</option>
              <option value="Phân tích dữ liệu">📊 Phân tích dữ liệu</option>
              <option value="Tài chính">💰 Tài chính</option>
              <option value="Giáo dục">📚 Giáo dục</option>
              <option value="Y tế">🏥 Y tế</option>
              <option value="Du lịch">✈️ Du lịch</option>
              <option value="Bán hàng">🛒 Bán hàng</option>
              <option value="Nhân sự">👥 Nhân sự</option>
            </select>
            
            <select 
              value={experienceFilter} 
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">🎯 Tất cả kinh nghiệm</option>
              <option value="Intern">🎓 Intern</option>
              <option value="Fresher">🌱 Fresher</option>
              <option value="Junior">👨‍💼 Junior (1-3 năm)</option>
              <option value="Middle">👨‍💻 Middle (3-5 năm)</option>
              <option value="Senior">👨‍🔬 Senior (5+ năm)</option>
              <option value="Manager">👔 Manager</option>
              <option value="Director">🎩 Director</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select 
              value={jobTypeFilter} 
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">⏰ Tất cả loại việc làm</option>
              <option value="Full-time">🕐 Full-time</option>
              <option value="Part-time">⏱️ Part-time</option>
              <option value="Contract">📋 Contract</option>
              <option value="Remote">🏠 Remote</option>
              <option value="Hybrid">🏢 Hybrid</option>
            </select>
            
            <select 
              value={salaryFilter} 
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">💰 Tất cả mức lương</option>
              <option value="0-10000000">💰 Dưới 10 triệu</option>
              <option value="10000000-20000000">💰 10-20 triệu</option>
              <option value="20000000-30000000">💰 20-30 triệu</option>
              <option value="30000000-50000000">💰 30-50 triệu</option>
              <option value="50000000+">💰 Trên 50 triệu</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">📅 Mới nhất</option>
              <option value="oldest">📅 Cũ nhất</option>
              <option value="salary_high">💰 Lương cao nhất</option>
              <option value="salary_low">💰 Lương thấp nhất</option>
              <option value="views">👁️ Nhiều lượt xem</option>
            </select>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setLocationFilter('')
                  setCategoryFilter('')
                  setExperienceFilter('')
                  setJobTypeFilter('')
                  setSalaryFilter('')
                  setSortBy('newest')
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                🔄 Xóa bộ lọc
              </button>
              <button 
                onClick={() => fetchJobs(1, {
                  search: searchTerm,
                  location: locationFilter,
                  category: categoryFilter,
                  experience: experienceFilter,
                  job_type: jobTypeFilter,
                  salary: salaryFilter,
                  sort: sortBy
                })}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                🔍 Áp dụng bộ lọc
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Tìm thấy <span className="font-semibold text-blue-600">{jobs.length}</span> việc làm
            </div>
          </div>
        </div>
        
        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Đang tải việc làm...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button 
              onClick={() => fetchJobs()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy việc làm nào</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 ${selectedJobs.includes(job.id) ? 'border-green-600 bg-green-50' : 'border-blue-600'}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {isSelectMode && (
                            <input
                              type="checkbox"
                              checked={selectedJobs.includes(job.id)}
                              onChange={() => toggleJobSelection(job.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          )}
                          <h4 className="text-lg font-semibold text-blue-600 cursor-pointer hover:text-blue-700" onClick={() => handleViewJobDetail(job)}>
                            {job.title}
                          </h4>
                        </div>
                        {isAdmin && !isSelectMode && (
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                      <p className="text-gray-600 flex items-center mb-2">
                        🏢 {job.company_name}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">📍 {job.location}</span>
                        <span className="flex items-center">💰 {job.salary_min?.toLocaleString()} - {job.salary_max?.toLocaleString()} VND</span>
                        <span className="flex items-center">⏰ {job.job_type}</span>
                        <span className="flex items-center">📅 {job.posted}</span>
                        <span className="flex items-center">👁️ {job.views_count || 0} lượt xem</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {job.experience_level}
                        </span>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {job.job_type}
                        </span>
                        {job.industry && (
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                            {job.industry}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleViewJobDetail(job)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => handleViewCompanyDetail(job.company_name)}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Xem công ty
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => fetchJobs(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Trước
                </button>
                
                <span className="px-4 py-2 text-gray-600">
                  Trang {pagination.currentPage} / {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => fetchJobs(pagination.currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
        
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy việc làm phù hợp</p>
          </div>
        )}
      </div>
    </section>
  )

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto">
      {/* Main Content with Header Offset */}
      <div className="pt-24">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                JobConnect
              </h1>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  currentPage === 'home' 
                    ? 'text-blue-600 bg-blue-50 shadow-md' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Trang chủ
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Về chúng tôi
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Thành tựu
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Liên hệ
              </button>
              <button 
                onClick={() => setCurrentPage('jobs')}
                className={`text-lg font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  currentPage === 'jobs' 
                    ? 'text-blue-600 bg-blue-50 shadow-md' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Việc làm
              </button>
            </nav>

            <div className="flex items-center space-x-4 relative">
              {!isAdmin ? (
                <div className="relative admin-login-container">
                  <button 
                    onClick={() => {
                      setShowAdminLogin(!showAdminLogin)
                      if (!showAdminLogin) {
                        setAdminEmail('')
                        setAdminPassword('')
                        setLoginError('')
                      }
                    }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Admin
                  </button>
                  
                  {/* Admin Login Form - Hiển thị phía dưới button */}
                  {showAdminLogin && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 z-50">
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Đăng nhập Admin</h3>
                      
                      {loginError && (
                        <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
                          {loginError}
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="admindemo@gmail.com"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu
                          </label>
                          <input
                            type="password"
                            placeholder="Admin123"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={handleAdminLogin}
                            disabled={loginLoading || !adminEmail || !adminPassword}
                            className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            {loginLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                          </button>
                          <button
                            onClick={() => setShowAdminLogin(false)}
                            className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={handleAdminLogout}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  Đăng xuất Admin
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <nav className="flex flex-col space-y-3 pt-4">
                <button 
                  onClick={() => {
                    setCurrentPage('home'); 
                    setIsMenuOpen(false);
                    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left text-lg font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    currentPage === 'home' 
                      ? 'text-blue-600 bg-blue-50 shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Trang chủ
                </button>
                <button 
                  onClick={() => {
                    setCurrentPage('home'); 
                    setIsMenuOpen(false);
                    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-lg font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Về chúng tôi
                </button>
                <button 
                  onClick={() => {
                    setCurrentPage('home'); 
                    setIsMenuOpen(false);
                    document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-lg font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Thành tựu
                </button>
                <button 
                  onClick={() => {
                    setCurrentPage('home'); 
                    setIsMenuOpen(false);
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-lg font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Liên hệ
                </button>
                <button 
                  onClick={() => {setCurrentPage('jobs'); setIsMenuOpen(false)}}
                  className={`text-left text-lg font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    currentPage === 'jobs' 
                      ? 'text-blue-600 bg-blue-50 shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Việc làm
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>



      {/* Main Content */}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'jobs' && renderJobsPage()}
              {currentPage === 'jobDetail' && selectedJob && (
          <JobDetail 
            job={selectedJob} 
            onBack={() => setCurrentPage('jobs')} 
            onViewCompany={handleViewCompanyDetail}
            onJobUpdate={handleJobUpdate}
            onJobDelete={handleJobDelete}
            isAdmin={isAdmin}
          />
        )}
      {currentPage === 'companyDetail' && selectedCompany && (
        <CompanyDetail 
          company={selectedCompany} 
          onBack={() => setCurrentPage('jobDetail')} 
          onViewJob={(job) => {
            setSelectedJob(job)
            setCurrentPage('jobDetail')
          }}
        />
      )}

      {/* Add Job Form Modal */}
      {showAddJobForm && (
        <AddJobForm 
          onClose={() => setShowAddJobForm(false)}
          onJobAdded={handleJobAdded}
        />
      )}

      </div>


    </div>
  )
}

export default App

