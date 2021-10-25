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

export const buySongAction = payload => ({
  type: types.BUY_SONG_REQUEST,
  payload,
});

export const sellSongAction = payload => ({
  type: types.SELL_SONG_REQUEST,
  payload,
});

export const hideSellSongConfirmation = payload => ({
  type: types.SELL_SONG_CONFIRMATION,
  payload,
});

export const deleteSongAction = payload => ({
  type: types.DELETE_SONG_REQUEST,
  payload,
});

export const showBuyModalAction = payload => ({
  type: types.SHOW_BUY_MODAL,
  payload,
});

export const hideBuyModalAction = payload => ({
  type: types.HIDE_BUY_MODAL,
  payload,
});

export const showSellModalAction = payload => ({
  type: types.SHOW_SELL_MODAL,
  payload,
});

export const hideSellModalAction = payload => ({
  type: types.HIDE_SELL_MODAL,
  payload,
});
