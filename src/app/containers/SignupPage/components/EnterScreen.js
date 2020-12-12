import * as React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiSendOTPEmail } from 'src/api';

// Utils
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { validate } from '../utils/validators';
import { getErrorMessage } from 'src/utils/getErrorMessage';

// Components
import * as Form from 'src/app/common-ui/Form';
import Loading from 'src/app/common-ui/Loading';
import { PrimaryButton } from 'src/app/common-ui/Button';
import { ErrorPopup } from 'src/app/common-ui/Popup';

// Constants
import { ROUTE_LOGIN } from 'src/app/routes/constants';
import { API_PROGRESS } from 'src/shared/constants';

const Container = styled.div`
  width: 600px;
  padding: 36px;
  margin: 48px auto;

  border-radius: 6px;

  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TitleLeft = styled.div`
  color: #076daf;
  font-size: 24px;
  font-weight: 600;
`;

const TitleRight = styled.div``;

const labels = {
  fullname: 'Họ và tên',
  email: 'Email',
  username: 'Tên đăng nhập',
  password: 'Mật khẩu',
  confirmPassword: 'Xác nhận mật khẩu',
  school: 'Trường',
  isTermsAccepted: (
    <span>
      Tôi đã đọc và đồng ý với{' '}
      <Link target="_blank" to="/">
        {/* TODO: fix link */}
        điều khoản của Free Contest
      </Link>
    </span>
  ),
};

function EnterScreen({ onSubmitForm }) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    error_msg: null,
  });

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

  const validateAndSubmit = async () => {
    const validation = validate(values);
    setValues(validation.newValues);
    setErrors(validation.errors);

    if (validation.hasError) {
      return;
    }

    setApiState({ progress: API_PROGRESS.REQ, error: null, error_msg: null });
    const { code, data, msg } = await apiSendOTPEmail({ email: validation.newValues.email });

    if (code || !data) {
      setApiState({ progress: API_PROGRESS.FAILED, error: code, error_msg: msg });
    } else {
      setApiState({ ...apiState, progress: API_PROGRESS.SUCCESS });
      onSubmitForm(validation.newValues);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Tạo tài khoản</title>
      </Helmet>
      {apiState.progress === API_PROGRESS.REQ ? (
        <Loading />
      ) : (
        apiState.progress === API_PROGRESS.FAILED && (
          <ErrorPopup
            show
            content={getErrorMessage({ code: apiState.error, msg: apiState.error_msg })}
            onButtonClick={() =>
              setApiState({ progress: API_PROGRESS.REQ, error: null, error_msg: null })
            }
          />
        )
      )}
      <Title>
        <TitleLeft>Tạo tài khoản</TitleLeft>
        <TitleRight>
          <Link to={ROUTE_LOGIN}>Đăng nhập</Link>
        </TitleRight>
      </Title>
      <Form.Form>
        <Form.LabeledInput {...defaultProps('fullname')} type="text" />
        <Form.LabeledInput {...defaultProps('email')} type="email" />
        <Form.LabeledInput {...defaultProps('username')} type="text" />
        <Form.LabeledInput {...defaultProps('password')} type="password" />
        <Form.LabeledInput {...defaultProps('confirmPassword')} type="password" />
        <Form.LabeledInput {...defaultProps('school')} type="text" />
        <Form.LabeledCheckbox
          {...defaultProps('isTermsAccepted')}
          valueWhenChecked="checked"
          valueWhenUnchecked=""
        />
        <Form.ButtonGroup>
          <PrimaryButton onClick={validateAndSubmit}>Tiếp</PrimaryButton>
        </Form.ButtonGroup>
      </Form.Form>
    </Container>
  );
}

EnterScreen.propTypes = {
  onSubmitForm: PropTypes.func,
};

export default EnterScreen;