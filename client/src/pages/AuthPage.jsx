import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import api from '../utils/api'
import './AuthPage.css'

function AuthPage({ onLogin, onBack }) {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const validateForm = () => {
    if (activeTab === 'register') {
      if (!formData.fullName.trim()) {
        setError('Vui lòng nhập họ tên')
        return false
      }
    }

    if (!formData.email.trim()) {
      setError('Vui lòng nhập email')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ')
      return false
    }

    if (!formData.password) {
      setError('Vui lòng nhập mật khẩu')
      return false
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return false
    }

    if (activeTab === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu xác nhận không khớp')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      let response
      
      if (activeTab === 'register') {
        response = await api.register(formData.fullName, formData.email, formData.password)
      } else {
        response = await api.login(formData.email, formData.password)
      }

      if (response.ok) {
        const data = await response.json()
        onLogin(data)
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || `Lỗi đăng nhập (${response.status})`
        console.error('Login error:', errorData)
        setError(errorMessage)
      }
    } catch (err) {
      console.error('Login exception:', err)
      setError(`Không thể kết nối đến server: ${err.message || 'Vui lòng thử lại'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true)
    setError('')

    try {
      const response = await api.googleLogin(credentialResponse.credential)

      if (response.ok) {
        const data = await response.json()
        onLogin(data)
      } else {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || errorData.error || `Lỗi đăng nhập Google (${response.status})`
        console.error('Google login error:', errorData)
        setError(errorMessage)
      }
    } catch (err) {
      console.error('Google login exception:', err)
      setError(`Lỗi kết nối: ${err.message || 'Không thể kết nối đến server'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.')
  }

  const handleOAuthLogin = (provider) => {
    console.log(`${provider} login will be implemented soon`)
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setError('')
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    })
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-logo">
            <span>📚</span>
            <span>Visual Language Learning</span>
          </div>
          <p className="auth-tagline">
            Master IELTS & JLPT with AI-powered learning platform
          </p>
          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <span>10,000+ vocabulary words</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <span>AI-powered feedback</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <span>Interactive practice tests</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">✓</div>
              <span>Track your progress</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="auth-form-container">
          <div className="auth-card">
            {/* Tabs */}
            <div className="auth-tabs">
              <button
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => switchTab('login')}
              >
                Đăng nhập
              </button>
              <button
                className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => switchTab('register')}
              >
                Đăng ký
              </button>
            </div>

            {/* OAuth Buttons */}
            <div className="oauth-buttons">
              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            </div>

            <div className="divider">hoặc</div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {activeTab === 'register' && (
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {activeTab === 'register' && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {activeTab === 'login' && (
                <>
                  <label className="form-checkbox">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <span>Ghi nhớ đăng nhập</span>
                  </label>
                  <div className="forgot-password">
                    <a href="#forgot">Quên mật khẩu?</a>
                  </div>
                </>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Đang xử lý...' : activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              </button>
            </form>

            {/* Footer */}
            {onBack && (
              <div className="auth-footer">
                <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>
                  ← Quay lại trang chủ
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
