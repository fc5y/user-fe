export const API_ERROR = Object.freeze({
  /**
   * BE Errors
   */
  // General
  SYSTEM_ERROR: 4002,
  DATABASE_ERROR: 4001,
  INVALID_ENDPOINT: 1006,
  VALIDATION_ERRORS: 1009,

  // Auth
  USERNAME_EXISTED: 3002,
  EMAIL_EXISTED: 3003,
  INVALID_TOKEN: 3005,
  WRONG_CRED: 3006,
  REQUIRE_ADMIN: 3202,

  // User
  USER_NOT_FOUND: 2001,

  // OTP
  OTP_INVALID: 3008,
  OTP_EXPIRED: 3009,
  OTP_EXCEED_SEND_LIMIT: 3010,
  OTP_EXCEED_SEND_LIMIT_SYSTEM: 3011,
  OTP_EXCEED_VERIFY_LIMIT: 3012,

  // Constest
  CONTEST_NOT_FOUND: 2101,
  CONTEST_OVER: 3004,
  NOT_REGISTERED_YET: 3201,
  NOT_SYNCED: 3202,
  CONTEST_NOT_STARTED: 3103,
  CONTEST_ENDED: 3103,
});

export const ERROR_MAP = Object.freeze({
  // General
  [API_ERROR.SYSTEM_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.DATABASE_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.INVALID_ENDPOINT]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.VALIDATION_ERRORS]: 'Đã có lỗi xảy ra, vui lòng thử lại.',

  // Auth
  [API_ERROR.WRONG_CRED]: 'Tên đăng nhập/email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.',
  [API_ERROR.EMAIL_EXISTED]: 'Email đã được sử dụng.',
  [API_ERROR.USERNAME_EXISTED]: 'Tên đăng nhập đã được sử dụng.',
  [API_ERROR.INVALID_TOKEN]: 'Đã có lỗi xảy ra, vui lòng đăng nhập lại.',
  [API_ERROR.REQUIRE_ADMIN]: 'Đã có lỗi xảy ra, vui lòng thử lại.',

  // User
  [API_ERROR.USER_NOT_FOUND]: 'Thí sinh không tồn tại',

  // OTP
  [API_ERROR.OTP_INVALID]: 'Mã xác nhận không đúng',
  [API_ERROR.OTP_EXPIRED]: 'Mã xác nhận đã hết hạn, vui lòng đăng ký lại.',
  [API_ERROR.OTP_EXCEED_SEND_LIMIT]:
    'Bạn (hoặc ai đó có cùng địa chỉ IP) đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau.',
  [API_ERROR.OTP_EXCEED_VERIFY_LIMIT]:
    'Bạn (hoặc ai đó có cùng địa chỉ IP) đã gửi yêu cầu quá nhiều lần. Vui lòng thử lại sau.',
  [API_ERROR.OTP_EXPIRED]: 'Dịch vụ gửi email đang quá tải. Vui lòng thử lại sau.',

  // Constest
  [API_ERROR.CONTEST_NOT_FOUND]: 'Kỳ thi không tồn tại.',
  [API_ERROR.CONTEST_OVER]: 'Kỳ thi đã kết thúc.',
  [API_ERROR.NOT_REGISTERED_YET]: 'Bạn chưa đăng ký kỳ thi này.',
  [API_ERROR.NOT_SYNCED]: 'Tài khoản của bạn đang được tạo. Vui lòng thử lại trong vài giây nữa.',
  [API_ERROR.CONTEST_NOT_STARTED]: 'Kỳ thi chưa cho phép vào thi.',
  [API_ERROR.CONTEST_ENDED]: 'Kỳ thi đã kết thúc.',
});
