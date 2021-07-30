import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addSong, deleteSong, getSongById, getSongs, updateSong} from '../../Api/Song';
import * as types from '../../Constants/actions/Song';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_SONGS_REQUEST, fetchSongsSaga);
  yield takeLatest(types.FETCH_SONG_REQUEST, fetchSongSaga);
  yield takeLatest(types.ADD_SONG_REQUEST, addSongSaga, context);
  yield takeLatest(types.UPDATE_SONG_REQUEST, updateSongSaga, context);
  yield takeLatest(types.DELETE_SONG_REQUEST, deleteSongSaga);
}

export function* fetchSongsSaga({ payload }) {
  try {
    const res = yield call(getSongs, payload);
    yield all([
      put({ type: types.FETCH_SONGS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_SONGS_FAILED, error });
  }
}

export function* fetchSongSaga({ payload }) {
  try {
    const res = yield call(getSongById, payload);
    yield all([
      put({ type: types.FETCH_SONG_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_SONG_FAILED, error });
  }
}

export function* addSongSaga({ history }, { payload }) {
  try {
    const res = yield call(addSong, payload);
    yield all([
      put({ type: types.ADD_SONG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Song added' : res.message || 'Song not added',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/marketplace');
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_SONG_FAILED, error }),
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

export function* updateSongSaga({ history }, { payload }) {
  try {
    const res = yield call(updateSong, payload);
    yield all([
      put({ type: types.UPDATE_SONG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Song updated' : res.message || 'Song not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/marketplace');
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_SONG_FAILED, error }),
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

export function* deleteSongSaga({ payload }) {
  try {
    const res = yield call(deleteSong, payload);
    yield all([
      put({ type: types.DELETE_SONG_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Song deleted' : res.message || 'Song not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_SONG_FAILED, error }),
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
