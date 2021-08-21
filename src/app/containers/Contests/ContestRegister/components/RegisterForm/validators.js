/* eslint-disable no-use-before-define */
import { getRequiredFieldErrorOrNull } from 'src/utils/validator';

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
