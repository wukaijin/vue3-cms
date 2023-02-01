<!--
 * @Author: Carlos
 * @Date: 2023-01-31 23:53:54
 * @LastEditTime: 2023-02-01 10:47:46
 * @FilePath: /vue3-cms/src/components/form/login-form.vue
 * @Description: null
-->
<template>
  <n-form :show-label="false">
    <n-form-item label="name">
      <n-input placeholder="name">
        <template #prefix>
          <n-icon :component="Person" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="password">
      <n-input type="password" show-password-on="mousedown" placeholder="password">
        <template #prefix>
          <n-icon :component="LockClosed" />
        </template>
      </n-input>
    </n-form-item>
    <div class="flex justify-end">
      <n-space>
        <button class="leading-[34px] hover:underline active:text-indigo-500">Anonymous</button>
        <n-button type="primary">Sign in</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { Person, LockClosed } from '@vicons/ionicons5'
</script>

<style scoped></style>
