import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import './SearchResultCard.scss';
import cdCover from '../../../assets/images/cd-img.svg';


function SearchResultCard(props) {
  const { results } = props?.searchResult;
  const albumsData = filter(results, item => item.type === "albums")[0]?.data || [];
  const artistsData = filter(results, item => item.type === "artists")[0]?.data || [];
  const songsData = filter(results, item => item.type === "songs")[0]?.data || [];

  const findAlbumCover = (album) => {
    if (album.cover_cid)
      return `https://amplify-dev.mypinata.cloud/ipfs/${album.cover_cid}`;
    else if (album && album.token && album.token.album && album.token.album.cover_cid)
      return `https://amplify-dev.mypinata.cloud/ipfs/${album.token.album.cover_cid}`;
    else
      return cdCover;
  };

  const findSongCover = (song) => {
    if (song.album && song.album.cover_cid) return `https://amplify-dev.mypinata.cloud/ipfs/${song.album && song.album.cover_cid}`;
    else return cdCover;
  };

  const ResultCard = ({cover, contentHeading, contentDetail, contentTypeHeading, contentTypeDetail}) => {
    return (
      <div className="cardWrapper" onClick={props.handleClick}>
        <div className="imageHolder">
          <img className="image" src={cover} alt="cover" />
        </div>
        <div className="content">
          <div className="content-heading">{contentHeading}</div>
          <div className="content-details">{contentDetail}</div>
        </div>
        <div className="contentType">
          <div className="contentType-heading">{contentTypeHeading}</div>
          <div className="contentType-detail">{contentTypeDetail}</div>
        </div>
      </div>
    )
  }
  return (
    <>
      {
        songsData.length
        ? songsData.map(song => (
          <ResultCard
            cover={findSongCover(song)}
            contentHeading={song.title}
            contentDetail={song.album && song.album.title}
            contentTypeHeading="Song"
            contentTypeDetail={song.mints_owned.length ? `You Own: ${song.mints_owned.map(m => '#' + m).join(',')}` : ''}
          />
        ))
        : null
      }
      {
        albumsData.length
        ? albumsData.map(album => (
          <ResultCard
            cover={findAlbumCover(album)}
            contentHeading={album.title}
            contentDetail={`${album.songs.length} Songs`}
            contentTypeHeading="Album"
            contentTypeDetail={album.mints_owned.length ? `You Own: ${album.mints_owned.map(m => '#' + m).join(',')}` : ''}
          />
        ))
        : null
      }
      {
        artistsData.length
        ? artistsData.map(artist => (
          <ResultCard
            cover={artist.avatar}
            contentHeading={artist.name}
            contentDetail={artist.songs}
            contentTypeHeading="Artist"
            contentTypeDetail=""
          />
        ))
        : null
      }
    </>
  );
}

export default connect(state => {
  return {
    searchResult: state.searchRes.searchResult,
  }
})(withRouter(SearchResultCard));
