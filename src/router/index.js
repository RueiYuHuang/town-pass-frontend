import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import StyleView from '../views/Style.vue'
import informView  from '../views/inform.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/style', component: StyleView },
  { path: '/inform', component: informView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
