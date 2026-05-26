<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4 mt-20 mb-20">

    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-12">

      <h1 class="text-2xl font-bold text-center mb-2">
        Crear cuenta
      </h1>

      <p class="text-sm text-center text-gray-500 mb-6">
        Regístrate para continuar
      </p>

      <form @submit.prevent="submit" class="space-y-4">

        <!-- Nombre -->
        <div>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nombre"
            class="w-full p-3 border rounded bg-gray-50"
          />

          <p v-if="errors.name" class="text-red-500 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <!-- Apellido 1 -->
        <div>
          <input
            v-model="form.lastname1"
            type="text"
            placeholder="Apellido 1"
            class="w-full p-3 border rounded bg-gray-50"
          />

          <p v-if="errors.lastname1" class="text-red-500 text-sm mt-1">
            {{ errors.lastname1 }}
          </p>
        </div>

        <!-- Apellido 2 -->
        <div>
          <input
            v-model="form.lastname2"
            type="text"
            placeholder="Apellido 2"
            class="w-full p-3 border rounded bg-gray-50"
          />

          <p v-if="errors.lastname2" class="text-red-500 text-sm mt-1">
            {{ errors.lastname2 }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="w-full p-3 border rounded bg-gray-50"
          />

          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Contraseña -->
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Contraseña"
            class="w-full p-3 border rounded bg-gray-50"
          />

          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirmar contraseña -->
        <div>
          <input
            v-model="form.password_confirmation"
            type="password"
            placeholder="Confirmar contraseña"
            class="w-full p-3 border rounded bg-gray-50"
          />

          <p
            v-if="errors.password_confirmation"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.password_confirmation }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full bg-primary text-white py-3 rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {{ auth.loading ? 'Registrando...' : 'Registrarse' }}
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

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const errors = ref({})

const form = reactive({
  name: '',
  lastname1: '',
  lastname2: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const validateForm = () => {

  errors.value = {}

  // Nombre
  if (!form.name.trim()) {
    errors.value.name = 'El nombre es obligatorio'
  } else if (form.name.length > 255) {
    errors.value.name = 'Máximo 255 caracteres'
  } else if (form.name.length < 3) {
    errors.value.name = 'Mínimo 3 caracteres'
  }

  // Apellido 1
  if (!form.lastname1.trim()) {
    errors.value.lastname1 = 'El apellido 1 es obligatorio'
  } else if (form.lastname1.length > 255) {
    errors.value.lastname1 = 'Máximo 255 caracteres'
  } else if (form.lastname1.length < 3) {
    errors.value.lastname1 = 'Mínimo 3 caracteres'
  }

  // Apellido 2
  if (!form.lastname2.trim()) {
    errors.value.lastname2 = 'El apellido 2 es obligatorio'
  } else if (form.lastname2.length > 255) {
    errors.value.lastname2 = 'Máximo 255 caracteres'
  } else if (form.lastname2.length < 3) {
    errors.value.lastname2 = 'Mínimo 3 caracteres'
  }

  // Email
  if (!form.email.trim()) {
    errors.value.email = 'El email es obligatorio'
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.value.email = 'Email inválido'
  } else if (form.email.length > 255) {
    errors.value.email = 'Máximo 255 caracteres'
  }

  if (!form.password) {
    errors.value.password = 'La contraseña es obligatoria'
  } else if (form.password.length < 6) {
    errors.value.password = 'Mínimo 6 caracteres'
  }

  if (!form.password_confirmation) {
    errors.value.password_confirmation = 'Confirma la contraseña'
  } else if (form.password !== form.password_confirmation) {
    errors.value.password_confirmation = 'Las contraseñas no coinciden'
  }

  return Object.keys(errors.value).length === 0
}

const submit = async () => {

  if (!validateForm()) return

  try {

    await auth.register(form)

    router.push('/')

  } catch (error) {

    // errores de Laravel
    if (error.response?.data?.errors) {

      errors.value = {}

      Object.keys(error.response.data.errors).forEach(key => {
        errors.value[key] = error.response.data.errors[key][0]
      })

      return
    }

    alert(
      error.response?.data?.message ||
      'Error al registrarse'
    )
  }
}
</script>