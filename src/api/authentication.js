/* eslint-disable no-unneeded-ternary */
import { get, post } from '../utils/fetchUtils';

export function apiLogin({ username, password }) {
  // TODO: Change this to use primary API
  if (!__USE_BACKUP_API__) {
    return post(
      'https://asia-east2-fyt-code-cup.cloudfunctions.net/api/login',
      { username, password },
      {},
      true,
    );
  } else {
    return post('https://backdoor.freecontest.net/api/v1/login', { username, password }, {}, true);
  }
}

export function apiSignup({ username, password, extra }) {
  // if (__USE_BACKUP_API__) {
  //   return post(
  //     'https://backdoor.freecontest.net/api/v1/signup',
  //     { username, password, extra: JSON.stringify(extra) },
  //     {},
  //     true,
  //   );
  // }

  try {
    post(
      'https://backdoor.freecontest.net/api/v1/signup',
      { username, password, extra: JSON.stringify(extra) },
      {},
      true,
    );
  } catch (err) {
    console.log(err);
  }

  // TODO: Change this to use primary API
  // return post('', {}, { withCredentials: true });
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
  // TODO: Change this to use primary API
  if (!__USE_BACKUP_API__) {
    return get(
      'https://asia-east2-fyt-code-cup.cloudfunctions.net/api/users/me',
      { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' } },
      true,
    );
  } else {
    return get(
      'https://backdoor.freecontest.net/api/v1/user-info',
      { headers: { Authorization: `Bearer ${token}` } },
      true,
    );
  }
}

export function apiLogout() {
  // TODO: Change this to use primary API
  return post('', {}, { withCredentials: true });
}
