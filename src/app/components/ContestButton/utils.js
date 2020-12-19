export const getRemainingStartTime = (obj) => {
  if (!obj) return '';

  if (obj.days) {
    return `Còn ${obj.days < 10 ? `0${obj.days}` : obj.days} ngày`;
  } else if (obj.hours) {
    return `Còn ${obj.hours < 10 ? `0${obj.hours}` : obj.hours} giờ`;
  } else if (obj.mins) {
    return `Còn ${obj.mins < 10 ? `0${obj.mins}` : obj.mins} phút`;
  } else if (obj.secs) {
    return `Còn ${obj.secs < 10 ? `0${obj.secs}` : obj.secs} giây`;
  } else {
    return '';
  }
};
