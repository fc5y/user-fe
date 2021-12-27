import * as React from 'react';

// APIs
import { apiResetPassword } from 'src/api';

// HOC
import withUserNotLogin from 'src/shared/hoc/withUserNotLogin';

// Components
import EnterEmail from './EnterEmail';
import EmailOTP from './EmailOTP';
import EnterPassword from './EnterPassword';

// Constants
import { STATE } from './config';

function ResetPasswordPage() {
  const [state, setState] = React.useState(STATE.ENTER_EMAIL);
  const [userInput, setUserInput] = React.useState({});
  const [token, setToken] = React.useState();

  const onSubmitForm = async (data) => {
    setUserInput(data);
    setState(STATE.EMAIL_OTP);
  };

  const onVerifiedOTP = async (token) => {
    setToken(token);
    setState(STATE.ENTER_PASSWORD);
  };

  switch (state) {
    case STATE.ENTER_EMAIL:
      return <EnterEmail onSubmitForm={onSubmitForm} userInput={userInput} />;
    case STATE.EMAIL_OTP:
      return (
        <EmailOTP
          email={userInput.email}
          onVerified={(token) => onVerifiedOTP(token)}
          onClickBack={() => setState(STATE.ENTER_EMAIL)}
        />
      );
    case STATE.ENTER_PASSWORD:
      return (
        <EnterPassword
          setPassword={(new_password) =>
            apiResetPassword({ email: userInput.email, new_password, token })
          }
        />
      );
    default:
      return null;
  }
}

export default withUserNotLogin()(ResetPasswordPage);
