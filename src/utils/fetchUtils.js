import axios from 'axios';
import { getFullApiUrl, isAbsoluteURL } from './url';

export const get = async (url, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await axios.get(finalUrl, {
      headers: {
        ...headers,
      },
      withCredentials: true,
    });

    return { ...data };
  } catch (err) {
    return { ...err.response.data, error: -1 };
  }
};

export const post = async (url, body, headers = {}) => {
  try {
    const finalUrl = isAbsoluteURL(url) ? url : getFullApiUrl(url);
    const { data } = await axios.post(finalUrl, body, {
      headers: {
        ...headers,
      },
      withCredentials: true,
    });
    return { ...data };
  } catch (err) {
    return { ...err.response.data, error: -1 };
  }
};
