<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4 mt-4">

    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-12">

      <h1 class="text-2xl font-bold text-center mb-2">Crear cuenta</h1>
      <p class="text-sm text-center text-gray-500 mb-6">
        Regístrate para continuar
      </p>

      <form class="space-y-4">

        <input
          type="text"
          placeholder="Nombre"
          class="w-full p-3 border rounded bg-gray-50"
        />

        <input
          type="email"
          placeholder="Email"
          class="w-full p-3 border rounded bg-gray-50"
        />

        <input
          type="password"
          placeholder="Contraseña"
          class="w-full p-3 border rounded bg-gray-50"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          class="w-full p-3 border rounded bg-gray-50"
        />

        <button
          type="submit"
          class="w-full bg-primary text-white py-3 rounded hover:bg-primary/90"
        >
          Registrarse
        </button>

      </form>

      <p class="text-sm text-center mt-4">
        ¿Ya tienes cuenta?
        <RouterLink to="/login" class="text-green-600">
          Inicia sesión
        </RouterLink>
      </p>

    </div>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>