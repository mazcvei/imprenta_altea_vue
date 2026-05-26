<template>
  <div
    v-if="store.notification.show"
    class="fixed top-5 right-5 px-4 py-3 rounded-xl shadow-lg text-white"
    :class="store.notification.type === 'success'
      ? 'bg-green-600'
      : 'bg-red-600'"
  >
    {{ store.notification.message }}
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/products'

const store = useProductStore()
</script>