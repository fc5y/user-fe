import { get, post } from '../utils/fetchUtils';
import { objectToUrlQuery } from '../utils/url';

export function apiGetContestInfo({ contestName, token }) {
  // return resContestGet({ contestName });

  if (token) {
    return get(`/api/v2/contests/${contestName}`, {
      Authorization: `Bearer ${token}`,
    });
  } else {
    return get(`/api/v2/contests/${contestName}`);
  }
}

export function apiGetAllContestsInfo({ offset, limit, token }) {
  // return resContestGetAll({ offset, limit });

  if (token) {
    return get(`/api/v2/contests${objectToUrlQuery({ offset, limit })}`, {
      Authorization: `Bearer ${token}`,
    });
  } else {
    return get(`/api/v2/contests${objectToUrlQuery({ offset, limit })}`);
  }
}

export function apiRegisterContest({ token, contestName }) {
  return post(
    `/api/v1/participations`,
    { contest_name: contestName, is_hidden: false },
    { Authorization: `Bearer ${token}` },
  );
}
