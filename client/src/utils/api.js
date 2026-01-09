const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = {
  // Auth endpoints
  register: async (fullName, email, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    })
    return response
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return response
  },

  googleLogin: async (idToken) => {
    const response = await fetch(`${API_URL}/api/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    })
    return response
  },

  refreshToken: async (accessToken, refreshToken) => {
    const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken })
    })
    return response
  },

  logout: async (token) => {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
  },

  // User endpoints
  getProfile: async (token) => {
    const response = await fetch(`${API_URL}/api/user/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
  },

  updateProfile: async (token, data) => {
    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response
  },

  // Reference endpoints
  getLanguages: async () => {
    const response = await fetch(`${API_URL}/api/reference/languages`)
    return response
  },

  getExams: async () => {
    const response = await fetch(`${API_URL}/api/reference/exams`)
    return response
  },

  // Vocabulary endpoints
  getVocabularies: async () => {
    const response = await fetch(`${API_URL}/api/vocabularies`)
    return response
  },

  addVocabulary: async (data) => {
    const response = await fetch(`${API_URL}/api/vocabularies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response
  },

  deleteVocabulary: async (id) => {
    const response = await fetch(`${API_URL}/api/vocabularies/${id}`, {
      method: 'DELETE'
    })
    return response
  }
}

export default api
