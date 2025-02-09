// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN ?? "",
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN ?? "",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ?? "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ?? "",
    SMTP_HOST: process.env.SMTP_HOST ?? "",
    SMTP_PORT: process.env.SMTP_PORT ?? "",
    SMTP_USER: process.env.SMTP_USER ?? "",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD ?? "",
    MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL ?? "",
  },
  modules: ['@nuxtjs/tailwindcss'],
  plugins: ["~/plugins/preline.client.ts"],
  app: {
    head: {
      title: "Rukun | Management Data Warga RT",
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        {
          name: 'description',
          content: 'Rukun adalah sistem manajement untuk data warga'
        }
      ],
    },
  },
  serverMiddleware: [
    '~/server/middleware/auth.ts',
    // Middleware lainnya jika diperlukan
  ],
});
