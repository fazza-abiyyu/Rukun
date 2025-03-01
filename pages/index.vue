<template>
  <!-- Breadcrumb -->
  <div
      class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
    <div class="flex items-center py-2">
      <!-- Navigation Toggle -->
      <button type="button"
              class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
      <!-- End Navigation Toggle -->

      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">
          Aplikasi
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16"
               height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Dashboard
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <!--   Cards Stats   -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <!-- Card -->
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-x-2">
              <p class="text-xs uppercase tracking-wide text-gray-500">
                Total Pengguna
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                      Total Pengguna Aktif
                    </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats?.totalUser }}
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
                Total Wagra
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                      Total Warga Aktif
                    </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats?.totalCitizen }}
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
                Total Warga Laki-laki
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                      Total Warga Laki-laki Aktif
                    </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats?.totalMaleCitizen }}
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
                Total Warga Perempuan
              </p>
              <div class="hs-tooltip">
                <div class="hs-tooltip-toggle">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip">
                      Total Warga Perempuan Aktif
                    </span>
                </div>
              </div>
            </div>

            <div class="mt-1 flex items-center gap-x-2">
              <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ stats?.totalFemaleCitizen }}
              </h3>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>

      <!--   Card Graph   -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Card -->
        <div
            class="p-4 md:col-span-2 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-sm text-gray-500">
                Arus Kas
              </h2>
              <p class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ cashflowGraph?.totals }}
              </p>
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
                    <option v-for="(year,i) in [2025, 2024,2023, 2022, 2021]" :value="year" :key="i"
                            :selected="year === new Date().getFullYear()">{{ year }}
                    </option>
                  </select>
                </client-only>
                <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                  <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
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
                  :series="cashflowGraph?.CashFlow??[]"
                  :categories="cashflowGraph?.categories??[]"
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
                Rasio Arus Kas
              </h2>
              <p class="text-xl sm:text-2xl font-medium text-gray-800">
                {{ cashFlowRatioGraph?.totals }}
              </p>
            </div>
          </div>
          <!-- End Header -->

          <div id="hs-single-area-chart" class="h-full w-full flex flex-col justify-center items-center p-2">
            <client-only>
              <ChartDonutChart
                  :series="cashFlowRatioGraph?.cashFlow??[]"
                  :labels="cashFlowRatioGraph?.label??[]"
                  :colors="chartColors"
              />
            </client-only>
            <!-- Legend Indicator -->
            <div class="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-[#426048] rounded-sm me-2"></span>
                <span class="text-[13px] text-gray-600">{{
                    cashFlowRatioGraph && cashFlowRatioGraph?.label && cashFlowRatioGraph.label.length > 0 ? cashFlowRatioGraph.label[0] : "Unknown"
                  }}</span>
              </div>
              <div class="inline-flex items-center">
                <span class="size-2.5 inline-block bg-[#F38200] rounded-sm me-2"></span>
                <span class="text-[13px] text-gray-600">{{
                    cashFlowRatioGraph && cashFlowRatioGraph?.label && cashFlowRatioGraph.label.length > 0 ? cashFlowRatioGraph.label[1] : "Unknown"
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>
      <div
          class="p-4 md:p-5 h-fit max-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl">
        <!-- Header -->
        <div class="flex justify-between items-center p-2">
          <h2 class="text-xl font-medium text-gray-800">
            Aktivitas Penambahan Arus Kas Terbaru
          </h2>
        </div>
        <!-- End Header -->

        <div id="recently-activities" class="h-full w-full mt-2 overflow-auto">
          <client-only>
            <DataTablesRecentlyActivities :data="recentlyActivities" />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Data untuk grafik area
import DataTablesRecentlyActivities from "~/components/datatables/DataTablesRecentlyAddCashflowActivities.vue";

const cashFlowDataGraph = ref([])
const cashflow = ref([])
const year = ref(new Date().getFullYear())
const recentlyActivitiesData = ref([])
const statsData = ref([])

// Warna untuk setiap garis pada grafik
const chartColors = ref(['#426048', '#F38200']); // Warna garis yang berbeda
  
const stats: any = computed(() => statsData.value)
const cashFlowRatioGraph: any = computed(() => cashFlowDataGraph.value)
const cashflowGraph: any = computed(() => cashflow.value)
const recentlyActivities: any = computed(() => recentlyActivitiesData.value)

const fetchStatsData = async () => {
  try {
    const response: any = await useFetchApi('/api/auth/stats')
    statsData.value = response?.data
  } catch (e) {

  }
}

const fetchCashFlowDataGraph = async () => {
  try {
    const response: any = await useFetchApi('/api/auth/graph/cashflow')
    cashFlowDataGraph.value = response?.data
  } catch (e) {

  }
}

const fetchcashflow = async () => {
  try {
    const response: any = await useFetchApi(`/api/auth/graph?year=${year.value}`)
    cashflow.value = response?.data
  } catch (e) {

  }
}

const fetchRecentlyCashFlowActivitiesData = async () => {
  try {
    const response: any = await useFetchApi('/api/auth/cashflowrecently')
    recentlyActivitiesData.value = response?.data?.cashflow
  } catch (e) {

  }
}

onMounted(() => {
  fetchStatsData()
  fetchCashFlowDataGraph()
  fetchcashflow()
  fetchRecentlyCashFlowActivitiesData()
})
</script>

<style scoped>

</style>