import React from 'react';
import PropTypes from 'prop-types';
import { apiGetTime } from '../../api/authentication';

export const ContestInfoContext = React.createContext({
  contestInfo: { isContestReady: null, username: null, contestPassword: null, isFetched: null },
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({
    isContestReady: null,
    username: '',
    contestPassword: '',
    isFetched: false,
  });

  React.useEffect(() => {
    const getContestTime = async () => {
      const { data, error } = await apiGetTime();

      if (error || !data) {
        setContestInfo({ ...contestInfo, isContestReady: false, isFetched: true });
      } else if (data.countdownOpen <= 0) {
        setContestInfo({ ...contestInfo, isContestReady: true, isFetched: true });
      } else {
        setContestInfo({ ...contestInfo, isContestReady: false, isFetched: true });
      }
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
