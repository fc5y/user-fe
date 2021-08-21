const API_DOMAIN = {
  dev: 'https://test.be.freecontest.net',
  test: 'https://test.be.freecontest.net',
  prod: 'https://be.freecontest.net',
};

/**
 * Util to get the full API URL base on ENV
 * @param {string} url
 * @param {string} env
 */
export const getFullApiUrl = (url, env = __ENV__) => {
  if (!url || !env) return '';
  if (!Object.keys(API_DOMAIN).includes(env.toLowerCase())) return url;

  // For localhost, using proxy from webpack
  if (env.toLowerCase() === 'dev') {
    return url;
  }

  return `${API_DOMAIN[env.toLowerCase()]}${url}`;
};

/**
 * Util to check if the given url is absolute
 * @param {strin} url
 */
export const isAbsoluteURL = (url) => {
  try {
    new URL(url);
    return true;
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
    formattedRoute = formattedRoute.replace(`:${key}`, encodeURIComponent(options[key]));
  });
  return formattedRoute;
};

/**
 * Parse a query string into object
 * @param {*} query
 */
export const parseUrlQuery = (query) => {
  if (!query || !query.startsWith('?')) {
    return {};
  }

  const res = {};
  query
    .slice(1)
    .split('&')
    .forEach((q) => {
      if (!q || !q.includes('=')) return;

      const [key, val] = q.split('=');
      res[key] = decodeURIComponent(val);
    });

  return res;
};

/**
 * Convert object to query string
 * @param {obj} obj
 */
export const objectToUrlQuery = (obj) => {
  if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
    return '';
  }

  let query = '?';
  Object.keys(obj).forEach((k, idx) => {
    if (obj[k] !== undefined) {
      query += `${idx !== 0 ? '&' : ''}${k}=${encodeURIComponent(obj[k])}`;
    }
  });

  return query;
};
