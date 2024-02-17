<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-08 16:41:03
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-02-16 11:18:13
 * @FilePath: \blog-nuxt\components\backend\write\write-main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="toolbar">
    <template v-for="item in config">

      <el-dropdown v-if="item.children" trigger="hover" @command="item.handle" :title="item.title">
        <span class="dropdown-btn" :style="{height: '24px', width: '32px'}">
          <el-image :src="item.src"></el-image>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item2 in item.children" :command="item2.value">{{item2.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-upload v-else-if="item.type === 'upload'" v-bind="{
        showFileList: false
      }" :before-upload="(file:File)=>handleUploadImg(file, item.handle)">
        <el-button color="#fafbfc" size="small" :title="item.title">
          <el-image :src="item.src"></el-image>
        </el-button>
      </el-upload>

      <el-button v-else color="#fafbfc" size="small" @click="item.handle" :title="item.title">
        <el-image :src="item.src"></el-image>
      </el-button>


    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch , reactive} from 'vue'
import { EditorToolbar } from './editorConfig';
import { createToolbarConfig } from './toolbarConfig'
import upload from '../../../../api/upload'
interface Props {
  editorToolbar: EditorToolbar
}
const props = defineProps<Props>()
let config = ref()

const toolbarEvent = ref<EditorToolbar>()
watch(props, ()=>{
  config.value = createToolbarConfig(props.editorToolbar)
})
const handleUploadImg = async (file:File, fn: GeneratorFunction)=>{
  const form = new FormData()
  form.append('file', file)
  const {data, pending, error} = await upload.uploadImg(form)
  fn(data.value?.data?.path, data.value?.data?.name)
  return false
}
</script>

<style lang="less" scoped>
.toolbar {
  display: flex;
  div+div {
    margin-left: 4px;
  }
  .el-dropdown {
    --el-dropdown-menu-box-shadow: none !important;
    --el-dropdown-menuItem-hover-fill: none !important;
    --el-dropdown-menuItem-hover-color: none !important;

    .dropdown-btn {
      height: 24px;
      width: 32px;
      display: flex;
      padding: 5px 6px;
      box-sizing: border-box;
      align-items: center;
      outline: none;

      &:hover {
        background-color: rgb(204, 205, 206);
        border-radius: 4px;
      }
      .el-image {
        height: 18px;
        width: 18px;
      }
    }
  }
  .el-button {
    --el-button-hover-bg-color: rgb(204, 205, 206) !important;
    --el-button-hover-border-color: rgb(204, 205, 206) !important;
    font-size: 16px;

    &+.el-button {
      margin-left: 0px;
    }
    .el-image {
      width: 18px;
      height: 18px;
    }
    
    &.el-button--small {
      padding: 5px 6px;
    }
  }
}</style>