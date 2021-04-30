const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const urlStr = req.url
  let urlObj = url.parse(urlStr, true)
  switch (urlObj.pathname) {
    case '/api/data':
      res.writeHead(200, {
        "content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": '*'
      })
      res.write('{ "state": 0, "message": "成功", "data": "ysh" }')
      break
    default:
      res.write('page not found')
  }

  res.end()
})

server.listen(8080, () => {
  console.log('localhost:8080')
})