import { defineStore } from 'pinia'
import api from '../services/api' // tu axios instance

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),

  getters: {
    hasProducts: (state) => state.products.length > 0,

    getFormattedProducts: (state) =>
      state.products.map(p => ({
        id: p.id,
        title: p.name,
        description: p.description,
      })),
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/products')
        this.products = response.data
      } catch (err) {
        this.error = err?.response?.data?.message || 'Error cargando productos'
      } finally {
        this.loading = false
      }
    },
    async fetchProduct(id) {
        this.loading = true
        this.error = null

        try {
        const res = await api.get(`/products/${id}`)
        return res.data
        } catch (err) {
        this.error = 'Error cargando producto'
        return null
        } finally {
        this.loading = false
        }
    }
  },
})