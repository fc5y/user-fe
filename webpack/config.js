const PROXY_SERVER = 'https://asia-east2-fyt-code-cup.cloudfunctions.net/api';
const PROXY_SERVER_BACKUP = 'http://54.254.71.192:3004';

const FYT_BASE_URL = {
  dev: 'https://test.fyt.freecontest.net',
  prod: 'https://fyt.freecontest.net',
};

const META_TAG = {
  image_url: 'http://kc97ble.fun/fyt-public/fyt-code-cup.jpg',
};

const proxyList = {
  '/api/**': {
    target: PROXY_SERVER,
    secure: false, // For testing only
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};

module.exports = { proxyList, FYT_BASE_URL, META_TAG };
