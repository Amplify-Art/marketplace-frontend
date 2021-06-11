
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../constants/default.js';

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