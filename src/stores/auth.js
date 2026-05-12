import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    user: (() => {
      try {
        const stored = localStorage.getItem('altea_user')
        return stored ? JSON.parse(stored) : null
      } catch {
        return null
      }
    })(),

    token: localStorage.getItem('altea_login_token') || null,

    expiresAt: Number(localStorage.getItem('altea_token_expires_at')) || null,

    loading: false,
  }),

  getters: {

    isAuthenticated: (state) => {
      if (!state.token || !state.expiresAt) return false
      return Date.now() < state.expiresAt
    },

    isTokenExpired: (state) => {
      if (!state.expiresAt) return true
      return Date.now() > state.expiresAt
    }
  },

  actions: {

    // LOGIN
    async login(credentials) {
      this.loading = true

      try {
        const response = await api.post('/login', credentials)

        const { access_token, user, expires_in } = response.data

        if (!user || !access_token) {
          throw new Error('Login response inválida')
        }

   
        this.token = access_token

        this.user = user

        this.expiresAt = Date.now() + (expires_in * 1000)

        localStorage.setItem('altea_login_token', this.token)
        localStorage.setItem('altea_token_expires_at', String(this.expiresAt))
        localStorage.setItem('altea_user', JSON.stringify(this.user))


        return true

      } finally {
        this.loading = false
      }
    },

    // REGISTER
    async register(data) {
      this.loading = true

      try {
        await api.post('/register', data)

        return await this.login({
          email: data.email,
          password: data.password
        })

      } finally {
        this.loading = false
      }
    },

    async fetchUser() {

      if (this.isTokenExpired) {
        this.logout()
        return
      }

      try {
        const response = await api.get('/me')

        const user = response.data.user

        // validación defensiva
        if (!user) return

        this.user = user

        localStorage.setItem(
          'altea_user',
          JSON.stringify(user)
        )

      } catch (error) {
        this.logout()
      }
    },

    // REFRESH TOKEN
    async refreshToken() {

      try {
        const response = await api.post('/refresh')

        const { access_token, expires_in } = response.data

        this.token = access_token
        this.expiresAt = Date.now() + (expires_in * 1000)

        localStorage.setItem('altea_login_token', this.token)
        localStorage.setItem('altea_token_expires_at', String(this.expiresAt))

        return true

      } catch (error) {
        this.logout()
        return false
      }
    },

    // LOGOUT
    async logout() {

      try {
        if (this.token) {
          await api.post('/logout')
        }
      } catch (e) {}

      this.user = null
      this.token = null
      this.expiresAt = null

      localStorage.removeItem('altea_login_token')
      localStorage.removeItem('altea_user')
      localStorage.removeItem('altea_token_expires_at')
    }
  }
})