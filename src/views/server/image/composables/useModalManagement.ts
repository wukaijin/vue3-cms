import { ref, computed } from 'vue'
import type { FormRules, TreeOption, UploadFileInfo } from 'naive-ui'
import { resolveStatic } from '@/utils'
import type { ModalType, ImageModel, RenameModel } from '../types'

export function useModalManagement() {
  const addVisible = ref(false)
  const uploadVisible = ref(false)
  const renameVisible = ref(false)

  const updateAddVisible = (visible: boolean) => {
    addVisible.value = visible
  }
  const updateUploadVisible = (visible: boolean) => {
    uploadVisible.value = visible
  }
  const updateRenameVisible = (visible: boolean) => {
    renameVisible.value = visible
  }

  const rules: FormRules = {
    name: [{ required: true }]
  }

  const imageRules: FormRules = {
    path: [{ required: true }]
  }

  const viewImageModalVisible = ref(false)
  const viewImageSrc = ref('')

  const addAction = () => {
    addVisible.value = true
  }

  const uploadAction = () => {
    uploadVisible.value = true
  }

  const renameAction = () => {
    renameVisible.value = true
  }

  const cancelAction = () => {
    addVisible.value = false
    uploadVisible.value = false
    renameVisible.value = false
  }

  const handleViewImage = (img: { key: string }) => {
    viewImageSrc.value = resolveStatic(`static-api/${img.key}`)
    viewImageModalVisible.value = true
  }

  return {
    addVisible,
    uploadVisible,
    renameVisible,
    rules,
    imageRules,
    viewImageModalVisible,
    viewImageSrc,
    updateAddVisible,
    updateUploadVisible,
    updateRenameVisible,
    addAction,
    uploadAction,
    renameAction,
    cancelAction,
    handleViewImage
  }
}
