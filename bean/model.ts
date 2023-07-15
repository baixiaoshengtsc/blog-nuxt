import { BasicType, BasicObject, BasicObjectData } from "./base"
import { BasicVO, ArticleVO } from "./vo"
import { _AsyncData } from "nuxt/dist/app/composables/asyncData"
export interface BasicModel<T = unknown> extends BasicObject {
  status?: 0 | -1 | 401,
  statusText?: string,
  data?: T | T[]
}
export interface BasicErrorModel extends BasicModel {
  status?: -1,
  statusText?: string,
  data?: null
}
export interface BasicListModel<T extends BasicVO> extends BasicModel {
  data?: {
    list: T [],
    total: number
  }
}
export interface BasicPlainModel<T extends BasicType> extends BasicModel {
  data?: T | null
}
export interface BasicObjectModel<T extends BasicVO> extends BasicModel {
  data?: T | null
}

export type DataT<T extends BasicModel> = Promise<_AsyncData<T | BasicErrorModel | null, any | null>>

const data2:BasicObjectModel<BasicVO> = {
  status: -1,
  statusText: 'TEST',
  data: {
    id: 102
  }
}

const data3:BasicModel<BasicObjectData<BasicVO[]>> = {
  status:0,
  statusText: 'Test',
  data: {
    list: [
      {
        id: 100
      }
    ],
    total: 1
  }
}

const data4: BasicVO [] = 
  [
    {
      id: 100
    }
  ] 

const data5: BasicObjectData<BasicVO []> = {
  list: [
    {
      id: 100
    }
  ],
  total: 100
}

const data6:BasicListModel<ArticleVO> = {
  status: 0,
  statusText: 'Test',
  data: {
    list: [
      {
        id:100,
        title: 'test',
        summary: 'test',
        total: 100
      }
    ],
    total: 1000
  }
}