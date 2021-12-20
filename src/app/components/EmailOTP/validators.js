import { getOTPValidationError } from 'src/utils/validator';

export function validate(values) {
  const newValues = {
    ...values,
    otp: values.otp || '',
  };
  const errors = {
    otp: getOTPValidationError(values.otp),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  console.log(errors, hasError);
  return { newValues, errors, hasError };
}
