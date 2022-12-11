import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  addSupporterPayoutLog,
  deleteSupporterPayoutLog,
  getSupporterPayoutLogById,
  getSupporterPayoutLogs,
  updateSupporterPayoutLog,
} from "../../Api/SupporterPayoutLog";
import * as types from "../../Constants/actions/SupporterPayoutLog";
import {
  SET_NOTIFICATION,
} from "../../Constants/actions/Global";

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(
    types.FETCH_SUPPORTER_PAYOUT_LOGS_REQUEST,
    fetchSupporterPayoutLogsSaga
  );
  yield takeLatest(
    types.FETCH_SUPPORTER_PAYOUT_LOG_REQUEST,
    fetchSupporterPayoutLogSaga
  );
  yield takeLatest(
    types.ADD_SUPPORTER_PAYOUT_LOG_REQUEST,
    addSupporterPayoutLogSaga,
    context
  );
  yield takeLatest(
    types.UPDATE_SUPPORTER_PAYOUT_LOG_REQUEST,
    updateSupporterPayoutLogSaga,
    context
  );
  yield takeLatest(
    types.DELETE_SUPPORTER_PAYOUT_LOG_REQUEST,
    deleteSupporterPayoutLogSaga
  );
}

export function* fetchSupporterPayoutLogsSaga({ payload }) {
  try {
    const res = yield call(getSupporterPayoutLogs, payload);
    yield all([put({ type: types.FETCH_SUPPORTER_PAYOUT_LOGS_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_SUPPORTER_PAYOUT_LOGS_FAILED, error });
  }
}

export function* fetchSupporterPayoutLogSaga({ payload }) {
  try {
    const res = yield call(getSupporterPayoutLogById, payload);
    yield all([put({ type: types.FETCH_SUPPORTER_PAYOUT_LOG_SUCCESS, res })]);
  } catch (error) {
    yield put({ type: types.FETCH_SUPPORTER_PAYOUT_LOG_FAILED, error });
  }
}

export function* addSupporterPayoutLogSaga({ history }, { payload }) {
  try {
    const res = yield call(addSupporterPayoutLog, payload);
    yield all([
      put({ type: types.ADD_SUPPORTER_PAYOUT_LOG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "SupporterPayoutLog added"
            : res.message || "SupporterPayoutLog not added",
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push("/marketplace");
    }
  } catch (error) {
    yield all([
      put({ type: types.ADD_SUPPORTER_PAYOUT_LOG_FAILED, error }),
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

export function* updateSupporterPayoutLogSaga({ history }, { payload }) {
  try {
    const res = yield call(updateSupporterPayoutLog, payload);
    yield all([
      put({ type: types.UPDATE_SUPPORTER_PAYOUT_LOG_SUCCESS, res }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "SupporterPayoutLog updated"
            : res.message || "SupporterPayoutLog not updated",
        },
      }),
    ]);
    if (res && res.success && res.data && res.data.id && history) {
      history.push("/marketplace");
    }
  } catch (error) {
    yield all([
      put({ type: types.UPDATE_SUPPORTER_PAYOUT_LOG_FAILED, error }),
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

export function* deleteSupporterPayoutLogSaga({ payload }) {
  try {
    const res = yield call(deleteSupporterPayoutLog, payload);
    yield all([
      put({ type: types.DELETE_SUPPORTER_PAYOUT_LOG_SUCCESS, payload }),
      put({
        type: SET_NOTIFICATION,
        payload: {
          success: res.success,
          message: res.success
            ? "SupporterPayoutLog deleted"
            : res.message || "SupporterPayoutLog not deleted",
        },
      }),
    ]);
  } catch (error) {
    yield all([
      put({ type: types.DELETE_SUPPORTER_PAYOUT_LOG_FAILED, error }),
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
