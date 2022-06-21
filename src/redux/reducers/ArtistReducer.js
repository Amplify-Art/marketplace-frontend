import { filter } from 'lodash';
import { artist } from '.';
import * as types from '../../Constants/actions/Artist';

/* eslint-disable no-case-declarations */

const initialState = {
  artist: {},
  loading: true,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ARTIST_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ARTIST_BY_ID_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          artist: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        artist: action.res?.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_ARTIST_BY_ID_FAILED:
      return {
        ...state,
        artist: {},
        error: 'Bad Request',
        loading: false,
      };
    // All Artists
    case types.FETCH_ARTISTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ARTISTS_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          artists: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        artists: action.res?.data.results || [],
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_ARTISTS_FAILED:
      return {
        ...state,
        artists: [],
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
