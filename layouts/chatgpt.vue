<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2024-02-18 17:45:28
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2024-02-29 10:07:38
 * @FilePath: \blog-nuxt\layouts\chatgpt.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="chatgpt">
    <slot></slot>
    <footer>
      备案号：
      <a href="https://beian.miit.gov.cn/">冀ICP备2021007641号</a>
    </footer>
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
  --window-height: 85vh;
  --window-width: 90vw;

  @media screen and(max-width: 600px) {
    --window-height: 100vh;
    --window-width: 100vw;
  }

  footer {
    position: absolute;
    z-index: 1;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    a {
      color: var(--chat-global-color);
    }
  }
}
</style>