<template>
  <n-image
    :src="src"
    object-fit="contain"
    :img-props="{ style: 'max-height: 70vh; width: 100%;' }"
  />
</template>

<script setup lang="ts">
import { NCard, NImage } from 'naive-ui'

defineProps<{
  visible: boolean
  src: string
}>()

defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
</script>
