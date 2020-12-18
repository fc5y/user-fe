/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

// API
import { apiGetContestInfo, apiGetAllContestsInfo } from 'src/api/index';

/**
 * contestInfo: {
 *  [contestName]: <data>,
 * },
 * contestServerTime,
 * getContestInfoByName: async () => {}
 * getAllContestInfo: async () => {}
 */
export const ContestInfoContext = React.createContext({
  contestInfo: {},
  contestServerTime: Number.MIN_SAFE_INTEGER,
  getContestInfoByName: async ({ contestName }) => {},
  getAllContestInfo: async ({ offset, limit, started }) => {},
});

export function ContestInfoProvider({ children }) {
  const [contestInfo, setContestInfo] = React.useState({});
  const [contestServerTime, setContestServerTime] = React.useState(Number.MIN_SAFE_INTEGER);

  const getContestInfoByName = async ({ contestName }) => {
    const { code, data } = await apiGetContestInfo({ contestName });

    // Save contest info if fetch successfully
    if (!code && !!data && !!data.contest) {
      setContestServerTime(data.server_time || contestServerTime);
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

      setContestServerTime(data.server_time || contestServerTime);
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
        contestServerTime,
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
