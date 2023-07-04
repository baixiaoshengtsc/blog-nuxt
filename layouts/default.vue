<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-03 21:30:08
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2023-07-04 17:23:35
 * @FilePath: \blog-nuxt\pages\index.vue
 * @Description: 公共组件体
-->
<template>
  <div :style="{ overflow: sidebarOut ? 'auto' : 'hidden' }">
    <div class="common-layout" id="common-layout" :class="{ sidebar_in: !sidebarOut, sidebar_out: sidebarOut }">
      <el-container>
        <el-container>
          <el-header>
            <Header></Header>
          </el-header>
          <el-main>
            <MainContainer>
              <slot></slot>
            </MainContainer>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
      <ClientOnly>
        <Teleport to="#common-layout">
          <div class="left-sidebar">
            <Sidebar></Sidebar>
          </div>

          <div class="mask" v-if="!sidebarOut" @click="changeSidebarOut"></div>
        </Teleport>
      </ClientOnly>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useSidebar } from '../composables/useSidebar';
const {sidebarOut, changeSidebarOut} = useSidebar()

</script>

<style lang="less" scoped>
.common-layout {
  &.sidebar_in {
    transform: translateX(200px);
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &.sidebar_out {
    transform: translateX(0);
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .el-header {
    padding: 0;
    height: auto;
    
  }
  .el-main {
    --el-main-padding: 0;
    background-color: #fefeff;
  }
  .el-footer {
    --el-main-padding: 0;
    background-color: bisque;
  }
}

.left-sidebar {
  position: absolute;
  width: 200px;
  height: 100%;
  left: 0;
  top: 0;
  background-color: black;
  transform: translateX(-200px);
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, .24);
}
</style>