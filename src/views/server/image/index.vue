<!--
 * @Author: Carlos
 * @Date: 2023-04-27 21:12:41
 * @LastEditTime: 2023-05-01 22:12:48
 * @FilePath: /vue3-cms/src/views/server/image/index.vue
 * @Description: null
-->
<template>
  <n-layout>
    <n-layout-header class="py-4">
      <n-space>
        <n-button type="primary">Upload</n-button>
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
          <div class="">
            <n-space>
              <n-button type="primary" @click="addAction">Add</n-button>
              <n-button v-if="deleteButtonVisible" type="error" @click="handleDelete"
                >Delete</n-button
              >
            </n-space>
          </div>
          <div class="grid grid-flow-col grid-cols-3 gap-4">
            <div class="" v-for="img of images" :key="img.key">
              <div class="shadow-lg">
                <n-image
                  style="vertical-align: bottom"
                  :src="resolveStatic(`static-api/${img.key}`)"
                />
              </div>
              <div class="mt-2">
                <span>{{ img.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </n-layout-content>
  </n-layout>
  <n-modal v-model:show="modalVisible">
    <n-card
      style="width: 600px"
      title="New Folder"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="addFormRef" :model="model" :show-label="false" :rules="rules">
        <n-form-item label="path" path="path">
          <!-- <n-input placeholder="path" v-model:value="model.path">
            <template #prefix>
              <n-icon :component="ShareSocial" />
            </template>
          </n-input> -->
          <n-cascader
            v-model:value="model.path"
            placeholder="path"
            expand-trigger="click"
            :options="folders"
            :multiple="false"
            :show-path="true"
          >
            <!-- <template #prefix> <n-icon :component="ShareSocial" /> </template> -->
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
          <n-button @click="modalVisible = false">Cancel</n-button>
          <n-button type="primary" @click="handleAdd">Add</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
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
  type FormInst
} from 'naive-ui'
import type { FormRules } from 'naive-ui'
import { Folder, ShareSocial } from '@vicons/ionicons5'
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

const addFormRef = ref<FormInst | null>(null)

const selected = ref<string[]>()
const modalVisible = ref<boolean>(false)
const model = ref<{ name: string; path: string }>({
  name: '',
  path: ''
})
const rules: FormRules = {
  name: [{ required: true }]
}
const deleteButtonVisible = computed(() => {
  console.log('deleteButtonVisible', !selected.value || selected.value.length, loading.value)
  if (!selected.value || !selected.value.length) return false
  if (loading.value) return false
  console.log(images && images.value && images.value.length)
  if (images && images.value && images.value.length) return false
  return true
})
const onSelect = (s: string[]) => {
  selected.value = s
  if (!s.length) return
  fetchImages(s[0])
}
const addAction = () => {
  // handleAdd()
  modalVisible.value = true
  model.value = {
    name: '',
    path: (selected.value ? selected.value[0] : '') || ''
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
      message.success('验证成功')
      const { name, path } = model.value
      addFolder(path ? `${path}/${name}` : name).then(res => {
        modalVisible.value = false
        fetchFolders()
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
