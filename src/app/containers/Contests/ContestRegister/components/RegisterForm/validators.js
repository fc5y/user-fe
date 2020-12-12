/* eslint-disable no-use-before-define */
import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

const USERNAME_REGEX = /^([a-zA-Z0-9\\.\-_]+$)/;

export function validate(values) {
  const newValues = {
    ...values,
    fullname: values.fullname || '',
    username: values.username || '',
    school: values.school || '',
    isTermsAccepted: values.isTermsAccepted || '',
  };
  const errors = {
    fullname: getRequiredFieldErrorOrNull(newValues.fullname),
    username: getUsernameValidationError(newValues.username),
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
