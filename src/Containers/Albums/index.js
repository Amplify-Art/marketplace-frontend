import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import './Albums.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

function Albums(props) {
  
  useEffect(() => {
    props.fetchAlbums();
  }, [])


  return (
    <div id="albums" className="left-nav-pad right-player-pad">
      <div className="container">
        <div className="album-grid">
          {props?.albums && props.albums?.length > 0 && props.albums.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} />
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
  })(withRouter(Albums));
