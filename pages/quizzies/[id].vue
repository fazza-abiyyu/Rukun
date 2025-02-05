<template>
  <div class="min-h-screen mx-auto bg-gray-100 flex flex-col items-center pb-10">
    <!-- Header -->
    <header class="w-full p-4 bg-white shadow flex justify-between items-center">
      <button @click="closeQuiz" class="text-red-500 font-semibold px-4 py-2 border border-red-500 rounded-md">
        Close
      </button>
      <h1 class="text-xl font-bold">Skor Kesehatan Mentalmu?</h1>
    </header>

    <!-- Description -->
    <div class="w-full max-w-3xl mt-8 px-4 text-center">
      <p class="text-gray-700">
        Pada setiap pertanyaan, pilihlah jawaban yang paling menggambarkan pengalamanmu selama dua minggu terakhir.
        Jawablah
        dengan jujur sesuai kondisimu saat ini untuk mendapatkan gambaran dan saran yang akurat.
      </p>
      <p class="space-x-2 text-gray-500 font-semibold">
        <span>A = Sangat Baik</span>
        <span>|</span>
        <span>B = Baik</span>
        <span>|</span>
        <span>C = Cukup</span>
        <span>|</span>
        <span>D = Tidak Tahu</span>
      </p>
    </div>

    <!-- Questions -->
    <div v-if="loading" class="flex justify-center items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
        <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
      </svg>
      <span class="text-teal-500">Loading...</span>
    </div>
    <div class="w-full max-w-3xl mt-6 space-y-6 px-4">
      <div
          v-for="(question, index) in quizData.questions"
          :key="index"
          class="bg-white shadow rounded-lg p-4"
      >
        <p class="font-medium text-gray-800">
          {{ index + 1 }}. {{ question.question }}
        </p>
        <div class="mt-4 space-y-2">
          <label
              v-for="(option, i) in options[question.id]"
              :key="i"
              class="flex items-center space-x-3"
          >
            <input
                type="radio"
                :name="'question-' + index"
                :value="option"
                v-model="answers[index]"
                class="w-4 h-4 text-blue-600 focus:ring focus:ring-blue-300"
            />
            <span>{{ option }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="w-full max-w-3xl mt-6 px-4">
      <button
          @click="submitAnswers"
          :disabled="loading"
          class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg"
      >
        {{ loading ? 'Loading...' : 'Yuk, Lihat Hasilnya' }}
      </button>
    </div>

    <!-- Result Modal -->
    <div v-if="result" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-xl font-bold text-center">{{ result.category }}</h2>
        <p class="text-center text-gray-600">{{ result.message }}</p>
        <button
            @click="closeQuiz"
            class="mt-4 w-full bg-teal-500 text-white font-semibold py-2 rounded-lg"
        >
          Selesai, Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Tipe data untuk quiz, question, option, dan result
interface Question {
  id: number;
  question: string;
}

interface QuizData {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

interface Result {
  category: string;
  message: string;
}

// State variables dengan tipe yang tepat
const quizData = ref<QuizData>({
  id: 0,
  title: "",
  description: "",
  questions: [],
});

const id = useRoute().params.id
const options = ref<Record<number, string[]>>({}); // Mapping ID pertanyaan ke opsi jawaban
const answers = ref<string[]>([]); // Jawaban pengguna
const result = ref<Result | null>(null); // Hasil kuis
const loading = ref(false);

// Fetch quiz data from the API
const fetchQuizData = async () => {
  try {
    loading.value = true;
    // Ambil data kuis dari API
    const response: any = await useFetchApi(`/api/auth/quiz/${id}`); // Pastikan API ini mengembalikan data kuis yang valid
    quizData.value = response.data;
    options.value = mapOptionsToQuestions(response.data.questions); // Memetakan opsi ke pertanyaan
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  } finally {
    loading.value = false;
  }
};

// Map options to each question
const mapOptionsToQuestions = (questions: Question[]) => {
  const questionOptions: Record<number, string[]> = {};

  questions.forEach((question) => {
    // Misalkan opsi di hardcode sebagai ["A", "B", "C", "D"], sesuaikan sesuai dengan data yang tersedia
    questionOptions[question.id] = ["A", "B", "C", "D"];
  });

  return questionOptions;
};

// Handle form submission
const submitAnswers = async () => {
  // Persiapkan jawaban dalam format yang sesuai dengan API
  const answersToSubmit = answers.value.map((answer, index) => ({
    question_id: quizData.value.questions[index].id,
    answer: answer
  }));

  // Kirim jawaban ke API
  try {
    loading.value = true;
    const response: any = await useFetchApi("/api/auth/user-quiz-results", {
      method: 'POST',
      body: {
        quiz_id: quizData.value.id,
        answers: answersToSubmit
      }
    });

    // Tangani hasil dari API
    result.value = response.data;  // Pastikan response data sesuai dengan format yang diharapkan
  } catch (error) {
    console.error("Error submitting answers:", error);
  } finally {
    loading.value = false;
  }
};

// Logout handler
const closeQuiz = () => {
  return navigateTo('/')
};

// Reset quiz
const resetQuiz = () => {
  answers.value = [];
  result.value = null;
};

// Ambil data kuis saat komponen dimuat
onMounted(() => {
  fetchQuizData();
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
