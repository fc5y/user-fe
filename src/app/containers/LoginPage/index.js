import React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiLogin } from 'src/api/authentication';

// HOC
import { withRouter, Link } from 'react-router-dom';
import { UserInfoContext } from 'src/shared/context/UserInfo';
import withUserNotLogin from 'src/shared/hoc/withUserNotLogin';

// Components
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import { PrimaryButton } from '../../common-ui/Button';
import LabeledInput from '../../common-ui/LabeledInput';
import Loading from '../../common-ui/Loading';
import { Helmet } from 'react-helmet';
import Popup, { POPUP_VARIANT } from '../../common-ui/Popup';

// Constants and utils
import { API_PROGRESS } from 'src/shared/constants';
import { validate } from './validators';
import { parseQuery } from 'src/utils/parseQuery';

// Assets
import LogoImage from 'assets/images/logo.png';

import styles from './styles.scss';

const POPUP_MSG = {
  DEFAULT: '',
  ERROR: 'Đã xảy ra lỗi, vui lòng thử lại sau',
  WARNING: [
    <span>
      Vui lòng liên hệ với fanpage tại địa chỉ{' '}
      <a href="https://facebook.com/kc97blf">https://facebook.com/kc97blf</a> để được hỗ trợ
    </span>,
  ],
};

function LoginPage({ history, location }) {
  const [apiProgress, setApiProgress] = React.useState(API_PROGRESS.INIT);
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupVariant, setPopupVariant] = React.useState(POPUP_VARIANT.DEFAULT);
  const [popupContent, setPopupContent] = React.useState(POPUP_MSG.DEFAULT);
  const { setUserInfo } = React.useContext(UserInfoContext);
  const [inputInfo, setInputInfo] = React.useState({
    usernameOrEmail: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
  });

  // Query object
  const query = parseQuery(location.search);

  // Handle onSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { usernameOrEmail, password } = inputInfo;
    const { errors } = validate({
      usernameOrEmail: usernameOrEmail.value,
      password: password.value,
    });

    // Check if validation errors existed
    if (
      !usernameOrEmail.value ||
      !password.value ||
      !!errors.usernameOrEmail ||
      !!errors.password
    ) {
      setInputInfo(() => ({
        usernameOrEmail: {
          value: usernameOrEmail.value,
          error: errors.usernameOrEmail,
        },
        password: {
          value: password.value,
          error: errors.password,
        },
      }));
      setPopupVariant(POPUP_VARIANT.ERROR);
      setPopupContent(POPUP_MSG.ERROR);
      setShowPopup(true);
      return;
    }

    setApiProgress(API_PROGRESS.REQ);
    const { code, data, msg } = await apiLogin({
      usernameOrEmail: usernameOrEmail.value,
      password: password.value,
    });

    if (!!code || !data || !data.access_token) {
      setShowPopup(true);
      setPopupVariant(POPUP_VARIANT.ERROR);
      setPopupContent(msg || POPUP_MSG.ERROR);
      setApiProgress(API_PROGRESS.FAILED);
    } else {
      // Save token and set isFetched to false to trigger fetching again
      setUserInfo({ token: data.access_token, isFetched: false });

      // Redirect to the correct URL
      if (!!query && !!query.redirect_url) {
        history.push(decodeURIComponent(query.redirect_url));
      } else {
        history.push('/');
      }
    }
  };

  const handleChange = (name, value) => {
    setInputInfo({ ...inputInfo, [name]: { value, error: null } });
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
        content={popupContent}
        onButtonClick={() => {
          setShowPopup(false);
          setPopupVariant(POPUP_VARIANT.DEFAULT);
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
          <LabeledInput
            label="Tên đăng nhập"
            name="usernameOrEmail"
            value={inputInfo.usernameOrEmail.value}
            onChange={handleChange}
            error={inputInfo.usernameOrEmail.error}
            type="text"
            onKeyEnter={handleSubmit}
          />
        </Form.FieldSet>
        <Form.FieldSet>
          <LabeledInput
            label="Mật khẩu"
            name="password"
            value={inputInfo.password.value}
            onChange={handleChange}
            error={inputInfo.password.error}
            type="password"
            onKeyEnter={handleSubmit}
          />
        </Form.FieldSet>
        <div className={styles.justifyContent}>
          <div
            className={styles.forgotAccount}
            onClick={() => {
              setShowPopup(true);
              setPopupVariant(POPUP_VARIANT.WARNING);
              setPopupContent(POPUP_MSG.WARNING[0]);
            }}
          >
            Quên mật khẩu?
          </div>
          <Link className={styles.createAccount} to="/auth/signup">
            Tạo tài khoản
          </Link>
        </div>
      </Form.Form>
      <Form.ButtonGroup>
        <PrimaryButton disabled={apiProgress === API_PROGRESS.REQ} onClick={handleSubmit}>
          Đăng nhập
        </PrimaryButton>
      </Form.ButtonGroup>
    </MainPanel.Container>
  );
}

LoginPage.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(withUserNotLogin()(LoginPage));
