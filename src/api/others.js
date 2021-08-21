import { get } from '../utils/fetchUtils';

export function apiGetServerTime() {
  return get(`/api/v2/timestamp`);
}
