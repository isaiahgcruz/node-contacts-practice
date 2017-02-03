const config = {
  dev: {
    mongoUri: 'mongodb://localhost/practice',
  },
  prod: {
    mongoUri: 'mongodb://iseise:ise123@ds139969.mlab.com:39969/node-practice-db'
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = config.prod;
} else {
  module.exports = config.dev;
}
