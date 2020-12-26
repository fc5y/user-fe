import { get, post } from '../utils/fetchUtils';
import { objectToQuery } from '../utils/query';

export function apiGetContestInfo({ contestName }) {
  // return resContestGet({ contestName });
  return get(`/api/v1/contests/${contestName}`);
}

export function apiGetAllContestsInfo({ offset, limit }) {
  // return resContestGetAll({ offset, limit });
  return get(`/api/v1/contests${objectToQuery({ offset, limit })}`);
}

export function apiRegisterContest({ token, contestName }) {
  return post(
    `/api/v1/participations`,
    { contest_name: contestName, is_hidden: false },
    { Authorization: `Bearer ${token}` },
  );
}
