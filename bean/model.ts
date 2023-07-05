import { BasicObject, BasicObjectData } from "./base"
import { BasicDto } from "./dto"
export interface BasicModel<T = unknown> extends BasicObject {
  status: 0 | -1,
  statusText: string,
  data: T | T[]
}
export interface BasicErrorModel extends BasicModel {
  status: -1,
  statusText: string,
  data: null
}
export interface BasicListModel<T extends BasicObjectData<BasicDto>> extends BasicModel {
  data: T | null
}
export interface BasicNumberModel extends BasicModel {
  data: number | null
}
export interface BasicObjectModel<T extends BasicDto> extends BasicModel {
  data: T | null
}

const data:BasicListModel<BasicObjectData<BasicDto>> = {
  status:0,
  statusText: 'TEST',
  data: {
    list: {
      id: 102
    },
    total: 1
  }
}
const data2:BasicObjectModel<BasicDto> = {
  status: -1,
  statusText: 'TEST',
  data: {
    id: 102
  }
}