import { getAccessToken, makeUrl, axios } from "./index.js";
import { API_ENDPOINT_URL } from "../Constants/default.js";

export const getSupporterPayoutLogs = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/supporter-payout-logs/`, {
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

export const getSupporterPayoutLogById = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/supporter-payout-logs/${id}`, {
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

export const addSupporterPayoutLog = (payload) => {
  const url = `${API_ENDPOINT_URL}/supporter-payout-logs`;
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

export const updateSupporterPayoutLog = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/supporter-payout-logs/${id}`;
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

export const deleteSupporterPayoutLog = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/supporter-payout-logs/${id}`;
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
