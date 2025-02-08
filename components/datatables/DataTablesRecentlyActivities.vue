<template>
  <div class="h-fit flex flex-col">
    <div class="-m-1.5 overflow-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Tipe</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Waktu dan Tanggal</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Perangkat</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">IP Address</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Lokasi</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <!-- Loop untuk menampilkan setiap data -->
            <tr v-for="(item, index) in data" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.action }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.created_at }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item.device }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item.ip_address }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.description }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mendefinisikan prop data yang akan diterima
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
