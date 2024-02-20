module.exports = {
  apps: [
    {
      name: 'bxs_blog',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}