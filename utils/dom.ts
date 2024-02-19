/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-02-02 15:07:47
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-19 23:20:03
 * @FilePath: \blog-nuxt\utils\dom.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const scrollTop = (target = document.body) => {
    target.scrollTop = 0
    document.documentElement.scrollTop = 0
    // console.log('--触发scroll--')
}

export const scrollBottom = (target: Element | HTMLElement) => {
    // target.scrollTop = 400;
    target.scroll({
        top: target.scrollHeight,
        behavior: "smooth",
    })
}