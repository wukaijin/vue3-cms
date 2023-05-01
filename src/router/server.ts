/*
 * @Author: Carlos
 * @Date: 2023-04-27 21:10:25
 * @LastEditTime: 2023-04-29 17:28:49
 * @FilePath: /vue3-cms/src/router/server.ts
 * @Description: null
 */
import type { RouteRecordRaw } from 'vue-router'
import BlankRoute from '@/components/shared/blank-route.vue'
import ServerImage from '@/views/server/image/index.vue'
const serverRoutes: RouteRecordRaw = {
  path: 'server',
  name: 'Server',
  component: BlankRoute,
  meta: {
    icon: '',
    title: 'Server Management'
  },
  children: [
    {
      path: 'image',
      name: 'ServerImage',
      component: ServerImage,
      meta: {
        icon: '',
        title: 'Image'
      }
    }
  ]
}

export default serverRoutes
