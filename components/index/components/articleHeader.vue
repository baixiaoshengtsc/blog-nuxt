<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-01-21 16:56:52
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-01-27 19:25:46
 * @FilePath: \blog-nuxt\components\index\components\articleHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <header class="article_header">
    <ul>
      <li>
        <el-icon class="vertical-middle">
          <Clock />
        </el-icon>
        <span class="vertical-middle">
          {{ props.createTime }}
        </span>
      </li>
      <li class="category" title="文章分类">
        <el-icon class="vertical-middle">
          <Folder />
        </el-icon>
        <NuxtLink to="" v-for="item in props.tags" :key="item.tag_id">
          <span class="vertical-middle">
            {{ item.tag_name }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <el-icon class="vertical-middle">
          <View />
        </el-icon>
        <span class="vertical-middle">
          {{ props.readNum}}
        </span>
      </li>
    </ul>
    <a>
      <h2 class="article_title">
        {{ props.title }}
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

const props = defineProps({
  createTime: String,
  readNum: Number,
  title: String,
  tags: Array<{tag_name: String, tag_id: Number|String}>
})
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