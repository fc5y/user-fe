export const API_ERROR = Object.freeze({
  /**
   * BE Errors
   */
  // General
  DATABASE_GATEWAY_ERROR: 500125,
  ROUTE_NOT_FOUND: 500349,
  JSON_SCHEMA_VALIDATION_FAILED: 500120,
  EMAIL_SERVICE_ERROR: 502500,
  CMS_MANAGER_ERROR: 503000,
  CMS_MANAGER_GENERATE_TOKEN_FAILED: 503019,
  CMS_MANAGER_CONTEST_NOT_FOUND: 503402,
  UNKNOWN_ERROR: 599999,

  // Auth
  USERNAME_EXISTED: 3002,
  EMAIL_EXISTED: 3003,
  INVALID_EMAIL: 500689,
  INVALID_PASSWORD: 500736,
  REQUIRE_ADMIN: 500256,
  UNAUTHORIZED: 501401,

  // User
  USER_NOT_FOUND: 500425,

  // OTP
  OTP_INVALID: 501509,
  OTP_EXPIRED: 3009,
  OTP_EXCEED_SEND_LIMIT: 3010,
  OTP_EXCEED_SEND_LIMIT_SYSTEM: 3011,
  OTP_EXCEED_VERIFY_LIMIT: 3012,

  // Constest
  CONTEST_NOT_FOUND: 500555,
  CONTEST_OVER: 3004,
  NOT_REGISTERED_YET: 3201,
  CONTEST_ENDED: 3103,
  CONTEST_NOT_STARTED: 500595,

  // Participation
  PARTICIPATION_NOT_FOUND: 500654,
});

export const ERROR_MAP = Object.freeze({
  // General
  [API_ERROR.DATABASE_GATEWAY_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.ROUTE_NOT_FOUND]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.JSON_SCHEMA_VALIDATION_FAILED]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.EMAIL_SERVICE_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.CMS_MANAGER_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.CMS_MANAGER_GENERATE_TOKEN_FAILED]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.CMS_MANAGER_CONTEST_NOT_FOUND]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.UNKNOWN_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại.',

  // Auth
  [API_ERROR.INVALID_EMAIL]: 'Tên đăng nhập/email không hợp lệ. Vui lòng thử lại.',
  [API_ERROR.INVALID_PASSWORD]: 'Mật khẩu không hợp lệ. Vui lòng thử lại.',
  [API_ERROR.EMAIL_EXISTED]: 'Email đã được sử dụng.',
  [API_ERROR.USERNAME_EXISTED]: 'Tên đăng nhập đã được sử dụng.',
  [API_ERROR.REQUIRE_ADMIN]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
  [API_ERROR.UNAUTHORIZED]: 'Tên đăng nhập/email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.',

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
  [API_ERROR.CONTEST_NOT_STARTED]: 'Kỳ thi chưa cho phép vào thi.',
  [API_ERROR.CONTEST_ENDED]: 'Kỳ thi đã kết thúc.',

  // Participation
  [API_ERROR.PARTICIPATION_NOT_FOUND]: 'Đã có lỗi xảy ra, vui lòng thử lại.',
});
