export const API_ERROR = Object.freeze({
  // General
  SYSTEM_ERROR: 4002,
  DATABASE_ERROR: 4001,
  INVALID_ENDPOINT: 1006,

  // Constest
  CONTEST_NOT_FOUND: 2002,
  CONTEST_OVER: 3004,
  CONTEST_NOT_STARTED: 999999, // TODO: @nhan Fill in later
});

export const ERROR_MAP = Object.freeze({
  // General
  [API_ERROR.SYSTEM_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại',
  [API_ERROR.DATABASE_ERROR]: 'Đã có lỗi xảy ra, vui lòng thử lại',
  [API_ERROR.INVALID_ENDPOINT]: 'Đã có lỗi xảy ra, vui lòng thử lại',

  // Constest
  [API_ERROR.CONTEST_NOT_FOUND]: 'Kỳ thi không tồn tại',
  [API_ERROR.CONTEST_OVER]: 'Kỳ thi đã kết thúc',
  [API_ERROR.CONTEST_NOT_STARTED]: 'Kỳ thi chưa bắt đầu',
});
