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
            :src="product.image || '/placeholder.jpg'"
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
          </div>

          <!-- RESUMEN -->
          <div class="p-4 bg-card border border-border rounded-lg">
            <p class="text-sm text-muted-foreground">Total seleccionado:</p>

            <p class="text-2xl font-semibold text-foreground mt-1">
              {{ selectedPrice?.price || 0 }} €
            </p>
          </div>
          <button
            class="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-3 rounded-md transition"
            :disabled="loading"
            @click="addToCart"
          >
            Añadir al carrito
          </button>
          <!-- BOTÓN -->
          <button
            class="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-md transition"
            :disabled="loading"
            @click="pay"
          >
            Pagar ahora
          </button>
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

const route = useRoute();
const store = useProductStore();
const cart = useCartStore();

const product = ref(null);
const selectedPrice = ref(null);
const loading = ref(false);

onMounted(async () => {
  product.value = await store.fetchProduct(route.params.id);

  if (product.value?.prices?.length) {
    selectedPrice.value = product.value.prices[0];
  }
});

const pay = async () => {
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
};
const addToCart = async () => {
  if (!selectedPrice.value) {
    alert("Selecciona una opción primero");
    return;
  }

  try {
    loading.value = true;

    await api.post("/cart", {
      product_id: product.value.id,
      price_unit_id: selectedPrice.value.id,
    });
    cart.fetchCart(); // Actualiza el estado del carrito después de añadir un producto

    alert("Producto añadido al carrito");
  } catch (error) {
    console.error(error);
    alert("Error al añadir al carrito");
  } finally {
    loading.value = false;
  }
};
</script>
