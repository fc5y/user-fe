/* eslint-disable camelcase */
import { CONTEST_STATUS } from 'src/shared/constants';
import { convertTZ } from './time';

/**
 * Util to calculate the contest status based on contest info
 * This util supposed contestInfo is ready
 * @param {object} contestInfo
 */
export function getContestStatus(contestInfo, contestServerTime) {
  if (!contestInfo || !contestInfo.start_time) return 0;

  const now = contestServerTime;
  const { start_time, duration, can_enter, materials = {} } = contestInfo;
  const formattedStartTime = start_time;
  const formattedDuration = duration;
  const endTime = formattedStartTime + formattedDuration;
  const isMaterialAvailable =
    materials &&
    Array.isArray(materials) &&
    materials.length > 0 &&
    materials.some((m) => m.name === 'all_materials_url');

  if (!can_enter && now < formattedStartTime) {
    return CONTEST_STATUS.NOT_STARTED;
  } else if (can_enter || (now >= formattedStartTime && now < endTime)) {
    return CONTEST_STATUS.STARTING;
  } else if (!can_enter && now >= endTime && !isMaterialAvailable) {
    return CONTEST_STATUS.JUST_ENDED;
  } else if (!can_enter && now >= endTime && isMaterialAvailable) {
    return CONTEST_STATUS.ENDED;
  } else {
    return CONTEST_STATUS.UNSET;
  }
}

/**
 * Util to format contest time into two version
 * {
 *   startTime: DD/MM/YYYY hh:mm,
 *   startAndEndTime: DD/MM/YYYY hh:mm - hh:mm,
 * }
 * @param {object} contestInfo
 */
export function formatContestTime(contestInfo) {
  if (!contestInfo || !contestInfo.start_time) return '';

  const { start_time, duration } = contestInfo;
  const formattedStartTime = start_time * 1000;
  const formattedDuration = duration * 1000;
  const endTime = convertTZ(new Date(formattedStartTime + formattedDuration)).time;

  const { time: startTimeObj, utc } = convertTZ(new Date(formattedStartTime));
  const contestStartDay = `${('0' + startTimeObj.getDate()).slice(-2)}/${(
    '0' +
    (startTimeObj.getMonth() + 1)
  ).slice(-2)}/${startTimeObj.getFullYear()}`;
  const contestStartTime = `${startTimeObj.toTimeString().slice(0, 5)}`;
  const contestEndTime = `${endTime.toTimeString().slice(0, 5)}`;

  return {
    startDate: contestStartDay,
    startTime: contestStartTime,
    endTime: contestEndTime,
    startDateAndTime: `${contestStartDay} ${contestStartTime}`,
    startAndEndTime: `${contestStartTime} - ${contestEndTime}`,
    fullTime: `${contestStartDay} ${contestStartTime} - ${contestEndTime}`,
    fullTimeWithUTC: `${contestStartDay} ${contestStartTime} - ${contestEndTime} (UTC${utc})`,
  };
}

/**
 * Util to check if a contest is today contest based on contest server time
 * @param {object} contestInfo
 * @param {number} contestServerTime
 */
export const isTodayContest = (contestInfo, contestServerTime) => {
  if (!contestInfo || !contestInfo.start_time) return 0;

  const now = contestServerTime;

  const startOfTheDay = new Date(now * 1000);
  startOfTheDay.setHours(0, 0, 0, 0);

  const endOfTheDay = new Date(now * 1000);
  endOfTheDay.setHours(23, 59, 59, 999);

  return (
    contestInfo.start_time >= startOfTheDay.getTime() / 1000 &&
    contestInfo.start_time <= endOfTheDay.getTime() / 1000
  );
};

/**
 * Util to categorize contests based on server time
 * @param {object} contests
 * @param {number} contestServerTime
 */
export const categorizeContestTypes = (contests = [], contestServerTime) => {
  const onGoingContests = contests.filter((contest) => {
    const status = getContestStatus(contest, contestServerTime);
    return status === CONTEST_STATUS.NOT_STARTED || status === CONTEST_STATUS.STARTING;
  });
  const endedContests = contests.filter((contest) => {
    const status = getContestStatus(contest, contestServerTime);
    return status === CONTEST_STATUS.JUST_ENDED || status === CONTEST_STATUS.ENDED;
  });
  const todayContests = contests.filter((contest) => isTodayContest(contest, contestServerTime));

  return {
    onGoingContests,
    endedContests,
    todayContests,
  };
};
