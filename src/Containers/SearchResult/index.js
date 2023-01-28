import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleAlbum from '../../Components/Common/SingleAlbum';
import UserAvatar from '../../Components/Common/UserAvatar';
import SongList from '../../Components/Parts/SongList';
import { setIsSongSelected } from '../../redux/actions/SearchResAction';

import jwt from "jsonwebtoken";
import { filter } from 'lodash';
import './SearchResult.scss';

function SearchResult(props) {
  const { results } = props?.searchResult;
  const albumsData = filter(results, item => item.type === "albums")[0]?.data || [];
  const artistsData = filter(results, item => item.type === "artists")[0]?.data || [];
  const songsData = filter(results, item => item.type === "songs")[0]?.data || [];
  const songSectionRef = useRef(null);
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

  const albumDetailRender = (albumNo) => (
    albumsData.map((album, index) => albumNo === index && (
      <div className="album-detail">
        <div>{album.title}</div>
        <div>{album.user && album.user.name}</div>
      </div >
    ))
  );

  useEffect(() => {
    if (props?.isSongSelected) {
      window.scrollTo({
        top: songSectionRef.current.offsetTop,
        behavior: 'smooth',
      })
      props.setIsSongSelected();
    }
  }, [props.isSongSelected]);

  return (
    <div className="container search-result left-nav-pad normal-right-pad">
      <div>
        <div className="album-title">Album results</div>
        {albumsData && albumsData.length ? <div className="" id="search-album">
          <div className="album-grid">
            {albumsData && albumsData?.map((album, index) => (
              <SingleAlbum key={index} albumInfo={album} children={albumDetailRender(index)} />
            ))}
          </div>
        </div> :
          <NoResult />
        }
      </div>
      {user && (
        <div ref={songSectionRef}>
          <div className="songlist-title">song results</div>
          {songsData.length ? <SongList songList={songsData} /> : <NoResult />}
        </div>
      )}
      <div className="songlist-title">artist results</div>
      {
        artistsData.length
        ? (
            <div className="artist-holder">
              {artistsData.length > 0 ? artistsData.map((artist, index) => (
                <UserAvatar avatarImg={artist.avatar} name={artist.near_account_id} key={`${index}art`} onClick={() => props.history.push(`/artist/${artist.near_account_id}`)} />
              )) : null}
            </div>
        )
        : <NoResult />
      }

    </div>
  )
}
export default connect(state => {
  return {
    searchResult: state.searchRes.searchResult,
    isSongSelected: state.searchRes.isSongSelected,
  }
}, dispatch => {
  return {
    setIsSongSelected: () => dispatch(setIsSongSelected()),
  }
})(withRouter(SearchResult));

const NoResult = () => <h4 className="no-result">No Results</h4>
