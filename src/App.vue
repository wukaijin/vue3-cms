<!--
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-02-02 14:35:27
 * @FilePath: /vue3-cms/src/App.vue
 * @Description: null
-->
<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import {
  lightTheme,
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
  useLoadingBar,
  useMessage
} from 'naive-ui'
import themeOverrides from './themeOverrides'
import { defineComponent, h } from 'vue'
import { useProviderStore } from './stores/provider'

const provider = useProviderStore()
const ViewComponent = defineComponent({
  render: () => h(RouterView),
  setup: () => {
    provider.setLoadingBar(useLoadingBar())
    provider.setMessage(useMessage())
    provider.setRouter(useRouter())
  }
})
</script>

<template>
  <n-config-provider :theme="lightTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <ViewComponent />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped></style>
