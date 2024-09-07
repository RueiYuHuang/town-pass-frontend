import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import StyleView from '@/views/Style.vue'
import ListView from '@/views/List.vue'
import DetailView from '@/views/Detail.vue'
import InformView  from '@/views/Inform.vue'
import ResponseView  from '@/views/Response.vue'



const routes = [
  { path: '/', component: ListView },
  { path: '/style', component: StyleView },
  // { path: '/list', component: ListView },
  { path: '/detail', component: DetailView },
  { path: '/inform', component: InformView },
  { path: '/debug', component: HomeView },
  { path: '/response', component: ResponseView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
