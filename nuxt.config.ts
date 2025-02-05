// https://nuxt.com/docs/api/configuration/nuxt-config
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
      title: "Healing | Teman Anda dalam Menjaga Kesehatan Mental",
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        {
          name: 'description',
          content: 'Healing adalah platform yang mendukung kesehatan mental Anda. Dengan kuis interaktif dan data yang dipersonalisasi, kami membantu Anda memahami, memantau, dan meningkatkan kesejahteraan mental secara sederhana namun mendalam.'
        }
      ],
    },
  },

})
