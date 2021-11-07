import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

const PASSWORD_REGEX = /^([\x20-\x7E]+$)/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,16}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const OTP_REGEX = /^[0-9]+$/;

export function getConfirmPasswordErrorOrNull(confirmPassword, password) {
  if (!confirmPassword) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (confirmPassword !== password) return ERROR.MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED;
  return null;
}

export function getPasswordErrorOrNull(password) {
  if (!password) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 8) return ERROR.MSG_ERROR_PASSWORD_MINIMUM_LENGTH;
  if (!PASSWORD_REGEX.test(password)) return ERROR.MSG_ERROR_PASSWORD_WRONG_FORMAT;
  return null;
}

export function getOldPasswordErrorOrNull(password) {
  if (!password) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  // Currently disable this because of old accounts have less than 8 characters password
  // if (password.length < 8) return ERROR.MSG_ERROR_PASSWORD_MINIMUM_LENGTH;
  return null;
}

export function getRequiredFieldErrorOrNull(field) {
  if (!field) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (field.length > 255) return ERROR.MSG_ERROR_INPUT_TOO_LONG;
  return null;
}

export function getOTPValidationError(otp) {
  if (!otp) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (otp.length !== 6) return ERROR.MSG_ERROR_OTP_WRONG_FORMAT;
  if (!OTP_REGEX.test(otp)) return ERROR.MSG_ERROR_OTP_WRONG_FORMAT;
  return null;
}

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

export function getUsernameValidationError(username) {
  if (!username) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (username.length < 3) return ERROR.MSG_ERROR_INPUT_TOO_SHORT;
  if (!USERNAME_REGEX.test(username)) return ERROR.MSG_ERROR_USERNAME_WRONG_FORMAT;
  return null;
}

export function getEmailErrorOrNull(email) {
  if (!email) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (!EMAIL_REGEX.test(email)) return ERROR.MSG_ERROR_INVALID_EMAIL;
  return null;
}
