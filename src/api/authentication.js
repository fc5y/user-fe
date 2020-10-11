/* eslint-disable no-unneeded-ternary */
import { get, post } from '../utils/fetchUtils';

export function apiLogin({ username, password }) {
  return post(
    'https://asia-east2-fyt-code-cup.cloudfunctions.net/api/login',
    { username, password },
    {},
    true,
  );
}

export function apiSignup({ username, password, extra }) {
  return post(
    'https://asia-east2-fyt-code-cup.cloudfunctions.net/api/register',
    {
      username,
      password,
      email: extra.email,
      fullname: extra.fullname,
      address: extra.address,
      school: extra.school,
      officialContestant:
        !!extra.officialContestant && extra.officialContestant.toLowerCase() === 'official',
      officialStudent: !!extra.officialStudent && extra.officialStudent.toLowerCase() === 'yes',
    },
    {},
    true,
  );
}

export function apiGetUserInfo(token) {
  return get(
    'https://asia-east2-fyt-code-cup.cloudfunctions.net/api/users/me',
    { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' } },
    true,
  );
}

export function apiGetTime() {
  return get('https://asia-east2-fyt-code-cup.cloudfunctions.net/api/time', {}, true);
}
