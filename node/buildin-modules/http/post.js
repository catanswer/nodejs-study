const http = require('http')
const querystring = require('querystring')

const options = {
  // protocol: 'http:',
  // hostname: '127.0.0.1',
  method: 'POST',
  port: 3000,
  path: '/data',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  }
}
const postData = querystring.stringify({
  name: 'ysh',
  age: 18,
  address: '阿斯达阿达哒哒哒哒sadsad啥的'
})

http.createServer((req, res) => {
  let data = ''

  const request = http.request(options, (result) => {
    // result.on('data', chunk => data = chunk)
    // result.on('on', () => {
    //   console.log('data: ', data)
    // })
  })
  request.write(postData)
  request.end()
  
  res.end('hello world')
}).listen(9090, () => {
  console.log('loaclhost:9090')
})