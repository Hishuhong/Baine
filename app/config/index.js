var config = {
  scheme: 'release',
  connect: {
    beta: 'mongodb://127.0.0.1:27017/blog',
    release: 'mongodb://127.0.0.1:27017/blog'
  }
};

if (process.env.NODE_ENV !== 'product') {
  config.scheme = 'beta';
}

module.exports = config;
