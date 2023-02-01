<!--
 * @Author: Carlos
 * @Date: 2023-01-31 22:59:02
 * @LastEditTime: 2023-02-01 10:45:30
 * @FilePath: /vue3-cms/src/views/login/index.vue
 * @Description: null
-->
<template>
  <div class="flex h-[100vh] bg-spectrum-light items-center justify-center">
    <div class="pb-[10%]">
      <div class="rounded-3xl shadow-xl bg-gray-100/30 backdrop-blur-sm flex px-4 py-12">
        <div class="flex items-center">
          <div class="pr-4 flex items-center">
            <img
              class="h-[200px]"
              :src="resolveStatic('static-api/login/undraw_login.svg')"
              alt=""
            />
          </div>
          <div class="pr-4">
            <div class="pb-4 flex items-center justify-center">
              <div class="inline-block w-10 h-10 mr-2 relative">
                <span class="logo-eye-back"></span>
                <img :src="resolveStatic('static-api/logo/transformer-256.png')" alt="" />
              </div>
              <span class="font-blog">
                <span class="text-4xl mr-2">Carlos</span>
                <span class="text-md">CMS</span>
              </span>
            </div>
            <div class="px-8 w-72">
              <login-form />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/form/login-form.vue'
import { resolveStatic } from '@/utils'
</script>

<style scoped></style>
