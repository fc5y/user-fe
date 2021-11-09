import { getConfirmPasswordErrorOrNull, getPasswordErrorOrNull } from 'src/utils/validator';

export function validate(values) {
  const newValues = {
    ...values,
    password: values.password || '',
    confirmPassword: values.confirmPassword || '',
  };
  const errors = {
    password: getPasswordErrorOrNull(newValues.password),
    confirmPassword: getConfirmPasswordErrorOrNull(newValues.confirmPassword, newValues.password),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
