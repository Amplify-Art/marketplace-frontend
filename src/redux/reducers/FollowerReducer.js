import { filter } from 'lodash';
import * as types from '../../Constants/actions/Follower';

/* eslint-disable no-case-declarations */

const initialState = {
  follower: {},
  followers: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FOLLOWERS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          followers: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        followers: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_FOLLOWERS_REQUEST:
      return {
        ...state,
        followers: [],
        loading: true,
      };
    case types.FETCH_FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_FOLLOWERS_FAILED:
      return {
        ...state,
        followers: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_FOLLOWER_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          follower: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        follower: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_FOLLOWER_FAILED:
      return {
        ...state,
        follower: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_FOLLOWER_SUCCESS:
      return {
        ...state,
        followers: [...state.followers, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_FOLLOWER_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_FOLLOWER_SUCCESS:
      let followers = filter(state.followers, item => item.id !== action.res.data.id);
      return {
        ...state,
        follower: action.res.data || {},
        followers: [...followers, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_FOLLOWER_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_FOLLOWER_SUCCESS:
      followers = filter(state.followers, item => item.id !== action.payload.id);

      return {
        ...state,
        followers: [...followers],
        status: true,
        loading: false,
      };
    case types.DELETE_FOLLOWER_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
