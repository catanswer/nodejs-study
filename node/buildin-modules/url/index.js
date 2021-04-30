const log4js = require('log4js')
log4js.configure({
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
})
const logger = log4js.getLogger('cheese')
logger.level = 'debug'

const url = require('url')
const urlString = 'https://www.baidu.com:443/path/index.html?id=2#tag=3'
// parse: 解析url(已弃用)
logger.debug('url.parse', url.parse(urlString))

const urlObject = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=3',
  search: '?id=2',
  query: 'id=2',
  pathname: '/path/index.html',
  path: '/path/index.html?id=2',
  href: 'https://www.baidu.com:443/path/index.html?id=2#tag=3'
}
// format: 转换url
logger.debug('url.format', url.format(urlString))

// resolve: 操作（已弃用）
logger.debug('url.resolve', url.resolve('http://www.abc.com/a', '../'))
logger.debug('url.resolve', url.resolve('http://www.abc.com/a', '/b'))

// URLSearchParams: 获取url上的参数
const myUrl = new URL(urlString)
const urlParams = new URLSearchParams(myUrl.searchParams)
logger.debug('URLSearchParams: ', urlParams)
logger.debug('URLSearchParams - get: ', urlParams.get('id'))

// querystring: 解析格式化URL上的查询字符串
const querystring = require('querystring')
const query1 = 'id=2&name=ysh&from=杭州'
const query2 = 'id:2/name:ysh/from:杭州'
const query3 = { id: '2', name: 'ysh', from: '杭州' }
const query4 = 'id=2&name=ysh&from=%E6%9D%AD%E5%B7%9E'
logger.debug('querystring.parse: ', querystring.parse(query1))
logger.debug('querystring.parse: ', querystring.parse(query2, '/', ':'))
logger.debug('querystring.stringify: ', querystring.stringify(query3))
logger.debug('querystring.unescape: ', querystring.unescape(query4))

const newQuery = querystring.stringify(query3, null, null, {
  encodeURIComponent(string) {
    return querystring.unescape(string)
  }
})
logger.debug('newQuery: ', newQuery)

