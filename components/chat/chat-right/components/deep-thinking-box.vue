<template>
  <div class="deep-thinking-box" v-if="props.info">
    <div class="deep-thinking-box-header">
      <span class="check-box-status" @click="handleChangeStatus">
        <el-icon><StarFilled /></el-icon>
        <span class="check-box-label">
          已使用深度思考
        </span>
        <el-icon v-if="showContent"><ArrowDownBold /></el-icon>
        <el-icon v-else><ArrowUpBold /></el-icon>
      </span>
    </div>
    <div class="deep-thinking-box-content" v-if="showContent">
      {{ props.info }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, watch} from 'vue'
import {EditPen, Setting, ChatLineRound, Position, FullScreen, ArrowDownBold, ArrowUpBold, StarFilled} from '@element-plus/icons-vue'
import moment from 'moment'

const props = defineProps(['info'])
const showContent = ref(true)

const handleChangeStatus = () => {
  showContent.value = !showContent.value
}

</script>
<style lang="less" scoped>
.deep-thinking-box {
  width: 100%;

  .deep-thinking-box-header {
    .check-box-status {
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid black;
      display: flex;
      align-items: center;
      padding: 2px 10px 2px 10px;
      width: 180px;

      .check-box-label {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
  .deep-thinking-box-content {
    margin-top: 10px;
    background-color: white;
    padding: 20px 30px 20px 20px;
    position: relative;
    color: #8e8888;

    &::before {
      content: '';
      position: absolute;
      height: calc(100% - 40px);
      background-color: #ccc;
      width: 4px;
      left: 13px;
    }
  }
}
</style>