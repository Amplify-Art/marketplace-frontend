import * as types from "../../Constants/actions/Album";

export const fetchSearchResult = (payload) => ({
  type: types.FETCH_SEARCH_REQUEST,
  payload,
});

export const setIsSongSelected = (payload) => ({
  type: types.TOGGLE_IS_SONG_SELECTED,
  payload,
});

export const storeSelectedAlbum = (payload) => ({
  type: types.STORE_SELECTED_ALBUM,
  payload,
});

export const setIsAlbumSelected = (payload) => ({
  type: types.TOGGLE_IS_ALBUM_SELECTED,
  payload,
});

export const showSearchResultAction = () => ({
  type: types.SHOW_SEARCH_RESULT,
});

export const hideSearchResultAction = () => ({
  type: types.HIDE_SEARCH_RESULT,
});
