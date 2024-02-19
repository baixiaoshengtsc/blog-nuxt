
import ApiService from "../api"
// import { ElMessage } from 'element-plus'
import { _AsyncData } from "nuxt/dist/app/composables/asyncData"
import { BasicPlainModel, DataT, BasicObjectModel} from '../bean/model'

interface chatVO {
  content: string
  role: 'assistant' | 'user'
}

class Chat extends ApiService {
  constructor(feature: string) {
    super(feature)
  }
  public async chat(params: any): DataT<BasicObjectModel<chatVO>> {
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
    return await this.$post('',params, {
      // baseURL: ''
    })
    
    // return responseUtil(await this.$get(''))
  }
}

export default new Chat('chat')