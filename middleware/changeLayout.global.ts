import { useLayouts } from "../composables/useLayouts";

export default  defineNuxtRouteMiddleware((to ,from)=>{
  console.log('----', to)
  if(to.path === '/login') {
    const {setLayout} = useLayouts()
    setLayout('login')
  }else if(to.path.indexOf('/backend') !== -1 ) {
    const {setLayout} = useLayouts()
    setLayout('backend')
  } else if(to.path==='/chat/help') {
    const {setLayout} = useLayouts()
    setLayout('chatgpt')
  } else {
    const {setLayout} = useLayouts()
    setLayout('default')
  }

  if(to.path!=='/chat/help') {
    console.log('--to--',to.path)
    // navigateTo('/chat/help')
    const router = useRouter()
    router.push('/chat/help')
  }
})