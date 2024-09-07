import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import StyleView from '@/views/Style.vue'
import DebugView from '@/views/Debug.vue'
import DetailView from '@/views/Detail.vue'
import InformView  from '@/views/Inform.vue'
import ResponseView  from '@/views/Response.vue'



const routes = [
  { path: '/', component: HomeView },
  { path: '/style', component: StyleView },
  { path: '/debug', component: DebugView },
  { path: '/detail', component: DetailView },
  { path: '/inform', component: InformView },
  { path: '/response', component: ResponseView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
