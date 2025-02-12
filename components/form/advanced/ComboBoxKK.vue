<template>
  <div class="relative space-y-3">
    <!-- Input Search -->
    <div class="relative">
      <div
          class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-3.5"
      >
        <svg
            class="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
      <input
          class="py-3 pl-10 pr-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded="false"
          placeholder="Cari Kartu Keluarga..."
          v-model="searchText"
          @input="onSearch"
      />
    </div>

    <!-- Dropdown Search Results -->
    <div
        v-if="dropdownVisible"
        class="absolute w-full z-50 bg-white border border-gray-200 rounded-lg"
    >
      <div
          class="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-bg-gray-100 scrollbar-thumb-bg-gray-300"
      >
        <!-- Loading State -->
        <div
            v-if="isLoading"
            class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100"
        >
          Memuat data...
        </div>

        <!-- No Data Found -->
        <div
            v-else-if="filteredKK.length === 0"
            class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100"
        >
          Tidak ada data yang cocok.
        </div>

        <!-- Results when data is available -->
        <div
            v-for="kk in filteredKK"
            :key="kk.id"
            @click="handleSelectKK(kk)"
            class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex justify-between w-full">
            <span>{{ kk.head_of_family }}</span>
            <span>{{ kk.kk }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import type { KKType } from "~/types/TypesModel";
import useFetchApi from '~/composables/useFetchApi';
// Define emits
const emits = defineEmits(["selectedKK"]);

// Reactive properties
const searchText = ref("");
const dropdownVisible = ref(false);
const kkData = ref<KKType[]>([]);
const isLoading = ref(false);
const selectedKK = ref<any | null>(null);

// Computed property for filtered KK
const filteredKK = computed(() =>
    kkData.value.filter(
        (kk) =>
            kk.kk.toLowerCase().includes(searchText.value.toLowerCase()) ||
            kk.head_of_family.toLowerCase().includes(searchText.value.toLowerCase())
    )
);

// Search handler
const onSearch = async () => {
  // Show dropdown only if search text exists
  dropdownVisible.value = searchText.value.length > 0;
  isLoading.value = true;

  if (searchText.value.length >= 2) {
    try {
      const response = await useFetchApi(`/api/auth/kk/search?q=${searchText.value}`);
      kkData.value = response.data.kk;
    } catch (error) {
      console.error('Error fetching KK data:', error);
      kkData.value = [];
    } finally {
      isLoading.value = false;
    }
  } else {
    kkData.value = [];
  }
};

// Select a KK from the list
const handleSelectKK = (kk: KKType) => {
  searchText.value = kk.head_of_family;
  selectedKK.value = kk;
  dropdownVisible.value = false;
  emits("selectedKK", kk);
};
</script>
<style scoped>
/* Add any component-specific custom styles here */
</style>