import React from 'react';
import PropTypes from 'prop-types';

export const UserInfoContext = React.createContext({
  userInfo: { username: '', email: '', contestPassword: '' },
  setUserInfo: () => {},
  isFetched: false,
});

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState({
    username: null,
    email: null,
    contestPassword: null,
  });
  const [isFetched, setIsFetched] = React.useState(false);

  React.useEffect(() => {
    // TODO: Change to fetch userInfo here
    setTimeout(() => {
      // setUserInfo({ username: 'mick123', email: 'test@gmail.com' });
      setIsFetched(true);
    }, 1000);
  }, []);

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
