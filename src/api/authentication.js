import { get, post } from '../utils/fetchUtils';

export function apiLogin({ username, password }) {
  if (!__USE_BACKUP_API__) {
    return post('');
  } else {
    return post('http://54.254.71.192:3004/api/v1/login', { username, password }, {}, true);
  }
}

export function apiSignup({ username, password, extra }) {
  if (!__USE_BACKUP_API__) {
    return post('');
  } else {
    return post('http://54.254.71.192:3004/api/v1/signup', { username, password, extra }, {}, true);
  }
}

export function apiGetUserInfo(token) {
  if (!__USE_BACKUP_API__) {
    return get('');
  } else {
    return get(
      'http://54.254.71.192:3004/api/v1/user-info',
      { headers: { Authorization: `Bearer ${token}` } },
      true,
    );
  }
}
