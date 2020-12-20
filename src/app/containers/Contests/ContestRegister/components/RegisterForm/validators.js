/* eslint-disable no-use-before-define */
import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

export function validate(values) {
  const newValues = {
    ...values,
    fullname: values.fullname || '',
    username: values.username || '',
    school: values.school || '',
    isTermsAccepted: values.isTermsAccepted || '',
  };
  const errors = {
    isTermsAccepted: getRequiredFieldErrorOrNull(newValues.isTermsAccepted),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}

function getRequiredFieldErrorOrNull(field) {
  if (!field) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  return null;
}
