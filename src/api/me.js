import { get, post } from '../utils/fetchUtils';

export function apiRegisterContest({ contestName }) {
  return post(`/api/v2/me/participations/create`, {
    contest_name: contestName,
    is_hidden: false,
  });
}

export function apiGetMyUserInfo() {
  return get(`/api/v2/me`);
}

export function apiGetUserParticipations() {
  return get('/api/v2/me/participations?offset=0&limit=200');
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
