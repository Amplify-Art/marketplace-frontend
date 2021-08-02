
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default.js';

export const getNominationVotes = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/nomination-votes/`, { ...(payload.params || {}) });

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

export const getNominationVoteById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/nomination-votes/${id}`, { ...(payload.params || {}) });
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

export const addNominationVote = (payload) => {
  const url = `${API_ENDPOINT_URL}/nomination-votes`;
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

export const updateNominationVote = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/nomination-votes/${id}`;
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

export const deleteNominationVote = (payload) => {
  const id = payload.id
  const url = `${API_ENDPOINT_URL}/nomination-votes/${id}`;
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
