import React from 'react';
import { apiGetUserInfo } from '../../api/authentication';
import PropTypes from 'prop-types';

export const UserInfoContext = React.createContext({
  userInfo: { username: '', email: '', contestPassword: '', token: '' },
  setUserInfo: () => {},
  isFetched: false,
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({
    username: null,
    email: null,
    contestPassword: null,
    token: null,
  });
  const [isFetched, setIsFetched] = React.useState(false);

  React.useEffect(() => {
    const getUserInfo = async () => {
      const data = apiGetUserInfo(userInfo.token);
      if (data.data) {
        setUserInfo({ username: data.data.username, email: data.data.email });
      }
      setIsFetched(true);
    };

    !!userInfo.token && getUserInfo();
  }, [userInfo.token]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, isFetched }}>
      <>{children}</>
    </UserInfoContext.Provider>
  );
}

UserInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export function withUserContext(Component) {
  return function WrapperComponent(props) {
    return (
      <UserInfoContext.Consumer>
        {(state) => <Component {...props} context={state} />}
      </UserInfoContext.Consumer>
    );
  };
}
