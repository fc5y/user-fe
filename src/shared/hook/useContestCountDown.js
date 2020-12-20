/* eslint-disable no-use-before-define */
import * as React from 'react';

// Utils
import useCountDown from './useCountDown';
import { getContestStatus } from 'src/utils/contest';

// Constants
import { CONTEST_STATUS } from 'src/shared/constants';

const useContestCountDown = ({ userInfo, contestInfo, contestServerTime, onChangeToStarting }) => {
  const [shouldTransferTime, setShouldTransferTime] = React.useState(false);
  const [status, setStatus] = React.useState(CONTEST_STATUS.UNSET);
  const { count, startCountDown, stopCountDown } = useCountDown({
    forceStart: false,
  });

  React.useEffect(() => {
    if (!userInfo.isFetched || !contestInfo || !contestInfo.start_time || !contestInfo.duration)
      return;

    const curStatus = getContestStatus(contestInfo, contestServerTime);
    setStatus(curStatus);

    if (contestInfo.start_time > contestServerTime) {
      curStatus === CONTEST_STATUS.STARTING && setShouldTransferTime(true);
      startCountDown(Math.ceil(contestInfo.start_time - contestServerTime));
    } else if (contestInfo.start_time + contestInfo.duration > contestServerTime) {
      startCountDown(Math.ceil(contestInfo.start_time + contestInfo.duration - contestServerTime));
    }
  }, [userInfo, contestInfo]);

  // Handle when count is <= 0
  React.useEffect(() => {
    if (!userInfo.isFetched || status === CONTEST_STATUS.UNSET || count > 0) return;

    if (status === CONTEST_STATUS.NOT_STARTED) {
      setStatus(CONTEST_STATUS.STARTING);
      startCountDown(Math.ceil(contestInfo.duration));
      typeof onChangeToStarting === 'function' && onChangeToStarting();
    } else if (status === CONTEST_STATUS.STARTING) {
      if (shouldTransferTime) {
        startCountDown(Math.ceil(contestInfo.duration));
        setShouldTransferTime(false);
      } else {
        stopCountDown();
      }
    }
  }, [count]);

  return {
    count,
    status,
  };
};

export default useContestCountDown;
