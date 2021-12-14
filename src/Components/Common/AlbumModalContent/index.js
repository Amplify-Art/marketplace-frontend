import React, { useEffect, useState } from 'react';
import AlbumSingleSong from '../AlbumSingleSong/index';
import playIcon from '../../../assets/images/play_icon.svg';
import GeneralModal from '../GeneralModal/index.js';
import BackArrowIcon from '../../../assets/images/left-arrow.png'
import CdImage from '../../../assets/images/cd-img.svg'
import './AlbumModalContent.scss'
import { usePalette } from 'react-palette';
import { updateCurrentPlaylistAction, showDeletePlaylistAction } from '../../../redux/actions/PlaylistAction'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { togglePlayerAction } from '../../../redux/actions/GlobalAction';
import _ from 'lodash';

// songmodal
import SongModalContent from '../SongModalcontent';


function AlbumModalContent({ albumInfo, isPlayList, isOpen, updateCurrentPlaylist, onBuy, setViewDetails, viewDetails, onSingleSongClick, token, ...props }) {
  const [songModal, setSongModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudioSong] = useState(new Audio(''));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const user = jwt.decode(localStorage.getItem('amplify_app_token'));
  let url = props.history.location

  const handleSongModal = () => {
    setSongModal(true);
  }
  const toggle = (songid) => {
    setAudioSong(new Audio(`https://amplify-dev.mypinata.cloud/ipfs/${songid}`))
    if (playing && currentIndex !== songid) {
      audio.pause()
      audio.currentTime = 0;
      setCurrentIndex(songid)
      setPlaying(true)
    } else if (!playing && currentIndex === -1) {
      setCurrentIndex(songid)
      setPlaying(true)
    } else {
      audio.pause()
      audio.currentTime = 0;
      setAudioSong(new Audio(''))
      setCurrentIndex(-1)
      setPlaying(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setCurrentIndex(-1)
      setPlaying(false)
    }
  }, [isOpen]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing, currentIndex]);

  const stopSong = () => {
    audio.pause()
    audio.currentTime = 0;
    setAudioSong(new Audio(''))
    setCurrentIndex(-1)
    setPlaying(false)
  }
  useEffect(() => {
    audio.addEventListener("ended", () => {
      setAudioSong(new Audio(''))
      setCurrentIndex(-1)
      setPlaying(false)
    });
    audio.addEventListener("timeupdate", e => {
      console.log(props.history.location.pathname, "RWWJJ")
      if (audio.currentTime > 15) {
        stopSong()
      }
      const progressElement = document.getElementById(currentIndex)
      if (progressElement) {
        let normalizedRadius = 9;
        let circumference = normalizedRadius * 2 * Math.PI;
        let startPoint = (audio.currentTime / audio.duration) * circumference;
        let endPoint = circumference - (audio.currentTime / audio.duration) / 100 * circumference;
        progressElement.style.strokeDasharray = `${startPoint},${endPoint}`
      }
    });
    return () => {
      audio.removeEventListener("ended", () => {
        setAudioSong(new Audio(''))
        setCurrentIndex(-1)
        setPlaying(false)
      });
      audio.removeEventListener("timeupdate", () => { });
    };
  }, [playing, audio]);



  const handleCloseModal = () => {
    setSongModal(false);
    setViewDetails(false);
  }

  const addToPlaylist = async () => {
    console.log('albumInfo', albumInfo)
    // let songs = albumInfo.songs.map(song => ({ ...song, playlist_id: albumInfo.id, coverArt: isPlayList ? null : albumInfo?.coverArt ? albumInfo?.coverArt : albumInfo?.cover_cid }));
    // songs = _.uniqWith(songs, (a, b) => a.playlist_id === b.playlist_id && a.id === b.id)
    updateCurrentPlaylist([...props.currentPlaylists, albumInfo])
    sessionStorage.setItem('activePlaylist', JSON.stringify([...props.currentPlaylists, albumInfo]))
    if (!props.showPlayer)
      props.togglePlayer();
  }
  const { data } = usePalette(`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`);

  const zeroPad = (num, places) => String(num).padStart(places, '0');

  const handleDelete = () => {
    props.setDeletingId(albumInfo.id)
    props.showDeletePlaylist()
  }

  return (
    <>
      <div id="albums-content">
        {!viewDetails ? <div className="left-wrapper" style={{ background: `linear-gradient(123.48deg, ${isPlayList ? '#f18180' : data.vibrant} 0%, ${isPlayList ? '#ec5051' : data.muted} 52.12%)` }}>
          <div className="album-top">
            {!isPlayList ? <div className="album-img">
              {albumInfo && albumInfo.cover_cid ? (
                <img src={`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`} alt='' />
              ) : <img src={albumInfo.coverArt} alt='' />}
              <i class="far fa-trash-alt"></i>
            </div> : null}
            <div className="album-right" style={isPlayList ? { paddingLeft: '0px' } : {}}>
              <div className="title">{albumInfo && albumInfo.title}</div>
              {
                !isPlayList ? <>
                  <div className="artist-title">{albumInfo && albumInfo?.user?.name || 'No Artist'}</div>
                  <div className="view-detail" onClick={() => setViewDetails(true)}>View Details</div>
                </> : null
              }
            </div>
            {isPlayList &&
              <div className="trash" onClick={handleDelete} >
                <i class="far fa-trash-alt"></i>
              </div>
            }
          </div>
          <div className="album-bottom" id="modalScrolling">
            {albumInfo && albumInfo.songs && albumInfo.songs?.sort((a, b) => a.id - b.id).map((song, index) => (
              <AlbumSingleSong song={song} index={index} key={`${index}singlesong`} audio={audio} currentIndex={currentIndex} playing={playing} isOpen={isOpen} toggle={(data) => toggle(data)} onSingleSongClick={onSingleSongClick} token={token} />
            ))}
          </div>
          {isPlayList ? <div className="btn-wrabtn-wrapp input-holder active-playlist">
            <input type="submit" value="Play This Playlist" className="active-playlist-btn" onClick={addToPlaylist} />
          </div> : null}
          {songModal && <div className="modal-album"><GeneralModal isCloseButton="true" bodyChildren={<SongModalContent albumInfo={albumInfo} />} closeModal={handleCloseModal} /></div>}
        </div>
          : <div className="left-wrapper">
            <div className="viewdetails-top">
              <div className="back-img"><img onClick={() => setViewDetails(false)} src={BackArrowIcon} alt="left arrow" /></div>
              <div className="details-banner">
                Album Details
              </div>
            </div>
            <div className="details-content">
              <p className="sub-content" style={{ marginTop: '8px' }}>{albumInfo.description}</p>
            </div>
            <div className="memory-card">
              <div className="mint-text">Mint</div>
              <div className="mint-number">{zeroPad(albumInfo.copy_number || (albumInfo.available_qty === 0 ? albumInfo.available_qty : (albumInfo.qty - albumInfo.available_qty) + 1), 3)}</div>
            </div>
          </div>
        }
        {
          isPlayList ? <div className='cd-case'>
            {/* <img src={CdImage} alt='Cd-image' /> */}
          </div> :
            <div className='bg-album-img' />
        }
        {!isPlayList && albumInfo.available_qty && albumInfo.user_id !== user.id && onBuy && (url && url.pathname !== '/my-profile') ? <button onClick={() => onBuy(albumInfo)} type="button" className="buy-button">Buy This - ${(albumInfo.price / 100).toFixed(2)}</button> : null}
      </div>
      <div className="mobileAlbumContent">
        <div className="cdCoverMobile">
          <div className="cdLeftCover" style={{ background: `linear-gradient(123.48deg, ${data.vibrant} 0%, ${data.muted} 52.12%)` }} />
          <div className="cdMiddleBar" />
          <div className="cdRightCover">
            <div>
              <img className="cdCover" src={CdImage} alt="cover" />
            </div>
          </div>
        </div>
        {!isPlayList && albumInfo.available_qty && albumInfo.user_id !== user.id && onBuy && (url && url.pathname !== '/my-profile') ? <button onClick={() => onBuy(albumInfo)} type="button" className="buy-button">Buy This - ${(albumInfo.price / 100).toFixed(2)}</button> : null}
        {
          !viewDetails
            ? (
              <>
                <div className="mobileAlbumDetailWrapper">
                  <div className="albumImgHolder">
                    {
                      albumInfo && albumInfo.cover_cid
                        ? <img src={`https://amplify-dev.mypinata.cloud/ipfs/${albumInfo.cover_cid}`} alt='' />
                        : <img src={albumInfo.coverArt} alt='' />}
                  </div>
                  <div className="albumDetail">
                    <div className="albumTitle">{albumInfo && albumInfo.title}</div>
                    <div className="albumArtistTitle">{albumInfo?.user?.name || 'No Artist'}</div>
                    <div className="albumViewDetail" onClick={() => setViewDetails(true)}>View Details</div>
                  </div>
                </div>
                <div className="albumSongsWrapper">
                  {albumInfo && albumInfo.songs && albumInfo.songs?.sort((a, b) => a.id - b.id).map((song, index) => (
                    <AlbumSingleSong song={song} index={index} key={`${index}singlesong`} audio={audio} currentIndex={currentIndex} playing={playing} isOpen={isOpen} toggle={(data) => toggle(data)} onSingleSongClick={onSingleSongClick} token={token} />
                  ))}
                </div>
              </>
            )
            : (
              <div className="albumViewDetailWrapper">
                <div className="albumViewDetailTop">
                  <div className="backImg"><img onClick={() => setViewDetails(false)} src={BackArrowIcon} alt="left arrow" /></div>
                  <div className="albumDetailBanner">
                    Album Details
                  </div>
                </div>
                <div className="albumDetailContent">
                  <p className="subContent">{albumInfo.description}</p>
                </div>
                <div className="albumMemoryCard">
                  <div className="mintText">Mint</div>
                  <div className="mintNumber">{zeroPad(albumInfo.copy_number || (albumInfo.available_qty === 0 ? albumInfo.available_qty : (albumInfo.qty - albumInfo.available_qty) + 1), 3)}</div>
                </div>
              </div>
            )
        }

      </div>
    </>
  )
}

export default connect(state => {
  return {
    showPlayer: state.global.showPlayer,
    currentPlaylists: state.playlists.current_playlists
  }
}, dispatch => {
  return {
    updateCurrentPlaylist: (data) => dispatch(updateCurrentPlaylistAction(data)),
    togglePlayer: () => dispatch(togglePlayerAction()),
    showDeletePlaylist: () => dispatch(showDeletePlaylistAction())

  }
})(withRouter(AlbumModalContent))
