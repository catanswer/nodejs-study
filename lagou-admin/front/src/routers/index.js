import SMERouter from 'sme-router'

import login from '../controllers/login'
import index from '../controllers/index'

const router = new SMERouter('root')

// 路由中间件 = 路由守卫
router.use((req) => {
  // 初始化鉴权
  $.ajax({
    url: '/api/users/isAuth',
    success(res) {
      if (res.ret) {
        router.go('/index')
      } else {
        router.go('/login')
      }
    }
  })
})

router.route('/', () => {})

// 首页
router.route('/index', index(router))

// 登录
router.route('/login', login(router))

export default router