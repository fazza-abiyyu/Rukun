<!-- components/Navbar.vue -->
<template>
  <!-- ========== HEADER ========== -->
  <header class="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b  white:bg-neutral-800 white:border-neutral-700">
    <nav class="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center gap-x-1">
        <AppLogo/>

        <!-- Collapse Button -->
        <button type="button" class="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-sm rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-header-base-collapse"  aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation"  data-hs-collapse="#hs-header-base" >
          <svg class="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
          <svg class="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span class="sr-only">Toggle navigation</span>
        </button>
        <!-- End Collapse Button -->
      </div>

      <!-- Collapse -->
      <div id="hs-header-base" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "  aria-labelledby="hs-header-base-collapse" >
        <div class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div class="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">

            <div class="grow my-2 md:my-0 md:mx-2">
              <div class="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300 dark:bg-neutral-700"></div>
            </div>

            <!-- Button Group -->
            <div class=" flex flex-wrap items-center gap-x-1.5">
              <a class="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none white:bg-neutral-800 focus:outline-hidden focus:bg-gray-100  text-dark dark:hover:bg-orange-100 dark:focus:bg-orange-100" href="/auth/login">
                Sign in
              </a>
              <a class="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-orange-600 text-white hover:bg-orange-200 focus:outline-hidden focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:bg-orange-600" href="/auth/register">
                Sign up
              </a>
            </div>
            <!-- End Button Group -->
          </div>
        </div>
      </div>
      <!-- End Collapse -->
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
</template>

<script setup>
// Impor komponen AppLogo
import AppLogo from '~/components/landing-page/AppLogo.vue';
import App from "~/pages/landing-page.vue";
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>