import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config'

const CompanyDetail = ({ company, onBack, onViewJob }) => {
  const [companyJobs, setCompanyJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('about')

  // Fetch company jobs
  useEffect(() => {
    const fetchCompanyJobs = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_ENDPOINTS.SEARCH}?company_name=${encodeURIComponent(company.name)}`)
        const data = await response.json()
        setCompanyJobs(data)
      } catch (error) {
        console.error('Error fetching company jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    if (company && company.name) {
      fetchCompanyJobs()
    }
  }, [company])

  return (
    <div className="h-screen bg-gray-50 py-8 overflow-y-auto">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Quay lại chi tiết việc làm
        </button>

        {/* Company Header */}
        <div className="bg-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mr-6">
                <span className="text-blue-600 text-3xl">🏢</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                <p className="text-blue-100 mb-2">{company.description || 'Công ty công nghệ hàng đầu Việt Nam'}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="ml-2">4.5 • 124 đánh giá</span>
                  <span className="ml-4">👥 {companyJobs.length} việc làm đang tuyển</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="px-6 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors">
                👁️ Theo dõi
              </button>
              <button className="px-6 py-2 border border-white text-white rounded-md hover:bg-blue-700 transition-colors">
                📤 Chia sẻ
              </button>
              <button 
                onClick={() => setActiveTab('jobs')}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                ✉️ Xem việc làm ({companyJobs.length})
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="flex border-b">
                <button 
                  onClick={() => setActiveTab('about')}
                  className={`px-6 py-3 border-b-2 font-semibold transition-colors ${
                    activeTab === 'about' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Giới thiệu
                </button>
                <button 
                  onClick={() => setActiveTab('jobs')}
                  className={`px-6 py-3 border-b-2 font-semibold transition-colors ${
                    activeTab === 'jobs' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Việc làm ({companyJobs.length})
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 border-b-2 font-semibold transition-colors ${
                    activeTab === 'reviews' 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Đánh giá (25)
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <>
                {/* About Company */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Về chúng tôi</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      {company.description || `${company.name} là một trong những công ty công nghệ hàng đầu tại Việt Nam, chuyên phát triển các giải pháp phần mềm và ứng dụng cho thị trường trong nước và quốc tế.`}
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Tầm nhìn:</h3>
                    <p className="text-gray-700 mb-4">
                      Trở thành công ty công nghệ hàng đầu khu vực Đông Nam Á, mang lại những giải pháp công nghệ tiên tiến và sáng tạo cho khách hàng.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sứ mệnh:</h3>
                    <p className="text-gray-700 mb-4">
                      Cung cấp các sản phẩm và dịch vụ công nghệ chất lượng cao, góp phần thúc đẩy chuyển đổi số và phát triển kinh tế xã hội.
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Giá trị cốt lõi:</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      <li>Đổi mới sáng tạo</li>
                      <li>Chất lượng và hiệu quả</li>
                      <li>Làm việc nhóm</li>
                      <li>Phát triển bền vững</li>
                      <li>Tôn trọng và tin cậy</li>
                    </ul>
                  </div>
                </div>

                {/* Company Culture */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Văn hóa công ty</h2>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Môi trường làm việc:</h3>
                    <ul className="list-disc pl-6 text-gray-700 mb-4">
                      <li>Cơ hội học hỏi và phát triển không giới hạn</li>
                      <li>Chế độ làm việc linh hoạt</li>
                      <li>Văn hóa làm việc mở và thân thiện</li>
                      <li>Đội ngũ trẻ, năng động và sáng tạo</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Cơ hội phát triển:</h3>
                    <ul className="list-disc pl-6 text-gray-700 mb-4">
                      <li>Chương trình đào tạo nội bộ chuyên sâu</li>
                      <li>Hỗ trợ học tập và nghiên cứu</li>
                      <li>Cơ hội thăng tiến rõ ràng</li>
                      <li>Work-life balance được đảm bảo</li>
                    </ul>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Quyền lợi nhân viên</h2>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Lương cạnh tranh + bonus theo performance</li>
                    <li>Bảo hiểm sức khỏe cao cấp cho nhân viên và gia đình</li>
                    <li>Laptop MacBook Pro cho mỗi nhân viên</li>
                    <li>Budget đào tạo 10 triệu/năm</li>
                    <li>Cơ hội đi onsite Singapore, Nhật Bản</li>
                    <li>Team building, company trip hàng năm</li>
                    <li>Gym membership miễn phí</li>
                    <li>30 ngày nghỉ phép có lương/năm</li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'jobs' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Việc làm tại {company.name}</h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Đang tải việc làm...</p>
                  </div>
                ) : companyJobs.length > 0 ? (
                  <div className="space-y-4">
                    {companyJobs.map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => onViewJob(job)}>
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-2">
                              <span>📍 {job.location}</span>
                              <span>💰 {job.salary_min?.toLocaleString()} - {job.salary_max?.toLocaleString()} VND</span>
                              <span>⏰ {job.job_type}</span>
                              <span>📅 {job.posted}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {job.experience_level}
                              </span>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {job.job_type}
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => onViewJob(job)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Hiện tại không có việc làm nào đang tuyển</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Đánh giá từ nhân viên</h2>
                <div className="text-center py-8">
                  <p className="text-gray-500">Tính năng đánh giá đang được phát triển</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Thống kê</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">150+</div>
                  <div className="text-sm text-gray-600">Dự án</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">80+</div>
                  <div className="text-sm text-gray-600">Khách hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">12+</div>
                  <div className="text-sm text-gray-600">Quốc gia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-600">Giải thưởng</div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin công ty</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Tên công ty:</span>
                  <div className="font-medium">{company.name}</div>
                </div>
                {company.industry && (
                  <div>
                    <span className="text-gray-600">Ngành nghề:</span>
                    <div className="font-medium">{company.industry}</div>
                  </div>
                )}
                {company.size && (
                  <div>
                    <span className="text-gray-600">Quy mô:</span>
                    <div className="font-medium">{company.size} nhân viên</div>
                  </div>
                )}
                {company.founded_year && (
                  <div>
                    <span className="text-gray-600">Thành lập:</span>
                    <div className="font-medium">{company.founded_year}</div>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Địa điểm:</span>
                  <div className="font-medium">{company.location}</div>
                </div>
                {company.website && (
                  <div>
                    <span className="text-gray-600">Website:</span>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                      {company.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">📧 Tổng đài tuyển dụng:</span>
                  <div className="font-medium">Tòa nhà ABC, 123 Đường XYZ, Cầu Giấy, Hà Nội</div>
                </div>
                <div>
                  <span className="text-gray-600">📞 Số điện thoại:</span>
                  <div className="font-medium">+84 24 1234 5678</div>
                </div>
                <div>
                  <span className="text-gray-600">✉️ Email:</span>
                  <div className="font-medium">hr@techviet.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail

