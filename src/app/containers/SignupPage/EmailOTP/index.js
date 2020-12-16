import * as React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useHistory } from 'react-router-dom';

// Utils
import styled from 'styled-components';
import { validate } from './validators';

// Components
import Loading from 'src/app/common-ui/Loading';
import { Button, PrimaryButton } from 'src/app/common-ui/Button';
import { LabeledInput } from 'src/app/common-ui/Form';
import { SuccessPopup, ErrorPopup } from 'src/app/common-ui/Popup';

// Constants
import { API_PROGRESS } from 'src/shared/constants';
import { ROUTE_LOGIN } from 'src/app/routes/constants';

// Utils
import { getErrorMessage } from 'src/utils/getErrorMessage';

const Container = styled.div`
  width: 500px;
  padding: 36px;
  margin: 48px auto;

  border-radius: 6px;

  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-default);
`;

const Message = styled.div`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 50px;
`;

const Email = styled.span`
  font-weight: bold;
  color: var(--primary-dark);
`;

const OTPInput = styled.div`
  margin-top: 30px;
`;

const ButtonGroups = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

const labels = {
  otp: 'Mã xác minh',
};

function EmailOTP({ email, onSignup, onClickBack }) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });
  const history = useHistory();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validate(values);
    setValues(validation.newValues);
    setErrors(validation.errors);

    // Return if error exists
    if (validation.hasError || typeof onSignup !== 'function') {
      return;
    }

    setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });
    const { code, msg } = await onSignup(validation.newValues.otp);

    if (code) {
      setApiState({ progress: API_PROGRESS.FAILED, code, msg });
    } else {
      setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
    }
  };

  return (
    <Container>
      {apiState.progress === API_PROGRESS.REQ ? (
        <Loading />
      ) : apiState.progress === API_PROGRESS.SUCCESS ? (
        <SuccessPopup
          show
          content="Tạo tài khoản thành công"
          onClose={() => history.push(ROUTE_LOGIN)}
        />
      ) : (
        apiState.code && (
          <ErrorPopup
            show
            content={getErrorMessage(apiState)}
            onClose={() => setApiState({ progress: API_PROGRESS.INIT, code: null, msg: null })}
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
        <Button onClick={onClickBack}>Trở về</Button>
        <PrimaryButton onClick={handleSubmit}>Tạo tài khoản</PrimaryButton>
      </ButtonGroups>
    </Container>
  );
}

EmailOTP.propTypes = {
  email: PropTypes.string,
  onSignup: PropTypes.func,
  onClickBack: PropTypes.func,
};

export default EmailOTP;
