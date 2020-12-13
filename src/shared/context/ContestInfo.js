import * as React from 'react';
import PropTypes from 'prop-types';

// API
import { apiGetContestInfo } from 'src/api/index';

/**
 * contestInfo: {
 *  [contestName]: <data>,
 * },
 * getContestInfo: () => {}
 */
export const ContestInfoContext = React.createContext({
  contestInfo: {},
  getContestInfo: async () => {},
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({});

  const getContestInfo = async ({ contestName }) => {
    const { code, data } = await apiGetContestInfo({ contestName });

    // Save contest info if fetch successfully
    if (!code && !!data && !!data.contest) {
      setContestInfo({
        ...contestInfo,
        [contestName]: data.contest,
      });
    }

    return { code };
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
