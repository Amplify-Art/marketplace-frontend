
import { getAccessToken, makeUrl, axios } from './index.js';
import { API_ENDPOINT_URL } from '../Constants/default.js';

export const createWallet = (payload) => {
    const url = `${API_ENDPOINT_URL}/near/signup`;
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

export const LinkWallet = (payload) => {
    const url = `${API_ENDPOINT_URL}/near/link`;
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