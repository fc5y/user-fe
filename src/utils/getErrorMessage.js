import { ERROR_MAP, API_ERROR } from '../shared/constants';

export function getErrorMessage({ error, error_msg }) {
  if (!error && !error_msg) {
    return ERROR_MAP[API_ERROR.SYSTEM_ERROR];
  }

  return ERROR_MAP[error] || error_msg;
}
