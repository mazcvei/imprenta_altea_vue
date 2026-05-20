<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watch,onMounted } from 'vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'

const auth = useAuthStore()
const cart = useCartStore()
console.log(auth.isAuthenticated);


onMounted(async () => {
   
    await cart.fetchCount()

  
})

watch(
  () => auth.isAuthenticated,
  async (val) => {
    await  cart.fetchCart()
  }
)
</script>