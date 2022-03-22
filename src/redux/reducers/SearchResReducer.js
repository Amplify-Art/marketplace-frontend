import { filter } from "lodash";
import * as types from "../../Constants/actions/Album";

/* eslint-disable no-case-declarations */

const initialState = {
  searchResult: [],
  loading: false,
  error: "",
  isSongSelected: false,
  isAlbumSelected: false,
  selectedAlbum: {},
  showSearchResult: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        searchResult: action.res.data,
        loading: false,
      };
    case types.FETCH_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.TOGGLE_IS_SONG_SELECTED:
      return {
        ...state,
        isSongSelected: !state.isSongSelected,
      };
    case types.STORE_SELECTED_ALBUM:
      return {
        ...state,
        selectedAlbum: action.payload.albumData,
      };
    case types.TOGGLE_IS_ALBUM_SELECTED:
      return {
        ...state,
        isAlbumSelected: action.payload.isAlbumSelected,
      };
    case types.SHOW_SEARCH_RESULT:
      return {
        ...state,
        showSearchResult: true,
      };
    case types.HIDE_SEARCH_RESULT:
      return {
        ...state,
        showSearchResult: false,
      };
    default:
      return state;
  }
}
