const PROXY_SERVER = 'https://tolohl0rz9.execute-api.us-east-2.amazonaws.com';
const PROXY_SERVER_BACKUP = 'http://54.254.71.192:3004';

// TODO: change this to https after setting SSL
const BASE_URL = {
  dev: 'http://test.fyt.freecontest.net',
  prod: 'http://fyt.freecontest.net',
};

const META_TAG = {
  image_url: 'http://kc97ble.fun/fyt-public/fyt-code-cup.jpg',
};

// NOTE: Only change this when the test is ready
const __IS_CONTEST_READY__ = false;
const __USE_BACKUP_API__ = true;

const proxyList = {
  '/api/**': {
    target: PROXY_SERVER,
    secure: false, // For testing only
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};

module.exports = { proxyList, BASE_URL, META_TAG, __IS_CONTEST_READY__, __USE_BACKUP_API__ };
