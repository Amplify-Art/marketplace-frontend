import { filter } from 'lodash';
import * as types from '../../Constants/actions/Transaction';
import { SEND_NEAR_SUCCESS, SEND_NEAR_FAILURE, SEND_NEAR_REQUEST } from '../../Constants/actions/Global';
import { UPDATE_SEND_MONEY_SUCCESS } from '../../Constants/actions/NFT';

/* eslint-disable no-case-declarations */

const initialState = {
  transaction: {},
  transactions: [],
  total: 0,
  loading: false,
  error: '',
  sendingNear: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          transactions: [],
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        transactions: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        transactions: [],
        loading: true,
      };
    case types.FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_TRANSACTIONS_FAILED:
      return {
        ...state,
        transactions: [],
        error: 'Bad Request',
        loading: false,
      };
    case types.FETCH_TRANSACTION_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          transaction: {},
          error: '',
          loading: false,
        };
      }
      return {
        ...state,
        transaction: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_TRANSACTION_FAILED:
      return {
        ...state,
        transaction: {},
        error: 'Bad Request',
        loading: false,
      };
    case SEND_NEAR_FAILURE:
      return {
        ...state,
        sendingNear: false
      }
    case SEND_NEAR_SUCCESS:
      return {
        ...state,
        // sendingNear: false,
        transactions: [action.res.data, ...state.transactions]
      }
    case UPDATE_SEND_MONEY_SUCCESS:
      return {
        ...state,
        transactions: [action.res.data, ...state.transactions]
      }
    case SEND_NEAR_REQUEST:
      return {
        ...state,
        sendingNear: true
      }
    default:
      return state;
  }
}
