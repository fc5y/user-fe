/**
 * Parse a query string into object
 * @param {*} query
 */
const parseQuery = (query) => {
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
      res[key] = val;
    });

  return res;
};

export { parseQuery };

/**
 * Convert object to query string
 * @param {obj} obj
 */
export const objectToQuery = (obj) => {
  if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
    return '';
  }

  let query = '?';
  Object.keys(obj).forEach((k, idx) => {
    if (obj[k] !== undefined) {
      query += `${idx !== 0 ? '&' : ''}${k}=${obj[k]}`;
    }
  });

  return query;
};
