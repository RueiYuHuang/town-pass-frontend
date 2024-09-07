import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import StyleView from '../views/Style.vue'
import informView  from '../views/inform.vue'
import responseView  from '../views/Response.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/style', component: StyleView },
  { path: '/inform', component: informView },
  { path: '/response', component: responseView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
