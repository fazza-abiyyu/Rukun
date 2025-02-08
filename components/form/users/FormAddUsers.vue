<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Pengguna</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
            <input type="text" id="name"
                   v-model="fullName"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan nama">
          </div>
          <div class="grid sm:grid-cols-3">
            <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
            <input type="email" id="email"
                   v-model="email"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukan email">
          </div>
          <div class="grid sm:grid-cols-3">
            <label for="role" class="block text-sm font-medium mb-2 w-full">Role</label>
            <select id="role"
                    v-model="role"
                    class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="null" selected>-Pilih-</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin_puskesmas">Admin Puskesmas</option>
              <option value="admin_posyandu">Admin Posyandu</option>
              <option value="user">User</option>
            </select>
          </div>
          <div class="grid sm:grid-cols-3">
            <label for="status" class="block text-sm font-medium mb-2 w-full">Status</label>
            <select id="status"
                    v-model="status"
                    class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="null" selected>-Pilih-</option>
              <option value="active">active</option>
              <option value="suspend">suspend</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div class="space-x-3 self-end">
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    :disabled="isLoading">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const {$toast} = useNuxtApp();

const fullName = ref(null)
const email = ref(null)
const role = ref(null)
const status = ref(null)
const isLoading = ref<boolean>(false)

const clearForm = () => {
  fullName.value = null
  email.value = null
  role.value = null
  status.value = null
}

const validateForm = () => {
  if (!fullName.value || !email.value || !role.value || !status.value) {
    $toast('Harap lengkapi semua field.', 'error');
    return false;
  }
  return true;
};


const handleSubmit = async () => {
  try {
    isLoading.value = true;
    if (!validateForm()) return
    const {deviceType, os, browser} = getDeviceAndBrowserInfo()
    await useFetchApi('/api/auth/users', {
      method: 'POST',
      body: {
        full_name: fullName.value,
        email: email.value,
        role: role.value,
        status: status.value,
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    })

    $toast('Berhasil menambahkan pengguna baru.', 'success');
    clearForm()
  } catch (error) {
    $toast('Gagal menambahkan pengguna baru.', 'success');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="css" scoped>
</style>