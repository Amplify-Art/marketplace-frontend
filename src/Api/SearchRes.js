import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default.js';


export const searchResult = (payload) => {
    const url = makeUrl(`${API_ENDPOINT_URL}/search?q=${payload}`);
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