<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-08 16:41:03
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-16 01:20:27
 * @FilePath: \blog-nuxt\components\backend\write\write-main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="write-main">
    <write-main-toolbar v-bind="{
      editorToolbar: toolbar
    }"></write-main-toolbar>
    <div class="body">
      <div class="left">
        <ClientOnly>
          <write-main-editor @tell="handleChange" @change="handleDocChange"></write-main-editor>
        </ClientOnly>
      </div>
      <div class="right">
        <write-main-preview v-bind="{
          doc
        }"></write-main-preview>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
const toolbar = ref()
let doc = ref<string>('')
const handleChange = (editorToolbar: any)=>{
  // console.log('tell', editorToolbar)
  toolbar.value = editorToolbar
}
const handleDocChange = (v: string) => {
  doc.value = v
}
</script>

<style lang="less" scoped>
.write-main {
  height: calc(100% - 4.5rem);
  .toolbar {
    padding: 4px 12px;
    background-color: #fafbfc;
    border-bottom: 1px solid #ccc;
    user-select: none;
  }

  .body {
    height: calc(100% - 34px);
    border-bottom: 1px solid #ccc;
    display: flex;
    .left, .right {
      height: 100%;
      width: 50%;
      box-sizing: border-box;
    }
    .right {
      padding: 15px 26px;
    }
  }

}
</style>