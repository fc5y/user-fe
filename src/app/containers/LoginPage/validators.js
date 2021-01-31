import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const USERNAME_REGEX = /^[a-zA-z0-9-._]*$/;

export function getUsernameOrEmailErrorOrNull(usernameOrEmail) {
  if (!usernameOrEmail) {
    // none input
    return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  } else if (usernameOrEmail.indexOf('@') !== -1) {
    // check email
    if (!EMAIL_REGEX.test(usernameOrEmail)) return ERROR.MSG_ERROR_INVALID_EMAIL;
  } else {
    // check username
    if (!USERNAME_REGEX.test(usernameOrEmail)) return ERROR.MSG_ERROR_USERNAME_WRONG_FORMAT;
    if (usernameOrEmail.length > 255) return ERROR.MSG_ERROR_INPUT_TOO_LONG;
    if (usernameOrEmail.length < 3) return ERROR.MSG_ERROR_INPUT_TOO_SHORT;
  }
  return null;
}

export function getPasswordErrorOrNull(password) {
  if (!password) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length > 255) return ERROR.MSG_ERROR_INPUT_TOO_LONG;

  // Currently disable this because of old accounts have less than 8 characters password
  // if (password.length < 8) return ERROR.MSG_ERROR_PASSWORD_MINIMUM_LENGTH;
  return null;
}

export function validate(values) {
  const newValues = {
    ...values,
    usernameOrEmail: values.usernameOrEmail || '',
    password: values.password || '',
  };
  const errors = {
    usernameOrEmail: getUsernameOrEmailErrorOrNull(values.usernameOrEmail),
    password: getPasswordErrorOrNull(values.password),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
