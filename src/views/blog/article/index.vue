<!--
 * @Author: Carlos
 * @Date: 2023-01-26 15:56:01
 * @LastEditTime: 2023-02-02 14:25:52
 * @FilePath: /vue3-cms/src/views/blog/article/index.vue
 * @Description: null
-->
<template>
  <n-layout>
    <n-layout-header class="py-4">
      <n-space>
        <n-button type="primary" @click="addArticle">Add</n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content>
      <n-data-table
        :columns="columns"
        :data="articles"
        :pagination="pagination"
        :bordered="false"
        scroll-x="1200"
      />
    </n-layout-content>
  </n-layout>
  <n-drawer v-model:show="drawerVisible" :width="502" placement="right">
    <n-drawer-content>
      <template #header>{{ operationType }} Article</template>
      <template #default>
        <article-form ref="form" :value="submitData" />
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
import { ArticleApi } from '@/api/blog'
import { ArticleState, type Article, type SubmitArticle } from '@/interface/blog'
import {
  NButton,
  NSpace,
  useMessage,
  useDialog,
  NSwitch,
  type DataTableColumns,
  type FormInst
} from 'naive-ui'
import { useCategoryStore } from '@/stores/category'
import { useTagStore } from '@/stores/tag'
import ArticleForm from './article-form.vue'
import useRequest from '@/hooks/useRequest'

const { fetchCategories: fetchCategoriesInStore } = useCategoryStore()
const { fetchTags: fetchTagsInStore } = useTagStore()

const message = useMessage()
const dialog = useDialog()

const initData = (): Partial<SubmitArticle> => ({
  id: '',
  title: '',
  tags: [],
  category: '',
  description: '',
  poster: '',
  state: ArticleState.PUBLISHED,
  content: ''
})

enum OPERATION_TYPES {
  ADD = 'Add',
  EDIT = 'Edit'
}
const drawerVisible = ref<boolean>(false)
const operationType = ref<OPERATION_TYPES>(OPERATION_TYPES.ADD)
const submitData = reactive<Partial<SubmitArticle>>(initData())

const { data: articles, run: fetchArticles, loading } = useRequest(ArticleApi.findAll)
const { run: runDeleteArticle } = useRequest(ArticleApi.delete, { manual: true })
const { run: runAddArticle, loading: adding } = useRequest(ArticleApi.add, { manual: true })
const { run: runEditArticle, loading: editing } = useRequest(ArticleApi.edit, { manual: true })
const { run: runFetchArticle, loading: loadingDetail } = useRequest(ArticleApi.findOne, {
  manual: true
})

const form = ref<ComponentPublicInstance<typeof ArticleForm>>()

function validate() {
  return (form.value?.formRef as FormInst).validate()
}

function addArticle() {
  Object.assign(submitData, initData())
  fetchCategoriesInStore()
  fetchTagsInStore()
  drawerVisible.value = true
  operationType.value = OPERATION_TYPES.ADD
}
async function editArticle(row: Article) {
  Object.assign(submitData, initData())
  fetchCategoriesInStore()
  fetchTagsInStore()
  drawerVisible.value = true
  operationType.value = OPERATION_TYPES.EDIT
  const detail = await runFetchArticle(row.id)
  Object.assign(submitData, {
    ...detail,
    category: detail.category.id,
    tags: detail.tags ? detail.tags.map(t => t.id) : []
  })
}
function deleteArticle(row: Article) {
  dialog.warning({
    title: 'Warning',
    content: `Do you confirm to delete article${row.title}】`,
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
  if (!copy.category) {
    delete copy.category
  }
  if (!copy.tags) {
    delete copy.tags
  }
  try {
    await runAddArticle(copy)
    message.success('Added')
    fetchArticles()
    drawerVisible.value = false
  } catch (error: any) {
    message.error(error?.message || 'It seems something wrong.')
  }
}
async function handleEdit() {
  if (!submitData.id) return
  const copy = { ...submitData }
  try {
    await runEditArticle(submitData.id, copy)
    message.success('Edited')
    fetchArticles()
    drawerVisible.value = false
  } catch (error: any) {
    message.error(error?.message || 'It seems something wrong.')
  }
}
async function handleDelete(row: Article) {
  try {
    await runDeleteArticle(row.id)
    message.success('Deleted')
    fetchArticles()
  } catch (error: any) {
    message.error(error?.message || 'It seems something wrong.')
  }
}

const createColumns = ({
  edit,
  deleteAction
}: {
  edit: (row: Article) => void
  deleteAction: (row: Article) => void
}): DataTableColumns<Article> => {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Category',
      key: 'category',
      render(row) {
        return h(
          'span',
          {
            class: 'whitespace-nowrap'
          },
          { default: () => row.category?.text }
        )
      }
    },
    {
      title: 'Tag',
      key: 'tags',
      render(row) {
        return h(
          'span',
          {
            class: 'flex items-center'
          },
          {
            default: () =>
              row.tags.map(tag =>
                h(
                  'span',
                  {
                    class:
                      'inline-block mr-2 px-2 py-[2px] rounded-xl text-xs last:mr-0 text-white whitespace-nowrap',
                    style: `background-color: ${tag.color};`
                  },
                  { default: () => tag.text }
                )
              )
          }
        )
      }
    },
    {
      title: 'state',
      key: 'state',
      render(row) {
        return h(NSwitch, {
          size: 'small',
          value: !!row.state
        })
      }
    },
    {
      title: 'Action',
      key: 'actions',
      fixed: 'right',
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
  edit(row: Article) {
    editArticle(row)
  },
  deleteAction(row: Article) {
    deleteArticle(row)
  }
})
const pagination = false as const
</script>

<style lang="scss" scoped></style>
