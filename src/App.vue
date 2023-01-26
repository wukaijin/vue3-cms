<!--
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-01-26 22:25:17
 * @FilePath: /vue3-cms/src/App.vue
 * @Description: null
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui'
import themeOverrides from './themeOverrides'
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
