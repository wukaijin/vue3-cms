<!--
 * @Author: Carlos
 * @Date: 2024-10-05 22:28:16
 * @LastEditTime: 2024-10-06 16:52:57
 * @FilePath: /vue3-cms/src/views/server/image/components/AddFolderModal.vue
 * @Description: null
-->
<template>
  <n-modal :show="visible" @update:show="$emit('update:visible', $event)" @close="cancelAction">
    <n-card
      style="width: 600px"
      title="Add Folder"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="addFormRef" :model="model" :show-label="false" :rules="rules">
        <n-form-item label="path" path="path">
          <n-cascader
            v-model:value="model.path"
            placeholder="path"
            expand-trigger="click"
            :options="folders"
            :multiple="false"
            :show-path="true"
          >
          </n-cascader>
        </n-form-item>
        <n-form-item label="name" path="name">
          <n-input placeholder="name" v-model:value="model.name">
            <template #prefix>
              <n-icon :component="Folder" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="cancelAction">Cancel</n-button>
          <n-button type="primary" @click="handleAdd">Add</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NCascader, NForm, NInput, NIcon, NModal, NCard, type TreeOption } from 'naive-ui'
import { Folder } from '@vicons/ionicons5'
import type { PropType } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { ref, watch } from 'vue'

const addFormRef = ref<FormInst | null>(null)

const props = defineProps({
  visible: Boolean as PropType<boolean>,
  rules: Object as PropType<FormRules>,
  selected: Array as PropType<string[]>,
  folders: Array as PropType<TreeOption[]>
})

const model = ref<{ name: string; path: string }>({
  name: '',
  path: ''
})

const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'add', data: string): void
}>()

watch(
  () => props.selected,
  () => {
    if (props.selected) {
      model.value.path = props.selected ? props.selected[0] : ''
    }
  }
)
const cancelAction = () => {
  emits('update:visible', false)
}
const handleAdd = () => {
  emits('add', model.value.path + '/' + model.value.name)
}
</script>
