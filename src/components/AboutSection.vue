<template>
  <section id="historia" class="py-20 lg:py-32 bg-card">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">

      <div class="grid lg:grid-cols-2 gap-16 items-start">

        <!-- LEFT CONTENT -->
        <div>
          <p class="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Nuestra Historia
          </p>

          <h2 class="text-3xl lg:text-5xl font-serif leading-tight mb-8">
            Más de 60 años imprimiendo en Altea
          </h2>

          <div class="space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Fundada en 1962 por Antonio Mulet Zaragozi, conocido como Antonio "el cartero",
              nuestra imprenta nació en una época de retos como un proyecto familiar que hoy
              cuenta con más de seis décadas de historia.
            </p>

            <p>
              Comenzamos con una máquina plana y servicio de papelería. Poco después incorporamos
              la tipografía tradicional con una Minerva de aspas, que aún conservamos como símbolo
              de nuestros orígenes. Con el tiempo, evolucionamos hacia la impresión offset y, a
              principios de los 2000, la impresión digital.
            </p>

            <p>
              Hoy continuamos siendo una empresa familiar, con la misma pasión por la impresión y
              el compromiso con el trabajo bien hecho. Nuestra prioridad: la satisfacción del cliente.
            </p>
          </div>

          <a
            href="#servicios"
            class="inline-flex items-center gap-2 mt-8 text-sm font-medium text-foreground hover:opacity-70 transition"
          >
            Descubre nuestros servicios
            <span>→</span>
          </a>
        </div>

        <!-- RIGHT TIMELINE CARD -->
        <div class="bg-primary-foreground/40 border border-border rounded-lg p-8">

          <h3 class="font-serif text-lg mb-8">
            Nuestra Trayectoria
          </h3>

          <div class="relative">

            <!-- vertical line -->
            <div class="absolute left-2 top-0 bottom-0 w-px bg-border"></div>

            <ul class="space-y-10">

              <!-- ITEM 1 -->
              <li class="relative pl-10">
                <span class="absolute left-0 top-1 w-4 h-4 rounded-full bg-foreground"></span>
                <p class="font-medium">1962</p>
                <p class="text-sm text-muted-foreground">
                  Fundación en Calle Pont de Moncau
                </p>
              </li>

              <!-- ITEM 2 -->
              <li class="relative pl-10">
                <span class="absolute left-0 top-1 w-4 h-4 rounded-full bg-foreground"></span>
                <p class="font-medium">Década 1970</p>
                <p class="text-sm text-muted-foreground">
                  Incorporación de tipografía Minerva
                </p>
              </li>

              <!-- ITEM 3 -->
              <li class="relative pl-10">
                <span class="absolute left-0 top-1 w-4 h-4 rounded-full bg-foreground"></span>
                <p class="font-medium">1998</p>
                <p class="text-sm text-muted-foreground">
                  Traslado a Calle Benidorm
                </p>
              </li>

              <!-- ITEM 4 -->
              <li class="relative pl-10">
                <span class="absolute left-0 top-1 w-4 h-4 rounded-full bg-foreground"></span>
                <p class="font-medium">Hoy</p>
                <p class="text-sm text-muted-foreground">
                  Impresión digital y offset
                </p>
              </li>

            </ul>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>