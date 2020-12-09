/* eslint-disable no-unneeded-ternary */
import { get, post } from '../utils/fetchUtils';

export function apiLogin({ usernameOrEmail, password }) {
  return post('/api/v1/login', { email_or_username: usernameOrEmail, password });
}

export function apiSignup() {
  return post('/api/v1/signup', {});
}

export function apiGetUserInfo(token) {
  return get(
    '/api/v1/user',
    { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' },
    true,
  );
}
