/*
 * @Author: Carlos
 * @Date: 2023-04-28 22:00:50
 * @LastEditTime: 2024-10-05 22:21:44
 * @FilePath: /vue3-cms/src/api/oss.ts
 * @Description: null
 */
import request from '@/utils/request'
import type { TreeOption } from 'naive-ui'

const SERVER_PREFIX = '/nest-api/oss/'

export const ImageApi = {
  fetchImageFolders() {
    return request<TreeOption[]>({ url: `${SERVER_PREFIX}folder`, method: 'GET' })
  },
  fetchImages(path: string) {
    return request<TreeOption[]>({ url: `${SERVER_PREFIX}image/get?path=${path}`, method: 'GET' })
  },
  addFolder(path: string) {
    return request<boolean>({ url: `${SERVER_PREFIX}folder`, method: 'POST', data: { path } })
  },
  renameFolder(path: string, name: string) {
    return request<boolean>({ url: `${SERVER_PREFIX}folder`, method: 'PUT', data: { path, name } })
  },
  deleteFolder(path: string) {
    return request<boolean>({
      url: `${SERVER_PREFIX}folder`,
      method: 'DELETE',
      data: { path }
    })
  },
  uploadImage(data: FormData) {
    return request<boolean>({
      url: `${SERVER_PREFIX}image/upload`,
      method: 'POST',
      data
    })
  },
  deleteImage(key: string) {
    return request<boolean>({
      url: `${SERVER_PREFIX}image`,
      method: 'DELETE',
      data: { key }
    })
  }
}

export default {
  ImageApi
}
