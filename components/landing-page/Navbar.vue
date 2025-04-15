<!-- components/Navbar.vue -->
<template>
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-blue-50 text-sm py-3 light:bg-neutral-800">
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <!-- Logo -->
      <div class="flex items-center justify-between">
        <AppLogo />

        <!-- Tombol Toggle (Hanya untuk Mobile) -->
        <div class="sm:hidden">
          <button
            type="button"
            class="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            id="hs-navbar-example-collapse"
            aria-expanded="false"
            aria-controls="hs-navbar-example"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-navbar-example"
          >
            <svg
              class="hs-collapse-open:hidden shrink-0 size-4"
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
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              class="hs-collapse-open:block hidden shrink-0 size-4"
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>

      <!-- Menu Desktop & Tombol Login/Sign Up -->
      <div
        id="hs-navbar-example"
        class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block sm:flex sm:items-center sm:justify-end sm:ps-5"
        aria-labelledby="hs-navbar-example-collapse"
      >
        <div class="flex items-center gap-4">
          <!-- Tombol Login -->
          <a
            href="/auth/login"
            class="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 border border-gray-300 px-4 py-2 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-neutral-400 dark:hover:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-500"
          >
            Login
          </a>

          <!-- Tombol Sign Up -->
          <a
            href="/auth/register"
            class="inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Impor komponen AppLogo
import AppLogo from '~/components/landing-page/AppLogo.vue';
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>