
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import chat from '../api/chat'
import { ElMessage } from 'element-plus'
import { scrollBottom } from '../utils/dom';

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
      // const { data, pending, error } = await chat.chat({
      //   option: this.activeChat,
      //   history: this.activeData.data.filter(item => { return item.success !== 'pending' && item.success !== false }),
      //   content: obj.content
      // })
      const { data, pending, error } = await useFetch(`/api/chat`, {
        method: 'post',
        server: false,
        watch: false,
        credentials: 'include',
        key: uuid(),
        body: {
          option: this.activeChat,
          history: this.activeData.data.filter(item => { return item.success !== 'pending' && item.success !== false }),
          content: obj.content
        }
      })
      // const apiService = new ApiService('chat')
      // const { data, pending, error } = await apiService.$post('', {
      //   option: this.activeChat,
      //   history: this.activeData.data.filter(item => { return item.success !== 'pending' && item.success !== false }),
      //   content: obj.content
      // })

      if (error.value) {
        this.dataList[dataIndex].data[userIndex].success = false
        this.dataList[dataIndex].data[assistantIndex].success = false
        this.dataList[dataIndex].data[assistantIndex].content = `
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
        this.dataList[dataIndex].data[assistantIndex].time = this.dataList[dataIndex].data[userIndex].time
        this.chatList[chatIndex].latestDate = this.dataList[dataIndex].data[userIndex].time
      } else {
        // @ts-ignore
        if (data.value?.status === 0) {
          this.dataList[dataIndex].data[userIndex].success = true
          this.dataList[dataIndex].data[assistantIndex].success = true
          // @ts-ignore
          this.dataList[dataIndex].data[assistantIndex].content = data.value.data?.content + ''
          this.dataList[dataIndex].data[assistantIndex].time = dateNow()
          this.chatList[chatIndex].latestDate = this.dataList[dataIndex].data[userIndex].time
        } else {
          this.dataList[dataIndex].data[userIndex].success = false
          this.dataList[dataIndex].data[assistantIndex].success = false
          // @ts-ignore
          this.dataList[dataIndex].data[assistantIndex].content = data.value?.statusText ? data.value?.statusText + '' : '请求错误，请检查网络连接！'
          this.dataList[dataIndex].data[assistantIndex].time = this.dataList[dataIndex].data[userIndex].time
          this.chatList[chatIndex].latestDate = this.dataList[dataIndex].data[userIndex].time
        }
      }
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
      isFullScreen: false
    }
  },
  actions: {
    changeFullScreen() {
      this.isFullScreen = !this.isFullScreen
    }
  }
})