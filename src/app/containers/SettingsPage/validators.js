import { getRequiredFieldErrorOrNull } from 'src/utils/validator';

export function validate(values) {
  const newValues = {
    ...values,
    fullname: values.fullname || '',
    school: values.school || '',
  };
  const errors = {
    fullname: getRequiredFieldErrorOrNull(values.fullname),
    school: getRequiredFieldErrorOrNull(values.school),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
