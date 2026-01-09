import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import VocabularyCard from './components/VocabularyCard'
import VocabularyList from './components/VocabularyList'
import AddVocabulary from './components/AddVocabulary'
import { AuthProvider, useAuth } from './context/AuthContext'
import api from './utils/api'
import { performStartupChecks } from './utils/errorHandler'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com'

function AppContent() {
  const { user, login, logout, updateUser } = useAuth()
  const [vocabularies, setVocabularies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [view, setView] = useState('home') // 'home', 'auth', 'flashcard', 'list', 'add', 'profile'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [configError, setConfigError] = useState(null)

  // Startup checks
  useEffect(() => {
    const checkResult = performStartupChecks()
    if (checkResult.hasErrors) {
      setConfigError(checkResult)
    }
  }, [])

  useEffect(() => {
    if (user && view !== 'home' && view !== 'auth' && view !== 'profile') {
      fetchVocabularies()
    }
  }, [view, user])

  const fetchVocabularies = async () => {
    try {
      setLoading(true)
      const response = await api.getVocabularies()
      if (!response.ok) throw new Error('Failed to fetch vocabularies')
      const data = await response.json()
      setVocabularies(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    setShowAnswer(false)
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length)
  }

  const handlePrevious = () => {
    setShowAnswer(false)
    setCurrentIndex((prev) => (prev - 1 + vocabularies.length) % vocabularies.length)
  }

  const handleDelete = async (id) => {
    try {
      const response = await api.deleteVocabulary(id)
      if (response.ok) {
        await fetchVocabularies()
        if (currentIndex >= vocabularies.length - 1) {
          setCurrentIndex(0)
        }
      }
    } catch (err) {
      console.error('Error deleting vocabulary:', err)
    }
  }

  const handleAdd = async (newVocabulary) => {
    try {
      const response = await api.addVocabulary(newVocabulary)
      if (response.ok) {
        await fetchVocabularies()
        setView('flashcard')
      }
    } catch (err) {
      console.error('Error adding vocabulary:', err)
    }
  }

  const handleLogin = (authData) => {
    login(authData)
    setView('home') // Redirect to home page after login
  }

  const handleLogout = async () => {
    await logout()
    setView('home')
  }

  const handleUpdateUser = (updatedUser) => {
    updateUser(updatedUser)
  }

  // Show homepage
  if (view === 'home') {
    return (
      <HomePage 
        onGetStarted={() => setView('auth')} 
        user={user}
        onLogout={handleLogout}
        onNavigate={(newView) => setView(newView)}
        onLogin={handleLogin}
      />
    )
  }

  // Show configuration error
  if (configError && configError.hasErrors) {
    return (
      <div className="config-error">
        <h1>⚠️ Configuration Required</h1>
        <div className="error-details">
          <pre>{configError.message}</pre>
        </div>
        <div className="error-actions">
          <button onClick={() => window.location.reload()}>
            Reload After Fixing
          </button>
        </div>
      </div>
    )
  }

  // Show auth page
  if (view === 'auth') {
    return <AuthPage onLogin={handleLogin} onBack={() => setView('home')} />
  }

  // Show profile page
  if (view === 'profile') {
    return <ProfilePage user={user} onUpdateUser={handleUpdateUser} onBack={() => setView('flashcard')} />
  }

  if (loading) {
    return <div className="loading">Đang tải từ vựng...</div>
  }

  if (error) {
    return (
      <div className="error">
        <h2>Lỗi kết nối</h2>
        <p>{error}</p>
        <p>Vui lòng đảm bảo backend đang chạy tại http://localhost:5000</p>
        <button onClick={fetchVocabularies}>Thử lại</button>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          📚 Visual Language Learning
        </h1>
        <nav className="nav-buttons">
          <button 
            className={view === 'flashcard' ? 'active' : ''} 
            onClick={() => setView('flashcard')}
          >
            Flashcards
          </button>
          <button 
            className={view === 'list' ? 'active' : ''} 
            onClick={() => setView('list')}
          >
            Danh sách
          </button>
          <button 
            className={view === 'add' ? 'active' : ''} 
            onClick={() => setView('add')}
          >
            Thêm từ
          </button>
          {user && (
            <div className="user-menu">
              <button className="profile-button" onClick={() => setView('profile')}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName} className="user-avatar" />
                ) : (
                  <span className="user-avatar-placeholder">
                    {user.fullName?.charAt(0) || user.email?.charAt(0) || '?'}
                  </span>
                )}
                <span className="user-name">{user.fullName || user.email}</span>
              </button>
              <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
            </div>
          )}
        </nav>
      </header>

      <main className="app-main">
        {vocabularies.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có từ vựng nào. Hãy thêm từ mới!</p>
            <button onClick={() => setView('add')}>Thêm từ vựng</button>
          </div>
        ) : (
          <>
            {view === 'flashcard' && (
              <VocabularyCard
                vocabulary={vocabularies[currentIndex]}
                showAnswer={showAnswer}
                onToggleAnswer={() => setShowAnswer(!showAnswer)}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentIndex={currentIndex}
                total={vocabularies.length}
              />
            )}
            {view === 'list' && (
              <VocabularyList
                vocabularies={vocabularies}
                onDelete={handleDelete}
                onRefresh={fetchVocabularies}
              />
            )}
          </>
        )}
        {view === 'add' && (
          <AddVocabulary onAdd={handleAdd} onCancel={() => setView('flashcard')} />
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
