const bcrypt = require('bcrypt')

// 加密密码
exports.bcryptHash = (myPlaintextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        if (err) {
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
  })
}

// 验证密码
exports.compare = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      resolve(result)
    })
  })
}