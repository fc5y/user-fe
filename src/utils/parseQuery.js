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
