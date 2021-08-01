import { getOldPasswordErrorOrNull, getUsernameOrEmailErrorOrNull } from 'src/utils/validator';

export function validate(values) {
  const newValues = {
    ...values,
    usernameOrEmail: values.usernameOrEmail || '',
    password: values.password || '',
  };
  const errors = {
    usernameOrEmail: getUsernameOrEmailErrorOrNull(values.usernameOrEmail),
    password: getOldPasswordErrorOrNull(values.password),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
