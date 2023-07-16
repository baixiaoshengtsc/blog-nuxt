<!--
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-15 18:18:34
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2023-07-15 18:38:33
 * @FilePath: \blog-nuxt\pages\login.vue
 * @Description: 登录页
-->
<template>

  <div class="login-main">
    <span class="back">
      <el-icon class="vertical-middle"><Back /></el-icon>
      <a class="vertical-middle">&nbsp;返回</a>
    </span>

    <div class="login-form">
      <el-form :form="loginForm" label-position="left" label-width="60px">
        <el-form-item label="账号:">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input v-model="loginForm.captcha" class="input_captcha">
            <template #append>
              <div  @click="getCaptcha" v-html="data?.data" class="captcha">
              </div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <el-button @click="handleClickLogin">
        登录
      </el-button>
    </div>
  </div>

  
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: 'change-layout-to-login'
})
import {
  Back
} from '@element-plus/icons-vue'
import captcha from '../api/captcha';
import login from '../api/login'
import { LoginDTO } from '../bean/dto'
// import responseUtil from '../utils/responseUtil'
let { data, pending, refresh, error} = await captcha.getCaptcha()
// let ret = ref('获取验证码')
// ret.value = await captcha.getCaptcha()
let loginForm = ref<LoginDTO>({
  account: '',
  password: '',
  captcha: ''
})
onMounted(async () => {
})

async function getCaptcha() {
  refresh()
  // ret.value = await captcha.getCaptcha()
}
async function handleClickLogin() {
  let {data, pending, refresh, error} = await login.login(loginForm.value)
  // console.log(data.value?.data?.list[0].summary)
}
</script>
<style lang="less" scoped>
  .login-main {
    padding: 10px 25px;
    position: relative;
    border: 1px solid whitesmoke;
    border-radius: 4px;
    text-align: center;

    .back {
      position: absolute;
      top: 2px;
      left: 0px;
    }

    .login-form {
      margin-top: 25px;
    }
  }

</style>
<style lang="less">
  .login-main {
    svg {
      width: 100%;
      height: 32px;
    }
    .input_captcha {
      .el-input-group__append {
        padding: 0px;

        .captcha {
          height: 32px;
        }
      }
    }
  }
</style>