import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });

export const useProgress = () => {
  const start = () => {
    NProgress.start()
  }
  const end = () => {
    NProgress.done()
  }
  return { start, end }
}