import React from 'react';
import PropTypes from 'prop-types';

export const ContestInfoContext = React.createContext({
  contestInfo: { isContestReady: null, isRegisterClosed: null, isFetched: null },
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({
    isContestReady: null,
    isRegisterClosed: null,
    isFetched: false,
  });

  React.useEffect(() => {
    const getContestTime = async () => {
      // Due to unstability of apiGetTime, we hard code the time result here
      setContestInfo({
        ...contestInfo,
        isRegisterClosed: true,
        isContestReady: true,
        isFetched: true,
      });
    };

    !contestInfo.isFetched && getContestTime();
  }, [contestInfo.isFetched]);

  return (
    <ContestInfoContext.Provider value={{ contestInfo }}>
      <>{children}</>
    </ContestInfoContext.Provider>
  );
}

ContestInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
