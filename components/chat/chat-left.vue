<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-18 18:10:53
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2025-02-06 17:02:47
 * @FilePath: \blog-nuxt\components\chat\chat-left.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="side">
    <div class="head">
      <p>
        我们都将成为gpt的奴隶!
        <p class="small">已累计奴役GPT<span class="underline">{{numsData?.data?.nums}}</span>次!</p>
      </p>
    </div>
    <div class="list">
      <div v-for="(item, i) in store.chatList" class="list-item"
        :class="{ active: activeNum === i, animate: i === 0 && isAnimate }" @click="handleClickChatItem(i)">
        <div class="title">{{ item.title }} <span style="font-size: 11px;color:#817777;">{{getChatType(item.type)}}</span></div>
        <div class="message">
          <span class="num">{{ item.nums }}条对话</span>
          <span class="time">{{ item.latestDate }}</span>
        </div>
        <el-icon @click="handleDeleteChatItem(item.id)">
          <CircleClose />
        </el-icon>
      </div>
    </div>
    <div class="setting">
      <el-button class="gray-btn" :icon="CirclePlus" @click="handleAddChatItem">
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CirclePlus, CircleClose } from '@element-plus/icons-vue';
import { ref, reactive, watch, onMounted } from 'vue'
import { useChatList } from '../../store/index'
import chat from '../../api/chat'

const emits = defineEmits(['changeLeft'])
const store = useChatList()

let activeNum = ref(0)
let isAnimate = ref(false)
const {data:numsData}  = await chat.getChatNums()
watch(activeNum, () => {
  // console.log('---',store.chatList[activeNum.value].id, store.chatList[activeNum.value])
  setTimeout(()=>{
    store.setActiveUid(store.chatList[activeNum.value].id)
  })
}, { deep: true, immediate: true })
watch(store.chatList, () => {
  if (activeNum.value > store.chatList.length) {
    // console.log('---', activeNum.value)
    // console.log('---', store.chatList.length)
    activeNum.value = store.chatList.length
  }
  store.setActiveUid(store.chatList[activeNum.value].id)
}, { deep: true })
const getChatType = (key: string) => {
  const obj: Record<string , any> = {
    gpto1 : 'gpto1(推理模型)',
    dsR1 : 'Deepseek-R1(感谢⏰开源！)',
    dsV3 : 'Deepseek-v3(伟大，无需多言)',
    gpt4o : 'GPT4o(目前仅支持文字)',
    gpt4Plus : 'GPT4-0125',
    gpt4 : 'GPT4-1106(QQ机器人同款)',
    gpt3_5 : 'GPT3.5(最后一版3.5)',
  }
  return obj[key]
}
const handleAddChatItem = () => {
  store.addChatListItem()
  activeNum.value = 0
  isAnimate.value = true
  setTimeout(() => {
    isAnimate.value = false
  }, 310)
}
const handleClickChatItem = (index: number) => {
  activeNum.value = index
  emits('changeLeft')
}
const handleDeleteChatItem = (uid: string) => {
  store.deleteChatListItem(uid)
  store.setActiveUid(store.chatList[activeNum.value].id)
}
</script>
<style lang="less">
.side {
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
.side {
  width: 100%;
  height: 100%;


  .head {
    height: 100px;
    display: flex;
    font-weight: 700;
    justify-content: center;
    align-items: center;

    .small {
      margin-top: 15px;
      font-size: 12px;
      text-align: center;
      color: var(--chat-global-lower-color);

      .underline {
        text-decoration: underline;
      }
    }
  }

  .list {
    height: calc(100% - 200px);
    padding: 0px 20px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-track {
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }


    .list-item {
      box-sizing: border-box;
      border-radius: 8px;
      width: 100%;
      height: 78px;
      background-color: var(--chat-left-listitem-bg-color);
      box-shadow: var(--chat-left-listitem-box-shadow);
      border: var(--chat-left-listitem-border);
      position: relative;
      overflow: hidden;
      padding: 10px;
      cursor: pointer;

      &.animate {
        .title {
          animation: slide-out .3s ease;
        }

        .message {
          animation: slide-in .3s ease;
        }
      }

      &+.list-item {
        margin-top: 10px;
      }

      &.active {
        border: var(--chat-left-listitem-h-border);
      }

      &:hover {
        background-color: var(--chat-left-listitem-bg-h-color);

        .el-icon {
          right: 10px;
          opacity: 1;
          transition: var(--chat-global-transition);
        }
      }

      .el-icon {
        position: absolute;
        font-size: 14px;
        cursor: pointer;
        right: -20px;
        top: 20%;
        opacity: 0;
        transition: var(--chat-global-transition);
        color: var(--chat-left-listitem-icon-bg);
      }

      .title {
        font-weight: 600;
        color: var(--chat-global-color);

      }

      .message {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: var(--chat-global-lower-color);
      }
    }
  }

  .setting {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    
  }
}
</style>