<template>
  <div class="article_footer">
    <NuxtLink>
      <span class="read_more">
        <span>
          继续阅读
        </span>
        <el-icon class="vertical-middle"><MessageBox /></el-icon>
      </span>
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup>
import {
  MessageBox
} from '@element-plus/icons-vue'
</script>
<style lang="less" scoped>
  .read_more {
    display: inline-block;
    color: #1761c5;
    font-weight: 700;
    padding: 6px 10px;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
  }
</style>