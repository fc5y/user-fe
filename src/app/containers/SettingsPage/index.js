import React from 'react';
import { Helmet } from 'react-helmet';
// import styles from './styles.scss';
import cx from 'classnames';
// import { getPasswordErrorOrNull, getUsernameOrEmailErrorOrNull } from './validators';

// APIs
import { post } from 'src/utils/fetchUtils';

// HOC
import { withRouter, Link } from 'react-router-dom';
import withUserNotLogin from 'src/shared/hoc/withUserNotLogin';
import { UserInfoContext } from 'src/shared/context/UserInfo';

// UI
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import * as Button from '../../common-ui/Button';
import Popup from '../../common-ui/Popup';
import Loading from '../../common-ui/Loading';

// Constants
import { API_PROGRESS } from 'src/shared/constants';

const labels = {
  fullname: 'Họ và tên',
  dob: 'Ngày sinh',
  school: 'Trường học',
  email: 'Email liên lạc',
  bio: 'Bio',
  currentPassword: 'Mật khẩu hiện tại',
  newPassword: 'Mật khẩu mới',
  confirmNewPassword: 'Xác nhận mật khẩu mới',
};

function SettingsPage() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const defaultProps = (name, value) => ({
    label: labels[name],
    name,
    value,
    onChange: (name, value) => handleChange(name, value),
    error: errors[name],
  });

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
    },
    [values],
  );

  return (
    <MainPanel.Container>
      <Helmet>
        <title>Cài đặt</title>
      </Helmet>
      <MainPanel.Title>Thông tin cá nhân</MainPanel.Title>
      <Form.Form>
        <Form.LabeledInput {...defaultProps('fullname')} type="text" />
        <Form.LabeledInput {...defaultProps('school')} type="text" />
        <Form.LabeledInput {...defaultProps('email')} type="text" />
      </Form.Form>
    </MainPanel.Container>
  );
}

export default withUserNotLogin(withRouter(SettingsPage));
