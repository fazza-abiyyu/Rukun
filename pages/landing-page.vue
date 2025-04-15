<!-- pages/landing-page.vue -->
<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Welcome Section -->
    <WelcomeSection />

    <!-- Access Section -->
    <AccessSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- CTA Section -->
    <CTASection />
  </div>
</template>

<script>
import Navbar from '~/components/landing-page/Navbar.vue';
import HeroSection from '~/components/landing-page/HeroSection.vue';
import WelcomeSection from '~/components/landing-page/WelcomeSection.vue';
import AccessSection from '~/components/landing-page/AccessSection.vue';
import TestimonialsSection from '~/components/landing-page/TestimonialsSection.vue';
import FAQSection from '~/components/landing-page/FAQSection.vue';
import CTASection from '~/components/landing-page/CTASection.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    HeroSection,
    WelcomeSection,
    AccessSection,
    TestimonialsSection,
    FAQSection,
    CTASection
  }
}
</script>

<script setup>
// Terapkan layout khusus untuk halaman landing-page
definePageMeta({
  layout: 'landing', // Gunakan layout khusus tanpa header/sidebar
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* Decorations */
.decoration {
  position: absolute;
  pointer-events: none;
}

.wave {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%;
}
</style>