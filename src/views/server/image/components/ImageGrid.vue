<!--
 * @Author: Carlos
 * @Date: 2024-10-05 22:28:10
 * @LastEditTime: 2024-10-06 21:10:03
 * @FilePath: /vue3-cms/src/views/server/image/components/ImageGrid.vue
 * @Description: null
-->
<template>
  <div class="flex-1">
    <div class="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-700 h-[34px] leading-[34px]">Images</h3>
      <n-space>
        <n-button type="primary" @click="$emit('upload')" class="px-4">
          <template #icon>
            <n-icon><CloudUpload /></n-icon>
          </template>
          Upload Image
        </n-button>
        <n-button type="primary" @click="$emit('add-folder')" class="px-4">
          <template #icon>
            <n-icon><Add /></n-icon>
          </template>
          Add Folder
        </n-button>
        <n-button
          v-if="deleteButtonVisible"
          type="error"
          @click="$emit('delete-folder')"
          class="px-4"
        >
          <template #icon>
            <n-icon><Trash /></n-icon>
          </template>
          Delete Folder
        </n-button>
      </n-space>
    </div>
    <n-scrollbar class="h-[calc(100vh-180px)]">
      <div v-if="loading" class="flex items-center justify-center h-full p-6">
        <div class="flex flex-col items-center">
          <n-spin size="large" />
          <span class="text-lg font-semibold text-gray-700">Loading...</span>
        </div>
      </div>
      <div v-else class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="img in images"
          :key="img.key"
          class="group relative aspect-square bg-cover bg-center bg-no-repeat bg-white flex flex-col justify-end rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          :style="{ backgroundImage: `url('${resolveStatic(`static-api/${img.key}`)}')` }"
        >
          <div class="p-3 bg-gray-800 bg-opacity-40">
            <span class="text-md font-medium text-white">{{ img.label }}</span>
          </div>
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <n-button type="primary" size="small" class="mr-2" @click="$emit('view', img)">
              <template #icon>
                <n-icon><Eye /></n-icon>
              </template>
              View
            </n-button>
            <n-button type="error" size="small" @click="$emit('delete', img)">
              <template #icon>
                <n-icon><Trash /></n-icon>
              </template>
              Delete
            </n-button>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { NButton, NSpace, NImage, NScrollbar, NSpin, NIcon, type TreeOption } from 'naive-ui'
import { CloudUpload, Add, Trash, Eye } from '@vicons/ionicons5'
import { resolveStatic } from '@/utils'

defineProps<{
  images: TreeOption[]
  loading: boolean
  deleteButtonVisible: boolean
}>()

defineEmits<{
  (e: 'view', img: TreeOption): void
  (e: 'delete', img: TreeOption): void
  (e: 'upload'): void
  (e: 'add-folder'): void
  (e: 'delete-folder'): void
}>()
</script>
