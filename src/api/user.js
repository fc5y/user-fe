import { get } from '../utils/fetchUtils';

export function apiGetUserInfo({ username }) {
  return get(`/api/v2/users/${username}`);
}

export function apiGetParticipations({ username, offset, limit }) {
  return get(`/api/v2/users/${username}/participations?offset=${offset}&limit=${limit}`, {});
}
