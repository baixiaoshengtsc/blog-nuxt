<template>
  <div class="chatgpt">
    <slot></slot>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
.chatgpt {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #ccc, blue, red);
}
</style>