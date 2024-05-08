/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-29 23:37:56
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-05-08 10:53:32
 * @FilePath: \blog-nuxt\store\updateList.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const updateList = [
  {
    time: '2024-5-8 v1.1',
    msg: `修复了不知道为什么我写了一个正则把所有中文标点符号都去除的bug，现在支持正常显示标点符号了！`
  },
  {
    time: '2024-3-22 v1.1',
    msg: `由于信用卡发卡行结算故障，故4.0相关api暂时无法使用，请自行切换为3.5，预计3.22日晚间修复`
  },
  {
    time: '2024-3-1 v1.1',
    msg: `报错样式恢复，根据openai错误码细分报错类型待开发`
  },
  {
    time: '2024-2-29 v1.1',
    msg: `优化问答体验，后端接口改造，支持流式传输，大大提高响应速度，减少对话假死概率`
  },
  {
    time: '2024-2-29 v1.1',
    msg: `服务器支持https请求，改为https请求后旧对话记录会丢失，云存档功能待开发`
  }
]