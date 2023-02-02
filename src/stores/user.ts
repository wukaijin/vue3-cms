/*
 * @Author: Carlos
 * @Date: 2023-02-02 17:42:03
 * @LastEditTime: 2023-02-02 17:44:11
 * @FilePath: /vue3-cms/src/stores/user.ts
 * @Description: null
 */
import type { User } from '@/interface/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>()
  function setUser(u: User) {
    user.value = u
  }
  return { user, setUser }
})
