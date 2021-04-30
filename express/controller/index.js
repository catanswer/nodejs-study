const path = require('path')
const template = require('art-template')
const fs = require('fs')

const { data } = require('../model/list')

const getList = (req, res, next) => {
  // let data = '<ul>'
  // for (let i = 0; i < 100; i++) {
  //   data += `<li>line ${i}</li>`
  // }
  // data += '</ul>'
  // res.send(data)

  
  // res.set({ 'content-type': 'application/json;charset=utf-8'})
  // 使用模板
  // res.render('list.art', {
  //   data: JSON.stringify(dataArray)
  // })

  // res.render('list-html.art', {
  //   data: dataArray
  // })

  // 读取模板文件
  const html = template(path.resolve(__dirname, '../views/list-html.art'), {
    data
  })
  // 写入到静态资源目录中
  fs.writeFileSync(path.join(__dirname, '../public/list.html'), html)
  res.send()
}

module.exports = {
  getList
}