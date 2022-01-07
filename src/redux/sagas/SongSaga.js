import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addSong, deleteSong, getSongById, getSongs, updateSong, buySong, sellSong } from '../../Api/Song';
import * as types from '../../Constants/actions/Song';
import { SET_NOTIFICATION, SET_OVERLAY_LOADER, UNSET_OVERLAY_LOADER } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_SONGS_REQUEST, fetchSongsSaga);
  yield takeLatest(types.FETCH_SONG_REQUEST, fetchSongSaga);
  yield takeLatest(types.ADD_SONG_REQUEST, addSongSaga, context);
  yield takeLatest(types.UPDATE_SONG_REQUEST, updateSongSaga, context);
  yield takeLatest(types.DELETE_SONG_REQUEST, deleteSongSaga);
  yield takeLatest(types.BUY_SONG_REQUEST, buySongSaga, context);
  yield takeLatest(types.SELL_SONG_REQUEST, sellSongSaga, context);
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

export function* buySongSaga({ history }, { payload }) {
  try {
    yield all([
      put({ type: SET_OVERLAY_LOADER })
    ])
    const res = yield call(buySong, payload);
    yield all([
      put({ type: types.BUY_SONG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Purchase Completed' : res.message || 'Could not purchase',
        },
      }),
      put({ type: UNSET_OVERLAY_LOADER })
    ]);
    if (res.success) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
    yield all([
      put({ type: types.BUY_SONG_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
      put({ type: UNSET_OVERLAY_LOADER })
    ]);
  }
}

export function* sellSongSaga({ history }, { payload }) {
  try {
    yield all([
      put({ type: SET_OVERLAY_LOADER })
    ])
    const res = yield call(sellSong, payload);
    yield all([
      put({ type: types.SELL_SONG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Song has been listed' : res.message || 'Could not be listed',
        },
      }),
      put({ type: UNSET_OVERLAY_LOADER }),
    ]);
    if (res.success) {
      yield all([
        put({ type: types.HIDE_SELL_MODAL }),
        put({ type: types.SELL_SONG_CONFIRMATION})
      ])
      // window.location.reload()
    }
  } catch (error) {
    console.log(error)
    yield all([
      put({ type: types.SELL_SONG_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
      put({ type: UNSET_OVERLAY_LOADER })
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
