<!--
 * @Author: Carlos
 * @Date: 2023-04-27 21:12:41
 * @LastEditTime: 2023-05-03 20:50:01
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
            :data="computedTree"
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
          :title="modalProps.title"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <div>
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
            <n-form
              v-show="modalType === 'rename'"
              ref="renameFormRef"
              :model="renameModel"
              :show-label="false"
              :rules="rules"
            >
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
          </div>
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
              >
                Upload
              </n-button>
              <n-button
                v-show="modalType === 'rename'"
                type="primary"
                @click="handleRename"
                :disabled="!renameModel.name"
              >
                Rename
              </n-button>
            </n-space>
          </template>
        </n-card>
      </n-modal>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, h, computed } from 'vue'
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
  NIcon,
  type FormInst,
  type UploadFileInfo,
  type UploadInst,
  type TreeOption
} from 'naive-ui'
import type { FormRules } from 'naive-ui'
import { Folder, Pencil } from '@vicons/ionicons5'
import { ImageApi } from '@/api/server'
import useRequest from '@/hooks/useRequest'
import { resolveStatic } from '@/utils'

const dialog = useDialog()
const message = useMessage()

const modalPropsMap = {
  add: {
    title: 'Add Folder',
    confirmText: 'Add'
  },
  upload: {
    title: 'Upload Image',
    confirmText: 'Upload'
  },
  rename: {
    title: 'Rename',
    confirmText: 'Rename'
  }
}
const { data: folders, run: fetchFolders } = useRequest(ImageApi.fetchImageFolders)
const { run: addFolder } = useRequest(ImageApi.addFolder, { manual: true })
const { run: deleteFolder } = useRequest(ImageApi.deleteFolder, { manual: true })
const { run: renameFolder } = useRequest(ImageApi.renameFolder, { manual: true })

function attachActions(tree: TreeOption[]) {
  if (!tree) return []
  return tree.map(tree => {
    const attached = {
      ...tree,
      suffix: () =>
        h(NIcon, {
          component: Pencil,
          class: 'text-[#818CF8FF] hover:text-red-400',
          onclick: () => renameAction(attached)
        })
    }
    if (attached.children && attached.children.length) {
      attached.children = attachActions(attached.children)
    }
    return attached
  })
}
const computedTree = computed(() => attachActions(folders?.value!))
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
const modalType = ref<keyof typeof modalPropsMap>('upload')
const modalProps = computed(() => modalPropsMap[modalType.value])
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
const renameModel = ref<{ name: string; path: string }>({
  name: '',
  path: ''
})

const imageRules: FormRules = {
  path: [{ required: true }]
}
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
const renameAction = (folder: TreeOption) => {
  console.log(folder)
  renameModel.value.name = ''
  renameModel.value.path = folder.key as string
  modalType.value = 'rename'
  modalVisible.value = true
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
const handleRename = () => {
  renameFolder(renameModel.value.path, renameModel.value.name)
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
