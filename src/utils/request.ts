/*
 * @Author: Carlos
 * @Date: 2023-01-27 01:21:36
 * @LastEditTime: 2023-02-02 13:08:11
 * @FilePath: /vue3-cms/src/utils/request.ts
 * @Description: null
 */
import type { RequestResponse, Response } from '@/types'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { ref } from 'vue'

const config = {
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10 * 1000 // request timeout，10秒
  // transformResponse: [
  //   (data) => {
  // Do whatever you want to transform the data
  //     return JSONbig.parse(data)
  //   }
  // ]
}
// create an axios request
export const instance: AxiosInstance = axios.create(config)

const token = localStorage.getItem('token')
if (token) {
  injectToken(token)
}

// request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // if (config.url === undefined) {
    //   config.url = ''
    // }
    // do something before request is sen

    // const path = config.url.split('?')[0]
    // let search = config.url.split('?')[1] || ''

    // 添加时间戳
    // search = '?_v=' + Date.now() + (search ? '&' + search : '')
    // config.url = path + search
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: Response) => {
    const res = response.data
    if (!res || !res.code || res.code !== 200) {
      return Promise.reject(res)
    }
    return Promise.resolve(response)
  },
  error => {
    // console.dir(error)
    if (axios.isCancel(error)) {
      return Promise.reject({
        code: 10000,
        message: 'Cancel',
        data: null,
        success: false
      })
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        code: 10001,
        message: 'Timeout',
        data: null,
        success: false
      })
    }
    // console.error('error', error)
    return Promise.reject(error?.response?.data || error)
  }
)

export function injectToken(token: string) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

function request<T>(config: AxiosRequestConfig): RequestResponse<T> {
  const cancel = ref<Canceler>()
  return {
    instance: instance({
      ...config,
      cancelToken: new axios.CancelToken(c => {
        cancel.value = c
      })
    }),
    cancel
  }
}
export default request
