<!--
 * @Author: Carlos
 * @Date: 2023-01-31 23:26:59
 * @LastEditTime: 2023-01-31 23:36:12
 * @FilePath: /vue3-cms/src/views/NotFound.vue
 * @Description: null
-->
<template>
  <div class="flex h-[100vh] items-center justify-center">
    <div class="pb-32">
      <n-card>
        <n-result status="404" title="404 Not Found" description="Something seems wrong.">
          <template #footer>
            <n-button type="primary">Return</n-button>
          </template>
        </n-result>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
