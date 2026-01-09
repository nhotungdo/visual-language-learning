import { useState } from 'react'
import './AddVocabulary.css'

function AddVocabulary({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    word: '',
    translation: '',
    imageUrl: '',
    example: '',
    category: 'General'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.word && formData.translation && formData.imageUrl) {
      onAdd(formData)
      setFormData({
        word: '',
        translation: '',
        imageUrl: '',
        example: '',
        category: 'General'
      })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="add-vocabulary-container">
      <h2>Thêm từ vựng mới</h2>
      <form onSubmit={handleSubmit} className="add-vocabulary-form">
        <div className="form-group">
          <label htmlFor="word">Từ tiếng Anh *</label>
          <input
            type="text"
            id="word"
            name="word"
            value={formData.word}
            onChange={handleChange}
            placeholder="Ví dụ: Apple"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="translation">Nghĩa tiếng Việt *</label>
          <input
            type="text"
            id="translation"
            name="translation"
            value={formData.translation}
            onChange={handleChange}
            placeholder="Ví dụ: Táo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL hình ảnh *</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.imageUrl && (
            <div className="image-preview">
              <img src={formData.imageUrl} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="example">Câu ví dụ</label>
          <textarea
            id="example"
            name="example"
            value={formData.example}
            onChange={handleChange}
            placeholder="Ví dụ: I eat an apple every day."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Fruits">Fruits</option>
            <option value="Animals">Animals</option>
            <option value="Education">Education</option>
            <option value="Transportation">Transportation</option>
            <option value="Buildings">Buildings</option>
            <option value="Food">Food</option>
            <option value="Nature">Nature</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Hủy
          </button>
          <button type="submit" className="submit-btn">
            Thêm từ vựng
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddVocabulary
