<template>
  <footer id="contacto" class="bg-primary text-primary-foreground">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-40 h-10 bg-primary-foreground rounded-sm flex items-center justify-center">
              <img src="/logo.png" alt="Logo" />
            </div>

            <div>
              <span class="font-serif text-xl font-semibold">Imprenta Altea</span>
              <p class="text-xs text-primary-foreground/70 tracking-wider">DESDE 1962</p>
            </div>
          </div>

          <p class="text-sm text-primary-foreground/80 leading-relaxed">
            Empresa familiar con más de 60 años de experiencia en servicios de impresión en Altea.
          </p>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-serif text-lg font-medium mb-6">Contacto</h4>

          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <MapPinIcon class="w-5 h-5 text-primary-foreground/70 mt-0.5 flex-shrink-0" />
              <span class="text-sm text-primary-foreground/80">
                Calle Benidorm, Altea, Alicante
              </span>
            </li>

            <li class="flex items-center gap-3">
              <PhoneIcon class="w-5 h-5 text-primary-foreground/70 flex-shrink-0" />
              <span class="text-sm text-primary-foreground/80">
                +34 965 84 09 19
              </span>
            </li>

            <li class="flex items-center gap-3">
              <MailIcon class="w-5 h-5 text-primary-foreground/70 flex-shrink-0" />
              <span class="text-sm text-primary-foreground/80">
                info@imprentaaltea.es
              </span>
            </li>
          </ul>
        </div>

        <!-- Hours -->
        <div>
          <h4 class="font-serif text-lg font-medium mb-6">Horario</h4>

          <ul class="space-y-4">

            <li class="flex items-start gap-3">
              <ClockIcon class="w-5 h-5 text-primary-foreground/70 mt-0.5 flex-shrink-0" />
              <div class="text-sm text-primary-foreground/80">
                <p>Lunes - Viernes</p>
                <p class="text-primary-foreground">9:00 - 14:00 / 17:00 - 20:00</p>
              </div>
            </li>

            <li class="flex items-start gap-3">
              <ClockIcon class="w-5 h-5 text-transparent mt-0.5 flex-shrink-0" />
              <div class="text-sm text-primary-foreground/80">
                <p>Sábados</p>
                <p class="text-primary-foreground">9:00 - 14:00</p>
              </div>
            </li>

          </ul>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-serif text-lg font-medium mb-6">Enlaces</h4>

          <ul class="space-y-3">
            <li>
              <a href="#historia" class="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Nuestra Historia
              </a>
            </li>

            <li>
              <a href="#servicios" class="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Servicios
              </a>
            </li>

            <li>
              <a href="#" class="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Realizar Pedido
              </a>
            </li>

            <li>
              <a href="#" class="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom -->
      <div class="mt-16 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">

        <p class="text-sm text-primary-foreground/70">
          © {{ year }} Imprenta Altea. Todos los derechos reservados.
        </p>

        <p class="text-sm text-primary-foreground/70">
          Altea, Alicante - España
        </p>

      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
</script>