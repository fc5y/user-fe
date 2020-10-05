import * as React from 'react';
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import LabeledInput from '../../common-ui/LabeledInput';
import LabeledRadioGroup from '../../common-ui/LabeledRadioGroup';
import LabeledCheckbox from '../../common-ui/LabeledCheckbox';
import * as Button from '../../common-ui/Button';

import { getErrors, sanitize, hasBlockingError, signupWithData } from './utils';

function SignupPage() {
  const [data, setData] = React.useState({
    // null: pristine (user has not changed the value)
    // empty string: non-pristine (user has changed the value)
    fullname: null,
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    address: null,
    school: null,
    officialContestant: null,
    officialStudent: null,
    iAgreeToTerms: null,
  });
  const errors = getErrors(data);

  const handleChange = React.useCallback((name, value) => {
    setData({ ...data, [name]: value });
  });

  const submit = React.useCallback(() => {
    const sanitizedData = sanitize(data);
    setData(sanitizedData);
    if (hasBlockingError(getErrors(sanitizedData))) return;
    // eslint-disable-next-line no-shadow
    signupWithData(sanitizedData).then(({ data: { data, error, errorMessage, debuggingInfo } }) => {
      if (error || !data) {
        // TODO: show popup
        alert(`Đăng ký không thành công\n\n${errorMessage}`);
        console.log({ data, error, errorMessage, debuggingInfo });
      } else {
        // TODO: show popup
        alert(`Đăng ký thành công!`);
        window.location.href = '/login';
      }
    });
  }, [data]);

  return (
    <MainPanel.Container>
      <MainPanel.Title>Đăng ký tham gia FYT Code Cup</MainPanel.Title>
      <MainPanel.Description>
        Để tham gia FYT Code Cup, hãy đăng ký trước 19:30 ngày 09/10/2020 bạn nhé!
      </MainPanel.Description>
      <Form.Form>
        <Form.FieldSet>
          <LabeledInput
            label="Họ và tên"
            name="fullname"
            value={data.fullname || ''}
            error={errors.fullname}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Email"
            name="email"
            value={data.email || ''}
            error={errors.email}
            onChange={handleChange}
            type="email"
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Tên đăng nhập"
            name="username"
            value={data.username || ''}
            error={errors.username}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Mật khẩu"
            name="password"
            value={data.password || ''}
            error={errors.password}
            onChange={handleChange}
            type="password"
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            value={data.confirmPassword || ''}
            error={errors.confirmPassword}
            onChange={handleChange}
            type="password"
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Địa chỉ (để nhận giải thưởng)"
            name="address"
            value={data.address || ''}
            error={errors.address}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Trường"
            name="school"
            value={data.school || ''}
            error={errors.school}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledRadioGroup
            label="Hình thức tham gia"
            name="officialContestant"
            value={data.officialContestant}
            options={[
              { value: 'official', label: 'Chính thức' },
              {
                value: 'unofficial',
                label: 'Không chính thức (không xét giải, ẩn khỏi bảng điểm)',
              },
            ]}
            error={errors.officialContestant}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledRadioGroup
            label="Bạn có đang là học sinh/sinh viên chính thức trong trường?"
            name="officialStudent"
            value={data.officialStudent || ''}
            options={[
              { value: 'yes', label: 'Có' },
              { value: 'no', label: 'Không' },
            ]}
            error={errors.officialStudent}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledCheckbox
            label="Tôi đã đọc và đồng ý với quy chế thi của FYT Contest Cup"
            name="iAgreeToTerms"
            value={data.iAgreeToTerms || ''}
            option="yes"
            error={errors.iAgreeToTerms}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.ButtonGroup>
          <Button.Primary onClick={submit}>Tạo tài khoản</Button.Primary>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

export default SignupPage;
