import { post } from '../utils/fetchUtils';

export function apiLogin({ usernameOrEmail, password }) {
  return post('/api/v1/login', { email_or_username: usernameOrEmail, password });
}

export function apiSendOTPEmail({ email }) {
  return post('/api/v1/send-otp', { email });
}

export function apiSignup({ username, otp, fullname, school, email, password }) {
  return post('/api/v1/signup', {
    username,
    otp,
    full_name: fullname,
    school_name: school,
    email,
    password,
  });
}
