import { BasicObject } from "./base"

export interface BasicVO extends BasicObject {
  id?: number
}
export interface LoginVO extends BasicObject {
  account: string,
  token: string
} 
export interface ArticleVO extends BasicVO {
  title: string,
  summary: string,
  total: number
}