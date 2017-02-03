const config = {
  dev: {
    mongoUri: 'mongodb://localhost/practice',
  },
  prod: {
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config.prod;
} else {
  module.exports = config.dev;
}
