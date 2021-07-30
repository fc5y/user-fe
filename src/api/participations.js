import { get } from '../utils/fetchUtils';

export function apiGetContestCredential({ token, contestName }) {
  return get(`/api/v2/contests/${contestName}/get-credentials`, {
    Authorization: `Bearer ${token}`,
  });
}
