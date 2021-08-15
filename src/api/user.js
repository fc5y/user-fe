import { get, post } from '../utils/fetchUtils';

export function apiGetMyUserInfo() {
  return get(`/api/v2/me`);
}

export function apiGetUserInfo({ username }) {
  return get(`/api/v2/users/${username}`);
}

export function apiGetUserParticipations() {
  return get('/api/v2/users/me/participations');
}

export function apiChangeUserPassword({ currentPassword, newPassword }) {
  return post('/api/v2/me/change-password', {
    old_password: currentPassword,
    new_password: newPassword,
  });
}

export function apiUpdateUserInfo({ fullname, school }) {
  return post('/api/v2/me/update', {
    full_name: fullname,
    school_name: school,
  });
}

export function apiGetParticipations({ username, offset, limit }) {
  return get(`/api/v2/users/${username}/participations?offset=${offset}&limit=${limit}`, {});
}

export function apiUserParticipationsCreate({ contestName, isHidden }) {
  return post('/api/v2/me/participations/create', {
    contest_name: contestName,
    is_hidden: isHidden,
  });
}
