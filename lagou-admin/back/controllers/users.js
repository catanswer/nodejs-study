const { addUser, findOneUser, getUserList, removeUser } = require('../models/users')
const { bcryptHash } = require('../utils/tools')

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

module.exports = {
  add,
  list,
  remove
}