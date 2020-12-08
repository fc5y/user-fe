import axios from 'axios';
import { getFullURL } from './getUrl';

const reg = /^https?:\/\//i;

export const get = async (url, headers = {}) => {
  try {
    const finalUrl = reg.test(url) ? url : getFullURL(url);
    const { data } = await axios.get(finalUrl, {
      headers: {
        ...headers,
      },
    });

    return { ...data };
  } catch (err) {
    return { code: -1, ...err.response.data };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const finalUrl = reg.test(url) ? url : getFullURL(url);
    const { data } = await axios.post(finalUrl, body, {
      headers: {
        ...headers,
      },
    });
    return { ...data };
  } catch (err) {
    return { code: -1, ...err.response.data };
  }
};
