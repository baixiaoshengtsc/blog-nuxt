/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 00:48:01
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-03-01 16:12:54
 * @FilePath: \blog-nuxt\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import chat from '../api/chat'
import { ElMessage } from 'element-plus'
import { scrollBottom } from '../utils/dom';
import { updateList } from './updateList';
import { time } from 'console';

interface dataListItem {
  type: 'user' | 'assistant'
  success: true | false | 'pending'
  content: string
  time: string
}
const dateNow = () => {
  return moment().format('yyyy-MM-DD HH:mm:ss')
}
const uuid = () => {
  return uuidv4()
}
const getIndexUtil = (fn: (...args: any[]) => boolean, arr: any[]) => {
  let ret = 0
  arr.forEach((item, i) => {
    if (fn(item)) ret = i
  })
  return ret
}
function copyToClipboard(text: string) {
  // Fallback: 使用老方法 
  // const textArea = document.createElement('textarea');
  // textArea.value = text;
  // document.body.appendChild(textArea);
  // textArea.focus(); 
  // textArea.select();

  if (navigator.clipboard) {
    // 使用 navigator.clipboard API
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
      ElMessage.success({
        offset: 20,
        message: '复制成功!'
      })
    }).catch(err => {
      ElMessage.error({
        offset: 20,
        message: '复制失败惹...'
      })
    });
  }
  else {
    try {
      let textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      ElMessage.success({
        offset: 20,
        message: '复制成功!'
      })
    } catch (err) {
      ElMessage.error({
        offset: 20,
        message: '复制失败惹...'
      })
    }

  }
}
export const useChatList = defineStore('chatList', {
  state: () => {
    const uid = uuid()
    return {
      chatList: [
        {
          id: uid,
          title: '新的聊天',
          latestDate: dateNow(),
          nums: 0,
          temperature: 0.7,
          system: '',
          type: 'gpt4' as 'gpt4Plus' | 'gpt4Img' | 'gpt4' | 'gpt3_5' | string,
          maxLength: 20,
          pw: 'fefdc625-13a8-4a81-b82a-b0bf768eb5a1'
        }
      ],
      dataList: [
        {
          id: uid,
          data: [] as dataListItem[]
        }
      ],
      loading: false,
      activeUid: uid,
      scrollRef: {} as Element,
    }
  },
  actions: {
    addChatListItem() {
      const uid = uuid()
      const defaultList = {
        id: uid,
        title: '新的聊天',
        latestDate: dateNow(),
        nums: 0,
        temperature: 0.7,
        system: '你是一个专业的程序员',
        type: 'gpt4',
        maxLength: 20,
        pw: 'fefdc625-13a8-4a81-b82a-b0bf768eb5a1'
      }
      this.chatList.unshift(defaultList)
      this.dataList.unshift({
        id: uid,
        data: []
      })
      this.setActiveUid(uid)
    },
    deleteChatListItem(uid: string) {
      this.chatList = this.chatList.filter(item => {
        return item.id !== uid
      })
      this.dataList = this.dataList.filter(item => {
        return item.id !== uid
      })
    },
    deleteDataListItem(uid: string, i: number) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.dataList)
      let chatIndex = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.dataList[index].data.splice(i - 1, 2)
      this.chatList[chatIndex].nums -= 2
    },
    copyDataListItem(uid: string, i: number) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.dataList)
      const content = this.dataList[index].data[i].content
      copyToClipboard(content)
    },
    setChatTitle(uid: string, val: string) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].title = val
    },
    setChatType(uid: string, val: 'gpt4Plus' | 'gpt4Img' | 'gpt4' | 'gpt3_5') {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].type = val
    },
    setMaxLength(uid: string, val: number) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].maxLength = val
    },
    setChatTemperature(uid: string, val: number | string) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].temperature = Number(val)
    },
    setChatSystem(uid: string, val: string) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].system = val
    },
    setChatPw(uid: string, val: string) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].pw = val
    },
    setActiveUid(uid: string) {
      this.activeUid = uid
    },
    async addDataList(uid: string, obj: dataListItem) {
      let chatIndex = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      let dataIndex = getIndexUtil((item) => {
        return item.id === uid
      }, this.dataList)
      this.dataList[dataIndex].data.push(obj)
      this.dataList[dataIndex].data.push({
        type: 'assistant',
        content: '',
        success: 'pending',
        time: ''
      })
      const userIndex = this.dataList[dataIndex].data.length - 2
      const assistantIndex = this.dataList[dataIndex].data.length - 1
      this.chatList[chatIndex].nums += 2
      const res = await fetch('/api/chat', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          option: this.activeChat,
          history: this.activeData.data.filter(item => { return item.success !== 'pending' && item.success !== false }),
          content: obj.content
        })
      })
      const reader = new TextDecoder('utf-8')
      const pipe = res.body?.getReader()
      const _this = this
      pipe?.read().then(function util({ done, value }): any {
        if (done) {
          console.log('Stream finished');
          _this.dataList[dataIndex].data[userIndex].success = true
          _this.dataList[dataIndex].data[assistantIndex].success = true
          _this.dataList[dataIndex].data[assistantIndex].time = dateNow()
          _this.chatList[chatIndex].latestDate = _this.dataList[dataIndex].data[userIndex].time
          return;
        }
        const text = reader.decode(value);
        if (text.indexOf('openai响应错误') !== -1) {
          _this.dataList[dataIndex].data[userIndex].success = false
          _this.dataList[dataIndex].data[assistantIndex].success = false
          _this.dataList[dataIndex].data[assistantIndex].content = `
openai响应错误，可能存在的问题如下：
-  如使用gpt4模型，请切换模型或者等待一分钟请求冷却后再试。
-  如非请求冷却问题请检查历史记录长度是否超标，请缩短设置历史记录长度后再次重试。
-  由于openai最近新发布视频模型，导致洋人的服务器被拉爆了，也有可能是单纯的openai服务器宕机。
> 
>  鸣大钟一次！
> 
>  推动杠杆，启动活塞和泵……
> 
>  鸣大钟两次！
> 
>  按下按钮，发动引擎，点燃涡轮，注入生命……
> 
>  鸣大钟三次！
> 
>  齐声歌唱，赞美万机之神！
>
***如果排除以上问题且安抚机魂后仍报错，请联系作者(485434766)。***
`
          _this.dataList[dataIndex].data[assistantIndex].time = _this.dataList[dataIndex].data[userIndex].time
          _this.chatList[chatIndex].latestDate = _this.dataList[dataIndex].data[userIndex].time
          return
        }
        let data = text.replace(/[^\x20-\x7E\u4E00-\u9FFF]+/g, "").split('data:')
        data.forEach(item => {
          if (item.indexOf('DONE') !== -1) {
            return
          } else {
            if (item) {
              const format = JSON.parse(item)
              _this.dataList[dataIndex].data[userIndex].success = true
              _this.dataList[dataIndex].data[assistantIndex].success = true
              if (format.choices[0].delta?.content) {
                _this.dataList[dataIndex].data[assistantIndex].content += format.choices[0].delta?.content
              }
            }
          }
        })
        return pipe.read().then(util)
      })
      setTimeout(() => {
        scrollBottom(this.scrollRef)
      })
    },

  },
  getters: {
    activeData(state) {
      let index = getIndexUtil((item) => {
        return item.id === state.activeUid
      }, state.dataList)
      return state.dataList[index]
    },
    activeChat(state) {
      let index = getIndexUtil((item) => {
        return item.id === state.activeUid
      }, state.chatList)
      return state.chatList[index]
    }
  },
  persist: process.client && {
    storage: localStorage,
    paths: ['chatList', 'dataList', 'activeUid']
  }
})
export const useChatSetting = defineStore('chatSetting', {
  state: () => {
    return {
      isFullScreen: false,
      updateList: [] as any[]
    }
  },
  getters: {
    needShowUpdate(state) {
      let ret = false
      state.updateList.forEach(item => {
        if (item.isWatch === false) {
          ret = true
        }
      })
      return ret
    },
  },
  actions: {
    changeFullScreen() {
      this.isFullScreen = !this.isFullScreen
    },
    initUpdateList() {
      if (this.updateList.length > 0) {
        let baseList = updateList.map(item => {
          return {
            time: item.time,
            msg: item.msg,
            isWatch: false
          }
        })
        this.updateList.forEach((item, i) => {
          updateList.forEach((item2, i) => {
            if (item.time === item2.time && item.isWatch) {
              baseList[i].isWatch = true
            }
          })
        })
        this.updateList = baseList
      } else {
        this.updateList = updateList.map(item => {
          return {
            time: item.time,
            msg: item.msg,
            isWatch: false
          }
        })
      }
    },
    watchUpdateList() {
      this.updateList = this.updateList.map(item => {
        return {
          time: item.time,
          msg: item.msg,
          isWatch: true
        }
      })
    }
  },
  persist: process.client && {
    storage: localStorage,
    paths: ['updateList']
  }
})