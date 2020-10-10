import React from 'react';
import PropTypes from 'prop-types';

export const ContestInfoContext = React.createContext({
  isContestReady: null,
  time: null,
  name: null,
});

export function ContestInfoProvider({ children }) {
  const [contestInfo] = React.useState({
    isContestReady: null,
    time: null,
    name: null,
  });

  React.useEffect(() => {
    // TODO: Fetch contest info if needed
  }, []);

  return (
    <ContestInfoContext.Provider value={contestInfo}>
      <>{children}</>
    </ContestInfoContext.Provider>
  );
}

ContestInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
