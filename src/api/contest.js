/* eslint-disable no-unneeded-ternary */
import { get } from '../utils/fetchUtils';

export function apiGetContestCredential(token) {
  return get(
    'https://asia-east2-fyt-code-cup.cloudfunctions.net/api/cred',
    { headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Headers': '*' } },
    true,
  );
}

export function apiGetContestCredentialV2(username) {
  return get(`https://backdoor.freecontest.net/api/v1/cred/${username}`, {}, true);
}
