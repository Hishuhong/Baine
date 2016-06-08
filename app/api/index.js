var router = require('koa-router')();
var CNodeAccesstoken = require('../controller/OAuth/cnode');

router.prefix('/api');
router.post('/accesstoken',CNodeAccesstoken);

module.exports = router;
