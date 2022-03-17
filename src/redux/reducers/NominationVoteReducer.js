import { filter } from 'lodash';
import * as types from '../../Constants/actions/NominationVote';

/* eslint-disable no-case-declarations */

const initialState = {
  nominationvote: {},
  nominationvotes: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_NOMINATIONVOTES_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          nominationvotes: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        nominationvotes: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_NOMINATIONVOTES_REQUEST:
      return {
        ...state,
        nominationvotes: [],
        loading: true,
      };
    case types.FETCH_NOMINATIONVOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_NOMINATIONVOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_NOMINATIONVOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_NOMINATIONVOTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_NOMINATIONVOTES_FAILED:
      return {
        ...state,
        nominationvotes: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_NOMINATIONVOTE_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          nominationvote: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        nominationvote: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_NOMINATIONVOTE_FAILED:
      return {
        ...state,
        nominationvote: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_NOMINATIONVOTE_SUCCESS:
      return {
        ...state,
        nominationvotes: [...state.nominationvotes, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_NOMINATIONVOTE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_NOMINATIONVOTE_SUCCESS:
      let nominationvotes = filter(state.nominationvotes, item => item.id !== action.res.data.id);
      return {
        ...state,
        nominationvote: action.res.data || {},
        nominationvotes: [...nominationvotes, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_NOMINATIONVOTE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_NOMINATIONVOTE_SUCCESS:
      nominationvotes = filter(state.nominationvotes, item => item.id !== action.payload.id);

      return {
        ...state,
        nominationvotes: [...nominationvotes],
        status: true,
        loading: false,
      };
    case types.DELETE_NOMINATIONVOTE_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
