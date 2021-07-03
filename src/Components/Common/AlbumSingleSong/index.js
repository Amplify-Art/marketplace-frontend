import React, { useEffect, useState } from 'react';
import SongLength from '../SongLength/index';
import playIcon from '../../../assets/images/play_icon.svg';

class ProgressRing extends React.Component {
  constructor(props) {
    super(props);
    
    const { radius, stroke } = this.props;
    
    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }
  
  render() {
    const { radius, stroke, progress } = this.props;

    const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
  
    return (
      <svg
        height={radius * 2}
        width={radius * 2}
       >
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ this.circumference + ' ' + this.circumference }
          style={ { strokeDashoffset } }
          r={ this.normalizedRadius }
          cx={ radius }
          cy={ radius }
         />
      </svg>
    );
  }
}

const audioElement = new Audio();

function AlbumSingleSong(props) {
  const { song, index } = props;
  
  const [audio] = useState(new Audio(`https://hub.textile.io/ipfs/${song.song_cid}`));
  const [playing, setPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);

  const toggle = () => setPlaying(!playing);
  
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  });

  console.log('progress', audio.duration)

  return (
    <div className="inner-content-album" key={`al${index}`}  >
      <div className="album-title ">
        <div className="pr-10 pointer">
          {playing ? (
            <div onClick={toggle}>
              <ProgressRing
                radius={ 13 }
                stroke={ 2 }
                progress={ audio.currentTime / audio.duration }
              />
            </div>
          ) : (
            <img src={playIcon} onClick={toggle} />
          )}
        </div>
        <div className="fn-white pointer">{song.title}</div>
      </div>
      <div className="fn-white"><SongLength i={index} song={`https://hub.textile.io/ipfs/${song.song_cid}`} /></div>
    </div>
  )
}

export default AlbumSingleSong