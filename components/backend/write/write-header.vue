<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-08 12:33:02
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-08 16:57:33
 * @FilePath: \blog-nuxt\components\backend\write\write-header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="write-header">
    <input placeholder="输入文章标题..." v-model="title" />
    <div class="right-box">
      <el-button type="primary">发布</el-button>
      <el-avatar :size="50"  />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
let title = ref<string>('')

</script>

<style lang="less" scoped>
.write-header {
  height: 4.5rem;
  display: flex;
  align-items: center;
  padding: 0 25px;
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
  background-color: #fafbfc;
  input {
    height: 100%;
    flex: 1 1 auto;
    font-size: 28px;
    font-weight: 500;
    outline: none;
    border: none;

  }

  .right-box {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>