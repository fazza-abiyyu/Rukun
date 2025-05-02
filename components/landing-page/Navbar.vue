<template>
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 shadow-md">
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <!-- Logo -->
      <div class="flex items-center justify-between">
        <AppLogo />

        <!-- Tombol Toggle (Hanya untuk Mobile) -->
        <div class="sm:hidden">
          <button type="button"
            class="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
            id="hs-navbar-collapse" aria-expanded="false" aria-controls="hs-navbar" data-hs-collapse="#hs-navbar">
            <svg class="hs-collapse-open:hidden size-5" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hs-collapse-open:block hidden size-5" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>

      <!-- Menu Navigasi -->
      <div id="hs-navbar"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block sm:flex sm:items-center sm:justify-end sm:ps-5"
        aria-labelledby="hs-navbar-collapse">
        <div class="flex items-center gap-4">
          <!-- Tombol Login -->
          <a href="/auth/login"
            class="px-5 py-2 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-100 transition">
            Login
          </a>

          <!-- Tombol Sign Up -->
          <a href="/auth/register"
            class="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            style="background-color: #f38302;">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import AppLogo from '~/components/landing-page/AppLogo.vue'
</script>
