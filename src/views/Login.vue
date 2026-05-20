<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">

      <h1 class="text-2xl font-bold text-center mb-2">Iniciar sesión</h1>
      <p class="text-sm text-center text-gray-500 mb-6">Accede a tu cuenta</p>

      <form class="space-y-4"  @submit.prevent="submit">

        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full p-3 border rounded bg-gray-50"
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Contraseña"
          class="w-full p-3 border rounded bg-gray-50"
        />

        <button
          @click="submit"
          :disabled="auth.loading"
          class="w-full cursor-pointer bg-primary text-white py-3 rounded-lg hover:bg-black transition"
        >
          Iniciar sesión
        </button>

      </form>

      <p class="text-sm text-center mt-4">
        ¿No tienes cuenta?
        <RouterLink to="/registro" class="text-green-600">
          Regístrate
        </RouterLink>
      </p>

    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {

  try {

    await auth.login(form)

    router.push('/')

  } catch (error) {

    alert(
      error.response?.data?.error ||
      'Error login'
    )
  }
}
</script>