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

/**
 * Util to check if the given url is absolute
 * @param {strin} url
 */
export const isAbsoluteURL = (url) => {
  try {
    new URL(url);
  } catch {
    return false;
  }
};

/**
 * Util to check if given url is valid url (ends with "freecontest.net")
 * @param {string} url
 */
export const isURLValid = (url) => {
  try {
    const urlObj = new URL(url);
    return !!urlObj.origin && !!urlObj.origin.endsWith('freecontest.net');
  } catch {
    return false;
  }
};

/**
 * Util to inject path params into route
 * Ex: makeUrl('/api/:id/a', { id: "new" }) return '/api/new/a'
 * @param {string} route
 * @param {object} options
 */
export const makeUrl = (route, options) => {
  if (typeof options !== 'object') return route;
  let formattedRoute = route;
  Object.keys(options).forEach((key) => {
    formattedRoute = formattedRoute.replace(`:${key}`, options[key]);
  });
  return formattedRoute;
};
