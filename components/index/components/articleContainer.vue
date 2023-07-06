<template>
  <section class="article_container">
    <el-image class="article_poster" src="../../../assets/img/test-bg.png" fit="cover" />
    <p class="article_summary">
      总结总结总结总结
    </p>
  </section>
</template>
<style lang="less" scoped>
  @media screen and (min-width: 640px) {
    .article_poster {
      height: 360px !important;
    }
  }
  .article_poster {
    cursor: pointer;
    height: 200px;
    width: 100%;
    transition: transform .2s ease-in-out;
    box-shadow: 0 0 6px rgba(109, 43, 43, .1),
                10px 10px 100px rgba(112, 100, 212, .24);
    &:hover {
      transform: scale(1.01);
    }
  }
  .article_summary {
    font-size: 16px;
    margin: 20px 0;
  }
</style>