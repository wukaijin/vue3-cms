/*
 * @Author: Carlos
 * @Date: 2023-02-01 11:23:39
 * @LastEditTime: 2023-02-02 14:35:36
 * @FilePath: /vue3-cms/src/stores/provider.ts
 * @Description: null
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoadingBarApi, MessageApi } from 'naive-ui'
import type { Router } from 'vue-router'

export const useProviderStore = defineStore('provider', () => {
  const loadingBar = ref<LoadingBarApi>()
  const message = ref<MessageApi>()
  const router = ref<Router>()

  function setLoadingBar(b: LoadingBarApi) {
    loadingBar.value = b
  }

  function setMessage(m: MessageApi) {
    message.value = m
  }

  function setRouter(r: Router) {
    router.value = r
  }

  return { loadingBar, setLoadingBar, setMessage, message, setRouter, router }
})
