<template>
  <div class="article_wrapper">
    <ArticleHeader 
      v-bind="{
        createTime: props.item.create_time,
        tags: props.item.tags,
        readNum: props.item.read_num,
        title: props.item.article_name
      }"></ArticleHeader>
    <ArticleContainer v-bind="{
      imgSrc: props.item.poster,
      summary: props.item.summary
    }"></ArticleContainer>
    <ArticleFooter></ArticleFooter>
  </div>
</template>
<script lang="ts" setup>
import { ArticleVO } from 'bean/vo';
interface Props {
  item: ArticleVO
}
const props = defineProps<Props>()
</script>
<style lang="less" scoped>
  .article_wrapper {
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;

    &+.article_wrapper{
      margin-top: 30px;
    }
  }

  
</style>