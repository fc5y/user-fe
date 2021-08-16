import { get } from '../utils/fetchUtils';

export function apiGetContestCredential({ contestName }) {
  return get(`/api/v2/contests/${contestName}/get-credentials`);
}
