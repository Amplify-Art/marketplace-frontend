import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Player.scss";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import PayerQueue from "./PlayerQueue";
import GeneralModal from "../GeneralModal/index.js";

// Player Icons
import NextSongIcon from "../../../assets/images/next.svg";
import PrevSongIcon from "../../../assets/images/prev.svg";
import LeftArrowIcon from "../../../assets/images/left-arrow.svg";
import Wallet from "../../../assets/images/wallet-icon.svg";
import CdImage from "../../../assets/images/cd-img.svg";
import CDIcon from "../../../assets/images/cd-icon.svg";

import { updateCurrentPlaylistAction } from "../../../redux/actions/PlaylistAction";
import { togglePlayerAction } from "../../../redux/actions/GlobalAction";
import defaultProfile from "../../../assets/images/default-profile.svg";

const audioElement = new Audio();

function Player(props) {
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));

  const { avatar, toggleWalletSidebar, currentPlaylists, showWallet } = props;

  const [isPlaying, togglePlay] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [songDeletingIndex, setSongDeletingIndex] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [cdBackground, setCDBackground] = useState(CdImage);

  const playBar = useRef(null);

  const playButtonFunction = () => {
    togglePlay(!isPlaying);
  };

  useEffect(() => {
    const isData = document.getElementsByClassName("error-page")[0];
    if (isData) setIsShow(true);
  }, []);

  useEffect(() => {
    audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.songs?.[songIndex]?.song_cid}`;
    audioElement.currentTime = 0;
  }, [playlistIndex, songIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [isPlaying, playlistIndex, songIndex]);

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
  }, [currentPlaylists.length, songIndex, playlistIndex]);

  useEffect(() => {
    if (props.showPlayer) {
      togglePlay(true)
    } else {
      togglePlay(false)
    }
  }, [props.showPlayer]);

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
    props.showPlayer && (
      <div
        id="amplify-player"
        className={`amplify-player ${props.showPlayer && "full"}`}
      >
        <div className="over">
          <div className="top-icons">
            {/* <div className="bell"><img src={BellIcon} alt="Bell" /></div> */}
            <div className="cd" onClick={() => props.togglePlayer()}>
              <img src={CDIcon} alt="wallet" />
            </div>
            <div className="wallet">
              <Link to="/wallet">
                <img src={Wallet} alt="wallet" />
              </Link>
            </div>
            <div className="user">
              <img src={!avatar ? defaultProfile : avatar} alt="User" />
            </div>
          </div>
          {props.showPlayer && (
            <div className="album-info large">
              <div className="cover">
                {/* If album is owned, show cover here, else use blank CD */}
                {/* <img src={currentPlaylists[songIndex]?.album && currentPlaylists[songIndex].album?.current_owner === user.id ? `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex]?.album.cover_cid}` : DefaultCover} alt="Cover" /> */}
                {!(
                  currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album ||
                  currentPlaylists[playlistIndex]?.cover_cid
                ) ? (
                  <img src={CdImage} alt="Cover" />
                ) : (
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${
                      currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album
                        ?.cover_cid ||
                      currentPlaylists[playlistIndex]?.cover_cid
                    }`}
                    alt="Cover"
                  />
                )}
              </div>
              <div className="details">
                <div className="rotate">
                  <h5 className="album-title">
                    {currentPlaylists[playlistIndex]?.songs?.[songIndex]?.title}
                  </h5>
                </div>
              </div>
            </div>
          )}

          <div className="player-pull-out-button">
            <img src={LeftArrowIcon} alt="left" />
          </div>

          <div className="progress-bar">
            <div className="bar" onClick={(e) => onSongSeek(e)} ref={playBar}>
              <div
                className="completed"
                style={{
                  width: songProgress + "%",
                  height: "100%",
                }}
              />
            </div>
          </div>

          <div className="controls">
            <div className="button prev" onClick={() => nextSong()}>
              <img src={NextSongIcon} alt="Next Song" />
            </div>
            <div
              className="button play-pause"
              onClick={() => playButtonFunction()}
            >
              {isPlaying ? (
                <svg
                  className="pause"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.06066 15.061C3.34196 14.7797 3.5 14.3982 3.5 14.0004L3.5 2.00037C3.5 1.60254 3.34196 1.22101 3.06066 0.939705C2.77936 0.658401 2.39782 0.500366 2 0.500366C1.60218 0.500366 1.22064 0.6584 0.939339 0.939705C0.658033 1.22101 0.5 1.60254 0.5 2.00037L0.5 14.0004C0.5 14.3982 0.658034 14.7797 0.939339 15.061C1.22064 15.3423 1.60217 15.5004 2 15.5004C2.39783 15.5004 2.77936 15.3423 3.06066 15.061ZM11.0607 15.061C11.342 14.7797 11.5 14.3982 11.5 14.0004L11.5 2.00037C11.5 1.60254 11.342 1.22101 11.0607 0.939705C10.7794 0.658401 10.3978 0.500366 10 0.500366C9.60218 0.500366 9.22065 0.658401 8.93934 0.939705C8.65804 1.22101 8.5 1.60254 8.5 2.00037L8.5 14.0004C8.5 14.3982 8.65804 14.7797 8.93934 15.061C9.22064 15.3423 9.60217 15.5004 10 15.5004C10.3978 15.5004 10.7794 15.3423 11.0607 15.061Z"
                    fill="white"
                    stroke="white"
                  />
                </svg>
              ) : (
                <svg
                  className="play"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                </svg>
              )}
            </div>
            <div className="button next" onClick={() => prevSong()}>
              <img src={PrevSongIcon} alt="Previous Song" />
            </div>
          </div>
          {props.showPlayer && (
            <PayerQueue
              currentPlaylists={currentPlaylists}
              songIndex={songIndex}
              setSongDeletingIndex={setSongDeletingIndex}
              playlistIndex={playlistIndex}
            />
          )}
          {!props.showPlayer && (
            <div className="album-info">
              <div className="cover" />
              <div className="details">
                <div className="rotate">
                  <h5 className="album-title">
                    {currentPlaylists[songIndex]?.title}
                  </h5>
                </div>
              </div>
            </div>
          )}
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
  );
}

export default connect(
  (state) => {
    return {
      showWallet: state.global.showWallet,
      currentPlaylists: state.playlists.current_playlists,
      showPlayer: state.global.showPlayer,
    };
  },
  (dispatch) => {
    return {
      updateCurrentPlaylist: (data) =>
        dispatch(updateCurrentPlaylistAction(data)),
      togglePlayer: () => dispatch(togglePlayerAction()),
    };
  }
)(withRouter(Player));
