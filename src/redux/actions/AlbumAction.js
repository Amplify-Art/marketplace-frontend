import * as types from "../../Constants/actions/Album";

export const fetchAlbumsAction = (payload) => ({
  type: types.FETCH_ALBUMS_REQUEST,
  payload,
});

export const fetchAlbumAction = (payload) => ({
  type: types.FETCH_ALBUM_REQUEST,
  payload,
});

export const addAlbumAction = (payload) => ({
  type: types.ADD_ALBUM_REQUEST,
  payload,
});

export const updateAlbumAction = (payload) => ({
  type: types.UPDATE_ALBUM_REQUEST,
  payload,
});

export const deleteAlbumAction = (payload) => ({
  type: types.DELETE_ALBUM_REQUEST,
  payload,
});
