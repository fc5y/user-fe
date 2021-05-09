module.exports = () => {
  switch (process.env.ENV.toLowerCase()) {
    case 'prod':
      return require('./webpack.prod');
    default:
      return require('./webpack.dev');
  }
};
