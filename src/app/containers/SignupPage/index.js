/* eslint-disable react/prop-types */
import * as React from 'react';

// HOC
import { withRouter, Link, Redirect } from 'react-router-dom';
import withUserNotLogin from '../../../shared/hoc/withUserNotLogin';

// UI
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import LabeledInput from '../../common-ui/LabeledInput';
import LabeledRadioGroup from '../../common-ui/LabeledRadioGroup';
import LabeledCheckbox from '../../common-ui/LabeledCheckbox';
import * as Button from '../../common-ui/Button';

// Constants
import { API_PROGRESS } from '../../../shared/constants/index';

import { getErrors, sanitize, hasBlockingError, signupWithData } from './utils';

const isRegisterClosed = false;

function SignupPage({ history }) {
  if (isRegisterClosed) {
    alert('Đã hết hạn đăng ký.');
    return <Redirect to="/" />;
  }

  const [apiProgress, setApiProgress] = React.useState(API_PROGRESS.INIT);
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

  const submit = React.useCallback(async () => {
    const sanitizedData = sanitize(data);
    setData(sanitizedData);
    if (hasBlockingError(getErrors(sanitizedData))) return;
    setApiProgress(API_PROGRESS.REQ);
    // eslint-disable-next-line no-shadow
    const { data: response, error } = await signupWithData(sanitizedData);

    if (!!error || !response || !response.username) {
      // TODO: show popup
      alert(`Đăng ký không thành công\n\n${error}`);
      setApiProgress(API_PROGRESS.FAILED);
    } else {
      // TODO: show popup
      alert(`Đăng ký thành công!`);
      setApiProgress(API_PROGRESS.SUCCESS);
      !!history && history.push('/login');
    }
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
            label={
              <span>
                Tôi đã đọc và đồng ý với <Link to="/info">quy chế thi của FYT Code Cup</Link>
              </span>
            }
            name="iAgreeToTerms"
            value={data.iAgreeToTerms || ''}
            option="yes"
            error={errors.iAgreeToTerms}
            onChange={handleChange}
          />
        </Form.FieldSet>
        <Form.ButtonGroup>
          <Button.Primary disabled={apiProgress === API_PROGRESS.REQ} onClick={submit}>
            Tạo tài khoản
          </Button.Primary>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

export default withUserNotLogin(withRouter(SignupPage));
