import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAlbumsAction } from '../../redux/actions/AlbumAction';
import './Albums.scss';
import { addTokenTransferAction } from '../../redux/actions/TokenTransferAction'

import SingleAlbum from '../../Components/Common/SingleAlbum/index';

function Albums(props) {
  useEffect(() => {
    props.fetchAlbums();
  }, [])

  const onBuy = (album) => {
    props.addTokenTransfer({
      type: 'album',
      "token_id": album.id,
    });

  }
  return (
    <div id="albums" className={`left-nav-pad ${props.playerActive ? 'right-player-pad' : 'normal-right-pad'}`}>
      <div className="container">
        <div className="album-grid">
          {props?.albums && props.albums?.length > 0 && props.albums.map((album, index) => (
            <SingleAlbum key={index} albumInfo={album} onBuy={onBuy} />
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
      addTokenTransfer: (data) => dispatch(addTokenTransferAction(data)),
    }
  })(withRouter(Albums));
