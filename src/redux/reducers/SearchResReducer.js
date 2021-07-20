import { filter } from 'lodash';
import * as types from '../../Constants/actions/Album';

/* eslint-disable no-case-declarations */

const initialState = {
  searchResult: [],
  loading: false,
  error: '',
};

export default function (state = initialState, action) {
  console.log("call res------------->",action.res)
  switch (action.type) {
    case types.FETCH_SEARCH_SUCCESS:
      return {
        searchResult:action.res.data,
        loading: false,
      };
    case types.FETCH_SEARCH_REQUEST:
        return {
          ...state,
          loading: true,
        };
      default:
      return state;
  }
}
