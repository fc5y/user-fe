import * as React from 'react';

// Context
import { ContestInfoContext } from 'src/shared/context/ContestInfo';

// Utils and constants
import { categorizeContestTypes } from 'src/utils/contest';
import { API_PROGRESS } from 'src/shared/constants';

function useFetchContestInfo({ limit, offset, forceFetch, onFetchCompleted }) {
  const [onGoingContests, setOnGoingContests] = React.useState([]);
  const [endedContests, setEndedContests] = React.useState([]);
  const [todayContests, setTodayContests] = React.useState([]);
  const [apiState, setApiState] = React.useState({
    progress: API_PROGRESS.INIT,
    error: null,
    error_msg: null,
  });

  const { getAllContestInfo, totalContests, contests, contestServerTime } = React.useContext(
    ContestInfoContext,
  );

  const fetchContestsInfo = async () => {
    setApiState({ progress: API_PROGRESS.REQ, error: null, error_msg: null });

    const { error, data, error_msg } = await getAllContestInfo({ offset, limit });

    if (error || !data || !data.contests) {
      setApiState({ progress: API_PROGRESS.FAILED, error, error_msg });
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
      setApiState({ progress: API_PROGRESS.SUCCESS, error: null, error_msg: null });
    }

    typeof onFetchCompleted === 'function' && onFetchCompleted();
  };

  // Fetch new contests
  React.useEffect(() => {
    if (forceFetch) {
      fetchContestsInfo();
    }
  }, [forceFetch]);

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
