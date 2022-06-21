import { filter } from 'lodash';
import * as types from '../../Constants/actions/NFT';

/* eslint-disable no-case-declarations */

const initialState = {
  nft: {},
  nfts: [],
  total: 0,
  loading: false,
  error: '',
  transaction: {},
  wallet: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_NFTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          nfts: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        nfts: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_NFTS_REQUEST:
      return {
        ...state,
        nfts: [],
        loading: true,
      };
    case types.FETCH_NFT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_NFT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_NFT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_NFT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_NFTS_FAILED:
      return {
        ...state,
        nfts: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_NFT_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          nft: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        nft: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_NFT_FAILED:
      return {
        ...state,
        nft: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_NFT_SUCCESS:
      return {
        ...state,
        // nfts: [...state.nfts, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_NFT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_NFT_SUCCESS:
      let nfts = filter(state.nfts, item => item.id !== action.res.data.id);
      return {
        ...state,
        nft: action.res.data || {},
        nfts: [...nfts, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_NFT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_NFT_SUCCESS:
      nfts = filter(state.nfts, item => item.id !== action.payload.id);

      return {
        ...state,
        nfts: [...nfts],
        status: true,
        loading: false,
      };
    case types.DELETE_NFT_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
