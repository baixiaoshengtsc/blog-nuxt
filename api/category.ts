/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-02 21:36:19
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-04 12:44:28
 * @FilePath: \blog-nuxt\api\category.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ApiService from "../api"
import { BasicListModel, BasicObjectModel, DataT } from "bean/model"

interface CategoryVO {
    id: number
    category_name: string
    category_nums: number
    poster: string
}

class Category extends ApiService {
    constructor(feature: string) {
        super(feature)
    }

    public async queryCategoryList(): DataT<BasicObjectModel<CategoryVO[]>> {
        return await this.$get('queryCategoryList')
    }
}

export default new Category('category')