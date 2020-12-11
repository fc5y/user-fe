import React from 'react';
import PropTypes from 'prop-types';

/**
 * contestInfo: {
 *  [contestId]: { isContestReady: null, isRegisterClosed: null, isFetched: null },
 * },
 * getContestInfo: () => {}
 */
export const ContestInfoContext = React.createContext({
  contestInfo: {},
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({});

  const getContestInfo = async ({ token, contestId }) => {
    // TODO: Add API to get Contest info
    setContestInfo({
      ...contestInfo,
    });
  };

  return (
    <ContestInfoContext.Provider value={{ contestInfo, getContestInfo }}>
      <>{children}</>
    </ContestInfoContext.Provider>
  );
}

ContestInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
