<!--
 * @Author: Carlos
 * @Date: 2024-10-05 22:28:22
 * @LastEditTime: 2024-10-06 16:42:49
 * @FilePath: /vue3-cms/src/views/server/image/components/UploadImageModal.vue
 * @Description: null
-->
<template>
  <n-modal :show="visible" @update:show="$emit('update:visible', $event)">
    <n-card
      style="width: 600px"
      title="Upload Image"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="imageModel" :rules="rules">
        <n-form-item label="path" path="path">
          <n-cascader
            v-model:value="imageModel.path"
            placeholder="path"
            expand-trigger="click"
            :options="folders"
            :multiple="false"
            :show-path="true"
          >
          </n-cascader>
        </n-form-item>
        <n-form-item label="name" path="name">
          <n-input placeholder="name" v-model:value="imageModel.name">
            <template #prefix>
              <n-icon :component="Folder" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="image" path="image">
          <n-upload
            ref="uploadRef"
            :default-upload="false"
            @change="handleChange"
            :multiple="false"
            :max="1"
            accept="image/*"
            :file-list="imageModel.fileList"
          >
            <n-button>Select Image</n-button>
          </n-upload>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="cancelAction">Cancel</n-button>
          <n-button type="primary" @click="handleUpload">Upload</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NModal,
  NIcon,
  NInput,
  NCascader,
  NUpload,
  NCard,
  NForm,
  NSpace,
  NButton,
  type UploadFileInfo,
  type TreeOption
} from 'naive-ui'
import { Folder } from '@vicons/ionicons5'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { FormRules, FormInst } from 'naive-ui'
import type { ImageModel } from '../types'

const formRef = ref<FormInst | null>(null)

const props = defineProps({
  visible: Boolean as PropType<boolean>,
  rules: Object as PropType<FormRules>,
  folders: Array as PropType<TreeOption[]>,
  selected: Array as PropType<string[]>
})

const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'upload', data: FormData): void
}>()

const handleUpload = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      const { name, path, fileList } = imageModel.value
      console.log(name, path, fileList[0])
      const data = new FormData()
      if (name) data.append('name', name)
      if (path) data.append('path', path)
      data.append('file', fileList[0].file!)
      emits('upload', data)
    }
  })
}
const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  imageModel.value.fileList = options.fileList
}
const cancelAction = () => {
  emits('update:visible', false)
}
const imageModel = ref<ImageModel>({ name: '', path: '', fileList: [] })

watch(
  () => props.selected,
  () => {
    if (props.selected) {
      imageModel.value.path = props.selected ? props.selected[0] : ''
    }
  }
)
</script>
