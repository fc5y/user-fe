const PROXY_SERVER = 'https://tolohl0rz9.execute-api.us-east-2.amazonaws.com';

// TODO: change this to https after setting SSL
const BASE_URL = {
  dev: 'http://test.fyt.freecontest.net',
  prod: 'http://fyt.freecontest.net',
};

const META_TAG = {
  image_url: 'http://kc97ble.fun/fyt-public/fyt-code-cup.jpg',
};

const proxyList = {
  '/api': {
    target: PROXY_SERVER,
    secure: false, // For testing only
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};

module.exports = { proxyList, BASE_URL, META_TAG };
