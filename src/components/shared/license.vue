<!--
 * @Author: Carlos
 * @Date: 2023-02-02 17:34:47
 * @LastEditTime: 2023-02-02 17:38:05
 * @FilePath: /vue3-cms/src/components/shared/license.vue
 * @Description: null
-->
<template>
  <div class="p-4 bg-gray-800 text-gray-400 text-sm flex items-center justify-center">
    <div className="flex items-center justify-center">
      <span className="mr-2">©2023 Carlos</span>
    </div>
    <div>
      <div class="inline-block w-10 h-10 mr-2 relative">
        <span class="logo-eye-back"></span>
        <img :src="resolveStatic('static-api/logo/transformer-256.png')" alt="" />
      </div>
    </div>
    <div className="">
      <div className="flex items-center justify-center">
        <span>
          <a href="https://beian.miit.gov.cn/">粤ICP备2023006294号</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveStatic } from '@/utils'
</script>

<style scoped></style>
