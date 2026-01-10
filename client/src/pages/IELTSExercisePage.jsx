import { useState, useEffect } from 'react'
import './ExercisePage.css'

function IELTSExercisePage({ onBack, level, user }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState(level || 'intermediate')

  // Level display names
  const levelNames = {
    beginner: 'Beginner (3.0-4.5)',
    intermediate: 'Intermediate (5.0-6.0)',
    advanced: 'Advanced (6.5-7.5)',
    expert: 'Expert (8.0-9.0)'
  }

  // Get questions based on level
  const getQuestionsByLevel = () => {
    const questionBank = {
      beginner: [
        {
          id: 1,
          type: 'Vocabulary',
          question: 'What does "happy" mean?',
          options: [
            'Sad',
            'Joyful',
            'Angry',
            'Tired'
          ],
          correctAnswer: 1,
          explanation: '"Happy" means feeling or showing pleasure or contentment, which is the same as "joyful".'
        },
        {
          id: 2,
          type: 'Grammar',
          question: 'Choose the correct sentence:',
          options: [
            'She go to school every day.',
            'She goes to school every day.',
            'She going to school every day.',
            'She gone to school every day.'
          ],
          correctAnswer: 1,
          explanation: 'With third person singular (she/he/it) in present simple, we add "s" to the verb: "goes".'
        },
        {
          id: 3,
          type: 'Reading',
          question: 'What is the main idea? "My name is John. I am a student. I like reading books."',
          options: [
            'John is a teacher',
            'John likes sports',
            'John is a student who likes reading',
            'John is tired'
          ],
          correctAnswer: 2,
          explanation: 'The passage clearly states John is a student and he likes reading books.'
        },
        {
          id: 4,
          type: 'Vocabulary',
          question: 'Complete: "I _____ breakfast every morning."',
          options: [
            'eat',
            'sleep',
            'run',
            'write'
          ],
          correctAnswer: 0,
          explanation: 'We "eat" breakfast. This is a common collocation in English.'
        },
        {
          id: 5,
          type: 'Grammar',
          question: 'What is the plural of "book"?',
          options: [
            'book',
            'books',
            'bookes',
            'bookies'
          ],
          correctAnswer: 1,
          explanation: 'Most nouns form the plural by adding "s": book → books.'
        }
      ],
      intermediate: [
        {
          id: 1,
          type: 'Reading',
          question: 'According to the passage, what is the main benefit of renewable energy?',
          passage: 'Renewable energy sources such as solar and wind power have become increasingly important in the fight against climate change. Unlike fossil fuels, these sources produce minimal greenhouse gas emissions and are virtually inexhaustible.',
          options: [
            'It is cheaper than fossil fuels',
            'It produces minimal greenhouse gas emissions',
            'It is easier to install',
            'It requires less maintenance'
          ],
          correctAnswer: 1,
          explanation: 'The passage explicitly states that renewable energy sources "produce minimal greenhouse gas emissions".'
        },
        {
          id: 2,
          type: 'Vocabulary',
          question: 'Choose the word that best completes: "The company\'s profits have _____ significantly."',
          options: [
            'decreased',
            'increased',
            'remained',
            'fluctuated'
          ],
          correctAnswer: 1,
          explanation: 'Based on the positive context, "increased" is the most appropriate word.'
        },
        {
          id: 3,
          type: 'Grammar',
          question: 'Which sentence uses the present perfect correctly?',
          options: [
            'I have seen that movie yesterday.',
            'I have seen that movie last week.',
            'I have seen that movie before.',
            'I have seen that movie two days ago.'
          ],
          correctAnswer: 2,
          explanation: 'Present perfect is used with "before" (unspecified time). We don\'t use it with specific past time expressions like "yesterday" or "two days ago".'
        },
        {
          id: 4,
          type: 'Reading',
          question: 'What is the author\'s opinion about online learning?',
          passage: 'Online learning offers flexibility and convenience, but it requires strong self-discipline. Students must manage their time effectively and stay motivated without the structure of a traditional classroom.',
          options: [
            'Online learning is perfect for everyone',
            'Online learning has both advantages and challenges',
            'Online learning is worse than traditional learning',
            'Online learning requires no effort'
          ],
          correctAnswer: 1,
          explanation: 'The passage mentions both benefits (flexibility, convenience) and challenges (requires self-discipline).'
        },
        {
          id: 5,
          type: 'Vocabulary',
          question: 'What does "procrastinate" mean?',
          options: [
            'To work very hard',
            'To delay or postpone tasks',
            'To finish quickly',
            'To organize efficiently'
          ],
          correctAnswer: 1,
          explanation: '"Procrastinate" means to delay or postpone something, especially out of habitual carelessness or laziness.'
        }
      ],
      advanced: [
        {
          id: 1,
          type: 'Reading',
          question: 'What does the author suggest about technology in education?',
          passage: 'While technology has revolutionized many aspects of education, it should not replace traditional teaching methods entirely. The most effective approach combines digital tools with face-to-face instruction, allowing students to benefit from both modern innovation and personal interaction.',
          options: [
            'Technology should replace all traditional methods',
            'Technology is not useful in education',
            'A combination of technology and traditional methods is best',
            'Traditional methods are superior to technology'
          ],
          correctAnswer: 2,
          explanation: 'The passage clearly states that "the most effective approach combines digital tools with face-to-face instruction".'
        },
        {
          id: 2,
          type: 'Grammar',
          question: 'Which sentence is grammatically correct?',
          options: [
            'If I would have known, I would have come earlier.',
            'If I had known, I would have come earlier.',
            'If I have known, I would come earlier.',
            'If I know, I would have come earlier.'
          ],
          correctAnswer: 1,
          explanation: 'This is a third conditional sentence, which requires "had + past participle" in the if-clause and "would have + past participle" in the main clause.'
        },
        {
          id: 3,
          type: 'Vocabulary',
          question: 'Choose the most appropriate word: "The politician\'s speech was full of _____ statements designed to appeal to emotions rather than logic."',
          options: [
            'pragmatic',
            'rhetorical',
            'empirical',
            'analytical'
          ],
          correctAnswer: 1,
          explanation: '"Rhetorical" refers to language designed to persuade or impress, often appealing to emotions rather than logic.'
        },
        {
          id: 4,
          type: 'Reading',
          question: 'What can be inferred about the author\'s view on artificial intelligence?',
          passage: 'The rapid advancement of artificial intelligence presents both unprecedented opportunities and significant ethical challenges. While AI has the potential to solve complex problems and improve efficiency across industries, we must carefully consider its implications for employment, privacy, and human autonomy.',
          options: [
            'AI is entirely beneficial',
            'AI should be banned',
            'AI requires careful consideration of both benefits and risks',
            'AI has no impact on society'
          ],
          correctAnswer: 2,
          explanation: 'The author presents a balanced view, acknowledging both opportunities and challenges, suggesting careful consideration is needed.'
        },
        {
          id: 5,
          type: 'Grammar',
          question: 'Identify the sentence with correct subjunctive mood:',
          options: [
            'I suggest that he goes to the doctor.',
            'I suggest that he go to the doctor.',
            'I suggest that he will go to the doctor.',
            'I suggest that he is going to the doctor.'
          ],
          correctAnswer: 1,
          explanation: 'After verbs like "suggest", "recommend", "insist", we use the subjunctive mood: base form of the verb without "s" for third person.'
        }
      ],
      expert: [
        {
          id: 1,
          type: 'Reading',
          question: 'What is the author\'s primary argument regarding epistemological frameworks?',
          passage: 'Contemporary epistemological frameworks have increasingly challenged the notion of objective truth, positing instead that knowledge is inherently contextual and socially constructed. This paradigm shift has profound implications for how we understand scientific inquiry, historical interpretation, and cross-cultural communication.',
          options: [
            'Objective truth is the only valid form of knowledge',
            'Knowledge is context-dependent and socially constructed',
            'Scientific inquiry is impossible without objective truth',
            'Historical interpretation should ignore social context'
          ],
          correctAnswer: 1,
          explanation: 'The passage explicitly states that contemporary frameworks posit "knowledge is inherently contextual and socially constructed".'
        },
        {
          id: 2,
          type: 'Vocabulary',
          question: 'Select the word that best fits: "The researcher\'s findings were _____, contradicting decades of established scientific consensus."',
          options: [
            'conventional',
            'iconoclastic',
            'derivative',
            'orthodox'
          ],
          correctAnswer: 1,
          explanation: '"Iconoclastic" means attacking or criticizing cherished beliefs or institutions, fitting the context of contradicting established consensus.'
        },
        {
          id: 3,
          type: 'Grammar',
          question: 'Which sentence demonstrates correct use of the subjunctive mood in a contrary-to-fact condition?',
          options: [
            'If she was here, she would help us.',
            'If she were here, she would help us.',
            'If she is here, she would help us.',
            'If she will be here, she would help us.'
          ],
          correctAnswer: 1,
          explanation: 'In formal English, the subjunctive "were" is used for all persons in contrary-to-fact conditions.'
        },
        {
          id: 4,
          type: 'Reading',
          question: 'What rhetorical strategy does the author primarily employ?',
          passage: 'The dichotomy between nature and nurture, long considered fundamental to developmental psychology, increasingly appears to be a false binary. Epigenetic research demonstrates that environmental factors can influence gene expression, while genetic predispositions shape how individuals respond to their environment, creating a complex, bidirectional relationship.',
          options: [
            'Appeal to emotion',
            'Deconstruction of a false dichotomy',
            'Ad hominem argument',
            'Circular reasoning'
          ],
          correctAnswer: 1,
          explanation: 'The author challenges the nature vs. nurture dichotomy as a "false binary" and presents evidence for a more nuanced view.'
        },
        {
          id: 5,
          type: 'Vocabulary',
          question: 'Choose the most precise word: "The philosopher\'s argument was _____, appearing logical but containing subtle flaws in reasoning."',
          options: [
            'perspicacious',
            'specious',
            'veracious',
            'sagacious'
          ],
          correctAnswer: 1,
          explanation: '"Specious" means superficially plausible but actually wrong, perfectly describing an argument that appears logical but is flawed.'
        }
      ]
    }

    return questionBank[selectedLevel] || questionBank.intermediate
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
    <div className="exercise-page">
      <header className="exercise-header">
        <div className="header-top">
          <div className="header-left">
            <button className="exercise-back-button" onClick={onBack}>
              ← Quay lại
            </button>
            <h1 className="exercise-title">🇬🇧 IELTS Practice</h1>
          </div>
          <div className="header-stats">
            <div className="level-selector">
              <select 
                value={selectedLevel} 
                onChange={(e) => handleLevelChange(e.target.value)}
                className="level-select"
              >
                <option value="beginner">Beginner (3.0-4.5)</option>
                <option value="intermediate">Intermediate (5.0-6.0)</option>
                <option value="advanced">Advanced (6.5-7.5)</option>
                <option value="expert">Expert (8.0-9.0)</option>
              </select>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📝</span>
              <span>{currentQuestion + 1}/{questions.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <span>{score} correct</span>
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
            <span className="question-number">Question {currentQuestion + 1}</span>
            <span className="question-type">{currentQ.type}</span>
          </div>

          <div className="question-content">
            {currentQ.passage && (
              <div className="question-passage" style={{
                background: '#f7fafc',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #667eea'
              }}>
                <p style={{ color: '#4a5568', lineHeight: '1.8', margin: 0 }}>
                  {currentQ.passage}
                </p>
              </div>
            )}

            {currentQ.audioUrl && (
              <div className="question-audio">
                <button className="audio-button">
                  ▶️
                </button>
                <div className="audio-info">
                  <div className="audio-title">Listen to the audio</div>
                  <div className="audio-duration">Duration: {currentQ.audioDuration}</div>
                </div>
              </div>
            )}

            <h3 className="question-text">{currentQ.question}</h3>

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
                    {String.fromCharCode(65 + index)}
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
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
              </div>
              <p className="feedback-text">{currentQ.explanation}</p>
            </div>
          )}

          <div className="action-buttons">
            {currentQuestion > 0 && (
              <button className="btn btn-secondary" onClick={handlePreviousQuestion}>
                ← Previous
              </button>
            )}
            {!showFeedback ? (
              <button
                className="btn btn-primary"
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
              >
                Check Answer
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'View Results'}
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
            <h2 className="results-title">Exercise Complete!</h2>
            <div className="results-score">
              {score}/{questions.length}
            </div>
            <div className="results-stats">
              <div className="result-stat">
                <div className="result-stat-value">{score}</div>
                <div className="result-stat-label">Correct</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-value">{questions.length - score}</div>
                <div className="result-stat-label">Incorrect</div>
              </div>
              <div className="result-stat">
                <div className="result-stat-value">{Math.round((score / questions.length) * 100)}%</div>
                <div className="result-stat-label">Score</div>
              </div>
            </div>
            <div className="results-actions">
              <button className="btn btn-secondary" onClick={onBack}>
                Back to Roadmap
              </button>
              <button className="btn btn-primary" onClick={handleRetry}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IELTSExercisePage
