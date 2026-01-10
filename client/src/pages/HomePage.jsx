import './HomePage.css'

function HomePage({ onGetStarted, user, onLogout, onNavigate }) {


  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="homepage-nav">
        <div className="nav-content">
          <div className="nav-left">
            <div className="nav-logo">📚 Visual Language Learning</div>

            {/* Services - Moved to Header */}
            <div className="nav-services">
              <button
                className="nav-service-link"
                onClick={() => onNavigate('ielts-roadmap')}
              >
                IELTS
              </button>
              <button
                className="nav-service-link"
                onClick={() => onNavigate('jlpt-roadmap')}
              >
                JLPT
              </button>
            </div>
          </div>

          <div className="nav-auth">
            {user ? (
              <div className="nav-user-menu">
                <button className="nav-profile-button" onClick={() => onNavigate('profile')}>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} className="nav-user-avatar" />
                  ) : (
                    <span className="nav-user-avatar-placeholder">
                      {user.fullName?.charAt(0) || user.email?.charAt(0) || '?'}
                    </span>
                  )}
                  <span className="nav-user-name">{user.fullName || user.email}</span>
                </button>
                <button className="btn-logout" onClick={onLogout}>
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button className="btn-login-header" onClick={onGetStarted}>
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Platform Introduction */}
      <section className="hero-new">
        <div className="hero-container">
          <div className="hero-content-new">
            <h1 className="hero-title-new">
              Học ngôn ngữ qua hình ảnh
              <span className="gradient-text-new"> hiệu quả hơn</span>
            </h1>
            <p className="hero-subtitle-new">
              Nền tảng học IELTS & JLPT với flashcard hình ảnh,
              giúp bạn ghi nhớ từ vựng nhanh chóng và lâu dài.
            </p>

            <div className="hero-cta-group">
              <button className="btn-start-now" onClick={onGetStarted}>
                Bắt đầu ngay
              </button>
            </div>
          </div>

          {/* Visual Learning Demo */}
          <div className="visual-demo">
            <div className="demo-card main-card">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
                alt="Book and reading"
                className="demo-image"
              />
              <div className="demo-content">
                <div className="demo-word">
                  <span className="word-text">Library</span>
                  <span className="word-phonetic">/ˈlaɪbreri/</span>
                </div>
                <div className="demo-meaning">
                  <span className="meaning-label">Nghĩa:</span>
                  <span className="meaning-text">Thư viện</span>
                </div>
                <div className="demo-example">
                  "I go to the library every weekend"
                </div>
              </div>
            </div>

            <div className="demo-card small-card card-1">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=200&fit=crop"
                alt="Books"
              />
              <div className="demo-mini-content">
                <span className="mini-word">Book</span>
                <span className="mini-meaning">Sách</span>
              </div>
            </div>

            <div className="demo-card small-card card-2">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop"
                alt="Study"
              />
              <div className="demo-mini-content">
                <span className="mini-word">Study</span>
                <span className="mini-meaning">Học tập</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Learning Benefits */}
      <section className="benefits-section">
        <div className="benefits-container">
          <h2 className="section-title-new">Tại sao học bằng hình ảnh?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🧠</div>
              <h3>Ghi nhớ lâu hơn</h3>
              <p>Não bộ ghi nhớ hình ảnh tốt hơn 60,000 lần so với văn bản thuần túy</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Học nhanh hơn</h3>
              <p>Kết hợp hình ảnh và từ vựng giúp bạn học nhanh gấp 3 lần</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Hiệu quả hơn</h3>
              <p>Phương pháp được chứng minh khoa học giúp tăng khả năng nhớ từ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-new">
        <div className="footer-content-new">
          <div className="footer-brand">
            <div className="footer-logo">📚 Visual Language Learning</div>
            <p>Học ngôn ngữ thông minh hơn với hình ảnh</p>
          </div>
          <div className="footer-links">
            <a href="#about">Về chúng tôi</a>
            <a href="#contact">Liên hệ</a>
            <a href="#privacy">Chính sách</a>
          </div>
        </div>
        <div className="footer-bottom-new">
          <p>© 2026 Visual Language Learning. All rights reserved.</p>
        </div>
      </footer>
    </div >
  )
}

export default HomePage
