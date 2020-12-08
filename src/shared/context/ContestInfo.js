import React from 'react';
import PropTypes from 'prop-types';

export const ContestInfoContext = React.createContext({
  contestInfo: { isContestReady: null, isRegisterClosed: null, isFetched: null, contestURL: '' },
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({
    isContestReady: null,
    isRegisterClosed: null,
    isFetched: false,
    contestURL: '',
  });

  React.useEffect(() => {
    const getContestTime = async () => {
      // TODO: Add API to get Contest info
      setContestInfo({
        ...contestInfo,
        isFetched: true,
      });
    };

    !contestInfo.isFetched && getContestTime();
  }, []);

  return (
    <ContestInfoContext.Provider value={{ contestInfo }}>
      <>{children}</>
    </ContestInfoContext.Provider>
  );
}

ContestInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
