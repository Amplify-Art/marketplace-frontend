import React, { useState, useEffect, useRef } from "react";
import { withRouter, Link } from "react-router-dom";
import { Player } from 'react-simple-player';
import "./Player.scss";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'


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

function ThePlayer(props) {
  const user = jwt.decode(localStorage.getItem("amplify_app_token"));
  useEffect(() => {
    const isData = document.getElementsByClassName("error-page")[0];
    if (isData) setIsShow(true);
  }, []);

  const { avatar, toggleWalletSidebar, currentPlaylists, showWallet } = props;

  // const [isPlaying, togglePlay] = useState(false);
  // const [songProgress, setSongProgress] = useState(50);
  // const [songIndex, setSongIndex] = useState(0);
  // const [playlistIndex, setPlaylistIndex] = useState(0);
  // const [songDeletingIndex, setSongDeletingIndex] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [formattedPlaylists, setFormattedPlaylists] = useState([]);
  // const [isPrevClicked, setIsPrevClicked] = useState(false);
  // const [cdBackground, setCDBackground] = useState(CdImage);
  // const [currentSongSrc, setSongSrc] = useState(
  //   `https://gateway.pinata.cloud/ipfs/${currentPlaylists[0].song_cid}`
  // );

  const processPlaylist = () => {
    console.log('[[[[currentPlaylists--->', currentPlaylists)
    let thePlaylist = [];
    currentPlaylists?.length && currentPlaylists[0].songs.map(song => {
      thePlaylist.push({
        name: song.title,
        singer: 'Russ',
        cover:
        `https://gateway.pinata.cloud/ipfs/Qma5nV2QsCZ5PL2Ns1FuCzV5Y14jcBxgBUTSToNnh9BWpX`,
        musicSrc:
        `https://gateway.pinata.cloud/ipfs/${song.song_cid}`,
      },)
    })

    setFormattedPlaylists(thePlaylist);

    return
  }

  useEffect(() => {
    processPlaylist();
  }, [currentPlaylists])

  // // const coverData = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[songIndex]?.album.cover_cid}`

  // const playBar = useRef(null);
  // const playButtonFunction = () => {
  //   togglePlay(!isPlaying);
  //   if (isPlaying) {
  //     audioElement.pause();
  //   } else {
  //     audioElement.play();
  //     requestAnimationFrame(updateBar);
  //     // updateBar();
  //   }
  // };

  // useEffect(() => {
  //   setSongIndex(0);
  //   setPlaylistIndex(0);
  //   togglePlay(true);
  //   audioElement.currentTime = 0;
  //   audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists?.[playlistIndex]?.songs?.[songIndex]?.song_cid}`;
  //   audioElement.play();
  //   requestAnimationFrame(updateBar);
  // }, [currentPlaylists.length]);

  // useEffect(() => {
  //   getPlayerBackground();
  // }, [currentPlaylists.length, songIndex, playlistIndex]);

  // useEffect(() => {
  //   if (props.showPlayer && audioElement.src) {
  //     audioElement.play();
  //   } else {
  //     audioElement.pause();
  //   }
  // }, [props.showPlayer]);
  // audioElement.onended = function () {
  //   // togglePlay(true)
  //   nextSong();
  // };

  // const updateBar = () => {
  //   // `${
  //   //   audioElement.duration
  //   //     ? (audioElement.currentTime / audioElement.duration) *
  //   //       100
  //   //     : 0
  //   // }%`
  //   // setSongProgress(audioElement.currentTime);
  //   // requestAnimationFrame(updateBar);

  //   setSongProgress((audioElement.currentTime / audioElement.duration) * 100);
  // };

  // const handleCloseModal = (bool) => {
  //   if (bool) {
  //     props.updateCurrentPlaylist(
  //       currentPlaylists.filter((f, i) => i !== songDeletingIndex)
  //     );
  //     sessionStorage.setItem(
  //       "activePlaylist",
  //       JSON.stringify(
  //         currentPlaylists.filter((f, i) => i !== songDeletingIndex)
  //       )
  //     );
  //     if (songDeletingIndex === songIndex) {
  //       audioElement.pause();
  //     }
  //   }
  //   setSongDeletingIndex(null);
  // };

  // const nextSong = () => {
  //   let index;
  //   if (songIndex + 1 !== currentPlaylists[playlistIndex]?.songs?.length) {
  //     // Prevents error by skipping past the number of songs that are available
  //     index = songIndex + 1;
  //     setSongIndex(songIndex + 1);
  //   } else {
  //     setSongIndex(0);
  //     index = 0;
  //     if (playlistIndex + 1 !== currentPlaylists.length) {
  //       props.updateCurrentPlaylist([
  //         ...currentPlaylists.filter((f, i) => i !== playlistIndex),
  //         currentPlaylists.find((f, i) => i === playlistIndex),
  //       ]);
  //       // setPlaylistIndex(playlistIndex + 1);
  //     } else setPlaylistIndex(0);
  //   }
  //   audioElement.src = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.songs?.[index].song_cid}`;
  //   audioElement.currentTime = 0;
  //   if (isPlaying) {
  //     audioElement.play();
  //     // updateBar();
  //     requestAnimationFrame(updateBar);
  //   }
  // };

  // const prevSong = () => {
  //   if (isPrevClicked && songIndex !== 0) {
  //     // Cant go prev. the min songs available.. Maybe we will loop later?
  //     audioElement.src = `https://gateway.pinata.cloud/ipfs/${
  //       currentPlaylists[playlistIndex]?.songs[songIndex - 1]?.song_cid
  //     }`;
  //     if (isPlaying) {
  //       audioElement.play();
  //     }
  //     setSongIndex(songIndex - 1);
  //   } else {
  //     audioElement.currentTime = 0;
  //     setIsPrevClicked(true);
  //   }
  // };

  // useEffect(() => {
  //   if (isPrevClicked) {
  //     setTimeout(() => {
  //       setIsPrevClicked(false);
  //     }, 600);
  //   }
  // }, [isPrevClicked]);
  
  
  // // useEffect(() => {}, [audioElement.src]);
  
  // const onSongSeek = (e) => {
  //   if (props.showPlayer) {
  //     audioElement.currentTime =
  //       ((e.clientX - playBar.current.getBoundingClientRect().x) *
  //         audioElement.duration) /
  //       playBar.current.getBoundingClientRect().width;
  //   } else {
  //     audioElement.currentTime =
  //       ((playBar.current.getBoundingClientRect().bottom - e.clientY) *
  //         audioElement.duration) /
  //       playBar.current.getBoundingClientRect().height;
  //   }
  // };

  // const getPlayerBackground = () => {
  //   let backgroundImage;
    
  //   if (currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album?.cover_cid) {
  //     backgroundImage = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.songs?.[songIndex]?.album.cover_cid}`;
  //   } else if (currentPlaylists[playlistIndex]?.cover_cid) {
  //     backgroundImage = `https://gateway.pinata.cloud/ipfs/${currentPlaylists[playlistIndex]?.cover_cid}`;
  //   } else {
  //     backgroundImage = CdImage;
  //   }

  //   setCDBackground(backgroundImage);
  // };

  console.log('[currentPlaylists]', currentPlaylists)

  return (
    props.showPlayer && (
      <div
        id="amplify-player"
        className={`amplify-player ${props.showPlayer && "full"}`}
      >
        <ReactJkMusicPlayer
          mode="full"
          className="newplayer"
          audioLists={formattedPlaylists}
          showDownload={false}
          defaultPosition={{ bottom: 20, right: 20 }}
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
)(withRouter(ThePlayer));
