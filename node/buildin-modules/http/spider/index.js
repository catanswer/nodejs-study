const http = require('http')
const https = require('https')
const cheerio = require('cheerio')

function filterData(data) {
  // console.log('data: ', data)
  const $ = cheerio.load(data)
  $('.section-item-box p').each((index, el) => {
    console.log('index: ', index)
    console.log('el: ', $(el).text())
  })
}

const server = http.createServer((req, res) => {
  let data = ''
  
  https.get('https://www.meizu.com', (result) => {
    result.on('data', chunk => {
      data += chunk
    })
    result.on('end', () => {
      filterData(data)
    })
  })
})

server.listen(8800, () => {
  console.log('localhost:8800')
})