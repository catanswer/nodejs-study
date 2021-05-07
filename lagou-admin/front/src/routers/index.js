import SMERouter from 'sme-router'

import login from '../controllers/login'
import index from '../controllers/index'

const router = new SMERouter('root')

// router.route('/', login(router))

// 首页
router.route('/index', index(router))

// 登录
router.route('/login', login(router))

export default router