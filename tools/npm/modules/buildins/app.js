// 内置的包

const path = require('path')

// __dirname: 当前代码所在的物理路径
// console.log('__dirname: ', __dirname)

// 解析操作路径
console.log(path.resolve(__dirname, '../'))