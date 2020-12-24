import React from 'react';

// Components
import { Redirect } from 'react-router-dom';
import Loading from 'src/app/common-ui/Loading';

// Context
import { UserInfoContext } from '../context/UserInfo';

export default function withUserNotLogin(redirectRoute) {
  /**
   * This HOC will help force the Component to be render only when user
   * not login yet. If user already login, then it will redirect to
   * `redirectRoute` route if it's defined or `/` (Homepage) as default.
   */
  return (Component) =>
    function WrapperComponent(props) {
      const { userInfo } = React.useContext(UserInfoContext);

      // Show nothing if userInfo hasn't been fetched
      if (!userInfo.isFetched) {
        return <Loading />;
      }

      // Redirect if user has logged in
      if (userInfo && userInfo.username && userInfo.token) {
        return <Redirect to={redirectRoute || '/'} />;
      }

      return <Component {...props} />;
    };
}
