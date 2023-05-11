/*
 * @Author: Carlos
 * @Date: 2023-04-28 22:00:50
 * @LastEditTime: 2023-05-03 19:41:43
 * @FilePath: /vue3-cms/src/api/server.ts
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
  }
}

export default {
  ImageApi
}
