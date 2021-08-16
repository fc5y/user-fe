import * as React from 'react';
import PropTypes from 'prop-types';

// Apis
import { apiGetMyUserInfo, apiLogout } from 'src/api';

const INITIAL_USER_INFO = {
  username: '',
  email: '',
  school: '',
  fullname: '',
  isFetched: null,
};

export const UserInfoContext = React.createContext({
  userInfo: INITIAL_USER_INFO,
  setUserInfo: () => {},
  clearUserInfo: () => {},
  getUserInfo: () => {},
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState(INITIAL_USER_INFO);

  const getUserInfo = React.useCallback(async () => {
    const { error, data } = await apiGetMyUserInfo();

    if (!error && data) {
      setUserInfo({
        ...userInfo,
        username: data.user.username || userInfo.username,
        email: data.user.email || userInfo.email,
        school: data.user.school_name || userInfo.school,
        fullname: data.user.full_name || userInfo.fullname,
        isFetched: true,
      });
    } else {
      setUserInfo({ ...INITIAL_USER_INFO, isFetched: true });
    }
  }, [userInfo]);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const clearUserInfo = React.useCallback(() => {
    setUserInfo({
      username: '',
      email: '',
      school: '',
      fullname: '',
      isFetched: true,
    });
    apiLogout();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo: (data) => setUserInfo((userInfo) => ({ ...userInfo, ...data })),
        clearUserInfo,
        getUserInfo,
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
