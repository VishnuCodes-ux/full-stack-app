import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = null;
//    ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)

  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  async function login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      setUser(response.data.user)
      setToken(response.data.token)
      return true
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Invalid email or password')
        } else if (error.response.status === 403) {
          throw new Error('Account not verified')
        }
      }
      throw new Error('Login failed. Please try again.')
    }
  }

  function setUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return { 
    user, 
    token, 
    login, 
    logout, 
    setUser, 
    setToken,
    isAuthenticated: !!token.value
  }
})