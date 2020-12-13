import { ERROR_VALIDATION as ERROR } from 'src/shared/constants';

const OTP_REGEX = /^[0-9]+$/;

export function getOTPValidationError(otp) {
  if (!otp) return ERROR.MSG_ERROR_FIELD_IS_REQUIRED;
  if (otp.length !== 6) return ERROR.MSG_ERROR_OTP_WRONG_FORMAT;
  if (!OTP_REGEX.test(otp)) return ERROR.MSG_ERROR_OTP_WRONG_FORMAT;
  return null;
}

export function validate(values) {
  const newValues = {
    ...values,
    otp: values.otp || '',
  };
  const errors = {
    otp: getOTPValidationError(values.otp),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}
