<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-background/100 backdrop-blur-md border-b border-border">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <!-- Logo -->
        <a href="/" class="flex items-center gap-3">
          <div class="w-60 h-10 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" />
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#historia" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Nuestra Historia
          </a>
          <a href="#servicios" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Servicios
          </a>
          <a href="#contacto" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </a>
        </nav>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <RouterLink to="/login">
            <button class="cursor-pointer text-foreground px-3 py-1 rounded hover:opacity-80">
              Iniciar Sesión
            </button>
          </RouterLink>

          <RouterLink to="/registro">
            <button class="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded">
              Registrarse
            </button>
          </RouterLink>
        </div>

        <!-- Mobile Button -->
        <button
          type="button"
          class="md:hidden p-2 cursor-pointer"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle menu"
        >
          <span v-if="isMenuOpen">✖</span>
          <span v-else>☰</span>
        </button>

      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-border">
        <nav class="flex flex-col gap-4">

          <a href="#historia" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Nuestra Historia
          </a>

          <a href="#servicios" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Servicios
          </a>

          <a href="#contacto" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </a>

          <div class="flex flex-col gap-2 pt-4 border-t border-border">

            <RouterLink to="/login">
              <button class="cursor-pointer text-foreground px-3 py-1 text-left">
                Iniciar Sesión
              </button>
            </RouterLink>

            <RouterLink to="/registro">
              <button class="cursor-pointer bg-primary text-primary-foreground px-3 py-1">
                Registrarse
              </button>
            </RouterLink>

          </div>
        </nav>
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
</script>