import { get, post } from '../utils/fetchUtils';

export function apiLogin({ usernameOrEmail, password }) {
  return post('/api/v2/auth/login', { auth_key: usernameOrEmail, password });
}

export function apiLogout() {
  return post('/api/v2/auth/logout');
}

export function apiLoginStatus() {
  return get('/api/v2/auth/login-status');
}

export function apiRequestSignup({ email, username, fullname }) {
  return post('/api/v2/auth/request-signup', {
    email,
    username,
    full_name: fullname,
  });
}

export function apiVerifyOTP({ email, username, otp }) {
  return post('/api/v2/auth/verify-otp', {
    email,
    otp,
    username,
  });
}

export function apiSignup({ username, token, fullname, school, email, password }) {
  return post('/api/v2/auth/signup', {
    username,
    token,
    full_name: fullname,
    school_name: school,
    email,
    password,
  });
}
