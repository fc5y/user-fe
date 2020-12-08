const path = require('path');

// URL
const API_URL = {
  test: 'https://test.api.freecontest.net',
  prod: 'https://api.freecontest.net',
};
const PROXY_SERVER = '';

// META
const META_TAG = {
  image_url: '',
};

// PROXY
const proxyList = {
  '/api/**': {
    target: API_URL.test,
    secure: false, // For testing only
    changeOrigin: true,
  },
};

// CONSTANTS
const root = path.resolve(__dirname, '../');
const constants = {
  PUBLIC_PATH: path.join(root, 'build'),
  ASSETS_PATH: path.join(root, 'src', 'assets'),
  CONTENT_BASE: path.join(root, 'src'),

  __ENV__: process.env.ENV || 'prod',
  __GIT_SHA__: process.env.GIT_SHA || null,
};

module.exports = { proxyList, META_TAG, root, constants };
