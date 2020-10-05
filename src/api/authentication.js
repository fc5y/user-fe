import { get, post } from '../utils/fetchUtils';

export function apiLogin({ username, password }) {
  // TODO: Change this to use primary API
  if (!__USE_BACKUP_API__) {
    return post('', {}, { withCredentials: true });
  } else {
    return post('http://54.254.71.192:3004/api/v1/login', { username, password }, {}, true);
  }
}

export function apiSignup({ username, password, extra }) {
  if (__USE_BACKUP_API__) {
    return post(
      'http://54.254.71.192:3004/api/v1/signup',
      { username, password, extra: JSON.stringify(extra) },
      {},
      true,
    );
  }

  // TODO: Change this to use primary API
  // return post('', {}, { withCredentials: true });
  return {};
}

export function apiGetUserInfo(token) {
  // TODO: Change this to use primary API
  if (!__USE_BACKUP_API__) {
    return get('', { withCredentials: true });
  } else {
    return get(
      'http://54.254.71.192:3004/api/v1/user-info',
      { headers: { Authorization: `Bearer ${token}` } },
      true,
    );
  }
}

export function apiLogout() {
  // TODO: Change this to use primary API
  return post('', {}, { withCredentials: true });
}
