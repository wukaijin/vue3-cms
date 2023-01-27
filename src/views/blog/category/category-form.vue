<!--
 * @Author: Carlos
 * @Date: 2023-01-27 14:38:16
 * @LastEditTime: 2023-01-28 01:58:58
 * @FilePath: /vue3-cms/src/views/blog/category/category-form.vue
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
    <n-form-item label="Text" path="text">
      <n-input v-model:value="model.text" placeholder="Text" />
    </n-form-item>
    <n-form-item label="Belongs" path="belongs">
      <n-select v-model:value="model.belongs" :options="categoryOptions" placeholder="Belongs" />
    </n-form-item>
    <n-form-item label="DefaultPoster" path="defaultPoster">
      <n-input v-model:value="model.defaultPoster" placeholder="DefaultPoster" />
    </n-form-item>
    <n-form-item label="Order" path="order">
      <n-input-number v-model:value="model.order" placeholder="Order" />
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input type="textarea" v-model:value="model.description" placeholder="Description" />
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import { toRef, computed, ref } from 'vue'
import type { SubmittedCategory } from '@/interface/blog'
import type { FormRules, SelectOption, FormInst } from 'naive-ui'
import { useCategoryStore } from '@/stores/category'

const { selectableCategories } = useCategoryStore()
const categoryOptions = computed<SelectOption[]>(() => {
  return selectableCategories.map(c => ({ label: c.text, value: c.id }))
})
const formRef = ref<FormInst>()
const props = defineProps<{
  value: Partial<SubmittedCategory>
}>()
const model = toRef(props, 'value')
const rules: FormRules = {
  text: {
    required: true
  }
}
defineExpose({
  formRef
})
</script>

<style scoped></style>
