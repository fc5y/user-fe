const MSG_ERROR_FIELD_IS_REQUIRED = 'Mục này là bắt buộc';
const MSG_ERROR_INVALID_EMAIL = 'Email không hợp lệ';
const MSG_ERROR_INVALID_PASSWORD = 'Mật khẩu phải có ít nhất 8 ký tự';
const MSG_ERROR_INVALID_USERNAME_LENGTH = 'Thông tin nhập quá ngắn';
const MSG_ERROR_FIELD_UPPER_LENGTH = 'Thông tin nhập quá dài';
const MSG_ERROR_INVALID_USERNAME =
  'Tên đăng nhập chỉ được gồm các ký tự a-z, A-Z, 0-9, ".", "-", "_"';

const EMAIL_REGEX = /.+@.+\..+/;
const USERNAME_REGEX = /^[a-zA-z0-9-._]*$/;

export function getUsernameErrorOrNull(username) {
  if (!EMAIL_REGEX.test(username)) {
    if (username.indexOf('@') !== -1) return MSG_ERROR_INVALID_EMAIL;
    if (!USERNAME_REGEX.test(username)) return MSG_ERROR_INVALID_USERNAME;
    if (!username) return MSG_ERROR_FIELD_IS_REQUIRED;
    if (username.length > 255) return MSG_ERROR_FIELD_UPPER_LENGTH;
    if (username.length < 3) return MSG_ERROR_INVALID_USERNAME_LENGTH;
  }
  return null;
}

export function getPasswordErrorOrNull(password) {
  if (!password) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 8) return MSG_ERROR_INVALID_PASSWORD;
  return null;
}
