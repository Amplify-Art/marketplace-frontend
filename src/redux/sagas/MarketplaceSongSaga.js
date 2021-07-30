import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addMarketplaceSong, deleteMarketplaceSong, getMarketplaceSongById, getMarketplaceSongs, updateMarketplaceSong} from '../../Api/MarketplaceSong';
import * as types from '../../Constants/actions/MarketplaceSong';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_MARKETPLACESONGS_REQUEST, fetchMarketplaceSongsSaga);
  yield takeLatest(types.FETCH_MARKETPLACESONG_REQUEST, fetchMarketplaceSongSaga);
  yield takeLatest(types.ADD_MARKETPLACESONG_REQUEST, addMarketplaceSongSaga, context);
  yield takeLatest(types.UPDATE_MARKETPLACESONG_REQUEST, updateMarketplaceSongSaga, context);
  yield takeLatest(types.DELETE_MARKETPLACESONG_REQUEST, deleteMarketplaceSongSaga);
}

export function* fetchMarketplaceSongsSaga({ payload }) {
  try {
    const res = yield call(getMarketplaceSongs, payload);
    yield all([
      put({ type: types.FETCH_MARKETPLACESONGS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_MARKETPLACESONGS_FAILED, error });
  }
}

export function* fetchMarketplaceSongSaga({ payload }) {
  try {
    const res = yield call(getMarketplaceSongById, payload);
    yield all([
      put({ type: types.FETCH_MARKETPLACESONG_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_MARKETPLACESONG_FAILED, error });
  }
}

export function* addMarketplaceSongSaga({ history }, { payload }) {
  try {
    const res = yield call(addMarketplaceSong, payload);
    yield all([
      put({ type: types.ADD_MARKETPLACESONG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'MarketplaceSong added' : res.message || 'MarketplaceSong not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/marketplacesongs');
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_MARKETPLACESONG_FAILED, error }),
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

export function* updateMarketplaceSongSaga({ history }, { payload }) {
  try {
    const res = yield call(updateMarketplaceSong, payload);
    yield all([
      put({ type: types.UPDATE_MARKETPLACESONG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'MarketplaceSong updated' : res.message || 'MarketplaceSong not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/marketplacesongs');
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_MARKETPLACESONG_FAILED, error }),
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

export function* deleteMarketplaceSongSaga({ payload }) {
  try {
    const res = yield call(deleteMarketplaceSong, payload);
    yield all([
      put({ type: types.DELETE_MARKETPLACESONG_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'MarketplaceSong deleted' : res.message || 'MarketplaceSong not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_MARKETPLACESONG_FAILED, error }),
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
