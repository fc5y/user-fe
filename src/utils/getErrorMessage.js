import { ERROR_MAP, API_ERROR } from '../shared/constants';

export function getErrorMessage({ error, error_msg }, showErrorCode = true) {
  const message =
    !error && !error_msg ? ERROR_MAP[API_ERROR.UNKNOWN_ERROR] : ERROR_MAP[error] || error_msg;
  return message + (showErrorCode ? ` (${error})` : '');
}
