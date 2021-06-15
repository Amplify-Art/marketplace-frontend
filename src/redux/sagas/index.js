import { fork } from "redux-saga/effects";
import watchAlbumSaga from './AlbumSaga';

export default function* startForman(context = {}) {
  yield fork(watchAlbumSaga, context);
}
