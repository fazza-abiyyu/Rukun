<template>
  <div class="h-fit flex flex-col">
    <div class="-m-1.5 overflow-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg shadow overflow-hidden">
          <table>
            <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">No</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sumber Dana</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Jumlah</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <!-- Loop untuk menampilkan setiap data -->
            <tr v-for="(item, index) in data" :key="item?.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item?.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item?.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item?.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item?.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ item?.amount }}</td>
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
