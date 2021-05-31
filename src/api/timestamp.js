import axios from 'axios';

export async function getTimeStamp() {
  try {
    const response = await axios.get('test.be.freecontest.net/db/v2/timestamp');
    console.log(response.data.data.timestamp);
    return response.data.data.timestamp * 1000;
  } catch (error) {
    return error;
  }
}
