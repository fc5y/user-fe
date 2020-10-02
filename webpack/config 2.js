const PROXY_SERVER = 'https://tolohl0rz9.execute-api.us-east-2.amazonaws.com';

const proxyList = {
  '/api': {
    target: PROXY_SERVER,
    secure: false, // For testing only
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};

module.exports = { proxyList };
