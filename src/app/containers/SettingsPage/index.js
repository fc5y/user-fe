import React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiGetMyUserInfo, apiUpdateUserInfo } from 'src/api/user';

// HOC
import { withRouter } from 'react-router-dom';
import withUserLogin from 'src/shared/hoc/withUserLogin';
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Components
import Loading from '../../common-ui/Loading';

// UI
import * as MainPanel from '../../common-ui/MainPanel';
import * as Form from '../../common-ui/Form';
import { PrimaryButton } from '../../common-ui/Button';
import { Helmet } from 'react-helmet';
import { ErrorPopup, SuccessPopup } from '../../common-ui/Popup';

// Constants and utils
import { API_PROGRESS } from 'src/shared/constants';
import { validate } from './validators';

const labels = {
  fullname: 'Họ và tên',
  school: 'Trường học',
  email: 'Email liên lạc',
};

function SettingsPage({ history, location }) {
  const { userInfo } = React.useContext(UserInfoContext);
  const { full_name: fullname, school_name: school, email } = apiGetMyUserInfo(userInfo.token);
  const [values, setValues] = React.useState({
    fullname,
    school,
    email,
  });
  const [errors, setErrors] = React.useState({});
  const [hasError, setHasError] = React.useState(false);
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
        setHasError(true);
        return;
      }

      setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
      const { code, data, msg } = await apiUpdateUserInfo({ email: validation.newValues.email });

      if (code || !data) {
        setApiState({ progress: API_PROGRESS.FAILED, code, msg });
      } else {
        setApiState({ ...apiState, progress: API_PROGRESS.SUCCESS });
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
      ) : hasError ? (
        <ErrorPopup
          show
          content="Thông tin nhập không hợp lệ!"
          onClose={() => setHasError(false)}
        />
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
            content="Lưu thay đổi thành công"
            onClose={() =>
              setApiState({ progress: API_PROGRESS.INIT, error: null, error_msg: null })
            }
          />
        )
      )}
      <MainPanel.Title>Thông tin cá nhân</MainPanel.Title>
      <Form.Form>
        <Form.LabeledInput {...defaultProps('fullname')} type="text" />
        <Form.LabeledInput {...defaultProps('school')} type="text" />
        <Form.LabeledInput {...defaultProps('email')} isDisabled type="text" />
        <Form.ButtonGroup>
          <PrimaryButton disabled={apiState.progress === API_PROGRESS.REQ} onClick={handleSubmit}>
            Lưu thay đổi
          </PrimaryButton>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

SettingsPage.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(withUserLogin()(SettingsPage));
