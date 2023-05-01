/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-04-27 21:16:35
 * @FilePath: /vue3-cms/src/router/index.ts
 * @Description: null
 */
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext
} from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Layout from '@/components/shared/layout/index.vue'

import blogRoutes from './blog'
import serverRoutes from './server'
import { useProviderStore } from '@/stores/provider'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: {
        name: 'BlogCategory'
      },
      children: [blogRoutes, serverRoutes]
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
})
const whiteList = ['/login']
const hasPermission = (route: RouteLocationNormalized) => {
  if (route.meta) {
    return false
  } else {
    return true
  }
}

router.beforeEach(() => {
  useProviderStore().loadingBar?.start()
})
router.afterEach(() => {
  useProviderStore().loadingBar?.finish()
})

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // document.title = to.meta.title as string
    const token: string = localStorage.getItem('token') || ''
    // 判断该用户是否登录
    if (token) {
      if (to.path === '/login') {
        // 如果登录，并准备进入 login 页面，则重定向到主页
        next()
      } else {
        // const roles = store.state.userModule.roles
        // store.dispatch('routesModule/generateRoutes', { roles })
        // 确保添加路由已完成
        // 设置 replace: true, 因此导航将不会留下历史记录
        // next({ ...to, replace: true })
        next()
      }
    } else {
      // 如果没有 token
      if (whiteList.includes(to.path)) {
        // 如果在免登录的白名单中，则直接进入
        next()
      } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        next('/login')
      }
    }
  }
)
router.afterEach(() => {
  // NProgress.done()
})

export default router
