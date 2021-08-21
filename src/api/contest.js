import { get, post } from '../utils/fetchUtils';
import { objectToUrlQuery } from '../utils/url';

export function apiGetContestInfo({ contestName }) {
  return get(`/api/v2/contests/${contestName}`);
}

export function apiGetAllContestsInfo({ offset, limit }) {
  return get(`/api/v2/contests${objectToUrlQuery({ offset, limit })}`);
}

export function apiGetContestCredential({ contestName }) {
  return post(`/api/v2/contests/${contestName}/enter`);
}

export function apiGetContestParticipation({ contestName }) {
  return get(`/api/v2/contests/${contestName}/participations`);
}
