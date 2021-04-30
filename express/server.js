const path = require('path')
const express = require('express')
const app = express()

// 使用art-template模板引擎
app.engine('art', require('express-art-template'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
  escape: false
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

// 内置静态资源中间件
app.use(express.static('./public'))

const router = require('./router/index')
app.use('/', router)


app.listen(8080, () => {
  console.log('localhost:8080')
})
