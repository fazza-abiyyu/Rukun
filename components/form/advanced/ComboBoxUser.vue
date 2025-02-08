<template>
  <div class="relative space-y-3">
    <!-- Input Search Box -->
    <div class="relative">
      <!-- Icon Search -->
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

      <!-- Search Input -->
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

    <!-- SearchBox Dropdown -->
    <div v-if="dropdownVisible" class="absolute w-full z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div class="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-bg-gray-100 scrollbar-thumb-bg-gray-300">
        <!-- When there are results -->
        <template v-if="filteredUsers.length > 0">
          <div
              v-for="user in filteredUsers"
              :key="user.id"
              @click="handleSelectUser(user)"
              class="py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
          >
            <div class="flex items-center w-full">
              <div class="flex items-center justify-center rounded-full bg-gray-200 size-6 overflow-hidden me-2.5">
                <img class="shrink-0" :src="user.url_profile" :alt="user.full_name" />
              </div>
              <div class="flex justify-between w-full">
                <span>{{ user.full_name }}</span>
                <span>{{ user.email }}</span>
              </div>
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
    <!-- End SearchBox Dropdown -->
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { User } from "~/types/TypesModel";

// Define emits
const emits = defineEmits(['selectedUser']);

// Reactive state
const searchText = ref('');
const dropdownVisible = ref(false);
const users = ref<User[]>([]);
const selectedUser = ref<User | null>(null);
const isLoading = ref(false);

// Computed property for filtered users based on searchText
const filteredUsers = computed(() =>
    users.value.filter((user) =>
        user.full_name.toLowerCase().includes(searchText.value.toLowerCase())
    )
);

// On search input, fetch users and show dropdown
const onSearch = async () => {
  // Show dropdown when there is a search text
  dropdownVisible.value = searchText.value.length > 0;
  isLoading.value = true;

  if (searchText.value.length > 0) {
    try {
      const response: any = await useFetchApi(`/api/auth/users/search?q=${searchText.value}`);
      users.value = response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      users.value = []; // Clear users if error occurs
    } finally {
      isLoading.value = false;
    }
  } else {
    users.value = []; // Clear users when searchText is empty
  }
};

// Handle user selection from the dropdown
const handleSelectUser = (user: User) => {
  searchText.value = user.full_name; // Set search text to selected user's name
  selectedUser.value = user;
  dropdownVisible.value = false; // Hide dropdown after selection
  emits('selectedUser', user); // Emit selected user
};
</script>

<style scoped>
</style>
