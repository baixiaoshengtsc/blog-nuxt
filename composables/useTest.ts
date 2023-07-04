import {ref} from 'vue'
type ApiListModel2 = 'api'|'api2'
interface ApiListModel {
  api: string,
  api2: string,
  [propName:string]: string | ApiListModel2
}
export const useTest = () => {
  const ret:Record<string, any> = ref<Record<keyof ApiListModel, any>>({
    api: '/test',
    api2: 2,
    1: "1"
  })
  return ret
}
const ret:ApiListModel = {
  api: '1',
  api2: '2',
  '1': 'api'
}