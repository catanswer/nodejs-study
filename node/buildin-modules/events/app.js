const EventEmitter = require('events')

class MyEvent extends EventEmitter {

}

const myEvent = new MyEvent()
// 定义事件
myEvent.on('play1', (value) => {
  console.log('value: ', value)
})
myEvent.on('play2', (value) => {
  console.log('value: ', value)
})
myEvent.once('play3', (value) => {
  console.log('value: ', value)
})

// 触发事件
myEvent.emit('play1', 'movie1')
myEvent.emit('play2', 'movie2-1')
myEvent.emit('play2', 'movie2-2')
myEvent.emit('play2', 'movie2-3')
myEvent.emit('play3', 'movie3')
