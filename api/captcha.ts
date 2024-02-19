/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-01-28 18:08:55
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-19 21:43:44
 * @FilePath: \blog-nuxt\api\captcha.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ApiService from "../api"
// import { ElMessage } from 'element-plus'
import { _AsyncData } from "nuxt/dist/app/composables/asyncData"
import { BasicPlainModel, DataT} from '../bean/model'

class Captcha extends ApiService {
  constructor(feature: string) {
    super(feature)
  }
  public async getCaptcha(): DataT<BasicPlainModel<string>> {
    // console.log('this', this.$get(''))
    // const {data: ret, pending, refresh, error} = await this.$get('')
    // if(!pending) 
    // ElMessage({
    //   type: 'error',
    //   message: '服务器响应失败了!'
    // })
    // if(error) {
    //   console.log('error', error)
    // }
    return await this.$get('')
    
    // return responseUtil(await this.$get(''))
  }
}

export default new Captcha('captcha')