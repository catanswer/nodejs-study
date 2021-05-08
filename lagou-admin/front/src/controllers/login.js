import loginTpl from '../views/login.art'

const loginHtml = loginTpl({})

const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault()
    const data = $('#login-form').serialize()
    $.ajax({
      url: '/api/users/login',
      type: 'post',
      data,
      success(res) {
        if (res.ret) {
          router.go('/index')
        } else {
          console.log(res.data.message)
        }
      }
    })
  }
}

export default (router) => {
  return (req, res, next) => {
    res.render(loginHtml)

    $('#login-form').on('submit', _handleSubmit(router))
  }
}