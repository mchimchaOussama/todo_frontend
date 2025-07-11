
import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async register(userData) {
      const response = await api.post('/auth/register', userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.token = response.data.token
      localStorage.setItem('token', this.token)
    },
    async login(credentials) {
      const response = await api.post('/auth/login', credentials)
      this.token = response.data.token
       this.user = response.data.user 
      localStorage.setItem('token', this.token)
},
    async fetchUser() {
      const response = await api.get('/auth/me')
      this.user = response.data
    },
    
    logout() {
      api.post('/auth/logout')
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }
})
