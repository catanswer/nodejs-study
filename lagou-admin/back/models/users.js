const { Users } = require('../utils/db.js')

const addUser = ({ username, password }) => {
  const users = new Users({
    username,
    password
  })
  return users.save()
}

const findOneUser = (username) => {
  return Users.findOne({ username })
}

const getUserList = () => {
  return Users.find().sort({ _id: -1 })
}

const removeUser = (id) => {
  return Users.findByIdAndDelete(id)
}

module.exports = {
  addUser,
  findOneUser,
  getUserList,
  removeUser
}