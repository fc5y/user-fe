import { get } from '../utils/fetchUtils';

export function apiGetContestCredential({ token, contestName }) {
  return get(`/api/v1/participations/${contestName}/cred`, {
    Authorization: `Bearer ${token}`,
  });
}
