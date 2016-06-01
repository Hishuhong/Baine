var path = require('path');
var containerPath = path.resolve('./');

//	别名
var alias = {
  'env': path.resolve(containerPath + '/app/util/env'),
  'log':path.resolve(containerPath + '/app/util/log')
};

module.exports = alias;
