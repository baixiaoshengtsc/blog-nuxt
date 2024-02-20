<template>
  <div class="setting-container">
    <div class="setting-form">
      <div class="setting-card">
        <span class="label">
          模型
        </span>
        <span class="action">
          <el-select v-model="formData.model">
            <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </span>
      </div>
      <div class="setting-card">
        <span class="label">
          想象力,随机性
          <p class="info">数值最大为2,大于1以后可能会胡言乱语！</p>
        </span>
        <span class="action">
          <span class="valueInfo">{{formData.temperature}}</span>
          <el-slider v-model="formData.temperature" :min="0" :max="2" :step="0.1" />
        </span>
      </div>

      <div class="setting-card">
        <span class="label">
          单次携带对话历史
          <p class="info">数值最大为24,人设数据也算一条。</p>
        </span>
        <span class="action">
          <span class="valueInfo">{{formData.maxLength}}</span>
          <el-slider v-model="formData.maxLength" :min="0" :max="24" :step="2" />
        </span>
      </div>

      <div class="setting-card">
        <span class="label">
          人设数据设置
          <p class="info">正确的人设有助于让回答变得更准确专业，自行寻找人设魔法，在对话中加深人设也是一条路子。</p>
        </span>
        <span class="action">
          <el-button @click="openModel">编辑</el-button>
        </span>
      </div>
      
      <el-dialog v-model="dialogVisible" title="修改人设" center>
        <el-input class="green-btn" v-model="dialogInput" :rows="4" show-word-limit  maxlength="250" type="textarea">
  
        </el-input>
        <template #footer>
          <div class="dialog-footer">
            <el-button class="gray-btn" @click="dialogVisible = false">取消</el-button>
            <el-button class="green-btn" @click="handleEditTitle">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div class="setting-form">
      <div class="setting-card">
        <span class="label">
          卡密
        </span>
        <span class="action">
          <el-input v-model.trim="formData.pw">
          </el-input>
        </span>
      </div>
    </div>

    <el-button class="gray-btn" :style="{marginTop:'15px',width: '100%'}" @click="handleSubmitConfig">确认</el-button>
  </div>
</template>

<script lang="ts" setup>
import {ref ,reactive, watch} from 'vue'
import { useChatList } from '../../../store';
const store = useChatList()
const props = defineProps(['cb'])
const formData = reactive({
  model: store.activeChat.type,
  temperature: store.activeChat.temperature,
  maxLength: store.activeChat.maxLength,
  system: store.activeChat.system,
  pw: store.activeChat.pw
})
const initData = () => {
  formData.model= store.activeChat.type,
  formData.temperature= store.activeChat.temperature,
  formData.maxLength= store.activeChat.maxLength,
  formData.system= store.activeChat.system,
  formData.pw= store.activeChat.pw
}
watch(()=>store.activeUid, ()=>{
  dialogVisible.value = false
  initData()
})
const modelList = reactive([
  {
    'name': 'GPT4-0125(最新慢)',
    value: 'gpt4Plus'
  },
  {
    'name': 'GPT4-1106(QQ群聊机器人同款)',
    value: 'gpt4'
  },
  {
    'name': 'GPT3.5(最后一版3.5)',
    value: 'gpt3_5'
  },
])
const dialogVisible = ref(false)
const dialogInput = ref('')

const openModel = () => {
  dialogInput.value = formData.system
  dialogVisible.value = true
}

const handleEditTitle = () => {
  formData.system = dialogInput.value
}

const handleSubmitConfig = () => {
  store.setChatSystem(store.activeUid, formData.system)
  store.setChatTemperature(store.activeUid, formData.temperature)
  store.setMaxLength(store.activeUid, formData.maxLength)
  // @ts-ignore
  store.setChatType(store.activeUid, formData.model)
  store.setChatPw(store.activeUid, formData.pw)
  props.cb&&props.cb()
}
</script>

<style lang="less" scoped>
.setting-container {
  padding: 20px 20px;
  background-color: #F2F2F2;
  width: 100%;
  height: 100%;

  .setting-form {
    border-radius: 8px;
    width: 100%;
    border: var(--chat-bg-border);

    .setting-card {
      width: 100%;
      padding: 5px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label {
        font-weight: 700;
        .info {
          font-weight: normal;
          font-size: 12px;
          color: var(--chat-global-lower-color);
        }
      }
      .action {
        display: flex;
        justify-content: end;
        align-items: center;
        min-width: 50%;

        .valueInfo {
          margin-right: 15px;
        }
        .el-slider {
          width: 80%;
        }
      }
      &+.setting-card {
        border-top: var(--chat-bg-border);
      }
    }

    &+.setting-form {
      margin-top: 15px;
    }
  }
}
</style>