import { getPasswordErrorOrNull, getConfirmPasswordErrorOrNull } from 'src/utils/validator';

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
