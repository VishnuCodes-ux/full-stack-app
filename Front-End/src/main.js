import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import api from './services/api'
import App from './App.vue'
import '@/assets/main.css' 
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

import router from './router'

// Toastification options
const toastOptions = {
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true
}

const app = createApp(App)


app.use(vuetify)
app.use(Toast, toastOptions)
app.config.globalProperties.$axios = api

console.log('API Base URL:', app.config.globalProperties.$axios)

app.use(createPinia())
app.use(router)

app.mount('#app')