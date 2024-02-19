<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-18 17:45:28
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-18 18:45:44
 * @FilePath: \blog-nuxt\layouts\chatgpt.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="chatgpt">
    <slot></slot>
  </div>
</template>

<script>

</script>

<style lang="less">
@import './chatgpt.less';
</style>
<style lang="less" scoped>
.chatgpt {

  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--chat-layout-bg-color);
  box-sizing: border-box;
  --window-height: 90vh;
  --window-width: 90vw;

  @media screen and(max-width: 600px) {
    --window-height: 100vh;
    --window-width: 100vw;
  }
}
</style>