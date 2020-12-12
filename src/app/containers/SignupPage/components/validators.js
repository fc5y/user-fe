const MSG_ERROR_FIELD_IS_REQUIRED = 'Mục này là bắt buộc';
const MSG_ERROR_OTP = 'Mã xác minh bao gồm 6 chữ số';
const OTP_REGEX = /^[0-9]+$/;

export function getOTPValidationError(otp) {
  if (!otp) return MSG_ERROR_FIELD_IS_REQUIRED;
  if (otp.length !== 6) return MSG_ERROR_OTP;
  if (!OTP_REGEX.test(otp)) return MSG_ERROR_OTP;
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
