import axios from 'axios';
const Url = 'https://test.be.freecontest.net/db/v2/timestamp';
export const getTime = async () => {
  try {
    const response = await axios.get(Url);
    const todoItems = response.data;
    return todoItems.data.timestamp;
  } catch (errors) {
    console.error(errors);
  }
};
