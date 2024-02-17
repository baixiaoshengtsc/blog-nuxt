<template>
  <div>
    分类
    <el-row :gutter="20">
      <el-col :style="{marginTop: '15px'}" v-bind="{ lg: 4, sm: 6, xs: 8}" v-for="(item, i) in data?.data">
        <NuxtLink :to="'/category/'+item.id">
          <el-badge :value="item.category_nums" :style="{ width : '100%'}">
            <el-card>
              <img alt="图片" :src="item.poster?item.poster:'../assets/img/default_category.svg'" class="poster"/>
              <div :style="{
                height: '20px',
              }">
                <p style="text-align: center;">{{ item.category_name}}</p>
              </div>
            </el-card>
          </el-badge>
        </NuxtLink>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import category from '../api/category';

let {data}  = await category.queryCategoryList()
</script>
<style scoped>
.poster {
  width: 100%;
  height: 80px;
  object-fit: contain;
}
.el-card:hover {
  box-shadow: 0px 0px 12px #ccc;
}
</style>