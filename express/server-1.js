const express = require('express')

const app = express()

const middleWares = [
  (req, res, next) => {
    console.log('1')
    next()
  }, (req, res, next) => {
    console.log('2');
    // res.send('/')
    next()
  }
]

app.use(middleWares)

app.use('/', (req, res) => {
  console.log('/~')
  res.send('/~')
})

app.use('/api', (req, res, next) => {
  console.log('/api~')
  res.send('/api~')
})

app.use('/ajax', (req, res) => {
  console.log('/ajax~')
  res.send('/ajax')
})




app.listen(8080, () => {
  console.log('localhost:8080')
})
