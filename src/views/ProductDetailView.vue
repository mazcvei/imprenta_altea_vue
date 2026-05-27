<template>
  <section class="py-20 lg:py-28">
    <div class="max-w-6xl mx-auto px-6 lg:px-8">
      <!-- Loading -->
      <div v-if="store.loading" class="text-center text-muted-foreground">
        Cargando producto...
      </div>

      <div v-else-if="product" class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- IMAGEN -->
        <div class="bg-card border border-border rounded-lg overflow-hidden">
          <img
            :src="`${API_BASE_URL}/storage/${product.image}` || '/placeholder.jpg'"
            class="w-full h-[420px] object-cover"
            alt="producto"
          />
        </div>

        <!-- INFO -->
        <div class="space-y-6">
          <div>
            <h1
              class="font-serif text-3xl lg:text-4xl font-medium text-foreground"
            >
              {{ product.name }}
            </h1>

            <p class="text-muted-foreground mt-4 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- SELECTOR DE UNIDADES -->
          <div class="space-y-3">
            <h3
              class="text-sm font-medium text-foreground uppercase tracking-wide"
            >
              Selecciona unidades
            </h3>

            <div class="space-y-2">
              <label
                v-for="price in product.prices"
                :key="price.id"
                class="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:border-accent/50 transition"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="radio"
                    name="price"
                    :value="price"
                    v-model="selectedPrice"
                  />

                  <span class="text-sm text-foreground">
                    {{ price.units }}
                  </span>
                </div>

                <span class="font-medium text-foreground">
                  {{ price.price }} €
                </span>
              </label>
            </div>
            <div class="space-y-3">
              <label
                class="text-sm font-medium text-foreground uppercase tracking-wide"
              >
                Adjuntar imagen
              </label>

              <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="w-full border border-border rounded-md p-2 bg-background text-foreground"
              />

              <div v-if="previewImage" class="mt-4">
                <img
                  :src="previewImage"
                  class="w-40 h-40 object-cover rounded-lg border border-border"
                />
              </div>
            </div>

          </div>

          <!-- RESUMEN -->
          <div class="p-4 bg-card border border-border rounded-lg">
            <p class="text-sm text-muted-foreground">Total seleccionado:</p>

            <p class="text-2xl font-semibold text-foreground mt-1">
              {{ selectedPrice?.price || 0 }} €
            </p>
          </div>
          <button
            class="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md transition cursor-pointer"
            :disabled="loading"
            @click="addToCart"
          >
            Añadir al carrito
          </button>
        
         <!--  <button
            class="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md transition cursor-pointer"
            :disabled="loading"
            @click="pay"
          >
            Pagar ahora
          </button> -->
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api";
import { useProductStore } from "../stores/products";
import { useCartStore } from "../stores/cart";
const API_BASE_URL = import.meta.env.VITE_ROOT_URL
const route = useRoute();
const store = useProductStore();
const cart = useCartStore();

const product = ref(null);
const selectedPrice = ref(null);
const loading = ref(false);
const selectedFile = ref(null);
const previewImage = ref(null);

onMounted(async () => {
  product.value = await store.fetchProduct(route.params.id);

  if (product.value?.prices?.length) {
    selectedPrice.value = product.value.prices[0];
  }
});

/* const pay = async () => {
  if (!selectedPrice.value) {
    alert("Selecciona una opción primero");
    return;
  }

  try {
    loading.value = true;

    const response = await api.post("/stripe/create-checkout-session", {
      product_id: product.value.id,
      product_name: product.value.name,
      price_unit_id: selectedPrice.value.id,
      units: selectedPrice.value.units,
      price: selectedPrice.value.price,
    });

    window.location.href = response.data.url;
  } catch (error) {
    console.error(error);
    alert("Error al iniciar el pago");
  } finally {
    loading.value = false;
  }
}; */
const addToCart = async () => {
  if (!selectedPrice.value) {
    alert("Selecciona una opción primero");
    return;
  }

  try {
    loading.value = true;

    const formData = new FormData();

    formData.append("product_id", product.value.id);
    formData.append("price_unit_id", selectedPrice.value.id);

    if (selectedFile.value) {
      formData.append("image", selectedFile.value);
    }

    await api.post("/cart", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    cart.fetchCart();

    alert("Producto añadido al carrito");
  } catch (error) {
    console.error(error);
    alert("Error al añadir al carrito");
  } finally {
    loading.value = false;
  }
};
const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  // Máximo 4MB
  const maxSize = 4 * 1024 * 1024;

  
  if (!allowedTypes.includes(file.type)) {
    alert("Solo se permiten imágenes JPG, JPEG, PNG o WEBP");

    event.target.value = "";

    selectedFile.value = null;
    previewImage.value = null;

    return;
  }

  // Validar tamaño
  if (file.size > maxSize) {
    alert("La imagen no puede superar los 4MB");

    event.target.value = "";

    selectedFile.value = null;
    previewImage.value = null;

    return;
  }

  selectedFile.value = file;

  previewImage.value = URL.createObjectURL(file);
};
</script>
