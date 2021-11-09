import {
  getConfirmPasswordErrorOrNull,
  getPasswordErrorOrNull,
  getRequiredFieldErrorOrNull,
  getEmailErrorOrNull,
  getUsernameValidationError,
} from 'src/utils/validator';

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
