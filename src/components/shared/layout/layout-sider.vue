<!--
 * @Author: Carlos
 * @Date: 2023-01-26 02:28:01
 * @LastEditTime: 2023-01-31 21:54:13
 * @FilePath: /vue3-cms/src/components/shared/layout/layout-sider.vue
 * @Description: null
-->
<template>
  <n-layout-sider
    :theme="theme.Layout"
    width="210"
    :collapsed-width="64"
    collapse-mode="width"
    :native-scrollbar="false"
    bordered
    :collapsed="props.collapsed"
  >
    <div class="relative">
      <div class="h-14 flex items-center px-4">
        <img
          class="w-8 h-8 mr-2 logo-eye"
          style="--gradient-radius: 16px"
          :src="resolveStatic('static-api/logo/transformer-256.png')"
          alt=""
        />
        <span v-show="!props.collapsed">
          <span class="text-2xl mr-2">Carlos</span>
          <span class="text-xs">CMS</span>
        </span>
      </div>
      <n-menu
        :theme="theme.Menu"
        :value="router.currentRoute.value.path"
        :collapsed="props.collapsed"
        :collapsed-width="64"
        :indent="16"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
      />
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { Component } from 'vue'
import { NLayoutSider, NMenu, NIcon, darkTheme } from 'naive-ui'
import { resolveStatic } from '@/utils'
import {
  BookmarkOutline,
  ChevronDown,
  Newspaper,
  Pricetag,
  Folder,
  DocumentText
} from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()
const theme = darkTheme
const props = defineProps<{
  collapsed: boolean
}>()

const getIconRenderer = (icon: Component) => () => h(NIcon, null, { default: () => h(icon) })
const menuOptions: MenuOption[] = [
  {
    label: 'Blog',
    key: 'blog',
    icon: getIconRenderer(Newspaper),
    children: [
      {
        label: 'Category',
        key: '/blog/category',
        path: '/blog/category',
        icon: getIconRenderer(Folder)
      },
      {
        label: 'Tag',
        key: '/blog/tag',
        path: '/blog/tag',
        icon: getIconRenderer(Pricetag)
      },
      {
        label: 'Article',
        key: '/blog/article',
        path: '/blog/article',
        icon: getIconRenderer(DocumentText)
      }
    ]
  }
]
const renderMenuLabel = (option: MenuOption) => {
  if ('path' in option) {
    return h(
      'a',
      {
        onClick: () => router.push(option.path as string)
      },
      option.label as string
    )
  }
  return option.label as string
}
const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  // if (option.key === 'sheep-man') return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food') return null
  if (option.icon) return option.icon()
  return h(NIcon, null, { default: () => h(BookmarkOutline) })
}
const expandIcon = () => {
  return h(NIcon, null, { default: () => h(ChevronDown) })
}
</script>

<style lang="scss" scoped>
.logo-eye {
  --gradient-radius: 14px;
  --eye-color: #008cff;
  background: radial-gradient(
    var(--gradient-radius) var(--gradient-radius) at 50% 50%,
    var(--eye-color),
    transparent
  );
  animation: eye-blink 16s ease-in-out infinite;
}

@keyframes eye-blink {
  0% {
    --eye-color: transparent;
    opacity: 0.8;
  }

  20% {
    --eye-color: #008cff;
    opacity: 1;
  }

  30% {
    --eye-color: transparent;
    opacity: 0.8;
  }

  50% {
    --eye-color: #ff8c00;
    opacity: 1;
  }

  60% {
    --eye-color: transparent;
    opacity: 0.8;
  }

  80% {
    --eye-color: #ff003c;
    opacity: 1;
  }

  100% {
    --eye-color: transparent;
    opacity: 0.8;
  }
}
</style>
