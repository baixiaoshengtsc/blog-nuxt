const {start, end} = useProgress()
export default defineNuxtPlugin((nuxtApp)=>{
  const router = useRouter()
  router.beforeEach((_, __, next)=>{
    start()
    next()
  })
  router.afterEach((_,__)=>{
    end()
  })
})