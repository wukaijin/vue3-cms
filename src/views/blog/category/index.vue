<!--
 * @Author: Carlos
 * @Date: 2023-01-26 15:51:31
 * @LastEditTime: 2023-02-03 22:58:14
 * @FilePath: /vue3-cms/src/views/blog/category/index.vue
 * @Description: null
-->
<template>
  <n-layout>
    <n-layout-header class="py-4">
      <n-space>
        <n-button type="primary" @click="addCategory">Add</n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <n-data-table
        :loading="loading"
        :columns="columns"
        :data="data || []"
        :pagination="pagination"
        :bordered="false"
      />
    </n-layout-content>
  </n-layout>
  <n-drawer v-model:show="drawerVisible" :width="502" placement="right">
    <n-drawer-content>
      <template #header>{{ operationType }} Category</template>
      <template #default>
        <category-form ref="form" :value="submitData" />
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
import { CategoryApi } from '@/api/blog'
import type { Category, SubmittedCategory } from '@/interface/blog'
import {
  NButton,
  NSpace,
  useMessage,
  useDialog,
  type DataTableColumns,
  type FormInst
} from 'naive-ui'
import CategoryForm from './category-form.vue'
import { useCategoryStore } from '@/stores/category'
import useRequest from '@/hooks/useRequest'

const { fetchCategories: fetchCategoriesInStore } = useCategoryStore()
const message = useMessage()
const dialog = useDialog()

const initData = () => ({
  id: '',
  text: '',
  belongs: '',
  order: 0,
  defaultPoster: '',
  description: ''
})

enum OPERATION_TYPES {
  ADD = 'Add',
  EDIT = 'Edit'
}
const drawerVisible = ref<boolean>(false)
const operationType = ref<OPERATION_TYPES>(OPERATION_TYPES.ADD)
const submitData = reactive<Partial<SubmittedCategory>>(initData())

const { data, run: fetchCategories, loading } = useRequest(CategoryApi.findAll)
const { run: runDeleteCategory } = useRequest(CategoryApi.delete, { manual: true })
const { run: runAddCategory, loading: adding } = useRequest(CategoryApi.add, { manual: true })
const { run: runEditCategory, loading: editing } = useRequest(CategoryApi.edit, { manual: true })

const form = ref<ComponentPublicInstance<typeof CategoryForm>>()

function validate() {
  return (form.value?.formRef as FormInst).validate()
}

function addCategory() {
  Object.assign(submitData, initData())
  fetchCategoriesInStore()
  drawerVisible.value = true
  operationType.value = OPERATION_TYPES.ADD
}
function editCategory(row: Category) {
  Object.assign(submitData, {
    ...row,
    belongs: row.belongs ? row.belongs.id : ''
  })
  fetchCategoriesInStore()
  drawerVisible.value = true
  operationType.value = OPERATION_TYPES.EDIT
}
function deleteCategory(row: Category) {
  dialog.warning({
    title: 'Warning',
    content: `Do you confirm to delete category【${row.text}】`,
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
  if (!copy.belongs) {
    delete copy.belongs
  }
  try {
    await runAddCategory(copy)
    message.success('Added')
    fetchCategories()
    drawerVisible.value = false
  } catch (error: any) {
    message.error(error?.message || 'It seems something wrong.')
  }
}
async function handleEdit() {
  if (!submitData.id) return
  const copy = { ...submitData }
  if (!copy.belongs) {
    delete copy.belongs
  }
  try {
    await runEditCategory(submitData.id, copy)
    message.success('Edited')
    fetchCategories()
    drawerVisible.value = false
  } catch (error: any) {
    message.error(error?.message || 'It seems something wrong.')
  }
}
async function handleDelete(row: Category) {
  try {
    await runDeleteCategory(row.id)
    message.success('Deleted')
    fetchCategories()
  } catch (error: any) {
    message.error(error?.message || 'It seems something wrong.')
  }
}

const createColumns = ({
  edit,
  deleteAction
}: {
  edit: (row: Category) => void
  deleteAction: (row: Category) => void
}): DataTableColumns<Category> => {
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
      title: 'Belongs',
      key: 'belongs',
      render(row) {
        if (!row.belongs) {
          return ''
        }
        return h('span', row.belongs.text)
      }
    },
    {
      title: 'Order',
      key: 'order'
    },
    {
      title: 'Articles',
      key: 'articles',
      render(row) {
        if (!row.articles) {
          return ''
        }
        return h('span', row.articles)
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
  edit(row: Category) {
    editCategory(row)
  },
  deleteAction(row: Category) {
    deleteCategory(row)
  }
})
const pagination = false as const
</script>

<style lang="scss" scoped></style>
