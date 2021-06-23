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
