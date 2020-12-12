import * as React from 'react';

// APIs
import { apiSignup } from 'src/api/index';

// Components
import EnterScreen from './EnterScreen';
import EmailOTP from './EmailOTP';

// Constants
import { STATE } from './config';

function SignupPageFC5Y() {
  const [state, setState] = React.useState(STATE.ENTER_INFO);
  const [userInput, setUserInput] = React.useState({});

  const onSubmitForm = async (data) => {
    setState(STATE.EMAIL_OTP);
    setUserInput(data);
  };

  switch (state) {
    case STATE.ENTER_INFO:
      return <EnterScreen onSubmitForm={onSubmitForm} />;
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

export default SignupPageFC5Y;
