import { filter } from "lodash";
import * as types from "../../Constants/actions/User";

/* eslint-disable no-case-declarations */

const initialState = {
  user: {},
  users: [],
  total: 0,
  loading: false,
  error: "",
  near_user: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          users: [],
          error: "",
          loading: false,
        };
      }
      return {
        ...state,
        users: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_USERS_REQUEST:
      return {
        ...state,
        users: [],
        loading: true,
      };
    case types.FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_USERS_FAILED:
      return {
        ...state,
        users: [],
        error: "Bad Request",
        loading: false,
      };
    case types.FETCH_USER_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          user: {},
          error: "",
          loading: false,
        };
      }
      return {
        ...state,
        user: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_USER_FAILED:
      return {
        ...state,
        user: {},
        error: "Bad Request",
        loading: false,
      };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        // users: [...state.users, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_USER_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.UPDATE_USER_SUCCESS:
      let users = filter(state.users, (item) => item.id !== action.res.data.id);
      if (action.res.data.token) {
        localStorage.setItem("amplify_app_token", action.res.data.token);
      }
      return {
        ...state,
        user: action.res.data || {},
        users: [...users, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_USER_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.DELETE_USER_SUCCESS:
      users = filter(state.users, (item) => item.id !== action.payload.id);

      return {
        ...state,
        users: [...users],
        status: true,
        loading: false,
      };
    case types.DELETE_USER_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.FETCH_USER_BY_NEAR_ID_SUCCESS:
      return {
        ...state,
        near_user: action.res.data,
        loading: false,
      };
    case types.FETCH_USER_BY_NEAR_ID_FAILED:
      return {
        ...state,
        near_user: {},
        loading: false,
      };
    case types.FETCH_USER_BY_NEAR_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SET_NEAR_BALANCE:
      return {
        ...state,
        user: { ...state.user, near_balance: action.payload },
      };
    default:
      return state;
  }
}
