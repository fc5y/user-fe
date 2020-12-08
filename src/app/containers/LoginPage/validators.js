const MSG_ERROR_FIELD_IS_REQUIRED = 'Mục này là bắt buộc';
const MSG_ERROR_EMAIL_INVALID = 'Email không hợp lệ';
const MSG_ERROR_PASSWORD_TOO_SHORT = 'Mật khẩu phải có ít nhất 8 ký tự';
const MSG_ERROR_INPUT_TOO_SHORT = 'Thông tin nhập quá ngắn';
const MSG_ERROR_INPUT_TOO_LONG = 'Thông tin nhập quá dài';
const MSG_ERROR_USERNAME_HAS_INVALID_CHARACTERS =
  'Tên đăng nhập chỉ được gồm các ký tự a-z, A-Z, 0-9, ".", "-", "_"';

const EMAIL_REGEX = /.+@.+\..+/;
const USERNAME_REGEX = /^[a-zA-z0-9-._]*$/;

export function getUsernameOrEmailErrorOrNull(usernameOrEmail) {
  if (!usernameOrEmail) {
    // none input
    return MSG_ERROR_FIELD_IS_REQUIRED;
  } else if (usernameOrEmail.indexOf('@') !== -1) {
    // check email
    if (!EMAIL_REGEX.test(usernameOrEmail)) return MSG_ERROR_EMAIL_INVALID;
  } else {
    // check username
    if (!USERNAME_REGEX.test(usernameOrEmail)) return MSG_ERROR_USERNAME_HAS_INVALID_CHARACTERS;
    if (usernameOrEmail.length > 255) return MSG_ERROR_INPUT_TOO_LONG;
    if (usernameOrEmail.length < 3) return MSG_ERROR_INPUT_TOO_SHORT;
  }
  return null;
}

export function getPasswordErrorOrNull(password) {
  if (!password) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (password.length < 2) return MSG_ERROR_PASSWORD_TOO_SHORT;
  if (password.length > 255) return MSG_ERROR_INPUT_TOO_LONG;
  return null;
}

export function validate(values) {
  const errors = {
    usernameOrEmail: getUsernameOrEmailErrorOrNull(values.usernameOrEmail),
    password: getPasswordErrorOrNull(values.password),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { errors, hasError };
}
