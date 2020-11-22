const MSG_ERROR_FIELD_IS_REQUIRED = 'Mục này là bắt buộc';
const MSG_ERROR_INVALID_EMAIL = 'Email không hợp lệ';
const MSG_ERROR_INVALID_PASSWORD = 'Mật khẩu phải có ít nhất 8 ký tự';
const MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED = 'Mật khẩu không khớp';

const EMAIL_REGEX = /.+@.+\..+/;

export function getRequiredFieldErrorOrNull(field) {
  if (!field) return MSG_ERROR_FIELD_IS_REQUIRED;
  return null;
}

export function getEmailErrorOrNull(email) {
  if (!email) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (!EMAIL_REGEX.test(email)) return MSG_ERROR_INVALID_EMAIL;
  return null;
}

export function getPasswordErrorOrNull(password) {
  if (!password) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 8) return MSG_ERROR_INVALID_PASSWORD;
  return null;
}

export function getConfirmPasswordErrorOrNull(confirmPassword, password) {
  if (!confirmPassword) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (confirmPassword !== password) return MSG_ERROR_CONFIRM_PASSWORD_MISMATCHED;
  return null;
}
