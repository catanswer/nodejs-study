const http = require('http')
const path = require('path')
const readStaticFileYsh = require('./readStaticFile-ysh')

const server = http.createServer(async (req, res) => {
  const urlStr = req.url
  const filePath = path.join(__dirname, './public', urlStr)
  
  const { data, mimeType } = await readStaticFileYsh(filePath)
  
  res.writeHead(200, {
    'content-type': `${mimeType};charset=utf-8`
  })
  res.write(data)
  res.end()
})

server.listen(9090, () => {
  console.log('localhost:9090')
})