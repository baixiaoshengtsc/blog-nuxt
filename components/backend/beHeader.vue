<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-03 21:51:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-07 10:42:44
 * @FilePath: \blog-nuxt\components\header.vue
 * @Description: 公共组件头
-->
<template>
  <div class="header">
    <el-icon size="20" style="cursor:pointer;" @click="changeBackSidebarOut"><Operation /></el-icon>
    <span>
      bxs的博客-后台
    </span>

    <span class="header-btn">
      <el-button type="primary" @click="changeRoute('/backend/write')">开始创作</el-button>
      <el-button @click="changeRoute('/')">返回前台</el-button>
      <el-button type="danger" @click="changeRoute('loginOut')">退出登录</el-button>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { Operation } from '@element-plus/icons-vue'
import { useBackSidebar } from '../../composables/useBackSiderbar';
const { changeBackSidebarOut } = useBackSidebar()

type btnVal = '/backend/write'| '/' | 'loginOut'

const changeRoute = (route: btnVal)=>{
  if(route === 'loginOut') {

  }else {
    navigateTo({path:route})
  }
}

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

  .header-btn {
    position: absolute;
    right: 20px;
    top: 19px;
  }
}
</style>