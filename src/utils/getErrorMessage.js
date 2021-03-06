import { ERROR_MAP, API_ERROR } from '../shared/constants';

export function getErrorMessage({ code, msg }) {
  if (!code && !msg) {
    return ERROR_MAP[API_ERROR.SYSTEM_ERROR];
  }

  return ERROR_MAP[code] || msg;
}
