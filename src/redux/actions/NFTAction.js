import * as types from '../../Constants/actions/NFT';

export const fetchNFTsAction = payload => ({
  type: types.FETCH_NFTS_REQUEST,
  payload,
});

export const fetchNFTAction = payload => ({
  type: types.FETCH_NFT_REQUEST,
  payload,
});

export const addNFTAction = payload => ({
  type: types.ADD_NFT_REQUEST,
  payload,
});

export const updateNFTAction = payload => ({
  type: types.UPDATE_NFT_REQUEST,
  payload,
});

export const deleteNFTAction = payload => ({
  type: types.DELETE_NFT_REQUEST,
  payload,
});

export const mintNFTAction = payload => ({
  type: types.MINT_NFT_REQUEST,
  payload,
});

export const buyAlbumBundleNFTAction = payload => ({
  type: types.BUY_ALBUM_BUNDLE_NFT_REQUEST,
  payload,
});

export const buySongNFTAction = payload => ({
  type: types.BUY_SONG_NFT_REQUEST,
  payload,
});

export const sellSongNFTAction = payload => ({
  type: types.SELL_SONG_NFT_REQUEST,
  payload,
});

export const sendMoneyAction = payload => ({
  type: types.UPDATE_SEND_MONEY_REQUEST,
  payload,
});