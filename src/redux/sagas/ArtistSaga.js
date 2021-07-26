import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getArtistById, getArtists } from '../../Api/User';
import * as types from '../../Constants/actions/Artist';
/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
  yield takeLatest(types.FETCH_ARTIST_BY_ID_REQUEST, fetchArtistByIdSaga);
  yield takeLatest(types.FETCH_ARTISTS_REQUEST, fetchArtistsSaga);
}

export function* fetchArtistByIdSaga({ payload }) {
  try {
    const res = yield call(getArtistById, payload);
    yield all([
      put({ type: types.FETCH_ARTIST_BY_ID_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_ARTIST_BY_ID_FAILED, error });
  }
}

export function* fetchArtistsSaga({ payload }) {
  try {
    const res = yield call(getArtists, payload);
    yield all([
      put({ type: types.FETCH_ARTISTS_SUCCESS, res }),
    ]);
  } catch (error) {
    yield put({ type: types.FETCH_ARTISTS_FAILED, error });
  }
}

