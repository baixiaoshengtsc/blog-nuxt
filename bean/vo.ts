import { BasicObject } from "./base"

export interface BasicVO extends BasicObject {
  id?: number
}
export interface ArticleVO extends BasicVO {
  title: string,
  summary: string,
  total: number
}