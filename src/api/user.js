import { get, post } from '../utils/fetchUtils';

export function apiGetMyUserInfo({ token }) {
  return get(
    `/api/v1/me`,
    { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' },
    true,
  );
}

export function apiGetUserInfo({ token, username }) {
  return get(
    `/api/v1/users/${username}`,
    { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' },
    true,
  );
}

export function apiChangeUserPassword({ currentPassword, newPassword }) {
  return post('/api/v1/me/change-password', {
    old_password: currentPassword,
    new_password: newPassword,
  });
}
