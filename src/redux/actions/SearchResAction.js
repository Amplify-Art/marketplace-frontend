import * as types from '../../Constants/actions/Album';

export const fetchSearchResult = payload => ({
  type: types.FETCH_SEARCH_REQUEST,
  payload,
});

