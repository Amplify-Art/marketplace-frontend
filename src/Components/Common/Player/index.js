import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Player.scss";
import { connect } from "react-redux";

import ProgressBar from './Parts/ProgressBar'
import Controls from './Parts/Controls'
import AlbumInfo from './Parts/AlbumInfo'

import PayerQueue from "./PlayerQueue";
import GeneralModal from "../GeneralModal/index.js";

// Player Icons
import Wallet from "../../../assets/images/wallet-icon.svg";
import CdImage from "../../../assets/images/cd-img.svg";
import CDIcon from "../../../assets/images/cd-icon.svg";

import { updateCurrentPlaylistAction } from "../../../redux/actions/PlaylistAction";
import { togglePlayerAction, togglePlayingAction } from "../../../redux/actions/GlobalAction";
import defaultProfile from "../../../assets/images/default-profile.svg";

const audioElement = new Audio();

function Player(props) {
  const { avatar, currentPlaylists } = props;

  const [songProgress, setSongProgress] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [songDeletingIndex, setSongDeletingIndex] = useState(null);
  const [, setIsShow] = useState(false);
  const [cdBackground, setCDBackground] = useState(CdImage);

  const playBar = useRef(null);

  const playButtonFunction = () => {
    props.togglePlaying();
  };

  useEffect(() => {
    const isData = document.getElementsByClassName("error-page")[0];
    if (isData) setIsShow(true);
  }, []);

  useEffect(() => {
    audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.songs?.[songIndex]?.song_cid}`;
    audioElement.currentTime = 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistIndex, songIndex]);

  useEffect(() => {
    if (props.isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [props.isPlaying, playlistIndex, songIndex]);

  const updateBar = () => {
    setSongProgress(audioElement.duration ? (audioElement.currentTime / audioElement.duration) * 100 : 0);
  };

  audioElement.ontimeupdate = function () {
    requestAnimationFrame(updateBar);
  };

  useEffect(() => {
    setPlaylistIndex(0);
    setSongIndex(0);
  }, [currentPlaylists.length]);

  useEffect(() => {
    getPlayerBackground();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlaylists.length, songIndex, playlistIndex]);

  audioElement.onended = function () {
    nextSong();
  };

  const handleCloseModal = (bool) => {
    if (bool) {
      props.updateCurrentPlaylist(
        currentPlaylists.filter((f, i) => i !== songDeletingIndex)
      );
      sessionStorage.setItem(
        "activePlaylist",
        JSON.stringify(
          currentPlaylists.filter((f, i) => i !== songDeletingIndex)
        )
      );
      if (songDeletingIndex === songIndex) {
        audioElement.pause();
      }
    }
    setSongDeletingIndex(null);
  };

  const nextSong = () => {
    if (songIndex + 1 !== currentPlaylists[playlistIndex]?.songs?.length) {
      setSongIndex(songIndex + 1);
    } else {
      if (playlistIndex + 1 !== currentPlaylists.length) {
        setPlaylistIndex(playlistIndex + 1);
        setSongIndex(0);
      }
    }
  };

  const prevSong = () => {
    if (songIndex !== 0) {
      setSongIndex(songIndex - 1);
    } else {
      if (playlistIndex !== 0) {
        let index = playlistIndex - 1;
        setPlaylistIndex(index);
        setSongIndex(currentPlaylists[index]?.songs?.length - 1);
      }
    }
  };

  const onSongSeek = (e) => {
    audioElement.currentTime =
      ((e.clientX - playBar.current.getBoundingClientRect().x) *
        audioElement.duration) /
      playBar.current.getBoundingClientRect().width;
  };

  const getPlayerBackground = () => {
    let backgroundImage;

    if (currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album?.cover_cid) {
      backgroundImage = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album.cover_cid}`;
    } else if (currentPlaylists[playlistIndex]?.cover_cid) {
      backgroundImage = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.cover_cid}`;
    } else {
      backgroundImage = CdImage;
    }

    setCDBackground(backgroundImage);
  };

  return (
    <div
      id="amplify-player"
      className={`amplify-player full ${!props.showPlayer && 'hidden'}`}
    >
      <div className="over">
        <div className="top-icons">
          <div className="cd" onClick={() => props.togglePlayer()}>
            <img src={CDIcon} alt="wallet" className={props.isPlaying && 'endless-rotate'} />
          </div>
          <div className="wallet">
            <Link to="/wallet">
              <img src={Wallet} alt="wallet" />
            </Link>
          </div>
          <div className="user">
            <Link to="/my-profile">
              <img src={!avatar ? defaultProfile : avatar} alt="User" />
            </Link>
          </div>
        </div>

        <AlbumInfo
          currentPlaylists={currentPlaylists}
          playlistIndex={playlistIndex}
          songIndex={songIndex}
        />

        <ProgressBar
          onSongSeek={(e) => onSongSeek(e)}
          playBar={playBar}
          songProgress={songProgress}
        />

        <Controls
          nextSong={() => nextSong()}
          playButtonFunction={() => playButtonFunction()}
          isPlaying={props.isPlaying}
          prevSong={() => prevSong()}
        />

        <PayerQueue
          currentPlaylists={currentPlaylists}
          songIndex={songIndex}
          setSongDeletingIndex={setSongDeletingIndex}
          playlistIndex={playlistIndex}
        />
      </div>
      {songDeletingIndex !== null && (
        <GeneralModal
          headline="Remove playlist from queue?"
          buttons={[
            {
              type: "solid go-home",
              text: "Yes",
              onClick: () => handleCloseModal(true),
            },
            {
              type: "solid go-home",
              text: "Cancel",
              onClick: () => handleCloseModal(false),
            },
          ]}
          className="centered"
        />
      )}
      <div
        className="background-blur"
        style={{ backgroundImage: `url(${cdBackground})` }}
      />
    </div>
  )
}

export default connect(
  (state) => {
    return {
      showWallet: state.global.showWallet,
      currentPlaylists: state.playlists.current_playlists,
      showPlayer: state.global.showPlayer,
      isPlaying: state.global.isPlaying,
    };
  },
  (dispatch) => {
    return {
      updateCurrentPlaylist: (data) =>
        dispatch(updateCurrentPlaylistAction(data)),
      togglePlayer: () => dispatch(togglePlayerAction()),
      togglePlaying: () => dispatch(togglePlayingAction()),
    };
  }
)(withRouter(Player));
