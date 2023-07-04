<template>
  <div class="main-container">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .main-container {
    .main {
      width: 1000px;
      margin: 0 auto;
      position: relative;
      height: 2000px;
    }
  }
</style>