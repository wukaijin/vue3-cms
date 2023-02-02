/*
 * @Author: Carlos
 * @Date: 2023-02-01 15:58:00
 * @LastEditTime: 2023-02-01 22:16:39
 * @FilePath: /vue3-cms/src/api/user.ts
 * @Description: null
 */
import type { User } from '@/interface/user'
import request from '@/utils/request'

const USER_PREFIX = '/nest-api/user/'

export const userApi = {
  login(data: Partial<User>) {
    return request<{ token: string }>({ url: `${USER_PREFIX}/login`, data, method: 'POST' })
  }
}
