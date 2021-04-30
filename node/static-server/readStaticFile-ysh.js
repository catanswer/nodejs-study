const fs = require('fs')
const mime = require('mime')
const path = require('path')

function customReadFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        resolve('访问了一个文件夹，且文件夹中没有index.html文件')
      } else {
        resolve(data)
      }
    })
  })
}

async function readStaticFileYsh(filePath) {
  const ext = path.parse(filePath).ext
  const mimeType = mime.getType(ext) || 'text/html'
  let data
  if (fs.existsSync(filePath)) {
    if (ext) {
      data = await customReadFile(filePath)
    } else {
      data = await customReadFile(path.join(filePath, 'index.html'))
    }
  } else {
    data = '文件不存在~'
  }
  
  return {
    data,
    mimeType
  }
}

module.exports = readStaticFileYsh