const path = require('path')
const fs = require('fs')
const mime = require('mime')

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

async function readStaticFile(filePathName, res) {
  const ext = path.parse(filePathName).ext
  const mimeType = mime.getType(ext) || 'text/html'
  let data

  // 判断文件是否存在
  if (fs.existsSync(filePathName)) {
    // 判断是文件还是文件夹
    if (ext) {
      data = await customReadFile(filePathName)
    } else {
      // 文件夹 默认返回文件下的index.html
      data = await customReadFile(path.join(filePathName, 'index.html'))
    }

  } else {
    data = 'file not found~'
  }

  return {
    mimeType,
    data
  }
}

module.exports = readStaticFile