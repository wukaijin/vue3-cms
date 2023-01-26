/*
 * @Author: Carlos
 * @Date: 2023-01-26 01:03:30
 * @LastEditTime: 2023-01-26 01:03:42
 * @FilePath: /vue3-cms/shims-vue.d.ts
 * @Description: null
 */
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
