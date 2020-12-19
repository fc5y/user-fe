/* eslint-disable camelcase */
import { CONTEST_STATUS } from 'src/shared/constants';

/**
 * Util to calculate the contest status based on contest info
 * This util supposed contestInfo is ready
 * @param {object} contestInfo
 */
export function getContestStatus(contestInfo, contestServerTime) {
  if (!contestInfo || !contestInfo.start_time) return 0;

  const now = contestServerTime || Date.now() / 1000;
  const { start_time, duration, can_enter, materials = {} } = contestInfo;
  const formattedStartTime = start_time;
  const formattedDuration = duration;
  const endTime = formattedStartTime + formattedDuration;

  if (now < formattedStartTime) {
    return CONTEST_STATUS.NOT_STARTED;
  } else if ((now >= formattedStartTime && now < endTime) || can_enter) {
    return CONTEST_STATUS.STARTING;
  } else if (now >= endTime && !can_enter && !materials.all_materials_url) {
    return CONTEST_STATUS.JUST_ENDED;
  } else if (now >= endTime && !can_enter && materials.all_materials_url) {
    return CONTEST_STATUS.ENDED;
  } else {
    return CONTEST_STATUS.UNSET;
  }
}

/**
 * Util to convert time to a specific timezone
 * https://www.iana.org/time-zones
 * @param {string} date
 * @param {string} tzString
 */
export function convertTZ(date, tzString = 'Asia/Bangkok') {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: tzString,
    }),
  );
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
  const endTime = new Date(formattedStartTime + formattedDuration);

  const startTimeObj = convertTZ(new Date(formattedStartTime));
  const contestStartDate = `${startTimeObj.getDate()}/${
    startTimeObj.getMonth() + 1
  }/${startTimeObj.getFullYear()}`;
  const contestStartTime = `${startTimeObj.toTimeString().slice(0, 5)}`;
  const contestEndTime = `${endTime.toTimeString().slice(0, 5)}`;

  return {
    startDate: contestStartDate,
    startTime: contestStartTime,
    endTime: contestEndTime,
    startDateAndTime: `${contestStartDate} ${contestStartTime}`,
    startAndEndTime: `${contestStartTime} - ${contestEndTime}`,
    fullTime: `${contestStartDate} ${contestStartTime} - ${contestEndTime}`,
  };
}

/**
 * Utils to get an object of remaining time based on the remaining time
 * @param {number} remainingTime (in seconds)
 */
export function getRemainingTimeObj(remainingTime) {
  if (Number.isNaN(remainingTime)) return {};

  const days = Math.floor(remainingTime / (60 * 60 * 24));
  const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
  const mins = Math.floor((remainingTime % (60 * 60)) / 60);
  const secs = Math.floor(remainingTime % 60);

  let timeString = '';
  if (days) {
    timeString = `Còn ${days < 10 ? `0${days}` : days} ngày`;
  } else {
    timeString = `${hours < 10 ? `0${hours}` : hours}:${mins < 10 ? `0${mins}` : mins}:${
      secs < 10 ? `0${secs}` : secs
    }`;
  }

  return {
    days,
    hours,
    mins,
    secs,
    timeString,
  };
}
