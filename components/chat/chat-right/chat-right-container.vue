<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 12:26:52
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-19 23:31:20
 * @FilePath: \blog-nuxt\components\chat\chat-right\chat-right-container.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="chat-container" ref="chatRef">

    

    <div class="card" v-for="(item, i) in props.list.data" :key="i" :class="{'assistant-card':item.type==='assistant', 'user-card':item.type==='user'}">
      <div class="chat-card">
        <div class="avatar">
          <el-image src="/img/gpt.svg" v-if="item.type==='assistant'"></el-image>
        </div>
        <div class="item">
          <span v-if="item.success === 'pending'&&item.type==='assistant'">...</span>
          <span v-if="item.success === true&&item.type==='assistant'">{{item.content}}</span>
          <span v-if="item.success === false&&item.type==='assistant'">请求失败请重试</span>
          <span v-if="item.type==='user'">{{item.content}}</span>
        </div>
        <div class="message" v-if="item.time">
          <span>
            {{ item.time }}
          </span>
        </div>
      </div>
    </div>

    <div class="card user-card" v-if="props.inputVal">
      <div class="chat-card">
        <div class="avatar">
        </div>
        <div class="item">
          <span>{{props.inputVal}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import { scrollBottom } from '../../../utils/dom';
import { useChatList } from '../../../store/index'
interface item {
  content: string
  success: 'pending' | true | false
  time: string
  type: 'user' | 'assistant'
}
interface list {
  id: string
  data : item[]
}
interface Props {
  list: list,
  inputVal: string,
}

const props = defineProps<Props>()
const chatRef = ref()
const store = useChatList()
const handleResetScroll = () =>{
  scrollBottom(chatRef.value)
}
watch([chatRef, ()=>props.inputVal],()=>{
  store.scrollRef = chatRef.value
  // console.log('--监听--')
  setTimeout(()=>{handleResetScroll()})
})
</script>

<style lang="less" scoped>
.chat-container {
  height: 100%;
  padding: 20px 20px 40px;
  overflow: auto;
  position: relative;
  --message-max-width: 80%;

  .card {
    display: flex;
    animation: slide-in .3s ease;

    &.assistant-card {
      .message {
        flex-direction: row-reverse;
      }
    }
    &.user-card {
      flex-direction: row-reverse;
      .chat-card {
        align-items: flex-end;
        .message {
          align-items: flex-end;
        }
      }
    }

    .chat-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: var(--message-max-width);
  
      .avatar {
        margin-top: 20px;
        height: 30px;
        width: 30px;
        border-radius: 8px;
        border: var(--chat-bg-border);
      }
      .item {
        margin-top: 10px;
        padding: 10px;
        border-radius: 8px;
        user-select: text;
        word-break: break-word;
        border: var(--chat-right-item-border);
        background: var(--chat-right-item-bg-color);
        color: var(--chat-right-item-color);
      }
      .message {
        width: 100%;
        margin-top: 10px;
        display: flex;
        color: var(--chat-global-lower-color);
        font-size: 12px;
      }
    }
  }

  

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
}
</style>