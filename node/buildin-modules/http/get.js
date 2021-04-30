const logger = require('../../../utils/logger.js')

const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // debugger
  const url = req.url

  let data = ''
  req.on('data', chunk => {
    data = chunk
  })
  req.on('end', () => {
    res.writeHead(200, {
      'content-type': 'application/json;charset=utf-8'
    })
    // logger.debug('data: ', data)
    // res.write(`{"url": "${url}"}`)
    res.write(JSON.stringify(querystring.parse(data)))
    res.end()
  })

})

server.listen(9090, () => {
  console.log('localhost:9090')
})
