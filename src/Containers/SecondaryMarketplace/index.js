import React, { useState, useEffect, useRef } from 'react';
import './SecondaryMarketplace.scss';

import SingleAlbum from '../../Components/Common/SingleAlbum/index';
import CoverOne from '../../assets/images/cd-cover-one.png';
import CoverTwo from '../../assets/images/cover2.png';
import CoverThree from '../../assets/images/cover3.png';
import CoverFour from '../../assets/images/cover4.png';
import CoverFive from '../../assets/images/cover5.png';
import CoverSix from '../../assets/images/cover6.png';

function SecondaryMarketplace(props) {
  const songs = [
    {
      id: 1,
      title: 'Cool Song',
      mint: '#3, #4',
    },
    {
      id: 2,
      title: 'Another Song'
    },
    {
      id: 3,
      title: 'Yet one more',
      mint: '#3, #4',
    },
    {
      id: 4,
      title: 'Bad Song'
    },
    {
      id: 5,
      title: 'Okay Song'
    },
    {
      id: 6,
      title: 'A Really Good Song',
      mint: '#3, #4',
    }
  ];
  return (
    <div id="secondary-marketplace" className="left-nav-pad right-player-pad">
      <div className="marketplace-table">
        <div className="headers">
          <div className="head-item">Song Title | Mints Owned</div>
          <div className="head-item">Album</div>
          <div className="head-item">Artist</div>
          <div className="head-item">For Sale</div>
        </div>

        <div className="table-body">
          {songs.map((song, index) => (
            <div className="row-item" key={index}>
              <div className="cell album-info">
                <div className="play-indicator"></div>
                <div className="title">{song.title}</div>
                {song.mint && <div className="mints">#3, #4</div>}
              </div>

              <div className="cell">Blood is Rebel</div>

              <div className="cell">Oh The Larceny</div>

              <div className="cell">14/100 Available</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondaryMarketplace;
