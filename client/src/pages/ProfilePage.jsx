import { useState, useEffect } from 'react'
import api from '../utils/api'
import './ProfilePage.css'

function ProfilePage({ user, onUpdateUser, onBack }) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    targetLanguageId: user?.targetLanguageId || null,
    targetLevelId: user?.targetLevelId || null
  })
  const [languages, setLanguages] = useState([])
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchReferenceData()
  }, [])

  const fetchReferenceData = async () => {
    try {
      const [langsRes, examsRes] = await Promise.all([
        api.getLanguages(),
        api.getExams()
      ])
      
      if (langsRes.ok && examsRes.ok) {
        setLanguages(await langsRes.json())
        setExams(await examsRes.json())
      }
    } catch (err) {
      console.error('Error fetching reference data:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? null : (name === 'fullName' ? value : parseInt(value))
    }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.fullName.trim()) {
      setError('Please enter your full name')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('accessToken')
      const response = await api.updateProfile(token, formData)

      if (response.ok) {
        const updatedUser = await response.json()
        onUpdateUser(updatedUser)
        setSuccess('Profile updated successfully!')
      } else {
        setError('Failed to update profile')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getSelectedExam = () => {
    if (!formData.targetLevelId) return null
    for (const exam of exams) {
      if (exam.levels.some(l => l.id === formData.targetLevelId)) {
        return exam
      }
    }
    return null
  }

  const selectedExam = getSelectedExam()
  const availableLevels = selectedExam?.levels || []

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <h1>My Profile</h1>
        </div>

        <div className="profile-content">
          {/* User Info Card */}
          <div className="profile-card user-info-card">
            <div className="user-avatar">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} />
              ) : (
                <div className="avatar-placeholder">
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <div className="user-details">
              <h2>{user?.fullName || 'User'}</h2>
              <p className="user-email">{user?.email}</p>
              <span className="user-badge">Google Account</span>
            </div>
          </div>

          {/* Profile Form */}
          <div className="profile-card">
            <h3>Personal Information</h3>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="targetLanguageId">Learning Language</label>
                <select
                  id="targetLanguageId"
                  name="targetLanguageId"
                  className="form-select"
                  value={formData.targetLanguageId || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select a language</option>
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name} ({lang.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Learning Goal</label>
                <div className="exam-selector">
                  {exams.map(exam => (
                    <button
                      key={exam.id}
                      type="button"
                      className={`exam-button ${selectedExam?.id === exam.id ? 'active' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          targetLevelId: null
                        }))
                      }}
                    >
                      {exam.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedExam && (
                <div className="form-group">
                  <label htmlFor="targetLevelId">Target Level</label>
                  <div className="level-selector">
                    {availableLevels.map(level => (
                      <button
                        key={level.id}
                        type="button"
                        className={`level-button ${formData.targetLevelId === level.id ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, targetLevelId: level.id }))}
                      >
                        {level.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!selectedExam && exams.length > 0 && (
                <div className="form-group">
                  <label htmlFor="targetLevelId">Target Level</label>
                  <select
                    id="targetLevelId"
                    name="targetLevelId"
                    className="form-select"
                    value={formData.targetLevelId || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a goal</option>
                    {exams.map(exam => (
                      <optgroup key={exam.id} label={exam.name}>
                        {exam.levels.map(level => (
                          <option key={level.id} value={level.id}>
                            {level.code} - {level.description}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Learning Stats */}
          <div className="profile-card stats-card">
            <h3>Learning Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Words Learned</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Tests Completed</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Day Streak</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
