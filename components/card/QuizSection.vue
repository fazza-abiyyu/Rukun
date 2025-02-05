<template>
  <div class="p-4 md:col-span-2 md:p-5 h-fit flex flex-col bg-white border shadow-sm rounded-xl">
    <!-- Header -->
    <div>
      <h2 class="text-sm text-gray-500">
        Other Quizzes
      </h2>
    </div>
    <!-- End Header -->

    <div class="w-full h-full mt-6 space-y-6">
      <div v-if="loading" class="flex justify-center items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
          <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
        </svg>
        <span class="text-teal-500">Loading...</span>
      </div>

      <template v-if="quizzes.length > 0">
      <!-- Quiz Cards -->
      <div v-for="quiz in quizzes" :key="quiz.id" class="flex flex-col bg-white border shadow-sm rounded-xl">
        <div class="p-4 md:p-5 space-y-2">
          <div class="flex items-center justify-between">
            <p class="text-xs uppercase tracking-wide font-semibold">
              {{ quiz.title }}
            </p>
            <div class="space-x-2">
              <NuxtLink :to="`/quizzies/${quiz.id}`"
                  class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded text-xs font-medium border border-teal-500 text-teal-500 hover:text-white hover:bg-teal-500 cursor-pointer">
                Take
              </NuxtLink>
            </div>
          </div>
          <p class="max-w-5xl">{{ quiz.description }}</p>
          <p class="text-xs text-gray-400">Created on: {{ formatDate(quiz.created_at) }}</p>
        </div>
      </div>
      <!-- End Quiz Cards -->
      </template>

      <template v-else>
        <div class="flex flex-col items-center text-gray-400 font-semibold">
          <p class="p-4 capitalize">
            There are no new quizzes for you yet
          </p>
        </div>
      </template>
    </div>

    <!-- Pagination Controls -->
    <div v-if="quizzes.length > 0" class="flex justify-between mt-6">
      <button
          :disabled="!pagination.prev"
          @click="pagination.prev && fetchQuizzes(pagination.prev)"
          :class="[
          'px-4 py-2 rounded-md text-white',
          pagination.prev ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-300 cursor-not-allowed'
        ]">
        Previous
      </button>

      <span class="text-sm text-gray-600">Page {{ pagination.currentPage }}</span>

      <button
          :disabled="!pagination.next"
          @click="pagination.next && fetchQuizzes(pagination.next)"
          :class="[
          'px-4 py-2 rounded-md text-white',
          pagination.next ? 'bg-teal-500 hover:bg-teal-600' : 'bg-teal-300 cursor-not-allowed'
        ]">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define state variables
const quizzes = ref<any[]>([]);
const pagination = ref({
  prev: null,
  next: null,
  currentPage: 1
});
const loading = ref(false);  // Track loading state

// Fetch quiz results when the component is mounted
onMounted(async () => {
  await fetchQuizzes(`/api/auth/quiz?page=${pagination.value.currentPage}&pageSize=3`);
});

// Fetch quiz results based on the current page
const fetchQuizzes = async (url: string) => {
  loading.value = true;  // Set loading to true when fetching data
  try {
    const response: any = await useFetchApi(url);
    quizzes.value = response.data;
    pagination.value.prev = response.meta.prev;
    pagination.value.next = response.meta.next;
    pagination.value.currentPage = response.meta.currentPage;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
  } finally {
    loading.value = false;  // Set loading to false once data is fetched or an error occurs
  }
};

// Format the completed_at date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Formats the date in a readable format
};
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>


<style scoped>
/* Add custom scoped styles if needed */
</style>
