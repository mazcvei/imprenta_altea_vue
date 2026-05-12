<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4 py-10 mt-20">
    <div class="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl border border-border bg-card">

      <div class="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop"
          class="absolute inset-0 w-full h-full object-cover"
        />

        <div class="absolute inset-0 bg-black/50"></div>

        <div class="relative z-10 h-full flex flex-col justify-end p-10 text-white">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm mb-6 w-fit">
            <div class="w-2 h-2 rounded-full bg-green-400"></div>
            Pago seguro con Stripe
          </div>

          <h1 class="text-5xl font-serif leading-tight mb-4">
            Finaliza tu
            <span class="text-green-400">pedido</span>
          </h1>

          <p class="text-lg text-white/90 leading-relaxed">
            Plataforma de pago segura para pedidos de impresión.
          </p>
        </div>
      </div>

      <div class="p-8 lg:p-12 bg-card text-card-foreground">
        <div class="mb-10">
          <h2 class="text-4xl font-serif mb-3">
            Realizar pago
          </h2>

          <p class="text-muted-foreground text-lg">
            Introduce el importe del pedido.
          </p>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">
              Importe (€)
            </label>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                €
              </span>

              <input
                v-model="amount"
                type="number"
                min="1"
                step="0.01"
                class="w-full h-14 rounded-xl border border-border bg-background pl-10 pr-4 text-lg outline-none focus:ring-2 focus:ring-primary"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">
              Dirección de facturación
            </label>

            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
                
              </span>

              <input
                v-model="shipping"
                type="text"
                class="w-full h-14 rounded-xl border border-border bg-background pl-10 pr-4 text-lg outline-none focus:ring-2 focus:ring-primary"
                placeholder="Dirección de facturación"
              />
            </div>
          </div>

          <div class="rounded-2xl border border-border bg-background p-6">
            <div class="flex justify-between items-center mb-3">
              <span class="text-muted-foreground">
                Subtotal
              </span>

              <span class="font-semibold text-lg">
                {{ Number(amount || 0).toFixed(2) }} €
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-muted-foreground">
                Total
              </span>

              <span class="text-3xl font-bold text-primary">
                {{ Number(amount || 0).toFixed(2) }} €
              </span>
            </div>
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

          <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm0 0V9m0 4h.01M5 12a7 7 0 1114 0 7 7 0 01-14 0z" />
            </svg>

            Pago seguro cifrado con Stripe
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const loading = ref(false)
const amount = ref(25)
const shipping = ref('')

const pay = async () => {
  try {
    loading.value = true

    const response = await api.post('/stripe/create-checkout-session', {
      amount: amount.value,
      product_name: 'Pedido Imprenta Altea',
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

