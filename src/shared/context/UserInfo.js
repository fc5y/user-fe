import React from 'react';
import { apiGetUserInfo } from 'src/api';
import PropTypes from 'prop-types';

export const UserInfoContext = React.createContext({
  userInfo: { username: '', email: '', token: null, isFetched: null },
  setUserInfo: () => {},
  clearUserInfo: () => {},
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({
    username: '',
    email: '',
    token: null,
    isFetched: null,
  });
  const [isTokenLoaded, setIsTokenLoaded] = React.useState(false);

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await apiGetUserInfo(userInfo.token);
      if (data) {
        setUserInfo({ ...userInfo, username: data.username, isFetched: true });
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

  const clearUserInfo = () => {
    setUserInfo({
      username: null,
      email: null,
      token: null,
    });

    localStorage.clear('userinfo');
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, clearUserInfo }}>
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
