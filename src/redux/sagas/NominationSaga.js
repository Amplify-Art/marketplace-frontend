import { put, call, takeLatest, all } from 'redux-saga/effects';
import { addNomination, deleteNomination, getNominationById, getNominations, updateNomination} from '../../Api/Nomination';
import * as types from '../../Constants/actions/Nomination';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_NOMINATIONS_REQUEST, fetchNominationsSaga);
  yield takeLatest(types.FETCH_NOMINATION_REQUEST, fetchNominationSaga);
  yield takeLatest(types.ADD_NOMINATION_REQUEST, addNominationSaga, context);
  yield takeLatest(types.UPDATE_NOMINATION_REQUEST, updateNominationSaga, context);
  yield takeLatest(types.DELETE_NOMINATION_REQUEST, deleteNominationSaga);
}

export function* fetchNominationsSaga({ payload }) {
  try {
    const res = yield call(getNominations, payload);
    yield all([
      put({ type: types.FETCH_NOMINATIONS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_NOMINATIONS_FAILED, error });
  }
}

export function* fetchNominationSaga({ payload }) {
  try {
    const res = yield call(getNominationById, payload);
    yield all([
      put({ type: types.FETCH_NOMINATION_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_NOMINATION_FAILED, error });
  }
}

export function* addNominationSaga({ history }, { payload }) {
  try {
    const res = yield call(addNomination, payload);
    yield all([
      put({ type: types.ADD_NOMINATION_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Nomination added' : res.message || 'Nomination not added',
        },
      }),
      put({
        type: types.TOGGLE_NOMINATE_CONGRATS_MODAL,
        payload: res.success,
      }),
    ]);
    // if (res && res.success && res.data && res.data.id && history) {
    //   history.push('/nominations');
    // }
  } catch (error) {
    yield all([
      put({ type: types.ADD_NOMINATION_FAILED, error }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: false,
          message: error && error.message ? error.message : 'Server error',
        },
      }),
      put({
        type: types.TOGGLE_NOMINATE,
        payload: false,
      }),
    ]);
  }
}

export function* updateNominationSaga({ history }, { payload }) {
  try {
    const res = yield call(updateNomination, payload);
    yield all([
      put({ type: types.UPDATE_NOMINATION_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Nomination updated' : res.message || 'Nomination not updated',
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push('/nominations');
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_NOMINATION_FAILED, error }),
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

export function* deleteNominationSaga({ payload }) {
  try {
    const res = yield call(deleteNomination, payload);
    yield all([
      put({ type: types.DELETE_NOMINATION_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success ? 'Nomination deleted' : res.message || 'Nomination not deleted',
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_NOMINATION_FAILED, error }),
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
