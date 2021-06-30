import { fork } from "redux-saga/effects";
import watchAlbumSaga from './AlbumSaga';
import watchNFTSaga from './NFTSaga';
import watchPlaylistSaga from './PlaylistSaga';
import watchSongSaga from './SongSaga';
import watchShowcaseSaga from './ShowcaseSaga';
import watchArtistSaga from './ArtistSaga';

export default function* startForman(context = {}) {
  yield fork(watchAlbumSaga, context);
  yield fork(watchNFTSaga, context);
  yield fork(watchPlaylistSaga, context);
  yield fork(watchSongSaga, context);
  yield fork(watchShowcaseSaga, context);
  yield fork(watchArtistSaga, context);
}
