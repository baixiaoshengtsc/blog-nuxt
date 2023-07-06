<template>
  <div class="article_wrapper">
    <ArticleHeader></ArticleHeader>
    <ArticleContainer></ArticleContainer>
    <ArticleFooter></ArticleFooter>
  </div>
</template>
<style lang="less" scoped>
  .article_wrapper {
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;

    &+.article_wrapper{
      margin-top: 30px;
    }
  }
</style>