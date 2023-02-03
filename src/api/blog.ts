/*
 * @Author: Carlos
 * @Date: 2023-01-27 01:59:53
 * @LastEditTime: 2023-02-03 11:18:35
 * @FilePath: /vue3-cms/src/api/blog.ts
 * @Description: null
 */
import type { Article, Category, SubmittedCategory, SubmitArticle, Tag } from '@/interface/blog'
import request from '@/utils/request'

const BLOG_PREFIX = '/nest-api/blog/'

export const TagApi = {
  findAll() {
    return request<Tag[]>({ url: `${BLOG_PREFIX}tag`, method: 'GET' })
  },
  findOne(id: Tag['id']) {
    return request<Tag>({ url: `${BLOG_PREFIX}tag/${id}`, method: 'GET' })
  },
  add(data: Partial<Tag>) {
    return request<Tag>({ url: `${BLOG_PREFIX}tag`, data, method: 'POST' })
  },
  edit(id: Tag['id'], data: Partial<Tag>) {
    return request<Tag>({ url: `${BLOG_PREFIX}tag/${id}`, data, method: 'PATCH' })
  },
  delete(id: Tag['id']) {
    return request<Tag>({ url: `${BLOG_PREFIX}tag/${id}`, method: 'DELETE' })
  }
}

export const CategoryApi = {
  findAll() {
    return request<Category[]>({ url: `${BLOG_PREFIX}category`, method: 'GET' })
  },
  findOne(id: Tag['id']) {
    return request<Category>({ url: `${BLOG_PREFIX}category/${id}`, method: 'GET' })
  },
  add(data: Partial<SubmittedCategory>) {
    return request<Category>({ url: `${BLOG_PREFIX}category`, data, method: 'POST' })
  },
  edit(id: Category['id'], data: Partial<SubmittedCategory>) {
    return request<Category>({ url: `${BLOG_PREFIX}category/${id}`, data, method: 'PATCH' })
  },
  delete(id: Category['id']) {
    return request<Category>({ url: `${BLOG_PREFIX}category/${id}`, method: 'DELETE' })
  }
}

export const ArticleApi = {
  findAll(query?: any) {
    return request<Article[]>({ url: `${BLOG_PREFIX}article`, params: query, method: 'GET' })
  },
  findByCategoryId(id: string) {
    return request<Article[]>({
      url: `${BLOG_PREFIX}article/findByCategoryId/${id}`,
      method: 'GET'
    })
  },
  findOne(id: Article['id']) {
    return request<Article>({
      url: `${BLOG_PREFIX}article/${id}`,
      method: 'GET'
    })
  },
  searchByKeyword(keyword: string) {
    return request<Article[]>({
      url: `${BLOG_PREFIX}article/search/${keyword}`,
      method: 'GET'
    })
  },
  findRelativeById(id: Article['id']) {
    return request<Article>({
      url: `${BLOG_PREFIX}article/relative/${id}`,
      method: 'GET'
    })
  },
  add(data: Partial<SubmitArticle>) {
    return request<Article>({ url: `${BLOG_PREFIX}article`, data, method: 'POST' })
  },
  edit(id: Article['id'], data: Partial<SubmitArticle>) {
    return request<Article>({ url: `${BLOG_PREFIX}article/${id}`, data, method: 'PATCH' })
  },
  delete(id: Article['id']) {
    return request<Article>({ url: `${BLOG_PREFIX}article/${id}`, method: 'DELETE' })
  }
}
export default {
  TagApi,
  CategoryApi,
  ArticleApi
}
