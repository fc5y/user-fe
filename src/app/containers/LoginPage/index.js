import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import LogoImage from 'assets/images/logo.png';
import styles from './styles.scss';
import { validate } from './validators';

// APIs
import { apiLogin } from 'src/api/authentication';

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

const POPUP_VARIANT = {
  DEFAULT: 0,
  ERROR: 1,
  SUCCESS: 2,
  WARNING: 3,
};

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

function LoginPage({ history }) {
  const [apiProgress, setApiProgress] = React.useState(API_PROGRESS.INIT);
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupVariant, setPopupVariant] = React.useState(POPUP_VARIANT.DEFAULT);
  const [popupContent, setPopupContent] = React.useState(POPUP_MSG.DEFAULT);
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
  const { userInfo, setUserInfo } = React.useContext(UserInfoContext);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const { usernameOrEmail, password } = inputInfo;
      const validation = validate({
        usernameOrEmail: usernameOrEmail.value,
        password: password.value,
      });

      setInputInfo(() => ({
        usernameOrEmail: {
          value: usernameOrEmail.value,
          error: validation.errors.usernameOrEmail,
        },
        password: {
          value: password.value,
          error: validation.errors.password,
        },
      }));

      if (
        !usernameOrEmail.value ||
        !password.value ||
        !!inputInfo.usernameOrEmail.error ||
        !!inputInfo.password.error
      ) {
        setShowPopup(true);
        setPopupVariant(POPUP_VARIANT.ERROR);
        setPopupContent(POPUP_MSG.ERROR);
        return;
      }
      setApiProgress(API_PROGRESS.REQ);
      const { data: apiValues } = await apiLogin({ usernameOrEmail, password });

      if (!apiValues || !apiValues.data.access_token) {
        setShowPopup(true);
        setPopupVariant(POPUP_VARIANT.ERROR);
        setPopupContent(POPUP_MSG.ERROR);
        setApiProgress(API_PROGRESS.FAILED);
      } else {
        setUserInfo({ ...userInfo, token: apiValues.data.access_token });
        history.push('/');
      }
    },
    [inputInfo],
  );

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
