/*
 * @Author: Carlos
 * @Date: 2023-01-26 16:46:13
 * @LastEditTime: 2023-01-31 21:53:45
 * @FilePath: /vue3-cms/src/utils/index.ts
 * @Description: null
 */
import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
export const routeToMenu = (config: RouteRecordRaw): MenuOption => {
  // if (Array.isArray(config)) {
  //   return config.map(c => routeToMenu(c))
  // }
  const option: MenuOption = {}
  option.key = config.name as string
  return option
}

export function resolveStatic(src: string): string {
  return `${location.href}${src}`
}
