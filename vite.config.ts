/*
 * @Author: Carlos
 * @Date: 2023-01-26 00:52:36
 * @LastEditTime: 2024-10-05 21:55:32
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
        target: 'http://124.221.48.165',
        changeOrigin: true
        // rewrite: path => path.replace(/^\/music-api/, '')
      },
      '/nest-api': {
        target: 'http://124.221.48.165',
        // target: 'http://localhost:3001',
        changeOrigin: true
        // rewrite: path => path.replace(/^\/music-api/, '')
      }
    }
  }
})
