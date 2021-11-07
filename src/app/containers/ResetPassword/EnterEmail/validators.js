/* eslint-disable no-use-before-define */
import { getEmailErrorOrNull } from 'src/utils/validator';

export function validate(values) {
  const newValues = {
    ...values,
    email: values.email || '',
  };
  const errors = {
    email: getEmailErrorOrNull(newValues.email),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
