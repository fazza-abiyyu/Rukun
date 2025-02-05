<template>
  <client-only>
    <div id="hs-single-donut-chart" class="w-full">
      <ApexCharts
          type="donut"
          :options="computedChartOptions"
          :series="computedSeries"
          width="100%"
          height="300"
      />
    </div>
  </client-only>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import ApexCharts from 'vue3-apexcharts';

// Definisikan props yang diterima oleh komponen
const props = defineProps<{
  series: number[];  // Data untuk setiap bagian donut chart
  labels: string[];  // Label untuk setiap bagian donut chart
  colors: string[];  // Warna untuk setiap bagian donut chart
}>();

const computedSeries = computed(() => props.series)

// Menghitung konfigurasi chart secara dinamis berdasarkan props yang diberikan
const computedChartOptions = computed(() => ({
  chart: {
    height: 230,
    width: 230,
    type: 'donut',
    zoom: {
      enabled: false
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '76%'
      }
    }
  },
  colors: props.colors,  // Menggunakan warna dari props
  legend: {
    show: false,  // Menampilkan legenda
    position: 'bottom',  // Posisi legenda di bawah chart
    labels: {
      colors: "#9ca3af",  // Warna label legenda
    },
  },
  dataLabels: {
    enabled: false,  // Menampilkan label data
  },
  stroke: {
    width: 5
  },
  grid: {
    padding: {
      top: -12,
      bottom: -11,
      left: -12,
      right: -12
    }
  },
  states: {
    hover: {
      filter: {
        type: 'none'
      }
    }
  },
  tooltip: {
    enabled: true,  // Menampilkan tooltip
    y: {
      formatter: (value: number) => `${value} items`,  // Menampilkan jumlah item pada tooltip
    },
  },
}));
</script>
