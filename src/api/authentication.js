import { post } from '../utils/fetchUtils';

export function apiLogin({ usernameOrEmail, password }) {
  return post('/api/v2/auth/login', { auth_key: usernameOrEmail, password });
}

export function apiSendOTPEmail({ email }) {
  return post('/api/v2/auth/send-otp', { email });
}

export function apiSignup({ username, otp, fullname, school, email, password }) {
  return post('/api/v2/auth/signup', {
    username,
    otp,
    full_name: fullname,
    school_name: school,
    email,
    password,
  });
}
