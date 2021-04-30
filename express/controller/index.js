const getList = (req, res, next) => {
  // let data = '<ul>'
  // for (let i = 0; i < 100; i++) {
  //   data += `<li>line ${i}</li>`
  // }
  // data += '</ul>'
  // res.send(data)

  let dataArray = []
  for (let i = 0; i < 100; i++) {
    dataArray.push('line' + i)
  }
  // res.set({ 'content-type': 'application/json;charset=utf-8'})
  // 使用模板
  // res.render('list.art', {
  //   data: JSON.stringify(dataArray)
  // })
  res.render('list-html.art', {
    data: dataArray
  })
}

module.exports = {
  getList
}