/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-19 02:16:00
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-19 10:57:56
 * @FilePath: \blog-nuxt\plugins\piniaPlugin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PiniaPluginContext } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // react to store changes
    console.log('---', mutation)
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })
  
  console.log('-------')
  
  // Note this has to be typed if you are using TS
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({$pinia}) => {
  // @ts-ignore
  $pinia.use(MyPiniaPlugin)
  // @ts-ignore
  $pinia.use(piniaPluginPersistedstate)
})