import axios from 'axios';
import { getFullURL } from './getUrl';

const { ENV } = process.env;

export const get = async (url, options = {}, fullURL = false) => {
  try {
    const { data } = await axios.get(!fullURL ? getFullURL(url, ENV) : url, {
      ...options,
    });

    return { data };
  } catch (err) {
    return { error: (err.response && err.response.data && err.response.data.error) || true };
  }
};

export const post = async (url, body, options = {}, fullURL = false) => {
  try {
    const { data } = await axios.post(!fullURL ? getFullURL(url, ENV) : url, body, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return { data };
  } catch (err) {
    return { error: (err.response && err.response.data && err.response.data.error) || true };
  }
};
