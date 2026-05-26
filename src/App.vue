<template>
  <Header />
   <Notification />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import Notification from './components/Notification.vue'
import { RouterView } from "vue-router";
import { watch, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./stores/auth";
import { useCartStore } from "./stores/cart";

const auth = useAuthStore();
const cart = useCartStore();

onMounted(() => {
  if (auth.isAuthenticated) {
    cart.fetchCart();
  }
});

watch(
  () => auth.isAuthenticated,
  async (val) => {
    cart.fetchCart();
  },
);
</script>
