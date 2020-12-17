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
  return post(
    '/api/v1/me/change-password',
    {
      old_password: currentPassword,
      new_password: newPassword,
    },
    {
      Authorization: `Bearer ${token}`,
    },
  );
}

export function apiUpdateUserInfo({ fullname, school, token }) {
  return post(
    '/api/v1/me',
    {
      full_name: fullname,
      school_name: school,
    },
    {
      Authorization: `Bearer ${token}`,
    },
  );
}
