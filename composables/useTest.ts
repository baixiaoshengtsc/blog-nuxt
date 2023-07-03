import {ref} from 'vue'
export const useTest = () => {
  const ret:Record<string, any> = ref<Record<string, any>>({
    api: '/test',
    api2: 2,
    1: "1"
  })
  return ret
}

const ret:Record<string, any> = {
  api: 1,
  1: 1
}