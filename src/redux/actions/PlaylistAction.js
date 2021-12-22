import * as types from '../../Constants/actions/Playlist';

export const fetchPlaylistsAction = payload => ({
  type: types.FETCH_PLAYLISTS_REQUEST,
  payload,
});

export const fetchPlaylistAction = payload => ({
  type: types.FETCH_PLAYLIST_REQUEST,
  payload,
});

export const updateCurrentPlaylistAction = payload => ({
  type: types.UPDATE_CURRENT_PLAYLIST_REQUEST,
  payload,
});

export const addPlaylistAction = payload => ({
  type: types.ADD_PLAYLIST_REQUEST,
  payload,
});

export const updatePlaylistAction = payload => ({
  type: types.UPDATE_PLAYLIST_REQUEST,
  payload,
});


export const deletePlaylistAction = payload => ({
  type: types.DELETE_PLAYLIST_REQUEST,
  payload,
});


export const clearCurrentPlayList = payload => ({
  type: types.CLEAR_CURRENTPLAYLIST_REQUEST,
  payload
})

export const showDeletePlaylistAction = () => ({
  type: types.SHOW_PLAYLIST_DELETE_MODAL,
});

export const hideDeletePlaylistAction = () => ({
  type: types.HIDE_PLAYLIST_DELETE_MODAL,
});

export const showPlaylistModalAction = () => ({
  type: types.SHOW_PLAYLIST_MODAL,
});

export const hidePlaylistModalAction = () => ({
  type: types.HIDE_PLAYLIST_MODAL,
});
