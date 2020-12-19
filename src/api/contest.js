import { get, post } from '../utils/fetchUtils';
import { objectToQuery } from '../utils/query';
import { resContestGetAll } from '../mock/mockContests';

export function apiGetContestInfo({ contestName }) {
  return get(`/api/v1/contests/${contestName}`);
}

export function apiGetAllContestsInfo({ offset, limit }) {
  return resContestGetAll({ offset, limit });
  // return get(`/api/v1/contests${objectToQuery({ offset, limit })}`);
}

export function apiGetContestCredential({ token, contestName }) {
  return get(`/api/v1/contests/${contestName}/get-credentials`, {
    Authorization: `Bearer ${token}`,
  });
}

export function apiRegisterContest({ token }) {
  return post(
    `/api/v1/participations`,
    {},
    {
      Authorization: `Bearer ${token}`,
    },
  );
}
