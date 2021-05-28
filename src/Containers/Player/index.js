import React from 'react';
import './Player.scss';

// Player Icons
import NextSongIcon from '../../assets/images/next.svg';
import PrevSongIcon from '../../assets/images/prev.svg';
import PauseIcon from '../../assets/images/pause.svg';
import LeftArrowIcon from '../../assets/images/left-arrow.svg';

// User Image
import Harrison from '../../assets/images/harrison.jpeg';

// Cover import (This will be dynamic)
import TestCover from '../../assets/images/album2.png';

function Player() {
  return (
    <div id="amplify-player">
      <div className="over">
        <div className="user">
          <img src={Harrison} />
        </div>

        <div className="player-pull-out-button">
          <img src={LeftArrowIcon} />
        </div>

        <div className="progress-bar">
          <div className="bar">
            <div className="completed" style={{ height: '50%' }} />
          </div>
        </div>

        <div className="controls">
          <div className="button prev">
            <img src={NextSongIcon} alt="Next Song" />
          </div>
          <div className="button play-pause">
            <img src={PauseIcon} alt="Pause" />
          </div>
          <div className="button next">
            <img src={PrevSongIcon} alt="Previous Song" />
          </div>
        </div>

        <div className="album-info">
          <div className="cover">
            <img src={TestCover} alt="Cover" />
          </div>
          <div className="details">
            <div className="rotate">
              <h5 className="album-title">Oh The Larceny</h5>
              <h6 className="song-name">Oh The Larceny</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="background-blur" style={{ backgroundImage: `url(${TestCover})` }} />
    </div>
  );
}

export default Player;
