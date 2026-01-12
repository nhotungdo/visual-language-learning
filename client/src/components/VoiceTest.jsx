import { useState, useEffect } from 'react'
import { getBestJapaneseVoice, getAllJapaneseVoices, speakJapanese } from '../utils/voiceHelper'

/**
 * Component test giọng đọc tiếng Nhật
 * Sử dụng để debug và kiểm tra giọng có sẵn
 */
function VoiceTest() {
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [testText, setTestText] = useState('こんにちは')
  const [rate, setRate] = useState(0.75)

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = getAllJapaneseVoices()
      setVoices(allVoices)
      
      const bestVoice = getBestJapaneseVoice()
      if (bestVoice) {
        setSelectedVoice(bestVoice)
      }
    }

    loadVoices()
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const handleTest = () => {
    if (selectedVoice) {
      speakJapanese(testText, selectedVoice, rate)
    }
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2>🎤 Test giọng đọc tiếng Nhật</h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h3>Giọng có sẵn ({voices.length})</h3>
        <select 
          value={selectedVoice?.name || ''}
          onChange={(e) => {
            const voice = voices.find(v => v.name === e.target.value)
            setSelectedVoice(voice)
          }}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '2px solid #e2e8f0'
          }}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3>Văn bản test</h3>
        <input
          type="text"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Nhập văn bản tiếng Nhật..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: '2px solid #e2e8f0'
          }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#718096' }}>
          Ví dụ: こんにちは、ありがとう、日本語、一二三
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3>Tốc độ: {rate}x</h3>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <button
        onClick={handleTest}
        disabled={!selectedVoice}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          background: selectedVoice ? '#e74c3c' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: selectedVoice ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease'
        }}
      >
        🔊 Phát âm
      </button>

      {selectedVoice && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f7fafc',
          borderRadius: '8px',
          borderLeft: '4px solid #e74c3c'
        }}>
          <h4>Thông tin giọng đang chọn:</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><strong>Tên:</strong> {selectedVoice.name}</li>
            <li><strong>Ngôn ngữ:</strong> {selectedVoice.lang}</li>
            <li><strong>Local:</strong> {selectedVoice.localService ? 'Có' : 'Không (Online)'}</li>
            <li><strong>Mặc định:</strong> {selectedVoice.default ? 'Có' : 'Không'}</li>
          </ul>
        </div>
      )}

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#fff5e6',
        borderRadius: '8px',
        fontSize: '0.9rem'
      }}>
        <h4>💡 Gợi ý:</h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>Giọng tốt nhất: Google 日本語 (Chrome), Kyoko (Safari/Mac)</li>
          <li>Nếu không có giọng tiếng Nhật, cài đặt trong System Settings</li>
          <li>Tốc độ khuyến nghị: 0.7-0.8x cho người mới học</li>
        </ul>
      </div>
    </div>
  )
}

export default VoiceTest
