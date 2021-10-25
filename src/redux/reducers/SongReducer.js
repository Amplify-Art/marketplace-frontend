import { filter } from 'lodash';
import * as types from '../../Constants/actions/Song';

/* eslint-disable no-case-declarations */

const initialState = {
  song: {},
  songs: [],
  total: 0,
  loading: false,
  error: '',
  showBuyModal: false,
  showSellModal: false,
  showSellConfirmation: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SONGS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          songs: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        songs: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_SONGS_REQUEST:
      return {
        ...state,
        songs: [],
        loading: true,
      };
    case types.FETCH_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_SONG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SONGS_FAILED:
      return {
        ...state,
        songs: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_SONG_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          song: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        song: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_SONG_FAILED:
      return {
        ...state,
        song: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_SONG_SUCCESS:
      return {
        ...state,
        // songs: [...state.songs, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_SONG_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_SONG_SUCCESS:
      let songs = filter(state.songs, item => item.id !== action.res.data.id);
      return {
        ...state,
        song: action.res.data || {},
        songs: [...songs, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_SONG_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.BUY_SONG_FAILED:
      return {
        ...state,
        showBuyModal: false,
      };
    case types.BUY_SONG_SUCCESS:
      return {
        ...state,
        showBuyModal: false,
      };
    case types.SHOW_BUY_MODAL:
      return {
        ...state,
        showBuyModal: true,
      };
    case types.HIDE_BUY_MODAL:
      return {
        ...state,
        showBuyModal: false,
      };
    case types.SHOW_SELL_MODAL:
      return {
        ...state,
        showSellModal: true,
      };
    case types.HIDE_SELL_MODAL:
      return {
        ...state,
        showSellModal: false,
      };
    case types.DELETE_SONG_SUCCESS:
      songs = filter(state.songs, item => item.id !== action.payload.id);

      return {
        ...state,
        songs: [...songs],
        status: true,
        loading: false,
      };
    case types.DELETE_SONG_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.SELL_SONG_CONFIRMATION:
      return {
        ...state,
        showSellConfirmation: !state.showSellConfirmation,
      }
    default:
      return state;
  }
}
