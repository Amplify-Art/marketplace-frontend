import { fork } from "redux-saga/effects";
import watchAlbumSaga from './AlbumSaga';
import watchNFTSaga from './NFTSaga';
import watchPlaylistSaga from './PlaylistSaga';
import watchSongSaga from './SongSaga';
import watchShowcaseSaga from './ShowcaseSaga';
import watchArtistSaga from './ArtistSaga';
import watchUserSaga from './UserSaga';
import watchNominationSaga from './NominationSaga';
import watchTokenTransferSaga from './TokenTransferSaga';
import watchSearchSaga from './SearchResSaga';

export default function* startForman(context = {}) {
  yield fork(watchAlbumSaga, context);
  yield fork(watchNFTSaga, context);
  yield fork(watchPlaylistSaga, context);
  yield fork(watchSongSaga, context);
  yield fork(watchShowcaseSaga, context);
  yield fork(watchArtistSaga, context);
  yield fork(watchUserSaga, context);
  yield fork(watchNominationSaga, context);
  yield fork(watchTokenTransferSaga, context);
  yield fork(watchSearchSaga, context);
}
