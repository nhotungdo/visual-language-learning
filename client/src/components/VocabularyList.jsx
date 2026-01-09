import { useState } from 'react'
import './VocabularyList.css'

function VocabularyList({ vocabularies, onDelete, onRefresh }) {
  const [filter, setFilter] = useState('all')

  const categories = ['all', ...new Set(vocabularies.map(v => v.category))]
  
  const filteredVocabularies = filter === 'all' 
    ? vocabularies 
    : vocabularies.filter(v => v.category === filter)

  return (
    <div className="vocabulary-list-container">
      <div className="list-header">
        <h2>Danh sách từ vựng ({filteredVocabularies.length})</h2>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={filter === category ? 'active' : ''}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'Tất cả' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="vocabulary-grid">
        {filteredVocabularies.map(vocab => (
          <div key={vocab.id} className="vocabulary-item">
            <div className="vocab-image">
              <img src={vocab.imageUrl} alt={vocab.word} />
            </div>
            <div className="vocab-info">
              <h3>{vocab.word}</h3>
              <p className="vocab-translation">{vocab.translation}</p>
              {vocab.example && (
                <p className="vocab-example">{vocab.example}</p>
              )}
              <span className="vocab-category">{vocab.category}</span>
            </div>
            <button 
              className="delete-btn"
              onClick={() => {
                if (window.confirm(`Xóa từ "${vocab.word}"?`)) {
                  onDelete(vocab.id)
                }
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VocabularyList
