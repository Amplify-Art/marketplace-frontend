
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default.js';

export const getTransactions = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/transactions/`, { ...(payload.params || {}) });

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};

export const getTransactionById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/transactions/${id}`, { ...(payload.params || {}) });
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    },
  }).then(res => ({
    success: true,
    data: res.data,
  })).catch(err => ({
    success: false,
    message: err.response.data.message,
  }));
};
