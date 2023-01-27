/*
 * @Author: Carlos
 * @Date: 2023-01-27 00:33:58
 * @LastEditTime: 2023-01-28 03:18:15
 * @FilePath: /vue3-cms/src/plugins/naive.ts
 * @Description: null
 */
import type { App } from 'vue'
import {
  create,
  NButton,
  NIcon,
  NInput,
  NInputNumber,
  NMenu,
  NLayout,
  NDataTable,
  NSpace,
  NLayoutContent,
  NLayoutHeader,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NSelect,
  NSwitch
} from 'naive-ui'

const naive = create({
  components: [
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NIcon,
    NSpace,
    NButton,
    NMenu,
    NInput,
    NInputNumber,
    NDataTable,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NSelect,
    NSwitch
  ]
})

const setUpNaive = function (app: App) {
  app.use(naive)
}
export default setUpNaive
