<template>
  <section class="py-20 lg:py-28">
    <div class="max-w-6xl mx-auto px-6 lg:px-8">
      <!-- HEADER -->
      <div class="mb-10">
        <h1 class="font-serif text-3xl lg:text-4xl text-foreground">
          Tu carrito
        </h1>

        <p class="text-muted-foreground mt-2">
          Revisa tus productos antes de continuar al pago
        </p>
      </div>

      <!-- EMPTY -->
      <div
        v-if="!cart.loading && cart.items.length === 0"
        class="text-center py-20 text-muted-foreground"
      >
        Tu carrito está vacío
      </div>

      <!-- LISTA -->
      <div v-else class="grid lg:grid-cols-3 gap-10">
        <!-- ITEMS -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center justify-between p-5 bg-card border border-border rounded-lg"
          >
            <div>
              <h3 class="font-serif text-lg text-foreground">
                {{ item.product.name }}
              </h3>

              <p class="text-sm text-muted-foreground">
                {{ item.price_unit.units }}
              </p>
            </div>

            <div class="text-right">
              <p class="font-semibold text-foreground">
                {{ item.price_unit.price }} €
              </p>

              <button
                class="text-sm text-red-500 mt-2 hover:underline"
                @click="cart.removeItem(item.id)"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <div class="p-6 bg-card border border-border rounded-lg h-fit">
          <h3 class="font-serif text-xl text-foreground mb-4">Dirección de facturación</h3>
          <div>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                
              </span>

              <input
                v-model="shipping"
                type="text"
                class="w-full h-14 rounded-xl border border-border bg-background pl-4 pr-4 text-lg outline-none focus:ring-2 focus:ring-primary"
                placeholder="Dirección de facturación"
              />
            </div>
          </div>
        </div>

        <!-- RESUMEN -->
        <div class="p-6 bg-card border border-border rounded-lg h-fit lg:col-span-2">
          <h3 class="font-serif text-xl text-foreground mb-4">Resumen</h3>

          <div class="flex justify-between mb-4">
            <span class="text-muted-foreground">Productos</span>
            <span>{{ cart.count }}</span>
          </div>

          <div class="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>{{ cart.total }} €</span>
          </div>

         <button
            @click="pay"
            :disabled="loading"
            class="w-full h-14 rounded-xl bg-primary text-white text-lg font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            <span v-if="!loading">
              Pagar ahora
            </span>

            <span v-else>
              Procesando...
            </span>
          </button>

         
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted,ref } from "vue";
import { useCartStore } from "../stores/cart";
import api from '../services/api'

const cart = useCartStore();
const loading = ref(false)
const shipping = ref('')

onMounted(() => {
  cart.fetchCart();
});

const pay = async () => {
  try {
    loading.value = true

    const response = await api.post('/stripe/create-checkout-session', {
      shipping_address: shipping.value
    })

    window.location.href = response.data.url
  } catch (error) {
        console.error(error)
        alert('Error al iniciar el pago')
  } finally {
        loading.value = false
  }
}
</script>
