const auth = (req, res, next) => {
  const username = req.session.username
  if (username) {
    next()
  } else {
    res.render('fail', {
      data: JSON.stringify({
        message: '请登录~'
      })
    })
  }
}

exports.auth = auth