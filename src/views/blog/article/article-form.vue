<!--
 * @Author: Carlos
 * @Date: 2023-01-28 02:37:53
 * @LastEditTime: 2023-02-03 13:32:51
 * @FilePath: /vue3-cms/src/views/blog/article/article-form.vue
 * @Description: null
-->
<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    size="medium"
  >
    <n-form-item label="Title" path="title">
      <n-input v-model:value="model.title" placeholder="Title" />
    </n-form-item>
    <n-form-item label="Poster" path="poster">
      <n-input v-model:value="model.poster" placeholder="Poster" />
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input type="textarea" v-model:value="model.description" placeholder="Description" />
    </n-form-item>
    <n-form-item label="Category" path="category">
      <n-select v-model:value="model.category" :options="categoryOptions" placeholder="Belongs" />
    </n-form-item>
    <n-form-item label="State" path="state">
      <n-switch v-model:value="model.state" />
    </n-form-item>
    <n-form-item label="Tag" path="tags">
      <n-select multiple v-model:value="model.tags" :options="tagOptions" placeholder="Tag" />
    </n-form-item>
    <n-form-item label="Content" path="content">
      <n-input type="textarea" v-model:value="model.content" placeholder="Content" />
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import { toRef, computed, ref } from 'vue'
import type { SubmitArticle } from '@/interface/blog'
import type { FormRules, SelectOption, FormInst } from 'naive-ui'
import { useCategoryStore } from '@/stores/category'
import { useTagStore } from '@/stores/tag'

const { categories } = useCategoryStore()
const { tags } = useTagStore()
const categoryOptions = computed<SelectOption[]>(() => {
  if (!categories || !categories.length) return []
  const result = categories.filter(c => c.belongs)
  const cd = categories.filter(c => !c.belongs)
  cd.forEach(c => {
    if (result.find(r => r.belongs?.id === c.id)) return
    result.unshift(c)
  })
  return result.map(c => ({ label: c.text, value: c.id }))
})

const tagOptions = computed<SelectOption[]>(() => {
  if (!tags || !tags.length) return []
  return tags.map(c => ({ label: c.text, value: c.id }))
})
const formRef = ref<FormInst>()
const props = defineProps<{
  value: Partial<SubmitArticle>
}>()
const model = toRef(props, 'value')
const rules: FormRules = {
  title: {
    required: true
  },
  category: {
    required: true
  },
  content: {
    required: true
  }
}
defineExpose({
  formRef
})
</script>

<style scoped></style>
