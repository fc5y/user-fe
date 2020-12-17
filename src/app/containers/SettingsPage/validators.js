import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

function getRequiredFieldErrorOrNull(field) {
  if (!field) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (field.length > 255) return ERROR.MSG_ERROR_INPUT_TOO_LONG;
  return null;
}

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
