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
                v-model="selectedUser.full_name"
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
                v-model="selectedUser.role"
                class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
            >
              <option value="null" selected>-Pilih-</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin_puskesmas">Admin Puskesmas</option>
              <option value="admin_posyandu">Admin Posyandu</option>
              <option value="user">User</option>
            </select>
          </div>
          <!-- Status -->
          <div class="grid sm:grid-cols-3">
            <label for="status" class="block text-sm font-medium mb-2 w-full">Status</label>
            <select
                id="status"
                v-model="selectedUser.status"
                class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
            >
              <option value="null" selected>-Pilih-</option>
              <option value="active">Active</option>
              <option value="suspend">Suspend</option>
              <option value="pending">Pending</option>
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

      <!-- Jika tidak ada pengguna yang dipilih, tampilkan combobox pencarian -->
      <div v-else>
        <label for="hs-combobox-basic-usage" class="block text-sm font-medium mb-2 w-full">Cari Pengguna</label>
        <ComboBoxUser @selectedUser="handleSelectedUser"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {User} from "~/types/TypesModel";
import ComboBoxUser from "~/components/form/advanced/ComboBoxUser.vue";

const {$toast} = useNuxtApp();

const selectedUser = ref<any>(null)
const isLoading = ref<boolean>(false)

const handleSelectedUser = (user: User) => {
  selectedUser.value = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    status: user.password,
  }
}

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const {deviceType, os, browser} = getDeviceAndBrowserInfo()
    await useFetchApi(`/api/auth/users/${selectedUser.value?.id}`, {
      method: 'PUT',
      body: {
        ...selectedUser.value,
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    })

    $toast('Berhasil mengubah data pengguna.', 'success');
    selectedUser.value = null
  } catch (error) {
    $toast('Gagal mengubah data pengguna.', 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Custom styling for form */
</style>
