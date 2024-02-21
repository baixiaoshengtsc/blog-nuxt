<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 12:26:52
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-21 04:50:41
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
          <div class="md-preview" v-if="item.success === true&&item.type==='assistant'" v-html="formatMarked(item.content)"></div>
          <div class="md-preview" v-if="item.success === false&&item.type==='assistant'" v-html="formatMarked(item.content)"></div>
          <div class="md-preview" v-if="item.type==='user'" v-html="formatMarked(item.content)"></div>
        </div>
        <div class="message" v-if="item.time">
          <span>
            {{ item.time }}
          </span>
        </div>
        <div class="focus-box" v-if="item.type==='assistant'&&item.success!=='pending'">
          <span class="active" @click="store.copyDataListItem(store.activeUid, i)" v-if="item.success === true">复制</span>
          <span class="active delete" @click="store.deleteDataListItem(store.activeUid, i)">删除</span>
        </div>
      </div>
    </div>

    <div class="card user-card" v-if="props.inputVal">
      <div class="chat-card">
        <div class="avatar">
        </div>
        <div class="item">
          <div class="md-preview" v-html="formatMarked(props.inputVal)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import marked from 'marked'
// hljs 按需加载
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import shell from "highlight.js/lib/languages/shell";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import c from 'highlight.js/lib/languages/c'
import nginx from 'highlight.js/lib/languages/nginx'
import bash from 'highlight.js/lib/languages/bash'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import rust from 'highlight.js/lib/languages/rust'
import ruby from 'highlight.js/lib/languages/ruby'
import sql from 'highlight.js/lib/languages/sql'
import go from 'highlight.js/lib/languages/go'

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c", c);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("go", go);
// @ts-ignore
hljs.registerLanguage("plaintext", plaintext);
// 皮肤
// import "highlight.js/styles/atom-one-dark.css";
import "./highlight.less";

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
watch([chatRef, props],()=>{
  store.scrollRef = chatRef.value
  // console.log('--监听--')
  setTimeout(()=>{handleResetScroll()})
})
onMounted(()=>{
  setMarkedOptions()
})
const setMarkedOptions = () => {
  const renderer = new marked.Renderer();
  renderer.link = function customLink(href: any, title: any, text: any) {
    return `<a class="link" href="${href}" target="_blank" title="${text}">${text}</a>`;
  };
  renderer.image = function customImage(href:any, title:any, text:any) {
    return (
      `<a class="img-wrapper" href="${href}" target="_blank" title="${text}">` + `<img src="${href}" alt="${text}">` + "</a>"
    );
  };
  marked.setOptions({
    renderer,
    // @ts-ignore
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
};
setMarkedOptions()
const formatMarked = (val:any)=>{
  return marked(val)
}
</script>

<style lang="less" scoped>
@import url(./marked.less);
@import url(./highlight.less);
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
      position: relative;
  
      .avatar {
        margin-top: 20px;
        height: 30px;
        width: 30px;
        border-radius: 8px;
        border: var(--chat-bg-border);
      }
      .item {
        max-width: 100%;
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

      &:hover {
        .focus-box {
          opacity: 1;
          transition: var(--chat-global-transition);
          animation: slide-in .3s ease;
        }
      }

      .focus-box {
        position: absolute;
        right: 0px;
        top: 30px;
        color: var(--chat-global-lower-color);
        font-size: 14px;
        opacity: 0;
        transition: var(--chat-global-transition);

        .active {
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }

        .active+.active {
          margin-left: 10px;
        }
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

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}
</style>