<!-- ProductFormView.vue -->
<template>
  <section class="py-20">
    <div class="max-w-4xl mx-auto px-6">

      <div class="mb-10">
        <h1 class="text-3xl font-serif text-foreground">
          {{ isEdit ? 'Editar producto' : 'Crear producto' }}
        </h1>

        <p class="text-muted-foreground mt-2">
          Gestiona la información del producto
        </p>
      </div>

      <form
        @submit.prevent="submit"
        class="space-y-8 bg-card border border-border rounded-2xl p-8"
      >

        <!-- NOMBRE -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Nombre
          </label>

          <input
            v-model="form.name"
            type="text"
            class="w-full h-12 rounded-xl border px-4 bg-background"
          />

          <p
            v-if="errors.name"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.name }}
          </p>
        </div>

        <!-- DESCRIPCIÓN -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Descripción
          </label>

          <textarea
            v-model="form.description"
            rows="5"
            class="w-full rounded-xl border px-4 py-3 bg-background"
          />

          <p
            v-if="errors.description"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.description }}
          </p>
        </div>

        <!-- IMAGEN -->
        <div>
          <label class="block mb-2 text-sm font-medium">
            Imagen
          </label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            @change="handleImage"
            class="w-full border rounded-xl p-3 bg-background"
          />

          <p
            v-if="errors.image"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.image }}
          </p>

          <div
            v-if="previewImage"
            class="mt-4"
          >
            <img
              :src="previewImage"
              class="w-40 h-40 rounded-xl object-cover border"
            />
          </div>
        </div>

        <!-- PRECIOS -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-medium text-lg">
              Unidades y precios
            </h3>

            <button
              type="button"
              @click="addPrice"
              class="px-4 py-2 bg-primary text-white rounded-lg"
            >
              Añadir
            </button>
          </div>

          <div
            v-for="(price, index) in form.prices"
            :key="index"
            class="grid grid-cols-3 gap-4 mb-4"
          >

            <div>
              <input
                v-model="price.units"
                type="text"
                placeholder="100 tarjetas"
                class="w-full h-12 rounded-xl border px-4 bg-background"
              />
            </div>

            <div>
              <input
                v-model="price.price"
                type="number"
                step="0.01"
                placeholder="19.99"
                class="w-full h-12 rounded-xl border px-4 bg-background"
              />
            </div>

            <div>
              <button
                type="button"
                @click="removePrice(index)"
                class="w-full h-12 rounded-xl bg-red-500 text-white"
              >
                Eliminar
              </button>
            </div>

          </div>
        </div>

        <!-- BOTÓN -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full h-14 rounded-xl bg-primary text-white font-semibold"
        >
          <span v-if="!loading">
            {{ isEdit ? 'Actualizar producto' : 'Crear producto' }}
          </span>

          <span v-else>
            Guardando...
          </span>
        </button>

      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'
import { useProductStore } from "../stores/products";
const route = useRoute()
const router = useRouter()
const store = useProductStore();
const loading = ref(false)

const product = ref(null);
const previewImage = ref(null)

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  description: '',
  image: null,
  prices: [
    {
      units: '',
      price: ''
    }
  ]
})

const errors = reactive({})

const handleImage = (event) => {

  const file = event.target.files[0]

  if (!file) return

  form.image = file

  previewImage.value = URL.createObjectURL(file)
}

const addPrice = () => {

  form.prices.push({
    units: '',
    price: ''
  })
}

const removePrice = (index) => {

  form.prices.splice(index, 1)
}

onMounted(async () => {
  if (!isEdit.value) return

  const data = await store.fetchProduct(route.params.id)
  product.value = data
  resetForm();
  
  form.name = data.name || ''
  form.description = data.description || ''


  previewImage.value = data.image_url || null

  // precios
  form.prices = data.prices?.length
    ? data.prices.map(p => ({
        id: p.id,
        units: p.units,
        price: p.price
      }))
    : [{ units: '', price: '' }]
})
const resetForm = () => {
  form.name = ''
  form.description = ''
  form.image = null
  form.prices = [{ units: '', price: '' }]
  previewImage.value = null
}
const submit = async () => {

  try {

    loading.value = true

    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('description', form.description)

    if (form.image) {
      formData.append('image', form.image)
    }

    form.prices.forEach((price, index) => {

      formData.append(
        `prices[${index}][units]`,
        price.units
      )

      formData.append(
        `prices[${index}][price]`,
        price.price
      )

      if (price.id) {

        formData.append(
          `prices[${index}][id]`,
          price.id
        )
      }
    })

    if (isEdit.value) {
      await store.updateProduct(route.params.id, formData)
    } else {
      await store.storeProduct(formData)
    }

    router.push('/admin/productos')

  } catch (error) {

    if (error.response?.status === 422) {

      Object.assign(
        errors,
        error.response.data.errors
      )
    }

    console.error(error)

  } finally {

    loading.value = false
  }
}
</script>