<template>
  <div class="max-w-[85rem] mx-auto p-6 space-y-6">
    <div class="relative p-4 md:col-span-2 md:p-5 flex flex-col bg-white border shadow-sm rounded-xl h-full">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-sm text-gray-500">
          Daftar Quizzes
        </h2>
        <template v-if="user?.role?.toString().toLowerCase() === 'admin'">
          <button type="button"
                  class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-700 focus:outline-none focus:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
                  aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal"
                  data-hs-overlay="#hs-scale-animation-modal">
            New Quiz
          </button>

          <div id="hs-scale-animation-modal"
               class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
               role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
            <div
                class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
              <div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                <div class="flex justify-between items-center py-3 px-4 border-b">
                  <h3 id="hs-scale-animation-modal-label" class="font-bold text-gray-800">
                    AI Generate
                  </h3>
                  <button type="button"
                          class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                          aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
                    <span class="sr-only">Close</span>
                    <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                <form id="form-generate-quiz" @submit.prevent="handleGenerateQuiz">
                  <div class="p-4 overflow-y-auto space-y-5">
                    <div>
                      <label for="title" class="block text-sm font-medium mb-2">Title</label>
                      <input type="text" id="title"
                             v-model="title"
                             class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                             placeholder="This is placeholder" requiteal>
                    </div>
                    <div>
                      <label for="description" class="block text-sm font-medium mb-2">Description</label>
                      <textarea
                          id="description"
                          v-model="description"
                          class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                          rows="3" placeholder="Say hi..." data-hs-textarea-auto-height="" requiteal></textarea>
                    </div>
                  </div>
                </form>
                <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                  <button type="button"
                          id="close-btn"
                          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          data-hs-overlay="#hs-scale-animation-modal">
                    Close
                  </button>
                  <button type="submit"
                          form="form-generate-quiz"
                          :disabled="loading"
                          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-700 focus:outline-none focus:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
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

        <!-- Quiz Cards -->
        <div v-for="quiz in quizzes" :key="quiz.id"
             class="flex flex-col bg-white border shadow-sm rounded-xl">
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
      </div>

      <!-- Pagination Controls -->
      <div class="w-full flex justify-between mt-6 left-0">
        <button
            :disabled="!pagination.prev"
            @click="pagination.prev && fetchQuizzes(pagination.prev)"
            :class="[
          'px-4 py-2 rounded-md text-white',
          pagination.prev ? 'bg-teal-500 hover:bg-teal-500' : 'bg-teal-300 cursor-not-allowed'
        ]">
          Previous
        </button>

        <span class="text-sm text-gray-600">Page {{ pagination.currentPage }}</span>

        <button
            :disabled="!pagination.next"
            @click="pagination.next && fetchQuizzes(pagination.next)"
            :class="[
          'px-4 py-2 rounded-md text-white',
          pagination.next ? 'bg-teal-500 hover:bg-teal-500' : 'bg-teal-300 cursor-not-allowed'
        ]">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {useAuthUser} = useAuth()
const user = computed(() => useAuthUser().value)
// Define state variables
const {$toast} = useNuxtApp();
const quizzes = ref<any[]>([]);
const pagination = ref({
  prev: null,
  next: null,
  currentPage: 1
});
const loading = ref(false);  // Track loading state
const title = ref<string>('')
const description = ref<string>('')


// Fetch quiz results when the component is mounted
onMounted(async () => {
  await fetchQuizzes(`/api/auth/quiz?page=${pagination.value.currentPage}&pageSize=5`);
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

const handleGenerateQuiz = async () => {
  loading.value = true;  // Set loading to true when fetching data
  try {
    await useFetchApi('/api/auth/quiz', {
      method: 'POST',
      body: {
        title: title.value,
        description: description.value,
      }
    });
    $toast('Successfully generated quiz.', 'success');
  } catch (error) {
    $toast('Failed generate quiz.', 'error');
  } finally {
    title.value = '';
    description.value = '';
    document.querySelector("#close-btn")?.click()
    await fetchQuizzes(`/api/auth/quiz?page=${pagination.value.currentPage}&pageSize=5`);
  }
}

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
