import { useState } from 'react'
import './HomePage.css'

function HomePage({ onGetStarted }) {
  const [selectedExam, setSelectedExam] = useState('ielts')

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Master Languages with
              <span className="gradient-text"> Visual Learning</span>
            </h1>
            <p className="hero-subtitle">
              Prepare for IELTS & JLPT exams with interactive flashcards, 
              AI-powered feedback, and personalized learning paths
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={onGetStarted}>
                Get Started Free
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Vocabulary Words</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Practice Tests</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=300&h=200&fit=crop" alt="Learning" />
              <div className="card-content">
                <span className="word">Vocabulary</span>
                <span className="meaning">Learning made easy</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop" alt="Study" />
              <div className="card-content">
                <span className="word">Practice</span>
                <span className="meaning">Interactive exercises</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop" alt="Success" />
              <div className="card-content">
                <span className="word">Success</span>
                <span className="meaning">Achieve your goals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Selection */}
      <section className="exam-section">
        <h2 className="section-title">Choose Your Path</h2>
        <div className="exam-cards">
          <div 
            className={`exam-card ${selectedExam === 'ielts' ? 'active' : ''}`}
            onClick={() => setSelectedExam('ielts')}
          >
            <div className="exam-icon">🇬🇧</div>
            <h3>IELTS</h3>
            <p>International English Language Testing System</p>
            <ul className="exam-features">
              <li>✓ Band 4.0 - 9.0 preparation</li>
              <li>✓ Speaking & Writing AI feedback</li>
              <li>✓ 5000+ vocabulary words</li>
              <li>✓ Mock tests & practice</li>
            </ul>
          </div>
          <div 
            className={`exam-card ${selectedExam === 'jlpt' ? 'active' : ''}`}
            onClick={() => setSelectedExam('jlpt')}
          >
            <div className="exam-icon">🇯🇵</div>
            <h3>JLPT</h3>
            <p>Japanese Language Proficiency Test</p>
            <ul className="exam-features">
              <li>✓ N5 to N1 levels</li>
              <li>✓ Kanji, vocabulary & grammar</li>
              <li>✓ Audio pronunciation</li>
              <li>✓ Reading comprehension</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Visual Learning</h3>
            <p>Learn faster with image-based flashcards and interactive content</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Feedback</h3>
            <p>Get instant feedback on speaking and writing with advanced AI</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your improvement with detailed analytics and insights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>Gamification</h3>
            <p>Earn achievements and stay motivated throughout your journey</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Learn Anywhere</h3>
            <p>Study on any device with our responsive platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Community</h3>
            <p>Join thousands of learners achieving their language goals</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose Your Exam</h3>
            <p>Select IELTS or JLPT and your target level</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Learn & Practice</h3>
            <p>Study with flashcards, exercises, and mock tests</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Feedback</h3>
            <p>Receive AI-powered insights on your performance</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Achieve Success</h3>
            <p>Pass your exam with confidence</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of successful learners today</p>
          <button className="btn-primary large" onClick={onGetStarted}>
            Start Learning Now
          </button>
          <p className="cta-note">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Visual Language Learning</h4>
            <p>Master IELTS & JLPT with confidence</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#guides">Study Guides</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Visual Language Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
