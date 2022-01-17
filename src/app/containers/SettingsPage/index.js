import * as React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiRequestChangeEmail, apiUpdateUserInfo, apiChangeEmail } from 'src/api';

// HOC
import withUserLogin from 'src/shared/hoc/withUserLogin';
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import Loading from '../../common-ui/Loading';
import EmailOTP from '../../components/EmailOTP';

// UI
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import styled from 'styled-components';
import { PrimaryButton } from '../../common-ui/Button';
import { Helmet } from 'react-helmet';
import { ErrorPopup, SuccessPopup } from '../../common-ui/Popup';

// Constants and utils
import { API_PROGRESS } from 'src/shared/constants';
import { validate } from './validators';
import { ROUTE_SETTINGS, ROUTE_LOGIN } from '../../routes/constants';
import { STATE } from './config';
import { getErrorMessage } from 'src/utils/getErrorMessage';

const TitleWrapper = styled.div`
  margin-bottom: 30px;
`;

const Button = styled(PrimaryButton)`
  height: 42px;
  margin-top: 30px;
`;

const labels = {
  fullname: 'Họ và tên',
  school: 'Trường học',
  email: 'Email liên lạc',
};

function SettingsPage() {
  const { userInfo, setUserInfo } = React.useContext(UserInfoContext);
  const [values, setValues] = React.useState({});
  const [isEmailChanged, setIsEmailChanged] = React.useState(false);
  const [state, setState] = React.useState(STATE.USER_INFO);
  React.useEffect(() => {
    const { fullname, school, email } = userInfo;
    setValues({ fullname, school, email });
  }, []);

  const [errors, setErrors] = React.useState({});
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    error_msg: null,
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
    if (labels[name] === labels.email) setIsEmailChanged(true);
  };

  const defaultProps = (name) => ({
    label: labels[name],
    name,
    value: values[name],
    onChange: (newValue) => handleChange(name, newValue),
    error: errors[name],
  });

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const validation = validate(values);
      setValues(validation.newValues);
      setErrors(validation.errors);

      if (validation.hasError) {
        return;
      }

      const { fullname, school, email } = values;
      setApiState({ progress: API_PROGRESS.REQ, error: null, error_msg: null });

      if (isEmailChanged) {
        const { error, data, error_msg } = await apiRequestChangeEmail({ email });
        if (error || !data) {
          setApiState({ progress: API_PROGRESS.FAILED, error, error_msg });
          return null;
        } else {
          setApiState({ ...apiState, progress: API_PROGRESS.SUCCESS });
          setUserInfo({ ...userInfo, email });
          setState(STATE.EMAIL_OTP);
        }
      }
      const { error, data, error_msg } = await apiUpdateUserInfo({
        fullname,
        school,
      });

      if (error || !data) {
        setApiState({ progress: API_PROGRESS.FAILED, error, error_msg });
      } else {
        setApiState({ ...apiState, progress: API_PROGRESS.SUCCESS });
        setUserInfo({ ...userInfo, fullname, school });
      }
    },
    [values],
  );
  switch (state) {
    case STATE.USER_INFO:
      return (
        <MainPanel.Container>
          <Helmet>
            <title>Cài đặt</title>
          </Helmet>
          {apiState.progress === API_PROGRESS.REQ ? (
            <Loading />
          ) : apiState.progress === API_PROGRESS.FAILED ? (
            <ErrorPopup
              show
              content={getErrorMessage(apiState)}
              onClose={() => setApiState({ progress: API_PROGRESS.INIT, error: null, msg: null })}
            />
          ) : (
            apiState.progress === API_PROGRESS.SUCCESS && (
              <SuccessPopup
                show
                content="Lưu thay đổi thành công!"
                onClose={() => {
                  setApiState({ progress: API_PROGRESS.INIT, error: null, msg: null });
                  window.location.reload();
                }}
              />
            )
          )}
          <TitleWrapper>
            <MainPanel.Title>Thông tin cá nhân</MainPanel.Title>
          </TitleWrapper>
          <Form.Form>
            <Form.LabeledInput {...defaultProps('fullname')} type="text" />
            <Form.LabeledInput {...defaultProps('school')} type="text" />
            <Form.LabeledInput {...defaultProps('email')} type="text" />
            <Form.ButtonGroup>
              <Button disabled={apiState.progress === API_PROGRESS.REQ} onClick={handleSubmit}>
                Lưu thay đổi
              </Button>
            </Form.ButtonGroup>
          </Form.Form>
        </MainPanel.Container>
      );
    case STATE.EMAIL_OTP:
      return (
        <EmailOTP
          email={values.email}
          username={userInfo.username}
          onSubmit={(token) => apiChangeEmail({ email: values.email, token })}
          onSubmitSuccess={() => setState(STATE.USER_INFO)}
          onClickBack={() => {
            setState(STATE.USER_INFO);
            setApiState({ progress: API_PROGRESS.INIT, error: null, error_msg: null });
          }}
          route={ROUTE_SETTINGS}
          btnSubmitContent="Thay đổi"
        />
      );
    default:
      return null;
  }
}

SettingsPage.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withUserLogin(ROUTE_LOGIN)(SettingsPage);
