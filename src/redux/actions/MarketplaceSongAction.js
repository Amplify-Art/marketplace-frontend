import * as types from '../../Constants/actions/MarketplaceSong';

export const fetchMarketplaceSongsAction = payload => ({
  type: types.FETCH_MARKETPLACESONGS_REQUEST,
  payload,
});

export const fetchMarketplaceSongAction = payload => ({
  type: types.FETCH_MARKETPLACESONG_REQUEST,
  payload,
});

export const addMarketplaceSongAction = payload => ({
  type: types.ADD_MARKETPLACESONG_REQUEST,
  payload,
});

export const updateMarketplaceSongAction = payload => ({
  type: types.UPDATE_MARKETPLACESONG_REQUEST,
  payload,
});


export const deleteMarketplaceSongAction = payload => ({
  type: types.DELETE_MARKETPLACESONG_REQUEST,
  payload,
});
