import { useState } from 'react'
import './ExercisePage.css'

function JLPTExercisePage({ onBack, level, user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState(level || 'n5')

  // Level display names
  const levelNames = {
    n5: 'N5 (初級)',
    n4: 'N4 (初中級)',
    n3: 'N3 (中級)',
    n2: 'N2 (中上級)',
    n1: 'N1 (上級)'
  }

  // Get questions based on level
  const getQuestionsByLevel = () => {
    const questionBank = {
      n5: [
        {
          id: 1,
          type: 'Hiragana',
          question: '次のひらがなの読み方として正しいものを選びなさい。',
          kanji: 'あ',
          options: [
            'a',
            'i',
            'u',
            'e'
          ],
          correctAnswer: 0,
          explanation: '「あ」は「a」と読みます。ひらがなの最初の文字です。'
        },
        {
          id: 2,
          type: 'Vocabulary',
          question: '「こんにちは」の意味として正しいものを選びなさい。',
          options: [
            'Good morning',
            'Hello / Good afternoon',
            'Good night',
            'Goodbye'
          ],
          correctAnswer: 1,
          explanation: '「こんにちは」は昼間の挨拶で、「Hello」や「Good afternoon」の意味です。'
        },
        {
          id: 3,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な助詞を選びなさい。\n私（　）学生です。',
          options: [
            'は',
            'が',
            'を',
            'に'
          ],
          correctAnswer: 0,
          explanation: '「〜は」は主題を表す助詞です。「私は学生です」という意味になります。'
        },
        {
          id: 4,
          type: 'Kanji',
          question: '次の漢字の読み方として最も適当なものを選びなさい。',
          kanji: '一',
          options: [
            'いち',
            'に',
            'さん',
            'よん'
          ],
          correctAnswer: 0,
          explanation: '「一」は「いち」と読みます。数字の「1」を表す漢字です。'
        },
        {
          id: 5,
          type: 'Vocabulary',
          question: '「ありがとう」の意味として正しいものを選びなさい。',
          options: [
            'Sorry',
            'Thank you',
            'Excuse me',
            'Please'
          ],
          correctAnswer: 1,
          explanation: '「ありがとう」は「Thank you」の意味で、感謝を表す言葉です。'
        }
      ],
      n4: [
        {
          id: 1,
          type: 'Kanji',
          question: '次の漢字の読み方として最も適当なものを選びなさい。',
          kanji: '学校',
          options: [
            'がっこう',
            'がくこう',
            'がっこ',
            'がくこ'
          ],
          correctAnswer: 0,
          explanation: '「学校」は「がっこう」と読みます。「学」は音読みで「がく」、「校」は「こう」ですが、連濁により「がっこう」となります。'
        },
        {
          id: 2,
          type: 'Vocabulary',
          question: '次の文の（　）に入る最も適当な言葉を選びなさい。\n毎朝、公園で（　）をします。',
          options: [
            'ジョギング',
            'スイミング',
            'クッキング',
            'ショッピング'
          ],
          correctAnswer: 0,
          explanation: '公園で行う運動として最も適切なのは「ジョギング」です。'
        },
        {
          id: 3,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な助詞を選びなさい。\n友達（　）映画を見に行きました。',
          options: [
            'と',
            'に',
            'で',
            'を'
          ],
          correctAnswer: 0,
          explanation: '「〜と」は一緒に行動する相手を表す助詞です。'
        },
        {
          id: 4,
          type: 'Reading',
          question: '次の文章の内容として正しいものを選びなさい。',
          passage: '昨日、友達と買い物に行きました。新しい服を買いました。とても楽しかったです。',
          options: [
            '一人で買い物に行った',
            '友達と買い物に行った',
            '服を買わなかった',
            '楽しくなかった'
          ],
          correctAnswer: 1,
          explanation: '文章では「友達と買い物に行きました」と明確に述べられています。'
        },
        {
          id: 5,
          type: 'Vocabulary',
          question: '「便利」の意味として最も適当なものを選びなさい。',
          options: [
            'Inconvenient',
            'Convenient',
            'Expensive',
            'Cheap'
          ],
          correctAnswer: 1,
          explanation: '「便利」は「Convenient」の意味で、使いやすい、都合が良いという意味です。'
        }
      ],
      n3: [
        {
          id: 1,
          type: 'Kanji',
          question: '次の漢字の読み方として最も適当なものを選びなさい。',
          kanji: '経済',
          options: [
            'けいざい',
            'きょうざい',
            'けいさい',
            'きょうさい'
          ],
          correctAnswer: 0,
          explanation: '「経済」は「けいざい」と読みます。経済活動や経済学を表す言葉です。'
        },
        {
          id: 2,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な表現を選びなさい。\n雨が降りそうだから、傘を（　）。',
          options: [
            '持っていく',
            '持っている',
            '持ってくる',
            '持っていた'
          ],
          correctAnswer: 0,
          explanation: '「持っていく」は話し手から離れる方向への移動を表します。'
        },
        {
          id: 3,
          type: 'Reading',
          question: '次の文章の内容として正しいものを選びなさい。',
          passage: '日本の四季は美しいです。春には桜が咲き、夏は海で泳ぎ、秋は紅葉を楽しみ、冬は雪で遊びます。',
          options: [
            '日本には二つの季節があります',
            '春には紅葉が見られます',
            '日本の四季はそれぞれ特徴があります',
            '冬には桜が咲きます'
          ],
          correctAnswer: 2,
          explanation: '文章では春夏秋冬それぞれの特徴が述べられています。'
        },
        {
          id: 4,
          type: 'Vocabulary',
          question: '「実施する」の意味として最も適当なものを選びなさい。',
          options: [
            'To plan',
            'To implement / carry out',
            'To cancel',
            'To postpone'
          ],
          correctAnswer: 1,
          explanation: '「実施する」は計画などを実際に行うことを意味します。'
        },
        {
          id: 5,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な表現を選びなさい。\n彼は日本語が話せる（　）、漢字も読めます。',
          options: [
            'だけでなく',
            'しかし',
            'それで',
            'または'
          ],
          correctAnswer: 0,
          explanation: '「〜だけでなく」は「not only... but also」の意味で、追加の情報を表します。'
        }
      ],
      n2: [
        {
          id: 1,
          type: 'Kanji',
          question: '次の漢字の読み方として最も適当なものを選びなさい。',
          kanji: '環境',
          options: [
            'かんきょう',
            'かんけい',
            'げんきょう',
            'げんけい'
          ],
          correctAnswer: 0,
          explanation: '「環境」は「かんきょう」と読みます。周囲の状況や自然環境を表す言葉です。'
        },
        {
          id: 2,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な表現を選びなさい。\n彼は忙しい（　）、毎日運動している。',
          options: [
            'にもかかわらず',
            'おかげで',
            'ために',
            'ように'
          ],
          correctAnswer: 0,
          explanation: '「〜にもかかわらず」は逆接を表し、「despite」の意味です。'
        },
        {
          id: 3,
          type: 'Reading',
          question: '次の文章から筆者の意見として最も適当なものを選びなさい。',
          passage: '技術の発展により、私たちの生活は便利になった。しかし、人と人とのコミュニケーションが減少しているという問題もある。技術と人間関係のバランスを考える必要がある。',
          options: [
            '技術の発展は完全に良いことだ',
            '技術は使うべきではない',
            '技術と人間関係のバランスが重要だ',
            'コミュニケーションは不要だ'
          ],
          correctAnswer: 2,
          explanation: '筆者は技術の利点と問題点を述べた上で、バランスの必要性を主張しています。'
        },
        {
          id: 4,
          type: 'Vocabulary',
          question: '「促進する」の意味として最も適当なものを選びなさい。',
          options: [
            'To prevent',
            'To promote / facilitate',
            'To delay',
            'To ignore'
          ],
          correctAnswer: 1,
          explanation: '「促進する」は物事の進行を早めたり、発展を助けることを意味します。'
        },
        {
          id: 5,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な表現を選びなさい。\n彼女は医者になる（　）、毎日勉強している。',
          options: [
            'べく',
            'まい',
            'っぽい',
            'がち'
          ],
          correctAnswer: 0,
          explanation: '「〜べく」は目的を表し、「in order to」の意味です。'
        }
      ],
      n1: [
        {
          id: 1,
          type: 'Kanji',
          question: '次の漢字の読み方として最も適当なものを選びなさい。',
          kanji: '顕著',
          options: [
            'けんちょ',
            'けんじょ',
            'げんちょ',
            'げんじょ'
          ],
          correctAnswer: 0,
          explanation: '「顕著」は「けんちょ」と読みます。明らかで目立つという意味です。'
        },
        {
          id: 2,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な表現を選びなさい。\n彼の努力（　）、プロジェクトは成功した。',
          options: [
            'あっての',
            'あっても',
            'あれば',
            'あるから'
          ],
          correctAnswer: 0,
          explanation: '「〜あっての」は「〜があってこそ」という意味で、不可欠な条件を表します。'
        },
        {
          id: 3,
          type: 'Reading',
          question: '次の文章における筆者の主張として最も適当なものを選びなさい。',
          passage: 'グローバル化が進む現代において、異文化理解は単なる知識の習得にとどまらず、多様な価値観を尊重し、共存する姿勢が求められる。表面的な理解ではなく、深層的な文化の本質を理解することが重要である。',
          options: [
            '異文化理解は知識だけで十分だ',
            '表面的な理解で問題ない',
            '深層的な文化理解と共存の姿勢が必要だ',
            'グローバル化は不要だ'
          ],
          correctAnswer: 2,
          explanation: '筆者は表面的な理解を超えた深層的な文化理解と共存の姿勢の重要性を主張しています。'
        },
        {
          id: 4,
          type: 'Vocabulary',
          question: '「顕在化する」の意味として最も適当なものを選びなさい。',
          options: [
            'To hide',
            'To become apparent / manifest',
            'To disappear',
            'To ignore'
          ],
          correctAnswer: 1,
          explanation: '「顕在化する」は隠れていたものが明らかになることを意味します。'
        },
        {
          id: 5,
          type: 'Grammar',
          question: '次の文の（　）に入る最も適当な表現を選びなさい。\n彼は優秀である（　）、謙虚な性格だ。',
          options: [
            'にして',
            'として',
            'ばかりに',
            'ものの'
          ],
          correctAnswer: 0,
          explanation: '「〜にして」は「〜でありながら」という意味で、両立する性質を表します。'
        }
      ]
    }

    return questionBank[selectedLevel] || questionBank.n5
  }

  const questions = getQuestionsByLevel()

  const handleLevelChange = (newLevel) => {
    setSelectedLevel(newLevel)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setShowFeedback(false)
    setShowResults(false)
    setScore(0)
  }

  const handleAnswerSelect = (index) => {
    if (!showFeedback) {
      setSelectedAnswer(index)
    }
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return

    setShowFeedback(true)
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = {
      selected: selectedAnswer,
      correct: isCorrect
    }
    setUserAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(userAnswers[currentQuestion + 1]?.selected ?? null)
      setShowFeedback(userAnswers[currentQuestion + 1] !== undefined)
    } else {
      setShowResults(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(userAnswers[currentQuestion - 1]?.selected ?? null)
      setShowFeedback(userAnswers[currentQuestion - 1] !== undefined)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setShowFeedback(false)
    setShowResults(false)
    setScore(0)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const isCorrect = selectedAnswer === currentQ.correctAnswer

  return (
    <div className="exercise-page jlpt-theme">
      <header className="exercise-header">
        <div className="header-top">
          <div className="header-left">
            <button className="exercise-back-button" onClick={onBack}>
              ← 戻る
            </button>
            <h1 className="exercise-title">🇯🇵 JLPT 練習問題</h1>
          </div>
          <div className="header-stats">
            <div className="level-selector">
              <select 
                value={selectedLevel} 
                onChange={(e) => handleLevelChange(e.target.value)}
                className="level-select jlpt-select"
              >
                <option value="n5">N5 (初級)</option>
                <option value="n4">N4 (初中級)</option>
                <option value="n3">N3 (中級)</option>
                <option value="n2">N2 (中上級)</option>
                <option value="n1">N1 (上級)</option>
              </select>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📝</span>
              <span>{currentQuestion + 1}/{questions.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <span>{score} 正解</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <span>{Math.round((score / (currentQuestion + 1)) * 100)}%</span>
            </div>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </header>

      <main className="exercise-content">
        <div className="exercise-card">
          <div className="question-header">
            <span className="question-number">問題 {currentQuestion + 1}</span>
            <span className="question-type">{currentQ.type}</span>
          </div>

          <div className="question-content">
            <h3 className="question-text">{currentQ.question}</h3>

            {currentQ.kanji && (
              <div style={{
                fontSize: '3rem',
                textAlign: 'center',
                padding: '2rem',
                background: '#f7fafc',
                borderRadius: '12px',
                margin: '1.5rem 0',
                color: '#2d3748',
                fontWeight: 'bold'
              }}>
                {currentQ.kanji}
              </div>
            )}

            {currentQ.sentence && (
              <div style={{
                fontSize: '1.5rem',
                textAlign: 'center',
                padding: '1.5rem',
                background: '#f7fafc',
                borderRadius: '12px',
                margin: '1.5rem 0',
                color: '#2d3748',
                lineHeight: '2'
              }}>
                {currentQ.sentence}
              </div>
            )}

            {currentQ.passage && (
              <div style={{
                background: '#f7fafc',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #e74c3c'
              }}>
                <p style={{ color: '#4a5568', lineHeight: '2', margin: 0, fontSize: '1.1rem' }}>
                  {currentQ.passage}
                </p>
              </div>
            )}

            {currentQ.audioUrl && (
              <div className="question-audio">
                <button className="audio-button" style={{ background: '#e74c3c' }}>
                  ▶️
                </button>
                <div className="audio-info">
                  <div className="audio-title">音声を聞いてください</div>
                  <div className="audio-duration">時間: {currentQ.audioDuration}</div>
                  {currentQ.audioText && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#718096' }}>
                      {currentQ.audioText}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="answer-options">
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className={`answer-option ${
                    selectedAnswer === index ? 'selected' : ''
                  } ${
                    showFeedback && index === currentQ.correctAnswer ? 'correct' : ''
                  } ${
                    showFeedback && selectedAnswer === index && !isCorrect ? 'incorrect' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="option-letter">
                    {index + 1}
                  </div>
                  <div className="option-text">{option}</div>
                </div>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div className={`feedback-section ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="feedback-header">
                <span className="feedback-icon">{isCorrect ? '✅' : '❌'}</span>
                <h3 className="feedback-title">
                  {isCorrect ? '正解！' : '不正解'}
                </h3>
              </div>
              <p className="feedback-text">{currentQ.explanation}</p>
            </div>
          )}

          <div className="action-buttons">
            {currentQuestion > 0 && (
              <button className="btn btn-secondary" onClick={handlePreviousQuestion}>
                ← 前へ
              </button>
            )}
            {!showFeedback ? (
              <button
                className="btn btn-primary"
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                答えを確認
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? '次へ →' : '結果を見る'}
              </button>
            )}
          </div>
        </div>
      </main>

      {showResults && (
        <div className="results-overlay" onClick={() => setShowResults(false)}>
          <div className="results-modal" onClick={(e) => e.stopPropagation()}>
            <div className="results-icon">
              {score / questions.length >= 0.8 ? '🎉' : score / questions.length >= 0.6 ? '👍' : '💪'}
            </div>
            <h2 className="results-title">練習完了！</h2>
            <div className="results-score">
              {score}/{questions.length}
            </div>
            <div className="results-stats">
              <div className="result-stat">
                <div className="result-stat-value">{score}</div>
                <div className="result-stat-label">正解</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-value">{questions.length - score}</div>
                <div className="result-stat-label">不正解</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-value">{Math.round((score / questions.length) * 100)}%</div>
                <div className="result-stat-label">スコア</div>
              </div>
            </div>
            <div className="results-actions">
              <button className="btn btn-secondary" onClick={onBack}>
                ロードマップに戻る
              </button>
              <button className="btn btn-primary" onClick={handleRetry}>
                もう一度
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JLPTExercisePage
