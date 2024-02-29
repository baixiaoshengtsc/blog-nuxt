<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-18 17:45:28
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-03-01 00:25:09
 * @FilePath: \blog-nuxt\pages\chat\help.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ClientOnly>
    <div class="chat-container" :class="{ fullScreen: store.isFullScreen}">
      <div class="chat-left" :class="{ active: isLeftDisplay }">
        <chat-left @changeLeft="handleChange"></chat-left>
      </div>
      <div class="chat-right">
        <chat-right @changeLeft="handleChange" v-bind="{width}"></chat-right>
      </div>

      <el-dialog v-model="dialogVisible" center :before-close="handleDialogClose">
        <el-timeline>
          <el-timeline-item center :timestamp="item.time" placement="top" v-for="(item, i) in store.updateList">
            <el-card>
              <p>{{item.msg}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref, onMounted , onUpdated, watch} from 'vue'
import { scrollBottom } from '../../utils/dom';
import { useChatSetting } from '../../store';
const isLeftDisplay = ref(false)
const width = ref(0)
const chatRef = ref()
const dialogVisible = ref(false)
const store = useChatSetting()
const init = () => {
  width.value = window.innerWidth
  window.addEventListener('resize', (event) => {
    // @ts-ignore
    // console.log('event', event.target?.innerWidth)
    // @ts-ignore
    width.value = event.target?.innerWidth
    
  })
}
onMounted(() => {
  init()
  store.initUpdateList()
  if(store.needShowUpdate) dialogVisible.value = true
  // const div = document.getElementById('chat-container')
  // console.log(div)
  // // setInterval(()=>{
  // //   // if(div)
  // //   // @ts-ignore
  // scrollBottom(chatRef.value)
  // }, 1000)
  
})
onUpdated(()=>{
  console.log('--更新--')
})

const handleChange = () => {
  if(width.value<=600)
  isLeftDisplay.value = !isLeftDisplay.value
}
const handleDialogClose = () => {
  store.watchUpdateList()
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
.chat-container {
  z-index: 2;
  max-width: 1200px;
  height: 650px;
  height: var(--window-height);
  width: var(--window-width);
  border-radius: 8px;
  overflow: hidden;
  border: var(--chat-bg-border);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--chat-bg-color);

  &.fullScreen {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
  }

  &:hover {
    box-shadow: 0px 2px 4px #ccc;
  }

  .chat-left {
    width: 300px;
    height: 100%;
    border-right: var(--chat-bg-border);
    background-color: var(--chat-left-bg-color);
  }

  .chat-right {
    //flex: 1;
    width: calc(100% - 300px);
    height: 100%;
  }
}

.chat-container {
  @media screen and(max-width: 600px) {
    .chat-left {
      width: 100%;
      position: absolute;
      left: -100%;
      z-index: 500;
      transition: var(--chat-global-transition);

      &.active {
        left: 0;
        transition: var(--chat-global-transition);
      }
    }

    .chat-right {
      flex: 1;
    }
  }
}</style>