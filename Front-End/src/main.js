
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import api from './services/api'



import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
  })
import router from './router'

const app = createApp(App)
app.use(vuetify)
app.config.globalProperties.$axios = api

console.log('API Base URL:', app.config.globalProperties.$axios)

app.use(createPinia())
app.use(router)

app.mount('#app')
