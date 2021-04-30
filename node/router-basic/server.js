const http = require('http')
const fs = require('fs')
const mime = require('mime')

http.createServer((req, res) => {
  // const urlStr = req.url
  // 最原始的
  // switch (urlStr) {
  //   case '/':
  //     res.end('hello')
  //     break
  //   case '/home':
  //     fs.readFile('./home.html', (err, data) => {
  //       res.end(data)
  //     })
  //     break
  //   case '/app.js':
  //     fs.readFile('./app.js', (err, data) => {
  //       res.end(data)
  //     })
  //     break
  //   case '/123.png':
  //     fs.readFile('./123.png', (err, data) => {
  //       res.end(data)
  //     })
  //     break
  //   default:
  //     res.end('page 404')
  //     break
  // }

  // 改造
  const urlStr = req.url
  // 过滤'/favicon.ico'
  if (urlStr === '/favicon.ico') return

  // 使用mime动态设置'content-type'
  const type = mime.getType(urlStr.split('.'[1]))
  res.writeHead(200, {
    'content-type': type
  })
  const file = fs.readFileSync(`.${urlStr}`)
  res.end(file)

}).listen(8080, () => {
  console.log('localhost:8080')
})