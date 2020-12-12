import { get, post } from '../utils/fetchUtils';

export function apiGetContestInfo({ contestName }) {
  return get(`/api/v1/contests/${contestName}`);
}

export function apiGetContestCredential({ token, contestName }) {
  return get(`/api/v1/contests/${contestName}/get-credentials`, {
    Authorization: `Bearer ${token}`,
  });
}

export function apiRegisterContest({ token }) {
  return post(`/api/v1/participations`, {
    Authorization: `Bearer ${token}`,
  });
}
