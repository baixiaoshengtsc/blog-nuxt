<template>
  <header class="article_header">
    <ul>
      <li>
        <el-icon class="vertical-middle">
          <Clock />
        </el-icon>
        <span class="vertical-middle">
          2023年7月6日
        </span>
      </li>
      <li class="category" title="文章分类">
        <el-icon class="vertical-middle">
          <Folder />
        </el-icon>
        <NuxtLink to="">
          <span class="vertical-middle">
            分类标签1
          </span>
        </NuxtLink>
        <NuxtLink to="">
          <span class="vertical-middle">
            分类标签2
          </span>
        </NuxtLink>
        <NuxtLink to="">
          <span class="vertical-middle">
            分类标签3
          </span>
        </NuxtLink>
        
      </li>
      <li>
        <el-icon class="vertical-middle">
          <View />
        </el-icon>
        <span class="vertical-middle">
          观看数
        </span>
      </li>
    </ul>
    <a>
      <h2 class="article_title">
        标题标题标题标题标题标题
      </h2>
    </a>
  </header>
</template>
<script lang="ts" setup>
import {
  Clock,
  Folder,
  View
} from '@element-plus/icons-vue'
</script>
<style lang="less" scoped>
.article_header {
  font-size: 14px;
  color: #7a7a7a;
  font-weight: 700;

  ul {
    li {
      display: inline-block;

      el-icon {
        margin-right: 4px;
      }
      a {
        cursor: pointer;
        color: #87b4e2;
      }
      a:hover {
        opacity: 0.8;
      }
    }

    li+li {
      margin-left: 24px;
    }
  }

  .category {
    a+a::before {
      content: ",";
    }
  }

  .article_title {
    color: #333;
    cursor: pointer;
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
}
</style>