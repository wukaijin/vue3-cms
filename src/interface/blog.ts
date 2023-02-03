/*
 * @Author: Carlos
 * @Date: 2023-01-27 02:01:49
 * @LastEditTime: 2023-02-03 22:57:27
 * @FilePath: /vue3-cms/src/interface/blog.ts
 * @Description: null
 */
export enum ArticleState {
  UN_PUBLISHED,
  PUBLISHED
}

export interface Tag {
  id: string
  text: string
  color: string
}

export interface Category {
  id: string
  text: string
  order: number
  description: string
  belongs: Category | null
  defaultPoster: string
  articles: number
}

export interface SubmittedCategory {
  id: string
  text: string
  order: number
  description: string
  belongs: string
  defaultPoster: string
}

export interface Article {
  id: string
  title: string
  tags: Tag[]
  category: Category
  state: ArticleState
  content: string
  description: string
  poster?: string
}

export type SubmitArticle = Omit<Article, 'tags' | 'category'> & {
  tags: string[]
  category: string
}
