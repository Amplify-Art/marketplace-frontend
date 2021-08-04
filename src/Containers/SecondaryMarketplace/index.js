import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SecondaryMarketplace.scss';

import SongList from '../../Components/Parts/SongList';

function SecondaryMarketplace(props) {
  const songs = [];
  return (
    <div id="secondary-marketplace" className="left-nav-pad right-player-pad">
      <div className="container">
        {songs && songs.length > 0 ? <SongList songList={songs} /> : (
          <div>
            <h4 className="large-white">No songs are currently for sale</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(state => {
  return {
    songResults: state.searchRes.searchResult,
  }
})(withRouter(SecondaryMarketplace));
