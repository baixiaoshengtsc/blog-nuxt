/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-04 12:42:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-04 13:12:54
 * @FilePath: \blog-nuxt\api\tag.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ApiService from "../api";
import { BasicListModel, BasicObjectModel, DataT } from "bean/model"

interface TagVO {
    id:number
    tag_name: string
    tag_nums: number
}

class Tag extends ApiService {
    constructor(feature: string) {
        super(feature)
    }

    public async queryTagList(): DataT<BasicObjectModel<TagVO[]>> {
        return await this.$get('queryTagList')
    }
}

export default new Tag('tag')