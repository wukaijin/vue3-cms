<!--
 * @Author: Carlos
 * @Date: 2023-01-28 02:20:36
 * @LastEditTime: 2023-01-28 02:27:13
 * @FilePath: /vue3-cms/src/views/blog/tag/tag-form.vue
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
    <n-form-item label="Color" path="color">
      <n-color-picker v-model:value="model.color" :show-alpha="false" />
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import { toRef, ref } from 'vue'
import type { Tag } from '@/interface/blog'
import { NColorPicker } from 'naive-ui'
import type { FormRules, FormInst } from 'naive-ui'

const formRef = ref<FormInst>()
const props = defineProps<{
  value: Partial<Tag>
}>()
const model = toRef(props, 'value')
const rules: FormRules = {
  text: {
    required: true
  },
  color: {
    required: true
  }
}
defineExpose({
  formRef
})
</script>

<style scoped></style>
