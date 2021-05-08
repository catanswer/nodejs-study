const { addUser, findOneUser, getUserList, removeUser } = require('../models/users')
const { bcryptHash, compare } = require('../utils/tools')

// 添加用户
const add = async (req, res, next) => {
  const { username, password } = req.body

  res.set('content-type', 'application/json; charset=utf-8')

  // 加密密码
  const bcryptPassword = await bcryptHash(password)

  // 判断已存在用户
  let findResult = await findOneUser(username)
  if (findResult) {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户已存在~'
      })
    })
  } else {
    const result = await addUser({
      username,
      password: bcryptPassword
    })

    res.render('success', {
      data: JSON.stringify({
        message: '添加成功~'
      })
    })
  }

}

// 获取用户列表
const list = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const list = await getUserList()

  res.render('success', {
    data: JSON.stringify(list)
  })
}

// 删除用户
const remove = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const { id } = req.body
  const result = await removeUser(id)
  if (result) {
    res.render('success', {
      data: JSON.stringify({
        message: '删除成功~'
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '删除失败~'
      })
    })
  }
}

// 登录
const login = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const { username, password } = req.body
  const result = await findOneUser(username)
  // 验证用户名是否存在
  if (result) {
    const { password: hash } = result
    const compareResult = compare(password, hash)
    // 验证密码是否正确
    if (compareResult) {
      // 设置session
      req.session.username = username

      res.render('success', {
        data: JSON.stringify({
          username,
          message: '登录成功~'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '密码错误~'
        })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '用户名错误~'
      })
    })
  }
}

// 退出登录
const logout = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  req.session = null
  res.render('success', {
    data: JSON.stringify({
      message: '退出登录成功~'
    })
  })
}

const isAuth = (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const username = req.session.username
  if (username) {
    res.render('success', {
      data: JSON.stringify({
        username
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录~'
      })
    })
  }
}

module.exports = {
  add,
  list,
  remove,
  login,
  logout,
  isAuth
}