const path = require('path');
// META
const META_TAG = {
  image_url: '',
};

// CONSTANTS
const root = path.resolve(__dirname, '../');
const constants = {
  PUBLIC_PATH: path.join(root, 'build'),
  ASSETS_PATH: path.join(root, 'src', 'assets'),
  CONTENT_BASE: path.join(root, 'src'),
};

module.exports = { META_TAG, root, constants };
