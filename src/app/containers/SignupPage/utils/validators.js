/* eslint-disable no-use-before-define */
const MSG_ERROR_FIELD_IS_REQUIRED = 'Mục này là bắt buộc';
const MSG_ERROR_INVALID_EMAIL = 'Email không hợp lệ';
const MSG_ERROR_PASSWORD_MINIMUM_LENGTH = 'Mật khẩu phải có ít nhất 8 ký tự';
const MSG_ERROR_PASSWORD_WRONG_FORMAT = '"Mật khẩu chỉ được gồm các ký tự ASCII (#32..#126)';
const MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED = 'Mật khẩu không khớp';
const MSG_ERROR_USERNAME_WRONG_FORMAT = `Tên đăng nhập chỉ được gồm các ký tự a-z, A-Z, 0-9, ".", "-", "_"`;
const MSG_ERROR_MINIMUM_LENGTH = 'Thông tin nhập quá ngắn';

const EMAIL_REGEX = /.+@.+\..+/;
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
  if (!field) return MSG_ERROR_FIELD_IS_REQUIRED;
  return null;
}

function getUsernameValidationError(username) {
  if (!username) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (username.length < 3) return MSG_ERROR_MINIMUM_LENGTH;
  if (!USERNAME_REGEX.test(username)) return MSG_ERROR_USERNAME_WRONG_FORMAT;
  return null;
}

function getEmailErrorOrNull(email) {
  if (!email) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (!EMAIL_REGEX.test(email)) return MSG_ERROR_INVALID_EMAIL;
  return null;
}

function getPasswordErrorOrNull(password) {
  if (!password) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 8) return MSG_ERROR_PASSWORD_MINIMUM_LENGTH;
  if (!PASSWORD_REGEX.test(password)) return MSG_ERROR_PASSWORD_WRONG_FORMAT;
  return null;
}

function getConfirmPasswordErrorOrNull(confirmPassword, password) {
  if (!confirmPassword) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (confirmPassword !== password) return MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED;
  return null;
}
