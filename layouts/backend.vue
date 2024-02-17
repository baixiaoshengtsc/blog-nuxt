<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-06 18:39:32
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-15 00:11:39
 * @FilePath: \blog-nuxt\layouts\backend.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="backend-layout" :class="{ sidebar_in: !backSidebarOut, sidebar_out: backSidebarOut }">
    <el-container>
      <el-header v-if="$route.path !== '/backend/write'">
        <BeHeader></BeHeader>
      </el-header>
      <el-container>
        <el-aside>
          <BeSiderBar></BeSiderBar>
        </el-aside>
        <el-main>
          <slot>
            
          </slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { useBackSidebar } from '../composables/useBackSiderbar';
const { backSidebarOut } = useBackSidebar()
</script>
<style lang="less" scoped>
.backend-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &.sidebar_in {
    .el-aside {
      width: 200px;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
  }

  &.sidebar_out {
    .el-aside {
      width: 0px;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
  }

  .el-container {
    width: 100%;
    height: 100%;

    .el-container {
      width: 100%;
      height: 100%;
    }
  }
  .el-header {
    padding: 0;
    height: auto;
    
  }
  .el-main {
    --el-main-padding: 0;
    background-color: #fefeff;
  }
}
</style>