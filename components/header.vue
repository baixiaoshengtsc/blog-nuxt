<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-03 21:51:59
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2023-07-04 08:49:00
 * @FilePath: \blog-nuxt\components\header.vue
 * @Description: 公共组件头
-->
<template>
  <div class="header">
    <el-icon size="20" style="cursor:pointer;" @click="changeSidebarOut"><Operation /></el-icon>
    <span>
      bxs的博客
    </span>
  </div>
</template>
<script lang="ts" setup>
import { Operation } from '@element-plus/icons-vue'
import { useSidebar } from '../composables/useSidebar';
const {sidebarOut, changeSidebarOut} = useSidebar()

</script>
<style lang="less" scoped>
.header {
  background-color: aquamarine;
  background: linear-gradient(to bottom right, #99a4c0, #bbcadd);
  padding: 25px 40px;
  text-align: center;
  .el-icon {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    color: #fff;
  }
}
</style>