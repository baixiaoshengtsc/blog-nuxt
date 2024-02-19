import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import chat from '../api/chat'
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
          system: ''
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
        system: '你是一个专业的程序员'
      }
      this.chatList.unshift(defaultList)
      this.dataList.push({
        id: uid,
        data: []
      })
    },
    deleteChatListItem(uid: string) {
      this.chatList = this.chatList.filter(item => {
        return item.id !== uid
      })
      this.dataList = this.dataList.filter(item => {
        return item.id !== uid
      })
    },
    setChatTitle(uid: string, val: string) {
      let index = getIndexUtil((item) => {
        return item.id === uid
      }, this.chatList)
      this.chatList[index].title = val
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
    setActiveUid(uid: string) {
      this.activeUid = uid
    },
    async addDataList(uid: string, obj: dataListItem, fn: (...args: any[]) => void) {
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
      const { data, pending, error } = await chat.chat({
        option: this.activeChat,
        history: this.activeData.data.filter(item => { return item.success !== 'pending' && item.success !== false }),
        content: obj.content
      })
      if (error.value) {
        this.dataList[dataIndex].data[userIndex].success = false
        this.dataList[dataIndex].data[assistantIndex].success = false
        this.dataList[dataIndex].data[assistantIndex].content = '请求错误，请检查网络连接！'
        this.dataList[dataIndex].data[assistantIndex].time = this.dataList[dataIndex].data[userIndex].time
        this.chatList[chatIndex].latestDate = this.dataList[dataIndex].data[userIndex].time
      } else {
        if (data.value?.status === 0) {
          this.dataList[dataIndex].data[userIndex].success = true
          this.dataList[dataIndex].data[assistantIndex].success = true
          this.dataList[dataIndex].data[assistantIndex].content = data.value.data?.content + ''
          this.dataList[dataIndex].data[assistantIndex].time = dateNow()
          this.chatList[chatIndex].latestDate = this.dataList[dataIndex].data[userIndex].time
        } else {
          this.dataList[dataIndex].data[userIndex].success = false
          this.dataList[dataIndex].data[assistantIndex].success = false
          this.dataList[dataIndex].data[assistantIndex].content = data.value?.statusText + ''
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