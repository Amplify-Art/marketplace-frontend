import { getAccessToken, makeUrl, axios } from "./index.js";
import { API_ENDPOINT_URL } from "../Constants/default.js";

export const getUsers = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/users/`, {
    ...(payload.params || {}),
  });

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getUserById = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/users/${id}`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getUserByNearId = (payload) => {
  const near_id = payload.near_id;
  const url = makeUrl(`${API_ENDPOINT_URL}/users/${near_id}`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const addUser = (payload) => {
  const url = `${API_ENDPOINT_URL}/users`;
  return axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const sendMoney = (payload) => {
  const url = `${API_ENDPOINT_URL}/users/send-money`;
  return axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const updateUser = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/users/${id}`;
  return axios
    .patch(url, payload, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const deleteUser = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/users/${id}`;
  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getArtistById = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/users/${id}`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};

export const getArtists = (payload) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/users/`, {
    ...(payload.params || {}),
  });
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((err) => ({
      success: false,
      message: err.response.data.message,
    }));
};
