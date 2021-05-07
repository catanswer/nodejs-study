### npm的常用命令
```bash
  # 初始化
  npm init -y

  # 安装
  npm install [package] --golbal / -g
  npm i [package] --save-dev / -D
  npm i [package] --save / -S / 
  # 安装指定版本的依赖
  npm i vue@2.6.0
  # 安装远程库（github、gitee等）上的包
  npm i git+ssh://git@github.com/xxx/xxx

  # 卸载
  npm uninstall [package]
  
  # 只安装dependencies下的依赖
  npm i --production

  # 查看依赖
  npm list

  # 查看指定依赖的信息（版本等）
  npm view vue versions

  # 查看当前包中过期的
  npm outdated

  # 更新依赖
  npm update [package]

  # 强制清除缓存
  npm cache clean --force
```

### 版本号前缀符
例：1.13.2
1. 主版本号major: 1
2. 次版本号minor: 13
3. 补丁patch: 2

- ^: 锁定主版本号，后续版本获取最新的
- ~: 锁定主次版本号
-  : 锁定具体的版本号
- *: 最新版本

### node版本管理
```bash
# 安装
npm i nvm -g

# 查看当前已安装的nodejs的列表
nvm list

# 使用指定的node版本
nvm use [version]
```

### npm源操作
```bash
# 查看当前源
npm config get registry

# 切换源
npm config set registry https://registry.npm.taobao.org
```
安装`nrm`管理源
```bash
# 安装
npm i nrm -g

# 查看
nrm ls

# 测试各个源的速度
nrm test

# 设置
nrm use xxx
```
这里需要注意的是， 在刚安装完`nrm`，直接运行可能会报错（在windows电脑是这样的），这是需要点击报错行，进入到`nrm/cli.js`，将弟17行，修改为:
```js
const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
```

### 发布自己的npm包
1. 在`npm`上注册账号
2. 在项目中添加用户
```bash
npm adduser
```
3. 上传包
```bash
npm publish
```

### 配置npm脚本
- 基础的用法
```json
{
  "scripts": {
    "dev": "node ./scripts/script1.js && node ./scripts/script2.js"
  }
} 
```
- 设置参数
```json
{
  "config": {
    "custom": "production"
  }
}
```
在项目中使用定义的变量
```js
process.env.npm_package_config_custom
```
在scripts脚本中使用变量
```json
{
  "scripts": {
    "custom": "echo $npm_package_config_custom"
  }
}
```

### cross-env的使用
- 安装
```bash
npm i cross-env -D
```
- 配置
```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development xxxxx",
    "build": "cross-env NODE_ENV=production webpack xxxxx"
  }
}
```

### npx
npm从`5.2`版本开始引入`npx`
- 直接运行包
```bash
# 全局没有gulp 本地有的话会直接运行，如果本地也没有的话，会先安装（临时文件夹中）再执行
npx gulp -v
```
- 设置参数
```bash
# 本地没有的话，不进行安装
npx --no-install http-server
```
```bash
# 直接安装线上安装 忽略本地的版本
npx --ignore-existing http-server
```
### node浏览器调试
```bash
node --inspect --inspect-brk server.js
```
### node进程管理工具
- supervisor
- nodemon
- forever
- pm2


### fs文件系统
1. 文件夹的操作
```js
const fs = require('fs')

// 创建
fs.mkdir('./logs', (err) => {
  if (err) throw err
  console.log('文件夹创建成功~')
})
// 修改名称
fs.rename('./logs', (err) => {
  if (err) throw err
  console.log('文件夹名称修改成功~')
})
// 删除
fs.rmdir('./logs', (err) => {
  if (err) throw err
  console.log('文件夹删除成功~')
})
// 读取
fs.readdir('./logs', (err, data) => {
  if (err) throw err
  console.log('data', data)
})
```
2. 文件操作
```js
const fs = require('fs')

// 写入文件
fs.writeFile('./logs/log1.log', 'hello world', (err) => {
  if (err) throw err
  console.log('done~')
})
// 追加内容
fs.appendFile('./logs/log1.log', 'catanswer', (err) => {
  if (err) throw err
  console.log('done~')
})
// 删除
fs.unlink('./logs/log1.log', (err) => {
  if (err) throw err
  console.log('done~')
})
// 读取
fs.readFile('./logs/log1.log', 'utf-8',(err, data) => {
  if (err) throw err
  console.log('data: ', data)
})

// 循环遍历目录
function readDir(dir) {
  fs.readdir(dir, (err, data) => {
    if (err) throw err
    data.forEach(item => {
      let joinDir = `${dir}/${item}`
      fs.stat(joinDir, (err, stats) => {
        if (stats.isDirectory()) {
          readDir(joinDir)
        } else {
          fs.readFile(joinDir, 'utf-8', (err, data) => {
            if (err) throw err
            console.log('data: ', data);
          })
        }
      })
    })
  })
}
```
3. 同步
上面的每个方法都是异步的，`nodejs`中都有对应的同步方法。以读取文件为例：
```js
const fs = require('fs')

const data = fs.readFileSync('logs/log1.log')
console.log('data: ', data.toString())
```
4. Promise
`nodejs`在`10`版本开始，添加了以`Promise`方式调用
```js
const fsPromise = require('fs').promises

async function openAndClose() {
  let filehanle
  try {
    filehandle = await fsPromise.open('thefile.txt', 'r')
  } finally {
    if (filehandle !== undefined) {
      await filehandle.close()
    }
  }
}
```
5. watch文件
```js
const fs = require('fs')
// watch方法存在系统兼容性问题，推荐使用watchFile方法
fs.watch('./logs/log-0.log', (eventType, filename) => {
  console.log('file has changed~')
})
```
6. 流操作 - zlib压缩
```js
const { createGzip } = require('zlib')
const { pipeline } = require('stream');
const {
  createReadStream,
  createWriteStream
} = require('fs');

const gzip = createGzip()

const readStream = createReadStream('./logs/log-0.log')
const writeStream = createWriteStream('./logs/log-0.gz')

pipeline(readStream, gzip, writeStream, (err) => {
  if (err) {
    console.error('发生错误:', err)
    process.exitCode = 1
  }
})
```
7. readline 读取命令行中的数据
```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('你如何看待 Node.js 中文网？', (answer) => {
  // 将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`)

  rl.close()
})
```
8. Cyrpto 加密
```js
const cypto = require('crypto')
const psw = 'abc123'

const hash = cypto.createHash('md5', 'ysh')
.update(psw, 'utf-8')
.digest('hex')

console.log('hash: ', hash)
```

### 路由
1. 最原始的
```js
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  const urlStr = req.url

  switch (urlStr) {
    case '/':
      res.end('hello')
      break
    case '/home':
      fs.readFile('./home.html', (err, data) => {
        res.end(data)
      })
      break
    case '/app.js':
      fs.readFile('./app.js', (err, data) => {
        res.end(data)
      })
      break
    case '/123.png':
      fs.readFile('./123.png', (err, data) => {
        res.end(data)
      })
      break
    default:
      res.end('page 404')
      break
  }

}).listen(8080, () => {
  console.log('localhost:8080')
})
```
2. 改造
浏览器请求什么资源，就返回什么资源，相当于是一个静态资源服务器
```js
// 改造 
const http = require('http')
const fs = require('fs')
const mime = require('mime')

http.createServer((req, res) => {
  const urlStr = req.url
  // 过滤'/favicon.ico'
  if (urlStr === '/favicon.ico') return

  // 使用mime动态设置'content-type'
  const type = mime.getType(urlStr.split('.'[1]))
  res.writeHead(200, {
    'content-type': type
  })
  const file = fs.readFileSync(`.${urlStr}`)
  res.end(file)

}).listen(8080, () => {
  console.log('localhost:8080')
})
```
### Express
- 路由中间件
```js
const express = require('express')
// 抽离的controller层
const { getList } = require('../controller/index')

// 路由中间件
const router = express.Router()

router.get('/', getList)

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
```
```js
const express = require('express')
const app = express()

// 用来解析post请求获取到传输的数据
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

const router = require('./router/index')
app.use('/', router)

app.listen(8080, () => {
  console.log('localhost:8080')
})

```
- 模板引擎
1. ejs
2. pug
3. jade
4. art-template

### MongoDB
本地启动MongoDB服务
```bash
mongod -dbpath D:\MongoDB\data\db
```
使用`MongoDB Compass` 工具操作数据库

![Image text](/mongodb/images/mongodb.jpg)
![Image text](/mongodb/images/mongoDB-order.jpg)

- `collections` 常用操作
```bash
# 插入数据
db.test.insert({name: 'm1', age: 29 release: 'v1.0.0'})
# 同时插入多个
db.test.insert([{name: 'm1', age: 29, release: 'v1.0.0'}, {name: 'm2', age: 19, release: 'v2.0.0'}])

# 修改数据      （# 匹配条件 #数据操作符   #需要修改的内容 #若未匹配到则相当于插入操作 #匹配到多个是否只修改一个）
db.test.update({ name: 'm1'}, {$set: { release: 'v1.1.1' }, true, true})

# 删除一条数据
db.test.remove({name: 'm2'})
```
查询的一些操作
```bash
# 查询所有的collections
db.test.find()

# 查询去重数据
db.test.disinct('name')

# 查询name='m1'的数据
db.test.find({ name: 'm1' })

# 查询age > 22的数据；
# 大于：$gt  大于等于：$gte
# 小于：$lt  小于等于：$lte
db.test.find({ age: { $gt:22 } })
# 同时满足多个条件
db.test.find({ age: { $gte:22, $lte: 26 } })

# 使用正则匹配查询数据
# 查询name中包含‘mongo’的数据
db.test.find({ name: /mongo/ })
# 查询name中以‘mongo’开头的数据
db.test.find({ name: /^mongo/ })

# 查询时，隐藏数据的某些字段。在第二个参数中，将对应字段设置为0
db.test.find({}, { _id: 0, release: 0 })

# 查询指定列name的数据。和上面的设置方式类似
db.test.find({}, { name: 1 })
db.test.find({ age: { $gt: 25 } }, { name: 1, age: 1 })

# 排序
# 升序：1
# 降序：-1
db.test.find().sort({ age: 1 })

# 精准的查询
db.test.find({ name: 'm1', age: 29 })

# 分页查询
# 查询前五条数据
db.test.find().limit(5)
# 查询10条以后的数据
db.test.find().skip(10)
# 查询5-10条之间的数据
db.test.find().limit(10).skip(5)

# or条件
# 数组条件中满足一个即可
db.test.find({ $or: [{ age: 29 }, { age: 19 }] })

# 查询第一条数据
db.test.findOne()

# 查询结果的数量
db.test.find({ age: { $gt: 20 } }).count()
```

### Node.js项目
#### 前端（Frontend）
- 前端工程化环境：Webpack
- CSS预处理工具：Sass
- SPA：单页面应用
- 路由：SEM-Router
- UI组件库：BootStrap（AdminLTE）

#### 后端（Backend）
- Node.js
- Express
- MongoDB（Mongoose）