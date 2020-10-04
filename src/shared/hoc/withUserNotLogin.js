import React from 'react';

// Components
import { Redirect } from 'react-router-dom';

// Context
import { UserInfoContext } from '../context/UserInfo';

export default function withUserNotLogin(Component) {
  return function WrapperComponent() {
    const { userInfo } = React.useContext(UserInfoContext);

    // Redirect to homepage if user has logged in and try to access Component
    if (!!userInfo && !!userInfo.username) {
      return <Redirect to="/" />;
    }

    return <Component />;
  };
}
