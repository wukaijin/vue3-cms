<!--
 * @Author: Carlos
 * @Date: 2023-01-26 02:28:01
 * @LastEditTime: 2023-01-26 23:58:43
 * @FilePath: /vue3-cms/src/components/shared/layout/layout-header.vue
 * @Description: null
-->

<template>
  <n-layout-header position="absolute" style="height: 56px; z-index: 1" bordered>
    <div class="flex h-full justify-between items-center">
      <div class="flex">
        <n-icon size="24" class="cursor-pointer pl-4 pr-8" @click="toggleMenu">
          <Menu></Menu>
        </n-icon>
        <n-breadcrumb>
          <n-breadcrumb-item
            v-for="item of matchers"
            :key="item.path"
            :clickable="item.clickable"
            @click="navigate(item.path)"
          >
            <span>{{ item.title }}</span>
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <div></div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Menu } from '@vicons/ionicons5'
import { NIcon, NLayoutHeader, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface Breadcrumb {
  title: string
  path: string
  clickable: boolean
}
// const matchers = ref()
const matchers = computed<Breadcrumb[]>(() => {
  return route.matched.slice(1).map((r, i) => {
    return {
      title: r.meta.title as string,
      path: r.path,
      clickable: i !== route.matched.length - 2
    }
  })
})
console.log(matchers)
const emits = defineEmits(['toggle-menu'])
const toggleMenu = () => emits('toggle-menu')
const navigate = (path: string) => router.push(path)
</script>

<style scoped></style>
