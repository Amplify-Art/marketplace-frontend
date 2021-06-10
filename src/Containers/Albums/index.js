import React, { useState, useEffect, useRef } from 'react';
import './Albums.scss';

import CoverOne from '../../assets/images/cd-cover-one.png';

function Albums(props) {
  return (
    <div id="albums" className="left-nav-pad">
      <div className="album-list">
        <div className="single-album">
          <div className="cd-case">
            <img src={CoverOne} alt="" />
          </div>
          <h3 className="album-title">Evolve</h3>
          <h4 className="artist-name">Imagine Dragons</h4>
        </div>
      </div>
    </div>
  );
}

export default Albums;
