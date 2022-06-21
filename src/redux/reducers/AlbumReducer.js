import { filter } from 'lodash';
import * as types from '../../Constants/actions/Album';

/* eslint-disable no-case-declarations */

const initialState = {
  album: {},
  albums: [],
  total: 0,
  loading: true,
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ALBUMS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          albums: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        albums: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_ALBUMS_REQUEST:
      return {
        ...state,
        albums: [],
        loading: true,
      };
    case types.FETCH_ALBUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_ALBUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_ALBUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_ALBUM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_ALBUMS_FAILED:
      return {
        ...state,
        albums: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_ALBUM_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          album: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        album: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_ALBUM_FAILED:
      return {
        ...state,
        album: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_ALBUM_SUCCESS:
      return {
        ...state,
        // albums: [...state.albums, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_ALBUM_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_ALBUM_SUCCESS:
      let index = state.albums.filter(item => item.id === action.res.data.id);
      let albums = state.albums;
      albums.splice(index, 1, action.res.data);
      return {
        ...state,
        album: action.res.data || {},
        albums: [...albums],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_ALBUM_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_ALBUM_SUCCESS:
      albums = filter(state.albums, item => item.id !== action.payload.id);

      return {
        ...state,
        albums: [...albums],
        status: true,
        loading: false,
      };
    case types.DELETE_ALBUM_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
