import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)

    // Set up token refresh interval
    if (token && refreshToken) {
      const refreshInterval = setInterval(() => {
        refreshAccessToken(token, refreshToken)
      }, 6 * 24 * 60 * 60 * 1000) // Refresh every 6 days

      return () => clearInterval(refreshInterval)
    }
  }, [])

  const refreshAccessToken = async (accessToken, refreshToken) => {
    try {
      const res = await api.refreshToken(accessToken, refreshToken)
      if (res?.ok) {
        const data = res.data
        localStorage.setItem('accessToken', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    }
  }

  const login = (authData) => {
    localStorage.setItem('accessToken', authData.token)
    localStorage.setItem('refreshToken', authData.refreshToken)
    localStorage.setItem('user', JSON.stringify(authData.user))
    setUser(authData.user)
  }

  const logout = async () => {
    const token = localStorage.getItem('accessToken')
    
    if (token) {
      try {
        await api.logout(token)
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  const updateUser = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, token: localStorage.getItem('accessToken'), login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
