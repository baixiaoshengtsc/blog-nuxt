/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-16 01:14:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-16 01:35:23
 * @FilePath: \blog-nuxt\api\upload.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ApiService from "../api"
import { BasicObjectModel, DataT } from "bean/model"

interface UploadImgVO {
  path: string,
  name: string
}

class Upload extends ApiService {
    constructor(feature: string) {
        super(feature)
    }

    public async uploadImg(params: FormData): DataT<BasicObjectModel<UploadImgVO>>{
      return await this.$post('img', params)
    }
}

export default new Upload('upload')