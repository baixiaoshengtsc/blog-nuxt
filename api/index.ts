/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-15 18:18:34
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2023-07-21 17:02:26
 * @FilePath: \blog-nuxt\api\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicModel } from '../bean/model'
import { BasicObject, BasicObjectData } from "../bean/base"
import { UseFetchOptions, useFetch } from 'nuxt/app'


const fetchConfig:UseFetchOptions<Record<string, any>> = {
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  },
  server: false,
  watch: false,
  credentials: 'include',
  /** 响应数据的钩子 */
  onResponse(val) {
    const data = val.response._data
    console.log('响应数据的钩子-val', val)
    console.log('响应数据的钩子-val', val.response.headers.values)
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
    return await useFetch(`/api/${this.feature}/${url}`, {
      ...fetchConfig,
      method: 'get',
      params: params
    })
  }
  
  protected async $post(url:string, params?:BasicObject, config?:UseFetchOptions<Record<string, any>>) {
    return await useFetch(`/api/${this.feature}/${url}`, {
      ...fetchConfig,
      method: 'post',
      body: params
    })
  }
}
