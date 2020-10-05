import * as React from 'react';
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import LabeledInput from '../../common-ui/LabeledInput';
import LabeledRadioGroup from '../../common-ui/LabeledRadioGroup';
import LabeledCheckbox from '../../common-ui/LabeledCheckbox';
import * as Button from '../../common-ui/Button';
import Popup from '../../common-ui/Popup';
import { Link } from 'react-router-dom';
import styles from './style.scss';

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
    isPopup: 0,
  });
  const errors = getErrors(data);

  const handleChange = React.useCallback((name, value) => {
    setData({ ...data, [name]: value });
  });

  const submit = React.useCallback(() => {
    const sanitizedData = sanitize(data);
    setData(sanitizedData);
    if (hasBlockingError(getErrors(sanitizedData))) {
      setData({ ...data, isPopup: 1 });
      return;
    }
    console.log(data);
    // eslint-disable-next-line no-shadow
    signupWithData(sanitizedData).then(({ data: { data, error, errorMessage, debuggingInfo } }) => {
      if (error || !data) {
        // TODO: show popup
        setData({ ...data, isPopup: 1 });
        console.log({ data, error, errorMessage, debuggingInfo });
      } else {
        setData({ ...data, isPopup: 2 });
      }
    });
  }, [data]);

  const handleClosePopup = React.useCallback(() => {
    setData({ ...data, isPopup: 0 });
  });

  return (
    <MainPanel.Container>
      {data.isPopup === 0 || data.isPopup === undefined ? (
        ''
      ) : data.isPopup === 1 ? (
        <Popup
          closePopup={handleClosePopup}
          titleContent="Đăng ký thất bại"
          mainContent="Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng kiểm tra lại."
          contentBtn="OK"
          linkTo=""
          isSuccess="0"
        />
      ) : (
        <Popup
          titleContent="Đăng ký thành công"
          mainContent="Cảm ơn bạn đã đăng ký tham gia FYT Code Cup! Vui lòng đăng nhập để tiếp tục."
          contentBtn="Đăng nhập"
          linkTo="/login"
          isSuccess="1"
        />
      )}
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
                Tôi đã đọc và đồng ý với quy chế thi của{' '}
                <Link className={styles.linkDecoration} to="/info">
                  <span>FYT Contest Cup</span>
                </Link>
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
          <Button.Primary onClick={submit}>Tạo tài khoản</Button.Primary>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

export default SignupPage;
