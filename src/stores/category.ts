/*
 * @Author: Carlos
 * @Date: 2023-01-27 15:29:51
 * @LastEditTime: 2023-01-28 00:28:38
 * @FilePath: /vue3-cms/src/stores/category.ts
 * @Description: null
 */
import { computed } from 'vue'
import { defineStore } from 'pinia'
import { CategoryApi } from '@/api/blog'
import useRequest from '@/hooks/useRequest'

export const useCategoryStore = defineStore('category', () => {
  const { data: categories, run: fetchCategories } = useRequest(CategoryApi.findAll)
  const selectableCategories = computed(() => {
    if (!categories?.value) return []
    return categories.value.filter(c => !c.belongs)
  })
  return { categories, selectableCategories, fetchCategories }
})
