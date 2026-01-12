import { useState, useEffect } from 'react'
import { getBestJapaneseVoice, speakJapanese } from '../utils/voiceHelper'
import './KanjiLearningPage.css'

function KanjiLearningPage({ onBack, level = 'n5' }) {
  const [selectedKanji, setSelectedKanji] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState(level)
  const [quizMode, setQuizMode] = useState(false)
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 })
  const [masteredKanji, setMasteredKanji] = useState(new Set())
  const [userAnswer, setUserAnswer] = useState('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)
  const [currentVoice, setCurrentVoice] = useState(null)

  // Load giọng đọc khi component mount
  useEffect(() => {
    const loadVoices = () => {
      const voice = getBestJapaneseVoice()
      if (voice) {
        setCurrentVoice(voice)
        setVoiceReady(true)
        console.log('🎤 Giọng đọc Kanji:', voice.name)
      }
    }

    loadVoices()
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  // Sample Kanji data by JLPT level
  const kanjiData = {
    n5: [
      {
        kanji: '一',
        meanings: ['one', 'một'],
        onyomi: ['イチ', 'イツ'],
        kunyomi: ['ひと', 'ひと.つ'],
        strokes: 1,
        mnemonic: '一本の横線 = 数字の1 (One horizontal line = number 1)',
        image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=300',
        examples: [
          { word: '一つ', reading: 'ひとつ', meaning: 'one (thing)' },
          { word: '一人', reading: 'ひとり', meaning: 'one person' },
          { word: '一日', reading: 'いちにち', meaning: 'one day' }
        ]
      },
      {
        kanji: '二',
        meanings: ['two', 'hai'],
        onyomi: ['ニ'],
        kunyomi: ['ふた', 'ふた.つ'],
        strokes: 2,
        mnemonic: '二本の横線 = 数字の2 (Two horizontal lines = number 2)',
        image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=300',
        examples: [
          { word: '二つ', reading: 'ふたつ', meaning: 'two (things)' },
          { word: '二人', reading: 'ふたり', meaning: 'two people' },
          { word: '二月', reading: 'にがつ', meaning: 'February' }
        ]
      },
      {
        kanji: '三',
        meanings: ['three', 'ba'],
        onyomi: ['サン'],
        kunyomi: ['み', 'み.つ', 'みっ.つ'],
        strokes: 3,
        mnemonic: '三本の横線 = 数字の3 (Three horizontal lines = number 3)',
        image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=300',
        examples: [
          { word: '三つ', reading: 'みっつ', meaning: 'three (things)' },
          { word: '三人', reading: 'さんにん', meaning: 'three people' },
          { word: '三月', reading: 'さんがつ', meaning: 'March' }
        ]
      },
      {
        kanji: '日',
        meanings: ['day', 'sun', 'ngày', 'mặt trời'],
        onyomi: ['ニチ', 'ジツ'],
        kunyomi: ['ひ', 'か'],
        strokes: 4,
        mnemonic: '太陽の形 (Shape of the sun)',
        image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=300',
        examples: [
          { word: '今日', reading: 'きょう', meaning: 'today' },
          { word: '毎日', reading: 'まいにち', meaning: 'every day' },
          { word: '日本', reading: 'にほん', meaning: 'Japan' }
        ]
      },
      {
        kanji: '月',
        meanings: ['month', 'moon', 'tháng', 'mặt trăng'],
        onyomi: ['ゲツ', 'ガツ'],
        kunyomi: ['つき'],
        strokes: 4,
        mnemonic: '三日月の形 (Shape of a crescent moon)',
        image: 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=300',
        examples: [
          { word: '一月', reading: 'いちがつ', meaning: 'January' },
          { word: '月曜日', reading: 'げつようび', meaning: 'Monday' },
          { word: '今月', reading: 'こんげつ', meaning: 'this month' }
        ]
      },
      {
        kanji: '人',
        meanings: ['person', 'người'],
        onyomi: ['ジン', 'ニン'],
        kunyomi: ['ひと'],
        strokes: 2,
        mnemonic: '歩いている人の形 (Shape of a person walking)',
        image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300',
        examples: [
          { word: '人', reading: 'ひと', meaning: 'person' },
          { word: '日本人', reading: 'にほんじん', meaning: 'Japanese person' },
          { word: '外国人', reading: 'がいこくじん', meaning: 'foreigner' }
        ]
      },
      {
        kanji: '本',
        meanings: ['book', 'origin', 'sách', 'gốc'],
        onyomi: ['ホン'],
        kunyomi: ['もと'],
        strokes: 5,
        mnemonic: '木の根元 (Root of a tree)',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300',
        examples: [
          { word: '本', reading: 'ほん', meaning: 'book' },
          { word: '日本', reading: 'にほん', meaning: 'Japan' },
          { word: '本当', reading: 'ほんとう', meaning: 'truth, really' }
        ]
      },
      {
        kanji: '学',
        meanings: ['study', 'learning', 'học'],
        onyomi: ['ガク'],
        kunyomi: ['まな.ぶ'],
        strokes: 8,
        mnemonic: '子供が学ぶ (Child learning)',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
        examples: [
          { word: '学校', reading: 'がっこう', meaning: 'school' },
          { word: '学生', reading: 'がくせい', meaning: 'student' },
          { word: '大学', reading: 'だいがく', meaning: 'university' }
        ]
      }
    ],
    n4: [
      {
        kanji: '会',
        meanings: ['meeting', 'gặp gỡ'],
        onyomi: ['カイ', 'エ'],
        kunyomi: ['あ.う'],
        strokes: 6,
        examples: [
          { word: '会社', reading: 'かいしゃ', meaning: 'company' },
          { word: '会議', reading: 'かいぎ', meaning: 'meeting' },
          { word: '会う', reading: 'あう', meaning: 'to meet' }
        ]
      },
      {
        kanji: '社',
        meanings: ['company', 'society', 'công ty'],
        onyomi: ['シャ'],
        kunyomi: ['やしろ'],
        strokes: 7,
        examples: [
          { word: '会社', reading: 'かいしゃ', meaning: 'company' },
          { word: '社会', reading: 'しゃかい', meaning: 'society' },
          { word: '社長', reading: 'しゃちょう', meaning: 'company president' }
        ]
      }
    ],
    n3: [
      {
        kanji: '経',
        meanings: ['pass through', 'experience', 'kinh nghiệm'],
        onyomi: ['ケイ', 'キョウ'],
        kunyomi: ['へ.る'],
        strokes: 11,
        examples: [
          { word: '経済', reading: 'けいざい', meaning: 'economy' },
          { word: '経験', reading: 'けいけん', meaning: 'experience' },
          { word: '経営', reading: 'けいえい', meaning: 'management' }
        ]
      }
    ]
  }

  const allKanji = kanjiData[filterLevel] || kanjiData.n5

  const filteredKanji = allKanji.filter(k => 
    k.kanji.includes(searchTerm) ||
    k.meanings.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
    k.onyomi.some(o => o.includes(searchTerm)) ||
    k.kunyomi.some(k => k.includes(searchTerm))
  )

  const playKanjiAudio = (text) => {
    if (voiceReady && currentVoice) {
      speakJapanese(text, currentVoice, 0.7)
    }
  }

  const handleKanjiClick = (kanji) => {
    setSelectedKanji(kanji)
    setShowAnswer(false)
    setUserAnswer('')
    if (!quizMode && voiceReady && currentVoice) {
      speakJapanese(kanji.kanji, currentVoice, 0.7)
    }
  }

  const startQuiz = () => {
    setQuizMode(true)
    setQuizScore({ correct: 0, total: 0 })
    const randomKanji = allKanji[Math.floor(Math.random() * allKanji.length)]
    setSelectedKanji(randomKanji)
    setShowAnswer(false)
    setUserAnswer('')
  }

  const checkAnswer = () => {
    if (!selectedKanji || !userAnswer.trim()) return
    
    const isCorrect = selectedKanji.meanings.some(m => 
      m.toLowerCase().includes(userAnswer.toLowerCase()) ||
      userAnswer.toLowerCase().includes(m.toLowerCase())
    )
    
    if (isCorrect) {
      setQuizScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }))
      setMasteredKanji(prev => new Set([...prev, selectedKanji.kanji]))
      if (voiceReady && currentVoice) {
        speakJapanese(selectedKanji.kanji, currentVoice, 0.7)
      }
    } else {
      setQuizScore(prev => ({ correct: prev.correct, total: prev.total + 1 }))
    }
    
    setShowAnswer(true)
  }

  const nextQuestion = () => {
    const randomKanji = allKanji[Math.floor(Math.random() * allKanji.length)]
    setSelectedKanji(randomKanji)
    setShowAnswer(false)
    setUserAnswer('')
  }

  return (
    <div className="kanji-learning-page">
      <header className="kanji-header">
        <div className="kanji-header-content">
          <button className="kanji-back-button" onClick={onBack}>
            ← 戻る
          </button>
          <h1 className="kanji-title">漢字学習 (Kanji Learning)</h1>
          <div className="kanji-controls">
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="level-filter"
            >
              <option value="n5">N5 (80 kanji)</option>
              <option value="n4">N4 (170 kanji)</option>
              <option value="n3">N3 (370 kanji)</option>
              <option value="n2">N2 (415 kanji)</option>
              <option value="n1">N1 (1,130 kanji)</option>
            </select>
            <button
              className={`mode-button ${quizMode ? 'active' : ''}`}
              onClick={startQuiz}
            >
              🎯 クイズモード
            </button>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="漢字、意味、読み方で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="kanji-search-input"
          />
        </div>
      </header>

      <main className="kanji-content">
        {quizMode && (
          <div className="quiz-stats-banner">
            <div className="quiz-stat">
              <span className="quiz-stat-label">正解率:</span>
              <span className="quiz-stat-value">
                {quizScore.total > 0 
                  ? `${Math.round((quizScore.correct / quizScore.total) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="quiz-stat">
              <span className="quiz-stat-label">スコア:</span>
              <span className="quiz-stat-value">{quizScore.correct}/{quizScore.total}</span>
            </div>
            <div className="quiz-stat">
              <span className="quiz-stat-label">習得:</span>
              <span className="quiz-stat-value">{masteredKanji.size} 漢字</span>
            </div>
          </div>
        )}
        
        <div className="kanji-grid-container">
          <div className="kanji-stats">
            <div className="stat-card">
              <div className="stat-number">{filteredKanji.length}</div>
              <div className="stat-label">漢字</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{filterLevel.toUpperCase()}</div>
              <div className="stat-label">レベル</div>
            </div>
          </div>

          <div className="kanji-grid">
            {filteredKanji.map((k, index) => (
              <div
                key={index}
                className={`kanji-card ${selectedKanji?.kanji === k.kanji ? 'selected' : ''} ${
                  masteredKanji.has(k.kanji) ? 'mastered' : ''
                }`}
                onClick={() => handleKanjiClick(k)}
              >
                <div className="kanji-char">{k.kanji}</div>
                <div className="kanji-meanings">
                  {k.meanings.slice(0, 2).join(', ')}
                </div>
                <div className="kanji-strokes">{k.strokes} 画</div>
                {masteredKanji.has(k.kanji) && (
                  <div className="mastered-badge">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedKanji && (
          <div className="kanji-detail-panel">
            <div className="detail-header">
              <h2>漢字の詳細</h2>
              <button className="close-button" onClick={() => setSelectedKanji(null)}>
                ✕
              </button>
            </div>

            <div className="detail-main">
              <div className="detail-kanji-display">{selectedKanji.kanji}</div>
              <div className="detail-strokes">{selectedKanji.strokes} 画</div>
            </div>

            <div className="detail-section">
              <h3>意味 (Meanings)</h3>
              <div className="meanings-list">
                {selectedKanji.meanings.map((m, i) => (
                  <span key={i} className="meaning-tag">{m}</span>
                ))}
              </div>
            </div>

            {selectedKanji.mnemonic && (
              <div className="detail-section">
                <h3>💡 覚え方 (Mnemonic)</h3>
                <div className="mnemonic-box">
                  <p className="mnemonic-text">{selectedKanji.mnemonic}</p>
                  {selectedKanji.image && (
                    <img 
                      src={selectedKanji.image} 
                      alt={`Mnemonic for ${selectedKanji.kanji}`}
                      className="mnemonic-image"
                      style={{
                        width: '100%',
                        maxWidth: '250px',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        margin: '1rem auto',
                        display: 'block',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="detail-section">
              <h3>音読み (On-yomi)</h3>
              <div className="readings-list">
                {selectedKanji.onyomi.map((o, i) => (
                  <span key={i} className="reading-tag onyomi">{o}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>訓読み (Kun-yomi)</h3>
              <div className="readings-list">
                {selectedKanji.kunyomi.map((k, i) => (
                  <span key={i} className="reading-tag kunyomi">{k}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>例 (Examples)</h3>
              <div className="examples-list">
                {selectedKanji.examples.map((ex, i) => (
                  <div key={i} className="example-item">
                    <div className="example-word">{ex.word}</div>
                    <div className="example-reading">{ex.reading}</div>
                    <div className="example-meaning">{ex.meaning}</div>
                    <button 
                      className="example-audio-btn"
                      onClick={() => playKanjiAudio(ex.word)}
                      disabled={!voiceReady}
                      title={voiceReady ? '発音を聞く' : '音声を読み込み中...'}
                    >
                      🔊
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {quizMode && (
              <div className="quiz-section">
                <h3>この漢字の意味は？</h3>
                <input
                  type="text"
                  className="quiz-input"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
                  placeholder="意味を入力してください"
                  disabled={showAnswer}
                />
                {!showAnswer ? (
                  <button className="quiz-submit-btn" onClick={checkAnswer}>
                    確認
                  </button>
                ) : (
                  <div className="quiz-result">
                    <div className={`quiz-feedback ${
                      selectedKanji.meanings.some(m => 
                        m.toLowerCase().includes(userAnswer.toLowerCase())
                      ) ? 'correct' : 'incorrect'
                    }`}>
                      {selectedKanji.meanings.some(m => 
                        m.toLowerCase().includes(userAnswer.toLowerCase())
                      ) ? '正解！' : `不正解。正しい答え: ${selectedKanji.meanings.join(', ')}`}
                    </div>
                    <button className="next-question-btn" onClick={nextQuestion}>
                      次の問題 →
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="detail-section">
              <h3>書き順 (Stroke Order)</h3>
              <div className="stroke-order-display">
                <div className="stroke-placeholder">{selectedKanji.kanji}</div>
                <p className="stroke-note">書き順アニメーションは後で追加されます</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default KanjiLearningPage
