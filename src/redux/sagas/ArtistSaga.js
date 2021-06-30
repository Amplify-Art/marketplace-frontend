import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getArtistById} from '../../Api/User';
import * as types from '../../Constants/actions/Artist';
import { SET_NOTIFICATION } from '../../Constants/actions/Global';

/* eslint-disable no-use-before-define */
export default function* watchOptionsListener(context = {}) {
//   yield takeLatest(types.FETCH_ALBUMS_REQUEST, fetchAlbumsSaga);
  yield takeLatest(types.FETCH_ARTIST_BY_ID_REQUEST, fetchArtistByIdSaga);
//   yield takeLatest(types.ADD_ALBUM_REQUEST, addAlbumSaga, context);
//   yield takeLatest(types.UPDATE_ALBUM_REQUEST, updateAlbumSaga, context);
//   yield takeLatest(types.DELETE_ALBUM_REQUEST, deleteAlbumSaga);
}

// export function* fetchAlbumsSaga({ payload }) {
//   try {
//     const res = yield call(getAlbums, payload);
//     yield all([
//       put({ type: types.FETCH_ALBUMS_SUCCESS, res }),
//     ]);
//   } catch (error) {
//     yield put({ type: types.FETCH_ALBUMS_FAILED, error });
//   }
// }

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

