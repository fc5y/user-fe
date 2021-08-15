import * as React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiLogin, apiLoginStatus } from 'src/api/authentication';

// HOC
import { withRouter, Link } from 'react-router-dom';
import { UserInfoContext } from 'src/shared/context/UserInfo';
import withUserNotLogin from 'src/shared/hoc/withUserNotLogin';

// Components
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import Loading from '../../common-ui/Loading';
import { PrimaryButton } from '../../common-ui/Button';
import { Helmet } from 'react-helmet';
import { ErrorPopup, WarningPopup } from '../../common-ui/Popup';

// Constants and utils
import { validate } from './validators';
import { parseUrlQuery } from 'src/utils/url';
import { ROUTE_SIGNUP } from 'src/app/routes/constants';
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { API_PROGRESS, FORGET_PASSWORD_HELP } from 'src/shared/constants';

import styles from './styles.scss';

const labels = {
  usernameOrEmail: 'Tên đăng nhập',
  password: 'Mật khẩu',
};

function LoginPage({ history, location }) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [showWarningForgetPassword, setShowWarningForgetPassword] = React.useState(false);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    msg: null,
  });
  const { setUserInfo } = React.useContext(UserInfoContext);

  const updateValue = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const defaultProps = (name) => ({
    label: labels[name],
    name,
    value: values[name],
    onChange: (newValue) => updateValue(name, newValue),
    error: errors[name],
  });

  // Query object
  const query = parseUrlQuery(location.search);

  // Handle onSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validate(values);
    setValues(validation.newValues);
    setErrors(validation.errors);

    // Return if error exists
    if (validation.hasError) {
      return;
    }

    setApiState({ progress: API_PROGRESS.REQ, error: null, msg: null });
    const loginData = await apiLogin({
      usernameOrEmail: validation.newValues.usernameOrEmail,
      password: validation.newValues.password,
    });

    const { error, data, error_msg: msg } = loginData;

    if (!!error || !data) {
      setApiState({ progress: API_PROGRESS.FAILED, error, msg });
    } else {
      await apiLoginStatus();
      setApiState({ progress: API_PROGRESS.SUCCESS, error, msg });

      // Save token and set isFetched to false to trigger fetching again
      setUserInfo({ isFetched: true, username: data.username });

      // Redirect to the correct URL
      if (!!query && !!query.redirect_url) {
        history.push(decodeURIComponent(query.redirect_url));
      } else {
        history.push('/');
      }
    }
  };

  return (
    <MainPanel.Container>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      {apiState.progress === API_PROGRESS.REQ ? (
        <Loading />
      ) : apiState.progress === API_PROGRESS.FAILED ? (
        <ErrorPopup
          show
          content={getErrorMessage(apiState)}
          onClose={() => setApiState({ progress: API_PROGRESS.INIT, error: null, error_msg: null })}
        />
      ) : (
        showWarningForgetPassword && (
          <WarningPopup
            show
            content={
              <span>
                Vui lòng liên hệ với fanpage tại địa chỉ&nbsp;
                <a href={FORGET_PASSWORD_HELP} target="_blank" rel="noopener noreferrer">
                  {FORGET_PASSWORD_HELP}
                </a>
                &nbsp;để được hỗ trợ
              </span>
            }
            onClose={() => setShowWarningForgetPassword(false)}
          />
        )
      )}
      <div className={styles.headerContainer}>
        <div className={styles.titleLeft}>Đăng nhập</div>
        <div>
          <Link className={styles.createAccount} to={ROUTE_SIGNUP}>
            Tạo tài khoản
          </Link>
        </div>
      </div>
      <Form.Form>
        <Form.LabeledInput
          {...defaultProps('usernameOrEmail')}
          type="text"
          onKeyEnter={handleSubmit}
        />
        <Form.LabeledInput
          {...defaultProps('password')}
          type="password"
          onKeyEnter={handleSubmit}
        />
        <span className={styles.forgotAccount} onClick={() => setShowWarningForgetPassword(true)}>
          Quên mật khẩu?
        </span>
        <Form.ButtonGroup>
          <PrimaryButton disabled={apiState.progress === API_PROGRESS.REQ} onClick={handleSubmit}>
            Đăng nhập
          </PrimaryButton>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

LoginPage.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(withUserNotLogin()(LoginPage));
