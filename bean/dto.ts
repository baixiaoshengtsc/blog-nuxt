import { BasicObject } from "./base"

export interface LoginDTO extends BasicObject {
  account: string,
  password: string,
  captcha: string,
}

export interface ArticleDTO extends BasicObject {
  current: number,
  size: number
}