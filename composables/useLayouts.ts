import { useState } from "nuxt/app";

type Layouts = 'default' | 'login' | 'backend' | 'chatgpt'

export const useLayouts = () => {
  let layout = useState<Layouts>('layout', () => {
    return 'default'
  })
  const setLayout = (val: Layouts) => {
    layout.value = val
  }
  return {
    layout,
    setLayout
  }
}