<template>
  <div class="container">
    <div class="header">
      <span class="info">
        <span class="title">
          {{ store.activeChat.title }}
        </span>
        <span class="nums">
        {{ store.activeChat.nums }}条对话
        </span>
      </span>
      <span class="btn">
        <el-button :icon="ChatLineRound" class="gray-btn backToLeft" v-if="props.width<=600" size="default" @click="handleBackToLeft"></el-button>
        <el-button :icon="EditPen" class="gray-btn" size="default" @click="openModel" title="修改标题"></el-button>
        <el-button :icon="Setting" class="gray-btn" size="default" title="设置"></el-button>
      </span>
    </div>
    <div class="container">
      <chat-right-container v-bind="{
        list : store.activeData,
        inputVal: inputVal,
      }"></chat-right-container>
    </div>
    <div class="footer">
      <div class="ipt-box">
        <textarea rows="3" class="scrollbar" v-model="inputVal"></textarea>
        <el-button class="green-btn" @click="handleSubmit">
          <el-icon><Position /></el-icon>
          发送
        </el-button>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="修改标题" width="500" center>
      <el-input v-model="dialogInput">

      </el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditTitle">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue'
import { useChatList } from '../../store/index'
import {EditPen, Setting, ChatLineRound, Position} from '@element-plus/icons-vue'
import moment from 'moment'
const store = useChatList()
const props = defineProps(['width'])
let dialogVisible = ref<boolean>(false)
let dialogInput = ref<string>('')
let inputVal = ref<string>('')

const emits = defineEmits(['changeLeft'])

const handleBackToLeft = () => {
  emits('changeLeft')
}
const openModel = () => {
  dialogInput.value = store.activeChat.title
  dialogVisible.value = true
}
const handleEditTitle = () => {
  store.setChatTitle(store.activeUid, dialogInput.value)
  dialogVisible.value = false
}
const handleSetting = () => {

}

const handleSubmit = () => {
  store.addDataList(store.activeUid, {
    type: 'user',
    success: 'pending',
    content: inputVal.value,
    time: moment().format('yyyy-MM-DD HH:mm:ss')
  })
  inputVal.value = ''
}
</script>
<style lang="less">
.container {
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes slide-out {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }

    100% {
      opacity: 0;
      transform: translateY(20px);
    }
  }
}
</style>
<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  .header {
    height: 80px;
    box-sizing: border-box;
    border-bottom: var(--chat-bg-border);
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      flex-direction: column;
      .title {
        color: var(--chat-global-color);
        font-size: 18px;
        font-weight: 700;
      }
      .nums {
        color: var(--chat-global-lower-color);
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
  .container {
    height: calc(100% - 200px);
  }
  .footer {
    height: 120px;
    box-sizing: border-box;
    border-top: var(--chat-bg-border);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 10px 20px 20px;
    position: relative;
    width: 100%;

    .ipt-box {
      width: 100%;
      border: var(--chat-bg-border);
      border-radius: 8px;

      &:focus-within {
        border: var(--chat-right-btn-h-border);
      }

      textarea {
        resize: none;
        border: none;
        outline: none;
        font-size: 18px;
        width: 100%;
        height: 100%;
        padding: 10px 90px 10px 14px;
        border-radius: 40px;
      }

      .el-button {
        position: absolute;
        top: 55px;
        right: 30px;

        &:hover .el-icon, &:focus .el-icon {
          display: block;
          transition: var(--chat-global-transition);
          animation: el-slide-in .3s ease;
        }

        .el-icon{
          display: none;
          margin-right: 10px;          
        }
      }
    }
  }

  @keyframes el-slide-in {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
}
</style>