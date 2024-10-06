<!--
 * @Author: Carlos
 * @Date: 2024-10-05 22:28:28
 * @LastEditTime: 2024-10-06 17:29:40
 * @FilePath: /vue3-cms/src/views/server/image/components/RenameModal.vue
 * @Description: null
-->
<template>
  <n-modal :show="visible" @update:show="$emit('update:visible', $event)">
    <n-card
      style="width: 600px"
      title="Rename"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="renameModel" :rules="rules">
        <n-form-item label="path" path="path">
          <n-input :value="renameModel.path" disabled />
        </n-form-item>
        <n-form-item label="name" path="name">
          <n-input placeholder="name" v-model:value="renameModel.name">
            <template #prefix>
              <n-icon :component="Folder" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="cancelAction">Cancel</n-button>
          <n-button :disabled="!renameModel.name" type="primary" @click="handleRename"
            >Rename</n-button
          >
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NCard, NForm, NSpace, NButton, NIcon } from 'naive-ui'
import { Folder } from '@vicons/ionicons5'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { FormRules } from 'naive-ui'
import type { RenameModel } from '../types'

const props = defineProps({
  visible: Boolean as PropType<boolean>,
  rules: Object as PropType<FormRules>,
  path: String as PropType<string>
})

const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'rename', data: RenameModel): void
}>()

const cancelAction = () => {
  emits('update:visible', false)
}
const handleRename = () => {
  emits('rename', renameModel.value)
}
const renameModel = ref<RenameModel>({ name: '', path: '' })

watch(
  () => props.path,
  () => {
    if (props.path) {
      renameModel.value.path = props.path
    }
  }
)
</script>
