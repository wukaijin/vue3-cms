<!--
 * @Author: Carlos
 * @Date: 2024-10-05 22:27:57
 * @LastEditTime: 2024-10-06 17:06:33
 * @FilePath: /vue3-cms/src/views/server/image/components/FolderTree.vue
 * @Description: null
-->
<template>
  <div class="w-[250px] border-r border-gray-200">
    <div class="p-4 bg-gray-50 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-700 h-[34px] leading-[34px]">Folders</h3>
    </div>
    <n-scrollbar class="h-[calc(100vh-180px)]">
      <n-tree
        block-line
        :data="computedTree"
        selectable
        :selected-keys="selected"
        @update:selected-keys="$emit('select', $event)"
        class="p-2"
      />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { NScrollbar, NTree, NIcon, type TreeOption } from 'naive-ui'
import { h, computed } from 'vue'
import { Pencil } from '@vicons/ionicons5'

const props = defineProps<{
  folders: TreeOption[]
  selected: string[]
}>()

const emit = defineEmits<{
  (e: 'select', keys: string[]): void
  (e: 'rename', folder: TreeOption): void
}>()

function attachActions(tree: TreeOption[]) {
  if (!tree) return []
  return tree.map(tree => {
    const attached = {
      ...tree,
      suffix: () =>
        h(NIcon, {
          component: Pencil,
          class: 'text-[#818CF8FF] hover:text-red-400',
          onclick: () => emit('rename', attached)
        })
    }
    if (attached.children && attached.children.length) {
      attached.children = attachActions(attached.children)
    }
    return attached
  })
}
const computedTree = computed(() => attachActions(props.folders))
</script>
