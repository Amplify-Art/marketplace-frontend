import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addShowcase, deleteShowcase, getShowcaseById, getShowcases, updateShowcase} from '../../Api/Showcase';
import * as types from '../../Constants/actions/Showcase';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_SHOWCASES_REQUEST, fetchShowcasesSaga);
  yield takeLatest(types.FETCH_SHOWCASE_REQUEST, fetchShowcaseSaga);
  yield takeLatest(types.ADD_SHOWCASE_REQUEST, addShowcaseSaga, context);
  yield takeLatest(types.UPDATE_SHOWCASE_REQUEST, updateShowcaseSaga, context);
  yield takeLatest(types.DELETE_SHOWCASE_REQUEST, deleteShowcaseSaga);
}

export function* fetchShowcasesSaga({ payload }) {
  try {
    const res = yield call(getShowcases, payload);
    yield all([
      put({ type: types.FETCH_SHOWCASES_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_SHOWCASES_FAILED, error });
  }
}

export function* fetchShowcaseSaga({ payload }) {
  try {
    const res = yield call(getShowcaseById, payload);
    yield all([
      put({ type: types.FETCH_SHOWCASE_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_SHOWCASE_FAILED, error });
  }
}

export function* addShowcaseSaga({ history }, { payload }) {
  try {
    const res = yield call(addShowcase, payload);
    yield all([
      put({ type: types.ADD_SHOWCASE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Album added to showcase' : res.message || 'Showcase not added',
        },
      }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/showcases');
    // }
  } catch (error) {
    yield all([
      put({ type: types.ADD_SHOWCASE_FAILED, error }),
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

export function* updateShowcaseSaga({ history }, { payload }) {
  try {
    const res = yield call(updateShowcase, payload);
    yield all([
      put({ type: types.UPDATE_SHOWCASE_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Album removed from showcase' : res.message || 'Showcase not updated',
        },
      }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/showcases');
    // }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_SHOWCASE_FAILED, error }),
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

export function* deleteShowcaseSaga({ payload }) {
  try {
    const res = yield call(deleteShowcase, payload);
    yield all([
      put({ type: types.DELETE_SHOWCASE_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Showcase deleted' : res.message || 'Showcase not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_SHOWCASE_FAILED, error }),
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
