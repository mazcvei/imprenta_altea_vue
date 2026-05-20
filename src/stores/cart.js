import { defineStore } from 'pinia'
import api from '../services/api'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    count: 0,
  }),

  getters: {
    total(state) {
      return state.items.reduce((sum, item) => {
        return sum + Number(item.price_unit.price)
      }, 0)
    },

    count(state) {
      return state.items.length
    }
  },

  actions: {
    async fetchCart() {
      this.loading = true

      try {
        const res = await api.get('/cart')
        this.items = res.data
      } finally {
        this.loading = false
      }
    },

    async removeItem(id) {
      await api.delete(`/cart/${id}`)
      this.items = this.items.filter(i => i.id !== id)
      await this.fetchCount()
    },

    async fetchCount() {
      if (!this.auth?.token) {
        this.count = 0
        return
      }

      try {
        const res = await api.get('/cart/count')
        this.count = res.data.count
      } catch (e) {
        console.log(e)
        this.count = 0
      }
    }


  }
})