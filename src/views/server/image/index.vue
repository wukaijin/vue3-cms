<!--
 * @Author: Carlos
 * @Date: 2023-04-27 21:12:41
 * @LastEditTime: 2023-05-02 19:03:23
 * @FilePath: /vue3-cms/src/views/server/image/index.vue
 * @Description: null
-->
<template>
  <n-layout>
    <n-layout-header class="py-4">
      <n-space>
        <n-button type="primary" @click="uploadAction">Upload</n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content class="overflow-hidden">
      <div class="flex flex-row">
        <div class="w-[200px] min-h-[400px] bg-gray-100">
          <n-tree
            block-line
            :data="folders"
            selectable
            :selected-keys="selected"
            :on-update-selected-keys="onSelect"
          />
        </div>
        <div class="flex-1 px-8">
          <div class="pb-4">
            <n-space>
              <n-button type="primary" @click="addAction">Add</n-button>
              <n-button v-if="deleteButtonVisible" type="error" @click="handleDelete"
                >Delete</n-button
              >
            </n-space>
          </div>
          <div class="shadow-lg inline-block mr-4 last:mr-0" v-for="img of images" :key="img.key">
            <div class="max-w-[200px]">
              <n-image
                style="vertical-align: bottom"
                :src="resolveStatic(`static-api/${img.key}`)"
              />
            </div>
            <div class="m-2">
              <span>{{ img.label }}</span>
            </div>
          </div>
        </div>
      </div>
      <n-modal v-model:show="modalVisible">
        <n-card
          style="width: 600px"
          :title="modalType === 'add' ? 'New Folder' : 'Upload Image'"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <n-form
            v-show="modalType === 'add'"
            ref="addFormRef"
            :model="model"
            :show-label="false"
            :rules="rules"
          >
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
          <n-form
            v-show="modalType === 'upload'"
            ref="uploadImageFormRef"
            :model="imageModel"
            :show-label="false"
            :rules="imageRules"
          >
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
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
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
              <n-button @click="modalVisible = false">Cancel</n-button>
              <n-button v-show="modalType === 'add'" type="primary" @click="handleAdd"
                >Add</n-button
              >
              <n-button
                v-show="modalType === 'upload'"
                type="primary"
                @click="handleUpload"
                :disabled="!imageModel.fileList?.length"
                >Upload</n-button
              >
            </n-space>
          </template>
        </n-card>
      </n-modal>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  NButton,
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NTree,
  NImage,
  useDialog,
  useMessage,
  NModal,
  NCascader,
  NUpload,
  type FormInst,
  type UploadFileInfo,
  type UploadInst
} from 'naive-ui'
import type { FormRules } from 'naive-ui'
import { Folder } from '@vicons/ionicons5'
import { ImageApi } from '@/api/server'
import useRequest from '@/hooks/useRequest'
import { resolveStatic } from '@/utils'

const dialog = useDialog()
const message = useMessage()

const { data: folders, run: fetchFolders } = useRequest(ImageApi.fetchImageFolders)
const { run: addFolder } = useRequest(ImageApi.addFolder, { manual: true })
const { run: deleteFolder } = useRequest(ImageApi.deleteFolder, { manual: true })
const {
  data: images,
  run: fetchImages,
  loading
} = useRequest(ImageApi.fetchImages, { manual: true })
const { run: uploadImage } = useRequest(ImageApi.uploadImage, { manual: true })

const addFormRef = ref<FormInst | null>(null)
const uploadImageFormRef = ref<FormInst | null>(null)
const uploadRef = ref<UploadInst | null>(null)

const selected = ref<string[]>()
const modalType = ref<'upload' | 'add'>('upload')
const modalVisible = ref<boolean>(false)
const model = ref<{ name: string; path: string }>({
  name: '',
  path: ''
})
const rules: FormRules = {
  name: [{ required: true }]
}
const imageModel = ref<{ name: string; path: string; fileList: Array<UploadFileInfo> }>({
  name: '',
  path: '',
  fileList: []
})
const imageRules: FormRules = {}
const deleteButtonVisible = computed(() => {
  if (!selected.value || !selected.value.length) return false
  if (loading.value) return false
  if (images && images.value && images.value.length) return false
  return true
})
const onSelect = (s: string[]) => {
  selected.value = s
  if (!s.length) return
  fetchImages(s[0])
}
const addAction = () => {
  modalType.value = 'add'
  modalVisible.value = true
  model.value = {
    name: '',
    path: (selected.value ? selected.value[0] : '') || ''
  }
}
const uploadAction = () => {
  modalType.value = 'upload'
  modalVisible.value = true
  imageModel.value = {
    name: '',
    path: (selected.value ? selected.value[0] : '') || '',
    fileList: []
  }
}
const handleDelete = () => {
  dialog.warning({
    title: 'Warming',
    content: `Do you confirm deleting [${selected.value![0]}] folder`,
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      deleteFolder(selected.value![0])
        .then(() => {
          message.success('ok')
          fetchFolders()
        })
        .catch(err => {
          message.error(err.message || 'unknown error')
        })
    },
    onNegativeClick: () => {}
  })
}
const handleAdd = () => {
  addFormRef.value?.validate(errors => {
    if (!errors) {
      const { name, path } = model.value
      addFolder(path ? `${path}/${name}` : name).then(res => {
        modalVisible.value = false
        message.success('ok')
        fetchFolders()
      })
    }
  })
}
const handleChange = (options: { fileList: UploadFileInfo[] }) => {
  imageModel.value.fileList = options.fileList
}
const handleUpload = () => {
  uploadImageFormRef.value?.validate(errors => {
    if (!errors) {
      const { name, path, fileList } = imageModel.value
      console.log(name, path, fileList[0])
      const data = new FormData()
      if (name) data.append('name', name)
      if (path) data.append('path', path)
      data.append('file', fileList[0].file!)
      uploadImage(data)
    }
  })
}
</script>

<style lang="scss" scoped></style>
