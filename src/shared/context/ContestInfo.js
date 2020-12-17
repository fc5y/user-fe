/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

// API
import { apiGetContestInfo, apiGetAllContestsInfo } from 'src/api/index';

/**
 * contestInfo: {
 *  [contestName]: <data>,
 * },
 * getContestInfoByName: async () => {}
 * getAllContestInfo: async () => {}
 */
export const ContestInfoContext = React.createContext({
  contestInfo: {},
  getContestInfoByName: async ({ contestName }) => {},
  getAllContestInfo: async ({ offset, limit, started }) => {},
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({});

  const getContestInfoByName = async ({ contestName }) => {
    const { code, data } = await apiGetContestInfo({ contestName });

    // Save contest info if fetch successfully
    if (!code && !!data && !!data.contest) {
      setContestInfo({
        ...contestInfo,
        [contestName]: data.contest,
      });
    }

    return { code, data };
  };

  const getAllContestInfo = async ({ offset, limit, started }) => {
    const { code, data } = await apiGetAllContestsInfo({ offset, limit, started });

    // Save contest info if fetch successfully
    if (!code && !!data && !!data.contest) {
      const formattedContestObj = {};
      (data.contests || []).forEach((c) => {
        formattedContestObj[c.contest_name] = c;
      });

      setContestInfo({
        ...contestInfo,
        ...formattedContestObj,
      });
    }

    return { code, data };
  };

  return (
    <ContestInfoContext.Provider
      value={{
        contestInfo,
        getContestInfoByName,
        getAllContestInfo,
      }}
    >
      <>{children}</>
    </ContestInfoContext.Provider>
  );
}

ContestInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
