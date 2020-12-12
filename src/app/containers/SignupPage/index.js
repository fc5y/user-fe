import * as React from 'react';

// Components
import EnterScreen from './components/EnterScreen';
import EmailOTP from './components/EmailOTP';

// Constants
import { STATE } from './config';

function SignupPageFC5Y() {
  const [state, setState] = React.useState(STATE.ENTER_INFO);

  const onSubmitForm = async (userInput) => {
    console.log(userInput);
    setState(STATE.EMAIL_OTP);
  };

  switch (state) {
    case STATE.ENTER_INFO:
      return <EnterScreen onSubmitForm={onSubmitForm} />;
    case STATE.EMAIL_OTP:
      return <EmailOTP />;
    default:
      return null;
  }
}

export default SignupPageFC5Y;
