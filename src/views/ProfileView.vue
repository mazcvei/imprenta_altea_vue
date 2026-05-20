<template>
  <div class="min-h-screen bg-background pt-32 pb-20 px-4">
    <div
      class="max-w-2xl mx-auto bg-card border border-border rounded-2xl shadow-sm p-8"
    >
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">
          Mi Perfil
        </h1>

        <p class="text-muted-foreground mt-2">
          Actualiza tus datos personales y contraseña.
        </p>
      </div>

      <form
        @submit.prevent="submit"
        class="space-y-6"
      >
        <!-- Nombre -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Nombre
          </label>

          <input
            v-model="form.name"
            type="text"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
             :class="
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-primary'
              "
          />
           <p v-if="errors.name"
              class="text-red-500 text-sm mt-1"
            >
              {{ errors.name }}
            </p>
        </div>

        <!-- Apellido 1 -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Primer apellido
          </label>

          <input
            v-model="form.lastname1"
            type="text"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary":class="
                errors.lastname1
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-primary'
              "
            />

            <p
              v-if="errors.lastname1"
              class="text-red-500 text-sm mt-1"
            >
              {{ errors.lastname1 }}
            </p>
        </div>

        <!-- Apellido 2 -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Segundo apellido
          </label>

          <input
            v-model="form.lastname2"
            type="text"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            :class="
              errors.lastname2
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-primary'
            "
          />

          <p
            v-if="errors.lastname2"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.lastname2 }}
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Email
          </label>

          <input
            v-model="form.email"
            type="email"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
           :class=" errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-primary'
              "
            />

            <p
              v-if="errors.email"
              class="text-red-500 text-sm mt-1"
            >
              {{ errors.email }}
            </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Nueva contraseña
          </label>

          <input
            v-model="form.password"
            type="password"
            placeholder="Dejar vacío para no cambiar"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
           :class="
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-border focus:ring-primary'
              "
            />

            <p
              v-if="errors.password"
              class="text-red-500 text-sm mt-1"
            >
              {{ errors.password }}
            </p>
        </div>

        <!-- Confirmación -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Confirmar contraseña
          </label>

          <input
            v-model="form.password_confirmation"
            type="password"
            class="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
           :class="
              errors.password_confirmation
                ? 'border-red-500 focus:ring-red-500'
                : 'border-border focus:ring-primary'
            "
          />

          <p
            v-if="errors.password_confirmation"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.password_confirmation }}
          </p>
        </div>

        <!-- ERROR -->
        <div
          v-if="error"
          class="bg-red-500/10 border border-red-500 text-red-500 rounded-lg px-4 py-3 text-sm"
        >
          {{ error }}
        </div>

        <!-- SUCCESS -->
        <div
          v-if="success"
          class="bg-green-500/10 border border-green-500 text-green-600 rounded-lg px-4 py-3 text-sm"
        >
          {{ success }}
        </div>

        <!-- BUTTON -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full cursor-pointer bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          <span v-if="loading">
            Guardando...
          </span>

          <span v-else>
            Guardar cambios
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed,watch } from 'vue'
import { useAuthStore } from '../stores/auth'


const auth = useAuthStore()

const loading = ref(false)
const error = ref('')
const success = ref('')


const form = reactive({

  name: auth.user?.name || '',

  lastname1: auth.user?.lastname1 || '',

  lastname2: auth.user?.lastname2 || '',

  email: auth.user?.email || '',

  password: '',

  password_confirmation: '',
})
watch(form, () => {
  validateForm()
}, { deep: true })

/**
 * VALIDACIONES
 */
const errors = reactive({
  name: '',
  lastname1: '',
  lastname2: '',
  email: '',
  password: '',
  password_confirmation: '',
})

function validateForm() {

  let valid = true

  // limpiar errores
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

 
  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    valid = false
  } else if (form.name.length < 2) {
    errors.name = 'Mínimo 2 caracteres'
    valid = false
  }

  
  if (form.lastname1.length < 2) {
    errors.lastname1 = 'Mínimo 2 caracteres'
    valid = false
  }


  if (form.lastname2 && form.lastname2.length < 2) {
    errors.lastname2 = 'Mínimo 2 caracteres'
    valid = false
  }


  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.email.trim()) {
    errors.email = 'El email es obligatorio'
    valid = false

  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Email inválido'
    valid = false
  }


  if (form.password) {

    if (form.password.length < 6) {
      errors.password =
        'La contraseña debe tener mínimo 6 caracteres'

      valid = false
    }

    if (
      form.password !==
      form.password_confirmation
    ) {
      errors.password_confirmation =
        'Las contraseñas no coinciden'

      valid = false
    }
  }

  return valid
}

const isFormValid = computed(() => {
  return validateForm()
})

async function submit() {

  error.value = ''
  success.value = ''

  const valid = validateForm()

  if (!valid) return

  loading.value = true

  try {
    console.log(form);
    await auth.updateProfile(form)

    success.value =
      'Perfil actualizado correctamente'

    form.password = ''
    form.password_confirmation = ''

  } catch (e) {

    if (e.response?.data?.message) {
      error.value = e.response.data.message
    } else {
      error.value =
        'Error al actualizar el perfil'
    }

  } finally {

    loading.value = false
  }
}
</script>