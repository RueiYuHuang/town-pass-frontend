import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import StyleView from '@/views/Style.vue'
import DebugView from '@/views/Debug.vue'
import DetailView from '@/views/Detail.vue'
import InformView  from '@/views/Inform.vue'
import ResponseView  from '@/views/Response.vue'



const routes = [
  { 
    path: '/', 
    component: HomeView,
    meta: { title: '寵物遺失通報' }
  },
  { path: '/style',
    component: StyleView,
    meta: { title: 'Home Page' }
  },
  { 
    path: '/debug', 
    component: DebugView,
    meta: { title: 'Home Page' }
  },
  { 
    path: '/detail', 
    component: DetailView,
    meta: { title: '寵物資訊' }
  },
  {
    path: '/inform',
    component: InformView,
    meta: { title: '新增回報' }
  },
  { 
    path: '/response',
    component: ResponseView,
    meta: { title: 'Response Page' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // 如果路由有設定 title，則動態更新
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});

export default router
