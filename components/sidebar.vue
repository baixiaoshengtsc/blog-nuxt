<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-03 22:47:51
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2023-07-04 17:47:14
 * @FilePath: \blog-nuxt\components\sidebar.vue
 * @Description: 侧边栏
-->
<template>
  <div class="sidebar">
    <div class="sidebar_header"></div>
    <el-menu
        :default-active="defaultActive"
        background-color="#000000"
        text-color="#b8c7ce"
        active-text-color="#fff"
        @select="handleSelect"
      >
        <el-menu-item :index="routeList.index">
          <el-icon><house /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item :index="routeList.categories">
          <el-icon><folder-opened /></el-icon>
          <span>分类</span>
        </el-menu-item>
        <el-menu-item :index="routeList.tags">
          <el-icon><price-tag /></el-icon>
          <span>标签</span>
        </el-menu-item>
        <el-menu-item :index="routeList.timeline">
          <el-icon><timer/></el-icon>
          <span>时间线</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>
<script lang="ts" setup>
import {
  House,
  FolderOpened,
  PriceTag,
  Timer
} from '@element-plus/icons-vue'
import { useSidebar } from '../composables/useSidebar';

const { changeSidebarOut } = useSidebar()
const route = useRoute()
// console.log('route',route.fullPath)
enum SelectIndex {
  'index'='/',
  'categories'='/categories',
  'tags'='/tags',
  'timeline'='/timeline'
}
interface RouteList {
  index: SelectIndex.index,
  categories: SelectIndex.categories,
  tags: SelectIndex.tags,
  timeline: SelectIndex.timeline,
}
const defaultActive = ref<SelectIndex>(SelectIndex.index)
const routeList = ref<RouteList>({
  index: SelectIndex.index,
  categories: SelectIndex.categories,
  tags: SelectIndex.tags,
  timeline: SelectIndex.timeline,
})
const handleSelect = (value: SelectIndex| string) => {
  if(route?.fullPath === value) return
  navigateTo(value)
  changeSidebarOut()
}

</script>
<style lang="less" scoped>
.sidebar {
  .sidebar_header {
    width: 100%;
    height: 200px;
    background-color: blanchedalmond;
  }
}
</style>