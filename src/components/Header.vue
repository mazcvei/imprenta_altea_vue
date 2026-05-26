<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-background/100 backdrop-blur-md border-b border-border"
  >
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
          <a
            href="#historia"
            class="text-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            Nuestra Historia
          </a>
          <a
            href="#servicios"
            class="text-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            Servicios
          </a>
          <a
            href="#contacto"
            class="text-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            Contacto
          </a>
        </nav>

        <!-- AUTH DESKTOP -->
        <div class="hidden md:flex items-center gap-3">
          <!-- NO AUTENTICADO -->
          <template v-if="!auth.isAuthenticated">
            <RouterLink to="/login">
              <button
                class="cursor-pointer text-foreground px-3 py-1 rounded hover:opacity-80"
              >
                Iniciar Sesión
              </button>
            </RouterLink>

            <RouterLink to="/registro">
              <button
                class="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 rounded"
              >
                Registrarse
              </button>
            </RouterLink>
          </template>

          <!-- AUTENTICADO -->
          <template v-else>
             <RouterLink
                v-if="auth.isAuthenticated"
                to="/carrito"
                class="relative flex items-center justify-center p-2"
              >
                🛒

                <span
                  v-if="cart.count > 0"
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {{ cart.count }}
                </span>
              </RouterLink>
            <div class="relative">
             
              <button
                @click="isUserDropdownOpen = !isUserDropdownOpen"
                class="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <span class="text-md font-medium">
                  {{ auth.user?.name }}
                </span>

                <span
                  class="text-md transition-transform"
                  :class="{ 'rotate-180': isUserDropdownOpen }"
                >
                  ▼
                </span>
              </button>

              <!-- DROPDOWN -->
              <div
                v-if="isUserDropdownOpen"
                class="absolute right-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-lg py-2 z-50"
              >
                <!-- ADMIN -->
                <RouterLink
                  v-if="auth.isAdmin"
                  to="/admin/productos"
                  class="block px-4 py-2 text-md hover:bg-gray-100 transition-colors"
                  @click="isUserDropdownOpen = false"
                >
                  Gestionar productos
                </RouterLink>
                
                <RouterLink
                  v-if="auth.isAdmin"
                  to="/admin/pedidos"
                  class="block px-4 py-2 text-md hover:bg-gray-100 transition-colors"
                  @click="isUserDropdownOpen = false"
                >
                  Gestionar pedidos
                </RouterLink>

           
                <RouterLink
                  to="/mi-perfil"
                  class="block px-4 py-2 text-md hover:bg-gray-100 transition-colors"
                  @click="isUserDropdownOpen = false"
                >
                  Mi perfil
                </RouterLink>
         
                <RouterLink
                  to="/mi-perfil"
                  class="block px-4 py-2 text-md hover:bg-gray-100 transition-colors"
                  @click="isUserDropdownOpen = false"
                >
                  Mis pedidos
                </RouterLink>

              
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-md text-red-600 hover:bg-gray-100 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </template>
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

      <!-- MOBILE MENU -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-border">
        <nav class="flex flex-col gap-4">
          <a
            href="#historia"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Nuestra Historia
          </a>

          <a
            href="#servicios"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Servicios
          </a>

          <a
            href="#contacto"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contacto
          </a>

          <div class="flex flex-col gap-2 pt-4 border-t border-border">
            <!-- NO AUTH MOBILE -->
            <template v-if="!auth.isAuthenticated">
              <RouterLink
                to="/login"
                class="text-foreground px-3 py-1 rounded-lg"
              >
                Iniciar Sesión
              </RouterLink>

              <RouterLink
                to="/registro"
                class="bg-primary text-white px-3 py-1 rounded-lg"
              >
                Registrarse
              </RouterLink>
            </template>

            <template v-else>
              <div class="text-sm text-muted-foreground px-3">
                {{ auth.user?.name }}
              </div>

              <button
                @click="auth.logout()"
                class="bg-red-500 text-white px-3 py-1 rounded-lg text-left"
              >
                Cerrar sesión
              </button>
            </template>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref,onMounted,watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";

const auth = useAuthStore();
const cart = useCartStore()

const isMenuOpen = ref(false);
const isUserDropdownOpen = ref(false)

const handleLogout = async () => {

  isUserDropdownOpen.value = false

  await auth.logout()

  window.location.href = '/'
}

console.log(auth.user);
console.log(auth.isAdmin);
</script>
