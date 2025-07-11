import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async register(userData) {
      const response = await axios.post('/api/auth/register', userData)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
    },
    async login(credentials) {
      const response = await axios.post('/api/auth/login', credentials)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      await this.fetchUser()
    },
    async fetchUser() {
      const response = await axios.get('/api/auth/me')
      this.user = response.data
    },
    logout() {
      axios.post('/api/auth/logout')
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})