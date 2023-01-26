<!--
 * @Author: Carlos
 * @Date: 2023-01-26 02:28:01
 * @LastEditTime: 2023-01-26 23:19:23
 * @FilePath: /vue3-cms/src/components/shared/layout/index.vue
 * @Description: null
-->
<template>
  <n-layout has-sider style="height: 100vh">
    <layout-sider :collapsed="menuCollapse" />
    <n-layout>
      <layout-header @toggle-menu="toggleMenu" />
      <n-layout-content content-style="padding: 24px; padding-top: 56px;" :native-scrollbar="false">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutContent } from 'naive-ui'
import { RouterView } from 'vue-router'
import LayoutSider from './layout-sider.vue'
import LayoutHeader from './layout-header.vue'
const menuCollapse = ref(false)
const toggleMenu = () => (menuCollapse.value = !menuCollapse.value)
</script>

<style scoped></style>
