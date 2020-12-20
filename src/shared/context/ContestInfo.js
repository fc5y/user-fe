/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

// API
import { apiGetContestInfo, apiGetAllContestsInfo } from 'src/api/index';

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
 * myParticipations: [], // Store my participation info by array (keep order purpose)
 *
 * // Function
 * getContestInfoByName: async () => {}
 * getAllContestInfo: async () => {}
 */
export const ContestInfoContext = React.createContext({
  contests: [],
  contestInfo: {},
  myParticipations: [],
  myParticipationMap: {},
  totalContests: 0,
  contestServerTime: Date.now() / 1000,
  getContestInfoByName: async ({ contestName }) => {},
  getAllContestInfo: async ({ offset, limit }) => {},
});

export function ContestInfoProvider({ children }) {
  const [contests, setContests] = React.useState([]);
  const [contestInfo, setContestInfo] = React.useState({});
  const [myParticipations, setMyParticipations] = React.useState([]);
  const [myParticipationMap, setMyParticipationMap] = React.useState({});
  const [totalContests, setTotalContests] = React.useState(0);
  const [contestServerTime, setContestServerTime] = React.useState(Date.now() / 1000);

  // Get contest info by contest name
  const getContestInfoByName = async ({ contestName }) => {
    const { code, data } = await apiGetContestInfo({ contestName });

    // Save contest info if fetch successfully
    if (!code && data && data.contest) {
      setContestServerTime(data.server_time || contestServerTime);
      setContestInfo({
        ...contestInfo,
        [contestName]: data.contest,
      });

      // Prepare new myParticipation map
      if (data.my_participation) {
        const newParticipationMap = { ...myParticipationMap };
        newParticipationMap[data.my_participation.contest_name] = data.my_participation;
        setMyParticipationMap(newParticipationMap);
      }
    }

    return { code, data };
  };

  // Get all contests info
  const getAllContestInfo = async ({ offset, limit }) => {
    const { code, data } = await apiGetAllContestsInfo({ offset, limit });

    // Save contest info if fetch successfully
    if (!code && data && data.contests) {
      // Prepare new contest list
      const newContestList = [...contests];
      for (let x = 0; x < limit; x++) {
        newContestList[x + offset] = data.contests[x];
      }

      setContests(newContestList);
      setTotalContests(data.total || 0);
      setContestServerTime(data.server_time || contestServerTime);

      // Prepare new myParticipation map
      if (data.my_participations) {
        const newParticipationMap = { ...myParticipationMap };
        (data.my_participations || []).forEach((p) => {
          newParticipationMap[p.contest_name] = p;
        });
        setMyParticipations(data.my_participations);
        setMyParticipationMap(newParticipationMap);
      }
    }

    return { code, data };
  };

  return (
    <ContestInfoContext.Provider
      value={{
        // info
        contests,
        contestInfo,
        myParticipations,
        myParticipationMap,
        totalContests,
        contestServerTime,
        // function
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
