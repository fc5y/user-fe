/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

// Components
import Loading from 'src/app/common-ui/Loading';

// Context
import { UserInfoContext } from '../context/UserInfo';

// Constants
import { ROUTE_LOGIN, ROUTE_HOMEPAGE } from 'src/app/routes/constants';

export default function withUserLogin(redirectToLogin) {
  /**
   * This HOC will help force the Component to be render only when user
   * login already. If user not login yet, then it will redirect to
   * login route if `redirectRoute` is true or `/` (Homepage) as default.
   */
  return (Component) =>
    function WrapperComponent(props) {
      const location = useLocation();
      const { userInfo } = React.useContext(UserInfoContext);

      // Show nothing if userInfo hasn't been fetched
      if (!userInfo.isFetched) {
        return <Loading />;
      }

      // Redirect if user not yet logged in
      if (!userInfo || !userInfo.username) {
        if (redirectToLogin) {
          return (
            <Redirect to={`${ROUTE_LOGIN}?redirect_url=${encodeURIComponent(location.pathname)}`} />
          );
        } else {
          return <Redirect to={ROUTE_HOMEPAGE} />;
        }
      }

      return <Component {...props} />;
    };
}
