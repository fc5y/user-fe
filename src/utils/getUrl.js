const API_DOMAIN = {
  dev: 'https://test.api.freecontest.net',
  test: 'https://test.api.freecontest.net',
  prod: 'https://api.freecontest.net',
};

export const getFullURL = (url, env = __ENV__) => {
  if (!url || !env) return '';
  if (!Object.keys(API_DOMAIN).includes(env.toLowerCase())) return url;
  return `${API_DOMAIN[env.toLowerCase()]}${url}`;
};
