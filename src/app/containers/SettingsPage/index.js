import * as React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiUpdateUserInfo } from 'src/api/user';

// HOC
import withUserLogin from 'src/shared/hoc/withUserLogin';
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import Loading from '../../common-ui/Loading';

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
import { ROUTE_LOGIN } from '../../routes/constants';

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
  React.useEffect(() => {
    const { fullname, school, email } = userInfo;
    setValues({ fullname, school, email });
  }, []);

  const [errors, setErrors] = React.useState({});
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
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

      const { fullname, school } = values;
      const { token } = userInfo;

      setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
      const { code, data, msg } = await apiUpdateUserInfo({
        fullname,
        school,
        token,
      });

      if (code || !data) {
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        setApiState({ ...apiState, progress: API_PROGRESS.SUCCESS });
        setUserInfo({ ...userInfo, fullname, school });
      }
    },
    [values],
  );

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
          content="Đã xảy ra lỗi, vui lòng thử lại sau"
          onClose={() => setApiState({ progress: API_PROGRESS.INIT, error: null, error_msg: null })}
        />
      ) : (
        apiState.progress === API_PROGRESS.SUCCESS && (
          <SuccessPopup
            show
            content="Đổi mật khẩu thành công!"
            onClose={() => {
              setApiState({ progress: API_PROGRESS.INIT, error: null, error_msg: null });
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
        <Form.LabeledInput {...defaultProps('email')} disabled type="text" />
        <Form.ButtonGroup>
          <Button disabled={apiState.progress === API_PROGRESS.REQ} onClick={handleSubmit}>
            Lưu thay đổi
          </Button>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

SettingsPage.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withUserLogin(ROUTE_LOGIN)(SettingsPage);
