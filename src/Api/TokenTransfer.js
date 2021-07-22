
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default.js';

export const getTokenTransfers = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/transfers/`, { ...(payload.params || {}) });

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

export const getTokenTransferById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/transfers/${id}`, { ...(payload.params || {}) });
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

export const addTokenTransfer = (payload) => {
  const url = `${API_ENDPOINT_URL}/transfers`;
  return axios.post(url, payload, {
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

export const updateTokenTransfer = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/transfers/${id}`;
  return axios.patch(url, payload, {
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

export const deleteTokenTransfer = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/transfers/${id}`;
  return axios.delete(url, {
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
