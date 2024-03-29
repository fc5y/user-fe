import * as React from 'react';
import PropTypes from 'prop-types';

// Hook

// Utils
import styled from 'styled-components';
import { validate } from './validators';

// Components
import Loading from 'src/app/common-ui/Loading';
import { LabeledInput } from 'src/app/common-ui/Form';
import { ErrorPopup } from 'src/app/common-ui/Popup';

// Constants
import { API_PROGRESS } from 'src/shared/constants';

// Utils
import { getErrorMessage } from 'src/utils/getErrorMessage';
import { apiVerifyOTP } from 'src/api';

const Container = styled.div`
  width: 600px;
  padding: 24px 36px;
  margin: 48px auto;

  border-radius: 6px;

  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-default);
`;

const Message = styled.div`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 24px;
`;

const Email = styled.span`
  color: var(--primary-dark);
`;

const OTPInput = styled.div`
  margin-top: 20px;
`;

const ButtonGroups = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CommonButton = `
  background: none;
  border: 1px solid var(--primary-default);
  box-shadow: none;
  outline: none;
  height: 42px;
  
  border-radius: 4px;
  padding: 9px 12px;
  min-width: 160px;
  margin-left: 12px;
`;

const ReturnButton = styled.button`
  ${CommonButton}
  background-color: #fff;
  color: var(--primary-default);
`;

const CreateAccountButton = styled.button`
  ${CommonButton}
  background-color: var(--primary-default);
  color: white;
`;

const labels = {
  otp: 'Mã xác minh',
};

function EmailOTP({ email, onVerified, onClickBack }) {
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

  const verifyOTP = async (otp) => {
    const { error, data, error_msg } = await apiVerifyOTP({ email, username: null, otp });
    if (error || !data || !data.token) {
      setApiState({ progress: API_PROGRESS.FAILED, error, error_msg });
      return null;
    } else {
      setApiState({ progress: API_PROGRESS.SUCCESS, error: null, error_msg: null });
      return data.token;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validate(values);
    setValues(validation.newValues);
    setErrors(validation.errors);

    // Return if error exists
    if (validation.hasError || typeof onVerified !== 'function') {
      return;
    }

    setApiState({ progress: API_PROGRESS.REQ, error: null, error_msg: null });
    const otpToken = await verifyOTP(validation.newValues.otp);

    if (!otpToken) return;

    onVerified(otpToken);
  };

  return (
    <Container>
      {apiState.progress === API_PROGRESS.REQ ? (
        <Loading />
      ) : (
        apiState.error && (
          <ErrorPopup
            show
            content={getErrorMessage(apiState)}
            onClose={() =>
              setApiState({ progress: API_PROGRESS.INIT, error: null, error_msg: null })
            }
          />
        )
      )}
      <Title>Nhập mã xác minh</Title>
      <Message>
        Mã xác minh đã được gửi đến email <Email>{email}</Email>.
      </Message>
      <OTPInput>
        <LabeledInput {...defaultProps('otp')} type="text" onKeyEnter={handleSubmit} />
      </OTPInput>
      <ButtonGroups>
        <ReturnButton onClick={onClickBack}>Trở về</ReturnButton>
        <CreateAccountButton onClick={handleSubmit}>Xác nhận</CreateAccountButton>
      </ButtonGroups>
    </Container>
  );
}

EmailOTP.propTypes = {
  email: PropTypes.string,
  onVerified: PropTypes.func,
  onClickBack: PropTypes.func,
};

export default EmailOTP;
