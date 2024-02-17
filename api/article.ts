/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-01-28 18:08:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-04 23:34:50
 * @FilePath: \blog-nuxt\api\article.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { ref } from "vue"
import ApiService from "../api"
import { ArticleDTO, LoginDTO } from "../bean/dto"
import { BasicListModel, BasicObjectModel, DataT } from "bean/model"
import { GeneralFunction } from "bean/base"
import { ArticleVO } from "bean/vo"

interface ArticleByTagDTO extends ArticleDTO{
    tagId: number
}
interface ArticleByCategoryDTO extends ArticleDTO{
    categoryId: number
}

class Article extends ApiService {
    constructor(feature: string) {
        super(feature)
    }
    public async queryArticleList(params: ArticleDTO): DataT<BasicListModel<ArticleVO>> {
        return await this.$get('queryList', params)
    }
    
    public async queryArticleListByTag(params: ArticleByTagDTO): DataT<BasicListModel<ArticleVO>> {
        
        return await this.$get('queryListByTag', params)
    }
    
    public async queryArticleListByCategory(params: ArticleByCategoryDTO): DataT<BasicListModel<ArticleVO>> {
        return await this.$get('queryListByCategory', params)
    }

    public async handleLoadingUtil(fn: GeneralFunction) {
        let loading = ref<boolean>(false)
        let isError = ref<boolean>(false)
        let errorMsg = ref<unknown>()
        try {
            loading.value = true
            isError.value = false
        } catch (error) {
            loading.value = false
            isError.value = true
            errorMsg.value = error
        } finally {
            loading.value = false
        }
        let {data} = await this.$get('queryList')
    }
}

export default new Article('article')