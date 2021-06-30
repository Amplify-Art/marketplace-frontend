
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default';

// export const LinkWallet = (payload) => {
//     const url = `${API_ENDPOINT_URL}/users`;
//     return axios.patch(url, payload, {
//         headers: {
//               Authorization: `Bearer ${getAccessToken()}`,
//         },
//     }).then(res => ({
//         success: true,
//         data: res.data,
//     })).catch(err => ({
//         success: false,
//         message: err.response.data.message,
//     }));
// };

export const getArtistById = (payload) => {
  const id = payload.id
  const url = makeUrl(`${API_ENDPOINT_URL}/users/${id}`, { ...(payload.params || {}) });
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