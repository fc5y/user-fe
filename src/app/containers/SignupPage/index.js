import * as React from 'react';

// APIs
import { apiSignup } from 'src/api/index';

// HOC
import withUserNotLogin from 'src/shared/hoc/withUserNotLogin';

// Components
import EnterScreen from './EnterScreen';
import EmailOTP from './EmailOTP';

// Constants
import { STATE } from './config';

function SignupPageFC5Y() {
  const [state, setState] = React.useState(STATE.ENTER_INFO);
  const [userInput, setUserInput] = React.useState({});

  const onSubmitForm = async (data) => {
    setUserInput(data);
    setState(STATE.EMAIL_OTP);
  };

  switch (state) {
    case STATE.ENTER_INFO:
      return <EnterScreen onSubmitForm={onSubmitForm} userInput={userInput} />;
    case STATE.EMAIL_OTP:
      return (
        <EmailOTP
          email={userInput.email}
          onSignup={(otp) => apiSignup({ ...userInput, otp })}
          onClickBack={() => setState(STATE.ENTER_INFO)}
        />
      );
    default:
      return null;
  }
}

export default withUserNotLogin()(SignupPageFC5Y);
