import { filter } from "lodash";
import * as types from "../../Constants/actions/SupporterPayoutLog";

/* eslint-disable no-case-declarations */

const initialState = {
  supporter_payout_log: {},
  supporter_payout_logs: [],
  total: 0,
  loading: false,
  error: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SUPPORTER_PAYOUT_LOGS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          supporter_payout_logs: [],
          error: "",
          loading: false,
        };
      }
      return {
        ...state,
        supporter_payout_logs:
          (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_SUPPORTER_PAYOUT_LOGS_REQUEST:
      return {
        ...state,
        supporter_payout_logs: [],
        loading: true,
      };
    case types.FETCH_SUPPORTER_PAYOUT_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_SUPPORTER_PAYOUT_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_SUPPORTER_PAYOUT_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_SUPPORTER_PAYOUT_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SUPPORTER_PAYOUT_LOGS_FAILED:
      return {
        ...state,
        supporter_payout_logs: [],
        error: "Bad Request",
        loading: false,
      };
    case types.FETCH_SUPPORTER_PAYOUT_LOG_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          supporter_payout_log: {},
          error: "",
          loading: false,
        };
      }
      return {
        ...state,
        supporter_payout_log: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_SUPPORTER_PAYOUT_LOG_FAILED:
      return {
        ...state,
        supporter_payout_log: {},
        error: "Bad Request",
        loading: false,
      };
    case types.ADD_SUPPORTER_PAYOUT_LOG_SUCCESS:
      return {
        ...state,
        // supporter_payout_logs: [...state.supporter_payout_logs, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_SUPPORTER_PAYOUT_LOG_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.UPDATE_SUPPORTER_PAYOUT_LOG_SUCCESS:
      let supporter_payout_logs = filter(
        state.supporter_payout_logs,
        (item) => item.id !== action.res.data.id
      );
      return {
        ...state,
        supporter_payout_log: action.res.data || {},
        supporter_payout_logs: [...supporter_payout_logs, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_SUPPORTER_PAYOUT_LOG_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.DELETE_SUPPORTER_PAYOUT_LOG_SUCCESS:
      supporter_payout_logs = filter(
        state.supporter_payout_logs,
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        supporter_payout_logs: [...supporter_payout_logs],
        status: true,
        loading: false,
      };
    default:
      return state;
  }
}
