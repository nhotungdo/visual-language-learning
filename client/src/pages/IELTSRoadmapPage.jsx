import { useState } from 'react'
import './RoadmapPage.css'

function IELTSRoadmapPage({ onBack, user, onNavigate }) {
  const [selectedLevel, setSelectedLevel] = useState(null)

  const levels = [
    {
      id: 'beginner',
      name: 'Beginner',
      score: '3.0 - 4.5',
      duration: '3-6 tháng',
      description: 'Dành cho người mới bắt đầu hoặc có nền tảng tiếng Anh cơ bản',
      skills: [
        'Từ vựng cơ bản (1000-2000 từ)',
        'Ngữ pháp nền tảng',
        'Luyện nghe với tốc độ chậm',
        'Viết câu đơn giản'
      ],
      topics: [
        'Daily routines',
        'Family & Friends',
        'Food & Drinks',
        'Shopping',
        'Travel basics'
      ]
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      score: '5.0 - 6.0',
      duration: '4-8 tháng',
      description: 'Phát triển kỹ năng giao tiếp và hiểu biết sâu hơn',
      skills: [
        'Từ vựng học thuật (3000-4000 từ)',
        'Cấu trúc câu phức tạp',
        'Luyện nghe đa dạng chủ đề',
        'Viết đoạn văn có cấu trúc'
      ],
      topics: [
        'Education',
        'Work & Career',
        'Technology',
        'Environment',
        'Health & Lifestyle'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      score: '6.5 - 7.5',
      duration: '6-12 tháng',
      description: 'Hoàn thiện kỹ năng để đạt điểm cao',
      skills: [
        'Từ vựng chuyên sâu (5000+ từ)',
        'Ngữ pháp nâng cao',
        'Luyện nghe native speed',
        'Viết essay học thuật'
      ],
      topics: [
        'Global issues',
        'Science & Research',
        'Arts & Culture',
        'Economics',
        'Social problems'
      ]
    },
    {
      id: 'expert',
      name: 'Expert',
      score: '8.0 - 9.0',
      duration: '6-12 tháng',
      description: 'Đạt trình độ gần như người bản ngữ',
      skills: [
        'Từ vựng phong phú (7000+ từ)',
        'Sử dụng ngôn ngữ linh hoạt',
        'Hiểu accent đa dạng',
        'Viết chuyên nghiệp'
      ],
      topics: [
        'Academic research',
        'Professional contexts',
        'Complex arguments',
        'Critical analysis',
        'Abstract concepts'
      ]
    }
  ]

  const learningPath = [
    {
      phase: 'Giai đoạn 1',
      title: 'Xây dựng nền tảng',
      duration: '1-2 tháng',
      activities: [
        'Học 20-30 từ vựng mới mỗi ngày',
        'Ôn tập ngữ pháp cơ bản',
        'Nghe podcast tiếng Anh 15-30 phút/ngày',
        'Viết nhật ký bằng tiếng Anh'
      ]
    },
    {
      phase: 'Giai đoạn 2',
      title: 'Phát triển kỹ năng',
      duration: '2-4 tháng',
      activities: [
        'Luyện đề IELTS thực tế',
        'Tham gia speaking club',
        'Đọc báo tiếng Anh hàng ngày',
        'Viết essay mẫu theo chủ đề'
      ]
    },
    {
      phase: 'Giai đoạn 3',
      title: 'Luyện thi chuyên sâu',
      duration: '1-2 tháng',
      activities: [
        'Làm đề thi thử hàng tuần',
        'Phân tích lỗi sai chi tiết',
        'Luyện tập theo thời gian thực',
        'Mock test với giám khảo'
      ]
    }
  ]

  return (
    <div className="roadmap-page">
      <header className="roadmap-header">
        <div className="header-content">
          <button className="back-button" onClick={onBack}>
            ← Quay lại
          </button>
          <h1>🇬🇧 Lộ trình học IELTS</h1>
          <p className="subtitle">Hệ thống học tập khoa học từ cơ bản đến nâng cao</p>
        </div>
      </header>

      <main className="roadmap-content">
        {/* Levels Section */}
        <section className="levels-section">
          <h2>Chọn trình độ của bạn</h2>
          <div className="levels-grid">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`level-card ${selectedLevel === level.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedLevel(level.id)
                  // Navigate to level-specific learning page
                  onNavigate('ielts-exercise', { level: level.id })
                }}
              >
                <div className="level-header">
                  <h3>{level.name}</h3>
                  <span className="score-badge">{level.score}</span>
                </div>
                <p className="duration">⏱️ {level.duration}</p>
                <p className="description">{level.description}</p>
                
                <div className="level-details">
                  <h4>Kỹ năng cần đạt:</h4>
                  <ul>
                    {level.skills.map((skill, idx) => (
                      <li key={idx}>✓ {skill}</li>
                    ))}
                  </ul>
                  
                  <h4>Chủ đề học:</h4>
                  <div className="topics">
                    {level.topics.map((topic, idx) => (
                      <span key={idx} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Path Section */}
        <section className="learning-path-section">
          <h2>Lộ trình học tập</h2>
          <div className="path-timeline">
            {learningPath.map((phase, idx) => (
              <div key={idx} className="path-phase">
                <div className="phase-marker">{idx + 1}</div>
                <div className="phase-content">
                  <span className="phase-label">{phase.phase}</span>
                  <h3>{phase.title}</h3>
                  <p className="phase-duration">📅 {phase.duration}</p>
                  <ul className="activities">
                    {phase.activities.map((activity, actIdx) => (
                      <li key={actIdx}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Tips Section */}
        <section className="tips-section">
          <h2>Mẹo học tập hiệu quả</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">📚</span>
              <h3>Học đều đặn</h3>
              <p>Dành ít nhất 1-2 giờ mỗi ngày để học và ôn tập</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🎯</span>
              <h3>Đặt mục tiêu rõ ràng</h3>
              <p>Xác định điểm số mục tiêu và thời gian thi cụ thể</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🔄</span>
              <h3>Ôn tập thường xuyên</h3>
              <p>Sử dụng flashcard để ôn từ vựng mỗi ngày</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">💬</span>
              <h3>Thực hành giao tiếp</h3>
              <p>Tìm partner hoặc tham gia nhóm học để luyện speaking</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Sẵn sàng bắt đầu?</h2>
            <p>Tham gia ngay để học từ vựng IELTS với phương pháp hình ảnh hiệu quả</p>
            {user ? (
              <button className="cta-button" onClick={() => onNavigate('flashcard')}>
                Bắt đầu học ngay
              </button>
            ) : (
              <button className="cta-button" onClick={() => onNavigate('auth')}>
                Đăng ký miễn phí
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default IELTSRoadmapPage
