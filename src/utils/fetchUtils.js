import axios from 'axios';
import { getFullURL } from './getUrl';

const { ENV } = process.env;

export const get = async (url, options = {}) => {
  const { data, status } = await axios.get(getFullURL(url, ENV), options);

  return { data, status };
};

export const post = async (url, body, options = {}) => {
  const { data, status } = await axios.post(getFullURL(url, ENV), body, options);

  return { data, status };
};
