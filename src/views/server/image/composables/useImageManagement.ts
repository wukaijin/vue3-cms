/*
 * @Author: Carlos
 * @Date: 2024-10-05 22:25:15
 * @LastEditTime: 2024-10-06 16:52:04
 * @FilePath: /vue3-cms/src/views/server/image/composables/useImageManagement.ts
 * @Description: null
 */
import { ref, computed } from 'vue'
import { useDialog, useMessage, type TreeOption } from 'naive-ui'
import { ImageApi } from '@/api/oss'
import useRequest from '@/hooks/useRequest'
import type { RenameModel } from '../types'

export function useImageManagement() {
  const dialog = useDialog()
  const message = useMessage()

  const { data: folders, run: fetchFolders } = useRequest(ImageApi.fetchImageFolders)
  const { run: addFolder } = useRequest(ImageApi.addFolder, { manual: true })
  const { run: deleteFolder } = useRequest(ImageApi.deleteFolder, { manual: true })
  const { run: renameFolder } = useRequest(ImageApi.renameFolder, { manual: true })
  const { run: deleteImage } = useRequest(ImageApi.deleteImage, { manual: true })

  const {
    data: images,
    run: fetchImages,
    loading
  } = useRequest(ImageApi.fetchImages, { manual: true })

  const { run: uploadImage } = useRequest(ImageApi.uploadImage, { manual: true })
  const selected = ref<string[]>([])

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

  const handleDelete = () => {
    dialog.warning({
      title: 'Warning',
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

  const handleAdd = async (entireURI: string) => {
    return addFolder(entireURI).then(() => {
      message.success('ok')
      fetchFolders()
    })
  }

  const handleRename = async (data: RenameModel) => {
    return renameFolder(data.path, data.name).then(() => {
      message.success('ok')
      fetchFolders()
    })
  }

  const handleUpload = async (data: FormData) => {
    return uploadImage(data).then(() => {
      message.success('ok')
      fetchImages(data.get('path') as string)
    })
  }

  const handleViewImage = (img: TreeOption) => {
    // Implementation will be in useModalManagement
  }

  const handleDeleteImage = (img: TreeOption) => {
    dialog.warning({
      title: 'Warning',
      content: `Do you want to delete the image "${img.label}"?`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        deleteImage(img.key as string)
          .then(() => {
            message.success('Image deleted successfully')
            fetchImages(selected.value![0])
          })
          .catch(err => {
            message.error(err.message || 'Failed to delete image')
          })
      }
    })
  }

  return {
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
  }
}
