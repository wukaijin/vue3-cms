<!--
 * @Author: Carlos
 * @Date: 2023-02-03 12:41:38
 * @LastEditTime: 2023-08-23 11:32:19
 * @FilePath: /vue3-cms/src/views/blog/article/filter-form.vue
 * @Description: null
-->
<template>
  <n-form inline label-placement="left">
    <n-form-item label="Title" path="title">
      <n-input v-model:value="model.title" placeholder="Title" @keydown.enter="search" />
    </n-form-item>
    <n-form-item label="Category" path="category">
      <n-select
        clearable
        v-model:value="model.category"
        style="min-width: 8rem"
        placeholder="category"
        :options="categoryOptions"
        @update:value="search"
      />
    </n-form-item>
    <n-form-item label="Tags" path="tags">
      <n-select
        clearable
        multiple
        style="min-width: 8rem"
        v-model:value="model.tags"
        placeholder="tags"
        :options="tagOptions"
        @update:value="search"
      />
    </n-form-item>
    <n-button type="primary" @click="search">Search</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useTagStore } from '@/stores/tag'
import type { SelectOption } from 'naive-ui'
import type { ArticleQuery } from './types'

const categoryStore = useCategoryStore()
const tagStore = useTagStore()

const categoryOptions = computed<SelectOption[]>(() => {
  if (!categoryStore.categories || !categoryStore.categories.length) return []
  const result = categoryStore.categories.filter(c => c.belongs)
  const cd = categoryStore.categories.filter(c => !c.belongs)
  cd.forEach(c => {
    if (result.find(r => r.belongs?.id === c.id)) return
    result.unshift(c)
  })
  return result.map(c => ({ label: c.text, value: c.id }))
})

const tagOptions = computed<SelectOption[]>(() => {
  if (!tagStore.tags || !tagStore.tags.length) return []
  return tagStore.tags.map(c => ({ label: c.text, value: c.id }))
})
const props = defineProps<{ model: ArticleQuery }>()
const emits = defineEmits(['search'])
const search = () => emits('search')
const model = ref(props.model)

// onMounted(() => {
//   fetchCategories()
//   fetchTags()
// })
</script>

<style scoped></style>
