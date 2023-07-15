import { BasicObject } from "./base"

export interface LoginDTO extends BasicObject {
  account: string,
  password: string,
  captcha: string,
}