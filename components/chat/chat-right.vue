<template>
  <div class="container">
    <div class="header">
      <span class="info">
        <span class="title" @click="openModel">
          {{ store.activeChat.title }}
        </span>
        <span class="nums">
        {{ store.activeChat.nums }}条对话
        </span>
      </span>
      <span class="btn">
        <el-button :icon="ChatLineRound" class="gray-btn backToLeft" v-if="props.width<=600" size="default" @click="handleBackToLeft"></el-button>
        <el-button :icon="EditPen" class="gray-btn" size="default" @click="openModel" title="修改标题"></el-button>
        <el-button :icon="Setting" class="gray-btn" size="default" @click="handleSetting" title="设置"></el-button>
        <el-button :icon="FullScreen" class="gray-btn" size="default" v-if="props.width>600" @click="store2.changeFullScreen" title="全屏"></el-button>
      </span>
    </div>
    <div class="container">
      <chat-right-container v-bind="{
        list : store.activeData,
        chat : store.activeChat,
        inputVal: inputVal,
      }"></chat-right-container>
    </div>
    <div class="footer">
      <div class="ipt-box" @keydown="handleKeyDown">
        <textarea ref="textRef" rows="3" class="scrollbar" v-model="inputVal" placeholder="使用组合快捷键Ctrl+Enter提交"></textarea>
        <el-button class="green-btn" @click="handleSubmit">
          <el-icon><Position /></el-icon>
          发送
        </el-button>
      </div>
    </div>

    <div class="setting-box" :class="{active: settingActive}">
      <chat-right-setting v-bind="{
        cb: handleSetting,
        active: settingActive
      }"></chat-right-setting>
    </div>

    <el-dialog v-model="dialogVisible" title="修改标题" center>
      <el-input class="green-btn" v-model="dialogInput">

      </el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="gray-btn" @click="dialogVisible = false">取消</el-button>
          <el-button class="green-btn" @click="handleEditTitle">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, watch} from 'vue'
import { useChatList, useChatSetting } from '../../store/index'
import {EditPen, Setting, ChatLineRound, Position, FullScreen} from '@element-plus/icons-vue'
import moment from 'moment'
const store = useChatList()
const store2 = useChatSetting()
const props = defineProps(['width'])
let dialogVisible = ref<boolean>(false)
let dialogInput = ref<string>('')
let inputVal = ref<string>('')
let settingActive = ref<boolean>(false)
const textRef = ref()
watch(()=>store.activeData, ()=>{
  inputVal.value = ''
}, {deep: true})

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
  settingActive.value = !settingActive.value
}

const handleSubmit = () => {
  store.addDataList(store.activeUid, {
    type: 'user',
    success: 'pending',
    content: inputVal.value,
    time: moment().format('yyyy-MM-DD HH:mm:ss')
  })
  inputVal.value = ''
  textRef.value.focus()
}
const handleKeyDown = (e:any) => {
  if(e.ctrlKey && e.key === 'Enter') {
    handleSubmit()
    e.preventDefault()
  }
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
  position: relative;
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

        &:hover {
          text-decoration: underline;
          text-decoration-thickness: 3px;
          text-decoration-color: var(--chat-right-btn-bg-color);
          cursor: pointer;
        }
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

  .setting-box {
    height: calc(100% - 80px);
    position: absolute;
    z-index: 499;
    top: 80px;
    width: 100%;
    transform: translateY(100%);
    transition: var(--chat-global-transition);

    &.active {
      top: 80px;
      transform: translateY(0);
      transition: var(--chat-global-transition);
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