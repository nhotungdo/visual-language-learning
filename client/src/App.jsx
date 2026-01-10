import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import IELTSRoadmapPage from './pages/IELTSRoadmapPage'
import JLPTRoadmapPage from './pages/JLPTRoadmapPage'
import IELTSExercisePage from './pages/IELTSExercisePage'
import JLPTExercisePage from './pages/JLPTExercisePage'
import KanaLearningPage from './pages/KanaLearningPage'
import KanjiLearningPage from './pages/KanjiLearningPage'
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
  const [view, setView] = useState('home') // 'home', 'auth', 'flashcard', 'list', 'add', 'profile', 'ielts-roadmap', 'jlpt-roadmap', 'ielts-exercise', 'jlpt-exercise', 'hiragana', 'katakana', 'kanji'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [configError, setConfigError] = useState(null)
  const [exerciseLevel, setExerciseLevel] = useState(null)
  const [kanaType, setKanaType] = useState('hiragana')

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
      const res = await api.getVocabularies()
      if (!res?.ok) {
        throw new Error(`Server returned error: ${res?.status || 'unknown'}`)
      }

      const data = res.data
      setVocabularies(data)
      setError(null)
    } catch (err) {
      console.error('Fetch error details:', err)
      if (err.message === 'Failed to fetch') {
        setError('Network Error: Cannot connect to server. Ensure backend is running at http://localhost:5000')
      } else {
        setError(err.message)
      }
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
      const res = await api.deleteVocabulary(id)
      if (res?.ok) {
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
      const res = await api.addVocabulary(newVocabulary)
      if (res?.ok) {
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

  // Show IELTS roadmap page
  if (view === 'ielts-roadmap') {
    return <IELTSRoadmapPage onBack={() => setView('home')} user={user} onNavigate={(newView, params) => {
      setView(newView)
      if (params?.level) setExerciseLevel(params.level)
    }} />
  }

  // Show JLPT roadmap page
  if (view === 'jlpt-roadmap') {
    return <JLPTRoadmapPage onBack={() => setView('home')} user={user} onNavigate={(newView, params) => {
      setView(newView)
      if (params?.level) setExerciseLevel(params.level)
      if (params?.type) setKanaType(params.type)
    }} />
  }

  // Show IELTS exercise page
  if (view === 'ielts-exercise') {
    return <IELTSExercisePage onBack={() => setView('ielts-roadmap')} level={exerciseLevel} user={user} />
  }

  // Show JLPT exercise page
  if (view === 'jlpt-exercise') {
    return <JLPTExercisePage onBack={() => setView('jlpt-roadmap')} level={exerciseLevel} user={user} />
  }

  // Show Hiragana learning page
  if (view === 'hiragana') {
    return <KanaLearningPage onBack={() => setView('jlpt-roadmap')} type="hiragana" />
  }

  // Show Katakana learning page
  if (view === 'katakana') {
    return <KanaLearningPage onBack={() => setView('jlpt-roadmap')} type="katakana" />
  }

  // Show Kanji learning page
  if (view === 'kanji') {
    return <KanjiLearningPage onBack={() => setView('jlpt-roadmap')} level={exerciseLevel} />
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
