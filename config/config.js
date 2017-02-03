const config = {
  dev: {
  },
  prod: {
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config.prod;
} else {
  module.exports = config.dev;
}
