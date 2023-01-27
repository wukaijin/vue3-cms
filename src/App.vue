<!--
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-01-27 16:06:29
 * @FilePath: /vue3-cms/src/App.vue
 * @Description: null
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { lightTheme, NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui'
import themeOverrides from './themeOverrides'
</script>

<template>
  <n-config-provider :theme="lightTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <RouterView />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
