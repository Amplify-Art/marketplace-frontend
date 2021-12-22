import { filter } from 'lodash';
import * as types from '../../Constants/actions/Playlist';

/* eslint-disable no-case-declarations */
const initialState = {
  playlist: {},
  playlists: [],
  total: 0,
  loading: false,
  error: '',
  current_playlists: sessionStorage.getItem('activePlaylist') ? JSON.parse(sessionStorage.getItem('activePlaylist')) : [],
  show_delete_modal: false,
  show_modal: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYLISTS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          playlists: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        playlists: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_PLAYLISTS_REQUEST:
      return {
        ...state,
        playlists: [],
        loading: true,
      };
    case types.FETCH_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_CURRENT_PLAYLIST_REQUEST:
      return {
        ...state,
        current_playlists: action.payload,
      };
    case types.DELETE_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PLAYLISTS_FAILED:
      return {
        ...state,
        playlists: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_PLAYLIST_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          playlist: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        playlist: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_PLAYLIST_FAILED:
      return {
        ...state,
        playlist: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: [action.res.data, ...state.playlists],
        status: action.res.success,
        loading: false,
        total: state.total + 1
      };
    case types.ADD_PLAYLIST_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_PLAYLIST_SUCCESS:
      let playlists = filter(state.playlists, item => item.id !== action.res.data.id);
      return {
        ...state,
        playlist: action.res.data || {},
        playlists: [...playlists, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_PLAYLIST_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_PLAYLIST_SUCCESS:
      let newPlaylists = filter(state.playlists, item => item.id !== action.payload.id);

      return {
        ...state,
        playlists: [...newPlaylists],
        status: true,
        loading: false,
      };
    case types.DELETE_PLAYLIST_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.CLEAR_CURRENTPLAYLIST_REQUEST:
      return {
        ...state,
        current_playlists: []
      }
    case types.SHOW_PLAYLIST_DELETE_MODAL:
      return {
        ...state,
        show_delete_modal: true
      }
    case types.HIDE_PLAYLIST_DELETE_MODAL:
      return {
        ...state,
        show_delete_modal: false
      }
    case types.SHOW_PLAYLIST_MODAL:
      return {
        ...state,
        show_modal: true
      }
    case types.HIDE_PLAYLIST_MODAL:
      return {
        ...state,
        show_modal: false
      }
    default:
      return state;
  }
}
