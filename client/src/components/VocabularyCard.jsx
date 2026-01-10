import { useState } from 'react'
import './VocabularyCard.css'
import { API_URL } from '../utils/api'

function VocabularyCard({ vocabulary, showAnswer, onToggleAnswer, onNext, onPrevious, currentIndex, total }) {
  const [imageError, setImageError] = useState(false)
  // Resolve image URL from multiple possible server shapes:
  // - `imageUrl` on the vocabulary object
  // - `vocabularyImages` (or `VocabularyImages`) array with `imageUrl` on items
  const resolvedImageUrl = vocabulary?.imageUrl
    || vocabulary?.vocabularyImages?.[0]?.imageUrl
    || vocabulary?.VocabularyImages?.[0]?.imageUrl

  // If server returns a relative path (e.g. "/uploads/.."), prefix with API_URL
  let imgSrc = resolvedImageUrl
  if (imgSrc && !imgSrc.startsWith('http')) {
    imgSrc = `${API_URL}${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`
  }
  return (
    <div className="vocabulary-card-container">
      <div className="progress-indicator">
        <span>{currentIndex + 1} / {total}</span>
      </div>

      <div className={`vocabulary-card ${showAnswer ? 'flipped' : ''}`}>
        <div className="card-front">
          <div className="card-image">
            {!imageError ? (
              <img 
                src={imgSrc} 
                alt={vocabulary.word}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="image-placeholder">🖼️</div>
            )}
          </div>
          <div className="card-content">
            <h2 className="word">{vocabulary.word}</h2>
            <span className="category-badge">{vocabulary.category}</span>
            <button className="reveal-button" onClick={onToggleAnswer}>
              Hiện đáp án
            </button>
          </div>
        </div>

        <div className="card-back">
          <div className="card-image">
            {!imageError ? (
              <img 
                src={imgSrc} 
                alt={vocabulary.word}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="image-placeholder">🖼️</div>
            )}
          </div>
          <div className="card-content">
            <h2 className="word">{vocabulary.word}</h2>
            <h3 className="translation">{vocabulary.translation}</h3>
            {vocabulary.example && (
              <p className="example">
                <strong>Ví dụ:</strong> {vocabulary.example}
              </p>
            )}
            <span className="category-badge">{vocabulary.category}</span>
            <button className="reveal-button" onClick={onToggleAnswer}>
              Ẩn đáp án
            </button>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={onPrevious} className="nav-btn">
          ← Trước
        </button>
        <button onClick={onNext} className="nav-btn">
          Tiếp →
        </button>
      </div>
    </div>
  )
}

export default VocabularyCard
