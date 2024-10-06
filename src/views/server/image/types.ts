import type { UploadFileInfo } from 'naive-ui'

export type ModalType = 'add' | 'upload' | 'rename'

export interface ImageModel {
  name: string
  path: string
  fileList: UploadFileInfo[]
}

export interface RenameModel {
  name: string
  path: string
}
