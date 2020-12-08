import * as React from 'react';
import { apiGetUserInfo } from 'src/api';
import PropTypes from 'prop-types';

export const UserInfoContext = React.createContext({
  userInfo: { username: '', email: '', token: null, isFetched: null },
  setUserInfo: () => {},
  clearUserInfo: () => {},
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({
    id: null,
    username: '',
    email: '',
    token: null,
    fullname: '',
    isFetched: null,
  });
  const [isTokenLoaded, setIsTokenLoaded] = React.useState(false);

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { code, data } = await apiGetUserInfo(userInfo.token);

      if (!code && data) {
        setUserInfo({
          ...userInfo,
          username: data.user.username || userInfo.username,
          id: data.user.id || userInfo.id,
          email: data.user.email || userInfo.email,
          fullname: data.user.full_name || userInfo.fullname,
          isFetched: true,
        });
      } else {
        setUserInfo({ ...userInfo, isFetched: true });
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
    const userInfoInLocalStorage = JSON.parse(localStorage.getItem('userinfo'));
    if (!!userInfoInLocalStorage && !!userInfoInLocalStorage.token) {
      setUserInfo({ ...userInfo, token: userInfoInLocalStorage.token });
    }
    setIsTokenLoaded(true);
  }, []);

  // Save local storage
  React.useEffect(() => {
    localStorage.setItem('userinfo', JSON.stringify(userInfo));
  }, [userInfo]);

  const clearUserInfo = React.useCallback(() => {
    setUserInfo({
      id: null,
      username: '',
      email: '',
      token: null,
      fullname: '',
    });

    localStorage.clear('userinfo');
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
