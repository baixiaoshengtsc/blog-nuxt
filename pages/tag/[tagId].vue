<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-01-21 16:57:12
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-05 00:02:56
 * @FilePath: \blog-nuxt\pages\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <ArticleWrapper v-for="item in articleList?.data?.list" :item="item" :key="item.id"></ArticleWrapper>

        <div :style="{
            height: '100px',
            display: 'flex',
            justifyContent: 'center'
        }">
            <el-pagination v-model:current-page="current" v-model:page-size="size" :total="total"
                layout="prev,pager,next" />
        </div>

    </div>
</template>
<script lang="ts" setup>

import { ref, watch } from 'vue'
import article from '../../api/article'
import { scrollTop } from '../../utils/dom';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

let current = ref<number>(1)
let size = ref<number>(6)
let total = ref<number>(1)
let articleList = ref()



const queryArticleList = async () => {
    scrollTop()
    let { data, refresh } = await article.queryArticleListByTag({ current: current.value, size: size.value, tagId: Number(route.params.tagId) })
    articleList.value = data.value
    watch(data, () => {
        articleList.value = data.value
        console.log('----', articleList.value)
    })
}
queryArticleList()
watch([articleList], ([newArticleList]) => {
    total.value = articleList.value?.data?.total as number
})
watch(current, (newVal) => {
    router.push({
        query: {
            pageNo: newVal
        }
    })
})
watch(() => route.query.pageNo, () => {
    if (!isNaN(Number(route.query.pageNo)))
        current.value = Number(route.query.pageNo)
    else current.value = 1
    queryArticleList()
}, { immediate: true })


</script>