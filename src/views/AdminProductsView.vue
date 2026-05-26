<!-- AdminProductsView.vue -->
<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-10">

        <div>
          <h1 class="text-3xl font-serif text-foreground">
            Productos
          </h1>

          <p class="text-muted-foreground mt-2">
            Gestiona todos los productos de la tienda
          </p>
        </div>

        <RouterLink
          to="/admin/productos/crear"
          class="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
        >
          Nuevo producto
        </RouterLink>

      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="text-center py-20 text-muted-foreground"
      >
        Cargando productos...
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="products.length === 0"
        class="text-center py-20 text-muted-foreground"
      >
        No hay productos disponibles
      </div>

      <!-- TABLE -->
      <div
        v-else
        class="overflow-x-auto border border-border rounded-2xl bg-card"
      >

        <table class="w-full">

          <thead class="border-b border-border bg-muted/30">
            <tr>

              <th class="text-left px-6 py-4 font-medium">
                Imagen
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Producto
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Descripción
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Precios
              </th>

              <th class="text-right px-6 py-4 font-medium">
                Acciones
              </th>

            </tr>
          </thead>

          <tbody>

            <tr
              v-for="product in products"
              :key="product.id"
              class="border-b border-border last:border-0" :id="`product-${product.id}`"
            >

              <!-- IMAGE -->
              <td class="px-6 py-4">

                <div
                  v-if="product.image"
                  class="w-20 h-20 rounded-xl overflow-hidden border border-border"
                >
                  <img
                    :src="`${API_BASE_URL}/storage/${product.image}`"
                    alt="Producto"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div
                  v-else
                  class="w-20 h-20 rounded-xl bg-muted flex items-center justify-center text-xs text-muted-foreground"
                >
                  Sin imagen
                </div>

              </td>

              <!-- NAME -->
              <td class="px-6 py-4">
                <h3 class="font-medium text-foreground">
                  {{ product.name }}
                </h3>
              </td>

              <!-- DESCRIPTION -->
              <td class="px-6 py-4 max-w-sm">
                <p class="text-sm text-muted-foreground line-clamp-3">
                  {{ product.description }}
                </p>
              </td>

              <!-- PRICES -->
              <td class="px-6 py-4">

                <div class="space-y-2">

                  <div
                    v-for="price in product.prices"
                    :key="price.id"
                    class="text-sm"
                  >
                    <span class="font-medium">
                      {{ price.units }}
                    </span>

                    —
                    {{ price.price }} €
                  </div>

                </div>

              </td>

              <!-- ACTIONS -->
              <td class="px-6 py-4">

                <div class="flex justify-end gap-3">

                  <!-- EDIT -->
                  <RouterLink
                    :to="`/admin/productos/${product.id}/editar`"
                    class="px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
                  >
                    Editar
                  </RouterLink>

                  <!-- DELETE -->
                  <button
                    @click="confirmDelete(product)"
                    class="px-4 py-2 rounded-lg bg-red-500 text-white hover:opacity-90 transition"
                  >
                    Eliminar
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../services/api'
import { useProductStore } from '../stores/products'
const API_BASE_URL = import.meta.env.VITE_ROOT_URL

const loading = ref(false)

const productStore = useProductStore()
const products = ref(productStore.products)

onMounted(async () => {

  loading.value = true
  try {
    await productStore.fetchProducts()
  } finally {
    loading.value = false
    products.value = productStore.products
  }
})

const confirmDelete = async (product) => {

  const confirmed = confirm(
    `¿Seguro que deseas eliminar "${product.name}"?`
  )

  if (!confirmed) return

  try {

    await api.delete(`/products/${product.id}`)

    products.value = products.value.filter(
      p => p.id !== product.id
    )

  } catch (error) {

    console.error(error)

    alert('Error al eliminar el producto')
  }
}
</script>