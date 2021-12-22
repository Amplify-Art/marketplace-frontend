import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addPlaylist, deletePlaylist, getPlaylistById, getPlaylists, updatePlaylist } from '../../Api/Playlist';
import * as types from '../../Constants/actions/Playlist';
import { SET_NOTIFICATION, SET_OVERLAY_LOADER, UNSET_OVERLAY_LOADER } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_PLAYLISTS_REQUEST, fetchPlaylistsSaga);
  yield takeLatest(types.FETCH_PLAYLIST_REQUEST, fetchPlaylistSaga);
  yield takeLatest(types.ADD_PLAYLIST_REQUEST, addPlaylistSaga, context);
  yield takeLatest(types.UPDATE_PLAYLIST_REQUEST, updatePlaylistSaga, context);
  yield takeLatest(types.DELETE_PLAYLIST_REQUEST, deletePlaylistSaga);
  // yield takeLatest(types.UPDATE_CURRENT_PLAYLIST_REQUEST, updateCurrentPlaylistSaga);
}

export function* fetchPlaylistsSaga({ payload }) {
  try {
    const res = yield call(getPlaylists, payload);
    yield all([
      put({ type: types.FETCH_PLAYLISTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_PLAYLISTS_FAILED, error });
  }
}

export function* fetchPlaylistSaga({ payload }) {
  try {
    const res = yield call(getPlaylistById, payload);
    yield all([
      put({ type: types.FETCH_PLAYLIST_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_PLAYLIST_FAILED, error });
  }
}

export function* addPlaylistSaga({ history }, { payload }) {
  try {
    const res = yield call(addPlaylist, payload);
    yield all([
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Playlist added' : res.message || 'Playlist not added',
        },
      }),
      put({ type: types.ADD_PLAYLIST_SUCCESS, res }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/playlists');
    // }
  } catch (error) {
    yield all([
      put({ type: types.ADD_PLAYLIST_FAILED, error }),
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

export function* updatePlaylistSaga({ history }, { payload }) {
  try {
    const res = yield call(updatePlaylist, payload);
    yield all([
      put({ type: types.UPDATE_PLAYLIST_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Playlist updated' : res.message || 'Playlist not updated',
        },
      }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/playlists');
    // }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_PLAYLIST_FAILED, error }),
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

export function* deletePlaylistSaga({ payload }) {
  try {
    yield all([
      put({ type: SET_OVERLAY_LOADER }),
    ]);
    const res = yield call(deletePlaylist, payload);
    yield all([
      put({ type: types.DELETE_PLAYLIST_SUCCESS, payload }),
      put({ type: types.HIDE_PLAYLIST_DELETE_MODAL }),
      put({ type: types.HIDE_PLAYLIST_MODAL }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Playlist deleted' : res.message || 'Playlist not deleted',
        },
      }),
    ]);
    yield all([
      put({ type: UNSET_OVERLAY_LOADER }),
    ]);
  } catch (error) {
    yield all([
      put({ type: UNSET_OVERLAY_LOADER }),
      put({ type: types.DELETE_PLAYLIST_FAILED, error }),
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

export function* updateCurrentPlaylistSaga({ payload }) {
  try {
    yield all([
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: true,
          message: 'Playlist added'
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: 'Something went wrong',
        },
      }),
    ]);
  }
};
