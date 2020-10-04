import React from 'react';
import PropTypes from 'prop-types';

export const UserInfoContext = React.createContext({ username: '', email: '' });

export function UserInfoProvider({ children }) {
  const fetchedUserInfo = { username: 'test123', email: 'test@gmail.com' };

  return (
    <UserInfoContext.Provider value={fetchedUserInfo}>
      <>{children}</>
    </UserInfoContext.Provider>
  );
}

UserInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
