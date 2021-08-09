import axios from 'axios';
import { getFullApiUrl, isAbsoluteURL } from './url';

const HTTP = axios.create({
  withCredentials: true,
});

export const get = async (url, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await HTTP.get(finalUrl, {
      headers: {
        ...headers,
      },
      // withCredentials: true,
    });

    return { ...data };
  } catch (err) {
    return { code: -1, ...err.response.data };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await HTTP.post(finalUrl, body, {
      headers: {
        ...headers,
      },
      // withCredentials: true,
    });
    return { ...data };
  } catch (err) {
    return { code: -1, ...err.response.data };
  }
};
