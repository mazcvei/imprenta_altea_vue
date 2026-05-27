import { defineStore } from "pinia";
import api from "../services/api"; // tu axios instance

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],

    loading: false,
    error: null,
    notification: {
      show: false,
      type: "", // 'success' | 'error'
      message: "",
    },
  }),

  getters: {
    hasProducts: (state) => state.products.length > 0,

    getFormattedProducts: (state) =>
      state.products.map((p) => ({
        id: p.id,
        title: p.name,
        description: p.description,
      })),
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/products");
        this.products = response.data;
      } catch (err) {
        this.error = err?.response?.data?.message || "Error cargando productos";
      } finally {
        this.loading = false;
      }
    },
    async fetchProduct(id) {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.get(`/products/${id}`);
        
        return res.data;
      } catch (err) {
        this.error = "Error cargando producto";
        return null;
      } finally {
        this.loading = false;
      }
    },
    async storeProduct(formData) {
      try {
        const { data } = await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.setNotification("success", "Producto creado correctamente");
        return data;
      } catch (error) {
        this.setNotification(
          "error",
          error.response?.data?.message || "Error al crear el producto",
        );

        throw error;
      }
    },

    async updateProduct(id, formData) {
      try {
        formData.append("_method", "PUT");

        const { data } = await api.post(`/products/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.setNotification("success", "Producto actualizado correctamente");
        return data;
      } catch (error) {
        this.setNotification(
          "error",
          error.response?.data?.message || "Error al actualizar el producto",
        );

        throw error;
      }
    },
    setNotification(type, message) {
      this.notification = {
        show: true,
        type,
        message,
      };

      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
  },
});
