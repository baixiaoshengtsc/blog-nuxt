import { useState } from "nuxt/app";
export const useBackSidebar = () => {
  let backSidebarOut = useState<Boolean>('backSidebarOut', () => {
    return true
  })
  const changeBackSidebarOut = () => {
    backSidebarOut.value = !backSidebarOut.value
  }
  return {
    backSidebarOut,
    changeBackSidebarOut
  }
}