import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import StyleView from '@/views/Style.vue'
import ListView from '@/views/List.vue'
import DetailView from '@/views/Detail.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/style', component: StyleView },
  { path: '/list', component: ListView },
  { path: '/detail', component: DetailView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
