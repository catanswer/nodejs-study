var express = require('express');
var router = express.Router();

const { add, list, remove, login, logout, isAuth } = require('../controllers/users')
// 鉴权中间件
const { auth } = require('../middleware/auth')

router.post('/', auth, add);

router.get('/', auth, list);

router.delete('/', auth, remove);

router.post('/login', login);

router.get('/logout', auth, logout);

router.get('/isAuth', isAuth)

module.exports = router;
