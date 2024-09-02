import { createRouter, createWebHistory} from "vue-router"

import HomeView from '../views/Home.vue'
import StyleView from '../views/Style.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/style', component: StyleView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
