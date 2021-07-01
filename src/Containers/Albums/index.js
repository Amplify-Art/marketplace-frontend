import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import './Albums.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CoverFive from '../../assets/images/cover5.png';

function Albums(props) {
  
  useEffect(() => {
    props.fetchAlbums();
  }, [])


  return (
    <div id="albums" className="left-nav-pad right-player-pad">
      <div className="album-grid">
        {props?.albums && props.albums?.length > 0 && props.albums.map((album, index) => (
          <SingleAlbum key={index} albumInfo={album} />
        ))}
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
