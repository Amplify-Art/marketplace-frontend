import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addAlbum, deleteAlbum, getAlbumById, getAlbums, updateAlbum} from '../../Api/Album';
import * as types from '../../Constants/actions/Album';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_ALBUMS_REQUEST, fetchAlbumsSaga);
  yield takeLatest(types.FETCH_ALBUM_REQUEST, fetchAlbumSaga);
  yield takeLatest(types.ADD_ALBUM_REQUEST, addAlbumSaga, context);
  yield takeLatest(types.UPDATE_ALBUM_REQUEST, updateAlbumSaga, context);
  yield takeLatest(types.DELETE_ALBUM_REQUEST, deleteAlbumSaga);
}

export function* fetchAlbumsSaga({ payload }) {
  try {
    const res = yield call(getAlbums, payload);
    yield all([
      put({ type: types.FETCH_ALBUMS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_ALBUMS_FAILED, error });
  }
}

export function* fetchAlbumSaga({ payload }) {
  try {
    const res = yield call(getAlbumById, payload);
    yield all([
      put({ type: types.FETCH_ALBUM_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_ALBUM_FAILED, error });
  }
}

export function* addAlbumSaga({ history }, { payload }) {
  try {
    const res = yield call(addAlbum, payload);
    yield all([
      put({ type: types.ADD_ALBUM_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Album added' : res.message || 'Album not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/albums');
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_ALBUM_FAILED, error }),
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

export function* updateAlbumSaga({ history }, { payload }) {
  try {
    const res = yield call(updateAlbum, payload);
    yield all([
      put({ type: types.UPDATE_ALBUM_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Album updated' : res.message || 'Album not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/albums');
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_ALBUM_FAILED, error }),
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

export function* deleteAlbumSaga({ payload }) {
  try {
    const res = yield call(deleteAlbum, payload);
    yield all([
      put({ type: types.DELETE_ALBUM_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Album deleted' : res.message || 'Album not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_ALBUM_FAILED, error }),
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
