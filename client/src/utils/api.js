export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

import { handleApiError } from './errorHandler'

const request = async (path, options = {}) => {
  const url = `${API_URL}${path}`
  try {
    const response = await fetch(url, options)

    // If response is not JSON, still return the raw response
    const contentType = response.headers.get('content-type') || ''
    let data = null
    if (contentType.includes('application/json')) {
      data = await response.json()
    }

    if (!response.ok) {
      const err = new Error(data?.message || 'Request failed')
      err.response = { status: response.status, data }
      throw err
    }

    return { ok: true, status: response.status, data, response }
  } catch (error) {
    throw handleApiError(error, url)
  }
}

export const api = {
  // Auth endpoints
  register: async (fullName, email, password) => {
    return await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password })
    })
  },

  login: async (email, password) => {
    return await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
  },

  googleLogin: async (idToken) => {
    return await request('/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    })
  },

  refreshToken: async (accessToken, refreshToken) => {
    return await request('/api/auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken })
    })
  },

  logout: async (token) => {
    return await request('/api/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },

  // User endpoints
  getProfile: async (token) => {
    return await request('/api/user/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },

  updateProfile: async (token, data) => {
    return await request('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
  },

  // Reference endpoints
  getLanguages: async () => {
    return await request('/api/reference/languages')
  },

  getExams: async () => {
    return await request('/api/reference/exams')
  },

  // Vocabulary endpoints
  getVocabularies: async () => {
    return await request('/api/vocabularies')
  },

  addVocabulary: async (data) => {
    return await request('/api/vocabularies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  },

  deleteVocabulary: async (id) => {
    return await request(`/api/vocabularies/${id}`, {
      method: 'DELETE'
    })
  }
}

export default api
