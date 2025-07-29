import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config'

const JobDetail = ({ job, onBack, onViewCompany, onJobUpdate, onJobDelete, isAdmin }) => {
  const [similarJobs, setSimilarJobs] = useState([])
  const [companyInfo, setCompanyInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingCompany, setIsEditingCompany] = useState(false)
  const [editForm, setEditForm] = useState({
    title: job.title,
    company_name: job.company_name,
    location: job.location,
    salary_min: job.salary_min,
    salary_max: job.salary_max,
    job_type: job.job_type,
    experience_level: job.experience_level,
    description: job.description,
    requirements: job.requirements || '',
    benefits: job.benefits || '',
    deadline_date: job.deadline_date ? job.deadline_date.split('T')[0] : ''
  })
  const [editCompanyForm, setEditCompanyForm] = useState({
    name: '',
    description: '',
    industry: '',
    size: '',
    founded_year: '',
    location: '',
    website: '',
    email: '',
    phone: ''
  })

  // Fetch similar jobs and company info
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch similar jobs
        const similarResponse = await fetch(`${API_ENDPOINTS.SEARCH}?job_type=${job.job_type}&experience_level=${job.experience_level}&limit=3`)
        const similarData = await similarResponse.json()
        setSimilarJobs(similarData.filter(j => j.id !== job.id).slice(0, 3))

        // Fetch company info
        const companyResponse = await fetch(`${API_ENDPOINTS.COMPANIES}/${encodeURIComponent(job.company_name)}`)
        if (companyResponse.ok) {
          const companyData = await companyResponse.json()
          setCompanyInfo(companyData)
          setEditCompanyForm({
            name: companyData.name || '',
            description: companyData.description || '',
            industry: companyData.industry || '',
            size: companyData.size || '',
            founded_year: companyData.founded_year || '',
            location: companyData.location || '',
            website: companyData.website || '',
            email: companyData.email || '',
            phone: companyData.phone || ''
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (job) {
      fetchData()
    }
  }, [job])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({
      title: job.title,
      company_name: job.company_name,
      location: job.location,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      job_type: job.job_type,
      experience_level: job.experience_level,
      description: job.description,
      requirements: job.requirements || '',
      benefits: job.benefits || '',
      deadline_date: job.deadline_date ? job.deadline_date.split('T')[0] : ''
    })
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.JOBS}/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editForm)
      })

      if (response.ok) {
        const updatedJob = await response.json()
        onJobUpdate(updatedJob)
        setIsEditing(false)
        alert('Cập nhật việc làm thành công!')
      } else {
        alert('Có lỗi xảy ra khi cập nhật việc làm!')
      }
    } catch (error) {
      console.error('Error updating job:', error)
      alert('Có lỗi xảy ra khi cập nhật việc làm!')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa việc làm này?')) {
      return
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.JOBS}/${job.id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        alert('Xóa việc làm thành công!')
        // Reload trang sau khi xóa thành công
        window.location.reload()
      } else {
        alert('Có lỗi xảy ra khi xóa việc làm!')
      }
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Có lỗi xảy ra khi xóa việc làm!')
    }
  }

  const handleEditCompany = () => {
    setIsEditingCompany(true)
  }

  const handleCancelEditCompany = () => {
    setIsEditingCompany(false)
    if (companyInfo) {
      setEditCompanyForm({
        name: companyInfo.name || '',
        description: companyInfo.description || '',
        industry: companyInfo.industry || '',
        size: companyInfo.size || '',
        founded_year: companyInfo.founded_year || '',
        location: companyInfo.location || '',
        website: companyInfo.website || '',
        email: companyInfo.email || '',
        phone: companyInfo.phone || ''
      })
    }
  }

  const handleSaveCompany = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.COMPANIES}/${encodeURIComponent(job.company_name)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editCompanyForm)
      })

      if (response.ok) {
        const updatedCompany = await response.json()
        setCompanyInfo(updatedCompany)
        setIsEditingCompany(false)
        alert('Cập nhật thông tin công ty thành công!')
      } else {
        alert('Có lỗi xảy ra khi cập nhật thông tin công ty!')
      }
    } catch (error) {
      console.error('Error updating company:', error)
      alert('Có lỗi xảy ra khi cập nhật thông tin công ty!')
    }
  }

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
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    Ứng tuyển ngay
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    💾 Lưu
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    📤 Chia sẻ
                  </button>
                  {isAdmin && (
                    <>
                      <button 
                        onClick={handleEdit}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
                      >
                        ✏️ Chỉnh sửa
                      </button>
                      <button 
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                      >
                        🗑️ Xóa
                      </button>
                    </>
                  )}
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
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Công ty</label>
                    <input
                      type="text"
                      value={editForm.company_name}
                      onChange={(e) => setEditForm({...editForm, company_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hình thức</label>
                      <select
                        value={editForm.job_type}
                        onChange={(e) => setEditForm({...editForm, job_type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="full-time">Toàn thời gian</option>
                        <option value="part-time">Bán thời gian</option>
                        <option value="contract">Hợp đồng</option>
                        <option value="internship">Thực tập</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lương tối thiểu (VND)</label>
                      <input
                        type="number"
                        value={editForm.salary_min || ''}
                        onChange={(e) => setEditForm({...editForm, salary_min: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lương tối đa (VND)</label>
                      <input
                        type="number"
                        value={editForm.salary_max || ''}
                        onChange={(e) => setEditForm({...editForm, salary_max: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kinh nghiệm</label>
                    <select
                      value={editForm.experience_level}
                      onChange={(e) => setEditForm({...editForm, experience_level: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="entry">Mới tốt nghiệp</option>
                      <option value="junior">Junior (1-3 năm)</option>
                      <option value="mid">Mid-level (3-5 năm)</option>
                      <option value="senior">Senior (5+ năm)</option>
                      <option value="lead">Team Lead</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả công việc</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Yêu cầu công việc</label>
                    <textarea
                      value={editForm.requirements}
                      onChange={(e) => setEditForm({...editForm, requirements: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quyền lợi</label>
                    <textarea
                      value={editForm.benefits}
                      onChange={(e) => setEditForm({...editForm, benefits: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hạn nộp hồ sơ</label>
                    <input
                      type="date"
                      value={editForm.deadline_date}
                      onChange={(e) => setEditForm({...editForm, deadline_date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      💾 Lưu thay đổi
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      ❌ Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div className="text-gray-700 whitespace-pre-line">
                    {job.description}
                  </div>
                </div>
              )}
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Thông tin công ty</h3>
                {isAdmin && companyInfo && (
                  <button 
                    onClick={handleEditCompany}
                    className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    ✏️ Chỉnh sửa
                  </button>
                )}
              </div>
              
              {isEditingCompany ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên công ty</label>
                    <input
                      type="text"
                      value={editCompanyForm.name}
                      onChange={(e) => setEditCompanyForm({...editCompanyForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <textarea
                      value={editCompanyForm.description}
                      onChange={(e) => setEditCompanyForm({...editCompanyForm, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngành nghề</label>
                      <input
                        type="text"
                        value={editCompanyForm.industry}
                        onChange={(e) => setEditCompanyForm({...editCompanyForm, industry: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quy mô</label>
                      <input
                        type="text"
                        value={editCompanyForm.size}
                        onChange={(e) => setEditCompanyForm({...editCompanyForm, size: e.target.value})}
                        placeholder="VD: 100-500"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Năm thành lập</label>
                      <input
                        type="number"
                        value={editCompanyForm.founded_year}
                        onChange={(e) => setEditCompanyForm({...editCompanyForm, founded_year: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                      <input
                        type="text"
                        value={editCompanyForm.location}
                        onChange={(e) => setEditCompanyForm({...editCompanyForm, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={editCompanyForm.website}
                      onChange={(e) => setEditCompanyForm({...editCompanyForm, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editCompanyForm.email}
                        onChange={(e) => setEditCompanyForm({...editCompanyForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Điện thoại</label>
                      <input
                        type="tel"
                        value={editCompanyForm.phone}
                        onChange={(e) => setEditCompanyForm({...editCompanyForm, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveCompany}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      💾 Lưu thay đổi
                    </button>
                    <button
                      onClick={handleCancelEditCompany}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      ❌ Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-2xl">🏢</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{job.company_name}</h4>
                      <p className="text-sm text-gray-600">
                        {companyInfo?.description || 'Công ty công nghệ hàng đầu Việt Nam'}
                      </p>
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
                    {companyInfo?.industry && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngành nghề:</span>
                        <span className="font-medium">{companyInfo.industry}</span>
                      </div>
                    )}
                    {companyInfo?.size && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quy mô:</span>
                        <span className="font-medium">{companyInfo.size} nhân viên</span>
                      </div>
                    )}
                    {companyInfo?.founded_year && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Năm thành lập:</span>
                        <span className="font-medium">{companyInfo.founded_year}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Địa điểm:</span>
                      <span className="font-medium">{companyInfo?.location || job.location}</span>
                    </div>
                    {companyInfo?.website && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Website:</span>
                        <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                          {companyInfo.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                    {companyInfo?.email && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <a href={`mailto:${companyInfo.email}`} className="font-medium text-blue-600 hover:underline">
                          {companyInfo.email}
                        </a>
                      </div>
                    )}
                    {companyInfo?.phone && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Điện thoại:</span>
                        <a href={`tel:${companyInfo.phone}`} className="font-medium text-blue-600 hover:underline">
                          {companyInfo.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}
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

