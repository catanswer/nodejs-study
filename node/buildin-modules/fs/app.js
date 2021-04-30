const fs = require('fs')

  // 创建文件夹
  // fs.mkdir('logs', (err) => {
  //   if (err) throw err

  //   console.log('文件夹创建成功！')
  // })

  // 修改文件夹的名称
  // fs.rename('./logs', './log', () => {
  //   console.log('文件夹名字修改成功！')
  // })

  // 删除文件夹
  // fs.rmdir('./log', () => {
  //   console.log('文件夹删除成功！')
  // })

  // 读取文件夹
  // fs.readdir('./logs', (err, result) => {
  //   console.log('result: ', result)
  // })

  // 写文件（会覆盖原始内容）
  // fs.writeFile('./logs/log1.log', 'hello\nworld', (err) => {
  //   console.log('done~')
  // })

  // 修改(追加)文件内容
  // fs.appendFile('./logs/log1.log', 'hello world!!!', (err) => {
  //   console.log('done~')
  // })

  // 删除文件
  // fs.unlink('./logs/log1.log', () => {
  //   console.log('删除文件成功！')
  // })

  // 读取文件内容
  // fs.readFile('./logs/log1.log', 'utf-8', (err, content) => {
  //   // 内容是Buffer格式的流
  //   console.log('content: ', content)
  // })
  // fs.readFile('./logs/log1.log', (err, content) => {
  //   console.log('content: ', content.toString())
  // })


  // 异步
  // fs.readFile('./logs/log1.log', (err, content) => {
  //   console.log('content async: ', content.toString())
  // })
  // 同步
  // const content = fs.readFileSync('./logs/log1.log')
  // console.log('content sync: ', content.toString())
  // console.log('continue...')

  // 从nodejs10版本开始 引入了Promise的方式
  // const fsPromise = require('fs').promises
  // ;(async () => {
  //   const data = await fsPromise.readFile('./logs/log1.log')
  //   console.log('data: ', data.toString())
  // })()

  // for (let i = 0; i < 10; i++) {
  //   fs.writeFile(`./logs/log-${i}.log`, `log-${i}`, (err) => {
  //     if (err) throw err
  //     console.log('done~')
  //   })
  // }

  // 循环遍历目录
// function readDir(dir) {
//   fs.readdir(dir, (err, data) => {
//     if (err) throw err
//     data.forEach(item => {
//       let joinDir = `${dir}/${item}`
//       fs.stat(joinDir, (err, stats) => {
//         if (stats.isDirectory()) {
//           readDir(joinDir)
//         } else {
//           fs.readFile(joinDir, 'utf-8', (err, data) => {
//             if (err) throw err
//             console.log('data: ', data);
//           })
//         }
//       })
//     })
//   })
// }
// readDir('./logs')

// watch文件
// fs.watch('./logs/log-0.log', (eventType, filename) => {
//   console.log('eventType: ', eventType)
//   console.log('filename: ', filename)
//   console.log('file has changed~')
// })
// fs.watchFile('./logs/log-0.log', (current, previous) => {
//   console.log('🚀 ~ file: app.js ~ line 101 ~ fs.watchFile ~ current', current)
//   console.log('🚀 ~ file: app.js ~ line 101 ~ fs.watchFile ~ previous', previous)
  
// })

// 流操作
// const { createGzip } = require('zlib')
// const { pipeline } = require('stream');
// const {
//   createReadStream,
//   createWriteStream
// } = require('fs');

// const gzip = createGzip()

// const readStream = createReadStream('./logs/log-0.log')
// const writeStream = createWriteStream('./logs/log-0.gz')

// pipeline(readStream, gzip, writeStream, (err) => {
//   if (err) {
//     console.error('发生错误:', err)
//     process.exitCode = 1
//   }
// })


// readline
// const readline = require('readline')

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// rl.question('你如何看待 Node.js 中文网？', (answer) => {
//   // 将答案记录在数据库中。
//   console.log(`感谢您的宝贵意见：${answer}`)

//   rl.close()
// })


// Crypto
const cypto = require('crypto')
const psw = 'abc123'

const hash = cypto.createHash('md5', 'ysh')
.update(psw, 'utf-8')
.digest('hex')

console.log('hash: ', hash)