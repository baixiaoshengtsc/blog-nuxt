/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-15 18:18:34
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-20 15:22:46
 * @FilePath: \blog-nuxt\api\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicModel } from '../bean/model'
import { BasicObject, BasicObjectData } from "../bean/base"
import { UseFetchOptions, useFetch } from 'nuxt/app'
import { v4 as uuidv4 } from 'uuid';
const uuid = () => {
  return uuidv4()
}

const fetchConfig:UseFetchOptions<Record<string, any>> = {
  baseURL: "",
  // headers: {
  //   "Content-Type": "application/json"
  // },
  server: false,
  watch: false,
  credentials: 'include',
  key:uuid(),
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

  public async $get(url:string, params?:BasicObject, config?:UseFetchOptions<Record<string, any>>) {
    console.log('fetch', `/${this.feature}/${url}`)
    return await useFetch(`/api/${this.feature}/${url}`, {
      ...fetchConfig,
      ...config,
      method: 'get',
      params: params
    })
  }
  
  public async $post(url:string, params?:BasicObject, config?:UseFetchOptions<Record<string, any>>) {
    return await useFetch(`/api/${this.feature}/${url}`, {
      ...fetchConfig,
      ...config,
      method: 'post',
      body: params
    })
  }
}
