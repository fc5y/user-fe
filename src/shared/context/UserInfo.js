import * as React from 'react';
import PropTypes from 'prop-types';

// Apis
import { apiGetMyUserInfo } from 'src/api';

// Constants
import { USERINFO_SESSION_KEY } from '../constants';

const INITIAL_USER_INFO = {
  id: null,
  username: '',
  email: '',
  school: '',
  token: null,
  fullname: '',
  isFetched: null,
};

export const UserInfoContext = React.createContext({
  userInfo: INITIAL_USER_INFO,
  setUserInfo: () => {},
  clearUserInfo: () => {},
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState(INITIAL_USER_INFO);
  const [isTokenLoaded, setIsTokenLoaded] = React.useState(false);

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { code, data } = await apiGetMyUserInfo({ token: userInfo.token });

      if (!code && data) {
        setUserInfo({
          ...userInfo,
          username: data.user.username || userInfo.username,
          id: data.user.id || userInfo.id,
          email: data.user.email || userInfo.email,
          school: data.user.school_name || userInfo.school,
          fullname: data.user.full_name || userInfo.fullname,
          isFetched: true,
        });
      } else {
        setUserInfo({ ...INITIAL_USER_INFO, isFetched: true });
      }
    };

    if (isTokenLoaded) {
      if (!!userInfo.token && !userInfo.username) {
        getUserInfo();
      } else {
        setUserInfo({ ...userInfo, isFetched: true });
      }
    }
  }, [userInfo.token, isTokenLoaded]);

  // Get from local storage
  React.useEffect(() => {
    const userInfoInLocalStorage = JSON.parse(localStorage.getItem(USERINFO_SESSION_KEY));
    if (!!userInfoInLocalStorage && !!userInfoInLocalStorage.token) {
      setUserInfo({ ...userInfo, token: userInfoInLocalStorage.token });
    }
    setIsTokenLoaded(true);
  }, []);

  // Save local storage
  React.useEffect(() => {
    localStorage.setItem(USERINFO_SESSION_KEY, JSON.stringify(userInfo));
  }, [userInfo]);

  const clearUserInfo = React.useCallback(() => {
    setUserInfo({
      id: null,
      username: '',
      email: '',
      school: '',
      token: null,
      fullname: '',
    });

    localStorage.clear(USERINFO_SESSION_KEY);
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo: (data) => setUserInfo((userInfo) => ({ ...userInfo, ...data })),
        clearUserInfo,
      }}
    >
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
