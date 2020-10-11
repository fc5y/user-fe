const path = require('path');

// URL
const PROXY_SERVER = 'https://asia-east2-fyt-code-cup.cloudfunctions.net/api';

const FYT_BASE_URL = {
  dev: 'https://test.fyt.freecontest.net',
  prod: 'https://fyt.freecontest.net',
};

// META
const META_TAG = {
  image_url: 'http://kc97ble.fun/fyt-public/fyt-code-cup.jpg',
};

// PROXY
const proxyList = {
  '/api/**': {
    target: PROXY_SERVER,
    secure: false, // For testing only
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};

// CONSTANTS
const root = path.resolve(__dirname, '../');

module.exports = { proxyList, FYT_BASE_URL, META_TAG, root };
