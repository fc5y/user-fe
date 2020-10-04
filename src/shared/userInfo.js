import React from 'react';
import PropTypes from 'prop-types';

export const UserInfoContext = React.createContext({
  userInfo: { username: '', email: '' },
  setUserInfo: () => {},
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({ username: null, email: null });

  React.useEffect(() => {
    // TODO: Change to fetch userInfo here
    setUserInfo({ username: 'test123', email: 'test@gmail.com' });
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <>{children}</>
    </UserInfoContext.Provider>
  );
}

UserInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
