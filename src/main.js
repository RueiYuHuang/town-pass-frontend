import { createApp } from 'vue'
import './assets/style/main.css'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
