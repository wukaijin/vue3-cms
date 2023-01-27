/*
 * @Author: Carlos
 * @Date: 2023-01-27 21:16:32
 * @LastEditTime: 2023-01-27 23:08:10
 * @FilePath: /vue3-cms/src/types/index.ts
 * @Description: null
 */
import type { AxiosResponse, Canceler } from 'axios'
import type { Ref } from 'vue'
export interface ResponseWrapper<T = any> {
  message: string
  success: boolean
  code: number
  data: T
}

export type Response<T = any> = AxiosResponse<ResponseWrapper<T>>

export interface RequestResponse<T> {
  instance: Promise<Response<T>>
  cancel: Ref<Canceler | undefined>
}

export type Service<T, P extends any[]> = (...args: P) => RequestResponse<T>
