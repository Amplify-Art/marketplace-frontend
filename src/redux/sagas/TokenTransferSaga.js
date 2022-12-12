import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  addTokenTransfer,
  deleteTokenTransfer,
  getTokenTransferById,
  getTokenTransfers,
  updateTokenTransfer,
} from "../../Api/TokenTransfer";
import * as types from "../../Constants/actions/TokenTransfer";
import {
  SET_NOTIFICATION,
  SET_OVERLAY_LOADER,
  UNSET_OVERLAY_LOADER,
  SHOW_PURCHASE_MODAL,
} from "../../Constants/actions/Global";
import { TOGGLE_IS_ALBUM_SELECTED } from "../../Constants/actions/Album";

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_TOKENTRANSFERS_REQUEST, fetchTokenTransfersSaga);
  yield takeLatest(types.FETCH_TOKENTRANSFER_REQUEST, fetchTokenTransferSaga);
  yield takeLatest(
    types.ADD_TOKENTRANSFER_REQUEST,
    addTokenTransferSaga,
    context
  );
  yield takeLatest(
    types.UPDATE_TOKENTRANSFER_REQUEST,
    updateTokenTransferSaga,
    context
  );
  yield takeLatest(types.DELETE_TOKENTRANSFER_REQUEST, deleteTokenTransferSaga);
}

export function* fetchTokenTransfersSaga({ payload }) {
  try {
    const res = yield call(getTokenTransfers, payload);
    yield all([put({ type: types.FETCH_TOKENTRANSFERS_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_TOKENTRANSFERS_FAILED, error });
  }
}

export function* fetchTokenTransferSaga({ payload }) {
  try {
    const res = yield call(getTokenTransferById, payload);
    yield all([put({ type: types.FETCH_TOKENTRANSFER_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_TOKENTRANSFER_FAILED, error });
  }
}

export function* addTokenTransferSaga({ history }, { payload }) {
  try {
    yield all([put({ type: SET_OVERLAY_LOADER })]);
    const res = yield call(addTokenTransfer, payload);
    if (!res.success) {
      throw {
        message: res.message,
      };
    }
    yield all([
      put({ type: types.ADD_TOKENTRANSFER_SUCCESS, res }),
      put({ type: UNSET_OVERLAY_LOADER }),
      put({ type: SHOW_PURCHASE_MODAL }),
      put({
        type: TOGGLE_IS_ALBUM_SELECTED,
        payload: { isAlbumSelected: false },
      }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/token_transfers');
    // }
  } catch (error) {
    console.log(error);
    yield all([
      put({ type: UNSET_OVERLAY_LOADER }),
      put({ type: types.ADD_TOKENTRANSFER_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : "Server error",
        },
      }),
    ]);
  }
}

export function* updateTokenTransferSaga({ history }, { payload }) {
  try {
    const res = yield call(updateTokenTransfer, payload);
    yield all([
      put({ type: types.UPDATE_TOKENTRANSFER_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "Song has been delisted"
            : res.message || "Song has been delisted",
        },
      }),
    ]);
    if (res && res.success && res.data) {
      window.location.reload();
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_TOKENTRANSFER_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : "Server error",
        },
      }),
    ]);
  }
}

export function* deleteTokenTransferSaga({ payload }) {
  try {
    const res = yield call(deleteTokenTransfer, payload);
    yield all([
      put({ type: types.DELETE_TOKENTRANSFER_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "TokenTransfer deleted"
            : res.message || "TokenTransfer not deleted",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_TOKENTRANSFER_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : "Server error",
        },
      }),
    ]);
  }
}
