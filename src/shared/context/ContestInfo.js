/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

// API
import { apiGetContestInfo, apiGetAllContestsInfo } from 'src/api/index';

/**
 * contestInfo: { // Store contest info key by contest name
 *  [contestName]: <data>,
 * },
 * contests: [], // Store contest info by array
 * totalContests,
 * contestServerTime,
 * getContestInfoByName: async () => {}
 * getAllContestInfo: async () => {}
 */
export const ContestInfoContext = React.createContext({
  contests: [],
  totalContests: 0,
  contestInfo: {},
  contestServerTime: Number.MIN_SAFE_INTEGER,
  getContestInfoByName: async ({ contestName }) => {},
  getAllContestInfo: async ({ offset, limit }) => {},
});

export function ContestInfoProvider({ children }) {
  const [contests, setContests] = React.useState([]);
  const [contestInfo, setContestInfo] = React.useState({});
  const [totalContests, setTotalContests] = React.useState(0);
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

  const getAllContestInfo = async ({ offset, limit }) => {
    const { code, data } = await apiGetAllContestsInfo({ offset, limit });

    // Save contest info if fetch successfully
    if (!code && !!data && !!data.contests) {
      const newContestList = [...contests];
      for (let x = 0; x < limit; x++) {
        newContestList[x + offset] = data.contests[x];
      }

      setContests(newContestList);
      setTotalContests(data.total || 0);
      setContestServerTime(data.server_time || contestServerTime);
    }

    return { code, data };
  };

  return (
    <ContestInfoContext.Provider
      value={{
        contests,
        contestInfo,
        totalContests,
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
