/*
 * @Author: Carlos
 * @Date: 2023-02-02 17:42:03
 * @LastEditTime: 2023-02-04 00:14:46
 * @FilePath: /vue3-cms/src/stores/user.ts
 * @Description: null
 */
import type { User } from '@/interface/user'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const init: string = localStorage.getItem('user') || ''
const initUser = init ? JSON.parse(init) : {}

export const useUserStore = defineStore('user', () => {
  const user = useStorage('user', initUser, localStorage, {
    mergeDefaults: true
  })
  console.log(user.value)
  // const user = ref<User>(initUser)
  function setUser(u: User) {
    user.value = u
  }
  return { user, setUser }
})
