<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center">
      <h2 class="text-xl font-medium text-gray-800 w-full">{{ title }}</h2>

      <!-- Tombol add di Kiri search -->
      <NuxtLink v-if="addAction" :to="getAddRoute()">
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 48 48">
          <g id="Layer_2" data-name="Layer 2">
            <g id="invisible_box" data-name="invisible box">
              <rect width="48" height="48" fill="none"/>
            </g>
            <g id="icons_Q2" data-name="icons Q2">
              <path fill="green" d="M42,4H6A2,2,0,0,0,4,6V42a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V6A2,2,0,0,0,42,4ZM34,26H26v8a2,2,0,0,1-4,0V26H14a2,2,0,0,1,0-4h8V14a2,2,0,0,1,4,0v8h8a2,2,0,0,1,0,4Z"/>
            </g>
          </g>
        </svg>
      </NuxtLink>


      <div class="relative w-full max-w-xs">
        <label for="hs-table-search" class="sr-only">Search</label>
        <input type="text" name="hs-table-search" id="hs-table-search"
          class="py-2 px-3 ps-9 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Cari disini" v-model="searchText" />
        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
          <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th v-for="(field, i) in fields" :key="i" scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      {{ field.label }}
                    </th>

                    <!-- Kolom Alat (Edit & Delete) -->
                    <th v-if="editAction || deleteAction" scope="col"
                      class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Alat
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <!-- Render rows dynamically based on props.data -->
                  <template v-if="isLoading">
                    <tr>
                      <td :colspan="fields.length"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        Memuat data...
                      </td>
                    </tr>
                  </template>
                  <template v-else-if="!isLoading && (data?.length ?? 0) > 0">
                    <tr v-for="(row, index) in data" :key="index">
                      <td v-for="field in fields" :key="field.key"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <!-- Gunakan getNestedValue untuk mengakses data nested -->
                        {{ getNestedValue(row, field.key) }}
                      </td>

                      <!-- Kolom Alat (Edit di Kiri, Delete di Kanan) -->
                      <td v-if="editAction || deleteAction"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center gap-2">

                        <!-- Tombol Edit di Kiri -->
                        <router-link v-if="editAction" :to="getEditRoute(row)">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="3" fill="#FFC420" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M16.9167 10.125V11.5417H10.5417V21.4583H20.4583V15.0833H21.875V22.1667C21.875 22.3545 21.8004 22.5347 21.6675 22.6675C21.5347 22.8004 21.3545 22.875 21.1667 22.875H9.83333C9.64547 22.875 9.4653 22.8004 9.33247 22.6675C9.19963 22.5347 9.125 22.3545 9.125 22.1667V10.8333C9.125 10.6455 9.19963 10.4653 9.33247 10.3325C9.4653 10.1996 9.64547 10.125 9.83333 10.125H16.9167ZM21.1242 10.3758L21.625 10.8765C21.6914 10.943 21.7287 11.033 21.7287 11.1269C21.7287 11.2208 21.6914 11.3109 21.625 11.3773L15.0141 17.9875L13.6031 18.6817C13.5632 18.7014 13.5182 18.7082 13.4743 18.7009C13.4304 18.6937 13.3899 18.673 13.3585 18.6415C13.327 18.6101 13.3063 18.5696 13.2991 18.5257C13.2918 18.4818 13.2986 18.4368 13.3183 18.3969L14.0125 16.9859L20.6234 10.375C20.6898 10.3086 20.7799 10.2713 20.8738 10.2713C20.9677 10.2713 21.0578 10.3086 21.1242 10.375V10.3758Z"
                              fill="white" />
                          </svg>
                        </router-link>

                        <!-- Tombol Delete di Kanan -->
                        <button v-if="deleteAction" @click="handleDelete(row.id)">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="3" fill="#FF1C1C" />
                            <path
                              d="M12.9583 21.875C12.5688 21.875 12.2354 21.7364 11.9582 21.4592C11.681 21.182 11.5422 20.8484 11.5417 20.4583V11.25C11.341 11.25 11.1729 11.182 11.0373 11.046C10.9018 10.91 10.8338 10.7419 10.8333 10.5417C10.8329 10.3414 10.9009 10.1733 11.0373 10.0373C11.1738 9.90133 11.3419 9.83333 11.5417 9.83333H14.375C14.375 9.63264 14.443 9.46453 14.579 9.329C14.715 9.19347 14.8831 9.12547 15.0833 9.125H17.9167C18.1174 9.125 18.2857 9.193 18.4217 9.329C18.5577 9.465 18.6255 9.63311 18.625 9.83333H21.4583C21.659 9.83333 21.8274 9.90133 21.9634 10.0373C22.0994 10.1733 22.1672 10.3414 22.1667 10.5417C22.1662 10.7419 22.0982 10.9102 21.9627 11.0467C21.8272 11.1832 21.659 11.2509 21.4583 11.25V20.4583C21.4583 20.8479 21.3197 21.1815 21.0426 21.4592C20.7654 21.7369 20.4317 21.8755 20.0417 21.875H12.9583ZM20.0417 11.25H12.9583V20.4583H20.0417V11.25ZM15.0833 19.0417C15.284 19.0417 15.4524 18.9737 15.5884 18.8377C15.7244 18.7017 15.7922 18.5336 15.7917 18.3333V13.375C15.7917 13.1743 15.7237 13.0062 15.5877 12.8707C15.4517 12.7351 15.2836 12.6671 15.0833 12.6667C14.8831 12.6662 14.715 12.7342 14.579 12.8707C14.443 13.0071 14.375 13.1753 14.375 13.375V18.3333C14.375 18.534 14.443 18.7024 14.579 18.8384C14.715 18.9744 14.8831 19.0421 15.0833 19.0417ZM17.9167 19.0417C18.1174 19.0417 18.2857 18.9737 18.4217 18.8377C18.5577 18.7017 18.6255 18.5336 18.625 18.3333V13.375C18.625 13.1743 18.557 13.0062 18.421 12.8707C18.285 12.7351 18.1169 12.6671 17.9167 12.6667C17.7165 12.6662 17.5483 12.7342 17.4123 12.8707C17.2763 13.0071 17.2083 13.1753 17.2083 13.375V18.3333C17.2083 18.534 17.2763 18.7024 17.4123 18.8384C17.5483 18.9744 17.7165 19.0421 17.9167 19.0417Z"
                              fill="white" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td :colspan="fields.length"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                        Data Tidak Ditemukan
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav class="flex items-center gap-x-1" aria-label="Pagination">
      <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous" :disabled="currentPage === 1" @click="changePage(prevPage, currentPage -1)">
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span class="sr-only">Previous</span>
      </button>

      <div class="flex items-center gap-x-1">
        <span
          class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
          {{ currentPage }}
        </span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">of</span>
        <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">{{
          totalPages
          }}</span>
      </div>

      <button type="button"
        class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next" @click="changePage(nextPage, currentPage + 1)" :disabled="currentPage === totalPages">
        <span class="sr-only">Next</span>
        <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
    <!-- End Pagination -->
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce';
import { useRoute } from 'vue-router';

const route = useRoute();
const getAddRoute = () => `${route.path}/add`;

const getEditRoute = (row: Record<string, any>) => {
  if ("nik" in row) {
    return `/citizen/edit/${row.id}`;
  } else if ("category" in row) {
    return `/cashflow/edit/${row.id}`;
  } else if ("email" in row) {
    return `/users/edit/${row.id}`;
  } else {
    return "/";
  }
};

// Define the props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array as () => Array<{ label: string; key: string }>,
    required: true,
  },
  data: {
    type: Array as () => Array<Record<string, any>>,
    required: true,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1
  },
  prevPage: {
    type: String,
    default: null,
  },
  nextPage: {
    type: String,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  addAction: {
    type: Boolean,
    default: false,
  },
  deleteAction: {
    type: Boolean,
    default: false,
  },
  editAction: {
    type: Boolean,
    default: false,
  }
});

const emits = defineEmits(['fetchData', 'searchData', 'deleteData']);
const searchText = ref('');

// Function to get the value of a nested key (e.g., 'user.profile.name')
const getNestedValue = (obj: Record<string, any>, key: string): any => {
  return key.split('.').reduce((acc, part) => acc?.[part], obj);
};

const changePage = (url: string, currentPage: number) => {
  const payload = { url, currentPage };
  emits('fetchData', payload)
}

const handleDelete = async (id: number) => {
  emits('deleteData', id)
}

const handleSearch = debounce(async () => {
  emits('searchData', searchText.value);
}, 500);

watch(searchText, handleSearch)
</script>
<style lang="css" scoped>
</style>
