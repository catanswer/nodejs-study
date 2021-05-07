import loginTpl from '../views/login.art'

const loginHtml = loginTpl({})

const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault()
    router.go('/index')
  }
}

export default (router) => {
  return (req, res, next) => {
    res.render(loginHtml)

    $('#login').on('submit', _handleSubmit(router))
  }
}