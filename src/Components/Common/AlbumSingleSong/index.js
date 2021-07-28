import React, { useEffect, useState } from 'react';
import SongLength from '../SongLength/index';
import playIcon from '../../../assets/images/play_icon.svg';
import pauseIcon from '../../../assets/images/pause_icon.svg';
class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progress, progressId } = this.props;

    return (
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <image id="mybutton" x={radius-9} y={radius-4} r="50" width={radius} height="30%" xlinkHref={pauseIcon}></image>
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={0 + ' ' + 0}
          r={this.normalizedRadius}
          cx={radius -2.5}
          cy={radius}
          id={progressId}
        />
      </svg>
    );
  }
}

const audioElement = new Audio();

function AlbumSingleSong(props) {
  const { song, index, isOpen, toggle, playing, currentIndex, audio } = props;

  return (
    <div className="inner-content-album" key={`al${index}`}>
      <div className="album-title">
        <div className="pr-10 pointer play-pause-btn">
          {playing && currentIndex === song.song_cid ? (
            <div onClick={() => toggle(song.song_cid)}>
              <ProgressRing
                radius={13}
                stroke={2}
                progress={audio.currentTime && audio.duration ? audio.currentTime / audio.duration : 0}
                progressId={song.song_cid}
              />
            </div>
          ) : (
            <img src={playIcon} onClick={() => toggle(song.song_cid)} />
          )}
        </div> 
        <div className="fn-white pointer">{song.title}</div>
      </div>
      <div className="fn-white"><SongLength i={index} song={`https://amplify-dev.mypinata.cloud/ipfs/${song.song_cid}`} /></div>
    </div>
  )
}

export default AlbumSingleSong