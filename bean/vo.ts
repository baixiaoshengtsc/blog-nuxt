import { BasicObject } from "./base"

export interface BasicVO extends BasicObject {
  id?: number | string
}
export interface LoginVO extends BasicObject {
  account: string,
  token: string
} 
export interface ArticleVO extends BasicVO {
  id: number | string
  article_name?: string
  poster?: string
  read_num?: number
  summary?: string
  create_time?: string
  update_time?: string
  author? : string
  categoryIDs?: string
  categoryNames? : string
  tagIDs?: string
  tagNames? : string
}