import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import VocabularyCard from './components/VocabularyCard'
import VocabularyList from './components/VocabularyList'
import AddVocabulary from './components/AddVocabulary'

function App() {
  const [vocabularies, setVocabularies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [view, setView] = useState('home') // 'home', 'flashcard', 'list', 'add'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (view !== 'home') {
      fetchVocabularies()
    }
  }, [view])

  const fetchVocabularies = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/vocabularies')
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
      const response = await fetch(`http://localhost:5000/api/vocabularies/${id}`, {
        method: 'DELETE',
      })
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
      const response = await fetch('http://localhost:5000/api/vocabularies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVocabulary),
      })
      if (response.ok) {
        await fetchVocabularies()
        setView('flashcard')
      }
    } catch (err) {
      console.error('Error adding vocabulary:', err)
    }
  }

  // Show homepage
  if (view === 'home') {
    return <HomePage onGetStarted={() => setView('flashcard')} />
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

export default App
