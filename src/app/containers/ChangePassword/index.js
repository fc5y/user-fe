import React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiChangeUserPassword } from 'src/api/user';

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
  currentPassword: 'Thay đổi mật khẩu',
  newPassword: 'Mật khẩu mới',
  confirmNewPassword: 'Xác nhận mật khẩu mới',
};

function ChangePassword({ history, location }) {
  const [values, setValues] = React.useState({});
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

      const { currentPassword, newPassword } = values;

      setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
      const { code, data, msg } = await apiChangeUserPassword({ currentPassword, newPassword });

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
        <title>Thay đổi mật khẩu</title>
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
      <MainPanel.Title>Thay đổi mật khẩu</MainPanel.Title>
      <Form.Form>
        <Form.LabeledInput {...defaultProps('currentPassword')} type="password" />
        <Form.LabeledInput {...defaultProps('newPassword')} type="password" />
        <Form.LabeledInput {...defaultProps('confirmNewPassword')} type="password" />
        <Form.ButtonGroup>
          <PrimaryButton disabled={apiState.progress === API_PROGRESS.REQ} onClick={handleSubmit}>
            Lưu thay đổi
          </PrimaryButton>
        </Form.ButtonGroup>
      </Form.Form>
    </MainPanel.Container>
  );
}

ChangePassword.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(withUserLogin('/auth/login')(ChangePassword));
