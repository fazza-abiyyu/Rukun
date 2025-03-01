<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Pengguna</h2>
    </div>
    <hr>

    <div class="h-full w-full mt-2">
      <!-- Form untuk mengubah pengguna -->
      <form v-if="selectedUser" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Lengkap -->
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
            <input
                type="text"
                id="name"
                v-model="selectedUser.username"
                class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Masukan nama"
                required
            />
          </div>
          <!-- Email -->
          <div class="grid sm:grid-cols-3">
            <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
            <input
                type="email"
                id="email"
                v-model="selectedUser.email"
                class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Masukan email"
                required
            />
          </div>
          <!-- Role -->
          <div class="grid sm:grid-cols-3">
            <label for="role" class="block text-sm font-medium mb-2 w-full">Role</label>
            <select
                id="role"
                v-model="selectedUser.Role"
                class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
            >
              <option value="null" selected>-Pilih-</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <!-- Button Actions -->
          <div class="space-x-3 self-end">
            <button
                type="button"
                @click="selectedUser = null"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-transparent text-red-600 hover:bg-red-200 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Batal
            </button>
            <button
                type="submit"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { User } from "~/types/TypesModel";
import useFetchApi from "~/composables/useFetchApi";

const { $toast } = useNuxtApp();
const router = useRouter();

const selectedUser = ref<User | null>(null);
const isLoading = ref<boolean>(false);
const userId = ref<number | null>(null); // Pastikan `userId` didefinisikan

onMounted(async () => {
  await fetchUsersData();
});

async function fetchUsersData() {
  if (!userId.value) {
    console.error("User ID tidak ditemukan.");
    return;
  }

  isLoading.value = true;
  try {
    const { data } = (await useFetchApi(`/api/auth/users/${userId.value}`, {
      method: "GET",
    })) as { data: User };

    selectedUser.value = {
      id: data.id,
      username: data.username,
      email: data.email,
      Role: Role.role,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    $toast("Gagal mengambil data Pengguna.", "error");
  } finally {
    isLoading.value = false;
  }
}

const handleSubmit = async () => {
  if (!selectedUser.value) return;

  isLoading.value = true;
  try {
    await useFetchApi(`/api/auth/users/${selectedUser.value.id}`, {
      method: "PUT",
      body: selectedUser.value, // Typo diperbaiki
    });

    $toast("Berhasil mengubah data Pengguna.", "success");
    router.push("/users");
  } catch (error) {
    console.error("Error updating user data:", error);
    $toast("Gagal mengubah data Pengguna.", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Custom styling for form */
</style>
