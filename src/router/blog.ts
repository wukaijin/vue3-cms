/*
 * @Author: Carlos
 * @Date: 2023-01-26 15:56:48
 * @LastEditTime: 2023-01-26 17:17:22
 * @FilePath: /vue3-cms/src/router/blog.ts
 * @Description: null
 */
import type { RouteRecordRaw } from 'vue-router'
import BlankRoute from '@/components/shared/blank-route.vue'
import BlogCategory from '@/views/blog/category/index.vue'
import BlogTag from '@/views/blog/tag/index.vue'
import BlogArticle from '@/views/blog/article/index.vue'
const blogRoutes: RouteRecordRaw = {
  path: 'blog',
  name: 'Blog',
  component: BlankRoute,
  meta: {
    icon: '',
    title: 'Blog Management'
  },
  children: [
    {
      path: 'category',
      name: 'BlogCategory',
      component: BlogCategory,
      meta: {
        icon: '',
        title: 'Category'
      }
    },
    {
      path: 'tag',
      name: 'BlogTag',
      component: BlogTag,
      meta: {
        icon: '',
        title: 'Tag'
      }
    },
    {
      path: 'article',
      name: 'BlogArticle',
      component: BlogArticle,
      meta: {
        icon: '',
        title: 'Article'
      }
    }
  ]
}

export default blogRoutes
