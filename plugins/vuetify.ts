import { createVuetify } from 'vuetify'

const vuetifyPlugin = defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // Your Vuetify options here
  })

  app.vueApp.use(vuetify)
})

export default vuetifyPlugin