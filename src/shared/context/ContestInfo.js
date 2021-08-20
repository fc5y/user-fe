/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

// API
import { apiGetContestInfo, apiGetAllContestsInfo, apiGetServerTime } from 'src/api/index';

// Utils
import { convertTZ } from 'src/utils/time';

/**
 * // Info
 * contestInfo: { // Store contest info by mapping contest name
 *  [contestName]: <data>,
 * },
 * contests: [], // Store contest info by array (keep order purpose)
 * totalContests,
 * contestServerTime,
 * myParticipationMap: { // Store my participation info by mapping contest name
 *  [contestName]: <data>,
 * },
 *
 * // Function
 * getContestInfoByName: async () => {}
 * getAllContestInfo: async () => {}
 * clearAllContestInfo: () => {}
 */
export const ContestInfoContext = React.createContext({
  contests: [],
  contestInfo: {},
  myParticipationMap: {},
  totalContests: 0,
  contestServerTime: Date.now() / 1000,
  getContestInfoByName: async ({ contestName }) => {},
  getAllContestInfo: async ({ offset, limit }) => {},
  clearAllContestInfo: () => {},
  clearAllParticipations: () => {},
});

export function ContestInfoProvider({ children }) {
  const [contests, setContests] = React.useState([]);
  const [contestInfo, setContestInfo] = React.useState({});
  const [myParticipationMap, setMyParticipationMap] = React.useState({});
  const [totalContests, setTotalContests] = React.useState(0);
  const [contestServerTime, setContestServerTime] = React.useState(null);

  const getServerTime = React.useCallback(async () => {
    const { error, data } = await apiGetServerTime();
    if (!error && data && data.timestamp) {
      setContestServerTime(data.timestamp);
      return data.timestamp;
    }
    return null;
  }, []);

  React.useEffect(() => {
    getServerTime();
  }, []);

  // Get contest info by contest name
  const getContestInfoByName = React.useCallback(
    async ({ contestName }) => {
      const time = await getServerTime();
      const { error, data } = await apiGetContestInfo({ contestName });

      // Save contest info if fetch successfully
      if (!error && data && data.contest) {
        data.timestamp = time || convertTZ(new Date()).time.getTime() / 1000;
        setContestInfo({
          ...contestInfo,
          [contestName]: data.contest,
        });

        // Prepare new myParticipation map
        if (data.my_participation) {
          const newParticipationMap = { ...myParticipationMap };
          newParticipationMap[data.my_participation.name] = data.my_participation;
          setMyParticipationMap(newParticipationMap);
        }
      }

      return { error, data };
    },
    [contestServerTime],
  );

  // Get all contests info
  const getAllContestInfo = React.useCallback(
    async ({ offset, limit }) => {
      const time = await getServerTime();
      const { error, data } = await apiGetAllContestsInfo({ offset, limit });

      // Save contest info if fetch successfully
      if (!error && data && data.contests) {
        data.timestamp = time || convertTZ(new Date()).time.getTime() / 1000;
        // Prepare new contest list
        const newContestList = [...contests];
        for (let x = 0; x < limit; x++) {
          newContestList[x + offset] = data.contests[x];
        }

        setContests(newContestList);
        setTotalContests(data.total || 0);

        // Prepare new myParticipation map
        if (data.my_participations) {
          const newParticipationMap = { ...myParticipationMap };
          (data.my_participations || []).forEach((p) => {
            newParticipationMap[p.name] = p;
          });
          setMyParticipationMap(newParticipationMap);
        }
      }

      return { error, data };
    },
    [contestServerTime],
  );

  const clearAllContestInfo = () => {
    setContests([]);
    setContestInfo({});
    setMyParticipationMap({});
    setTotalContests(0);
    // setContestServerTime(convertTZ(new Date()).time.getTime() / 1000);
  };

  const clearAllParticipations = () => {
    setMyParticipationMap({});
  };

  return (
    <ContestInfoContext.Provider
      value={{
        // info
        contests,
        contestInfo,
        myParticipationMap,
        totalContests,
        contestServerTime,
        // function
        getContestInfoByName,
        getAllContestInfo,
        clearAllContestInfo,
        clearAllParticipations,
      }}
    >
      <>{children}</>
    </ContestInfoContext.Provider>
  );
}

ContestInfoProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
