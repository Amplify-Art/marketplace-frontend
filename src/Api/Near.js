
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

export const SignWallet = (payload) => {
    const url = `${API_ENDPOINT_URL}/near/sign`;
    return axios.post(url, payload, {
        headers: {
            // Authorization: `Bearer ${getAccessToken()}`,
        },
    }).then(res => ({
        success: true,
        data: res.data,
    })).catch(err => ({
        success: false,
        message: err.response.data.message,
    }));
};

export const sendNear = (payload) => {
    const url = `${API_ENDPOINT_URL}/near/send`;
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

export const getNearPrice = () => {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD`;
    return axios.get(url).then(res => ({
        success: true,
        data: res.data,
    })).catch(err => ({
        success: false,
        message: err.response.data.message,
    }));
};