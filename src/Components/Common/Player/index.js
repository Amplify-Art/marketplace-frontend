import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Player.scss";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import PayerQueue from "./PlayerQueue";
import GeneralModal from "../GeneralModal/index.js";

import Wallet from "../../../assets/images/wallet-icon.svg";
import CdImage from "../../../assets/images/cd-img.svg";
import CDIcon from "../../../assets/images/cd-icon.svg";

import { updateCurrentPlaylistAction } from "../../../redux/actions/PlaylistAction";
import { togglePlayerAction } from "../../../redux/actions/GlobalAction";
import defaultProfile from "../../../assets/images/default-profile.jpg";

import ProgressBar from "./Parts/ProgressBar";
import Controls from "./Parts/Controls";

const audioElement = new Audio();

function Player(props) {
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  useEffect(() => {
    const isData = document.getElementsByClassName("error-page")[0];
    if (isData) setIsShow(true);
  }, []);

  const { avatar, toggleWalletSidebar, currentPlaylists, showWallet } = props;

  const [isPlaying, togglePlay] = useState(false);
  const [songProgress, setSongProgress] = useState(50);
  const [songIndex, setSongIndex] = useState(0);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [songDeletingIndex, setSongDeletingIndex] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [isPrevClicked, setIsPrevClicked] = useState(false);
  const [cdBackground, setCDBackground] = useState(CdImage);
  const [currentSongSrc, setSongSrc] = useState(
    `https://gateway.pinata.cloud/ipfs/${currentPlaylists[0].song_cid}`
  );

  useEffect(() => {
    console.log('1')
    setSongIndex(0);
    setPlaylistIndex(0);
    audioElement.currentTime = 0;
    audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists?.[playlistIndex]?.songs?.[songIndex]?.song_cid}`;
    audioElement.play();
    requestAnimationFrame(updateBar);
  }, [currentPlaylists.length]);

  useEffect(() => {
    console.log('2')
    getPlayerBackground();
  }, [currentPlaylists.length, songIndex, playlistIndex]);

  useEffect(() => {
    console.log('3')
    // if (props.showPlayer && audioElement.src) {
    //   audioElement.play();
    // } else {
    //   audioElement.pause();
    // }
  }, [props.showPlayer]);

  const updateBar = () => {
    // `${
    //   audioElement.duration
    //     ? (audioElement.currentTime / audioElement.duration) *
    //       100
    //     : 0
    // }%`
    // setSongProgress(audioElement.currentTime);
    // requestAnimationFrame(updateBar);

    setSongProgress((audioElement.currentTime / audioElement.duration) * 100);
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

  useEffect(() => {
    console.log('4')
    if (isPrevClicked) {
      setTimeout(() => {
        setIsPrevClicked(false);
      }, 600);
    }
  }, [isPrevClicked]);

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

          <ProgressBar
            songProgress={songProgress}
            audioElement={audioElement}
            togglePlay={togglePlay}
          />

          <Controls
            isPlaying={isPlaying}
            audioElement={audioElement}
            togglePlay={togglePlay}
            songIndex={songIndex}
            currentPlaylist={currentPlaylists}
            updateCurrentPlaylist={(playlist) => props.updateCurrentPlaylist(playlist)}
            setPlaylistIndex={(i) => setPlaylistIndex(i)}
            isPrevClicked={isPrevClicked}
            setIsPrevClicked={(bool) => setIsPrevClicked(bool)}
          />

          {props.showPlayer && (
            <PayerQueue
              currentPlaylists={currentPlaylists}
              songIndex={songIndex}
              setSongDeletingIndex={setSongDeletingIndex}
              playlistIndex={playlistIndex}
              setSongIndex={(i) => setSongIndex(i)}
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
