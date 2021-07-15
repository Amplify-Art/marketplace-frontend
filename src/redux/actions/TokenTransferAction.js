import * as types from '../../Constants/actions/TokenTransfer';

export const fetchTokenTransfersAction = payload => ({
  type: types.FETCH_TOKENTRANSFERS_REQUEST,
  payload,
});

export const fetchTokenTransferAction = payload => ({
  type: types.FETCH_TOKENTRANSFER_REQUEST,
  payload,
});

export const addTokenTransferAction = payload => ({
  type: types.ADD_TOKENTRANSFER_REQUEST,
  payload,
});

export const updateTokenTransferAction = payload => ({
  type: types.UPDATE_TOKENTRANSFER_REQUEST,
  payload,
});


export const deleteTokenTransferAction = payload => ({
  type: types.DELETE_TOKENTRANSFER_REQUEST,
  payload,
});
