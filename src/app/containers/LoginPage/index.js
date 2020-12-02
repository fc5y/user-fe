import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LogoImage from 'assets/images/logo.png';
import styles from './styles.scss';
import { getPasswordErrorOrNull, getRequiredUsername } from './validators';

// APIs
import { apiLogin } from 'src/api';

// HOC
import { withRouter, Link } from 'react-router-dom';
import withUserNotLogin from 'src/shared/hoc/withUserNotLogin';
import { UserInfoContext } from 'src/shared/context/UserInfo';

// UI
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import LabeledInput from '../../common-ui/LabeledInput';
import * as Button from '../../common-ui/Button';
import Popup from '../../common-ui/Popup';
import Loading from '../../common-ui/Loading';

// Constants
import { API_PROGRESS } from 'src/shared/constants';
// import { validate } from 'webpack';

const labels = {
  username: 'Tên đăng nhập',
  password: 'Mật khẩu',
};

const POPUP_VARIANT = {
  INIT: 0,
  ERROR: 1,
  SUCESS: 2,
  WARNING: 3,
};

const POPUP_MSG = {
  error: 'Đã xảy ra lỗi, vui lòng thử lại sau',
  warning: [
    <span>
      Vui lòng liên hệ với fanpage tại địa chỉ{' '}
      <a href="https://facebook.com/kc97blf">https://facebook.com/kc97blf</a> để được hỗ trợ
    </span>,
  ],
};

function validate(values) {
  const newValues = {
    ...values,
    username: values.username || '',
    password: values.password || '',
  };
  const errors = {
    username: getRequiredUsername(newValues.username),
    password: getPasswordErrorOrNull(newValues.password),
  };
  const hasError = Object.values(errors).some((error) => !!error);
  return { newValues, errors, hasError };
}

function LoginPage({ history }) {
  const [apiProgress, setApiProgress] = React.useState(API_PROGRESS.INIT);
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupVariant, setPopupVariant] = React.useState(POPUP_VARIANT.INIT);
  const [values, setValues] = React.useState({
    // null: pristine (user has not changed the value)
    // empty string: non-pristine (user has changed the value)
    username: null,
    password: null,
  });
  const [errors, setErrors] = React.useState({});
  const { userInfo, setUserInfo } = React.useContext(UserInfoContext);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const { username, password } = values;
      const validation = validate(values);
      setValues(validation.newValues);
      setErrors(validation.errors);
      if (!username || !password || errors) {
        setShowPopup(true);
        setPopupVariant(POPUP_VARIANT.ERROR);
        return;
      }

      setApiProgress(API_PROGRESS.REQ);
      const { values: apivalues } = await apiLogin({ username, password });
      if (!apivalues || !apivalues.token) {
        setShowPopup(true);
        setPopupVariant(POPUP_VARIANT.ERROR);
        setApiProgress(API_PROGRESS.FAILED);
      } else {
        setUserInfo({ ...userInfo, token: apivalues.token });
        history.push('/');
      }
    },
    [values],
  );

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

  const selectContent = (variant) => {
    if (variant === POPUP_VARIANT.ERROR) return POPUP_MSG.error;
    if (variant === POPUP_VARIANT.WARNING) return POPUP_MSG.warning[0];
    return null;
  };

  return (
    <MainPanel.Container>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      {apiProgress === API_PROGRESS.REQ && <Loading />}
      <Popup
        show={showPopup}
        variant={popupVariant}
        content={selectContent(popupVariant)}
        onButtonClick={() => {
          setShowPopup(false);
          setPopupVariant(POPUP_VARIANT.INIT);
        }}
      />
      <div className={styles.justifyContent}>
        <div className={styles.titleLeft}>Đăng nhập</div>
        <div>
          <Link to="/">
            <img className={styles.logoImage} src={LogoImage} alt="logo" />
          </Link>
        </div>
      </div>
      <Form.Form>
        <Form.FieldSet>
          <LabeledInput {...defaultProps('username')} type="text" />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput {...defaultProps('password')} type="password" />
        </Form.FieldSet>
      </Form.Form>
      <div className={styles.justifyContent}>
        <div
          className={styles.forgotAccount}
          onClick={() => {
            setShowPopup(true);
            setPopupVariant(POPUP_VARIANT.WARNING);
          }}
        >
          Quên mật khẩu
        </div>
        <Link className={styles.createAccount} to="/signup">
          Tạo tài khoản
        </Link>
      </div>
      <Form.ButtonGroup>
        <Button.Primary disabled={apiProgress === API_PROGRESS.REQ} onClick={handleSubmit}>
          Đăng nhập
        </Button.Primary>
      </Form.ButtonGroup>
    </MainPanel.Container>
  );
}

LoginPage.propTypes = {
  history: PropTypes.any,
};

export default withUserNotLogin(withRouter(LoginPage));
