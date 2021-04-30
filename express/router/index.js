const express = require('express')
const { getList } = require('../controller/index')

// 路由中间件
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('home')
})

router.get('/api/list', getList)

// get: 获取数据
router.get('/index', (req, res, next) => {
  const query = req.query
  res.send(query)
})

// post: 添加数据（form格式的数据）
router.post('/index-form', (req, res, next) => {
  const formData = req.body
  console.log('formData: ', formData)
  res.send(formData)
})

// post: 添加数据（json格式的数据）
router.post('/index-json', (req, res, next) => {
  const jsonData = req.body
  console.log('jsonData: ', jsonData)
  res.send(jsonData)
})

// put: 修改数据（覆盖式修改）
router.put('/index', (req, res, next) => {
  const formData = req.body
  console.log('formData: ', formData)
  res.send('put response')
})

// patch: 修改数据（局部式修改）
router.patch('/index', (req, res, next) => {
  res.send('patch response')
})

// delete: 删除数据
router.delete('/index', (req, res, next) => {
  res.send('delete response')
})

router.all('/index', (req, res, next) => {
  res.send('all')
})

module.exports = router
