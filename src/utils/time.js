// Temporarily
const UTC_MAP = {
  'Asia/Bangkok': '+7',
};

/**
 * Util to convert time to a specific timezone
 * https://www.iana.org/time-zones
 * @param {string} date
 * @param {string} tzString
 */
export function convertTZ(date, tzString = 'Asia/Bangkok') {
  return {
    time: new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
        timeZone: tzString,
      }),
    ),
    utc: UTC_MAP[tzString],
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
