/* eslint-disable no-unneeded-ternary */
import { get } from '../utils/fetchUtils';

export function apiGetContestInfo({ token, contestName }) {
  return get(`/api/v1/contests/${contestName}`, {
    Authorization: `Bearer ${token}`,
  });
}

export function apiGetContestCredential({ token, contestName }) {
  return get(`/api/v1/contests/${contestName}/get-credentials`, {
    Authorization: `Bearer ${token}`,
  });
}
