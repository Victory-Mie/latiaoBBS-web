import { createRouter, createWebHistory } from 'vue-router'
//创建路由实例并传递 `routes` 配置。
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:"Layout",
      component:()=>import('@/views/Layout.vue'),
      
    }
  
  ]
})

//导出router
export default router
