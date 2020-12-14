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

export function apiUpdateUserInfo({ fullname, school }) {
  return post('/api/v1/me', {
    full_name: fullname,
    school_name: school,
  });
}
