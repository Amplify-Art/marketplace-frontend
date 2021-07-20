import React, { useState, useEffect, useRef } from 'react';
import './Player.scss';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

// Player Icons
import NextSongIcon from '../../../assets/images/next.svg';
import PrevSongIcon from '../../../assets/images/prev.svg';
import LeftArrowIcon from '../../../assets/images/left-arrow.svg';
import BellIcon from '../../../assets/images/bell-icon.svg';
import Wallet from '../../../assets/images/wallet-icon.svg';
import CdImage from '../../../assets/images/cd-img.svg'

// Cover import (This will be dynamic)
import DefaultCover from '../../../assets/images/cd-img.svg';

const audioElement = new Audio();

function Player(props) {
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  useEffect(() => {
    const isData = document.getElementsByClassName("error-page")[0];
    if (isData)
      setIsShow(true)
  }, [])

  const { avatar, toggleWalletSidebar, currentPlaylists } = props;

  const [isExpanded, toggleExpanded] = useState(false);
  const [isPlaying, togglePlay] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [currentSongSrc, setSongSrc] = useState(`https://gateway.pinata.cloud/ipfs/${currentPlaylists[0].song_cid}`);

  // const coverData = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex]?.album.cover_cid}`

  const playBar = useRef(null);
  const playButtonFunction = () => {
    console.log(isPlaying)
    togglePlay(!isPlaying);
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
      requestAnimationFrame(updateBar);
    }
  };

  useEffect(()=>{
    setSongIndex(0)
    togglePlay(false)
    audioElement.currentTime = 0
    audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[0].song_cid}`
    requestAnimationFrame(updateBar);
  },[currentPlaylists])


  audioElement.onended=function()
  {
    togglePlay(true)
    nextSong()
  }


  const updateBar = () => {
    setSongProgress(audioElement.currentTime);
    requestAnimationFrame(updateBar);
  }

  const nextSong = () => {
    if ((songIndex + 1) !== currentPlaylists.length) { // Prevents error by skipping past the number of songs that are available
      audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex + 1]?.song_cid}`;
      if (isPlaying) {
        audioElement.play();
      }
      setSongIndex(songIndex + 1);
    }
  }

  const prevSong = () => {
    if (songIndex !== 0) { // Cant go prev. the min songs available.. Maybe we will loop later?
      audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex - 1].song_cid}`;
      if (isPlaying) {
        audioElement.play();
      }
      setSongIndex(songIndex - 1);
    }
  }

  // useEffect(() => {
  //   audioElement.src = currentSongSrc;
  // }, [0]);

  const onSongSeek = (e) => {
    if (isExpanded) {
      audioElement.currentTime = (e.clientX - playBar.current.getBoundingClientRect().x) * audioElement.duration / playBar.current.getBoundingClientRect().width
    } else {
      audioElement.currentTime = (playBar.current.getBoundingClientRect().bottom - e.clientY) * audioElement.duration / playBar.current.getBoundingClientRect().height
    }
  }

  return (
    !isShow &&
    (
      <div id="amplify-player" className={`amplify-player ${isExpanded && 'full'}`}>
        <div className="over">
          <div className="top-icons">
            <div className="bell"><img src={BellIcon} alt="Bell" /></div>
            <div className="wallet" onClick={() => toggleWalletSidebar()}><img src={Wallet} alt="wallet" /></div>
            <div className="user">
              <img src={avatar} />
            </div>
          </div>
          {isExpanded && <div className="album-info large">
            <div className="cover">
              {/* If album is owned, show cover here, else use blank CD */}
              <img src={currentPlaylists[songIndex]?.album && currentPlaylists[songIndex].album?.current_owner === user.id ? `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex]?.album.cover_cid}` : DefaultCover} alt="Cover" />
            </div>
            <div className="details">
              <div className="rotate">
                <h5 className="album-title">{currentPlaylists[songIndex]?.title}</h5>
                {/* <h6 className="song-name">{activePlaylist[songIndex].album_title}</h6> */}
              </div>
            </div>
          </div>}

          <div className="player-pull-out-button" onClick={() => toggleExpanded(true)}>
            <img src={LeftArrowIcon} />
          </div>

          <div className="progress-bar">
            <div className="bar" onClick={(e) => onSongSeek(e)} ref={playBar}>
              {isExpanded ? (
                <div className="completed" style={{ width: `${audioElement.currentTime / audioElement.duration * 100}%`, height: '100%' }} />
              ) : (
                <div className="completed" style={{ height: `${audioElement.currentTime / audioElement.duration * 100}%`, width: '100%' }} />
              )}
            </div>
          </div>

          <div className="controls">
            <div className="button prev" onClick={() => nextSong()}>
              <img src={NextSongIcon} alt="Next Song" />
            </div>
            <div className="button play-pause" onClick={() => playButtonFunction()}>
              {isPlaying ? (
                <svg className="pause" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.06066 15.061C3.34196 14.7797 3.5 14.3982 3.5 14.0004L3.5 2.00037C3.5 1.60254 3.34196 1.22101 3.06066 0.939705C2.77936 0.658401 2.39782 0.500366 2 0.500366C1.60218 0.500366 1.22064 0.6584 0.939339 0.939705C0.658033 1.22101 0.5 1.60254 0.5 2.00037L0.5 14.0004C0.5 14.3982 0.658034 14.7797 0.939339 15.061C1.22064 15.3423 1.60217 15.5004 2 15.5004C2.39783 15.5004 2.77936 15.3423 3.06066 15.061ZM11.0607 15.061C11.342 14.7797 11.5 14.3982 11.5 14.0004L11.5 2.00037C11.5 1.60254 11.342 1.22101 11.0607 0.939705C10.7794 0.658401 10.3978 0.500366 10 0.500366C9.60218 0.500366 9.22065 0.658401 8.93934 0.939705C8.65804 1.22101 8.5 1.60254 8.5 2.00037L8.5 14.0004C8.5 14.3982 8.65804 14.7797 8.93934 15.061C9.22064 15.3423 9.60217 15.5004 10 15.5004C10.3978 15.5004 10.7794 15.3423 11.0607 15.061Z" fill="white" stroke="white" /></svg>
              ) : (
                <svg className="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" /></svg>
              )}
            </div>
            <div className="button next" onClick={() => prevSong()}>
              <img src={PrevSongIcon} alt="Previous Song" />
            </div>
          </div>

          {isExpanded && <p className="mini-player-btn" onClick={() => toggleExpanded(false)}>Mini Player</p>}

          {!isExpanded && <div className="album-info">
            <div className="cover">
              {/* <img src={activePlaylist[songIndex].cover} alt="Cover" /> */}
            </div>
            <div className="details">
              <div className="rotate">
                <h5 className="album-title">{currentPlaylists[songIndex]?.title}</h5>
                {/* <h6 className="song-name">{activePlaylist[songIndex].album_title}</h6> */}
              </div>
            </div>
          </div>}
        </div>
        {/* If album is owned, show cover here, else use blank CD */}
        {
            <div className="background-blur" style={{ backgroundImage: `url(${currentPlaylists[songIndex]?.album && currentPlaylists[songIndex].album?.current_owner === user.id ? `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex]?.album.cover_cid}` : DefaultCover})` }} /> 
        }
      </div>
    )

  );
}

export default connect(state => {
  return {
    currentPlaylists: state.playlists.current_playlists
  }
})(Player);
