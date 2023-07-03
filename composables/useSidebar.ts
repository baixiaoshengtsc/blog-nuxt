import { useState } from "nuxt/app";
export const useSidebar = () => {
  let sidebarOut = useState<Boolean>('sidebarOut', () => {
    return true
  })
  const changeSidebarOut = () => {
    sidebarOut.value = !sidebarOut.value
  }
  return {
    sidebarOut,
    changeSidebarOut
  }
}