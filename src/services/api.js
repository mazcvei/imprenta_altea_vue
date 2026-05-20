import axios from 'axios'

import { useAuthStore } from '../stores/auth'

const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(

  async (config) => {

    const auth = useAuthStore()

    /**
     * Token expirado
     */
    if (auth.token && auth.isTokenExpired) {

      const refreshed = await auth.refreshToken()

      if (!refreshed) {

        await auth.logout()

        window.location.href = '/login'

        return Promise.reject('Sesión expirada')
      }
    }

    /**
     * Añadir bearer
     */
    if (auth.token) {

      config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
  },

  (error) => Promise.reject(error)
)

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const auth = useAuthStore()

    /**
     * 401 = sesión inválida
     */
    if (error.response?.status === 401) {

      await auth.logout()

      window.location.href = '/login'
    }

    /**
     * 403 = sin permisos
     */
    if (error.response?.status === 403) {

      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default api