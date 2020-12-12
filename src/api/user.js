import { get } from '../utils/fetchUtils';

export function apiGetUserInfo(token) {
  return get(
    '/api/v1/user',
    { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' },
    true,
  );
}
