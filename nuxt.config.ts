/*
 * @Author: baixiaoshengtsc 485434766@qq.com
 * @Date: 2023-07-03 21:30:08
 * @LastEditors: baixiaoshengtsc 485434766@qq.com
 * @LastEditTime: 2025-02-06 17:13:07
 * @FilePath: \blog-nuxt\nuxt.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
import removeConsole from 'vite-plugin-remove-console'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
  ],
  css: [
    'assets/styles/global.less',
  ],
  vite: {
    plugins: [
      removeConsole()
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
    
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  nitro: {
    devProxy: {
      "/api/chat": {
        // target: "http://localhost:8060/api/chat",
        target: "https://www.studyandlive.ltd/api/chat",
        changeOrigin: true,
        // prependPath: true,
      },
      "/api": {
        target: "http://localhost:3001/api",
        changeOrigin: true,
        // prependPath: true,
      },
      "/img": {
        target: "http://localhost:3001/img",
        changeOrigin: true,
        // prependPath: true,
      },
    },
    // routeRules: {
    //   "/api/chat": {
    //     proxy: "http://localhost:8060/api/chat",
    //     // prependPath: true,
    //   },
    //   '/api/**': {
    //     proxy: 'http://localhost:3001/api/**',
    //   },
    //   '/img/**': {
    //     proxy: 'http://localhost:3001/img/**',
    //   },
    // }
  },
  // proxy: {
  //   // 假设你的 API 服务地址是http://api.example.com
  //   '/api/': {
  //     target: 'http://localhost:3001',
  //     // pathRewrite: {
  //     //   '^/api/': ''
  //     // },
  //     changeOrigin: true, // 如果后端 API 服务器需要设置 CORS，将此选项设置为 true
  //   }
  // },
})
