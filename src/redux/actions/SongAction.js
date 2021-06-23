import * as types from '../../Constants/actions/Song';

export const fetchSongsAction = payload => ({
  type: types.FETCH_SONGS_REQUEST,
  payload,
});

export const fetchSongAction = payload => ({
  type: types.FETCH_SONG_REQUEST,
  payload,
});

export const addSongAction = payload => ({
  type: types.ADD_SONG_REQUEST,
  payload,
});

export const updateSongAction = payload => ({
  type: types.UPDATE_SONG_REQUEST,
  payload,
});


export const deleteSongAction = payload => ({
  type: types.DELETE_SONG_REQUEST,
  payload,
});
