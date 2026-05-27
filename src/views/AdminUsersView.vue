<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-6">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-3xl font-serif text-foreground">
            Usuarios
          </h1>

          <p class="text-muted-foreground mt-2">
            Todos los usuarios registrados
          </p>
        </div>
      </div>

      <!-- LOADING -->
      <div
        v-if="loading"
        class="text-center py-20 text-muted-foreground"
      >
        Cargando usuarios...
      </div>

      <!-- EMPTY -->
      <div
        v-else-if="users.length === 0"
        class="text-center py-20 text-muted-foreground"
      >
        No hay usuarios registrados
      </div>

      <!-- TABLE -->
      <div
        v-else
        class="overflow-x-auto border border-border rounded-2xl bg-card"
      >
        <table class="w-full">

          <thead class="border-b border-border bg-muted/30">
            <tr>

              <th class="text-left px-6 py-4 font-medium">
                Usuario
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Email
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Rol
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Pedidos
              </th>

              <th class="text-left px-6 py-4 font-medium">
                Registro
              </th>

            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b border-border last:border-0"
            >

              <!-- USER -->
              <td class="px-6 py-4">
                <div class="font-medium text-foreground">
                  {{ user.name }}
                  {{ user.lastname1 }}
                  {{ user.lastname2 }}
                </div>

                <div class="text-sm text-muted-foreground">
                  ID: #{{ user.id }}
                </div>
              </td>

              <!-- EMAIL -->
              <td class="px-6 py-4">
                {{ user.email }}
              </td>

              <!-- ROLE -->
              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 rounded-full text-sm"
                  :class="
                    user.role.name === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-muted text-foreground'
                  "
                >
                  {{ user.role.name }}
                </span>
              </td>

              <!-- ORDERS -->
              <td class="px-6 py-4">
                <span class="font-medium">
                  {{ user.orders.length }}
                </span>
              </td>

              <!-- CREATED -->
              <td class="px-6 py-4">
                <span class="text-sm text-muted-foreground">
                  {{ formatDate(user.created_at) }}
                </span>
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

const loading = ref(false);

const users = ref([]);

onMounted(async () => {

  loading.value = true;

  try {

    const response = await api.get("/users");

    users.value = response.data.data || response.data;

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;
  }
});

const formatDate = (date) => {

  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>