import { filter } from 'lodash';
import * as types from '../../Constants/actions/MarketplaceSong';

/* eslint-disable no-case-declarations */

const initialState = {
  marketplacesong: {},
  marketplacesongs: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MARKETPLACESONGS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          marketplacesongs: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        marketplacesongs: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_MARKETPLACESONGS_REQUEST:
      return {
        ...state,
        marketplacesongs: [],
        loading: true,
      };
    case types.FETCH_MARKETPLACESONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_MARKETPLACESONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_MARKETPLACESONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_MARKETPLACESONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_MARKETPLACESONGS_FAILED:
      return {
        ...state,
        marketplacesongs: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_MARKETPLACESONG_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          marketplacesong: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        marketplacesong: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_MARKETPLACESONG_FAILED:
      return {
        ...state,
        marketplacesong: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_MARKETPLACESONG_SUCCESS:
      return {
        ...state,
        // marketplacesongs: [...state.marketplacesongs, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_MARKETPLACESONG_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_MARKETPLACESONG_SUCCESS:
      let marketplacesongs = filter(state.marketplacesongs, item => item.id !== action.res.data.id);
      return {
        ...state,
        marketplacesong: action.res.data || {},
        marketplacesongs: [...marketplacesongs, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_MARKETPLACESONG_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_MARKETPLACESONG_SUCCESS:
      marketplacesongs = filter(state.marketplacesongs, item => item.id !== action.payload.id);

      return {
        ...state,
        marketplacesongs: [...marketplacesongs],
        status: true,
        loading: false,
      };
    case types.DELETE_MARKETPLACESONG_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
