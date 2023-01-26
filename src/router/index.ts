/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-01-26 16:14:33
 * @FilePath: /vue3-cms/src/router/index.ts
 * @Description: null
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/components/shared/layout/index.vue'
import blogRoutes from './blog'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [blogRoutes]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
