<!--
 * @Author: Carlos
 * @Date: 2023-02-01 22:27:03
 * @LastEditTime: 2023-02-01 22:40:30
 * @FilePath: /vue3-cms/src/components/shared/layout/user-action.vue
 * @Description: null
-->
<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <div class="flex items-center px-4 cursor-pointer">
      <n-icon-wrapper class="mr-2" :size="28" :border-radius="14">
        <n-icon size="20" color="primary" :component="Person" />
      </n-icon-wrapper>
      <span>Carlos</span>
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { Person } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

const router = useRouter()

const options: DropdownMixedOption[] = [
  {
    label: 'Sign out',
    key: 'sign-out'
  }
]

const handleSelect = (key: string) => {
  if (key === 'sign-out') {
    localStorage.removeItem('token')
    router.push('/login')
  }
}
</script>

<style scoped></style>
