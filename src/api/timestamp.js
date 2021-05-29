import axios from 'axios';

export const GetDateFromTimestamp = async () => {
  try {
    const res = await axios.get('https://test.be.freecontest.net/db/v2/timestamp');
    const result = res.data.data.timestamp;
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
