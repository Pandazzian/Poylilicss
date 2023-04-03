// https://nuxt.com/docs/api/configuration/nuxt-config
// import { createRouter, createMemoryHistory } from 'vue-router'
// export default defineNuxtConfig({
//     css: [
//       '~/assets/css/main.css'
//     ],
//     plugins: [
//       vue(),
//         vueRouter({
//           history: createMemoryHistory(),
//           routes: []
//         })
//       // { src: '~/plugins/mdbvue.js', ssr: false }
//     ],
// })
import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  // Mode configuration
  mode: 'universal',

  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },

  // Page head configuration
  head: {
    title: 'My Nuxt.js App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Nuxt.js App' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS configuration
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins configuration
  plugins: [
    // '@/plugins/my-plugin.ts'
  ],

  // Modules configuration
  modules: [
  ],

  // Axios module configuration
  axios: {
    baseURL: 'https://api.example.com'
  },

  // PWA module configuration
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build configuration
  build: {
    // You can extend webpack config here
  }
}

export default config
