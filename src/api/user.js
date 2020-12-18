import { get, post } from '../utils/fetchUtils';

export function apiGetMyUserInfo({ token }) {
  return get(`/api/v1/me`, {
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Headers': '*',
  });
}

export function apiGetUserInfo({ username }) {
  return get(`/api/v1/users/${username}`);
}

export function apiChangeUserPassword({ currentPassword, newPassword, token }) {
  return post('/api/v1/me/change-password', {
    old_password: currentPassword,
    new_password: newPassword,
    Authorization: `Bearer ${token}`,
  });
}

// export function apiGetParticipations({ token, username, offset, limit }) {
// return get(`/api/v1/participations/${username}?offset=${offset}}&limit=${limit}`, {
export function apiGetParticipations({ token }) {
  return get('https://my-json-server.typicode.com/upi05/mock_API_for_Fc5y/participations', {
    Authorization: `Bearer ${token}`,
  });
}
