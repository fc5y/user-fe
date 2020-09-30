import { API_DOMAIN } from './config';

export const getFullURL = (url, env) => {
  if (!url || !env) return '';
  if (!Object.keys(API_DOMAIN).includes(env.toLowerCase())) return url;

  // Patching /api/ to use webpack proxy in dev ENV
  if (env.toLowerCase() === 'dev') {
    return url.startsWith('/api') ? url : `/api${url}`;
  }

  return `${API_DOMAIN[env.toLowerCase()]}${url}`;
};
