<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-01-28 18:14:11
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-04 23:35:45
 * @FilePath: \blog-nuxt\pages\tags.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    标签
    <ul class="tagList">
        <li class="tag" v-for="(item, i) in tagList?.data" :key="item.id">
          <NuxtLink :to="'/tag/'+item.id">
            <div class="icon">{{ item.tag_nums }}</div>
            <div class="title">{{ item.tag_name }}</div>
          </NuxtLink>
        </li>
    </ul>
    
  </div>
</template>
<script lang="ts" setup>
import tag from '../api/tag';
const {data: tagList } = await tag.queryTagList()

</script>
<style lang="less" scoped>
.tagList {
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;
  .tag {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px;
    cursor: pointer;
    
    a {
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      color: black;
      .icon {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background-color: #348ba9;
        color: white;
        text-align: center;
        margin-right: 5px;
        font-size: 14px;
      }
      .title {
        
      }
    }
    
  }
  
}

li {
  list-style: none;
}
</style>