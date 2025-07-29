import React, { useState, useRef, useEffect } from 'react'

const PaperclipIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block mr-2 text-blue-600">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.24 7.76l-7.07 7.07a4 4 0 105.66 5.66l7.07-7.07a6 6 0 10-8.49-8.49l-7.07 7.07" />
  </svg>
)

const ApplyModal = ({ job, onClose, anchorRef }) => {
  const [applicantName, setApplicantName] = useState('')
  const [cvFile, setCvFile] = useState(null)
  const [applyLoading, setApplyLoading] = useState(false)
  const [applyError, setApplyError] = useState('')
  const [showThankYou, setShowThankYou] = useState(false)
  const fileInputRef = useRef()
  const popoverRef = useRef()
  const [popoverStyle, setPopoverStyle] = useState({})

  // Định vị popover dưới anchorRef nếu có
  useEffect(() => {
    if (anchorRef && anchorRef.current && popoverRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setPopoverStyle({
        position: 'absolute',
        top: anchorRect.bottom + window.scrollY + 8,
        left: anchorRect.left + window.scrollX,
        zIndex: 1000,
        minWidth: 320,
        maxWidth: 360,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      })
    }
  }, [anchorRef, showThankYou])

  const handleApply = async (e) => {
    e.preventDefault()
    setApplyError('')
    if (!applicantName.trim()) {
      setApplyError('Vui lòng nhập họ tên!')
      return
    }
    if (!cvFile) {
      setApplyError('Vui lòng đính kèm file CV (PDF)!')
      return
    }
    if (cvFile.type !== 'application/pdf') {
      setApplyError('Chỉ chấp nhận file PDF!')
      return
    }
    setApplyLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', applicantName)
      formData.append('cv', cvFile)
      formData.append('jobTitle', job.title)
      formData.append('jobId', job.id)
      formData.append('to', 'hoanguyen24@gmail.com')
      formData.append('subject', `Ứng tuyển - ${applicantName} - ${job.title}`)
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        setShowThankYou(true)
        setApplicantName('')
        setCvFile(null)
      } else {
        setApplyError('Gửi CV thất bại. Vui lòng thử lại sau!')
      }
    } catch (err) {
      setApplyError('Có lỗi xảy ra khi gửi CV!')
    } finally {
      setApplyLoading(false)
    }
  }

  // Đóng popover khi click ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target) && (!anchorRef || !anchorRef.current || !anchorRef.current.contains(e.target))) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose, anchorRef])

  if (showThankYou) {
    return (
      <div
        ref={popoverRef}
        style={popoverStyle.position ? popoverStyle : {}}
        className={popoverStyle.position ? 'bg-white rounded-lg shadow-xl p-6 border border-blue-100' : 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'}
      >
        <div className={popoverStyle.position ? '' : 'bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-center'}>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Cảm ơn bạn đã ứng tuyển!</h2>
          <p className="mb-6">Chúng tôi đã nhận được hồ sơ của bạn và sẽ liên hệ sớm nhất có thể.</p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => { setShowThankYou(false); onClose(); }}
          >Đóng</button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={popoverRef}
      style={popoverStyle.position ? popoverStyle : {}}
      className={popoverStyle.position ? 'bg-white rounded-lg shadow-xl p-6 border border-blue-100' : 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'}
    >
      <div className={popoverStyle.position ? '' : 'bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative'}>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >×</button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">Ứng tuyển vị trí: {job.title}</h2>
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              value={applicantName}
              onChange={e => setApplicantName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CV (PDF) <span className="text-red-500">*</span></label>
            <div
              className={`flex items-center border-2 rounded-md px-3 py-2 cursor-pointer transition-colors ${cvFile ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-blue-400'}`}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <PaperclipIcon />
              <span className={`truncate ${cvFile ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>{cvFile ? cvFile.name : 'Chọn file PDF...'}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={e => setCvFile(e.target.files[0])}
                required
              />
            </div>
          </div>
          {applyError && <div className="text-red-600 text-sm">{applyError}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
            disabled={applyLoading}
          >
            {applyLoading ? 'Đang gửi...' : 'Gửi CV'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ApplyModal 