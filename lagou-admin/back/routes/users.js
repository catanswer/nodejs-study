var express = require('express');
var router = express.Router();

const { add, list, remove } = require('../controllers/users')

router.post('/', add);

router.get('/', list);

router.delete('/', remove);

module.exports = router;
