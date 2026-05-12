<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="max-w-lg w-full bg-card border border-border rounded-3xl p-10 text-center shadow-xl">
      <div class="w-20 h-20 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 class="text-4xl font-serif mb-4">
        Pago cancelado
      </h1>

      <p class="text-muted-foreground text-lg mb-8">
        El pago no se ha completado.
      </p>

      <router-link
        to="/pago"
        class="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-white font-semibold"
      >
        Intentar nuevamente
      </router-link>
    </div>
  </div>
</template>