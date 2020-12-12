/* eslint-disable no-use-before-define */
import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const USERNAME_REGEX = /^([a-zA-Z0-9\\.\-_]+$)/;
const PASSWORD_REGEX = /^([\x20-\x7E]+$)/;

export function validate(values) {
  const newValues = {
    ...values,
    fullname: values.fullname || '',
    email: values.email || '',
    username: values.username || '',
    password: values.password || '',
    confirmPassword: values.confirmPassword || '',
    school: values.school || '',
    isTermsAccepted: values.isTermsAccepted || '',
  };
  const errors = {
    fullname: getRequiredFieldErrorOrNull(newValues.fullname),
    email: getEmailErrorOrNull(newValues.email),
    username: getUsernameValidationError(newValues.username),
    password: getPasswordErrorOrNull(newValues.password),
    confirmPassword: getConfirmPasswordErrorOrNull(newValues.confirmPassword, newValues.password),
    school: getRequiredFieldErrorOrNull(newValues.school),
    isTermsAccepted: getRequiredFieldErrorOrNull(newValues.isTermsAccepted),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}

function getRequiredFieldErrorOrNull(field) {
  if (!field) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  return null;
}

function getUsernameValidationError(username) {
  if (!username) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (username.length < 3) return ERROR.MSG_ERROR_INPUT_TOO_SHORT;
  if (!USERNAME_REGEX.test(username)) return ERROR.MSG_ERROR_USERNAME_WRONG_FORMAT;
  return null;
}

function getEmailErrorOrNull(email) {
  if (!email) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (!EMAIL_REGEX.test(email)) return ERROR.MSG_ERROR_INVALID_EMAIL;
  return null;
}

function getPasswordErrorOrNull(password) {
  if (!password) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 8) return ERROR.MSG_ERROR_PASSWORD_MINIMUM_LENGTH;
  if (!PASSWORD_REGEX.test(password)) return ERROR.MSG_ERROR_PASSWORD_WRONG_FORMAT;
  return null;
}

function getConfirmPasswordErrorOrNull(confirmPassword, password) {
  if (!confirmPassword) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (confirmPassword !== password) return ERROR.MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED;
  return null;
}
