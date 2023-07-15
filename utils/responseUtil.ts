import { ElMessage } from 'element-plus'
import { _AsyncData,  } from 'nuxt/dist/app/composables/asyncData'
// import { ref } from 'nuxt/dist/app/compat/capi'
// import { toRef } from 'nuxt/dist/app/compat/capi'
async function responseUtil(fetchRet: _AsyncData<any, any>) {
  const {data: ret, pending, refresh, error} = fetchRet
  // console.log('ret', ret)
  // console.log('pending', pending)
  // console.log('refresh', refresh)
  // console.log('error', error)
  // const data = ref(ret?.value?.data)
  if(!pending) {
    ElMessage({
      type: 'error',
      message: '服务器响应失败了!'
    })
  }
  if(typeof ret?.value?.status === 'number' && ret?.value?.status !== 0) {
    ElMessage({
      type: 'error',
      message: ret?.value?.statusText
    })
  }
  console.log('test', ret?.value?.status !== 'number')
  console.log('', ret?.value?.status)
  if(typeof ret?.value?.status !== 'number') {
    await refresh()
  }
  // console.log('data', data)
  return ret?.value?.data
}

export default responseUtil