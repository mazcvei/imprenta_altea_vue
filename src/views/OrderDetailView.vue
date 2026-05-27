<template>
  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-3xl font-serif text-foreground">
            Pedido #{{ order?.id }}
          </h1>

          <p class="text-muted-foreground mt-2">
            Detalle completo del pedido
          </p>
        </div>

        <RouterLink
          to="/admin/pedidos"
          class="px-5 py-3 rounded-xl border border-border hover:bg-muted transition"
        >
          Volver
        </RouterLink>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="text-center py-20 text-muted-foreground"
      >
        Cargando pedido...
      </div>

      <div v-else-if="order">

        <!-- INFO -->
        <div class="grid sm:grid-cols-2 gap-6 mb-8">

          <!-- CLIENT -->
          <div class="bg-card border border-border rounded-2xl p-6">
            <h2 class="text-xl font-medium mb-5">
              Cliente
            </h2>

            <div class="space-y-3">
              <p>
                <span class="font-medium">Nombre:</span>
                {{ order.user.name }}
                {{ order.user.lastname1 }}
                {{ order.user.lastname2 }}
              </p>

              <p>
                <span class="font-medium">Email:</span>
                {{ order.user.email }}
              </p>

              <p>
                <span class="font-medium">Provincia:</span>
                {{ order.address.province }}
              </p>
              <p>
                <span class="font-medium">Localidad:</span>
                {{ order.address.city }}
              </p>
              <p>
                <span class="font-medium">Dirección:</span>
                {{ order.address.address_line }}
              </p>
              <p>
                <span class="font-medium">CP:</span>
                {{ order.address.postal_code }}
              </p>
            </div>
          </div>

          <!-- ORDER -->
          <div class="bg-card border border-border rounded-2xl p-6">
            <h2 class="text-xl font-medium mb-5">
              Pedido
            </h2>

            <div class="space-y-4">

              <div>
                <span class="font-medium">Estado:</span>

                <select
                  v-if="isAdmin"
                  v-model="order.status"
                  @change="updateStatus"
                  class="ml-3 h-11 rounded-xl border border-border bg-background px-4"
                >
                  <option :value="ORDER_STATUS.PENDIENTE">Pendiente</option>

                  <option :value="ORDER_STATUS.PROCESANDO">Procesando</option>

                  <option :value="ORDER_STATUS.COMPLETADO">Completado</option>

                  <option :value="ORDER_STATUS.CANCELADO">Cancelado</option>
                </select>

                <span
                  v-else
                  class="ml-2"
                >
                  {{ order.status }}
                </span>
              </div>

              <p>
                <span class="font-medium">Método pago:</span>
                {{ order.payment_method || '-' }}
              </p>

              <p>
                <span class="font-medium">Total:</span>
                {{ order.total }} €
              </p>

              <p>
                <span class="font-medium">Fecha:</span>
                {{ formatDate(order.created_at) }}
              </p>

            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-2xl overflow-hidden">

          <div class="px-6 py-5 border-b border-border">
            <h2 class="text-xl font-medium">
              Productos del pedido
            </h2>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-muted/30 border-b border-border">
                <tr>
                  <th class="text-left px-6 py-4 font-medium">Producto</th>

                  <th class="text-left px-6 py-4 font-medium">Cantidad</th>

                  <th class="text-left px-6 py-4 font-medium">Precio</th>

                  <th class="text-left px-6 py-4 font-medium">Imagen</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="item in order.items"
                  :key="item.id"
                  class="border-b border-border last:border-0"
                >
                  <td class="px-6 py-4">
                    {{ item.product?.name }}
                  </td>

                  <td class="px-6 py-4">
                    {{ item.price_unit?.units }}
                  </td>

                  <td class="px-6 py-4">
                    {{ item.price_unit.price }} €
                  </td>

                <td class="px-6 py-4">
                    <a v-if="item.image"
                    :href="`${API_BASE_URL}storage/${item.image}`"
                    target="_blank"
                    class="px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
                  >
                    Descargar
                  </a> 
                </td>

                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import api from "../services/api";
import { useAuthStore } from "../stores/auth";
import { useOrderStore } from "../stores/orders";
const API_BASE_URL = import.meta.env.VITE_ROOT_URL;
const route = useRoute();

const authStore = useAuthStore();
const orderStore = useOrderStore();

const loading = ref(false);

const order = ref(null);

const ORDER_STATUS = {
  PENDIENTE: "Pendiente",
  PROCESANDO: "Procesando",
  COMPLETADO: "Completado",
  CANCELADO: "Cancelado",
};

const isAdmin = computed(() => {
  return authStore.user?.role === "admin";
});

onMounted(async () => {
  loading.value = true;

  try {
    const response = await api.get(`/orders/${route.params.id}`);

    order.value = response.data.data || response.data;
   
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const updateStatus = async () => {
  try {
    await orderStore.updateOrderStatus(
      order.value.id,
      order.value.status
    );
  } catch (error) {
    console.error(error);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>