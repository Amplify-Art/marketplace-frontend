import { getAccessToken, makeUrl, axios } from "./index.js";
import { API_ENDPOINT_URL } from "../Constants/default.js";

export const getNFTs = (payload = {}) => {
  const url = makeUrl(`${API_ENDPOINT_URL}/nfts/albums`);
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

export const getNFTById = (payload) => {
  const id = payload.id;
  const url = makeUrl(`${API_ENDPOINT_URL}/nfts/${id}`, {
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

export const addNFT = (payload) => {
  const url = `${API_ENDPOINT_URL}/nfts`;
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

export const mintNFT = (payload) => {
  const url = `${API_ENDPOINT_URL}/nfts/mint`;
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

export const buyAlbumBundleNFT = (payload) => {
  const url = `${API_ENDPOINT_URL}/nfts/buy-album-bundle`;
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

export const sellSongNFT = (payload) => {
  const url = `${API_ENDPOINT_URL}/nfts/sell-song`;
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

export const buySongNFT = (payload) => {
  const url = `${API_ENDPOINT_URL}/nfts/buy-song`;
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

export const updateNFT = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/nfts/${id}`;
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

export const deleteNFT = (payload) => {
  const id = payload.id;
  const url = `${API_ENDPOINT_URL}/nfts/${id}`;
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
