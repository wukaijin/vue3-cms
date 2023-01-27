<!--
 * @Author: Carlos
 * @Date: 2023-01-26 15:55:36
 * @LastEditTime: 2023-01-28 02:27:59
 * @FilePath: /vue3-cms/src/views/blog/tag/index.vue
 * @Description: null
-->
<template>
  <n-layout>
    <n-layout-header class="py-4">
      <n-space>
        <n-button type="primary" @click="addTag">Add</n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <n-data-table :columns="columns" :data="tags" :pagination="pagination" :bordered="false" />
    </n-layout-content>
  </n-layout>
  <n-drawer v-model:show="drawerVisible" :width="502" placement="right">
    <n-drawer-content>
      <template #header>{{ operationType }} Tag</template>
      <template #default>
        <tag-form ref="form" :value="submitData" />
      </template>
      <template #footer>
        <n-button type="primary" :loading="adding || editing" @click="handleAction">{{
          operationType
        }}</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { h, ref, reactive } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { TagApi } from '@/api/blog'
import type { Tag } from '@/interface/blog'
import {
  NButton,
  NSpace,
  useMessage,
  useDialog,
  type DataTableColumns,
  type FormInst
} from 'naive-ui'
import useRequest from '@/hooks/useRequest'
import TagForm from './tag-form.vue'

const message = useMessage()
const dialog = useDialog()

const initData = () => ({
  id: '',
  text: '',
  color: '#000000'
})

enum OPERATION_TYPES {
  ADD = 'Add',
  EDIT = 'Edit'
}
const drawerVisible = ref<boolean>(false)
const operationType = ref<OPERATION_TYPES>(OPERATION_TYPES.ADD)
const submitData = reactive<Partial<Tag>>(initData())

const { data: tags, run: fetchTags } = useRequest(TagApi.findAll)
const { run: runDeleteTag } = useRequest(TagApi.delete, { manual: true })
const { run: runAddTag, loading: adding } = useRequest(TagApi.add, { manual: true })
const { run: runEditTag, loading: editing } = useRequest(TagApi.edit, { manual: true })

const form = ref<ComponentPublicInstance<typeof TagForm>>()

function validate() {
  return (form.value?.formRef as FormInst).validate()
}

function addTag() {
  Object.assign(submitData, initData())
  drawerVisible.value = true
  operationType.value = OPERATION_TYPES.ADD
}
function editTag(row: Tag) {
  Object.assign(submitData, {
    ...row
  })
  drawerVisible.value = true
  operationType.value = OPERATION_TYPES.EDIT
}
function deleteTag(row: Tag) {
  dialog.warning({
    title: 'Warning',
    content: `Do you confirm to delete tag【${row.text}】`,
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      handleDelete(row)
    },
    onNegativeClick: () => {}
  })
}

async function handleAction() {
  try {
    await validate()
    if (operationType.value === OPERATION_TYPES.ADD) return handleAdd()
    handleEdit()
  } catch (error) {
    console.error(error)
  }
}
async function handleAdd() {
  const copy = { ...submitData }
  delete copy.id
  try {
    await runAddTag(copy)
    message.success('Added')
    fetchTags()
    drawerVisible.value = false
  } catch (error) {
    message.error('It seems something wrong.')
  }
}
async function handleEdit() {
  if (!submitData.id) return
  const copy = { ...submitData }
  try {
    await runEditTag(submitData.id, copy)
    message.success('Edited')
    fetchTags()
    drawerVisible.value = false
  } catch (error) {
    message.error('It seems something wrong.')
  }
}
async function handleDelete(row: Tag) {
  try {
    await runDeleteTag(row.id)
    message.success('Deleted')
    fetchTags()
  } catch (error) {
    message.error('It seems something wrong.')
  }
}

const createColumns = ({
  edit,
  deleteAction
}: {
  edit: (row: Tag) => void
  deleteAction: (row: Tag) => void
}): DataTableColumns<Tag> => {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Text',
      key: 'text'
    },
    {
      title: 'Color',
      key: 'color',
      render(row) {
        return h(
          'span',
          {
            class: 'flex items-center'
          },
          {
            default: () => [
              h('span', {
                class: 'w-4 h-4 inline-block mr-2',
                style: `background-color: ${row.color};`
              }),
              h('span', {}, { default: () => row.color })
            ]
          }
        )
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NSpace,
          {},
          {
            default: () => [
              h(
                NButton,
                {
                  strong: true,
                  type: 'primary',
                  tertiary: true,
                  size: 'small',
                  onClick: () => edit(row)
                },
                { default: () => 'Edit' }
              ),
              h(
                NButton,
                {
                  strong: true,
                  type: 'error',
                  tertiary: true,
                  size: 'small',
                  onClick: () => deleteAction(row)
                },
                { default: () => 'Delete' }
              )
            ]
          }
        )
      }
    }
  ]
}
const columns = createColumns({
  edit(row: Tag) {
    editTag(row)
  },
  deleteAction(row: Tag) {
    deleteTag(row)
  }
})
const pagination = false as const
</script>

<style lang="scss" scoped></style>
