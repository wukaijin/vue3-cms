/*
 * @Author: Carlos
 * @Date: 2023-01-28 03:12:37
 * @LastEditTime: 2023-01-28 03:23:41
 * @FilePath: /vue3-cms/src/stores/tag.ts
 * @Description: null
 */
import { defineStore } from 'pinia'
import { TagApi } from '@/api/blog'
import useRequest from '@/hooks/useRequest'

export const useTagStore = defineStore('tag', () => {
  const { data: tags, run: fetchTags } = useRequest(TagApi.findAll)
  return { tags, fetchTags }
})
