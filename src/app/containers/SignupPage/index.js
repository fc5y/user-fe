import * as React from 'react';

// APIs
import { apiSignup } from 'src/api/index';

// Components
import EnterScreen from './components/EnterScreen';
import EmailOTP from './components/EmailOTP';

// Constants
import { STATE } from './config';

function SignupPageFC5Y() {
  const [state, setState] = React.useState(STATE.ENTER_INFO);
  const [userInput, setUserInput] = React.useState({});

  const onSubmitForm = async (data) => {
    setState(STATE.EMAIL_OTP);
    setUserInput(data);
  };

  const onSignup = (otp) => {
    return apiSignup({ ...userInput, otp });
  };

  switch (state) {
    case STATE.ENTER_INFO:
      return <EnterScreen onSubmitForm={onSubmitForm} />;
    case STATE.EMAIL_OTP:
      return <EmailOTP email={userInput.email} onSignup={onSignup} />;
    default:
      return null;
  }
}

export default SignupPageFC5Y;
