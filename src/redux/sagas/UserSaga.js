import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  getUserByNearId,
} from "../../Api/User";
import * as types from "../../Constants/actions/User";
import { SET_NOTIFICATION } from "../../Constants/actions/Global";

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(types.FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(types.FETCH_USER_BY_NEAR_ID_REQUEST, fetchUserByNearIdSaga);
  yield takeLatest(types.ADD_USER_REQUEST, addUserSaga, context);
  yield takeLatest(types.UPDATE_USER_REQUEST, updateUserSaga, context);
  yield takeLatest(types.DELETE_USER_REQUEST, deleteUserSaga);
}

export function* fetchUsersSaga({ payload }) {
  try {
    const res = yield call(getUsers, payload);
    yield all([put({ type: types.FETCH_USERS_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_USERS_FAILED, error });
  }
}

export function* fetchUserSaga({ payload }) {
  try {
    const res = yield call(getUserById, payload);
    yield all([put({ type: types.FETCH_USER_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_USER_FAILED, error });
  }
}

export function* fetchUserByNearIdSaga({ payload }) {
  try {
    const res = yield call(getUserByNearId, payload);
    yield all([put({ type: types.FETCH_USER_BY_NEAR_ID_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_USER_BY_NEAR_ID_FAILED, error });
  }
}

export function* addUserSaga({ history }, { payload }) {
  try {
    const res = yield call(addUser, payload);
    yield all([
      put({ type: types.ADD_USER_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? "User added" : res.message || "User not added",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.ADD_USER_FAILED, error }),
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

export function* updateUserSaga({ history }, { payload }) {
  try {
    const res = yield call(updateUser, payload);
    yield all([
      put({ type: types.UPDATE_USER_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "Settings Updated"
            : res.message || "User not updated",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_USER_FAILED, error }),
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

export function* deleteUserSaga({ payload }) {
  try {
    const res = yield call(deleteUser, payload);
    yield all([
      put({ type: types.DELETE_USER_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "User deleted"
            : res.message || "User not deleted",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_USER_FAILED, error }),
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
