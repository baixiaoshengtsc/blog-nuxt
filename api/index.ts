import { BasicModel } from '../bean/model'
import { BasicObject, BasicObjectData } from "../bean/base"
import { UseFetchOptions, useFetch } from 'nuxt/app'


const fetchConfig:UseFetchOptions<Record<string, any>> = {
  baseURL: "http://localhost:3001",
  headers: {
    token: ""
  },
  server: false,
  /** 响应数据的钩子 */
  onResponse({ response }) {
    const data = response._data
    console.log('响应数据的钩子', data)
  },
  /** 响应错误的钩子 */
  onResponseError({ response }) {
    const data = response._data
    console.log('响应错误的钩子', data)
  },
  /** 设置请求头 */
  onRequest() {

  },
  /** 请求错误的钩子 */
  onRequestError(req) {
    console.log('reqerror', req)
  }
}

export default class ApiService {
  private feature: string

  constructor(feature: string) {
    this.feature = feature
  }

  protected async $get(url:string, params?:BasicObject, config?:UseFetchOptions<Record<string, any>>) {
    console.log('fetch', `/${this.feature}/${url}`)
    return await useFetch(`/${this.feature}/${url}`, {
      ...fetchConfig,
      method: 'get',
      params: params
    })
  }
  
  protected async $post(url:string, params?:BasicObject, config?:UseFetchOptions<Record<string, any>>) {
    return await useFetch(``, {
      ...fetchConfig,
      method: 'post',
      body: params
    })
  }
}
