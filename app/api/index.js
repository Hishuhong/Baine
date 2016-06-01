var router = require('koa-router')();
var SignC = require('../controller/sign/index');
var SignoutC = require('../controller/signout/index');

router.prefix('/api');
// router.post('/sign',SignC);
// router.get('/signout',SignoutC);

module.exports = router;
