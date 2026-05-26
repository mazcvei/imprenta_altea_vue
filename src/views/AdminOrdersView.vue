<!-- AdminOrdersView.vue -->
<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
      <!-- HEADER -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-3xl font-serif text-foreground">Pedidos</h1>

          <p class="text-muted-foreground mt-2">
            Gestiona todos los pedidos de la tienda
          </p>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-20 text-muted-foreground">
        Cargando pedidos...
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="orders.length === 0"
        class="text-center py-20 text-muted-foreground"
      >
        No hay pedidos disponibles
      </div>

      <!-- FLASH MESSAGE -->
      <div
        v-if="flashMessage"
        class="mb-6 px-5 py-4 rounded-2xl border"
        :class="
          flashType === 'success'
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        "
      >
        {{ flashMessage }}
      </div>
      <!-- TABLE -->
      <div
        v-else
        class="overflow-x-auto border border-border rounded-2xl bg-card"
      >
        <table class="w-full">
          <thead class="border-b border-border bg-muted/30">
            <tr>
              <th class="text-left px-6 py-4 font-medium">Pedido</th>

              <th class="text-left px-6 py-4 font-medium">Cliente</th>

              <th class="text-left px-6 py-4 font-medium">Total</th>

              <th class="text-left px-6 py-4 font-medium">Estado</th>

              <th class="text-left px-6 py-4 font-medium">Fecha</th>

              <th class="text-right px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b border-border last:border-0"
            >
              <!-- ORDER -->
              <td class="px-6 py-4">
                <div class="font-medium text-foreground">
                  #{{ order.id }} ({{ order.items?.length || 0 }})
                </div>
              </td>

              <!-- CUSTOMER -->
              <td class="px-6 py-4">
                <div class="font-medium">
                  {{ order.user.name }} {{ order.user.lastname1 }}
                  {{ order.user.lastname2 }}
                </div>

                <div class="text-sm text-muted-foreground">
                  {{ order.user.email }}
                </div>
              </td>

              <!-- TOTAL -->
              <td class="px-6 py-4">
                <span class="font-medium"> {{ order.total }} € </span>
              </td>

              <!-- STATUS -->
              <td class="px-6 py-4">
                <select
                  :value="order.status"
                  @change="updateStatus(order, $event)"
                  class="h-11 rounded-xl border border-border bg-background px-4"
                >
                  <option :value="ORDER_STATUS.PENDIENTE">Pendiente</option>

                  <option :value="ORDER_STATUS.PROCESANDO">Procesando</option>

                  <option :value="ORDER_STATUS.COMPLETADO">Completado</option>

                  <option :value="ORDER_STATUS.CANCELADO">Cancelado</option>
                </select>
              </td>

          
              <td class="px-6 py-4">
                <span class="text-sm text-muted-foreground">
                  {{ formatDate(order.created_at) }}
                </span>
              </td>

          
              <td class="px-6 py-4">
                <div class="flex justify-end gap-3">
                  <a
                    :href="`${API_BASE_URL}storage/${order.file}`"
                    target="_blank"
                    class="px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
                  >
                    Descargar
                  </a>

             
                  <button
                    @click="confirmDelete(order)"
                    class="px-4 py-2 rounded-lg bg-red-500 text-white hover:opacity-90 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useOrderStore } from "../stores/orders";

const API_BASE_URL = import.meta.env.VITE_ROOT_URL;

const loading = ref(false);

const orderStore = useOrderStore();

const orders = ref([]);
const flashMessage = ref("");
const flashType = ref("success");

const ORDER_STATUS = {
  PENDIENTE: "Pendiente",
  PROCESANDO: "Procesando",
  COMPLETADO: "Completado",
  CANCELADO: "Cancelado",
};

onMounted(async () => {
  loading.value = true;

  try {
    await orderStore.fetchOrders();

    orders.value = orderStore.orders;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const updateStatus = async (order, event) => {
  const status = event.target.value;

  try {
    await orderStore.updateOrderStatus(order.id, status);

    order.status = status;
    flashType.value = "success";

    flashMessage.value = `Pedido #${order.id} actualizado a "${status}" correctamente`;

    setTimeout(() => {
      flashMessage.value = "";
    }, 4000);
  } catch (error) {
    order.status = previousStatus;

    flashType.value = "error";

    flashMessage.value = "Error al actualizar el estado del pedido";

    setTimeout(() => {
      flashMessage.value = "";
    }, 4000);
  }
};

const confirmDelete = async (order) => {
  const confirmed = confirm(
    `¿Seguro que deseas eliminar el pedido #${order.id}?`,
  );

  if (!confirmed) return;

  try {
    await orderStore.deleteOrder(order.id);

    orders.value = orders.value.filter((o) => o.id !== order.id);
  } catch (error) {
    console.error(error);

    alert("Error al eliminar el pedido");
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
