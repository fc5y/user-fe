import axios from 'axios';
import { getFullURL } from './getUrl';

const { ENV } = process.env;

export const get = async (url, options = {}, fullURL = false) => {
  console.log(!fullURL ? getFullURL(url, ENV) : url);
  const { data, status } = await axios.get(!fullURL ? getFullURL(url, ENV) : url, {
    ...options,
  });

  return { data, status };
};

export const post = async (url, body, options = {}, fullURL = false) => {
  const { data, status } = await axios.post(!fullURL ? getFullURL(url, ENV) : url, body, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { data, status };
};
