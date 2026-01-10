import { useState } from 'react'
import './RoadmapPage.css'

function JLPTRoadmapPage({ onBack, user, onNavigate }) {
  const [selectedLevel, setSelectedLevel] = useState(null)

  const levels = [
    {
      id: 'n5',
      name: 'JLPT N5',
      kanji: '100 chữ',
      vocabulary: '800 từ',
      duration: '3-6 tháng',
      description: 'Trình độ cơ bản, hiểu được tiếng Nhật đơn giản trong cuộc sống hàng ngày',
      skills: [
        'Đọc hiragana, katakana',
        '100 chữ Kanji cơ bản',
        'Ngữ pháp N5 (khoảng 80 mẫu câu)',
        'Nghe hiểu hội thoại chậm'
      ],
      topics: [
        'Giới thiệu bản thân',
        'Gia đình',
        'Mua sắm',
        'Thời gian & Ngày tháng',
        'Giao thông'
      ]
    },
    {
      id: 'n4',
      name: 'JLPT N4',
      kanji: '300 chữ',
      vocabulary: '1,500 từ',
      duration: '4-8 tháng',
      description: 'Hiểu được tiếng Nhật cơ bản trong cuộc sống hàng ngày',
      skills: [
        '300 chữ Kanji',
        'Ngữ pháp N4 (khoảng 200 mẫu câu)',
        'Đọc hiểu văn bản đơn giản',
        'Nghe hiểu hội thoại thông thường'
      ],
      topics: [
        'Sở thích',
        'Công việc',
        'Du lịch',
        'Thời tiết',
        'Sức khỏe'
      ]
    },
    {
      id: 'n3',
      name: 'JLPT N3',
      kanji: '650 chữ',
      vocabulary: '3,750 từ',
      duration: '6-12 tháng',
      description: 'Hiểu được tiếng Nhật sử dụng trong cuộc sống hàng ngày ở mức độ nhất định',
      skills: [
        '650 chữ Kanji',
        'Ngữ pháp N3 (khoảng 200 mẫu câu)',
        'Đọc báo, tạp chí đơn giản',
        'Nghe hiểu hội thoại tự nhiên'
      ],
      topics: [
        'Văn hóa Nhật Bản',
        'Xã hội',
        'Giáo dục',
        'Công nghệ',
        'Môi trường'
      ]
    },
    {
      id: 'n2',
      name: 'JLPT N2',
      kanji: '1,000 chữ',
      vocabulary: '6,000 từ',
      duration: '8-15 tháng',
      description: 'Hiểu được tiếng Nhật sử dụng trong cuộc sống hàng ngày và nhiều tình huống khác',
      skills: [
        '1,000 chữ Kanji',
        'Ngữ pháp N2 (khoảng 200 mẫu câu)',
        'Đọc báo, tiểu thuyết',
        'Nghe hiểu tin tức, phim'
      ],
      topics: [
        'Kinh tế',
        'Chính trị',
        'Khoa học',
        'Nghệ thuật',
        'Lịch sử'
      ]
    },
    {
      id: 'n1',
      name: 'JLPT N1',
      kanji: '2,000 chữ',
      vocabulary: '10,000 từ',
      duration: '12-24 tháng',
      description: 'Hiểu được tiếng Nhật sử dụng trong nhiều tình huống khác nhau',
      skills: [
        '2,000 chữ Kanji',
        'Ngữ pháp N1 (khoảng 200 mẫu câu)',
        'Đọc văn bản phức tạp',
        'Nghe hiểu mọi tình huống'
      ],
      topics: [
        'Văn học',
        'Triết học',
        'Chuyên môn cao',
        'Nghiên cứu',
        'Kinh doanh'
      ]
    }
  ]

  const learningPath = [
    {
      phase: 'Giai đoạn 1',
      title: 'Học bảng chữ cái',
      duration: '2-4 tuần',
      activities: [
        'Học Hiragana (46 ký tự)',
        'Học Katakana (46 ký tự)',
        'Luyện viết và đọc',
        'Học từ vựng cơ bản'
      ]
    },
    {
      phase: 'Giai đoạn 2',
      title: 'Xây dựng nền tảng',
      duration: '2-4 tháng',
      activities: [
        'Học Kanji theo cấp độ',
        'Học ngữ pháp cơ bản',
        'Luyện nghe với audio chậm',
        'Thực hành viết câu đơn giản'
      ]
    },
    {
      phase: 'Giai đoạn 3',
      title: 'Phát triển kỹ năng',
      duration: '4-8 tháng',
      activities: [
        'Đọc truyện tranh, manga',
        'Xem anime có phụ đề',
        'Luyện nói với người Nhật',
        'Viết nhật ký bằng tiếng Nhật'
      ]
    },
    {
      phase: 'Giai đoạn 4',
      title: 'Luyện thi chuyên sâu',
      duration: '2-3 tháng',
      activities: [
        'Làm đề thi thử JLPT',
        'Ôn tập từ vựng, Kanji',
        'Luyện nghe đề thi thật',
        'Phân tích đáp án chi tiết'
      ]
    }
  ]

  return (
    <div className="roadmap-page jlpt-theme">
      <header className="roadmap-header">
        <div className="header-content">
          <button className="back-button" onClick={onBack}>
            ← Quay lại
          </button>
          <h1>🇯🇵 Lộ trình học JLPT</h1>
          <p className="subtitle">Hệ thống học tiếng Nhật từ N5 đến N1</p>
        </div>
      </header>

      <main className="roadmap-content">
        {/* Levels Section */}
        <section className="levels-section">
          <h2>Chọn cấp độ mục tiêu</h2>
          <div className="levels-grid jlpt-grid">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`level-card ${selectedLevel === level.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedLevel(level.id)
                  // Navigate to level-specific learning page
                  onNavigate('jlpt-exercise', { level: level.id })
                }}
              >
                <div className="level-header">
                  <h3>{level.name}</h3>
                  <div className="level-stats">
                    <span className="stat-badge">📝 {level.kanji}</span>
                    <span className="stat-badge">💬 {level.vocabulary}</span>
                  </div>
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
          <h2>学習リソース (Learning Resources)</h2>
          <div className="tips-grid">
            <div className="tip-card" onClick={() => onNavigate('hiragana')} style={{ cursor: 'pointer' }}>
              <span className="tip-icon">あ</span>
              <h3>ひらがな</h3>
              <p>Hiragana - 46 ký tự cơ bản của tiếng Nhật</p>
            </div>
            <div className="tip-card" onClick={() => onNavigate('katakana')} style={{ cursor: 'pointer' }}>
              <span className="tip-icon">ア</span>
              <h3>カタカナ</h3>
              <p>Katakana - Dùng cho từ ngoại lai và tên riêng</p>
            </div>
            <div className="tip-card" onClick={() => onNavigate('kanji')} style={{ cursor: 'pointer' }}>
              <span className="tip-icon">漢</span>
              <h3>漢字</h3>
              <p>Kanji - Chữ Hán theo từng cấp độ JLPT</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📚</span>
              <h3>Tài liệu học tập</h3>
              <p>Sách giáo trình và tài liệu tham khảo</p>
            </div>
          </div>
        </section>

        {/* Original Tips Section */}
        <section className="tips-section">
          <h2>Mẹo học tiếng Nhật hiệu quả</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">✍️</span>
              <h3>Luyện viết Kanji</h3>
              <p>Viết tay mỗi ngày để ghi nhớ nét chữ và cách viết</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🎌</span>
              <h3>Tiếp xúc văn hóa</h3>
              <p>Xem anime, đọc manga để học từ vựng tự nhiên</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🔄</span>
              <h3>Ôn tập đều đặn</h3>
              <p>Dùng flashcard để ôn Kanji và từ vựng hàng ngày</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🗣️</span>
              <h3>Thực hành giao tiếp</h3>
              <p>Tìm bạn Nhật hoặc tham gia câu lạc bộ tiếng Nhật</p>
            </div>
          </div>
        </section>

        {/* JLPT Exam Info */}
        <section className="exam-info-section">
          <h2>Thông tin kỳ thi JLPT</h2>
          <div className="exam-info-grid">
            <div className="info-card">
              <h3>📅 Thời gian thi</h3>
              <p>Năm 2 lần: Tháng 7 và tháng 12</p>
            </div>
            <div className="info-card">
              <h3>📝 Cấu trúc đề thi</h3>
              <p>3 phần: Từ vựng/Ngữ pháp, Đọc hiểu, Nghe hiểu</p>
            </div>
            <div className="info-card">
              <h3>⏰ Thời gian làm bài</h3>
              <p>N5-N4: 105 phút | N3-N1: 170 phút</p>
            </div>
            <div className="info-card">
              <h3>✅ Điểm đạt</h3>
              <p>N5-N4: 80/180 | N3: 95/180 | N2-N1: 100/180</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Sẵn sàng chinh phục JLPT?</h2>
            <p>Bắt đầu học từ vựng và Kanji với phương pháp flashcard hình ảnh</p>
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

export default JLPTRoadmapPage
