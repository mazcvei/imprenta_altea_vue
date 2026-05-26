<template>
  <section class="py-20 lg:py-28">
    <div class="max-w-6xl mx-auto px-6 lg:px-8">

      <!-- HEADER -->
      <div class="mb-10">
        <h1 class="font-serif text-3xl lg:text-4xl text-foreground">
          Tu carrito
        </h1>

        <p class="text-muted-foreground mt-2">
          Revisa tus productos antes de continuar al pago
        </p>
      </div>

      <!-- EMPTY -->
      <div
        v-if="!cart.loading && cart.items.length === 0"
        class="text-center py-20 text-muted-foreground"
      >
        Tu carrito está vacío
      </div>

      <!-- CONTENT -->
      <div v-else class="grid lg:grid-cols-3 gap-10 items-start">

        <!-- ITEMS -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center justify-between p-5 bg-card border border-border rounded-lg gap-6"
          >

            <!-- IZQUIERDA -->
            <div class="flex items-center gap-4">
              <!-- IMAGEN -->
              <div
                v-if="item.product.image"
                class="w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted shrink-0"
              >
                <img
                  :src="`${API_BASE_URL}/storage/${item.product.image}`"
                  alt="Imagen subida"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- PLACEHOLDER -->
              <div
                v-else
                class="w-24 h-24 rounded-lg border border-border bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0"
              >
                Sin imagen
              </div>
              <div>
                <h3 class="font-serif text-lg text-foreground">
                  {{ item.product.name }}
                </h3>

                <p class="text-sm text-muted-foreground">
                  {{ item.price_unit.units }}
                </p>
              </div>
            </div>

            <!-- DERECHA -->
            <div class="flex items-center gap-4">

              <!-- IMAGEN -->
              <div
                v-if="item.image"
                class="w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted shrink-0"
              >
                <img
                  :src="`${API_BASE_URL}/storage/${item.image}`"
                  alt="Imagen subida"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- PLACEHOLDER -->
              <div
                v-else
                class="w-24 h-24 rounded-lg border border-border bg-muted flex items-center justify-center text-xs text-muted-foreground shrink-0"
              >
                Sin imagen
              </div>

              <!-- PRECIO -->
              <div class="text-right min-w-[90px]">
                <p class="font-semibold text-foreground">
                  {{ item.price_unit.price }} €
                </p>

                <button
                  class="text-sm text-red-500 mt-2 hover:underline"
                  @click="cart.removeItem(item.id)"
                >
                  Eliminar
                </button>
              </div>

            </div>

          </div>
        </div>

        <!-- BILLING -->
        <div class="p-6 bg-card border border-border rounded-lg h-fit">
          <h3 class="font-serif text-xl text-foreground mb-4">
            Dirección de facturación
          </h3>

          <div class="space-y-4 grid-cols-2 lg:grid-cols-1 gap-4 lg:grid">

            <!-- Dirección -->
            <div>
              <input
                v-model="form.shipping"
                type="text"
                placeholder="Dirección"
                class="w-full h-8 rounded-xl border bg-background px-4 text-lg outline-none focus:ring-2"
                :class="errors.shipping ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'"
              />

              <p
                v-if="errors.shipping"
                class="text-sm text-red-500 mt-1"
              >
                {{ errors.shipping }}
              </p>
            </div>

            <div>
              <select
                v-model="form.province"
                class="w-full h-8 rounded-xl border bg-background px-4 text-lg outline-none focus:ring-2"
                :class="errors.province ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'"
              >
                <option value="">
                  Selecciona una provincia
                </option>

                <option
                  v-for="province in provinces"
                  :key="province"
                  :value="province"
                >
                  {{ province }}
                </option>
              </select>

              <p
                v-if="errors.province"
                class="text-sm text-red-500 mt-1"
              >
                {{ errors.province }}
              </p>
            </div>

            <div>
              <input
                v-model="form.locality"
                type="text"
                placeholder="Localidad"
                class="w-full h-8 rounded-xl border bg-background px-4 text-lg outline-none focus:ring-2"
                :class="errors.locality ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'"
              />
              <p
                v-if="errors.locality"
                class="text-sm text-red-500 mt-1"
              >
                {{ errors.locality }}
              </p>
            </div>

            <div>
              <input
                v-model="form.postalCode"
                type="text"
                maxlength="5"
                placeholder="Código postal"
                class="w-full h-8 rounded-xl border bg-background px-4 text-lg outline-none focus:ring-2"
                :class="errors.postalCode ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'"
              />

              <p
                v-if="errors.postalCode"
                class="text-sm text-red-500 mt-1"
              >
                {{ errors.postalCode }}
              </p>
            </div>

          </div>
        </div>

        <!-- RESUMEN -->
        <div class="p-6 bg-card border border-border rounded-lg h-fit lg:col-span-2">
          <h3 class="font-serif text-xl text-foreground mb-4">
            Resumen
          </h3>

          <div class="flex justify-between mb-4">
            <span class="text-muted-foreground">Productos</span>
            <span>{{ cart.count }}</span>
          </div>

          <div class="flex justify-between text-lg font-semibold mb-6">
            <span>Total</span>
            <span>{{ cart.total }} €</span>
          </div>

          <button
            @click="pay"
            :disabled="loading || !isFormValid"
            class="w-full h-14 rounded-xl bg-primary text-white text-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">
              Pagar ahora
            </span>

            <span v-else>
              Procesando...
            </span>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import api from '../services/api'
const API_BASE_URL = import.meta.env.VITE_ROOT_URL
const cart = useCartStore()

const loading = ref(false)

const provinces = [
  'Álava',
  'Albacete',
  'Alicante',
  'Almería',
  'Asturias',
  'Ávila',
  'Badajoz',
  'Barcelona',
  'Burgos',
  'Cáceres',
  'Cádiz',
  'Cantabria',
  'Castellón',
  'Ciudad Real',
  'Córdoba',
  'Cuenca',
  'Girona',
  'Granada',
  'Guadalajara',
  'Guipúzcoa',
  'Huelva',
  'Huesca',
  'Islas Baleares',
  'Jaén',
  'La Coruña',
  'La Rioja',
  'Las Palmas',
  'León',
  'Lérida',
  'Lugo',
  'Madrid',
  'Málaga',
  'Murcia',
  'Navarra',
  'Ourense',
  'Palencia',
  'Pontevedra',
  'Salamanca',
  'Santa Cruz de Tenerife',
  'Segovia',
  'Sevilla',
  'Soria',
  'Tarragona',
  'Teruel',
  'Toledo',
  'Valencia',
  'Valladolid',
  'Vizcaya',
  'Zamora',
  'Zaragoza'
]

const form = reactive({
  shipping: '',
  province: '',
  locality: '',
  postalCode: ''
})

const errors = reactive({
  shipping: '',
  province: '',
  locality: '',
  postalCode: ''
})

const validateField = (field) => {
  switch (field) {

    case 'shipping':
      errors.shipping =
        form.shipping.trim().length < 5
          ? 'Introduce una dirección válida'
          : ''
      break

    case 'province':
      errors.province =
        !form.province
          ? 'Selecciona una provincia'
          : ''
      break

    case 'locality':
      errors.locality =
        form.locality.trim().length < 2
          ? 'Introduce una localidad válida'
          : ''
      break

    case 'postalCode':
      errors.postalCode =
        !/^[0-9]{5}$/.test(form.postalCode)
          ? 'Código postal inválido'
          : ''
      break
  }
}

watch(
  () => ({ ...form }),
  () => {
    Object.keys(form).forEach(validateField)
  },
  { deep: true, immediate: true }
)

const isFormValid = computed(() => {
  return Object.values(errors).every(error => !error)
    && Object.values(form).every(value => value)
})

onMounted(() => {
  cart.fetchCart()
})

const pay = async () => {

  Object.keys(form).forEach(validateField)

  if (!isFormValid.value) {
    return
  }

  try {

    loading.value = true

    const response = await api.post(
      '/stripe/create-checkout-session',
      {
        shipping_address: form.shipping,
        province: form.province,
        locality: form.locality,
        postal_code: form.postalCode
      }
    )

    window.location.href = response.data.url

  } catch (error) {

    console.error(error)
    alert('Error al iniciar el pago')

  } finally {

    loading.value = false
  }
}
</script>