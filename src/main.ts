/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-01-31 23:22:18
 * @FilePath: /vue3-cms/src/main.ts
 * @Description: null
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import setUpNaive from './plugins/naive'

import App from './App.vue'
import router from './router'
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import './main.scss'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)
setUpNaive(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
