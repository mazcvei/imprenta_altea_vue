
<template>
  <section id="servicios" class="py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-medium text-accent tracking-wider uppercase mb-4">
          Nuestros Servicios
        </p>
        <h2 class="font-serif text-3xl lg:text-5xl font-medium text-foreground">
          Soluciones de impresion para cada necesidad
        </h2>
      </div>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
         <RouterLink
          v-for="product in productStore.getFormattedProducts"
          :key="product.id"
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="group p-6 lg:p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
        >
          <h3 class="font-serif text-xl font-medium text-foreground mb-3">
            {{ product.title }}
          </h3>

          <p class="text-sm text-muted-foreground leading-relaxed">
            {{ product.description }}
          </p>
        </RouterLink>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center">
        <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-card border border-border rounded-lg">
          <div>
            <h3 class="font-serif text-xl font-medium text-foreground">
              ¿Listo para empezar?
            </h3>
            <p class="text-sm text-muted-foreground mt-1">
              Accede a nuestra plataforma y realiza tu pedido online
            </p>
          </div>
          <RouterLink to="/pago">
            <button class="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3">
              Realizar Pedido
            </button>
          </RouterLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>