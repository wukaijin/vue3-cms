/*
 * @Author: Carlos
 * @Date: 2023-01-28 03:12:37
 * @LastEditTime: 2023-02-03 13:54:09
 * @FilePath: /vue3-cms/src/stores/tag.ts
 * @Description: null
 */
import { defineStore } from 'pinia'
import { TagApi } from '@/api/blog'
import { computed } from 'vue'
import useRequest from '@/hooks/useRequest'

export const useTagStore = defineStore('tag', () => {
  const { data, run: fetchTags } = useRequest(TagApi.findAll)
  // const tags = computed(() => data)
  // console.log(tags?.value?.value)
  return { tags: data, fetchTags }
})
