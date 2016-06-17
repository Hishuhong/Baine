var path = require('path');
var koa = require('koa');
var logger = require('koa-logger');
var onerror = require('koa-onerror');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var apis = require('./api/index');
var mongoose = require('mongoose');
var resource = require('koa-static');
var app = koa();
var config = require('./config/');
var winstonLogger = require('./logger/');
var ROOTPATH = path.resolve('.');

mongoose.connect(config.connect[config.scheme]);
mongoose.connection.on('error',console.error.bind(console,'连接数据库失败'));

app.env = process.env.NODE_ENV || 'development';
if (app.env === 'development') {
  app.use(logger());
	app.use(resource(path.resolve(ROOTPATH,'public/www/')));
}
onerror(app);
app.use(gzip());
app.use(bodyParser());
app.use(apis.routes());
app.use(apis.allowedMethods());
app.listen(3000);

winstonLogger.info('root path ',ROOTPATH);
