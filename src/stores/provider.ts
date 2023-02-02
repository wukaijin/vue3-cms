/*
 * @Author: Carlos
 * @Date: 2023-02-01 11:23:39
 * @LastEditTime: 2023-02-01 11:24:07
 * @FilePath: /vue3-cms/src/stores/provider.ts
 * @Description: null
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoadingBarApi } from 'naive-ui'

export const useProviderStore = defineStore('provider', () => {
  const loadingBar = ref<LoadingBarApi>()

  function setLoadingBar(b: LoadingBarApi) {
    loadingBar.value = b
  }

  return { loadingBar, setLoadingBar }
})
