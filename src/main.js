/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
loadFonts()

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Create vue app
const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// Use plugins
app.use(vuetify)
app.use(pinia)

app.use(router)

app.use(VueSweetalert2);

// Mount vue app
app.mount('#app')
