# 📚 Visual Language Learning - IELTS & JLPT

A fullstack web application for learning English (IELTS) and Japanese (JLPT) with AI-powered features.

## ✨ Features

- 🔐 **Authentication System**
  - Email/Password Registration & Login
  - Google OAuth 2.0 Authentication
  - JWT Token with Auto-refresh
- 👤 **User Profile Management**
- 🌍 **Multi-language Support** (English/Japanese)
- 🎯 **Learning Goals** (IELTS: 5.5-7.0, JLPT: N5-N1)
- 📝 **Vocabulary Flashcards**
- 📊 **Progress Tracking** (Coming Soon)

---

## 🚀 Quick Start

### 1️⃣ Double-click to start:
```
START_HERE.bat
```

### 2️⃣ Follow the instructions:
- Start Backend (Terminal 1)
- Start Frontend (Terminal 2)
- Open Browser: http://localhost:5173

---

## 📋 Prerequisites

- ✅ PostgreSQL (running on localhost:5432)
- ✅ .NET 8 SDK
- ✅ Node.js (v18+)
- ✅ Google Cloud Console account

---

## 🔧 Setup

### Quick Setup (5 minutes)
See: **[QUICK_START.md](QUICK_START.md)**

### Detailed Setup
See: **[SETUP_GUIDE.md](SETUP_GUIDE.md)**

### Google OAuth Setup
See: **[GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md)**

### Authentication Setup (Email/Password + Google)
See: **[SETUP_AUTH.md](SETUP_AUTH.md)**

Quick setup:
```bash
setup-auth.bat
```

### Vietnamese Guide
See: **[README_VI.md](README_VI.md)**

---

## 🐛 Errors Fixed

All common errors have been identified and fixed!

See: **[ALL_ERRORS_FIXED.md](ALL_ERRORS_FIXED.md)**

### ⚠️ IMPORTANT: Install Packages First!

**If you see: "Failed to resolve import @react-oauth/google"**

**Quick Fix:**
```bash
cd client
npm install
```

**Or double-click:** `client/FIX_AND_INSTALL.bat`

**Detailed guide:** [INSTALL_PACKAGES_MANUALLY.md](INSTALL_PACKAGES_MANUALLY.md)

---

Common fixes:
- ✅ Port configuration (5000 backend, 5173 frontend)
- ✅ Missing packages installed
- ✅ API calls centralized
- ✅ Environment variables configured

**Full troubleshooting:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🏗️ Tech Stack

### Backend (C# .NET 8)
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- BCrypt.Net for Password Hashing
- Google OAuth 2.0

### Frontend (React)
- React 19
- Vite
- @react-oauth/google
- Modern CSS

---

## 📁 Project Structure

```
visual-language-learning/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context
│   │   └── utils/           # Utilities (API calls)
│   ├── .env                 # Environment variables
│   └── package.json
│
├── server/                   # C# backend
│   └── server/
│       ├── Controllers/     # API controllers
│       ├── Models/          # Data models
│       ├── Data/            # Database context
│       └── appsettings.json # Configuration
│
├── START_HERE.bat           # Main startup guide
├── start-backend.bat        # Backend startup
├── start-frontend.bat       # Frontend startup
└── Documentation files...
```

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/google-login` - Login with Google
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

### Reference Data
- `GET /api/reference/languages` - Get languages
- `GET /api/reference/exams` - Get exams and levels

### Vocabulary
- `GET /api/vocabularies` - Get all vocabularies
- `POST /api/vocabularies` - Add vocabulary
- `DELETE /api/vocabularies/{id}` - Delete vocabulary

---

## 🔐 Configuration

### Backend Port: 5000
```json
// server/server/appsettings.json
{
  "Google": {
    "ClientId": "YOUR_CLIENT_ID.apps.googleusercontent.com"
  },
  "Jwt": {
    "Issuer": "http://localhost:5000",
    "Audience": "http://localhost:5173"
  }
}
```

### Frontend Port: 5173
```env
# client/.env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Testing

### Backend
```bash
cd server/server
dotnet test
```

### Frontend
```bash
cd client
npm test
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](QUICK_START.md) | 5-minute setup guide |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Complete setup instructions |
| [ALL_ERRORS_FIXED.md](ALL_ERRORS_FIXED.md) | All errors and solutions |
| [PORT_CONFIGURATION_FIX.md](PORT_CONFIGURATION_FIX.md) | Port configuration fix |
| [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) | Google OAuth setup |
| [README_VI.md](README_VI.md) | Vietnamese documentation |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is licensed under the MIT License.

---

## 🆘 Support

Having issues? Check these documents:
1. [ALL_ERRORS_FIXED.md](ALL_ERRORS_FIXED.md) - Common errors and solutions
2. [QUICK_START.md](QUICK_START.md) - Quick setup guide
3. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup

---

## 🎓 Learning Goals Supported

### IELTS
- Band 5.5
- Band 6.0
- Band 6.5
- Band 7.0

### JLPT
- N5 (Beginner)
- N4
- N3
- N2
- N1 (Advanced)

---

**Made with ❤️ for language learners**

**Start learning now: http://localhost:5173** 🚀
