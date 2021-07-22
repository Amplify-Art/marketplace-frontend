import { filter } from 'lodash';
import * as types from '../../Constants/actions/TokenTransfer';

/* eslint-disable no-case-declarations */

const initialState = {
  token_transfer: {},
  token_transfers: [],
  total: 0,
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TOKENTRANSFERS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          token_transfers: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        token_transfers: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_TOKENTRANSFERS_REQUEST:
      return {
        ...state,
        token_transfers: [],
        loading: true,
      };
    case types.FETCH_TOKENTRANSFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_TOKENTRANSFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_TOKENTRANSFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_TOKENTRANSFER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_TOKENTRANSFERS_FAILED:
      return {
        ...state,
        token_transfers: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_TOKENTRANSFER_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          token_transfer: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        token_transfer: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_TOKENTRANSFER_FAILED:
      return {
        ...state,
        token_transfer: {},
        error: 'Bad Request',
        loading: false,
      };
    case types.ADD_TOKENTRANSFER_SUCCESS:
      return {
        ...state,
        // token_transfers: [...state.token_transfers, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_TOKENTRANSFER_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.UPDATE_TOKENTRANSFER_SUCCESS:
      let token_transfers = filter(state.token_transfers, item => item.id !== action.res.data.id);
      return {
        ...state,
        token_transfer: action.res.data || {},
        token_transfers: [...token_transfers, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_TOKENTRANSFER_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    case types.DELETE_TOKENTRANSFER_SUCCESS:
      token_transfers = filter(state.token_transfers, item => item.id !== action.payload.id);

      return {
        ...state,
        token_transfers: [...token_transfers],
        status: true,
        loading: false,
      };
    case types.DELETE_TOKENTRANSFER_FAILED:
      return {
        ...state,
        error: 'Bad Request',
        loading: false,
      };
    default:
      return state;
  }
}
