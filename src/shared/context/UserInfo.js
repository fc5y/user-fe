import React from 'react';
import { apiGetUserInfo } from '../../api/authentication';
import PropTypes from 'prop-types';
import { __USE_BACKUP_API__ } from '../../../webpack/config';

export const UserInfoContext = React.createContext({
  userInfo: { username: '', email: '', contestPassword: '', token: '' },
  setUserInfo: () => {},
  clearUserInfo: () => {},
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
    if (__USE_BACKUP_API__) {
      const getUserInfo = async () => {
        const { data } = await apiGetUserInfo(userInfo.token);

        if (data.data) {
          setUserInfo({ ...userInfo, username: data.data.username });
        }
        setIsFetched(true);
      };

      !!userInfo.token && getUserInfo();
    } else {
      // TODO: Fetch Userinfo from primary API
    }
  }, [userInfo.token]);

  const clearUserInfo = () => {
    setUserInfo({
      username: null,
      email: null,
      contestPassword: null,
      token: null,
    });
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, clearUserInfo, isFetched }}>
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
