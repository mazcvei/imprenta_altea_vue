<script setup>
// import icons si usas librería
const services = [
  {
    title: "Carpetas",
    description: "Disponibles con o sin solapa..."
  },
  {
    title: "Flayers",
    description: "Disponibles en acabado brillo o mate..."
  },
  {
    title: "Papel de Carta",
    description: "Nuestro papel de carta..."
  },
  {
    title: "Sobres",
    description: "Nuestros sobres..."
  },
  {
    title: "Tarjetas de Visita",
    description: "Nuestras tarjetas..."
  }
]
</script>

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
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group p-6 lg:p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
        >
          <h3 class="font-serif text-xl font-medium text-foreground mb-3">
            {{ service.title }}
          </h3>
          <p class="text-sm text-muted-foreground leading-relaxed">
            {{ service.description }}
          </p>
        </div>
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

          <button class="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3">
            Realizar Pedido
          </button>
        </div>
      </div>

    </div>
  </section>
</template>