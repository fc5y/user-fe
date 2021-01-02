import * as React from 'react';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';
import { UserInfoContext } from 'src/shared/context/UserInfo';

// Utils and constants
import { categorizeContestTypes } from 'src/utils/contest';
import { API_PROGRESS } from 'src/shared/constants';

function useFetchContestInfo({ limit, offset, forceFetch, onFetchCompleted }) {
  const [onGoingContests, setOnGoingContests] = React.useState([]);
  const [endedContests, setEndedContests] = React.useState([]);
  const [todayContests, setTodayContests] = React.useState([]);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    code: null,
    msg: null,
  });

  const { getAllContestInfo, totalContests, contests, contestServerTime } = React.useContext(
    ContestInfoContext,
  );
  const { userInfo } = React.useContext(UserInfoContext);

  const fetchContestsInfo = async () => {
    setApiState({ progress: API_PROGRESS.REQ, code: null, msg: null });

    const params = userInfo.token
      ? { token: userInfo.token, offset, limit }
      : {
          offset,
          limit,
        };

    const { code, data, msg } = await getAllContestInfo(params);

    if (code || !data || !data.contests) {
      setApiState({ progress: API_PROGRESS.FAILED, code, msg });
    } else {
      const sanitizedContests = categorizeContestTypes(
        data.contests,
        data.server_time || contestServerTime,
      );
      setOnGoingContests(sanitizedContests.onGoingContests);
      setEndedContests(sanitizedContests.endedContests);

      if (sanitizedContests.todayContests.length) {
        setTodayContests(sanitizedContests.todayContests);
      }
      setApiState({ progress: API_PROGRESS.SUCCESS, code: null, msg: null });
    }

    typeof onFetchCompleted === 'function' && onFetchCompleted();
  };

  // Fetch new contests
  React.useEffect(() => {
    fetchContestsInfo();
  }, [forceFetch, userInfo.token]);

  // Get contests from old data and show first
  React.useEffect(() => {
    const currentContests = contests.slice(offset, offset + limit).filter((c) => !!c);

    if (currentContests.length) {
      const sanitizedContests = categorizeContestTypes(currentContests, contestServerTime);
      setOnGoingContests(sanitizedContests.onGoingContests);
      setEndedContests(sanitizedContests.endedContests);
    } else {
      setOnGoingContests([]);
      setEndedContests([]);
    }
    fetchContestsInfo();
  }, [limit, offset]);

  return {
    apiState,
    totalContests,
    onGoingContests,
    endedContests,
    todayContests,
  };
}

export default useFetchContestInfo;
