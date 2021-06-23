import { filter } from 'lodash';
import * as types from '../../Constants/actions/Showcase';

/* eslint-disable no-case-declarations */

const initialState = {
  showcase: {},
  showcases: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SHOWCASES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          showcases: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        showcases: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_SHOWCASES_REQUEST:
      return {
        ...state,
        showcases: [],
        loading: true,
      };
    case types.FETCH_SHOWCASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_SHOWCASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_SHOWCASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_SHOWCASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SHOWCASES_FAILED:
      return {
        ...state,
        showcases: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_SHOWCASE_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          showcase: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        showcase: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_SHOWCASE_FAILED:
      return {
        ...state,
        showcase: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_SHOWCASE_SUCCESS:
      return {
        ...state,
        // showcases: [...state.showcases, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_SHOWCASE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_SHOWCASE_SUCCESS:
      let showcases = filter(state.showcases, item => item.id !== action.res.data.id);
      return {
        ...state,
        showcase: action.res.data || {},
        showcases: [...showcases, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_SHOWCASE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_SHOWCASE_SUCCESS:
      showcases = filter(state.showcases, item => item.id !== action.payload.id);

      return {
        ...state,
        showcases: [...showcases],
        status: true,
        loading: false,
      };
    case types.DELETE_SHOWCASE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
