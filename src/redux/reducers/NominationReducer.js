import { filter } from "lodash";
import * as types from "../../Constants/actions/Nomination";

/* eslint-disable no-case-declarations */

const initialState = {
  nomination: {},
  nominations: [],
  total: 0,
  loading: false,
  error: "",
  showCongratsModal: false,
  showNominate: false,
};

export default function (state = initialState, action) {
  let nominations = [];
  switch (action.type) {
    case types.FETCH_NOMINATIONS_SUCCESS:
      if (!action.res.success) {
        return {
          ...state,
          nominations: [],
          error: "",
          loading: false,
        };
      }
      return {
        ...state,
        nominations: (action.res.data && action.res.data.results) || [],
        total: (action.res.data && action.res.data.total) || 0,
        status: action.res.success,
        loading: false,
      };
    case types.FETCH_NOMINATIONS_REQUEST:
      return {
        ...state,
        nominations: [],
        loading: true,
      };
    case types.FETCH_NOMINATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_NOMINATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_NOMINATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_NOMINATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_NOMINATIONS_FAILED:
      return {
        ...state,
        nominations: [],
        error: "Bad Request",
        loading: false,
      };
    case types.FETCH_NOMINATION_SUCCESS:
      if (!action.res.data.success) {
        return {
          ...state,
          nomination: {},
          error: "",
          loading: false,
        };
      }
      return {
        ...state,
        nomination: action.res.data || {},
        status: action.res.data.success,
        loading: false,
      };
    case types.FETCH_NOMINATION_FAILED:
      return {
        ...state,
        nomination: {},
        error: "Bad Request",
        loading: false,
      };
    case types.ADD_NOMINATION_SUCCESS:
      return {
        ...state,
        // nominations: [...state.nominations, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_NOMINATION_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.UPDATE_NOMINATION_SUCCESS:
      nominations = filter(
        state.nominations,
        (item) => item.id !== action.res.data.id
      );
      return {
        ...state,
        nomination: action.res.data || {},
        nominations: [...nominations, action.res.data],
        status: action.res.success,
        loading: false,
      };
    case types.ADD_NOMINATION_VOTE:
      let index = state.nominations.findIndex(
        (f) => f.id === action?.res?.data?.nomination_id
      );
      nominations = state.nominations;
      if (action.res.data)
        nominations.splice(index, 1, {
          ...state.nominations[index],
          votes: [...state.nominations[index]?.votes, action?.res?.data],
        });
      return {
        ...state,
        nominations: [...nominations] || [],
        status: action.res.success,
        loading: false,
      };
    case types.UPDATE_NOMINATION_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.DELETE_NOMINATION_SUCCESS:
      nominations = filter(
        state.nominations,
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        nominations: [...nominations],
        status: true,
        loading: false,
      };
    case types.DELETE_NOMINATION_FAILED:
      return {
        ...state,
        error: "Bad Request",
        loading: false,
      };
    case types.TOGGLE_NOMINATE_CONGRATS_MODAL:
      return {
        ...state,
        showCongratsModal: action.payload,
      };
    case types.TOGGLE_NOMINATE:
      return {
        ...state,
        showNominate: action.payload,
      };
    default:
      return state;
  }
}
