// 文件读写

const fs = require('fs')

// 写文件
fs.writeFile('./test.txt', 'hello world', (err, data) => {
  if (err) {
    console.log('文件创建失败: ' + err)
  } else {
    console.log('文件创建成功！')
  }
})

// 读文件
fs.readFile('./test.txt', (err, data) => {
  if (err) {
    console.log('文件读取失败: ' + err)
  } else {
    console.log('文件读取成功: ' + data)
  }
})
