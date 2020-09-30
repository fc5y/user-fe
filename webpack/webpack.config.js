module.exports = () => {
  return require(`./webpack.${process.env.ENV.toLowerCase()}.js`);
};
