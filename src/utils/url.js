const API_DOMAIN = {
  dev: 'https://test.api.freecontest.net',
  test: 'https://test.api.freecontest.net',
  prod: 'https://api.freecontest.net',
};

/**
 * Util to get the full API URL base on ENV
 * @param {string} url
 * @param {string} env
 */
export const getFullApiUrl = (url, env = __ENV__) => {
  if (!url || !env) return '';
  if (!Object.keys(API_DOMAIN).includes(env.toLowerCase())) return url;
  return `${API_DOMAIN[env.toLowerCase()]}${url}`;
};

export const isAbsoluteURL = (url) => {
  try {
    new URL(url);
  } catch {
    return false;
  }
};

export const isURLValid = (url) => {
  try {
    const urlObj = new URL(url);
    return !!urlObj.origin && !!urlObj.origin.endsWith('freecontest.net');
  } catch {
    return false;
  }
};
