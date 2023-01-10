import { put, call, takeLatest, all } from 'redux-saga/effects';
import {searchResult } from '../../Api/SearchRes';
import * as types from '../../Constants/actions/Album';

/* eslint-disable no-use-before-define */
export default function* watchSearchSaga(context = {}) {
  yield takeLatest(types.FETCH_SEARCH_REQUEST, fetchSearchResult);
}

export function* fetchSearchResult({ payload }) {
  try {
    const res = yield call(searchResult, payload);
    yield all([
      put({ type: types.FETCH_SEARCH_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_SEARCH_FAILED, error });
  }
}

