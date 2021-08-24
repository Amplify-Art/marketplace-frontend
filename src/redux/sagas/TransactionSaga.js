import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getTransactionById, getTransactions } from '../../Api/Transaction';
import * as types from '../../Constants/actions/Transaction';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_TRANSACTIONS_REQUEST, fetchTransactionsSaga);
  yield takeLatest(types.FETCH_TRANSACTION_REQUEST, fetchTransactionSaga);
}

export function* fetchTransactionsSaga({ payload }) {
  try {
    const res = yield call(getTransactions, payload);
    yield all([
      put({ type: types.FETCH_TRANSACTIONS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_TRANSACTIONS_FAILED, error });
  }
}

export function* fetchTransactionSaga({ payload }) {
  try {
    const res = yield call(getTransactionById, payload);
    yield all([
      put({ type: types.FETCH_TRANSACTION_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_TRANSACTION_FAILED, error });
  }
}
