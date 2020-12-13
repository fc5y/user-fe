export const API_ERROR = Object.freeze({
  /**
   * BE Errors
   */
  // General
  SYSTEM_ERROR: 4002,
  DATABASE_ERROR: 4001,
  INVALID_ENDPOINT: 1006,
  INVALID_TOKEN: 3005,

  // Auth
  USERNAME_EXISTED: 3002,
  EMAIL_EXISTED: 3003,
  WRONG_CRED: 3006,
  OTP_INVALID: 3008,
  OTP_EXPIRED: 3009,

  // Constest
  CONTEST_NOT_FOUND: 2101,
  CONTEST_OVER: 3004,

  /**
   * FE Errors
   */
  CONTEST_NOT_STARTED: -2000,
});

export const ERROR_MAP = Object.freeze({
  // General
  [API_ERROR.SYSTEM_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.DATABASE_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.INVALID_ENDPOINT]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.INVALID_TOKEN]: 'Đã có lỗi xảy ra, vui lòng thử lại.',

  // Auth
  [API_ERROR.WRONG_CRED]: 'Tên đăng nhập/email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.',
  [API_ERROR.EMAIL_EXISTED]: 'Email đã được sử dụng.',
  [API_ERROR.USERNAME_EXISTED]: 'Tên đăng nhập đã được sử dụng.',
  [API_ERROR.OTP_INVALID]: 'Mã xác nhận không đúng',
  [API_ERROR.OTP_EXPIRED]: 'Mã xác nhận đã hết hạn, vui lòng đăng ký lại.',

  // Constest
  [API_ERROR.CONTEST_NOT_FOUND]: 'Kỳ thi không tồn tại.',
  [API_ERROR.CONTEST_OVER]: 'Kỳ thi đã kết thúc.',
  [API_ERROR.CONTEST_NOT_STARTED]: 'Kỳ thi chưa bắt đầu.',
});
