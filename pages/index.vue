<template>
  <div :style="{ overflow: sidebarOut ? 'auto' : 'hidden' }">
    <div class="common-layout" id="common-layout" :class="{ sidebar_in: !sidebarOut, sidebar_out: sidebarOut }">
      <el-container>
        <el-container>
          <el-header>
            <div class="header">
              <el-button @click="changeSidebar">切换</el-button>
              头头头
            </div>
            
          </el-header>
          <el-main>
            <MainContainer></MainContainer>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
      <ClientOnly>
        <Teleport to="#common-layout">
          <!-- content -->
          <div class="left-sidebar">

          </div>

          <div class="mask" v-if="!sidebarOut" @click="changeSidebar"></div>
        </Teleport>
      </ClientOnly>
    </div>
  </div>
</template>


<script lang="ts" setup>
let sidebarOut = ref<Boolean>(true)
const changeSidebar = () => {
  sidebarOut.value = !sidebarOut.value
}

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
    .header {
      background-color: aquamarine;
      background: linear-gradient(to bottom right, #99a4c0, #bbcadd);
      padding: 25px 40px;
    }
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