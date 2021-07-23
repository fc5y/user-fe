import { get } from '../utils/fetchUtils';

export function apiGetTimestamp() {
  return get('https://test.be.freecontest.net/db/v2/timestamp');
}
