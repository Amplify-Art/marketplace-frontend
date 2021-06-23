import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addNFT, deleteNFT, getNFTById, getNFTs, updateNFT} from '../../Api/NFT';
import * as types from '../../Constants/actions/NFT';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_NFTS_REQUEST, fetchNFTsSaga);
  yield takeLatest(types.FETCH_NFT_REQUEST, fetchNFTSaga);
  yield takeLatest(types.ADD_NFT_REQUEST, addNFTSaga, context);
  yield takeLatest(types.UPDATE_NFT_REQUEST, updateNFTSaga, context);
  yield takeLatest(types.DELETE_NFT_REQUEST, deleteNFTSaga);
}

export function* fetchNFTsSaga({ payload }) {
  try {
    const res = yield call(getNFTs, payload);
    yield all([
      put({ type: types.FETCH_NFTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_NFTS_FAILED, error });
  }
}

export function* fetchNFTSaga({ payload }) {
  try {
    const res = yield call(getNFTById, payload);
    yield all([
      put({ type: types.FETCH_NFT_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_NFT_FAILED, error });
  }
}

export function* addNFTSaga({ history }, { payload }) {
  try {
    const res = yield call(addNFT, payload);
    yield all([
      put({ type: types.ADD_NFT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'NFT added' : res.message || 'NFT not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/nfts');
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_NFT_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
}

export function* updateNFTSaga({ history }, { payload }) {
  try {
    const res = yield call(updateNFT, payload);
    yield all([
      put({ type: types.UPDATE_NFT_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'NFT updated' : res.message || 'NFT not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/nfts');
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_NFT_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
}

export function* deleteNFTSaga({ payload }) {
  try {
    const res = yield call(deleteNFT, payload);
    yield all([
      put({ type: types.DELETE_NFT_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'NFT deleted' : res.message || 'NFT not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_NFT_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
    ]);
  }
};
