<template>
  <template v-if="!isLogged">
    <div
        class="h-[100dvh] flex flex-col items-center justify-center space-y-4 container mx-auto text-center max-w-4xl -mt-14 p-6">
      <p>Kami Di Sini untuk Membantu Anda</p>
      <p class="text-4xl">"Quiz sederhana dan data mendalam untuk mendukung hidup sehat dan bahagia Anda"</p>
      <NuxtLink to="/register"
                class="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none">
        Coba Sekarang
      </NuxtLink>
    </div>
    <div id="about-us" class="p-4">
      <div class="h-fit max-w-[85rem] mx-auto p-8 pb-20 bg-teal-200 border border-teal-300 rounded-xl shadow">
        <div class="md:flex items-center justify-between gap-6">
          <div class="space-y-4 md:max-w-[60%]">
            <h2 class="font-semibold text-teal-600">Tentang kami</h2>
            <h1 class="text-3xl">"Teman Anda dalam Menjaga Kesehatan Mental."</h1>
            <p class="text-gray-500">Di Healing, kami percaya bahwa kesehatan mental sama pentingnya dengan kesehatan fisik. Dengan pendekatan yang sederhana namun mendalam, Healing hadir untuk membantu setiap individu lebih memahami, memantau, dan meningkatkan kondisi mental mereka melalui kuis interaktif dan data yang dipersonalisasi.</p>
          </div>
          <div class="w-fit mx-auto">
            <img src="/search_ilus.svg" alt="ilustration" class="max-h-80">
          </div>
        </div>
      </div>
      <div class="max-w-[80rem] mx-auto p-8 -mt-28">
        <div class="h-fit bg-white border rounded-xl shadow p-8">
          <!-- Judul Section -->
          <h2 class="text-center text-2xl font-semibold text-gray-800 mb-10">
            Fitur Utama
          </h2>

          <!-- Grid Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <!-- Item 1 -->
            <div class="space-y-3">
              <div>
                <!-- Ikon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-line"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                Perkembangan Kesehatan Mental
              </h3>
              <p class="text-gray-600">
                Lihat grafik perkembangan kesehatan mentalmu setiap bulan dan pahami perubahan suasana hati secara keseluruhan.
              </p>
            </div>

            <!-- Item 2 -->
            <div class="space-y-3">
              <div>
                <!-- Ikon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-pie"><path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/></svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                Presensi Suasana
              </h3>
              <p class="text-gray-600">
                Pantau presentasi suasana hatimu, mulai dari tingkat kebahagiaan hingga kecemasan, untuk menjaga keseimbangan emosional.
              </p>
            </div>

            <!-- Item 3 -->
            <div class="space-y-3">
              <div>
                <!-- Ikon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                Rekap Quiz
              </h3>
              <p class="text-gray-600">
                Dapatkan rekap dari hasil kuis yang sudah kamu selesaikan beserta saran-saran yang membantu untuk menjaga kesehatan mental.
              </p>
            </div>

            <!-- Item 4 -->
            <div class="space-y-3">
              <div>
                <!-- Ikon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-puzzle"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                Kuis Lainnya
              </h3>
              <p class="text-gray-600">
                Temukan kuis baru yang dirancang untuk membantumu lebih memahami dan merawat kondisi kesehatan mentalmu.
              </p>
            </div>

            <!-- Item 5 -->
            <div class="space-y-3">
              <div>
                <!-- Ikon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                Soal Dibuat oleh AI
              </h3>
              <p class="text-gray-600">
                Kuis dengan pertanyaan yang dirancang otomatis oleh AI, disesuaikan untuk kebutuhan dan pengalaman unik setiap pengguna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="max-w-[85rem] mx-auto p-6 space-y-6">

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Quizzes Completed
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats.quizCompleted }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Score
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats.totalScore }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Health Grade
              </p>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats.lastTestStatus }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Card -->
        <div
            class="p-4 md:col-span-2 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Perkembangan kesehatan mental
              </h2>
            </div>

            <div v-if="loadingGraph" class="flex justify-center items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
                <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
              </svg>
              <span class="text-teal-500">Loading...</span>
            </div>
            <div>
              <div class="relative">
                <client-only>
                  <select v-model="year" data-hs-select='{
      "placeholder": "Select option...",
      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
    }'>
                    <option v-for="(year,i) in [2025]" :value="year" :key="i"
                            :selected="year === new Date().getFullYear()">{{ year }}
                    </option>
                  </select>
                </client-only>
                <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                       stroke-linejoin="round">
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <!-- End Header -->

          <div id="hs-single-area-chart" class="h-full w-full">
            <client-only>
              <ChartAreaChart
                  :series="graphData?.series??[]"
                  :categories="graphData?.categories??[]"
                  :color="chartColors"
              />
            </client-only>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card -->
        <div
            class="p-4 col-span-1 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Health Grade Ratio
              </h2>
            </div>
          </div>
          <!-- End Header -->

          <div v-if="loading" class="flex justify-center items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
              <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
            </svg>
            <span class="text-teal-500">Loading...</span>
          </div>
          <div v-if="stats.categoryRatios" id="hs-single-area-chart"
               class="h-full w-full flex flex-col justify-center items-center p-2">
            <client-only>
              <ChartDonutChart
                  :series="stats.categoryRatios.values??[]"
                  :labels="stats.categoryRatios.fields??[]"
                  :colors="chartColors"
              />
            </client-only>
            <!-- Legend Indicator -->
            <div v-if="stats && stats.categoryRatios && stats.categoryRatios.fields"
                 class="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
              <div v-for="(field, i) in stats.categoryRatios.fields" class="inline-flex items-center">
                <span class="size-2.5 inline-block rounded-sm me-2"
                      :class="i === 0 ? 'bg-cyan-500' : i === 1 ? 'bg-cyan-600' : 'bg-cyan-700'"></span>
                <span class="text-[13px] text-gray-600">{{
                    field
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <!-- Card -->
      <RecapQuizSection />
      <!-- End Card -->

      <!-- Card -->
      <QuizSection />
      <!-- End Card -->
    </div>
  </template>
</template>

<script setup lang="ts">
import RecapQuizSection from "~/components/card/RecapQuizSection.vue";
import QuizSection from "~/components/card/QuizSection.vue";

const {isLoggedIn} = useAuth()

const isLogged = computed(() => isLoggedIn().value)
const loading = ref(false);  // Track loading state
const loadingGraph = ref(false);  // Track loading state
const dataHealthGraph = ref({})
const year = ref(new Date().getFullYear())
const statsData: any = ref({
  "quizCompleted": 0,
  "totalScore": 0,
  "lastTestStatus": "unknown",
  "categoryRatios": {
    "Buruk": 0,
    "Baik": 0,
    "Sedang": 0
  }
})

// Warna untuk setiap garis pada grafik
const chartColors = ref(['#05B6D3', '#0991B1', '#0D7490']); // Warna garis yang berbeda

const stats: any = computed(() => statsData.value)
const graphData: any = computed(() => dataHealthGraph.value)

const fetchStatsData = async () => {
  try {
    loadingGraph.value = true;
    const response: any = await useFetchApi('/api/auth/stats')
    statsData.value = response?.data

    statsData.value.categoryRatios = {
      fields: Object.keys(response?.data?.categoryRatios),
      values: Object.values(response?.data?.categoryRatios)
    }
  } catch (e) {

  } finally {
    loadingGraph.value = false;
  }
}

const fetchStuntingDataGraph = async () => {
  try {
    loading.value = true;
    const response: any = await useFetchApi(`/api/auth/graph?year=${year.value}`)
    dataHealthGraph.value = {
      series: [{
        name: "Health",
        data: response?.data.data
      }],
      categories: response?.data.categories
    }

    console.log(dataHealthGraph.value)
  } catch (e) {

  } finally {
    loading.value = false;
  }
}


watch(year, fetchStuntingDataGraph)

onMounted(() => {
  fetchStatsData()
  fetchStuntingDataGraph()
})
</script>

<style scoped>

</style>