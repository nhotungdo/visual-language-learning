import { useState, useEffect } from 'react'
import './FlashcardPage.css'

function FlashcardPage({ onBack, type = 'jlpt', level = 'n5' }) {
  const [flashcards, setFlashcards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [knownCards, setKnownCards] = useState([])
  const [unknownCards, setUnknownCards] = useState([])
  const [filterCategory, setFilterCategory] = useState('all')
  const [studyMode, setStudyMode] = useState('all') // all, unknown, known

  useEffect(() => {
    loadFlashcards()
  }, [type, level])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === ' ') {
        e.preventDefault()
        handleFlip()
      } else if (e.key === 'k' || e.key === 'K') {
        handleKnown()
      } else if (e.key === 'u' || e.key === 'U') {
        handleUnknown()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, isFlipped, filteredCards])

  const loadFlashcards = async () => {
    try {
      if (type === 'jlpt') {
        const { jlptFlashcards } = await import('../data/jlptFlashcards.js')
        setFlashcards(jlptFlashcards.n5 || [])
      } else {
        const { ieltsFlashcards } = await import('../data/ieltsFlashcards.js')
        setFlashcards(ieltsFlashcards.academic || [])
      }
    } catch (error) {
      console.error('Error loading flashcards:', error)
    }
  }

  const filteredCards = flashcards.filter(card => {
    if (filterCategory !== 'all' && card.category !== filterCategory) return false
    if (studyMode === 'known' && !knownCards.includes(card.id)) return false
    if (studyMode === 'unknown' && !unknownCards.includes(card.id)) return false
    return true
  })

  const currentCard = filteredCards[currentIndex]
  const categories = [...new Set(flashcards.map(c => c.category))]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setShowAnswer(!showAnswer)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setShowAnswer(false)
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setShowAnswer(false)
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
  }

  const handleKnown = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id])
    }
    handleNext()
  }

  const handleUnknown = () => {
    if (!unknownCards.includes(currentCard.id)) {
      setUnknownCards([...unknownCards, currentCard.id])
    }
    handleNext()
  }

  const handleReset = () => {
    setKnownCards([])
    setUnknownCards([])
    setCurrentIndex(0)
    setIsFlipped(false)
    setShowAnswer(false)
  }

  if (!currentCard) {
    return (
      <div className="flashcard-page">
        <div className="no-cards">
          <h2>No flashcards available</h2>
          <button onClick={onBack}>Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`flashcard-page ${type}-theme`}>
      <header className="flashcard-header">
        <div className="header-content">
          <button className="back-button" onClick={onBack}>
            ← {type === 'jlpt' ? '戻る' : 'Back'}
          </button>
          <h1 className="flashcard-title">
            {type === 'jlpt' ? '🇯🇵 JLPT Flashcards' : '🇬🇧 IELTS Flashcards'}
          </h1>
          <div className="header-stats">
            <div className="stat-badge known">
              ✓ {knownCards.length}
            </div>
            <div className="stat-badge unknown">
              ✗ {unknownCards.length}
            </div>
            <div className="stat-badge total">
              📚 {filteredCards.length}
            </div>
          </div>
        </div>

        <div className="controls-bar">
          <select 
            value={filterCategory} 
            onChange={(e) => {
              setFilterCategory(e.target.value)
              setCurrentIndex(0)
            }}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={studyMode} 
            onChange={(e) => {
              setStudyMode(e.target.value)
              setCurrentIndex(0)
            }}
            className="mode-select"
          >
            <option value="all">All Cards</option>
            <option value="unknown">Unknown Only</option>
            <option value="known">Known Only</option>
          </select>

          <button className="reset-button" onClick={handleReset}>
            🔄 Reset Progress
          </button>
        </div>

        <div className="progress-indicator">
          <div className="progress-text">
            {currentIndex + 1} / {filteredCards.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="flashcard-content">
        <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard" onClick={handleFlip}>
            <div className="flashcard-front">
              <div className="card-category">{currentCard.category}</div>
              <div className="card-main-content">
                {type === 'jlpt' ? (
                  <>
                    <div className="japanese-word">{currentCard.word}</div>
                    <div className="reading">{currentCard.reading}</div>
                  </>
                ) : (
                  <>
                    <div className="english-word">{currentCard.word}</div>
                    <div className="pronunciation">{currentCard.pronunciation}</div>
                  </>
                )}
              </div>
              <div className="flip-hint">Click to flip</div>
            </div>

            <div className="flashcard-back">
              <div className="card-category">{currentCard.category}</div>
              <div className="card-main-content">
                <div className="meaning">{currentCard.meaning}</div>
                <div className="example-section">
                  <div className="example-label">Example:</div>
                  <div className="example-text">{currentCard.example}</div>
                </div>
              </div>
              <div className="flip-hint">Click to flip back</div>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button prev" 
            onClick={handlePrevious}
            disabled={filteredCards.length <= 1}
          >
            ← Previous
          </button>
          
          <div className="knowledge-buttons">
            <button className="knowledge-button unknown-btn" onClick={handleUnknown}>
              ✗ Don't Know
            </button>
            <button className="knowledge-button known-btn" onClick={handleKnown}>
              ✓ Know It
            </button>
          </div>

          <button 
            className="nav-button next" 
            onClick={handleNext}
            disabled={filteredCards.length <= 1}
          >
            Next →
          </button>
        </div>

        <div className="keyboard-shortcuts">
          <div className="shortcut-hint">
            <kbd>←</kbd> Previous | <kbd>→</kbd> Next | <kbd>Space</kbd> Flip | <kbd>K</kbd> Know | <kbd>U</kbd> Unknown
          </div>
        </div>
      </main>
    </div>
  )
}

export default FlashcardPage
