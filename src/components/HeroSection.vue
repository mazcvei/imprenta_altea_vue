<script setup>
// Si usas iconos tipo lucide en Vue:
// import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <div class="p-6 bg-blue-500 text-white"></div>
  <section
    class="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[url('/fondo1.jpeg')] bg-cover bg-center"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full mb-8"
        >
          <span class="w-2 h-2 bg-accent rounded-full"></span>
          <span class="text-sm text-muted-foreground font-bold">
            Más de 60 años de tradición
          </span>
        </div>

        <!-- Title -->
        <h1
          class="font-serif text-4xl sm:text-5xl lg:text-7xl font-medium text-white leading-tight max-w-4xl text-balance"
        >
          Tradición e innovación en cada impresión
        </h1>

        <!-- Subtitle -->
        <p
          class="mt-6 text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed"
        >
          Desde 1962, combinamos el arte de la impresión tradicional con las
          últimas tecnologías para ofrecer resultados excepcionales.
        </p>

        <!-- Buttons -->
        <div class="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/#servicios">
            <button
              class="bg-primary rounded cursor-pointer text-primary-foreground hover:bg-primary/90 px-8 h-12 flex items-center"
            >
              Realizar Pedido
            </button>
          </a>

          <button
            class="px-8 rounded h-12 cursor-pointer border border-white/40 text-white hover:bg-white/10 bg-transparent"
          >
            Conocer Más
          </button>
        </div>

        <!-- Stats -->
        <div
          class="mt-20 grid grid-cols-3 gap-8 lg:gap-16 border-t border-white/20 pt-10"
        >
          <div class="text-center">
            <p class="font-serif text-3xl lg:text-4xl font-semibold text-white">
              1962
            </p>
            <p class="mt-2 text-sm text-white/70">Año de fundación</p>
          </div>

          <div class="text-center">
            <p class="font-serif text-3xl lg:text-4xl font-semibold text-white">
              60+
            </p>
            <p class="mt-2 text-sm text-white/70">Años de experiencia</p>
          </div>

          <div class="text-center">
            <p class="font-serif text-3xl lg:text-4xl font-semibold text-white">
              3
            </p>
            <p class="mt-2 text-sm text-white/70">Generaciones</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
