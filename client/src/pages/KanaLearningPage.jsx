import { useState } from 'react'
import './KanaLearningPage.css'

function KanaLearningPage({ onBack, type = 'hiragana' }) {
  const [selectedChar, setSelectedChar] = useState(null)
  const [showRomaji, setShowRomaji] = useState(true)
  const [practiceMode, setPracticeMode] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState(null)

  // Hiragana chart
  const hiraganaChart = {
    'あ行': [
      { kana: 'あ', romaji: 'a', audio: '/audio/a.mp3' },
      { kana: 'い', romaji: 'i', audio: '/audio/i.mp3' },
      { kana: 'う', romaji: 'u', audio: '/audio/u.mp3' },
      { kana: 'え', romaji: 'e', audio: '/audio/e.mp3' },
      { kana: 'お', romaji: 'o', audio: '/audio/o.mp3' }
    ],
    'か行': [
      { kana: 'か', romaji: 'ka', audio: '/audio/ka.mp3' },
      { kana: 'き', romaji: 'ki', audio: '/audio/ki.mp3' },
      { kana: 'く', romaji: 'ku', audio: '/audio/ku.mp3' },
      { kana: 'け', romaji: 'ke', audio: '/audio/ke.mp3' },
      { kana: 'こ', romaji: 'ko', audio: '/audio/ko.mp3' }
    ],
    'さ行': [
      { kana: 'さ', romaji: 'sa', audio: '/audio/sa.mp3' },
      { kana: 'し', romaji: 'shi', audio: '/audio/shi.mp3' },
      { kana: 'す', romaji: 'su', audio: '/audio/su.mp3' },
      { kana: 'せ', romaji: 'se', audio: '/audio/se.mp3' },
      { kana: 'そ', romaji: 'so', audio: '/audio/so.mp3' }
    ],
    'た行': [
      { kana: 'た', romaji: 'ta', audio: '/audio/ta.mp3' },
      { kana: 'ち', romaji: 'chi', audio: '/audio/chi.mp3' },
      { kana: 'つ', romaji: 'tsu', audio: '/audio/tsu.mp3' },
      { kana: 'て', romaji: 'te', audio: '/audio/te.mp3' },
      { kana: 'と', romaji: 'to', audio: '/audio/to.mp3' }
    ],
    'な行': [
      { kana: 'な', romaji: 'na', audio: '/audio/na.mp3' },
      { kana: 'に', romaji: 'ni', audio: '/audio/ni.mp3' },
      { kana: 'ぬ', romaji: 'nu', audio: '/audio/nu.mp3' },
      { kana: 'ね', romaji: 'ne', audio: '/audio/ne.mp3' },
      { kana: 'の', romaji: 'no', audio: '/audio/no.mp3' }
    ],
    'は行': [
      { kana: 'は', romaji: 'ha', audio: '/audio/ha.mp3' },
      { kana: 'ひ', romaji: 'hi', audio: '/audio/hi.mp3' },
      { kana: 'ふ', romaji: 'fu', audio: '/audio/fu.mp3' },
      { kana: 'へ', romaji: 'he', audio: '/audio/he.mp3' },
      { kana: 'ほ', romaji: 'ho', audio: '/audio/ho.mp3' }
    ],
    'ま行': [
      { kana: 'ま', romaji: 'ma', audio: '/audio/ma.mp3' },
      { kana: 'み', romaji: 'mi', audio: '/audio/mi.mp3' },
      { kana: 'む', romaji: 'mu', audio: '/audio/mu.mp3' },
      { kana: 'め', romaji: 'me', audio: '/audio/me.mp3' },
      { kana: 'も', romaji: 'mo', audio: '/audio/mo.mp3' }
    ],
    'や行': [
      { kana: 'や', romaji: 'ya', audio: '/audio/ya.mp3' },
      { kana: '', romaji: '', audio: '' },
      { kana: 'ゆ', romaji: 'yu', audio: '/audio/yu.mp3' },
      { kana: '', romaji: '', audio: '' },
      { kana: 'よ', romaji: 'yo', audio: '/audio/yo.mp3' }
    ],
    'ら行': [
      { kana: 'ら', romaji: 'ra', audio: '/audio/ra.mp3' },
      { kana: 'り', romaji: 'ri', audio: '/audio/ri.mp3' },
      { kana: 'る', romaji: 'ru', audio: '/audio/ru.mp3' },
      { kana: 'れ', romaji: 're', audio: '/audio/re.mp3' },
      { kana: 'ろ', romaji: 'ro', audio: '/audio/ro.mp3' }
    ],
    'わ行': [
      { kana: 'わ', romaji: 'wa', audio: '/audio/wa.mp3' },
      { kana: '', romaji: '', audio: '' },
      { kana: '', romaji: '', audio: '' },
      { kana: '', romaji: '', audio: '' },
      { kana: 'を', romaji: 'wo', audio: '/audio/wo.mp3' }
    ],
    'ん': [
      { kana: 'ん', romaji: 'n', audio: '/audio/n.mp3' }
    ]
  }

  // Katakana chart
  const katakanaChart = {
    'ア行': [
      { kana: 'ア', romaji: 'a', audio: '/audio/a.mp3' },
      { kana: 'イ', romaji: 'i', audio: '/audio/i.mp3' },
      { kana: 'ウ', romaji: 'u', audio: '/audio/u.mp3' },
      { kana: 'エ', romaji: 'e', audio: '/audio/e.mp3' },
      { kana: 'オ', romaji: 'o', audio: '/audio/o.mp3' }
    ],
    'カ行': [
      { kana: 'カ', romaji: 'ka', audio: '/audio/ka.mp3' },
      { kana: 'キ', romaji: 'ki', audio: '/audio/ki.mp3' },
      { kana: 'ク', romaji: 'ku', audio: '/audio/ku.mp3' },
      { kana: 'ケ', romaji: 'ke', audio: '/audio/ke.mp3' },
      { kana: 'コ', romaji: 'ko', audio: '/audio/ko.mp3' }
    ],
    'サ行': [
      { kana: 'サ', romaji: 'sa', audio: '/audio/sa.mp3' },
      { kana: 'シ', romaji: 'shi', audio: '/audio/shi.mp3' },
      { kana: 'ス', romaji: 'su', audio: '/audio/su.mp3' },
      { kana: 'セ', romaji: 'se', audio: '/audio/se.mp3' },
      { kana: 'ソ', romaji: 'so', audio: '/audio/so.mp3' }
    ],
    'タ行': [
      { kana: 'タ', romaji: 'ta', audio: '/audio/ta.mp3' },
      { kana: 'チ', romaji: 'chi', audio: '/audio/chi.mp3' },
      { kana: 'ツ', romaji: 'tsu', audio: '/audio/tsu.mp3' },
      { kana: 'テ', romaji: 'te', audio: '/audio/te.mp3' },
      { kana: 'ト', romaji: 'to', audio: '/audio/to.mp3' }
    ],
    'ナ行': [
      { kana: 'ナ', romaji: 'na', audio: '/audio/na.mp3' },
      { kana: 'ニ', romaji: 'ni', audio: '/audio/ni.mp3' },
      { kana: 'ヌ', romaji: 'nu', audio: '/audio/nu.mp3' },
      { kana: 'ネ', romaji: 'ne', audio: '/audio/ne.mp3' },
      { kana: 'ノ', romaji: 'no', audio: '/audio/no.mp3' }
    ],
    'ハ行': [
      { kana: 'ハ', romaji: 'ha', audio: '/audio/ha.mp3' },
      { kana: 'ヒ', romaji: 'hi', audio: '/audio/hi.mp3' },
      { kana: 'フ', romaji: 'fu', audio: '/audio/fu.mp3' },
      { kana: 'ヘ', romaji: 'he', audio: '/audio/he.mp3' },
      { kana: 'ホ', romaji: 'ho', audio: '/audio/ho.mp3' }
    ],
    'マ行': [
      { kana: 'マ', romaji: 'ma', audio: '/audio/ma.mp3' },
      { kana: 'ミ', romaji: 'mi', audio: '/audio/mi.mp3' },
      { kana: 'ム', romaji: 'mu', audio: '/audio/mu.mp3' },
      { kana: 'メ', romaji: 'me', audio: '/audio/me.mp3' },
      { kana: 'モ', romaji: 'mo', audio: '/audio/mo.mp3' }
    ],
    'ヤ行': [
      { kana: 'ヤ', romaji: 'ya', audio: '/audio/ya.mp3' },
      { kana: '', romaji: '', audio: '' },
      { kana: 'ユ', romaji: 'yu', audio: '/audio/yu.mp3' },
      { kana: '', romaji: '', audio: '' },
      { kana: 'ヨ', romaji: 'yo', audio: '/audio/yo.mp3' }
    ],
    'ラ行': [
      { kana: 'ラ', romaji: 'ra', audio: '/audio/ra.mp3' },
      { kana: 'リ', romaji: 'ri', audio: '/audio/ri.mp3' },
      { kana: 'ル', romaji: 'ru', audio: '/audio/ru.mp3' },
      { kana: 'レ', romaji: 're', audio: '/audio/re.mp3' },
      { kana: 'ロ', romaji: 'ro', audio: '/audio/ro.mp3' }
    ],
    'ワ行': [
      { kana: 'ワ', romaji: 'wa', audio: '/audio/wa.mp3' },
      { kana: '', romaji: '', audio: '' },
      { kana: '', romaji: '', audio: '' },
      { kana: '', romaji: '', audio: '' },
      { kana: 'ヲ', romaji: 'wo', audio: '/audio/wo.mp3' }
    ],
    'ン': [
      { kana: 'ン', romaji: 'n', audio: '/audio/n.mp3' }
    ]
  }

  const chart = type === 'hiragana' ? hiraganaChart : katakanaChart

  const handleCharClick = (char) => {
    setSelectedChar(char)
    setUserInput('')
    setFeedback(null)
  }

  const handlePracticeSubmit = () => {
    if (!selectedChar) return

    if (userInput.toLowerCase() === selectedChar.romaji.toLowerCase()) {
      setFeedback({ type: 'correct', message: '正解！' })
    } else {
      setFeedback({ 
        type: 'incorrect', 
        message: `不正解。正しい答えは「${selectedChar.romaji}」です。` 
      })
    }
  }

  return (
    <div className="kana-learning-page">
      <header className="kana-header">
        <div className="kana-header-content">
          <button className="kana-back-button" onClick={onBack}>
            ← 戻る
          </button>
          <h1 className="kana-title">
            {type === 'hiragana' ? 'ひらがな (Hiragana)' : 'カタカナ (Katakana)'}
          </h1>
          <div className="kana-controls">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showRomaji}
                onChange={(e) => setShowRomaji(e.target.checked)}
              />
              <span>ローマ字を表示</span>
            </label>
            <button
              className={`mode-button ${practiceMode ? 'active' : ''}`}
              onClick={() => setPracticeMode(!practiceMode)}
            >
              {practiceMode ? '📝 練習モード' : '📖 学習モード'}
            </button>
          </div>
        </div>
      </header>

      <main className="kana-content">
        <div className="kana-chart-container">
          <div className="kana-chart">
            {Object.entries(chart).map(([row, chars]) => (
              <div key={row} className="kana-row">
                <div className="row-label">{row}</div>
                <div className="row-chars">
                  {chars.map((char, index) => (
                    <div
                      key={index}
                      className={`kana-cell ${!char.kana ? 'empty' : ''} ${
                        selectedChar?.kana === char.kana ? 'selected' : ''
                      }`}
                      onClick={() => char.kana && handleCharClick(char)}
                    >
                      {char.kana && (
                        <>
                          <div className="kana-char">{char.kana}</div>
                          {showRomaji && !practiceMode && (
                            <div className="kana-romaji">{char.romaji}</div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedChar && (
            <div className="kana-detail-card">
              <div className="detail-header">
                <h2>文字の詳細</h2>
                <button className="close-button" onClick={() => setSelectedChar(null)}>
                  ✕
                </button>
              </div>
              
              <div className="detail-content">
                <div className="detail-kana">{selectedChar.kana}</div>
                <div className="detail-romaji">{selectedChar.romaji}</div>
                
                <button className="audio-play-button">
                  🔊 発音を聞く
                </button>

                {practiceMode && (
                  <div className="practice-section">
                    <h3>この文字のローマ字を入力してください：</h3>
                    <input
                      type="text"
                      className="practice-input"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handlePracticeSubmit()}
                      placeholder="ローマ字を入力"
                      autoFocus
                    />
                    <button className="practice-submit" onClick={handlePracticeSubmit}>
                      確認
                    </button>

                    {feedback && (
                      <div className={`practice-feedback ${feedback.type}`}>
                        {feedback.message}
                      </div>
                    )}
                  </div>
                )}

                <div className="writing-guide">
                  <h3>書き順</h3>
                  <div className="stroke-order">
                    <div className="stroke-placeholder">
                      {selectedChar.kana}
                    </div>
                    <p className="stroke-note">
                      書き順の画像は後で追加されます
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="kana-tips">
          <h3>💡 学習のヒント</h3>
          <ul>
            <li>毎日少しずつ練習しましょう</li>
            <li>声に出して読む練習をしましょう</li>
            <li>書く練習も忘れずに</li>
            <li>似ている文字に注意しましょう</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default KanaLearningPage
