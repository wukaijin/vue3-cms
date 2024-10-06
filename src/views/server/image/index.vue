<!--
 * @Author: Carlos
 * @Date: 2023-04-27 21:12:41
 * @LastEditTime: 2024-10-06 17:35:39
 * @FilePath: /vue3-cms/src/views/server/image/index.vue
 * @Description: null
-->
<template>
  <n-layout class="min-h-screen bg-gray-50">
    <n-layout-header class="py-6 px-8 bg-white shadow-sm">
      <h2 class="text-2xl font-bold text-gray-800">Image Management</h2>
    </n-layout-header>
    <n-layout-content class="p-8">
      <div class="flex bg-white rounded-lg shadow-md overflow-hidden">
        <FolderTree
          :folders="folders ?? []"
          :selected="selected ?? []"
          @select="onSelect"
          @rename="renameFolder"
        />
        <ImageGrid
          :images="images ?? []"
          :loading="loading"
          @view="handleViewImage"
          @delete="handleDeleteImage"
          @upload="uploadAction"
          @add-folder="addAction"
          @delete-folder="handleDelete"
          :delete-button-visible="deleteButtonVisible"
        />
      </div>

      <AddFolderModal
        :visible="addVisible"
        @update:visible="updateAddVisible"
        :selected="selected ?? ''"
        :folders="folders ?? []"
        :rules="rules"
        @add="handleAddFolder"
      />
      <UploadImageModal
        :visible="uploadVisible"
        @update:visible="updateUploadVisible"
        :rules="imageRules"
        :selected="selected ?? ''"
        :folders="folders ?? []"
        @upload="handleUpload"
      />
      <RenameModal
        :visible="renameVisible"
        @update:visible="updateRenameVisible"
        :rules="rules"
        :path="renamePath"
        @rename="handleRenameFolder"
      />
      <ViewImageModal :visible="viewImageModalVisible" :src="viewImageSrc" />
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutHeader, NLayoutContent, type TreeOption } from 'naive-ui'
import FolderTree from './components/FolderTree.vue'
import ImageGrid from './components/ImageGrid.vue'
import AddFolderModal from './components/AddFolderModal.vue'
import UploadImageModal from './components/UploadImageModal.vue'
import RenameModal from './components/RenameModal.vue'
import ViewImageModal from './components/ViewImageModal.vue'
import { useImageManagement } from './composables/useImageManagement'
import { useModalManagement } from './composables/useModalManagement'
import type { RenameModel } from './types'

const {
  folders,
  images,
  selected,
  loading,
  deleteButtonVisible,
  onSelect,
  handleViewImage,
  handleDeleteImage,
  handleDelete,
  handleAdd,
  handleUpload,
  handleRename
} = useImageManagement()

const {
  addVisible,
  uploadVisible,
  renameVisible,
  updateAddVisible,
  updateUploadVisible,
  updateRenameVisible,
  rules,
  imageRules,
  viewImageModalVisible,
  viewImageSrc,
  addAction,
  uploadAction,
  renameAction
} = useModalManagement()

const handleAddFolder = (entireURI: string) => {
  handleAdd(entireURI).then(() => {
    updateAddVisible(false)
  })
}

const renamePath = ref('')

const renameFolder = (folder: TreeOption) => {
  renamePath.value = folder.key as string
  renameAction()
}

const handleRenameFolder = (data: RenameModel) => {
  handleRename(data).then(() => {
    updateRenameVisible(false)
  })
}
</script>

<style lang="scss" scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
}

.n-tree :deep(.n-tree-node-wrapper) {
  padding: 4px 0;
}

.n-tree :deep(.n-tree-node-content) {
  padding: 0 4px;
  border-radius: 4px;
  transition: all 0.3s;
}

.n-tree :deep(.n-tree-node-content:hover) {
  background-color: rgba(0, 0, 0, 0.05);
}

.n-tree :deep(.n-tree-node-content.n-tree-node-selected) {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
