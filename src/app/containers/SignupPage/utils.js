import { apiSignup } from '../../../api';

export function getErrors(data) {
  // null: pristine (user has not changed the value)
  // empty string: non-pristine (user has changed the value)
  return {
    fullname: data.fullname == null ? null : data.fullname.length === 0 ? 'Bắt buộc' : null,
    email: data.email == null ? null : data.email.length === 0 ? 'Bắt buộc' : null,
    username: data.username == null ? null : data.username.length === 0 ? 'Bắt buộc' : null,
    password:
      data.password == null
        ? null
        : data.password.length === 0
        ? 'Bắt buộc'
        : data.password.length < 8
        ? 'Mật khẩu phải có ít nhất 8 ký tự'
        : null,
    confirmPassword:
      data.confirmPassword == null
        ? null
        : data.confirmPassword !== data.password
        ? 'Mật khẩu không khớp'
        : null,
    address: data.address == null ? null : data.address.length === 0 ? 'Bắt buộc' : null,
    school: data.school == null ? null : data.school.length === 0 ? 'Bắt buộc' : null,
    officialContestant:
      data.officialContestant == null
        ? null
        : data.officialContestant.length === 0
        ? 'Bắt buộc'
        : null,
    officialStudent:
      data.officialStudent == null ? null : data.officialStudent.length === 0 ? 'Bắt buộc' : null,
    iAgreeToTerms:
      data.iAgreeToTerms == null ? null : data.iAgreeToTerms.length === 0 ? 'Bắt buộc' : null,
  };
}

export function sanitize(data) {
  return {
    fullname: data.fullname || '',
    email: data.email || '',
    username: data.username || '',
    password: data.password || '',
    confirmPassword: data.confirmPassword || '',
    address: data.address || '',
    school: data.school || '',
    officialContestant: data.officialContestant || '',
    officialStudent: data.officialStudent || '',
    iAgreeToTerms: data.iAgreeToTerms || '',
  };
}

export function hasBlockingError(errors) {
  return Object.values(errors).some((x) => x !== null);
}

export function signupWithData(data) {
  // TODO: improve
  const { username, password, ...extra } = data;
  return apiSignup({
    username,
    password,
    extra,
  });
}
