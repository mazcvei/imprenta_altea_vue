import { defineStore } from 'pinia'
import api from '../services/api'

export const useOrderStore = defineStore('orders', {

  state: () => ({
    orders: []
  }),

  actions: {

    async fetchOrders() {

      const { data } = await api.get('/orders')

      this.orders = data

      return data
    },

    async updateOrderStatus(id, status) {

      const { data } = await api.put(
        `/orders/${id}/status`,
        { status }
      )

      return data
    },

    async deleteOrder(id) {

      const { data } = await api.delete(
        `/orders/${id}`
      )

      return data
    },

    async fetchOrder(id) {

      const { data } = await api.get(`/orders/${id}`)   

      return data
    },


  }
})