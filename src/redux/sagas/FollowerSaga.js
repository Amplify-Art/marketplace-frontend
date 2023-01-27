import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addFollower, deleteFollower, getFollowerById, getFollowers, updateFollower } from '../../Api/Follower';
import * as types from '../../Constants/actions/Follower';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_FOLLOWERS_REQUEST, fetchFollowersSaga);
  yield takeLatest(types.FETCH_FOLLOWER_REQUEST, fetchFollowerSaga);
  yield takeLatest(types.ADD_FOLLOWER_REQUEST, addFollowerSaga, context);
  yield takeLatest(types.UPDATE_FOLLOWER_REQUEST, updateFollowerSaga, context);
  yield takeLatest(types.DELETE_FOLLOWER_REQUEST, deleteFollowerSaga);
}

export function* fetchFollowersSaga({ payload }) {
  try {
    const res = yield call(getFollowers, payload);
    yield all([
      put({ type: types.FETCH_FOLLOWERS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_FOLLOWERS_FAILED, error });
  }
}

export function* fetchFollowerSaga({ payload }) {
  try {
    const res = yield call(getFollowerById, payload);
    yield all([
      put({ type: types.FETCH_FOLLOWER_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_FOLLOWER_FAILED, error });
  }
}

export function* addFollowerSaga({ history }, { payload }) {
  try {
    const res = yield call(addFollower, payload);
    yield all([
      put({ type: types.ADD_FOLLOWER_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Artist Followed' : res.message || 'Follower not added',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.ADD_FOLLOWER_FAILED, error }),
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

export function* updateFollowerSaga({ history }, { payload }) {
  try {
    const res = yield call(updateFollower, payload);
    yield all([
      put({ type: types.UPDATE_FOLLOWER_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          title: 'Alert',
          message: res.success ? 'Unfollowed Artist' : res.message || 'Follower not updated',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_FOLLOWER_FAILED, error }),
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

export function* deleteFollowerSaga({ payload }) {
  try {
    const res = yield call(deleteFollower, payload);
    yield all([
      put({ type: types.DELETE_FOLLOWER_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Follower deleted' : res.message || 'Follower not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_FOLLOWER_FAILED, error }),
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
