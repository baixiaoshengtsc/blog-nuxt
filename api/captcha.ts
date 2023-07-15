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