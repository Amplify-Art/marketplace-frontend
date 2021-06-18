import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';

import './ArtistProfile.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

import Shady from '../../assets/images/shady.jpg';
import TwitterIcon from '../../assets/images/twitter-icon.svg';

function ArtistProfile(props) {
  const generateAlbumItem = (album, index) => {
    return (
      <SingleAlbum key={index} albumInfo={album} />
    );
  }

  useEffect(() => {
    props.fetchAlbums();
  }, [])
  return (
    <div id="profile" className="left-nav-pad right-player-pad">
      <div className="profile-cover" />
      <div className="profile-head-details">
        <div className="profile-image">
          <img src={Shady} alt="Shady" />
        </div>

        <div className="details">
          <h3>Imagine Dragons</h3>
        </div>

        <div className="right-buttons">
          <button><img src={TwitterIcon} alt="Twitter" /> Follow</button>
        </div>
      </div>

      <div className="recently-purchased">
        <div className="top">
          <h2>Recently Released</h2>
          <button className="btn outlined">View All</button>
        </div>

        <div className="albums" className="album-grid">
          {props && props.albums && props.albums.length > 0 && props.albums.map((album, index) => (
            generateAlbumItem(album, index)
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(state => {
  return {
    albums: state.albums.albums,
  }
},
  dispatch => {
    return {
      fetchAlbums: () => dispatch(fetchAlbumsAction()),
    }
  })(withRouter(ArtistProfile));

