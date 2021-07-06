
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default.js';

export const getNominations = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/nominations/`, { ...(payload.params || {}) });

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

export const getNominationById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/nominations/${id}`, { ...(payload.params || {}) });
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

export const addNomination = (payload) => {
  const url = `${API_ENDPOINT_URL}/nominations`;
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

export const updateNomination = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/nominations/${id}`;
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

export const deleteNomination = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/nominations/${id}`;
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
