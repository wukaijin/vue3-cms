/*
 * @Author: Carlos
 * @Date: 2023-04-28 22:00:50
 * @LastEditTime: 2023-05-01 21:58:14
 * @FilePath: /vue3-cms/src/api/server.ts
 * @Description: null
 */
import request from '@/utils/request'
import type { TreeOption } from 'naive-ui'

const SERVER_PREFIX = '/nest-api/oss/'

export const ImageApi = {
  fetchImageFolders() {
    return request<TreeOption[]>({ url: `${SERVER_PREFIX}image/folders`, method: 'GET' })
  },
  fetchImages(path: string) {
    return request<TreeOption[]>({ url: `${SERVER_PREFIX}image/get?path=${path}`, method: 'GET' })
  },
  addFolder(path: string) {
    return request<boolean>({ url: `${SERVER_PREFIX}image/folder`, method: 'PUT', data: { path } })
  },
  deleteFolder(path: string) {
    return request<boolean>({
      url: `${SERVER_PREFIX}image/folder`,
      method: 'DELETE',
      data: { path }
    })
  }
}

export default {
  ImageApi
}
