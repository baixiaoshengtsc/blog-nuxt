<template>
  <div class="login-layout">
    <div class="login-container">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .login-layout {
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right bottom, #2dc670, #3965bd);

    .login-container {
      transition: all .5s ease-in-out;

      &:hover {
        box-shadow: 4px 4px 6px rgba(235, 56, 56, 0.1),
        10px 10px 100px rgba(37, 22, 170, 0.24);
        transform: scale(1.5);
      }
    }
  }
</style>