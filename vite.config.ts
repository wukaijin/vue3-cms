/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2023-08-23 10:53:18
 * @FilePath: /vue3-cms/vite.config.ts
 * @Description: null
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5174,
    proxy: {
      '/static-api': {
        target: 'http://106.55.147.116',
        changeOrigin: true
        // rewrite: path => path.replace(/^\/music-api/, '')
      },
      '/nest-api': {
        target: 'http://106.55.147.116',
        // target: 'http://localhost:3001',
        changeOrigin: true
        // rewrite: path => path.replace(/^\/music-api/, '')
      }
    }
  }
})
