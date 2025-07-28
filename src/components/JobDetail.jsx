import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config'

const JobDetail = ({ job, onBack, onViewCompany }) => {
  const [similarJobs, setSimilarJobs] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch similar jobs
  useEffect(() => {
    const fetchSimilarJobs = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_ENDPOINTS.SEARCH}?job_type=${job.job_type}&experience_level=${job.experience_level}&limit=3`)
        const data = await response.json()
        setSimilarJobs(data.filter(j => j.id !== job.id).slice(0, 3))
      } catch (error) {
        console.error('Error fetching similar jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    if (job) {
      fetchSimilarJobs()
    }
  }, [job])

  return (
    <div className="h-screen bg-gray-50 py-8 overflow-y-auto">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Quay lại danh sách việc làm
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="text-2xl mr-2">🏢</span>
                    <span className="text-lg font-semibold">{job.company_name}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center">📍 {job.location}</span>
                    <span className="flex items-center">💰 {job.salary_min?.toLocaleString()} - {job.salary_max?.toLocaleString()} VND</span>
                    <span className="flex items-center">⏰ {job.job_type}</span>
                    <span className="flex items-center">📅 {job.posted}</span>
                    <span className="flex items-center">👁️ {job.views_count || 0} lượt xem</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Ứng tuyển ngay
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    💾 Lưu
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    📤 Chia sẻ
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {job.experience_level}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {job.job_type}
                </span>
                {job.industry && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                    {job.industry}
                  </span>
                )}
                {job.deadline_date && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                    Hạn: {new Date(job.deadline_date).toLocaleDateString('vi-VN')}
                  </span>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mô tả công việc</h2>
              <div className="prose max-w-none">
                <div className="text-gray-700 whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Yêu cầu công việc</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quyền lợi</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {job.benefits}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin công ty</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{job.company_name}</h4>
                  <p className="text-sm text-gray-600">{job.company_description || 'Công ty công nghệ hàng đầu Việt Nam'}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                    <span className="text-sm text-gray-600 ml-1">4.5 • 124 đánh giá</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onViewCompany(job.company_name)}
                className="w-full py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors mb-4"
              >
                Xem trang công ty
              </button>

              <div className="space-y-3 text-sm">
                {job.industry && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngành nghề:</span>
                    <span className="font-medium">{job.industry}</span>
                  </div>
                )}
                {job.size && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quy mô:</span>
                    <span className="font-medium">{job.size} nhân viên</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm:</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                {job.company_website && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Website:</span>
                    <a href={job.company_website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                      {job.company_website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Job Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin việc làm</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{job.views_count || 0}</div>
                  <div className="text-sm text-gray-600">lượt xem</div>
                </div>
                {job.deadline_date && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {new Date(job.deadline_date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-sm text-gray-600">Hạn nộp hồ sơ</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{job.job_type}</div>
                  <div className="text-sm text-gray-600">Hình thức</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{job.experience_level}</div>
                  <div className="text-sm text-gray-600">Kinh nghiệm</div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Việc làm tương tự</h3>
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Đang tải...</p>
                </div>
              ) : similarJobs.length > 0 ? (
                <div className="space-y-4">
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                        {similarJob.title}
                      </h4>
                      <p className="text-sm text-gray-600">{similarJob.company_name}</p>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{similarJob.location}</span>
                        <span>{similarJob.posted}</span>
                      </div>
                      <div className="text-sm font-medium text-green-600 mt-1">
                        {similarJob.salary_min?.toLocaleString()} - {similarJob.salary_max?.toLocaleString()} VND
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Không có việc làm tương tự</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail

