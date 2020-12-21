import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

const PASSWORD_REGEX = /^([\x20-\x7E]+$)/;

function getConfirmPasswordErrorOrNull(confirmPassword, password) {
  if (!confirmPassword) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (confirmPassword !== password) return ERROR.MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED;
  return null;
}

function getPasswordErrorOrNull(password) {
  if (!password) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 8) return ERROR.MSG_ERROR_PASSWORD_MINIMUM_LENGTH;
  if (!PASSWORD_REGEX.test(password)) return ERROR.MSG_ERROR_PASSWORD_WRONG_FORMAT;
  return null;
}

export function validate(values) {
  const newValues = {
    ...values,
    currentPassword: values.currentPassword || '',
    newPassword: values.newPassword || '',
    confirmNewPassword: values.confirmNewPassword || '',
  };
  const errors = {
    currentPassword: getPasswordErrorOrNull(values.currentPassword),
    newPassword: getPasswordErrorOrNull(values.newPassword),
    confirmNewPassword: getConfirmPasswordErrorOrNull(
      values.confirmNewPassword,
      values.newPassword,
    ),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
