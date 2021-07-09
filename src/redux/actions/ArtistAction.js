import * as types from '../../Constants/actions/Artist';

// export const fetchAlbumsAction = payload => ({
//   type: types.FETCH_ALBUMS_REQUEST,
//   payload,
// });

export const fetchArtistByIdAction = payload => ({
  type: types.FETCH_ARTIST_BY_ID_REQUEST,
  payload,
});

export const fetchArtists = payload => ({
  type: types.FETCH_ARTISTS_REQUEST,
  payload,
});