const http = require('http')
const url = require('url')
const { createProxyMiddleware } = require('http-proxy-middleware')

const server = http.createServer((req, res) => {
  const urlStr = req.url
  switch (true) {
    case /\/j/.test(urlStr):
      const apiProxy = createProxyMiddleware('/j', {
        target: 'https://movie.douban.com',
        changeOrigin: true,

      })
      // 在nodejs中使用http-proxy-middleware的方法
      apiProxy(req, res)
      break
  }
})

server.listen(8080, () => {
  console.log('localhost:8080')
})