import * as React from 'react';
import PropTypes from 'prop-types';

// APIs
import { apiRequestResetPassword } from 'src/api';

// Utils
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { validate } from './validators';
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
  padding: 24px 36px;
  margin: 48px auto;

  border-radius: 6px;

  background-color: white;
  filter: drop-shadow(0px 0px 12px rgba(188, 188, 188, 0.25));
  color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  margin-bottom: 30px;
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
  email: 'Email',
};

function EnterEmail({ onSubmitForm, userInput }) {
  const [values, setValues] = React.useState({
    email: userInput.email || '',
  });
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
    const { error, error_msg } = await apiRequestResetPassword({
      email: validation.newValues.email,
    });

    if (error) {
      setApiState({ progress: API_PROGRESS.FAILED, error, error_msg });
    } else {
      setApiState({ progress: API_PROGRESS.SUCCESS, error: null, error_msg: null });
      onSubmitForm(validation.newValues);
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Quên mật khẩu</title>
      </Helmet>
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
      <Title>
        <TitleLeft>Quên mật khẩu</TitleLeft>
        <TitleRight>
          <Link to={ROUTE_LOGIN}>Đăng nhập</Link>
        </TitleRight>
      </Title>
      <Form.Form>
        <Form.LabeledInput {...defaultProps('email')} type="email" onKeyEnter={validateAndSubmit} />
        <Form.ButtonGroup>
          <PrimaryButton onClick={validateAndSubmit}>Tiếp</PrimaryButton>
        </Form.ButtonGroup>
      </Form.Form>
    </Container>
  );
}

EnterEmail.propTypes = {
  onSubmitForm: PropTypes.func,
  userInput: PropTypes.object,
};

export default EnterEmail;
