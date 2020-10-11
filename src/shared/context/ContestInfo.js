import React from 'react';
import PropTypes from 'prop-types';

export const ContestInfoContext = React.createContext({
  contestInfo: { isContestReady: null, isFetched: null },
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({
    isContestReady: null,
    isFetched: false,
  });

  React.useEffect(() => {
    const getContestTime = () => {
      setContestInfo({ ...contestInfo, isContestReady: true, isFetched: true });
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
