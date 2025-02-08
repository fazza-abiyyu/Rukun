<template>
  <div class="relative space-y-3">
    <!-- Input Search -->
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
        <svg
            class="shrink-0 size-4 text-gray-400"
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
          class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded="false"
          placeholder="Cari disini"
          v-model="searchText"
          @input="onSearch"
      />
    </div>

    <!-- Dropdown Search Results -->
    <div v-if="dropdownVisible" class="absolute w-full z-50 bg-white border border-gray-200 rounded-lg">
      <div
          class="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-bg-gray-100 scrollbar-thumb-bg-gray-300"
      >
        <!-- Results when data is available -->
        <template v-if="filteredPosyandu.length > 0">
          <div
              v-for="posyandu in filteredPosyandu"
              :key="posyandu.id"
              @click="handleSelectPosyandu(posyandu)"
              class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex justify-between w-full">
              <span>{{ posyandu.name }}</span>
              <span>{{ posyandu.address }}</span>
              <span>{{ posyandu.phone }}</span>
            </div>
          </div>
        </template>

        <!-- Loading State -->
        <template v-else-if="isLoading">
          <div class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100">
            <span>Memuat data...</span>
          </div>
        </template>

        <!-- No Data Found -->
        <template v-else>
          <div class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100">
            <span>Tidak ada data</span>
          </div>
        </template>
      </div>
    </div>
    <!-- End Dropdown -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Posyandu } from "~/types/TypesModel";

// Define emits
const emits = defineEmits(['selectedPosyandu']);

// Reactive properties
const searchText = ref('');
const dropdownVisible = ref(false);
const posyandu = ref<Posyandu[]>([]);
const selectedPosyandu = ref<Posyandu | null>(null);
const isLoading = ref(false);

// Computed property for filtered posyandu
const filteredPosyandu = computed(() =>
    posyandu.value.filter((posyandu) =>
        posyandu.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
);

// Search handler
const onSearch = async () => {
  // Show dropdown only if search text exists
  dropdownVisible.value = searchText.value.length > 0;
  isLoading.value = true;

  if (searchText.value.length > 0) {
    try {
      const response: any = await useFetchApi(`/api/auth/posyandu/search?q=${searchText.value}`);
      posyandu.value = response.data.posyandu;
    } catch (error) {
      console.error('Error fetching posyandu:', error);
      posyandu.value = [];
    } finally {
      isLoading.value = false;
    }
  } else {
    posyandu.value = []; // Clear results if no search text
  }
};

// Select a posyandu from the list
const handleSelectPosyandu = (posyandu: Posyandu) => {
  searchText.value = posyandu.name;
  selectedPosyandu.value = posyandu;
  dropdownVisible.value = false;
  emits("selectedPosyandu", posyandu);
};
</script>

<style scoped>
</style>
