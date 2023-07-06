<template>
  <div class="main-container">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media screen and (min-width: 640px) {
  .main-container{
    width: 900px;
    margin: 0 auto;
  }
}
  .main-container {
    .main {
      position: relative;
      padding: 24px 24px 0px;
    }
  }
</style>