module.exports = () => {
  switch (process.env.ENV.toLowerCase()) {
    case 'dev':
      return require('./webpack.dev');
    default:
      return require('./webpack.prod');
  }
};
